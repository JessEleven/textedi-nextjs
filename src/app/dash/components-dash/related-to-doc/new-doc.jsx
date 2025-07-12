'use client'

import { PlusIcon } from '../../assets/dash-icons'
import { useSidebar } from '../../context/sidebar-context'

export default function NewDoc () {
  const { collapsed } = useSidebar()

  return (
    <form className='flex gap-x-2.5'>
      {!collapsed && (
        <>
          <input
            type='text'
            className='w-full h-8 p-4 outline-none rounded-[5px] border border-neutral-600 focus:bg-slate-500/15'
            placeholder='Type the name'
          />
          <button className='btn-border-icon'>
            <PlusIcon />
          </button>
        </>
      )}
    </form>
  )
}
