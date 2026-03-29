<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const mode = defineModel({ required: true })
</script>

<template>
  <div class="flex gap-2 p-1 bg-bg rounded-[3px]">
    <button
      v-for="option in ['shortest', 'average']"
      :key="option"
      class="flex-1 py-2 text-[0.82rem] font-medium rounded-[3px] transition-all duration-250 cursor-pointer border-none"
      :class="mode === option
        ? 'bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
        : 'bg-transparent text-ink-light hover:text-ink-mid'"
      @click="mode = option"
    >
      {{ option === 'shortest' ? t('toggleShortest') : t('toggleAverage') }}
    </button>
  </div>
</template>
