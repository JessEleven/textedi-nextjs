import { usePathname } from 'next/navigation'
import SectionTitle from './section-title'

export default function ResourceOverview ({ total, queryTime, hasItems }) {
  const pathname = usePathname()

  return (
    <div className='flex items-center justify-between mt-5'>
      <SectionTitle title={pathname === '/home' ? 'Your records' : 'Your favorites'} />
      {hasItems && (
        <p className='text-[13px]'>{total} {total === 1 ? 'record' : 'records'} • {queryTime} ms</p>
      )}
    </div>
  )
}
