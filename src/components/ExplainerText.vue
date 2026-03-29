<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <p class="text-[#555] mb-7 text-[0.95rem]">{{ t('explainer') }}</p>
</template>
