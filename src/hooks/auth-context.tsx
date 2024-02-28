import { createContext, useContext, useEffect, useState } from 'react'
import { AuthError, AuthTokenResponsePassword, Session, User } from '@supabase/supabase-js'

import { supabase } from '../services/supabaseClient'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<AuthTokenResponsePassword>
  signOut: () => Promise<{
    error: AuthError | null
  }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    throw new Error('Function not implemented.')
  },
  signOut: async () => {
    throw new Error('Function not implemented.')
  },
})

export const useAuth = (): AuthContextType => useContext(AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [auth, setAuth] = useState(false)

  const login = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = () => supabase.auth.signOut()

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('data', data)
      console.log('event', event)
      console.log('session', session)
      if (event === 'SIGNED_IN') {
        setUser((session as any).user)
        console.log('updated user', (session as any).user)
        setAuth(true)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setAuth(false)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
