import Link from 'next/link'
import AppLogo from './ui/app-logo'
import UserSession from './user-session'

export default function Nav () {
  return (
    <header className='h-[60px] flex items-center justify-between'>
      <Link translate='no' href='/' className='block'>
        <AppLogo display='flex' iconSize={26} showText fontSize={20} />
      </Link>

      <UserSession />
    </header>
  )
}
