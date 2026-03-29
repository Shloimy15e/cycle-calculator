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
  <header class="flex justify-between items-center mb-6 gap-4">
    <h1 class="text-[1.6rem] font-bold text-[#2d3561] max-sm:text-[1.3rem]">{{ t('appTitle') }}</h1>
    <button
      class="inline-flex items-center justify-center px-[0.9rem] py-[0.4rem] text-[0.88rem] font-semibold rounded-lg bg-[#f0f3ff] text-[#2d3561] border border-[#c8cfe0] hover:bg-[#e0e6ff] active:scale-[0.97] transition-all cursor-pointer ms-auto shrink-0"
      @click="toggleLanguage"
    >{{ t('langToggle') }}</button>
  </header>
</template>
