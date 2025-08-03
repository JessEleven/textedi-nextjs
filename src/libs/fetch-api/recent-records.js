export const allRecentRecords = async () => {
  try {
    const res = await fetch('/api/recent-records', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch recent records')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching recent records:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

export const updateToRecents = async ({ id }) => {
  try {
    const res = await fetch('/api/recent-records', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to update the record to recents')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching the update record to recents:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}
