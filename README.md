# User Admin Client

![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-frontend-646cff?logo=vite)
![Element Plus](https://img.shields.io/badge/Element_Plus-UI-blue?logo=element)
![VeeValidate](https://img.shields.io/badge/VeeValidate-Validation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Pinia](https://img.shields.io/badge/Pinia-State_Management-yellow)
![i18n](https://img.shields.io/badge/i18n-EN%2FSR%2FMT-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Utility--First-38bdf8?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Dockerized-FE%2FBE%2FMongo-blue?logo=docker)

A lightweight, responsive admin interface for managing users. Built using Vue 3, Vite, Element Plus, and VeeValidate.

## Features

- **User CRUD**: Create, read, update, and delete user records.
- **Form validation**: Robust schema-based validation with VeeValidate and Yup.
- **Internationalization (i18n)**: Available in English, Serbian, and Maltese.
- **Dark/light theme**: Toggleable theme with persisted state.
- **Mobile-friendly**: Fully responsive layout with clean design.
- **Modern stack**: Vue 3 Composition API with TypeScript.
- **Modular architecture**: Scalable, testable, and well-structured code.
- **Dockerized**: Includes Docker setup for frontend, backend (Golang), and MongoDB(backend).

## Project Setup

```bash
npm install
```

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```bash
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```bash
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```bash
npm run lint
```

---

## Backend

See `user-admin-server` for the corresponding Golang backend and MongoDB setup.
