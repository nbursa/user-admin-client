<template>
  <el-form @submit.prevent="handleSubmit(onSubmit)">
    <el-form-item label="Name" :error="errors.name?.[0]">
      <el-input name="name" v-model="values.name" />
    </el-form-item>

    <el-form-item label="Email" :error="errors.email?.[0]">
      <el-input name="email" v-model="values.email" />
    </el-form-item>

    <el-form-item label="Age" :error="errors.age?.[0]">
      <el-input name="age" type="number" v-model.number="values.age" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { object, string, number, type InferType } from 'yup'
import { useForm } from 'vee-validate'

type FormValues = InferType<typeof schema>

const schema = object({
  name: string().required(),
  email: string().email().required(),
  age: number().required().min(19), // greater than 18
})

const { handleSubmit, values, errors, setFieldValue } = useForm<FormValues>({
  validationSchema: schema,
})

const emit = defineEmits<{
  (e: 'submit', payload: typeof values): void
}>()

function onSubmit(values: FormValues) {
  emit('submit', values)
}

defineExpose({
  setFieldValue,
  submitForm: handleSubmit(onSubmit),
})
</script>
