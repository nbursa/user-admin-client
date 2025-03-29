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
    expect(wrapper.findComponent({ name: 'ElInputNumber' }).find('input').exists()).toBe(true)
  })

  it('emits submit event with valid data', async () => {
    const wrapper = mount(AddUserForm, {
      global: {
        plugins: [ElementPlus],
      },
    })

    const vm = wrapper.vm as {
      submitForm: () => Promise<void>
      setFormValues: (values: { name: string; email: string; age: number }) => void
    }

    vm.setFormValues({
      name: 'John Test',
      email: 'john@test.com',
      age: 25,
    })

    await vm.submitForm()

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')?.[0][0]).toEqual({
      name: 'John Test',
      email: 'john@test.com',
      age: 25,
    })
  })
})
