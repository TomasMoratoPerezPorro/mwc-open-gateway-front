import { Button } from 'antd'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthRoute from './components/AuthRoute'
import { useAuth } from './hooks/auth-context'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import LayoutWrapper from './components/LayoutWrapper'
import Drivers from './pages/Drivers'

function App() {
  const { signOut, user } = useAuth()
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
