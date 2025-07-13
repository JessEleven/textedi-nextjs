import { db } from '@/db/drizzle'
import { record } from '@/db/schema'
import { auth } from '@/libs/auth'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH (req) {
  try {
    const data = await auth.api.getSession({
      headers: await headers()
    })
    const user = data?.user

    if (!user) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'User is not authenticated'
      }, { status: 401 })
    }
    const { id, favorite } = await req.json()

    const recordExists = await db.select()
      .from(record)
      .where(and(
        eq(record.id, id),
        eq(record.userId, user.id)
      ))

    if (!recordExists.length) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'Record not found or not owned by user'
      }, { status: 404 })
    }

    await db.update(record)
      .set({ favorite })
      .where(and(
        eq(record.id, id),
        eq(record.userId, user.id)
      ))

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: `The record was ${favorite ? 'marked as' : 'removed from'} favorite`,
      author: {
        name: user.name,
        email: user.email
      }
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error?.message || 'Unexpected server error'
    }, { status: 500 })
  }
}
