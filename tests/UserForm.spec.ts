import { mount } from '@vue/test-utils'
import UserForm from '@/components/UserForm.vue'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      form: {
        name: 'Name',
        email: 'Email',
        age: 'Age',
        title: 'Add User',
        success: 'User created successfully',
        deleteSuccess: 'User deleted successfully',
        errors: {
          nameRequired: 'Name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Email is not valid',
          ageRequired: 'Age is required',
          ageMin: 'User must be older than 18',
          emailExists: 'Email already exists',
          invalidInput: 'Invalid input',
        },
      },
      app: {
        submit: 'Submit',
        update: 'Update',
        delete: 'Delete',
      },
      errors: {
        generic: 'Something went wrong',
        unexpected: 'Unexpected error occurred',
      },
    },
  },
})

describe('UserForm', () => {
  it('renders form with name, email, and age fields', () => {
    const wrapper = mount(UserForm, {
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
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    const vm = wrapper.vm as unknown as {
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

  it('renders update/delete buttons in edit mode', () => {
    const wrapper = mount(UserForm, {
      props: {
        mode: 'edit',
        initialValues: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          age: 30,
        },
      },
      global: {
        plugins: [ElementPlus, i18n],
      },
    })

    expect(wrapper.text()).toContain('Update')
    expect(wrapper.text()).toContain('Delete')
  })
})
