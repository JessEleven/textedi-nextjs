'use client'

import { BtnIcon } from '@/components/ui/button-icons'
import NavItem from './nav-item'
import { LayoutSidebarIcon, LayoutSidebarTwoIcon } from '../assets/dash-icons'
import AppLogo from '@/components/ui/app-logo'
import { useSidebar } from '../context/sidebar-context'

export default function Sidebar () {
  const { collapsed, setCollapsed, minWiht, baseWidth } = useSidebar()

  return (
    <aside className={`${baseWidth} flex flex-col h-full border-r border-r-neutral-600 transition-all duration-400`}>
      <div className={`flex flex-col ${collapsed ? `items-center ${minWiht}` : 'px-2.5'}`}>
        <div className='flex items-center justify-between mt-2.5'>
          {!collapsed && (
            <AppLogo
              display='flex'
              iconSize={26}
              showText
              fontSize={20}
            />
          )}
          <BtnIcon
            icon={collapsed ? <LayoutSidebarTwoIcon /> : <LayoutSidebarIcon />}
            ariaLabel='Layout sidebar'
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <NavItem />
      </div>
    </aside>
  )
}
