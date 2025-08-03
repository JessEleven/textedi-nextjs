import { AlertTriangleIcon } from '../../assets/record-icons'

export default function ErrorFetching () {
  return (
    <div className='flex justify-center mt-3'>
      <div className='flex items-center gap-x-1.5 px-4 py-[7px] rounded-[5px] border border-neutral-700'>
        <AlertTriangleIcon className='text-yellow-400' />
        <p className='text-sm'>An unexpected error occurred</p>
      </div>
    </div>
  )
}
