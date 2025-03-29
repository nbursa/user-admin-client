<template>
  <div class="form-wrapper">
    <el-form label-position="top" @submit.prevent="submitForm">
      <div class="fields">
        <el-form-item label="Name" :error="nameError">
          <el-input name="name" v-model="name" />
        </el-form-item>

        <el-form-item label="Email" :error="emailError">
          <el-input name="email" type="email" v-model="email" />
        </el-form-item>

        <el-form-item label="Age" :error="ageError">
          <el-input-number
            name="age"
            v-model="age"
            :step="1"
            :precision="0"
            :controls="false"
            @input="onAgeInput"
            @keypress="onAgeKeyPress"
            @wheel.prevent
          />
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="success" native-type="submit">Submit</el-button>
      </el-form-item>
    </el-form>

    <el-alert
      v-if="formError"
      type="error"
      class="form-alert"
      :title="formError"
      closable
      @close="formError = null"
    />

    <el-alert
      v-if="formSuccess"
      type="success"
      class="form-alert"
      :title="formSuccess"
      closable
      @close="formSuccess = null"
    />
  </div>
</template>

<script setup lang="ts">
import { object, string, number } from 'yup'
import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'

const schema = object({
  name: string().required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  age: number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(19, 'Must be over 18'),
})

type FormValues = {
  name: string
  email: string
  age: number | null
}

const formError = ref<string | null>(null)
const formSuccess = ref<string | null>(null)

const { handleSubmit, resetForm } = useForm<FormValues>({
  validationSchema: schema,
  validateOnMount: false,
  initialValues: {
    name: '',
    email: '',
    age: null,
  },
})

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: age, errorMessage: ageError } = useField<number | null>('age')

function onAgeInput(value: number | null) {
  if (typeof value !== 'number' || isNaN(value)) {
    age.value = null
  }
}

function onAgeKeyPress(event: KeyboardEvent) {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault()
  }
}

function setFormError(message: string | null) {
  formError.value = message
  formSuccess.value = null
}

function setFormSuccess(message: string | null) {
  formSuccess.value = message
  formError.value = null
}

const emit = defineEmits<{
  (e: 'submit', payload: FormValues): void
}>()

const submitForm = handleSubmit((values: FormValues) => {
  emit('submit', values)
})

function setFormValues(payload: FormValues) {
  name.value = payload.name
  email.value = payload.email
  age.value = payload.age
}

function clearForm() {
  resetForm({ values: { name: '', email: '', age: null }, errors: {} })
  formError.value = null
  formSuccess.value = null
}

defineExpose({
  submitForm,
  setFormValues,
  setFormError,
  setFormSuccess,
  clearForm,
})
</script>

<style scoped>
.form-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

:deep(.el-input__wrapper),
:deep(.el-input-number__wrapper) {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

:deep(.el-input__inner),
:deep(.el-input-number__inner) {
  background-color: transparent;
  color: var(--color-text);
}

:deep(.el-form-item__label) {
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.3s ease;
}

:deep(.el-button--success) {
  background-color: #42b983;
  border-color: #42b983;
  color: #fff;
}

:deep(.el-button--success:hover) {
  background-color: #36976f;
  border-color: #36976f;
}

.el-form {
  background-color: var(--color-background-soft);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}

.fields {
  margin-bottom: 1.5rem;
}

.el-form-item {
  display: flex;
  flex-direction: column;
}

.form-alert {
  margin-top: 1rem;
}
</style>
