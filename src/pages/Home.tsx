import React from 'react'
import { useAuth } from '../hooks/auth-context'
import LayoutWrapper from '../components/Layout'

const Home = () => {
  const { user } = useAuth()

  return (
    <LayoutWrapper>
      <div>You are logged in and your email address is {user?.email}</div>
    </LayoutWrapper>
  )
}

export default Home
