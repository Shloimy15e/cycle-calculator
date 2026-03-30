<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LogoIcon from './LogoIcon.vue'

const { t, locale } = useI18n()

function applyLocale(loc) {
  document.documentElement.dir = loc === 'he' ? 'rtl' : 'ltr'
  document.documentElement.lang = loc
}

function toggleLanguage() {
  const newLocale = locale.value === 'en' ? 'he' : 'en'
  locale.value = newLocale
  localStorage.setItem('period-calc-locale', newLocale)
  applyLocale(newLocale)
}

onMounted(() => {
  applyLocale(locale.value)
})
</script>

<template>
  <header class="flex justify-between items-center mb-6 px-1">
    <div class="flex items-center gap-2.5">
      <LogoIcon :size="30" />
      <h1 class="text-[1.5rem] sm:text-[1.75rem] font-normal text-teal leading-snug">{{ t('appTitle') }}</h1>
    </div>
    <button
      class="text-[0.8rem] font-medium text-ink-light hover:text-teal transition-colors duration-200 cursor-pointer border-none bg-transparent tracking-wide"
      @click="toggleLanguage"
    >{{ t('langToggle') }}</button>
  </header>
</template>
