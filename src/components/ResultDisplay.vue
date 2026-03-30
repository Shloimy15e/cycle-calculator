<script setup>
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

function fmtDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="mt-6">
    <Transition name="fade-slide" mode="out-in">
      <p v-if="error" key="error" class="text-rose text-[0.85rem] bg-rose-pale rounded-[3px] px-5 py-3.5 font-medium">
        {{ error }}
      </p>

      <div v-else-if="result" key="result" class="space-y-3">
        <!-- Average expected -->
        <div class="bg-pink-pale rounded-[3px] px-6 py-5">
          <p class="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-pink mb-1">
            {{ t('resultAverage', { days: result.average }) }}
            <span v-if="result.shortest === result.average && result.longest === result.average" class="text-ink-light">
              · {{ t('alsoEarliestAndLatest') }}
            </span>
            <span v-else-if="result.shortest === result.average" class="text-ink-light">
              · {{ t('alsoEarliest') }}
            </span>
            <span v-else-if="result.longest === result.average" class="text-ink-light">
              · {{ t('alsoLatest') }}
            </span>
          </p>
          <p class="text-[1.15rem] font-bold text-ink leading-snug">
            {{ fmtDate(result.averageDate) }}
          </p>
          <div class="mt-2 space-y-0.5">
            <p v-for="(d, i) in result.averageMore" :key="i" class="text-[0.85rem] text-ink-mid">
              {{ fmtDate(d) }}
            </p>
          </div>
        </div>

        <!-- Earliest expected -->
        <div v-if="result.shortest !== result.average" class="bg-teal-pale rounded-[3px] px-6 py-5">
          <p class="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-teal mb-1">
            {{ t('resultEarliest', { days: result.shortest }) }}
          </p>
          <p class="text-[1.15rem] font-bold text-ink leading-snug">
            {{ fmtDate(result.earliestDate) }}
          </p>
          <div class="mt-2 space-y-0.5">
            <p v-for="(d, i) in result.earliestMore" :key="i" class="text-[0.85rem] text-ink-mid">
              {{ fmtDate(d) }}
            </p>
          </div>
        </div>

        <!-- Latest expected -->
        <div v-if="result.longest !== result.average" class="bg-purple-pale rounded-[3px] px-6 py-5">
          <p class="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-purple mb-1">
            {{ t('resultLatest', { days: result.longest }) }}
          </p>
          <p class="text-[1.15rem] font-bold text-ink leading-snug">
            {{ fmtDate(result.latestDate) }}
          </p>
          <div class="mt-2 space-y-0.5">
            <p v-for="(d, i) in result.latestMore" :key="i" class="text-[0.85rem] text-ink-mid">
              {{ fmtDate(d) }}
            </p>
          </div>
        </div>

        <!-- Individual cycles -->
        <div v-if="result.cycleLengths.length > 1" class="px-2 pt-1">
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
