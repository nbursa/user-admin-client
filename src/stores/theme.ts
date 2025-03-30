import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDark = ref(false)

    function toggleTheme() {
      isDark.value = !isDark.value
    }

    watchEffect(() => {
      document.documentElement.classList.toggle('is-dark', isDark.value)
    })

    return {
      isDark,
      toggleTheme,
    }
  },
  {
    persist: true,
  },
)
