<script setup lang="ts">
import { Close as IEPClose } from '@element-plus/icons-vue'

defineProps<{ visible: boolean }>()

const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
  <transition name="slide">
    <div v-if="visible" class="mobile-sidebar">
      <el-button class="close-btn" @click="emit('toggle-sidebar')" circle plain>
        <el-icon><IEPClose /></el-icon>
      </el-button>

      <nav class="sidebar-nav">
        <RouterLink to="/" @click="emit('toggle-sidebar')">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/users" @click="emit('toggle-sidebar')">{{ $t('nav.users') }}</RouterLink>
        <RouterLink to="/users/new" @click="emit('toggle-sidebar')">{{
          $t('nav.addUser')
        }}</RouterLink>
      </nav>
    </div>
  </transition>
</template>

<style scoped>
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-background-soft);
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  gap: 1rem;
  text-align: center;
}

.sidebar-nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  font-size: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  transition: background-color 0.2s ease;
}

.sidebar-nav a:hover {
  color: white;
  background-color: var(--color-border);
}

.close-btn {
  align-self: flex-end;
  background-color: transparent;
  min-width: 3rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

@media (min-width: 480px) {
  .mobile-sidebar {
    max-width: 300px;
  }
}

@media (min-width: 768px) {
  .mobile-sidebar {
    display: none;
  }
}
</style>
