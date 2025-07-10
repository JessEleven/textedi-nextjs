'use client'

import Link from 'next/link'
import { HomeIcon, SettingsIcon } from '../assets/dash-icons'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAVITEMS = [
  {
    label: 'Dashboard',
    href: '/dash',
    icon: <HomeIcon />
  },
  {
    label: 'Account',
    href: '/dash/account',
    icon: <SettingsIcon />
  }
]

export default function NavItem ({ collapsed }) {
  const pathname = usePathname()

  return (
    <nav className='mt-7 space-y-2'>
      {NAVITEMS?.map(({ icon, href, label }) => {
        const isActive = pathname === href
        const [hover, setHover] = useState(false)

        const direction = collapsed ? 'to right' : 'to left'
        const color = isActive || hover
          ? 'rgba(99,102,241,0.3), rgba(99,102,241,0.1)'
          : 'transparent, transparent'

        const gradientStyle = {
          background: `linear-gradient(${direction}, ${color}, transparent)`
        }

        return (
          <Link key={label} href={href} className='block'>
            <div
              className={`relative flex items-center h-8 text-sm group
              ${!collapsed && 'px-2.5 gap-x-1.5'}
              ${!collapsed && 'rounded-[5px] bg-neutral-500/15'}`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Active gradient background or hover */}
              <div
                style={gradientStyle}
                className={`absolute h-8
                ${collapsed
                  ? 'left-0 w-8 rounded-sm'
                  : 'right-0 w-[136px] rounded-r-sm gradient-transition'}`}
              />

              {/* Lateral selection indicator */}
              <div className={`absolute h-5 w-1 
                ${collapsed ? 'left-0 rounded-r-sm' : 'right-0 rounded-l-sm'}
                ${isActive
                  ? 'bg-indigo-500'
                  : 'group-hover:bg-indigo-500 transition-colors duration-400 ease-in-out'}`}
              />

              {/* Icon */}
              <span className={`z-10 ${collapsed
                ? 'flex items-center justify-center w-[32px] h-[32px] rounded-sm border border-neutral-600 bg-neutral-500/15'
                : ''}`}
              >
                {icon}
              </span>

              {/* Text */}
              <span className={`z-10 overflow-hidden whitespace-nowrap
                  ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}
              >
                {label}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
