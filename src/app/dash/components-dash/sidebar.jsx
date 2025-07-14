'use client'

import { BtnBorderIcon } from '@/components/ui/button-icons'
import NavItem from './nav-item'
import { LayoutSidebarIcon, LayoutSidebarTwoIcon } from '../assets/dash-icons'
import AppLogo from '@/components/ui/app-logo'
import { useSidebar } from '../context/sidebar-context'

export default function Sidebar () {
  const { collapsed, setCollapsed, minWiht, baseWidth } = useSidebar()

  return (
    <aside className={`flex flex-col ${baseWidth} h-full text-neutral-300 border-r border-r-neutral-600 transition-all duration-400`}>
      <div className={`flex flex-col ${collapsed ? `items-center ${minWiht}` : 'px-2.5'}`}>
        <div className='flex items-center justify-between mt-2.5 text-neutral-50'>
          {!collapsed && (
            <AppLogo
              display='flex'
              iconSize={26}
              showText
              fontSize={20}
            />
          )}
          <BtnBorderIcon
            type='button'
            icon={collapsed ? <LayoutSidebarTwoIcon /> : <LayoutSidebarIcon />}
            ariaLabel='Layout sidebar'
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* For navigation of the options */}
        <NavItem />
      </div>
    </aside>
  )
}
