<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dates = defineModel({ required: true })

const emit = defineEmits(['add', 'remove'])
</script>

<template>
  <div class="mb-6">
    <div
      v-for="(date, index) in dates"
      :key="index"
      class="mb-[0.85rem]"
    >
      <label :for="`date-${index}`" class="block font-semibold text-[0.9rem] mb-1 text-[#2d3561]">
        {{ t('dateLabel', { n: index + 1 }) }}
      </label>
      <div class="flex items-center gap-[0.6rem]">
        <input
          :id="`date-${index}`"
          v-model="dates[index]"
          type="date"
          class="flex-1 min-w-0 px-[0.85rem] py-[0.6rem] text-base border-[1.5px] border-[#c8cfe0] rounded-lg bg-[#f9fafc] text-[#1a1a2e] transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-[#5b7cfa] focus:shadow-[0_0_0_3px_rgba(91,124,250,0.18)] focus:bg-white"
        />
        <button
          class="inline-flex items-center justify-center px-[0.9rem] py-2 text-[0.85rem] font-semibold rounded-lg bg-[#fce8ea] text-[#c0392b] hover:not-disabled:bg-[#f5b7bb] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all cursor-pointer border-none"
          :disabled="dates.length <= 2"
          @click="emit('remove', index)"
        >
          {{ t('remove') }}
        </button>
      </div>
    </div>
    <button
      class="inline-flex items-center justify-center px-5 py-2 text-[0.95rem] font-semibold rounded-lg bg-[#e8ecf6] text-[#2d3561] hover:bg-[#d5dcf0] active:scale-[0.97] transition-all cursor-pointer border-none"
      @click="emit('add')"
    >
      {{ t('addDate') }}
    </button>
  </div>
</template>
