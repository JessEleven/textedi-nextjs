import { db } from '@/db/drizzle'
import { record } from '@/db/schema'
import { auth } from '@/libs/auth'
import { isValidNanoid } from '@/utils/validate-id'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET () {
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

    const recentRecords = await db
      .select({
        id: record.id,
        title: record.title,
        favorite: record.favorite,
        last_oponed_at: record.lastOpenedAt
      })
      .from(record)
      .where(eq(record.userId, user.id))
      .orderBy(desc(record.lastOpenedAt))
      .limit(5)

    if (recentRecords.length <= 0) {
      return NextResponse.json({
        success: false,
        status_code: 200,
        message: 'List of recent records is empty',
        data: []
      }, { status: 200 })
    }

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'List of recent records',
      data: recentRecords
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error?.message || 'Unexpected server error'
    }, { status: 500 })
  }
}

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
    const { id } = await req.json()

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'The ID is missing to update the record to recents'
      }, { status: 400 })
    }
    const lastOpenedAt = new Date()

    const result = await db.update()
      .set({ lastOpenedAt })
      .where(and(
        eq(record.id, id),
        eq(record.userId, user.id)
      ))
      .returning()

    if (!result.length) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'Recent records not found',
        data: []
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'Record updated to recents',
      data: {
        toggle_recents: true
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
