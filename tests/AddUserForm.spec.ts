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
})
