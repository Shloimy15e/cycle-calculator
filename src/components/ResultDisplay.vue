<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
  result: {
    type: Object,
    default: null
  },
  error: {
    type: String,
    default: null
  }
})

const formattedDate = computed(() => {
  if (!props.result) return ''
  return new Date(props.result.nextDate).toLocaleDateString(locale.value)
})
</script>

<template>
  <div class="result-display">
    <p v-if="error" class="error-text">{{ error }}</p>
    <div v-if="result" class="result-content">
      <p class="result-item">{{ t('resultCycleLength', { days: result.cycleLength }) }}</p>
      <p class="result-item result-highlight">{{ t('resultNextDate', { date: formattedDate }) }}</p>
    </div>
  </div>
</template>
