<template>
  <div class="language-switcher">
    <select 
      v-model="currentLocale" 
      @change="switchLanguage"
      class="language-select"
    >
      <option 
        v-for="locale in availableLocales" 
        :key="locale.code" 
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const currentLocale = ref(locale.value)
const availableLocales = locales.value

const switchLanguage = async () => {
  await setLocale(currentLocale.value)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  color: #1f2937;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.language-select:hover {
  border-color: #d1d5db;
}

.language-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

@media (max-width: 768px) {
  .language-select {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
}
</style>
