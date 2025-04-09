<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import { Menu as IEPMenu } from '@element-plus/icons-vue'

const { locale, availableLocales } = useI18n()

const emit = defineEmits(['toggle-sidebar'])

const theme = useThemeStore()
const localeStore = useLocaleStore()

const changeLang = (lang: string) => {
  localeStore.setLanguage(lang)
}
</script>

<template>
  <header class="app-header">
    <div class="logo-wrapper">
      <img alt="Vue logo" class="vue-logo" src="@/assets/logo.svg" />
      <span class="logo-plus">+</span>
      <img alt="Vue logo" class="go-logo" src="@/assets/go.png" />
    </div>

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

        <el-button class="mobile-nav-toggle" @click="emit('toggle-sidebar')" circle plain>
          <el-icon><IEPMenu /></el-icon>
        </el-button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.vue-logo {
  width: 29px;
  height: 29px;
}

.logo-plus {
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 900;
  margin-left: 5px;
  margin-right: -1px;
}

.go-logo {
  width: 36px;
  height: 36px;
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
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
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

.sidebar-nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sidebar-nav a:hover {
  background-color: var(--color-accent);
  color: white;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-toggle,
.theme-toggle {
  font-size: 1.25rem;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
}

.lang-toggle:hover,
.theme-toggle:hover {
  color: var(--color-accent);
}

.theme-icon {
  width: 25px;
  height: 25px;
  display: block;
}

.mobile-nav-toggle {
  display: none;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.mobile-nav-toggle .el-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
}

.mobile-nav-toggle .el-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--color-background-mute) !important;
  color: var(--color-text) !important;
}

@media (min-width: 768px) {
  .app-header {
    padding: 0 1.5rem;
  }

  .lang-toggle,
  .theme-toggle {
    font-size: 1rem;
    padding: 0.15rem 0.4rem;
  }

  .theme-icon {
    width: 20px;
    height: 20px;
  }

  .mobile-nav-toggle {
    display: none;
  }

  .actions {
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .mobile-nav-toggle {
    display: inline-flex;
    background-color: transparent;
  }

  .nav {
    display: none;
  }

  :deep(.el-dropdown-menu__item) {
    padding: 12px 20px !important;
    font-size: 1rem !important;
  }

  :deep(.el-dropdown-menu) {
    min-width: 120px;
  }

  .actions {
    gap: 0.5rem;
  }
}
</style>
