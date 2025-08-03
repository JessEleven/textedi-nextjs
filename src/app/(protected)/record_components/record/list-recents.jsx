'use client'

import Link from 'next/link'
import { FileTextIcon, StarIcon } from '../../assets/record-icons'
import { useSidebar } from '../../context/sidebar-context'
import { useRecentRecords } from '../../context/recent-records-context'

export default function ListRecents () {
  const { collapsed } = useSidebar()
  const { recents } = useRecentRecords()

  return (
    <div className={`${!collapsed && 'mt-2.5'} space-y-2.5`}>
      {recents?.map((item) => (
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
