<template>
  <div class="content-editor-page">
    <ContentEditor :content-id="contentId" />
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Content Editor - Construction Admin',
  description: 'Create and edit website content',
  layout: 'admin'
})

// Get content ID from route params
const route = useRoute()
const contentId = computed(() => route.params.id)
</script>

<style scoped>
.content-editor-page {
  background: #f8fafc;
}
</style>