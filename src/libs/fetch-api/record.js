export const allRecords = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(`/api/record?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch records')
    }
    return result
  } catch (error) {
    // console.error('Error fetching records:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

export const craeteRecord = async (formData) => {
  try {
    const res = await fetch('/api/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData })
    })
    const result = await res.json()
    // console.log('Response from API', result)

    return result
  } catch (error) {
    // console.error('Error creating record:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

export const getRecordById = async (id) => {
  try {
    const res = await fetch(`/api/record/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch record')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching record:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

export const updateRecord = async ({ id, formData }) => {
  try {
    const res = await fetch(`/api/record/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData })
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to update record')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching update record:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

export const deleteRecord = async ({ id, onSuccess }) => {
  try {
    const res = await fetch('/api/record', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to delete record')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching delete record:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}
