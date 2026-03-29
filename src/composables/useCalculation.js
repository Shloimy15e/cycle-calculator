import { ref } from 'vue'

export function useCalculation() {
  const dates = ref(['', ''])
  const mode = ref('shortest') // 'shortest' | 'average'
  const result = ref(null)
  const error = ref(null)

  function addDate() {
    dates.value.push('')
  }

  function removeDate(index) {
    if (dates.value.length > 2) {
      dates.value.splice(index, 1)
    }
  }

  function validate(t) {
    if (dates.value.some(d => d === '')) return t('errorEmpty')

    const today = new Date().toISOString().split('T')[0]
    for (const d of dates.value) {
      if (d > today) return t('errorFutureDate')
    }

    const unique = new Set(dates.value)
    if (unique.size !== dates.value.length) return t('errorDuplicate')

    return null
  }

  function calculate(t) {
    const validationError = validate(t)
    if (validationError) {
      error.value = validationError
      result.value = null
      return
    }

    error.value = null
    const sorted = [...dates.value].sort()
    const cycleLengths = []

    for (let i = 1; i < sorted.length; i++) {
      const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / (1000 * 60 * 60 * 24)
      cycleLengths.push(diff)
    }

    let cycleLength
    if (mode.value === 'shortest') {
      cycleLength = Math.min(...cycleLengths)
    } else {
      cycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
    }

    const lastDate = new Date(sorted[sorted.length - 1])
    const nextDate = new Date(lastDate)
    nextDate.setDate(nextDate.getDate() + cycleLength)

    result.value = {
      cycleLength,
      nextDate: nextDate.toISOString().split('T')[0]
    }
  }

  function reset() {
    dates.value = ['', '']
    mode.value = 'shortest'
    result.value = null
    error.value = null
  }

  return { dates, mode, result, error, addDate, removeDate, calculate, reset }
}
