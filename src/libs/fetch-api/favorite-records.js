export const allFavoriteRecords = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(`/api/favorite-records?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch favorite records')
    }
    return result
  } catch (error) {
    // console.error('Error fetching the favorite records:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

export const toggleFavorite = async ({ id, favorite, onSuccess }) => {
  try {
    const res = await fetch('/api/favorite-records', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, favorite: !favorite })
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to toggle the record to favorite')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching the favorite record:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}
