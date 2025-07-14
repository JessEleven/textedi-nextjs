'use client'

import { useState } from 'react'
import { PlusIcon } from '../../assets/record-icons'
import { useSidebar } from '../../context/sidebar-context'
import { useRouter } from 'next/navigation'
import { craeteRecord } from '@/libs/fetch-api/record'

export default function NewRecord () {
  const { collapsed } = useSidebar()
  const [formData, setFormData] = useState({ title: '' })
  const route = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await craeteRecord(formData)

      if (res.success) {
        const recordId = res.data.id
        route.push(`/record/${recordId}`)
      }
    } catch (error) {
      console.error('Failed to create record:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-x-2.5'>
      {!collapsed && (
        <>
          <input
            type='text'
            name='title'
            className='w-full h-8 p-4 outline-none rounded-[5px] border border-neutral-600 focus:bg-slate-500/15'
            value={formData.title}
            onChange={handleChange}
            placeholder='Type the name'
          />
          <button type='submit' className='btn-border-icon'>
            <PlusIcon />
          </button>
        </>
      )}
    </form>
  )
}
