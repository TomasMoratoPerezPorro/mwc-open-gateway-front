export const fetchUsers = async () => {
  return await fetch(`http://localhost:3000/users`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })

    .then((res) => {
      return {
        users: res,
      }
    })
}

export const fetchUsersByRoleFestival = async () => {
  return await fetch(`http://localhost:3000/users/festival/10000000-0000-0000-0000-000000000002/00000000-0000-0000-0000-000000000001`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })

    .then((res) => {
      return {
        users: res,
      }
    })
}