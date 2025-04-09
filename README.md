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

This is the frontend application for managing users. Built with Vue 3 and Vite, it provides a responsive and user-friendly interface for CRUD operations, form validation, and internationalization.

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Bundler:** Vite
- **UI Library:** Element Plus(users table and pagination)
- **Validation:** VeeValidate + Yup
- **State Management:** Pinia
- **Styling:** Scoped CSS + Element Plus
- **Internationalization:** vue-i18n
- **Language:** TypeScript
- **Containerization:** Docker

## Features

- **User CRUD**: Create, read, update, and delete user records.
- **Form validation**: Schema-based validation with VeeValidate and Yup.
- **Internationalization (i18n)**: Available in English, Maltese, and Serbian.
- **Dark/light theme**: Toggleable theme with persisted state.
- **Mobile-friendly**: Fully responsive layout with clean design.
- **Modern stack**: Vue 3 Composition API with TypeScript.
- **Modular architecture**: Scalable, testable, structured code.
- **Dockerized**: Utilized Docker setup.

## Project Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Type-Check, Compile and Minify for Production:

```bash
npm run build
```

Run Unit Tests with [Vitest](https://vitest.dev/):

```bash
npm run test:unit
```

Lint with [ESLint](https://eslint.org/):

```bash
npm run lint
```

## Docker

Run app with Docker:

```bash
docker compose up --build
```

The frontend will be available at:

```bash
http://localhost:5173
```

---

## Backend

See [user-admin-api](https://github.com/nbursa/user-admin-api) for the corresponding Golang backend and MongoDB setup.
