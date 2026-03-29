import { createI18n } from 'vue-i18n'
import en from './en.json'
import he from './he.json'

const savedLocale = localStorage.getItem('period-calc-locale') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, he }
})
