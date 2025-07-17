import { db } from '@/db/drizzle'
import { record } from '@/db/schema'
import { auth } from '@/libs/auth'
import { patchPickFields, pickFields } from '@/utils/pick-fields'
import { isValidNanoid } from '@/utils/validate-id'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET (req, { params }) {
  try {
    const data = await auth.api.getSession({
      headers: await headers()
    })
    const user = data?.user

    if (!user) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'User is not authenticated'
      }, { status: 400 })
    }
    const { id } = params

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'ID is missing to get record'
      }, { status: 401 })
    }

    const result = await db.query.record
      .findFirst({
        where: and(
          eq(record.id, id),
          eq(record.userId, user.id),
          eq(record.favorite, false)
        )
      })

    if (!result) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'Record not found',
        data: []
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'Record successfully found',
      data: pickFields(result)
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error?.message || 'Unexpected server error'
    }, { status: 500 })
  }
}

export async function PATCH (req, { params }) {
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
    const { id } = params

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'ID is missing to update record'
      }, { status: 400 })
    }
    const { title, content } = await req.json()
    const updatedAt = new Date()

    const result = await db.update(record)
      .set({ title, content, updatedAt })
      .where(and(
        eq(record.id, id),
        eq(record.userId, user.id),
        eq(record.favorite, false)
      ))
    const pickResult = patchPickFields(result)

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'The record updated successfully',
      data: pickResult
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error?.message || 'Unexpected server error'
    }, { status: 500 })
  }
}
