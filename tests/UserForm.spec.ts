import { mount } from '@vue/test-utils'
import UserForm from '@/components/UserForm.vue'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import type { UserFormInstance } from '@/types/user'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en },
})

describe('UserForm', () => {
  it('renders form with name, email, and age fields', () => {
    const wrapper = mount(UserForm, {
      props: { mode: 'create' },
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ElInputNumber' }).find('input').exists()).toBe(true)
  })

  it('emits submit event with valid data', async () => {
    const wrapper = mount(UserForm, {
      props: { mode: 'create' },
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')
    const ageInput = wrapper.findComponent({ name: 'ElInputNumber' }).find('input')

    await nameInput.setValue('John Test')
    await emailInput.setValue('john@test.com')
    await ageInput.setValue(25)

    await (wrapper.vm as UserFormInstance).submitForm()

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0][0]).toEqual({
      name: 'John Test',
      email: 'john@test.com',
      age: 25,
    })
  })

  it('renders update/delete buttons in edit mode', () => {
    const wrapper = mount(UserForm, {
      props: {
        mode: 'edit',
        initialValues: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          age: 30,
        },
      },
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    expect(wrapper.find('button.el-button--success').exists()).toBe(true)
    expect(wrapper.find('button.el-button--danger').exists()).toBe(true)
  })
})
