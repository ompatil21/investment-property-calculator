// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProperty(propertyData: any) {
    const res = await fetch('http://localhost:5000/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    })
  
    if (!res.ok) {
      throw new Error('Failed to create property')
    }
  
    return res.json()
  }
  