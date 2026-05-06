type GoogleCredentialResponse = {
  credential?: string
}

type GoogleIdAPI = {
  initialize: (config: {
    client_id: string
    callback: (response: GoogleCredentialResponse) => void
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
    use_fedcm_for_prompt?: boolean
  }) => void
  prompt: () => void
  cancel: () => void
  renderButton?: (
    parent: HTMLElement,
    options: {
      theme?: 'outline' | 'filled_blue' | 'filled_black'
      size?: 'large' | 'medium' | 'small'
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
      shape?: 'rectangular' | 'pill' | 'circle' | 'square'
      width?: number
    }
  ) => void
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: GoogleIdAPI
      }
    }
  }
}

type OneTapOptions = {
  clientId: string
  buttonElement?: HTMLElement | null
  onCredential: (credential: string) => Promise<void> | void
  onError?: (error: Error) => void
}

let googleScriptPromise: Promise<void> | null = null

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

async function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) {
    return
  }

  if (googleScriptPromise) {
    await googleScriptPromise
    return
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_SCRIPT_SRC}"]`)

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Sign-In script')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = GOOGLE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Sign-In script'))
    document.head.appendChild(script)
  })

  await googleScriptPromise
}

export const useGoogleOneTap = () => {
  const initGoogleOneTap = async (options: OneTapOptions): Promise<() => void> => {
    if (!options.clientId) {
      throw new Error('Google client ID is not configured')
    }

    await loadGoogleScript()

    const googleId = window.google?.accounts?.id
    if (!googleId) {
      throw new Error('Google Identity Services is unavailable')
    }

    googleId.initialize({
      client_id: options.clientId,
      callback: async (response) => {
        if (!response.credential) {
          options.onError?.(new Error('Missing Google credential response'))
          return
        }

        try {
          await options.onCredential(response.credential)
        } catch (error) {
          options.onError?.(error instanceof Error ? error : new Error('Google sign-in failed'))
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: true
    })

    if (options.buttonElement && googleId.renderButton) {
      options.buttonElement.innerHTML = ''
      googleId.renderButton(options.buttonElement, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        width: 320
      })
    }

    googleId.prompt()

    return () => {
      googleId.cancel()
    }
  }

  return {
    initGoogleOneTap
  }
}
