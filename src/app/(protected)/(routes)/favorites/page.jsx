'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FileTextIcon, StarIcon } from '../../assets/record-icons'
import dayjs from 'dayjs'
import { allFavoriteRecords, toggleFavorite } from '@/libs/fetch-api/favorite-records'
import { PgButton } from '../../record_components/ui/pg-button'
import { BtnBorderIcon } from '@/components/ui/button-icons'

export default function FavoritesPage () {
  const searchParams = useSearchParams()
  const route = useRouter()
  const scrollRef = useRef()

  const [favRecords, setFavRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  /** To place ?page=1&limit=10 in the url
   * each time the /favorites path is visited
  */
  useEffect(() => {
    const page = searchParams.get('page')
    const isLimited = searchParams.get('limit')

    if (!page || !isLimited) {
      const params = new URLSearchParams()
      params.set('page', '1')
      params.set('limit', '10')
      route.replace(`/favorites?${params.toString()}`)
    }
  }, [])

  const currentPage = parseInt(searchParams.get('page')) || 1
  const limit = parseInt(searchParams.get('limit')) || 10
  const totalPages = Math.ceil(total / limit)

  /* To get the data */
  useEffect(() => {
    (async () => {
      const res = await allFavoriteRecords(currentPage, limit)

      if (res.success) {
        setFavRecords(res.results.data)
        setTotal(res.results.total_favorite_records)
      }
    })()
  }, [currentPage, limit])

  /* To view the paged url favorites?page=1&limit=10 */
  const updateQueryParams = (newPage) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage)
    params.set('limit', limit)
    route.push(`/favorites?${params.toString()}`)
  }

  /* For the sidebar of the container */
  useEffect(() => {
    const el = scrollRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setHasScrollbar(true)
    } else {
      setHasScrollbar(false)
    }
  }, [favRecords])

  /* To synchronize paging when toggle to favorite */
  const fetchFavoriteRecords = async () => {
    const newTotal = total - 1
    const newTotalPages = Math.ceil(newTotal / limit)

    if (currentPage > newTotalPages) {
      updateQueryParams(newTotalPages)
    } else {
      const res = await allFavoriteRecords(currentPage, limit)

      if (res.success) {
        setFavRecords(res.results.data)
        setTotal(res.results.total_favorite_records)
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
        {favRecords.map((item) => (
          <Link key={item.id} href={`/record/${item.id}`} className='block group'>
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
                <BtnBorderIcon
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
                        setFavRecords((prev) => prev.filter((star) => star.id !== item.id))
                        fetchFavoriteRecords()
                      }
                    })
                  }}
                  icon={<StarIcon className='text-yellow-400' />}
                />
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className='flex items-center justify-between mt-7 text-sm'>
        <PgButton
          type='button'
          disabled={currentPage === 1}
          onClick={() => updateQueryParams(Math.max(currentPage - 1, 1))}
          text='Previous'
        />
        <h3>Page {currentPage} of {totalPages}</h3>
        <PgButton
          type='button'
          disabled={currentPage === totalPages}
          onClick={() => updateQueryParams(Math.min(currentPage + 1, totalPages))}
          text='Next'
        />

      </div>
    </main>
  )
}
