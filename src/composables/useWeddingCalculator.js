import { ref, computed } from 'vue'

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

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

function daysBetween(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / (1000 * 60 * 60 * 24))
}

/**
 * Project periods forward from lastDate using cycleLength until we pass the wedding.
 * Returns { before: dateStr, after: dateStr }
 */
function findClosestPeriods(lastDate, cycleLength, weddingDate) {
  let current = lastDate
  let prev = null

  // Step forward by cycleLength until we pass the wedding
  while (current <= weddingDate) {
    prev = current
    current = addDaysUTC(current, cycleLength - 1)
  }

  // current is the first period ON or AFTER the wedding
  // prev is the last period BEFORE the wedding (or null if lastDate is already past wedding)
  return {
    before: prev,
    after: current
  }
}

export function useWeddingCalculator() {
  const weddingDate = ref('')
  const weddingResult = ref(null)
  const weddingError = ref(null)

  function calculateWedding(cycleResult, t) {
    if (!weddingDate.value) {
      weddingError.value = t('weddingErrorNoDate')
      weddingResult.value = null
      return
    }

    if (!cycleResult) {
      weddingError.value = t('weddingErrorNoCycle')
      weddingResult.value = null
      return
    }

    weddingError.value = null

    // We need the sorted dates from the cycle calc to get the last known period
    const lastDate = cycleResult.lastDate
    const wedding = weddingDate.value

    const scenarios = []

    // Average scenario
    const avg = findClosestPeriods(lastDate, cycleResult.average, wedding)
    scenarios.push({
      key: 'average',
      cycleLength: cycleResult.average,
      before: avg.before,
      after: avg.after,
      daysBefore: avg.before ? daysBetween(avg.before, wedding) : null,
      daysAfter: daysBetween(wedding, avg.after)
    })

    // Shortest scenario (only if different)
    if (cycleResult.shortest !== cycleResult.average) {
      const short = findClosestPeriods(lastDate, cycleResult.shortest, wedding)
      scenarios.push({
        key: 'earliest',
        cycleLength: cycleResult.shortest,
        before: short.before,
        after: short.after,
        daysBefore: short.before ? daysBetween(short.before, wedding) : null,
        daysAfter: daysBetween(wedding, short.after)
      })
    }

    // Longest scenario (only if different)
    if (cycleResult.longest !== cycleResult.average) {
      const long = findClosestPeriods(lastDate, cycleResult.longest, wedding)
      scenarios.push({
        key: 'latest',
        cycleLength: cycleResult.longest,
        before: long.before,
        after: long.after,
        daysBefore: long.before ? daysBetween(long.before, wedding) : null,
        daysAfter: daysBetween(wedding, long.after)
      })
    }

    weddingResult.value = { scenarios, weddingDate: wedding }
  }

  function resetWedding() {
    weddingDate.value = ''
    weddingResult.value = null
    weddingError.value = null
  }

  return { weddingDate, weddingResult, weddingError, calculateWedding, resetWedding }
}
