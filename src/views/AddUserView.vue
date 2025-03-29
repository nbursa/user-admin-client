<script setup lang="ts">
import AddUserForm from '@/components/AddUserForm.vue'
import { ref } from 'vue'
import axios from 'axios'

const formRef = ref<InstanceType<typeof AddUserForm> | null>(null)

async function handleSubmit(payload: { name: string; email: string; age: number | null }) {
  try {
    await axios.post('http://localhost:8080/users', payload)
    formRef.value?.clearForm()
    formRef.value?.setFormSuccess('User created successfully')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || 'Something went wrong'
      formRef.value?.setFormError(message)
    } else {
      formRef.value?.setFormError('Unexpected error')
    }
  }
}
</script>

<template>
  <div class="add-user-view">
    <h2>Add New User</h2>
    <AddUserForm ref="formRef" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.add-user-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
