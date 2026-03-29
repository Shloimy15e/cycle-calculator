<script setup>
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import ExplainerText from './components/ExplainerText.vue'
import DateEntryForm from './components/DateEntryForm.vue'
import CalculationToggle from './components/CalculationToggle.vue'
import ResultDisplay from './components/ResultDisplay.vue'
import { useCalculation } from './composables/useCalculation.js'

const { t } = useI18n()
const { dates, mode, result, error, addDate, removeDate, calculate, reset } = useCalculation()
</script>

<template>
  <div class="min-h-screen bg-slate-100 py-8 px-4 font-sans text-[#1a1a2e]">
    <div class="max-w-[600px] mx-auto bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-10 py-8 max-sm:px-5 max-sm:py-6 max-sm:rounded-xl">
      <AppHeader />
      <ExplainerText />
      <DateEntryForm
        v-model="dates"
        @add="addDate"
        @remove="removeDate"
      />
      <CalculationToggle v-model="mode" />
      <div class="flex gap-3 mb-6 flex-wrap max-sm:flex-col">
        <button
          class="inline-flex items-center justify-center px-5 py-2 text-[0.95rem] font-semibold rounded-lg bg-[#5b7cfa] text-white shadow-[0_2px_8px_rgba(91,124,250,0.3)] hover:bg-[#4366e8] hover:shadow-[0_4px_14px_rgba(91,124,250,0.4)] active:scale-[0.97] transition-all cursor-pointer border-none max-sm:w-full"
          @click="calculate(t)"
        >{{ t('calculate') }}</button>
        <button
          class="inline-flex items-center justify-center px-5 py-2 text-[0.95rem] font-semibold rounded-lg bg-[#e8ecf6] text-[#2d3561] hover:bg-[#d5dcf0] active:scale-[0.97] transition-all cursor-pointer border-none max-sm:w-full"
          @click="reset"
        >{{ t('reset') }}</button>
      </div>
      <ResultDisplay :result="result" :error="error" />
    </div>
  </div>
</template>
