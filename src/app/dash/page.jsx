'use client'

import { allRecords } from '@/libs/fetch-api/record'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FileTextIcon, StarIcon } from './assets/dash-icons'
import dayjs from 'dayjs'
import { toggleFavorite } from '@/libs/fetch-api/favorite-records'

export default function DashPage () {
  const searchParams = useSearchParams()
  const route = useRouter()
  const scrollRef = useRef()

  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  /** To place ?page=1&limit=10 in the url
   * each time the /dash path is visited
  */
  useEffect(() => {
    const page = searchParams.get('page')
    const isLimited = searchParams.get('limit')

    if (!page || !isLimited) {
      const params = new URLSearchParams()
      params.set('page', '1')
      params.set('limit', '10')
      route.replace(`/dash?${params.toString()}`)
    }
  }, [])

  const currentPage = parseInt(searchParams.get('page')) || 1
  const limit = parseInt(searchParams.get('limit')) || 10
  const totalPages = Math.ceil(total / limit)

  /* To get the data */
  useEffect(() => {
    (async () => {
      const res = await allRecords(currentPage, limit)

      if (res.success) {
        setRecords(res.results.data)
        setTotal(res.results.total_records)
      }
    })()
  }, [currentPage, limit])

  /* To view the paged url dash?page=1&limit=10 */
  const updateQueryParams = (newPage) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage)
    params.set('limit', limit)
    route.push(`/dash?${params.toString()}`)
  }

  /* For the sidebar of the container */
  useEffect(() => {
    const el = scrollRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setHasScrollbar(true)
    } else {
      setHasScrollbar(false)
    }
  }, [records])

  /* To synchronize paging when toggle to favorite */
  const fetchRecords = async () => {
    const newTotal = total - 1
    const newTotalPages = Math.ceil(newTotal / limit)

    if (currentPage > newTotalPages) {
      updateQueryParams(newTotalPages)
    } else {
      const res = await allRecords(currentPage, limit)

      if (res.success) {
        setRecords(res.results.data)
        setTotal(res.results.total_records)
      }
    }
  }

  return (
    <main className='mt-7 card-container text-neutral-300'>
      <div
        ref={scrollRef}
        className={`h-[400px] mt-7 space-y-2.5 overflow-y-auto scrollbar-custom 
        ${hasScrollbar ? 'pr-1.5' : ''}`}
      >
        {records.map((item) => (
          <Link key={item.id} href={`/dash/record/${item.id}`} className='block group'>
            <article className='flex items-center px-5 py-2.5 rounded-lg bg-neutral-500/15'>
              <div className='p-1.5 rounded-[5px] bg-stone-500/50'>
                <FileTextIcon className='group-hover:text-fuchsia-500/60 transition-colors duration-300 ease-in-out' />
              </div>
              <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col ml-2.5'>
                  <h3 className='text-base font-medium'>{item.title}</h3>
                  <p className='text-[13px]'>
                    {dayjs(item.createdAt).format('MMMM DD, YYYY • HH:MM:ss a')}
                  </p>
                </div>

                {/* Toggle to favorite */}
                <button
                  type='button'
                  aria-label='Star'
                  className='btn-border-icon'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleFavorite({
                      id: item.id,
                      favorite: item.favorite,
                      onSuccess: () => {
                        setRecords((prev) => prev.filter((star) => star.id !== item.id))
                        fetchRecords()
                      }
                    })
                  }}
                >
                  <StarIcon />
                </button>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className='flex items-center justify-between mt-7 text-sm'>
        <button
          type='button'
          disabled={currentPage === 1}
          onClick={() => updateQueryParams(Math.max(currentPage - 1, 1))}
          className='px-4 py-1.5 bg-neutral-500/15 rounded-[5px] disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed'
        >
          Previous
        </button>
        <h3>Page {currentPage} of {totalPages}</h3>
        <button
          type='button'
          disabled={currentPage === totalPages}
          onClick={() => updateQueryParams(Math.min(currentPage + 1, totalPages))}
          className='px-4 py-1.5 bg-neutral-500/15 rounded-[5px] disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed'
        >
          Next
        </button>

      </div>
    </main>
  )
}
