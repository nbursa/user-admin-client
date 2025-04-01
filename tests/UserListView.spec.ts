import { vi } from 'vitest'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

import { mount } from '@vue/test-utils'
import UserListView from '@/views/UserListView.vue'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import axios from 'axios'
import flushPromises from 'flush-promises'
import en from '@/locales/en.json'

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en },
})

beforeEach(() => {
  mockedAxios.get.mockResolvedValue({
    data: {
      users: [],
      total: 0,
    },
  })
})

describe('UserListView', () => {
  it('renders search input, table, and pagination controls', () => {
    const wrapper = mount(UserListView, {
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ElPagination' }).exists()).toBe(true)
  })

  it('updates search value when typing', async () => {
    const wrapper = mount(UserListView, {
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('tester')

    expect((input.element as HTMLInputElement).value).toBe('tester')
  })

  it('fetches users when search query changes', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        users: [{ name: 'Tester', email: 'tester@example.com', age: 25 }],
        total: 1,
      },
    })

    const wrapper = mount(UserListView, {
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Tester')

    await flushPromises()

    const rows = wrapper.findAll('.el-table__row')
    expect(rows.length).toBe(1)
    expect(rows[0].text()).toContain('Tester')
  })

  it('updates table when users are fetched from API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        users: [
          { name: 'UserA', email: 'a@example.com', age: 30 },
          { name: 'UserB', email: 'b@example.com', age: 35 },
        ],
        total: 2,
      },
    })

    const wrapper = mount(UserListView, {
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('')

    await flushPromises()

    const rows = wrapper.findAll('.el-table__row')
    expect(rows).toHaveLength(2)
    expect(rows[0].text()).toContain('UserA')
    expect(rows[1].text()).toContain('UserB')
  })
})
