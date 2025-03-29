import { mount } from '@vue/test-utils'
import AddUserForm from '@/components/AddUserForm.vue'
import ElementPlus from 'element-plus'

describe('AddUserForm', () => {
  it('renders form with name, email, and age fields', () => {
    const wrapper = mount(AddUserForm, {
      global: {
        plugins: [ElementPlus],
      },
    })

    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.find('input[name="age"]').exists()).toBe(true)
  })

  it('emits submit event with valid data', async () => {
    const wrapper = mount(AddUserForm, {
      global: {
        plugins: [ElementPlus],
      },
    })

    const form = wrapper.vm as {
      setFieldValue: (field: string, value: unknown) => void
      submitForm: () => Promise<void>
    }

    form.setFieldValue('name', 'John Test')
    form.setFieldValue('email', 'john@test.com')
    form.setFieldValue('age', 25)

    await form.submitForm()

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')?.[0][0]).toEqual({
      name: 'John Test',
      email: 'john@test.com',
      age: 25,
    })
  })
})
