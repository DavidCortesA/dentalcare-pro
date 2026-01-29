'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar, Phone, Sparkles, Smile, Activity, Star, Shield } from 'lucide-react';
import { useServices } from '../lib/hooks/useStrapi';
import LoadingPage from '../components/LoadingPage';
import NotFound from '../not-found';

const iconMap: { [key: string]: any } = {
  Sparkles,
  Smile,
  Activity,
  Star,
  Shield,
};

export default function ServiciosPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  const { services, isLoading, error } = useServices();

  if (isLoading) return <LoadingPage />;
  if (error) NotFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-16 -right-16 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-dental-mint/20 rounded-full blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.45, 0.25, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg border border-primary-100"
            >
              <span className="text-sm font-semibold text-primary-700">Servicios</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-700">{services?.length} tratamientos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              <span className="text-gray-900">Tratamientos</span>{' '}
              <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
                de Primera Clase
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Desde prevención hasta tratamientos avanzados. Explora opciones, duración, beneficios
              y precios estimados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/agendar"
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <Calendar size={22} />
                <span>Agendar Cita</span>
              </Link>
              <a
                href="tel:+528112345678"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
              >
                <Phone size={22} />
                <span>Llamar Ahora</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
              Elige el tratamiento ideal
            </h2>
            <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
              Haz clic en un servicio para ver beneficios, duración y recomendaciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service: any, index: number) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group"
                >
                  <Link href={`/servicios/${service.slug}`}>
                    <div className="relative h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL as string}${service.image.url}`}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                        <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Icon className="text-primary-600" size={24} />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-gray-500">⏱️ {service.duration}</span>
                          <span className="font-semibold text-primary-600">{service.price}</span>
                        </div>

                        <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                          <span>Ver detalles</span>
                          <ArrowRight
                            size={18}
                            className="ml-2 group-hover:translate-x-2 transition-transform"
                          />
                        </div>
                      </div>

                      <div className="absolute inset-0 border-2 border-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

