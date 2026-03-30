<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dates = defineModel({ required: true })

const props = defineProps({
  gaps: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add', 'remove'])
</script>

<template>
  <div>
    <div v-for="(date, index) in dates" :key="index">
      <!-- Gap indicator between dates -->
      <div v-if="index > 0 && props.gaps[index - 1]" class="flex items-center gap-3 my-3 px-1">
        <div class="flex-1 h-px bg-teal/15"></div>
        <span class="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-teal bg-teal-pale px-2.5 py-1 rounded-full whitespace-nowrap">
          {{ props.gaps[index - 1] }} {{ props.gaps[index - 1] === 1 ? 'day' : 'days' }}
        </span>
        <div class="flex-1 h-px bg-teal/15"></div>
      </div>

      <!-- Spacer when no gap to show -->
      <div v-else-if="index > 0" class="h-3"></div>

      <label :for="`date-${index}`" class="block text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-ink-light mb-1 ps-0.5">
        {{ t('dateLabel', { n: index + 1 }) }}
      </label>
      <div class="flex items-center gap-2">
        <input
          :id="`date-${index}`"
          v-model="dates[index]"
          type="date"
          class="flex-1 min-w-0 px-3.5 py-2.5 text-[0.9rem] border border-border rounded-[3px] bg-input-bg text-ink transition-all duration-200 focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/10 focus:bg-card"
        />
        <button
          v-if="dates.length > 2"
          class="p-2 rounded-[3px] text-ink-light/30 hover:text-rose hover:bg-rose-pale transition-all duration-200 cursor-pointer border-none bg-transparent shrink-0"
          :title="t('remove')"
          @click="emit('remove', index)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <button
      class="text-[0.82rem] font-medium text-teal hover:text-teal-hover transition-colors duration-200 cursor-pointer border-none bg-transparent ps-0.5 mt-4 inline-block"
      @click="emit('add')"
    >+ {{ t('addDate') }}</button>
  </div>
</template>
