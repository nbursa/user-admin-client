import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const { locale } = useI18n()
    const currentLang = ref(locale.value || 'en')

    function setLanguage(lang: string) {
      currentLang.value = lang
      locale.value = lang
      document.documentElement.setAttribute('lang', lang)
    }

    setLanguage(currentLang.value)

    watch(currentLang, (newLang) => {
      locale.value = newLang
      document.documentElement.setAttribute('lang', newLang)
    })

    return {
      currentLang,
      setLanguage,
    }
  },
  {
    persist: true,
  },
)
