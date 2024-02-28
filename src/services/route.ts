export const addRoute = async (data) => {
  const hardcodedData = {
    route_id: "50000000-0000-0000-0000-000000000003",
    start_coordinates_latitude: 42.11111,
    start_coordinates_longitude: 2.11111,
    end_coordinates_latitude: 43.11111,
    end_coordinates_longitude: 3.11111,
    status_id: '20000000-0000-0000-0000-000000000001',
    festival_id: '00000000-0000-0000-0000-000000000001'
  }
  data = { ...data, ...hardcodedData }
  return await fetch(`http://localhost:3000/routes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })

    .then((res) => {
      return true
    })
}