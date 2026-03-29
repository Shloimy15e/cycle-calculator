<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dates = defineModel({ required: true })

const emit = defineEmits(['add', 'remove'])
</script>

<template>
  <div class="date-entry-form">
    <div
      v-for="(date, index) in dates"
      :key="index"
      class="date-row"
    >
      <label :for="`date-${index}`" class="date-label">
        {{ t('dateLabel', { n: index + 1 }) }}
      </label>
      <div class="date-row-inputs">
        <input
          :id="`date-${index}`"
          v-model="dates[index]"
          type="date"
          class="input-date"
        />
        <button
          class="btn btn-danger"
          :disabled="dates.length <= 2"
          @click="emit('remove', index)"
        >
          {{ t('remove') }}
        </button>
      </div>
    </div>
    <button class="btn btn-secondary" @click="emit('add')">
      {{ t('addDate') }}
    </button>
  </div>
</template>
