'use client'

import { useState } from 'react'
import Sidebar from './components-dash/sidebar'

export default function DashLayout ({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='flex h-screen'>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className='flex-1 p-5 overflow-auto'>
        {children}
      </div>
    </div>
  )
}
