<script setup lang="ts">
import AddUserForm from '@/components/AddUserForm.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { API_URL } from '@/lib/api'

const { t } = useI18n()

const formRef = ref<InstanceType<typeof AddUserForm> | null>(null)

const handleSubmit = async (payload: { name: string; email: string; age: number | null }) => {
  try {
    await axios.post(`${API_URL}/users`, payload)
    formRef.value?.clearForm()
    formRef.value?.setFormSuccess(t('form.success'))
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const raw = error.response?.data?.error || ''
      const messageMap: Record<string, string> = {
        'email already in use': t('form.errors.emailExists'),
        'Invalid input': t('form.errors.invalidInput'),
        '': t('errors.generic'),
      }
      const friendly = messageMap[raw] || raw || t('errors.generic')
      formRef.value?.setFormError(friendly)

      if (raw === 'email already in use') {
        formRef.value?.setFieldError('email', t('form.errors.emailExists'))
      }
    } else {
      formRef.value?.setFormError(t('errors.unexpected'))
    }
  }
}
</script>

<template>
  <div class="add-user-view">
    <h2>{{ $t('form.title') }}</h2>
    <AddUserForm ref="formRef" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.add-user-view {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.add-user-view h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
}
</style>
