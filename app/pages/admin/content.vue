<template>
  <div class="content-management-page">
    <AdminContent />
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Content Management - Construction Admin',
  description: 'Manage website content, blog posts, and project portfolios',
  layout: 'admin'
})
</script>

<style scoped>
.content-management-page {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .content-management-page {
    padding: 1rem;
  }
}
</style>