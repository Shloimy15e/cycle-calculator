<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <p class="text-ink-mid text-[0.88rem] mb-7 leading-relaxed">{{ t('explainer') }}</p>
</template>
