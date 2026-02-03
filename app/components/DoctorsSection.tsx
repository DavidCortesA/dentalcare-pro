'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Award, Languages, Calendar } from 'lucide-react';

export default function DoctorsSection({ doctors }: { doctors: any[] }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageUrl =
    doctors?.image?.url?.startsWith('http')
      ? doctors?.image?.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL as string}${doctors?.image?.url}`;

  return (
    <section ref={ref} className="py-24 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white shadow-md text-primary-700 rounded-full text-sm font-semibold mb-4">
            Nuestro Equipo
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-gray-900">Conoce a Nuestros</span>
            <br />
            <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
              Especialistas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odontólogos certificados con años de experiencia, dedicados a brindarte 
            la mejor atención y los tratamientos más avanzados
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor: any, index: number) => (
            <motion.div
              key={doctor.documentId}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/doctores/${doctor.slug}`}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={doctor?.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4 px-3 py-2 bg-white rounded-lg shadow-lg">
                      <div className="text-xs text-gray-600">Experiencia</div>
                      <div className="text-lg font-bold text-primary-600">{doctor.experience}</div>
                    </div>

                    {/* Name on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-primary-200 font-medium">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Bio */}
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {doctor.bio}
                    </p>

                    {/* Quick Info */}
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

                    {/* CTA Button */}
                    <button className="w-full px-4 py-3 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      <Calendar size={18} />
                      <span>Agendar con {doctor.name.split(' ')[1]}</span>
                    </button>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/doctores"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
          >
            <Award size={20} />
            <span>Ver Todos los Doctores</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
