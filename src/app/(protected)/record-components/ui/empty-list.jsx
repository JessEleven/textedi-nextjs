import { AnimatedCompassIcon } from '../../assets/animated-icons'

export default function EmptyList ({ message }) {
  return (
    <div className='flex flex-col items-center justify-center h-[400px]'>
      <AnimatedCompassIcon />
      <h3 className='text-base text-neutral-400'>{message}</h3>
    </div>
  )
}
