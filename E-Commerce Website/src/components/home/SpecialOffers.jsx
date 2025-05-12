import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on selected items',
      image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg',
      background: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      link: '/products?sale=summer'
    },
    {
      id: 2,
      title: 'New Electronics',
      subtitle: 'Latest gadgets with special launch offers',
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
      background: 'bg-gradient-to-r from-neutral-900 to-neutral-700',
      link: '/products?category=electronics&new=true'
    },
    {
      id: 3,
      title: 'Fashion Week',
      subtitle: 'Exclusive collections at unbeatable prices',
      image: 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg',
      background: 'bg-gradient-to-r from-pink-600 to-purple-700',
      link: '/products?category=fashion&sale=true'
    }
  ]

  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="section-title text-center">Special Offers</h2>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mt-8 pb-10 special-offers-swiper"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <motion.div 
                className={`rounded-xl overflow-hidden h-[300px] relative ${offer.background}`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url(${offer.image})` }}
                ></div>
                <div className="relative flex flex-col justify-between h-full p-6 text-white z-10">
                  <div className="bg-white/20 rounded-full px-4 py-1 text-sm self-start backdrop-blur-sm">
                    Limited Time
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="mb-4">{offer.subtitle}</p>
                    <Link 
                      to={offer.link} 
                      className="inline-block bg-white text-neutral-900 px-5 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default SpecialOffers