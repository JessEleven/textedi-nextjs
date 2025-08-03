'use client'

import { allRecentRecords } from '@/libs/fetch-api/recent-records'
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react'

const RecentRecordsContext = createContext()

export function RecentRecordsProvider ({ children }) {
  const [recents, setRecents] = useState([])

  const refreshRecents = useCallback(async () => {
    try {
      const res = await allRecentRecords()
      setRecents(res)
    } catch (error) {
      // console.log('Failed to get the recent record', error)
    }
  }, [])

  useEffect(() => {
    (async () => {
      await refreshRecents()
    })()
  }, [refreshRecents])

  return (
    <RecentRecordsContext.Provider
      value={{
        recents,
        refreshRecents
      }}
    >
      {children}
    </RecentRecordsContext.Provider>
  )
}

export function useRecentRecords () {
  return useContext(RecentRecordsContext)
}
