// For development purposes, this file is used to
// connect to the database using Drizzle ORM
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
export const db = drizzle(pool, { schema })
