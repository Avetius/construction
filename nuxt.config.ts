// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Koyeb deployment configuration
  nitro: {
    preset: 'node-server',
    experimental: {
      wasm: true
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],
  
  // Runtime config for Koyeb
  runtimeConfig: {
    // Private keys (available only on server-side)
    jwtSecret: 'default-jwt-secret',
    sessionSecret: 'default-session-secret',
    dbPath: './data/construction.db',
    
    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api'
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.json'
      }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  }
})