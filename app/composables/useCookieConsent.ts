type CookieConsentSource = 'banner-accept-all' | 'banner-reject-non-essential' | 'custom-preferences' | 'gpc-default' | 'unknown'

export interface CookiePreferences {
  essential: true
  functional: boolean
  analytics: boolean
  marketing: boolean
  doNotSellOrShare: boolean
  updatedAt: number
  version: number
  source: CookieConsentSource
}

const STORAGE_KEY = 'construction_cookie_preferences_v1'
const CONSENT_VERSION = 1
const KNOWN_NON_ESSENTIAL_COOKIES = [
  '_ga',
  '_gid',
  '_gat',
  '_gcl_au',
  '_fbp',
  '_fbc',
  'IDE',
  'analytics_session',
  'perf_monitor',
  'marketing_consent'
]

const defaultPreferences = (): CookiePreferences => ({
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
  doNotSellOrShare: false,
  updatedAt: 0,
  version: CONSENT_VERSION,
  source: 'unknown'
})

const mergePreferences = (
  base: CookiePreferences,
  next: Partial<CookiePreferences>,
  source: CookieConsentSource
): CookiePreferences => ({
  ...base,
  ...next,
  essential: true,
  version: CONSENT_VERSION,
  source,
  updatedAt: Date.now()
})

const removeCookie = (name: string) => {
  if (!import.meta.client) {
    return
  }

  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = `${name}=; expires=${expires}; path=/; SameSite=Lax`

  const host = window.location.hostname
  if (host.includes('.')) {
    document.cookie = `${name}=; expires=${expires}; path=/; domain=.${host}; SameSite=Lax`
  }
}

const clearNonEssentialCookies = () => {
  KNOWN_NON_ESSENTIAL_COOKIES.forEach(removeCookie)
}

const emitConsentUpdate = (preferences: CookiePreferences) => {
  if (!import.meta.client) {
    return
  }

  window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: preferences }))
}

const getGlobalPrivacyControl = () => {
  if (!import.meta.client || typeof navigator === 'undefined') {
    return false
  }

  return navigator.globalPrivacyControl === true
}

export const useCookieConsent = () => {
  const preferences = useState<CookiePreferences>('cookie-preferences', defaultPreferences)
  const hasInteracted = useState<boolean>('cookie-has-interacted', () => false)
  const isReady = useState<boolean>('cookie-consent-ready', () => false)
  const isPreferencesOpen = useState<boolean>('cookie-preferences-open', () => false)

  const persist = () => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences.value))
  }

  const commitPreferences = (
    next: Partial<CookiePreferences>,
    source: CookieConsentSource,
    markInteracted = true
  ) => {
    preferences.value = mergePreferences(preferences.value, next, source)

    if (markInteracted) {
      hasInteracted.value = true
    }

    persist()

    if (!preferences.value.analytics || !preferences.value.marketing || preferences.value.doNotSellOrShare) {
      clearNonEssentialCookies()
    }

    emitConsentUpdate(preferences.value)
  }

  const init = () => {
    if (!import.meta.client || isReady.value) {
      return
    }

    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<CookiePreferences>
        preferences.value = {
          ...defaultPreferences(),
          ...parsed,
          essential: true,
          version: CONSENT_VERSION
        }
        hasInteracted.value = true
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    } else if (getGlobalPrivacyControl()) {
      // Respect browser-level opt-out signals (GPC) by default.
      preferences.value = mergePreferences(defaultPreferences(), {
        marketing: false,
        doNotSellOrShare: true
      }, 'gpc-default')
      persist()
    }

    isReady.value = true
    emitConsentUpdate(preferences.value)
  }

  const openPreferences = () => {
    isPreferencesOpen.value = true
  }

  const closePreferences = () => {
    isPreferencesOpen.value = false
  }

  const acceptAll = () => {
    commitPreferences({
      functional: true,
      analytics: true,
      marketing: true,
      doNotSellOrShare: false
    }, 'banner-accept-all')
    closePreferences()
  }

  const rejectNonEssential = () => {
    commitPreferences({
      functional: false,
      analytics: false,
      marketing: false,
      doNotSellOrShare: true
    }, 'banner-reject-non-essential')
    closePreferences()
  }

  const savePreferences = (next: Partial<CookiePreferences>) => {
    commitPreferences({
      functional: !!next.functional,
      analytics: !!next.analytics,
      marketing: !!next.marketing && !next.doNotSellOrShare,
      doNotSellOrShare: !!next.doNotSellOrShare
    }, 'custom-preferences')
    closePreferences()
  }

  const resetConsent = () => {
    preferences.value = defaultPreferences()
    hasInteracted.value = false

    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }

    clearNonEssentialCookies()
    emitConsentUpdate(preferences.value)
  }

  const canUseCategory = (category: 'essential' | 'functional' | 'analytics' | 'marketing') => {
    if (category === 'essential') {
      return true
    }

    if (category === 'marketing') {
      return preferences.value.marketing && !preferences.value.doNotSellOrShare
    }

    return preferences.value[category]
  }

  if (import.meta.client && !isReady.value) {
    init()
  }

  return {
    preferences,
    hasInteracted,
    isReady,
    isPreferencesOpen,
    init,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    resetConsent,
    canUseCategory,
    globalPrivacyControlEnabled: computed(() => getGlobalPrivacyControl())
  }
}
