import React from 'react'
import { useAuth } from '../hooks/auth-context'

const Drivers = () => {
  const { user } = useAuth()

  return <div>Drivers Page</div>
}

export default Drivers
