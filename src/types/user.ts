export type User = {
  id: string
  name: string
  email: string
  age: number
}

export type FormValues = {
  name: string
  email: string
  age: number | null
}

export type UserFormInstance = {
  submitForm: () => Promise<void>
}
