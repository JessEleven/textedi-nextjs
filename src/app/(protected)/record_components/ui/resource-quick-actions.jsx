import { craeteRecord } from '@/libs/fetch-api/record'
import { PlusIcon, RefreshIcon, SearchIcon } from '../../assets/record-icons'
import { useRouter } from 'next/navigation'

export default function ResourceQuickActions ({ loading, handleRefresh }) {
  const route = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      /* Default title when creating a new record */
      const formData = { title: 'Record without title' }

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
    <div className='grid grid-cols-3 gap-x-2.5 text-sm'>
      <article className='relative h-[70px] rounded-lg bg-slate-700/50 overflow-hidden group'>
        <div className='absolute inset-0 bg-linear-330 from-slate-700/50 via-neutral-600 to-orange-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-0' />
        <form onSubmit={handleSubmit} className='relative z-10 w-full h-full'>
          <button type='submit' className='flex flex-col justify-center items-start w-full h-full px-5 cursor-pointer'>
            <PlusIcon className='w-5 h-5' />
            <h3 className='mt-1'>New record</h3>
          </button>
        </form>
      </article>

      <article className='relative h-[70px] rounded-lg bg-slate-700/50 overflow-hidden group'>
        <div className='absolute inset-0 bg-linear-330 from-slate-700/50 via-neutral-600 to-orange-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-0' />
        <button
          type='button'
          className='relative z-10 flex flex-col justify-center items-start w-full h-full px-5 cursor-pointer'
          onClick={handleRefresh}
        >
          {loading ? <RefreshIcon className='animate-spin' /> : <RefreshIcon />}
          <h3 className='mt-1'>Refresh</h3>
        </button>
      </article>

      <article className='relative h-[70px] rounded-lg bg-slate-700/50 overflow-hidden group'>
        <div className='absolute inset-0 bg-linear-330 from-slate-700/50 via-neutral-600 to-orange-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-0' />
        <div className='relative z-10 flex flex-col justify-center items-start w-full h-full px-5 cursor-pointer'>
          <SearchIcon className='w-5 h-5' />
          <h3 className='mt-1'>Search</h3>
        </div>
      </article>
    </div>
  )
}
