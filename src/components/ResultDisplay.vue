<script setup>
import { ref } from 'vue'
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

const showEarliestMore = ref(false)
const showLatestMore = ref(false)

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
        <!-- Earliest expected -->
        <div class="bg-teal-pale rounded-[3px] px-6 py-5">
          <p class="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-teal mb-1">
            {{ t('resultEarliest', { days: result.shortest }) }}
          </p>
          <p class="text-[1.15rem] font-bold text-ink leading-snug">
            {{ fmtDate(result.earliestDate) }}
          </p>
          <button
            class="text-[0.78rem] font-medium text-teal/70 hover:text-teal mt-2 cursor-pointer border-none bg-transparent p-0 transition-colors duration-200"
            @click="showEarliestMore = !showEarliestMore"
          >
            {{ showEarliestMore ? '▴' : '▾' }} {{ t('seeMore') }}
          </button>
          <div v-if="showEarliestMore" class="mt-2 space-y-1">
            <p v-for="(d, i) in result.earliestMore" :key="i" class="text-[0.88rem] text-ink-mid">
              {{ fmtDate(d) }}
            </p>
          </div>
        </div>

        <!-- Latest expected (only if different) -->
        <div v-if="result.longest !== result.shortest" class="bg-purple-pale rounded-[3px] px-6 py-5">
          <p class="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-purple mb-1">
            {{ t('resultLatest', { days: result.longest }) }}
          </p>
          <p class="text-[1.15rem] font-bold text-ink leading-snug">
            {{ fmtDate(result.latestDate) }}
          </p>
          <button
            class="text-[0.78rem] font-medium text-purple/70 hover:text-purple mt-2 cursor-pointer border-none bg-transparent p-0 transition-colors duration-200"
            @click="showLatestMore = !showLatestMore"
          >
            {{ showLatestMore ? '▴' : '▾' }} {{ t('seeMore') }}
          </button>
          <div v-if="showLatestMore" class="mt-2 space-y-1">
            <p v-for="(d, i) in result.latestMore" :key="i" class="text-[0.88rem] text-ink-mid">
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
