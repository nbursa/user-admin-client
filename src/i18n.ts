import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import sr from './locales/sr.json'
import mt from './locales/mt.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    sr,
    mt,
  },
})
