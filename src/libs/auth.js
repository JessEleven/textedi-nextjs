import { db } from '../db/drizzle'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg' // or "mysql", "sqlite"
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    // updateAge: 60 * 60 * 24 * 7, // Avoid session bugs
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  }
})
