import { useEffect } from 'react'
import HeroSlider from '../components/home/HeroSlider'
import FeaturedCategories from '../components/home/FeaturedCategories'
import FeaturedProducts from '../components/home/FeaturedProducts'
import SpecialOffers from '../components/home/SpecialOffers'
import Testimonials from '../components/home/Testimonials'
import NewsletterSection from '../components/home/NewsletterSection'

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    // Update document title
    document.title = 'ShopWorld - Your Online Shopping Destination'
  }, [])

  return (
    <div>
      <HeroSlider />
      <FeaturedCategories />
      <FeaturedProducts />
      <SpecialOffers />
      <Testimonials />
      <NewsletterSection />
    </div>
  )
}

export default HomePage