'use client'

import { BtnBg } from '@/components/ui/buttons'
import { getFavoriteRecordById, updateFavoriteRecord } from '@/libs/fetch-api/favorite-records'
import { getRecordById, updateRecord } from '@/libs/fetch-api/record'
import dayjs from 'dayjs'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function RecordPage () {
  const { id } = useParams()
  const route = useRouter()
  const titleRef = useRef()
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [date, setDate] = useState('')

  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  useEffect(() => {
    (async () => {
      try {
        const result = from === 'fav'
          ? await getFavoriteRecordById(id)
          : await getRecordById(id)

        setFormData({ title: result?.title, content: result?.content })
        if (result?.updated_at) {
          setDate(result.updated_at)
        }
        console.log({ daaaa: date })
      } catch (error) {

      }
    })()
  }, [id, from, setFormData])

  useEffect(() => {
    if (titleRef.current) {
    // Forzamos el ancho al scrollWidth + padding (16px)
      const scrollW = titleRef.current.scrollWidth
      titleRef.current.style.width = `${scrollW}px`
    }
  }, [formData.title])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      from === 'fav'
        ? await updateFavoriteRecord({ id, formData })
        : await updateRecord({ id, formData })

      route.push(from === 'fav' ? '/favorites' : '/home')
    } catch (error) {
      // console.error('Failed to update record:', error)
    }
  }

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
            <p className='pl-4'>{dayjs(date).format('DD/MM/YYYY HH:mm:ss a')}
            </p>
          </div>
          <BtnBg
            type='submit'
            text='Update'
          />
        </div>
      </form>
    </main>
  )
}
