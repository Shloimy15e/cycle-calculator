import { ref, computed, watch } from 'vue'

export function useCalculation() {
  const dates = ref(['', ''])
  const savedMode = localStorage.getItem('period-calc-mode') || 'shortest'
  const mode = ref(savedMode)

  watch(mode, (val) => {
    localStorage.setItem('period-calc-mode', val)
  })

  const result = ref(null)
  const error = ref(null)

  // Auto-sort filled dates and compute gaps between consecutive pairs
  const gaps = computed(() => {
    const filled = dates.value.filter(d => d !== '')
    if (filled.length < 2) return []
    const sorted = [...filled].sort()
    const result = []
    for (let i = 1; i < sorted.length; i++) {
      const days = Math.round((new Date(sorted[i]) - new Date(sorted[i - 1])) / (1000 * 60 * 60 * 24)) + 1
      result.push(days)
    }
    return result
  })

  // Auto-sort: when a date is entered/changed, sort filled dates to the front
  function sortDates() {
    const filled = dates.value.filter(d => d !== '')
    const empty = dates.value.filter(d => d === '')
    filled.sort()
    dates.value = [...filled, ...empty]
  }

  function addDate() {
    dates.value.push('')
  }

  function removeDate(index) {
    if (dates.value.length > 2) {
      dates.value.splice(index, 1)
    }
  }

  function validate(filled, t) {
    if (filled.length < 2) return t('errorMinDates')

    const today = new Date().toISOString().split('T')[0]
    for (const d of filled) {
      if (d > today) return t('errorFutureDate')
    }

    const unique = new Set(filled)
    if (unique.size !== filled.length) return t('errorDuplicate')

    return null
  }

  function calculate(t) {
    sortDates()
    const filled = dates.value.filter(d => d !== '')
    const validationError = validate(filled, t)
    if (validationError) {
      error.value = validationError
      result.value = null
      return
    }

    error.value = null
    const sorted = [...filled].sort()
    const cycleLengths = []

    for (let i = 1; i < sorted.length; i++) {
      const diff = Math.round((new Date(sorted[i]) - new Date(sorted[i - 1])) / (1000 * 60 * 60 * 24)) + 1
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
    nextDate.setDate(nextDate.getDate() + cycleLength - 1)

    result.value = {
      cycleLength,
      cycleLengths,
      nextDate: nextDate.toISOString().split('T')[0]
    }
  }

  function reset() {
    dates.value = ['', '']
    mode.value = 'shortest'
    result.value = null
    error.value = null
  }

  return { dates, mode, result, error, gaps, addDate, removeDate, calculate, reset }
}
