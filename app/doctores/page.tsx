'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Phone, GraduationCap, Languages } from 'lucide-react';
import { useDoctors } from '../lib/hooks/useStrapi';
import NotFound from '../not-found';
import LoadingPage from '../components/LoadingPage';

export default function DoctoresPage() {
  const { doctors, error, isLoading } = useDoctors();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  if (isLoading) (<LoadingPage />);
  if (error || !doctors) NotFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50">
        {/* Background Decoration */}
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
              <span className="text-sm font-semibold text-primary-700">Nuestro Equipo</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-700">{doctors?.length} especialistas</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              <span className="text-gray-900">Conoce a Nuestros</span>{' '}
              <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
                Doctores
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Odontólogos certificados, tecnología de vanguardia y un trato humano.
              Elige al especialista ideal y agenda tu cita en minutos.
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
      <section ref={ref} className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between gap-6 mb-10"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
                Especialistas para cada necesidad
              </h2>
              <p className="mt-3 text-gray-600">
                Explora perfiles, experiencia y disponibilidad. Haz clic para ver más detalles.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors?.map((doctor: any, index: number) => {
              const doctorImageUrl =
                doctor?.image?.url?.startsWith('http')
                  ? doctor?.image?.url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL as string}${doctor?.image?.url}`;

              return (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group"
                >
                  <Link href={`/doctores/${doctor.slug}`}>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={doctorImageUrl}
                          alt={doctor.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Experience Badge */}
                        <div className="absolute top-4 right-4 px-3 py-2 bg-white rounded-lg shadow-lg">
                          <div className="text-xs text-gray-600">Experiencia</div>
                          <div className="text-lg font-bold text-primary-600">{doctor.experience}</div>
                        </div>

                        {/* Name */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-display font-bold text-white mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-primary-200 font-medium">{doctor.specialty}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-3">{doctor.bio}</p>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <GraduationCap size={16} className="mr-2 text-primary-600" />
                            <span>{doctor.credentials[0]}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Languages size={16} className="mr-2 text-primary-600" />
                            <span>{doctor.languages.join(', ')}</span>
                          </div>
                        </div>

                        <div className="w-full px-4 py-3 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                          <Calendar size={18} />
                          <span>Ver perfil</span>
                        </div>
                      </div>

                      {/* Hover Border */}
                      <div className="absolute inset-0 border-2 border-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

