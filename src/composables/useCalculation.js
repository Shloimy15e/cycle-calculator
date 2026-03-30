import { ref, computed } from 'vue'

// Parse 'YYYY-MM-DD' without timezone issues
function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

// Format UTC date to 'YYYY-MM-DD'
function formatDate(date) {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, '0')
  const d = String(date.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDaysUTC(dateStr, days) {
  const d = parseDate(dateStr)
  d.setUTCDate(d.getUTCDate() + days)
  return formatDate(d)
}

// Days between two date strings (exclusive)
function daysBetween(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / (1000 * 60 * 60 * 24))
}

export function useCalculation() {
  const dates = ref(['', '', ''])
  const result = ref(null)
  const error = ref(null)

  // Compute inclusive gaps between consecutive sorted dates
  const gaps = computed(() => {
    const filled = dates.value.filter(d => d !== '')
    if (filled.length < 2) return []
    const sorted = [...filled].sort()
    const out = []
    for (let i = 1; i < sorted.length; i++) {
      out.push(daysBetween(sorted[i - 1], sorted[i]) + 1)
    }
    return out
  })

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

    const today = formatDate(new Date())
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
      cycleLengths.push(daysBetween(sorted[i - 1], sorted[i]) + 1)
    }

    const shortest = Math.min(...cycleLengths)
    const longest = Math.max(...cycleLengths)
    const lastDate = sorted[sorted.length - 1]

    result.value = {
      shortest,
      longest,
      cycleLengths,
      earliestDate: addDaysUTC(lastDate, shortest - 1),
      latestDate: addDaysUTC(lastDate, longest - 1)
    }
  }

  function reset() {
    dates.value = ['', '', '']
    result.value = null
    error.value = null
  }

  return { dates, result, error, gaps, addDate, removeDate, calculate, reset }
}
