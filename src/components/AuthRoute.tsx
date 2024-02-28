import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/auth-context'
import { useEffect } from 'react'

const AuthRoute = () => {
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    console.log('user', user);
  }, [user])
  

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace state={{ path: location.pathname }} />
  )
}

export default AuthRoute
