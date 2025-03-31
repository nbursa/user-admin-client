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
  <div class="users">
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

        <div class="user-table-container">
          <el-table
            :data="users"
            class="user-table"
            style="width: 100%"
            :height="'100%'"
            header-cell-class-name="table-header"
            :empty-text="t('users.noData')"
          >
            <el-table-column prop="name" :label="t('users.name')" min-width="60" max-width="80" />
            <el-table-column prop="email" :label="t('users.email')" />
            <el-table-column
              prop="age"
              :label="t('users.age')"
              min-width="60"
              max-width="80"
              align="center"
            />
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
  </div>
</template>

<style scoped>
.users {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.users-title {
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.user-list-view {
  height: 70vh;
  max-width: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}

.user-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 8px;
}

.search-form {
  margin-bottom: 0.5rem;
}

.user-table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

:deep(.user-table) {
  background-color: transparent;
  border-radius: 6px;
}

:deep(.el-input__wrapper) {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-color: var(--color-border);
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-accent) !important;
  box-shadow: 0 0 0 1px var(--color-accent);
}

:deep(.el-input__inner) {
  background-color: transparent;
  color: var(--color-text);
}

.user-pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s ease;
}

:deep(.el-table--border::after),
:deep(.el-table--border::before),
:deep(.el-table__inner-wrapper::after),
:deep(.el-table__inner-wrapper::before) {
  background-color: transparent !important;
  content: none !important;
}

:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: 1px solid var(--color-border);
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

@media (max-width: 768px) {
  :deep(.el-table__cell) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 0.95rem;
  }
}

/* @media screen and (min-width: 768px) {
  .user-list-view {
    padding: 0.5rem;
    height: 65vh;
  }
} */
</style>
