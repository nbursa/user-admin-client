<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'
import UserForm from '@/components/UserForm.vue'
import { API_URL } from '@/lib/api'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import type { User } from '@/types/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userId = route.params.id as string

const user = ref<User | null>(null)

onMounted(async () => {
  try {
    const res = await axios.get<User>(`${API_URL}/users/${userId}`)
    user.value = res.data
  } catch {
    ElMessage.error(t('form.errors.loadFailed'))
    router.push('/')
  }
})

const handleSubmit = async (values: { name: string; email: string; age: number | null }) => {
  try {
    await axios.put(`${API_URL}/users/${userId}`, values)
    ElMessage.success(t('form.success.update'))
  } catch (error) {
    const err = error as AxiosError<{ error: string }>
    ElMessage.error(err.response?.data?.error || t('form.errors.unknown'))
  }
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(t('form.confirm.delete'), t('form.confirm.title'), {
      type: 'warning',
    })
    await axios.delete(`${API_URL}/users/${userId}`)
    ElMessage.success(t('form.success.delete'))
    router.push('/')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('form.errors.deleteFailed'))
    }
  }
}
</script>

<template>
  <div class="edit-user-view">
    <h2>{{ $t('form.editTitle') }}</h2>
    <UserForm
      v-if="user"
      mode="edit"
      :initial-values="user"
      @submit="handleSubmit"
      @delete="handleDelete"
    />
  </div>
</template>

<style scoped>
.edit-user-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  overflow: auto;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.edit-user-view h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
}
</style>
