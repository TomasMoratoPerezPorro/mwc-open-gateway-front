import { useEffect, useState } from 'react'
import './App.css'
import { Results } from './components/Results'
import { ConfigProvider } from './context/config-context'
import { useQuery } from './hooks/use-query'
import { supabase } from './services/supabaseClient'
import { Route, Routes } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AddRoute from './pages/AddRoute'
import { Button } from 'antd'
import { useAuth } from './hooks/auth-context'

function App() {
  const { signOut } = useAuth()
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/addRoute" element={<AddRoute />} />
        </Routes>
        <Button onClick={signOut}>LogOut</Button>
      </div>
    </div>
  )
}

export default App
