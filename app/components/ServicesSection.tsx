'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Smile, Activity, Star, Shield } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Sparkles,
  Smile,
  Activity,
  Star,
  Shield,
};

export interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
  icon: string;
  duration: string;
  price: string;
  image?: {
    url: string;
  };
}

export default function ServicesSection({ services }: { services: Service[] }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
              Tratamientos
            </span>
            <br />
            de Primera Clase
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios dentales con tecnología de vanguardia 
            y los más altos estándares de calidad
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const imageUrl = service.image?.url
              ? service.image.url.startsWith('http')
                ? service.image.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL as string}${service.image.url}`
              : null;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/servicios/${service.slug}`}>
                  <div className="relative h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl || "/images/DentalCarePro.png"}
                        alt={service?.title || "Testimonial"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      
                      {/* Icon */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="text-primary-600" size={24} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-gray-500">
                          ⏱️ {service.duration}
                        </span>
                        <span className="font-semibold text-primary-600">
                          {service.price}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                        <span>Más información</span>
                        <ArrowRight 
                          size={18} 
                          className="ml-2 group-hover:translate-x-2 transition-transform" 
                        />
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span>Ver Todos los Servicios</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
