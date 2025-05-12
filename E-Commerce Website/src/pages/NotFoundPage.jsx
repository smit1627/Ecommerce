import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page Not Found - ShopWorld'
  }, [])

  return (
    <div className="py-24 flex items-center justify-center">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-neutral-800 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-neutral-700 mb-6">Page Not Found</h2>
          <p className="text-neutral-600 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-block px-6 py-3 text-lg"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage