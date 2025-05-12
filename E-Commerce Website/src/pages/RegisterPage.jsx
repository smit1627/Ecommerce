import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

// This is a redirect component to the login page with the registration tab active
const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Register - ShopWorld'
  }, [])
  
  return <Navigate to="/login" replace />
}

export default RegisterPage