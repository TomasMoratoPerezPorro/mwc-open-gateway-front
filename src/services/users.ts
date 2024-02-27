const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUsers = async () => {
  await delay(300)

  return await fetch(`https://api.example.com/user`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })

    .then((res) => {
      return {
        users: res.results,
      }
    })
}
