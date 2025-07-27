'use client'

import { BtnBg } from '@/components/ui/buttons'
import { getFavoriteRecordById, updateFavoriteRecord } from '@/libs/fetch-api/favorite-records'
import { getRecordById, updateRecord } from '@/libs/fetch-api/record'
import { dateFormat } from '@/utils/date-format'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import TipTap from '../tip-tap'

export default function RecordPage () {
  const { id } = useParams()
  const route = useRouter()
  const titleRef = useRef()
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [date, setDate] = useState({ updated_at: '' })
  const [error, setError] = useState(false)
  const [originalData, setOriginalData] = useState({ content: '' })

  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  useEffect(() => {
    (async () => {
      try {
        const res = from === 'fav'
          ? await getFavoriteRecordById(id)
          : await getRecordById(id)
        const data = { title: res.title, content: res.content }

        setFormData(data)
        setOriginalData(data)
        setDate(res.updated_at || '')
      } catch (error) {
        setError(error)
      }
    })()
  }, [id, from])

  // To auto-increase the input
  useEffect(() => {
    if (titleRef.current) {
      const scrollW = titleRef.current.scrollWidth
      titleRef.current.style.width = `${scrollW}px`
    }
  }, [formData.title])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const redirectAt = from === 'fav' ? '/favorites' : '/home'
    try {
      if (
        formData.title === originalData.title &&
        formData.content === originalData.content
      ) return route.push(redirectAt)

      const updateData = from === 'fav'
        ? updateFavoriteRecord
        : updateRecord
      await updateData({ id, formData })

      route.push(redirectAt)
      route.refresh()
    } catch (error) {
      // console.error('Failed to update record:', error)
    }
  }

  const hasEdited = (
    formData.title !== originalData.title ||
  formData.content !== originalData.content
  )

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <div className=''>
            <div className='flex items-center gap-x-2.5 font-normal'>
              <input
                type='text'
                name='title'
                maxLength={50}
                spellCheck={false}
                ref={titleRef}
                className='min-w-fit pl-4 pr-4 py-[2.5px] outline-none text-xl font-medium rounded-[5px] focus:bg-slate-500/15 transition-colors duration-300 ease-in-out'
                value={formData.title}
                onChange={handleChange}
                placeholder='Type the title'
              />
              <span className={`text-[13px] ${formData.title.length === 50 && 'text-rose-400'}`}>
                {formData.title.length}/50
              </span>
            </div>
            <p className='pl-4 mt-1 text-[13px]'>{dateFormat(date)}</p>
          </div>
          <BtnBg
            type='submit'
            text='Update'
          />
        </div>

        <TipTap
          value={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
          hasEdited={hasEdited}
          initialContent={originalData.content}
        />
      </form>
    </main>
  )
}
