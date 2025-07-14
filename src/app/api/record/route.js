import { db } from '@/db/drizzle'
import { record } from '@/db/schema'
import { auth } from '@/libs/auth'
import { generateId } from '@/utils/generate-id'
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

    const pickFields = {
      id: record.id,
      title: record.title,
      content: record.content,
      last_opened_at: record.lastOpenedAt,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    }

    const [records, total] = await Promise.all([
      db.select(pickFields)
        .from(record)
        .where(and(
          eq(record.userId, user.id),
          eq(record.favorite, false)
        ))
        .orderBy(desc(record.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() })
        .from(record)
        .where(and(
          eq(record.userId, user.id),
          eq(record.favorite, false)
        ))
    ])
    const baseUrl = `${origin}/api/record`
    const totalPages = Math.ceil(total[0].count / limit)
    const buildLink = (targetPage) => `${baseUrl}?page=${targetPage}&limit=${limit}`

    if (records.length <= 0) {
      return NextResponse.json({
        success: true,
        status_code: 200,
        message: 'The records list is empty',
        results: {
          total_records: total[0].count,
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

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'List of records',
      results: {
        total_records: total[0].count,
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
        data: records
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
      created_at: record.createdAt
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

export async function DELETE (req) {
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

    if (!id) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'ID is missing to delete record'
      }, { status: 404 })
    }

    await db.delete(record)
      .where(and(
        eq(record.id, id),
        eq(record.userId, user.id)
      ))

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'Record successfully deleted',
      data: {
        deleted_record: true
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
