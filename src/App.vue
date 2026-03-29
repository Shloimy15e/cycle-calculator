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
  <AppHeader />
  <ExplainerText />
  <DateEntryForm
    v-model="dates"
    @add="addDate"
    @remove="removeDate"
  />
  <CalculationToggle v-model="mode" />
  <div class="action-buttons">
    <button class="btn btn-primary" @click="calculate(t)">{{ t('calculate') }}</button>
    <button class="btn btn-secondary" @click="reset">{{ t('reset') }}</button>
  </div>
  <ResultDisplay :result="result" :error="error" />
</template>
