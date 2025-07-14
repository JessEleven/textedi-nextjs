import Sidebar from './record_components/sidebar'
import { SidebarProvider } from './context/sidebar-context'

export default function HomeLayout ({ children }) {
  return (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Sidebar />
        <div className='flex-1 p-5 overflow-auto'>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
