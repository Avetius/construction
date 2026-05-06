<template>
  <div>
    <Transition name="cookie-slide">
      <section
        v-if="showBanner"
        class="cookie-banner"
        aria-label="Cookie consent"
      >
        <div class="cookie-banner__content">
          <h3>Privacy Controls</h3>
          <p>
            We use cookies to keep this site working and to improve analytics and marketing.
            Under CCPA/CPRA, you can opt out of the sale or sharing of personal information at any time.
          </p>
        </div>

        <div class="cookie-banner__actions">
          <button type="button" class="btn-secondary" @click="rejectNonEssential">
            Reject Non-Essential
          </button>
          <button type="button" class="btn-outline" @click="openPreferences">
            Manage Preferences
          </button>
          <button type="button" class="btn-primary" @click="acceptAll">
            Accept All
          </button>
        </div>
      </section>
    </Transition>

    <Transition name="fade">
      <div
        v-if="isPreferencesOpen"
        class="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
      >
        <div class="cookie-modal__backdrop" @click="closePreferences" />

        <div class="cookie-modal__panel">
          <header class="cookie-modal__header">
            <div>
              <h2 id="cookie-settings-title">Your Privacy Choices</h2>
              <p>Manage consent categories and CCPA opt-out preferences.</p>
            </div>
            <button type="button" class="close-btn" @click="closePreferences" aria-label="Close preferences">
              x
            </button>
          </header>

          <div class="cookie-modal__body">
            <div class="cookie-row cookie-row--locked">
              <div>
                <h3>Strictly Necessary</h3>
                <p>Required for security and core site behavior. Always active.</p>
              </div>
              <span class="badge">Always on</span>
            </div>

            <label class="cookie-row" for="functional-toggle">
              <div>
                <h3>Functional Cookies</h3>
                <p>Remember language, forms, and accessibility settings.</p>
              </div>
              <input id="functional-toggle" v-model="draft.functional" type="checkbox">
            </label>

            <label class="cookie-row" for="analytics-toggle">
              <div>
                <h3>Analytics Cookies</h3>
                <p>Measure visits and performance to improve the website.</p>
              </div>
              <input id="analytics-toggle" v-model="draft.analytics" type="checkbox">
            </label>

            <label class="cookie-row" for="marketing-toggle">
              <div>
                <h3>Marketing Cookies</h3>
                <p>Used for ad personalization and campaign measurement.</p>
              </div>
              <input id="marketing-toggle" v-model="draft.marketing" type="checkbox" :disabled="draft.doNotSellOrShare">
            </label>

            <label class="cookie-row" for="ccpa-toggle">
              <div>
                <h3>Do Not Sell or Share (CCPA/CPRA)</h3>
                <p>
                  Turning this on opts you out of cross-context behavioral advertising and related data sharing.
                </p>
              </div>
              <input id="ccpa-toggle" v-model="draft.doNotSellOrShare" type="checkbox">
            </label>

            <p v-if="globalPrivacyControlEnabled" class="gpc-note">
              Your browser has Global Privacy Control enabled. We treat this as an opt-out signal.
            </p>
          </div>

          <footer class="cookie-modal__footer">
            <NuxtLink to="/privacy" @click="closePreferences">Read Privacy Policy</NuxtLink>
            <div class="cookie-modal__footer-actions">
              <button type="button" class="btn-secondary" @click="rejectNonEssential">Reject Non-Essential</button>
              <button type="button" class="btn-primary" @click="saveDraft">Save Choices</button>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const {
  preferences,
  hasInteracted,
  isReady,
  isPreferencesOpen,
  openPreferences,
  closePreferences,
  acceptAll,
  rejectNonEssential,
  savePreferences,
  globalPrivacyControlEnabled
} = useCookieConsent()

const draft = ref({
  functional: false,
  analytics: false,
  marketing: false,
  doNotSellOrShare: false
})

const showBanner = computed(() => isReady.value && !hasInteracted.value)

watch(
  isPreferencesOpen,
  (open) => {
    if (!open) {
      return
    }

    draft.value = {
      functional: preferences.value.functional,
      analytics: preferences.value.analytics,
      marketing: preferences.value.marketing,
      doNotSellOrShare: preferences.value.doNotSellOrShare
    }
  },
  { immediate: true }
)

watch(
  () => draft.value.doNotSellOrShare,
  (enabled) => {
    if (enabled) {
      draft.value.marketing = false
    }
  }
)

const saveDraft = () => {
  savePreferences({ ...draft.value })
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  inset: auto 1rem 1rem 1rem;
  z-index: 60;
  background: #111827;
  color: #f9fafb;
  border: 1px solid #374151;
  border-radius: 14px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 20px 40px rgba(17, 24, 39, 0.28);
}

.cookie-banner__content h3 {
  margin: 0 0 0.3rem 0;
  color: #ffffff;
  font-size: 1rem;
}

.cookie-banner__content p {
  margin: 0;
  color: #d1d5db;
  max-width: 740px;
  font-size: 0.925rem;
}

.cookie-banner__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: #f59e0b;
  color: #111827;
  border: none;
}

.btn-primary:hover {
  background: #d97706;
}

.btn-outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid #6b7280;
}

.btn-outline:hover {
  background: #1f2937;
}

.btn-secondary {
  background: #374151;
  color: #ffffff;
}

.btn-secondary:hover {
  background: #4b5563;
}

.cookie-modal {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.cookie-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.6);
}

.cookie-modal__panel {
  position: relative;
  width: min(760px, 100%);
  max-height: 90vh;
  overflow: auto;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 30px 80px rgba(17, 24, 39, 0.34);
}

.cookie-modal__header {
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.cookie-modal__header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.cookie-modal__header p {
  margin: 0.35rem 0 0 0;
  color: #6b7280;
}

.close-btn {
  background: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  padding: 0;
}

.cookie-modal__body {
  padding: 1rem 1.25rem;
  display: grid;
  gap: 0.8rem;
}

.cookie-row {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
}

.cookie-row--locked {
  background: #f8fafc;
}

.cookie-row h3 {
  margin: 0;
  font-size: 1rem;
}

.cookie-row p {
  margin: 0.25rem 0 0 0;
  color: #6b7280;
  font-size: 0.92rem;
}

.cookie-row input[type='checkbox'] {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #f59e0b;
  cursor: pointer;
}

.badge {
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.gpc-note {
  margin: 0.2rem 0 0 0;
  padding: 0.75rem;
  border-radius: 10px;
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fcd34d;
}

.cookie-modal__footer {
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.cookie-modal__footer-actions {
  display: flex;
  gap: 0.5rem;
}

.fade-enter-active,
.fade-leave-active,
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(18px);
  opacity: 0;
}

@media (max-width: 900px) {
  .cookie-banner {
    flex-direction: column;
    align-items: flex-start;
  }

  .cookie-banner__actions {
    width: 100%;
  }

  .cookie-modal__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .cookie-modal__footer-actions {
    width: 100%;
    flex-direction: column;
  }

  .cookie-modal__footer-actions button {
    width: 100%;
  }
}
</style>
