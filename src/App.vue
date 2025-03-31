<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { RouterView } from 'vue-router'
import MobileSidebar from '@/components/MobileSidebar.vue'
import { ref } from 'vue'

const sidebarVisible = ref(false)

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}
</script>

<template>
  <div class="app-wrapper">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <MobileSidebar :visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />

    <main>
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
