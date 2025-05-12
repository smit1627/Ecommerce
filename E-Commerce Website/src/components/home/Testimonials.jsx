import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Lawrence',
      position: 'Fashion Designer',
      image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg',
      rating: 5,
      text: 'I absolutely love shopping here! The quality of products is exceptional, and the customer service is top-notch. I highly recommend this store to everyone looking for quality items.'
    },
    {
      id: 2,
      name: 'Michael Roberts',
      position: 'Software Engineer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 5,
      text: 'The shopping experience was seamless from start to finish. Fast shipping, great packaging, and the products were exactly as described. Will definitely be a repeat customer!'
    },
    {
      id: 3,
      name: 'Sophia Chen',
      position: 'Marketing Executive',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 4,
      text: 'Great selection of products and competitive prices. The website is easy to navigate and checkout process is smooth. I appreciate the attention to detail in every aspect.'
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'Architect',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      rating: 5,
      text: 'I found exactly what I was looking for and at a great price. The delivery was prompt and everything arrived in perfect condition. This has become my go-to shopping destination.'
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} 
      />
    ))
  }

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Hear from our satisfied customers about their shopping experience with us.
          </p>
        </motion.div>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
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
          className="testimonials-swiper pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-neutral-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-neutral-700 flex-grow">"{testimonial.text}"</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials