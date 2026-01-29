import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import DoctorsSection from './components/DoctorsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import BlogSection from './components/BlogSection'
import { getBlogPosts, getDoctors, getServices, getTestimonials, transformBlogPost, transformDoctor, transformService } from './lib/strapi'

export default async function Home() {
  const strapiDoctors = await getDoctors();
  const doctors = strapiDoctors.map(transformDoctor);
  const strapiServices = await getServices();
  const services = strapiServices(transformService);
  const strapiTestimonials = await getTestimonials();
  const strapiBlogPosts = await getBlogPosts();
  const blogPosts =strapiBlogPosts(transformBlogPost);

  console.log(strapiDoctors);

  return (
    <>
      {/* <Hero testimonials={strapiTestimonials} />
      <ServicesSection services={services} />
      <DoctorsSection doctors={doctors} />
      <TestimonialsSection testimonials={strapiTestimonials} />
      <BlogSection blogPosts={blogPosts} />
      <CTASection /> */}
    </>
  )
}
