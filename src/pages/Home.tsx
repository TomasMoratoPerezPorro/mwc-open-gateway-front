import React from 'react'
import { useAuth } from '../hooks/auth-context'
import { useQuery } from '../hooks/use-query'
import { Route } from '../types/dtos'
import { Fetch } from '../components/fetch'

export const transformConfig = ({ data }: { data: Route[] }) => data

const Home = () => {
  const { user } = useAuth()

  const query = useQuery({
    url: 'http://localhost:3000/routes',
    transform: transformConfig,
  })

  return (
    <Fetch
      {...query}
      loadingComponent={<strong>Cargando...</strong>}
      errorComponent={<p>Ha habido un error</p>}
    >
      {(data: Route[]) => {
        if (data.length === 0) return <p>No hay usuarios</p>

        return (
          <>{data.map((route) => <p>{route.route_id}</p>)}</>
        )
      }}
    </Fetch>
  )
}

export default Home
