import { auth } from '@/libs/auth'
import { GitHubIcon } from '@/resources/assets/public-icons'
import { headers } from 'next/headers'
import { BtnBgLink } from '../components/ui/buttons'

export default async function UserSession () {
  let session = null

  try {
    session = await auth.api.getSession({
      headers: await headers()
    })
  } catch (error) {
    console.error('Error fetching session:', error)
  }

  return (
    <nav>
      <ul className='flex items-center gap-x-2.5 list-none'>
        <li>
          <a
            href='https://github.com/JessEleven/textedi-nextjs'
            rel='noreferrer'
            target='_blank'
            aria-label='GitHub Icon'
            className='block btn-border-icon'
          >
            <GitHubIcon />
          </a>
        </li>

        {session
          ? (
            <>
              <li>
                <BtnBgLink url='/home' text='Home' />
              </li>
            </>
            )
          : (
            <>
              <li>
                <BtnBgLink url='/sign-in' text='Sign In' />
              </li>
            </>
            )}
      </ul>
    </nav>
  )
}
