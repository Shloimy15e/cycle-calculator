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
  <div class="mt-2">
    <p v-if="error" class="text-[#c0392b] bg-[#fce8ea] border-[1.5px] border-[#f5b7bb] rounded-lg px-4 py-3 font-medium text-[0.95rem]">{{ error }}</p>
    <div v-if="result" class="bg-[#f0f4ff] border-[1.5px] border-[#c5d0f5] rounded-xl px-[1.4rem] py-[1.1rem]">
      <p class="text-base text-[#2d3561] mb-[0.4rem]">{{ t('resultCycleLength', { days: result.cycleLength }) }}</p>
      <p class="font-bold text-[1.1rem] text-[#3d52b5]">{{ t('resultNextDate', { date: formattedDate }) }}</p>
    </div>
  </div>
</template>
