<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'

const { locale, availableLocales } = useI18n()
const theme = useThemeStore()
const localeStore = useLocaleStore()

const changeLang = (lang: string) => {
  localeStore.setLanguage(lang)
}
</script>

<template>
  <header class="app-header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />

    <div class="right">
      <nav class="nav">
        <RouterLink to="/" class="nav-link" active-class="active-link" exact>{{
          $t('nav.home')
        }}</RouterLink>

        <RouterLink to="/users" class="nav-link" active-class="active-link">{{
          $t('nav.users')
        }}</RouterLink>

        <RouterLink to="/users/new" class="nav-link" active-class="active-link">{{
          $t('nav.addUser')
        }}</RouterLink>
      </nav>

      <div class="actions">
        <el-dropdown @command="changeLang" trigger="click">
          <span class="lang-toggle">{{ locale.toUpperCase() }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="lang in availableLocales" :key="lang" :command="lang">
                {{ lang.toUpperCase() }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <button class="theme-toggle" @click="theme.toggleTheme">
          <component :is="theme.isDark ? MoonIcon : SunIcon" class="theme-icon" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
}

.logo {
  width: 20px;
  height: 20px;
}

.right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.nav-link:hover {
  color: var(--color-accent);
  background-color: transparent;
}

.active-link {
  color: var(--color-accent);
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.lang-toggle,
.theme-toggle {
  font-size: 0.9rem;
  color: gray;
  cursor: pointer;
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
}

.lang-toggle:hover,
.theme-toggle:hover {
  color: #42b983;
}

.theme-icon {
  width: 18px;
  height: 18px;
  display: block;
}
</style>
