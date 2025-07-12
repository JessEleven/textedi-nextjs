import { useState } from 'react'
import {
  ChevronDownIcon, ChevronUpIcon,
  FolderIcon, FolderOpenIcon
} from '../../assets/dash-icons'
import NewDoc from './new-doc'
import { useSidebar } from '../../context/sidebar-context'

export default function DocNav () {
  const [open, setOpen] = useState(true)
  const { collapsed } = useSidebar()

  return (
    <>
      <button type='button' onClick={() => setOpen(!open)} className='w-full cursor-pointer'>
        <div className={`flex items-center h-8 rounded-[5px] bg-neutral-500/15
          ${!collapsed ? 'justify-between px-0 md:px-2.5' : 'justify-center'}
          hover:bg-indigo-500/30 transition-colors duration-300 ease-in-out`}
        >
          <div className='flex items-center'>
            {open ? <FolderOpenIcon /> : <FolderIcon />}
            {!collapsed && <span className='ml-1.5'>Documents</span>}
          </div>
          {!collapsed && (
            <>
              {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </>
          )}
        </div>
      </button>

      {open && (
        <div className='flex gap-[5px] mt-[1.5px]'>
          {!collapsed && (
            <div className='flex flex-col items-center'>
              <div className='h-full border-l border-l-neutral-600' />
            </div>
          )}
          <div className='w-full'>
            <NewDoc />
            {collapsed ? '---' : <h3 className='mt-2.5'>No document</h3>}
          </div>
        </div>
      )}
    </>
  )
}
