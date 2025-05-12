import { useState } from 'react'
import { motion } from 'framer-motion'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setIsError(true)
      return
    }
    
    // This would normally connect to a backend
    setIsSubmitted(true)
    setIsError(false)
    setEmail('')
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section className="py-12 bg-primary-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-primary-100 mb-8">
              Stay updated with our latest offers, product launches, and exclusive deals.
            </p>
            
            <motion.form 
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setIsError(false)
                }}
                placeholder="Enter your email"
                className={`flex-grow px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${
                  isError ? 'border-accent-500 bg-accent-600/20' : ''
                }`}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
            
            {isError && (
              <motion.p 
                className="mt-3 text-accent-300 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Please enter a valid email address.
              </motion.p>
            )}
            
            {isSubmitted && (
              <motion.p 
                className="mt-3 text-primary-100 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Thank you for subscribing! 🎉
              </motion.p>
            )}
            
            <p className="mt-6 text-primary-200 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive marketing updates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection