import { db } from '@/db/drizzle'
import { record } from '@/db/schema'
import { auth } from '@/libs/auth'
import { pickFields } from '@/utils/pick-fields'
import { isValidNanoid } from '@/utils/validate-id'
import { and, count, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET (req) {
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
    const { searchParams, origin } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const offset = (page - 1) * limit

    const [favoriteRecords, total] = await Promise.all([
      db.select()
        .from(record)
        .where(and(
          eq(record.userId, user.id),
          eq(record.favorite, true)
        ))
        .orderBy(desc(record.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() })
        .from(record)
        .where(and(
          eq(record.userId, user.id),
          eq(record.favorite, true)
        ))
    ])
    const baseUrl = `${origin}/api/favorite-records`
    const totalPages = Math.ceil(total[0].count / limit)
    const buildLink = (targetPage) => `${baseUrl}?page=${targetPage}&limit=${limit}`

    if (favoriteRecords.length <= 0) {
      return NextResponse.json({
        success: true,
        status_code: 200,
        message: 'The favorite records list is empty',
        results: {
          total_favorite_records: total[0].count,
          pagination: {
            total_pages: page,
            current_page: limit,
            per_page: 0
          },
          links: {
            base_url: baseUrl,
            first_url: buildLink(1),
            prev_url: null,
            next_url: null,
            last_url: null
          },
          data: []
        }
      }, { status: 200 })
    }
    const results = favoriteRecords.map(pickFields)

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'List of favorite records',
      results: {
        total_favorite_records: total[0].count,
        pagination: {
          total_pages: Math.ceil(total[0].count / limit),
          current_page: page,
          per_page: limit
        },
        links: {
          base_url: baseUrl,
          first_url: buildLink(1),
          prev_url: page > 1 ? buildLink(page - 1) : null,
          next_url: page < totalPages ? buildLink(page + 1) : null,
          last_url: buildLink(totalPages)
        },
        data: results
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

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'ID is missing to toggle record to favorite'
      }, { status: 400 })
    }

    /* To toggle to favorite */
    const result = await db.update(record)
      .set({ favorite })
      .where(and(
        eq(record.id, id),
        eq(record.userId, user.id)
      ))

    if (result.rowCount === 0) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'Record not found'
      }, { status: 404 })
    }
    const toggle = `The record was ${favorite ? 'marked as' : 'removed from'} favorite`

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: toggle,
      data: {
        fovorite_record: true
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
