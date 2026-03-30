<script setup>
import { useI18n } from 'vue-i18n'
import { useWeddingCalculator } from '../composables/useWeddingCalculator.js'

const { t, locale } = useI18n()

const props = defineProps({
  cycleResult: {
    type: Object,
    default: null
  }
})

const { weddingDate, weddingResult, weddingError, calculateWedding, resetWedding } = useWeddingCalculator()

function onCalculate() {
  calculateWedding(props.cycleResult, t)
}

function fmtDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const colorMap = {
  average: { bg: 'bg-pink-pale', label: 'text-pink' },
  earliest: { bg: 'bg-teal-pale', label: 'text-teal' },
  latest: { bg: 'bg-purple-pale', label: 'text-purple' }
}
</script>

<template>
  <div>
    <div class="flex items-center gap-2.5 mb-1.5">
      <svg class="w-7 h-7 text-pink shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="14" r="5" />
        <circle cx="15" cy="14" r="5" />
      </svg>
      <h2 class="text-[1rem] font-bold text-ink">{{ t('weddingTitle') }}</h2>
    </div>
    <p class="text-[0.82rem] text-ink-light mb-5 leading-relaxed">{{ t('weddingExplainer') }}</p>

    <!-- Compact input row -->
    <div class="flex gap-2.5 items-end">
      <div class="flex-1 min-w-0">
        <label class="block text-[0.72rem] font-semibold text-ink-light uppercase tracking-wider mb-1">
          {{ t('weddingDateLabel') }}
        </label>
        <input
          v-model="weddingDate"
          type="date"
          class="w-full px-3.5 py-2.5 text-[0.9rem] rounded-[3px] border border-border bg-input-bg text-ink transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink/10 focus:border-pink"
        />
      </div>
      <button
        class="px-5 py-2.5 text-[0.85rem] font-semibold tracking-wide rounded-[3px] bg-pink text-white hover:bg-pink-hover active:scale-[0.97] transition-all duration-200 cursor-pointer border-none shadow-[0_2px_10px_rgba(209,28,116,0.2)] hover:shadow-[0_4px_16px_rgba(209,28,116,0.3)] shrink-0"
        @click="onCalculate"
      >{{ t('weddingCalculate') }}</button>
      <button
        class="px-3 py-2.5 text-[0.85rem] font-medium rounded-[3px] bg-bg text-ink-light hover:bg-border-light active:scale-[0.97] transition-all duration-200 cursor-pointer border-none shrink-0"
        @click="resetWedding"
      >{{ t('reset') }}</button>
    </div>

    <!-- Results -->
    <div class="mt-5">
      <Transition name="fade-slide" mode="out-in">
        <p v-if="weddingError" key="error" class="text-rose text-[0.85rem] bg-rose-pale rounded-[3px] px-5 py-3.5 font-medium">
          {{ weddingError }}
        </p>

        <div v-else-if="weddingResult" key="result" class="space-y-3">
          <div
            v-for="scenario in weddingResult.scenarios"
            :key="scenario.key"
            :class="[colorMap[scenario.key].bg, 'rounded-[3px] px-5 py-4']"
          >
            <p :class="[colorMap[scenario.key].label, 'text-[0.72rem] font-semibold tracking-[0.1em] uppercase mb-2.5']">
              {{ t('weddingScenario_' + scenario.key, { days: scenario.cycleLength }) }}
            </p>

            <!-- Side-by-side before / after -->
            <div class="grid grid-cols-2 gap-4">
              <div v-if="scenario.before">
                <p class="text-[0.7rem] font-medium text-ink-light mb-0.5">{{ t('weddingPeriodBefore') }}</p>
                <p class="text-[1.1rem] font-bold text-ink leading-snug">
                  {{ t('weddingDayCount', { days: scenario.daysBefore }) }}
                </p>
                <p class="text-[0.78rem] text-ink-mid mt-0.5">
                  {{ fmtDate(scenario.before) }}
                </p>
              </div>

              <div>
                <p class="text-[0.7rem] font-medium text-ink-light mb-0.5">{{ t('weddingPeriodAfter') }}</p>
                <p class="text-[1.1rem] font-bold text-ink leading-snug">
                  {{ t('weddingDayCount', { days: scenario.daysAfter }) }}
                </p>
                <p class="text-[0.78rem] text-ink-mid mt-0.5">
                  {{ fmtDate(scenario.after) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
