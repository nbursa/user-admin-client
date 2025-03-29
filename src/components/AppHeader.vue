<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="20" height="20" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/users/new">Add User</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
}

nav a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #888;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
