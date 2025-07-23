import Sidebar from './record_components/sidebar'
import { SidebarProvider } from './context/sidebar-context'
import { Suspense } from 'react'

export default function HomeLayout ({ children }) {
  return (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Suspense fallback={null}>
          <Sidebar />
          <div className='flex-1 p-5 overflow-auto'>
            {children}
          </div>
        </Suspense>
      </div>
    </SidebarProvider>
  )
}
