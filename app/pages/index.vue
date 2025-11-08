<template>
  <div class="home-page">
    <!-- Header Navigation -->
    <Header />
    
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Services Section -->
    <Services />
    
    <!-- Contact Section -->
    <Contacts />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Page meta configuration
definePageMeta({
  title: 'Home - Construction Management',
  description: 'Professional construction management platform for teams and contractors'
})

// SEO configuration
useSeoMeta({
  title: 'Construction Management Platform',
  ogTitle: 'Construction Management Platform',
  description: 'Professional construction management platform for teams and contractors',
  ogDescription: 'Professional construction management platform for teams and contractors'
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>