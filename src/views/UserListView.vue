<script setup lang="ts">
import axios from 'axios'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import debounce from 'lodash/debounce'
import { API_URL } from '@/lib/api'

const { t } = useI18n()

const search = ref('')
const users = ref([])
const total = ref(0)
const perPage = ref(10)
const currentPage = ref(1)

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { search: search.value, page: currentPage.value, limit: perPage.value },
    })
    users.value = response.data.users
    total.value = response.data.total
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const debouncedFetch = debounce(fetchUsers, 300)

watch(search, () => {
  currentPage.value = 1
  debouncedFetch()
})
watch(currentPage, () => fetchUsers())

fetchUsers()
</script>

<template>
  <h2 class="users-title">{{ $t('users.title') }}</h2>
  <div class="user-list-view">
    <div class="user-list-container">
      <el-form class="search-form" label-position="top">
        <el-form-item>
          <el-input
            v-model="search"
            class="user-search"
            type="text"
            :placeholder="t('users.search')"
            clearable
          />
        </el-form-item>
      </el-form>

      <div class="user-table-wrapper">
        <el-table :data="users" class="user-table">
          <el-table-column prop="name" :label="t('users.name')" />
          <el-table-column prop="email" :label="t('users.email')" />
          <el-table-column prop="age" :label="t('users.age')" />
        </el-table>
      </div>

      <el-pagination
        class="user-pagination"
        layout="prev, pager, next"
        :total="total"
        :page-size="perPage"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.users-title {
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: 600;
}

.user-list-view {
  height: 54vh;
  max-width: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}

.user-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 40rem;
  width: 100%;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.search-form {
  margin-bottom: 1.5rem;
}

.user-table-wrapper {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
}

:deep(.el-input__wrapper) {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-color: var(--color-border);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-accent) !important;
  box-shadow: 0 0 0 1px var(--color-accent);
}

:deep(.el-input__inner) {
  background-color: transparent;
  color: var(--color-text);
}

.user-table {
  background-color: transparent;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.user-pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s ease;
}

:deep(.el-pagination) {
  color: var(--color-text);
}

:deep(.el-pager) {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

:deep(.el-pager li) {
  background-color: transparent;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

:deep(.el-pager li:hover) {
  background-color: var(--color-accent);
  color: white;
}

:deep(.el-pager li.is-active) {
  background-color: var(--color-accent);
  color: white;
  font-weight: bold;
}

:deep(.el-pagination button) {
  background-color: var(--color-accent);
}

:deep(.el-pagination button:disabled) {
  opacity: 0.5;
}

:deep(.el-pagination button .el-icon svg) {
  color: var(--vt-c-white-soft);
}
</style>
