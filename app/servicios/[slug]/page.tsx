'use client';

import { useService } from '@/app/lib/hooks/useStrapi';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { use } from 'react';

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { service, isLoading, error } = useService(slug);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Servicio no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El servicio que buscas no existe o fue eliminado.
          </p>
          <Link
            href="/servicios"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver a Servicios</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get attributes from Strapi format
  const attributes = service.attributes || service;
  const title = attributes.title || '';
  const description = attributes.description || '';
  const benefits = attributes.benefits || [];
  const duration = attributes.duration || '';
  const price = attributes.price || '';
  const imageUrl = process.env.NEXT_PUBLIC_STRAPI_URL + attributes.image.url || '';

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary-600 to-dental-mint">
        {imageUrl && (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
          </>
        )}
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <Link
                href="/servicios"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Volver a Servicios</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                  {title}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              {benefits.length > 0 && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                    Beneficios del Tratamiento
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((benefit: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <CheckCircle className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Section */}
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  ¿Cómo funciona el tratamiento?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: 'Consulta Inicial',
                      description: 'Evaluamos tu caso y te explicamos las opciones disponibles.',
                    },
                    {
                      step: 2,
                      title: 'Plan de Tratamiento',
                      description: 'Diseñamos un plan personalizado según tus necesidades y objetivos.',
                    },
                    {
                      step: 3,
                      title: 'Tratamiento',
                      description: 'Realizamos el procedimiento con tecnología de vanguardia.',
                    },
                    {
                      step: 4,
                      title: 'Seguimiento',
                      description: 'Te acompañamos en el proceso de recuperación y mantenimiento.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-600 to-dental-mint rounded-full flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Información del Servicio
                </h3>
                
                <div className="space-y-4">
                  {/* Duration */}
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                    <Clock className="text-primary-600" size={24} />
                    <div>
                      <div className="text-sm text-gray-600">Duración</div>
                      <div className="font-semibold text-gray-900">{duration}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                    <Sparkles className="text-primary-600" size={24} />
                    <div>
                      <div className="text-sm text-gray-600">Precio</div>
                      <div className="font-semibold text-primary-600 text-lg">{price}</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/agendar"
                  className="mt-6 w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                >
                  <Calendar size={22} />
                  <span>Agendar Cita</span>
                </Link>
              </div>

              {/* Contact Card */}
              <div className="bg-primary-600 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-display font-bold mb-4">
                  ¿Tienes dudas?
                </h3>
                <p className="text-primary-100 mb-6">
                  Nuestro equipo está listo para ayudarte con cualquier pregunta sobre este tratamiento.
                </p>
                <a
                  href="tel:+528112345678"
                  className="block w-full px-6 py-3 bg-white text-primary-700 rounded-xl font-bold text-center hover:shadow-lg transition-all"
                >
                  Llamar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}