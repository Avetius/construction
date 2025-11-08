<template>
  <div class="media-page">
    <MediaLibrary />
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Media Library - Construction Admin',
  description: 'Manage images, documents, and media files',
  layout: 'admin'
})
</script>

<style scoped>
.media-page {
  padding: 2rem;
  background: #f8fafc;
  height: 100vh;
}

@media (max-width: 768px) {
  .media-page {
    padding: 1rem;
  }
}
</style>