<script setup>
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import ExplainerText from './components/ExplainerText.vue'
import DateEntryForm from './components/DateEntryForm.vue'
import ResultDisplay from './components/ResultDisplay.vue'
import WeddingCalculator from './components/WeddingCalculator.vue'
import { useCalculation } from './composables/useCalculation.js'

const { t } = useI18n()
const { dates, result, error, gaps, addDate, removeDate, calculate, reset } = useCalculation()
</script>

<template>
  <div class="min-h-screen bg-bg px-5 py-12 sm:py-20">
    <div class="max-w-[480px] mx-auto">
      <AppHeader />

      <main class="bg-card rounded-[3px] border border-border-light shadow-[0_2px_20px_rgba(0,0,0,0.06)] px-6 py-8 sm:px-9 sm:py-10">
        <ExplainerText />

        <DateEntryForm
          v-model="dates"
          :gaps="gaps"
          @add="addDate"
          @remove="removeDate"
        />

        <div class="flex gap-3 mt-8">
          <button
            class="flex-1 py-3 text-[0.9rem] font-semibold tracking-wide rounded-[3px] bg-pink text-white hover:bg-pink-hover active:scale-[0.97] transition-all duration-200 cursor-pointer border-none shadow-[0_2px_10px_rgba(209,28,116,0.2)] hover:shadow-[0_4px_16px_rgba(209,28,116,0.3)]"
            @click="calculate(t)"
          >{{ t('calculate') }}</button>
          <button
            class="px-5 py-3 text-[0.9rem] font-medium rounded-[3px] bg-bg text-ink-light hover:bg-border-light active:scale-[0.97] transition-all duration-200 cursor-pointer border-none"
            @click="reset"
          >{{ t('reset') }}</button>
        </div>

        <ResultDisplay :result="result" :error="error" />
      </main>

      <!-- Step 2: Wedding Calculator (own card, only after cycle results) -->
      <Transition name="fade-slide">
        <section v-if="result" class="bg-card rounded-[3px] border border-border-light shadow-[0_2px_20px_rgba(0,0,0,0.06)] px-6 py-8 sm:px-9 sm:py-10 mt-4">
          <WeddingCalculator :cycleResult="result" />
        </section>
      </Transition>
    </div>
  </div>
</template>
