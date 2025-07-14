'use client'

import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext()

export function SidebarProvider ({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  const minWiht = 'w-[48px]'
  const baseWidth = collapsed ? minWiht : 'w-[288px]'

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        minWiht,
        baseWidth
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar () {
  return useContext(SidebarContext)
}
