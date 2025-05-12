import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const HeroSlider = () => {
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress)
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
  }

  // Hero slides data
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1470165/pexels-photo-1470165.jpeg',
      title: 'New Summer Collection',
      subtitle: 'Discover fresh styles for the season',
      cta: 'Shop Now',
      link: '/products?category=summer',
      color: 'from-primary-900/70 to-primary-700/30'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      title: 'Latest Tech Gadgets',
      subtitle: 'Explore cutting-edge electronics',
      cta: 'View Collection',
      link: '/products?category=electronics',
      color: 'from-neutral-900/70 to-neutral-700/30'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg',
      title: 'Home Makeover Sale',
      subtitle: 'Transform your space with our exclusive deals',
      cta: 'Shop Sale',
      link: '/products?category=home',
      color: 'from-accent-900/70 to-accent-700/30'
    }
  ]

  return (
    <div className="relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect="fade"
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-[400px] sm:h-[500px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}></div>
              
              <div className="container-custom relative z-10 text-white">
                <div className="max-w-lg">
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p 
                    className="text-lg sm:text-xl mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Link 
                      to={slide.link} 
                      className="inline-block px-6 py-3 bg-white text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors"
                    >
                      {slide.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}

export default HeroSlider