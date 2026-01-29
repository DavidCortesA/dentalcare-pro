import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import DoctorsSection from './components/DoctorsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import BlogSection from './components/BlogSection'
import { getBlogPosts, getDoctors, getServices, getTestimonials } from './lib/strapi'

export default async function Home() {
  const doctors = await getDoctors();
  const testimonials = await getTestimonials();
  const services =  await getServices();
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Hero testimonials={testimonials} />
      <ServicesSection services={services} />
      <DoctorsSection doctors={doctors} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection blogPosts={blogPosts} />
      <CTASection />
    </>
  )
}
