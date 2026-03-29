<script setup>
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const { t, locale } = useI18n()

watch(
  locale,
  (newLocale) => {
    document.documentElement.dir = newLocale === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
  },
  { immediate: true }
)

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'he' : 'en'
}
</script>

<template>
  <div class="app">
    <header>
      <h1>{{ t('appTitle') }}</h1>
      <button @click="toggleLanguage">{{ t('langToggle') }}</button>
    </header>
    <main>
      <p>{{ t('explainer') }}</p>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
</style>
