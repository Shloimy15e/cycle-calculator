<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const mode = defineModel({ required: true })
</script>

<template>
  <div class="flex gap-6 mb-6 flex-wrap">
    <label class="flex items-center gap-[0.4rem] font-medium cursor-pointer select-none">
      <input
        v-model="mode"
        type="radio"
        value="shortest"
        class="accent-[#5b7cfa] w-[1.1em] h-[1.1em] cursor-pointer"
      />
      {{ t('toggleShortest') }}
    </label>
    <label class="flex items-center gap-[0.4rem] font-medium cursor-pointer select-none">
      <input
        v-model="mode"
        type="radio"
        value="average"
        class="accent-[#5b7cfa] w-[1.1em] h-[1.1em] cursor-pointer"
      />
      {{ t('toggleAverage') }}
    </label>
  </div>
</template>
