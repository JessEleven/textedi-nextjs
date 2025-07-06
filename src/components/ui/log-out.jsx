import { auth } from '@/libs/auth'
import { LogoutIcon } from '@/resources/assets/public-icons'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function handleSignOut () {
  'use server'
  const headerList = await headers()
  const cookieStore = await cookies()

  await auth.api.signOut({ headers: headerList })
  cookieStore.delete('better-auth.session_token')
  redirect('/sign-in')
}

export default function LogOut ({ icon = false, text = false, both = false }) {
  return (
    <form action={handleSignOut}>
      <button type='submit' className='flex cursor-pointer'>
        {icon && (
          <div className='btn-border-icon'>
            <LogoutIcon />
          </div>
        )}
        {text && (
          <span className='px-4 py-2 btn-border'>Sign Out</span>
        )}
        {both && (
          <div className='flex items-center gap-x-1.5 text-sm hover:text-rose-400 duration-200 ease-in-out'>
            <LogoutIcon />
            <span>Sign Out</span>
          </div>
        )}
      </button>
    </form>
  )
}
