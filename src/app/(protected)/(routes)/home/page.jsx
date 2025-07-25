'use client'

import { allRecords, deleteRecord } from '@/libs/fetch-api/record'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FileTextIcon, StarIcon, TrashIcon } from '../../assets/record-icons'
import { toggleFavorite } from '@/libs/fetch-api/favorite-records'
import { PgButton } from '../../record_components/ui/pg-button'
import { BtnBorderIcon } from '@/components/ui/button-icons'
import ResourceQuickActions from '../../record_components/ui/resource-quick-actions'
import ResourceOverview from '../../record_components/ui/resource-overview'
import EmptyList from '../../record_components/ui/empty-list'
import ErrorFetching from '../../record_components/ui/error-fetching'
import { dateFormat } from '@/utils/date-format'

export default function HomePage () {
  const searchParams = useSearchParams()
  const route = useRouter()
  const scrollRef = useRef()

  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [queryTime, setQueryTime] = useState(0)
  const [refresh, setRefresh] = useState(false)

  /** To place ?page=1&limit=10 in the url
   * each time the /home path is visited
  */
  useEffect(() => {
    const page = searchParams.get('page')
    const isLimited = searchParams.get('limit')

    if (!page || !isLimited) {
      const params = new URLSearchParams()
      params.set('page', '1')
      params.set('limit', '10')
      route.replace(`/home?${params.toString()}`)
    }
  }, [])

  const currentPage = parseInt(searchParams.get('page')) || 1
  const limit = parseInt(searchParams.get('limit')) || 10
  const totalPages = Math.ceil(total / limit)

  /* To get the data */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const start = performance.now()
        const res = await allRecords(currentPage, limit)
        const end = performance.now()

        if (res.success) {
          setRecords(res.results.data)
          setTotal(res.results.total_records)
        }
        setQueryTime(Math.round(end - start))
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [currentPage, limit, refresh])

  /* To refresh the data */
  const handleRefresh = () => {
    setRefresh(prev => !prev)
  }

  /* To view the paged url ?page=1&limit=10 */
  const updateQueryParams = (newPage) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage)
    params.set('limit', limit)
    route.push(`/home?${params.toString()}`)
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
      <ResourceQuickActions
        loading={loading}
        handleRefresh={handleRefresh}
      />
      <ResourceOverview
        total={total}
        queryTime={queryTime}
        hasItems={records.length > 0}
      />
      {loading && 'Loading...'}
      {(error && !loading) && <ErrorFetching />}
      {(!loading && !error && records.length <= 0) && <EmptyList message='No records were found' />}
      {(!loading && !error && records.length > 0) && (
        <div
          ref={scrollRef}
          className={`h-[400px] mt-7 space-y-2.5 overflow-y-auto scrollbar-custom 
        ${hasScrollbar ? 'pr-1.5' : ''}`}
        >
          {records.map((item) => (
            <Link key={item.id} href={`/record/${item.id}`} className='block group'>
              <article className='flex items-center px-5 py-2.5 rounded-lg bg-neutral-500/15'>
                <div className='p-1.5 rounded-[5px] bg-stone-500/50'>
                  <FileTextIcon className='group-hover:text-fuchsia-500/60 transition-colors duration-300 ease-in-out' />
                </div>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex flex-col ml-2.5'>
                    <h3 className='text-base font-medium'>{item.title}</h3>
                    <p className='text-[13px]'>{dateFormat(item.created_at)}</p>
                  </div>

                  <div className='flex items-center gap-x-2.5'>
                    {/* Toggle to favorite */}
                    <BtnBorderIcon
                      type='button'
                      aria-label='Star'
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
                      icon={<StarIcon />}
                    />

                    {/* To delete records */}
                    <BtnBorderIcon
                      type='button'
                      ariaLabel='Trash'
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteRecord({
                          id: item.id,
                          onSuccess: () => {
                            setRecords((prev) => prev.filter((trash) => trash.id !== item.id))
                            fetchRecords()
                          }
                        })
                      }}
                      icon={<TrashIcon />}
                    />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {(!loading && !error && records.length > 0) && (
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
      )}
    </main>
  )
}
