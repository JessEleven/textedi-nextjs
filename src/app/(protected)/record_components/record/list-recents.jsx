'use client'

import { allRecentRecords } from '@/libs/fetch-api/recent-records'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FileTextIcon, StarIcon } from '../../assets/record-icons'
import { useSidebar } from '../../context/sidebar-context'

export default function ListRecents () {
  const [recent, setRecent] = useState([])
  const { collapsed } = useSidebar()

  useEffect(() => {
    (async () => {
      try {
        const res = await allRecentRecords()
        setRecent(res)
      } catch (error) {
        // console.log('Failed to get the recent record', error)
      }
    })()
  }, [])

  return (
    <div className={`${!collapsed && 'mt-2.5'} space-y-2.5`}>
      {recent?.map((item) => (
        <Link
          key={item.id}
          href={item.favorite === true ? `/record/${item.id}?from=fav` : `/record/${item.id}`}
          className='block'
        >
          <div className={`flex items-center h-8 text-sm rounded-[5px] bg-neutral-500/15
            ${!collapsed && 'justify-between px-2.5 gap-x-1.5 hover:bg-indigo-500/30 transition-colors duration-300 ease-in-out'}`}
          >
            <div className={`flex items-center
              ${collapsed ? 'justify-center size-8 rounded-[5px] hover:bg-indigo-500/30 transition-colors duration-300 ease-in-out' : 'gap-x-1 truncate'}`}
            >
              <FileTextIcon className='max-w-4 max-h-4' />
              {!collapsed && <h3 className='truncate'>{item.title}</h3>}
            </div>
            {!collapsed && (
              <p>{item.favorite === true && <StarIcon className='size-3 text-yellow-400' />}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
