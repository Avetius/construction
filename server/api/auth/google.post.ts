import { db } from '../../utils/database'

type GoogleTokenInfo = {
  aud: string
  sub: string
  email?: string
  email_verified?: 'true' | 'false'
  given_name?: string
  family_name?: string
  name?: string
  picture?: string
}

type GoogleAuthBody = {
  credential?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<GoogleAuthBody>(event)
  const credential = body?.credential

  if (!credential) {
    throw createError({ statusCode: 400, statusMessage: 'Missing Google credential' })
  }

  const runtimeConfig = useRuntimeConfig(event)
  const expectedClientId = process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || runtimeConfig.public.googleClientId

  if (!expectedClientId) {
    throw createError({ statusCode: 500, statusMessage: 'Google client ID is not configured on server' })
  }

  let tokenInfo: GoogleTokenInfo

  try {
    tokenInfo = await $fetch<GoogleTokenInfo>('https://oauth2.googleapis.com/tokeninfo', {
      query: { id_token: credential }
    })
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid Google credential' })
  }

  if (tokenInfo.aud !== expectedClientId) {
    throw createError({ statusCode: 401, statusMessage: 'Google credential audience mismatch' })
  }

  if (!tokenInfo.email || tokenInfo.email_verified !== 'true') {
    throw createError({ statusCode: 401, statusMessage: 'Google account email is not verified' })
  }

  const existingUser = db
    .prepare('SELECT id, email, first_name, last_name, role FROM users WHERE email = ?')
    .get(tokenInfo.email) as
    | { id: number; email: string; first_name: string | null; last_name: string | null; role: string }
    | undefined

  const firstName = tokenInfo.given_name || tokenInfo.name?.split(' ')[0] || 'Google'
  const lastName = tokenInfo.family_name || tokenInfo.name?.split(' ').slice(1).join(' ') || 'User'

  let userId: number

  if (existingUser) {
    db.prepare(
      `
      UPDATE users
      SET first_name = ?,
          last_name = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `
    ).run(firstName, lastName, existingUser.id)

    userId = existingUser.id
  } else {
    const insertResult = db
      .prepare(
        `
        INSERT INTO users (email, password_hash, first_name, last_name, role)
        VALUES (?, ?, ?, ?, ?)
        `
      )
      .run(tokenInfo.email, `google-oauth-${tokenInfo.sub}`, firstName, lastName, 'user')

    userId = Number(insertResult.lastInsertRowid)
  }

  const user = db
    .prepare('SELECT id, email, first_name, last_name, role FROM users WHERE id = ?')
    .get(userId) as { id: number; email: string; first_name: string | null; last_name: string | null; role: string }

  return {
    success: true,
    provider: 'google',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      picture: tokenInfo.picture || null
    }
  }
})
