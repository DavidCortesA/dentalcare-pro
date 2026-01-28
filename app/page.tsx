import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import DoctorsSection from './components/DoctorsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import BlogSection from './components/BlogSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <DoctorsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  )
}
