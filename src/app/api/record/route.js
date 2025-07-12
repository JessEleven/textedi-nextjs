import { db } from '@/db/drizzle'
import { record } from '@/db/schema'
import { auth } from '@/libs/auth'
import { generateId } from '@/utils/generate-id'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST (req) {
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
    const { title } = await req.json()

    const pickFields = {
      id: record.id,
      title: record.title,
      createdAt: record.createdAt
    }
    const nanoid = generateId()

    const result = await db.insert(record)
      .values({
        id: nanoid,
        title,
        userId: user.id
      })
      .returning(pickFields)

    return NextResponse.json({
      success: true,
      status_code: 201,
      message: 'Record created successfully',
      data: result[0]
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error?.message || 'Unexpected server error'
    }, { status: 500 })
  }
}
