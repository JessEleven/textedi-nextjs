export const craeteRecord = async (formData) => {
  try {
    const res = await fetch('/api/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData })
    })
    const result = res.json()
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
