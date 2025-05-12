import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
      link: '/products?category=electronics',
      items: '320+ Products'
    },
    {
      id: 2,
      name: 'Fashion',
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
      link: '/products?category=fashion',
      items: '450+ Products'
    },
    {
      id: 3,
      name: 'Home & Living',
      image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
      link: '/products?category=home',
      items: '280+ Products'
    },
    {
      id: 4,
      name: 'Beauty',
      image: 'https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg',
      link: '/products?category=beauty',
      items: '150+ Products'
    },
    {
      id: 5,
      name: 'Sports',
      image: 'https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg',
      link: '/products?category=sports',
      items: '120+ Products'
    }
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title">Shop By Category</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Browse through our wide range of categories and find exactly what you're looking for.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link 
                to={category.link} 
                className="block relative overflow-hidden rounded-lg shadow-md h-60 group"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-neutral-200">{category.items}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCategories