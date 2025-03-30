<script setup lang="ts">
import { object, string, number } from 'yup'
import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const schema = object({
  name: string().required(t('form.errors.nameRequired')),
  email: string().email(t('form.errors.emailInvalid')).required(t('form.errors.emailRequired')),
  age: number()
    .typeError(t('form.errors.ageRequired'))
    .required(t('form.errors.ageRequired'))
    .min(19, t('form.errors.ageMin')),
})

type FormValues = {
  name: string
  email: string
  age: number | null
}

const formError = ref<string | null>(null)
const formSuccess = ref<string | null>(null)

const { handleSubmit, resetForm, setFieldError } = useForm<FormValues>({
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

const onAgeInput = (value: number | null) => {
  if (typeof value !== 'number' || isNaN(value)) {
    age.value = null
  }
}

const onAgeKeyPress = (event: KeyboardEvent) => {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault()
  }
}

const setFormError = (message: string | null) => {
  formError.value = message
  formSuccess.value = null
}

const setFormSuccess = (message: string | null) => {
  formSuccess.value = message
  formError.value = null
}

const emit = defineEmits<{
  (e: 'submit', payload: FormValues): void
}>()

const submitForm = handleSubmit((values: FormValues) => {
  emit('submit', values)
})

const setFormValues = (payload: FormValues) => {
  name.value = payload.name
  email.value = payload.email
  age.value = payload.age
}

const clearForm = () => {
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
  setFieldError,
})
</script>

<template>
  <div class="form-wrapper">
    <el-form label-position="top" @submit.prevent="submitForm" class="el-form">
      <div class="fields">
        <el-form-item :label="$t('form.name')" :error="nameError">
          <el-input name="name" v-model="name" />
        </el-form-item>

        <el-form-item :label="$t('form.email')" :error="emailError">
          <el-input name="email" type="email" v-model="email" />
        </el-form-item>

        <el-form-item :label="$t('form.age')" :error="ageError">
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
        <el-button type="success" native-type="submit">
          {{ $t('app.submit') }}
        </el-button>
      </el-form-item>

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
    </el-form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 25rem;
  margin: 0 auto;
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

.el-button {
  width: 100%;
  padding: 1rem 2rem;
  min-width: 10rem;
}

:deep(.el-form-item__label) {
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.3s ease;
}

:deep(.el-input__wrapper),
:deep(.el-input-number__wrapper) {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-color: var(--color-border);
}

:deep(.el-input__wrapper.is-focus),
:deep(.el-input-number__wrapper.is-focus) {
  border-color: var(--color-accent) !important;
  box-shadow: 0 0 0 1px var(--color-accent);
}

:deep(.el-input__inner),
:deep(.el-input-number__inner) {
  background-color: transparent;
  color: var(--color-text);
}

:deep(.el-button--success) {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

:deep(.el-button--success:hover) {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.form-alert {
  margin-top: 1rem;
}
</style>
