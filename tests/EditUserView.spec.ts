import { mount, flushPromises } from '@vue/test-utils'
import EditUserView from '@/views/EditUserView.vue'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import axios from 'axios'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '@/router'
import { vi } from 'vitest'

vi.mock('axios')

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      form: {
        title: 'Edit User',
        errors: {
          loadFailed: 'Failed to load user',
        },
        success: {
          update: 'User updated successfully',
          delete: 'User deleted successfully',
        },
        confirm: {
          delete: 'Are you sure?',
          title: 'Confirm',
        },
      },
    },
  },
})

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('EditUserView', () => {
  it('loads user on mount and renders form', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: '123', name: 'EditMe', email: 'edit@me.com', age: 22 },
    })

    router.push('/users/123/edit')
    await router.isReady()

    const wrapper = mount(EditUserView, {
      global: {
        plugins: [ElementPlus, i18n, router],
      },
    })

    await flushPromises()

    expect((wrapper.find('input[name="name"]').element as HTMLInputElement).value).toBe('EditMe')
  })
})
