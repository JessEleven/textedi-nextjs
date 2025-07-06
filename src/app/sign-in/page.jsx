'use client'

import AppLogo from '@/components/ui/app-logo'
import { authClient } from '@/libs/auth-client'
import { ArrowRight, GitHubIcon } from '@/resources/assets/public-icons'
import Link from 'next/link'
import React from 'react'

export default function SignInPage () {
  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dash'
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <div className='w-full md:w-96'>
        <div className='mx-5 md:mx-0'>
          <div className='flex justify-center mb-20'>
            <AppLogo display='flex' iconSize={26} showText fontSize={20} />
          </div>

          <h2 className='mb-1.5 text-2xl font-medium'>Create your account</h2>
          <h3 className='mb-7 text-base text-neutral-400'>
            Join now and start working with textedi.
          </h3>

          <button
            type='button'
            aria-label='GitHub Icon'
            className='flex items-center justify-center gap-x-1.5 w-full py-2.5 text-sm font-medium rounded-[5px] text-neutral-900 bg-neutral-100 hover:bg-neutral-300/90 transition-colors duration-200 ease-in-out leading-3.5 cursor-pointer'
            onClick={signInWithGithub}
          >
            <GitHubIcon />
            <span>Continue with GitHub</span>
          </button>

          <div className='w-fit mx-auto mt-5'>
            <Link href='/' className='flex items-center justify-center gap-x-1 group'>
              <span className='text-sm leading-3.5'>Go to Home</span>
              <ArrowRight className='group-hover:text-teal-500 transition-colors ease-in-out duration-200 mt-[1.5px]' />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
