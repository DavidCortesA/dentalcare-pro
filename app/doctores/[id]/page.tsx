'use client';

import { useDoctor } from '@/app/lib/hooks/useStrapi';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  GraduationCap,
  Award,
  Languages,
  Clock,
  MapPin,
} from 'lucide-react';
import { use } from 'react';

export default function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { doctor, isLoading, error } = useDoctor(slug);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del doctor...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !doctor) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Doctor no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El doctor que buscas no existe o fue eliminado.
          </p>
          <Link
            href="/doctores"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver a Doctores</span>
          </Link>
        </div>
      </div>
    );
  }

  console.log(doctor);
  console.log(isLoading);
  console.log(error);

  // Get attributes from Strapi format
  const attributes = doctor?.attributes || doctor;
  const name = attributes.name || '';
  const specialty = attributes.specialty || '';
  const bio = attributes.bio || '';
  const experience = attributes.experience || '';
  const credentials = attributes.credentials || [];
  const languages = attributes.languages || [];
  const schedule = attributes.schedule || {};
  const imageUrl = process.env.NEXT_PUBLIC_STRAPI_URL + attributes?.image?.url || '';

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/doctores"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver a Doctores</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Doctor Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {/* {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                )} */}
              </div>
              
              {/* Experience Badge */}
              <div className="mt-6 p-6 bg-gradient-to-br from-primary-600 to-dental-mint rounded-xl text-white text-center">
                <Award className="mx-auto mb-2" size={32} />
                <div className="text-3xl font-bold">{experience}</div>
                <div className="text-primary-100">de experiencia</div>
              </div>
            </motion.div>

            {/* Doctor Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
                  {name}
                </h1>
                <p className="text-2xl text-primary-600 font-semibold mb-8">
                  {specialty}
                </p>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">{bio}</p>
                </div>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {/* Languages */}
                  {languages.length > 0 && (
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Languages className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Idiomas</div>
                        <div className="text-gray-600">{languages.join(', ')}</div>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Ubicación</div>
                      <div className="text-gray-600">Monterrey, N.L.</div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/agendar"
                    className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                  >
                    <Calendar size={22} />
                    <span>Agendar Cita con {name.split(' ')[1] || name}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      {credentials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Formación y Certificaciones
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {credentials.map((credential: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-6 bg-white rounded-xl border border-gray-200"
                >
                  <GraduationCap className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                  <p className="text-gray-700">{credential}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schedule Section */}
      {Object.keys(schedule).length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Horario de Atención
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(schedule).map(([day, hours], index) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="text-primary-600" size={20} />
                    <span className="font-semibold text-gray-900">{day}</span>
                  </div>
                  <span className="text-gray-600">{hours}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-dental-mint py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-display font-bold mb-4">
            ¿Listo para tu consulta?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Agenda tu cita con {name.split(' ')[0]} y comienza tu camino hacia una sonrisa saludable
          </p>
          <Link
            href="/agendar"
            className="inline-block px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            Agendar Cita Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}