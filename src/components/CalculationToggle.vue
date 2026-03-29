<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const mode = defineModel({ required: true })
</script>

<template>
  <div class="calculation-toggle">
    <label class="radio-label">
      <input
        v-model="mode"
        type="radio"
        value="shortest"
        class="radio-input"
      />
      {{ t('toggleShortest') }}
    </label>
    <label class="radio-label">
      <input
        v-model="mode"
        type="radio"
        value="average"
        class="radio-input"
      />
      {{ t('toggleAverage') }}
    </label>
  </div>
</template>
