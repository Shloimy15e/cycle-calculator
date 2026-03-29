<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function toggleLanguage() {
  const newLocale = locale.value === 'en' ? 'he' : 'en'
  locale.value = newLocale
  document.documentElement.dir = newLocale === 'he' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
}
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">{{ t('appTitle') }}</h1>
    <button class="btn btn-lang" @click="toggleLanguage">{{ t('langToggle') }}</button>
  </header>
</template>
