'use client'

import Sidebar from './record_components/sidebar'
import { SidebarProvider } from './context/sidebar-context'
import { Suspense } from 'react'
import { RecentRecordsProvider } from './context/recent-records-context'

export default function HomeLayout ({ children }) {
  return (
    <SidebarProvider>
      <RecentRecordsProvider>
        <div className='flex h-screen'>
          <Suspense fallback={null}>
            <Sidebar />
            <div className='flex-1 p-5 overflow-auto'>
              {children}
            </div>
          </Suspense>
        </div>
      </RecentRecordsProvider>
    </SidebarProvider>
  )
}
