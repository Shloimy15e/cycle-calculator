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
  return new Date(props.result.nextDate).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="mt-6">
    <Transition name="fade-slide" mode="out-in">
      <p v-if="error" key="error" class="text-rose text-[0.85rem] bg-rose-pale rounded-[3px] px-5 py-3.5 font-medium">
        {{ error }}
      </p>

      <div v-else-if="result" key="result" class="space-y-3">
        <div class="bg-teal-pale rounded-[3px] px-6 py-5">
          <p class="text-[0.8rem] text-teal font-medium tracking-wide uppercase mb-1">
            {{ t('resultCycleLength', { days: result.cycleLength }) }}
          </p>
          <p class="text-[1.15rem] font-bold text-ink leading-snug">
            {{ t('resultNextDate', { date: formattedDate }) }}
          </p>
        </div>

        <div v-if="result.cycleLengths && result.cycleLengths.length > 1" class="px-2">
          <p class="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-ink-light mb-2">
            {{ t('cycleDetails') }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(days, i) in result.cycleLengths"
              :key="i"
              class="text-[0.8rem] text-ink-mid bg-bg px-3 py-1 rounded-[3px]"
            >
              {{ t('cycleDetail', { n: i + 1, days }) }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
