export const fetchVehiclesByFestival = async () => {
    return await fetch(`http://localhost:3000/vehicles/festival/00000000-0000-0000-0000-000000000001`)
        .then(async (res) => {
            if (!res.ok) throw new Error('Error en la petición')
            return await res.json()
        })

        .then((res) => {
            return {
                vehicles: res,
            }
        })
}