import Sidebar from './components-dash/sidebar'
import { SidebarProvider } from './context/sidebar-context'

export default function DashLayout ({ children }) {
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
