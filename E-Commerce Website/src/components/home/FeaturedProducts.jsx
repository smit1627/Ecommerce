import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../products/ProductCard'

// Sample product data
import { featuredProducts } from '../../data/products'

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('trending')
  
  const filterProducts = (tab) => {
    return featuredProducts.filter(product => product.tags.includes(tab))
  }
  
  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="section-title mb-4 md:mb-0">Featured Products</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filterProducts(activeTab).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        
        <div className="text-center mt-10">
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts