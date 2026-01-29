'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, Award, Users, Clock, Shield } from 'lucide-react';

export default function Hero({ testimonials }: { testimonials: any[] }) {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Pacientes Felices' },
    { icon: Award, value: '15+', label: 'Años de Experiencia' },
    { icon: Clock, value: '24/7', label: 'Atención de Emergencias' },
    { icon: Shield, value: '100%', label: 'Tratamientos Garantizados' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-dental-mint/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg border border-primary-100"
            >
              <Award className="text-primary-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">
                Clínica Dental Certificada
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight">
                <span className="bg-linear-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                  Tu Sonrisa
                </span>
                <br />
                <span className="text-gray-900">
                  Es Nuestra
                </span>
                <br />
                <span className="bg-linear-to-r from-dental-mint to-green-600 bg-clip-text text-transparent">
                  Pasión
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              Tratamientos dentales de primera clase con tecnología de vanguardia 
              y un equipo de especialistas comprometidos con tu salud bucal.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/agendar"
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <Calendar size={22} />
                <span>Agendar Cita</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>

              <a
                href="tel:+528112345678"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
              >
                <Phone size={22} />
                <span>Llamar Ahora</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-6 pt-4"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {testimonials?.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"
                    >
                      <Image
                        src={testimonial?.image || "/avatar-default.png"}
                        alt={testimonial?.name || 'Testimonial'}
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">1,000+</div>
                  <div className="text-gray-600">Pacientes este mes</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1659989693409-5adc97274bed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Clínica Dental Profesional"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">4.9/5</div>
                    <div className="text-sm text-gray-600">Calificación Promedio</div>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  Basado en más de 500 reseñas verificadas de pacientes satisfechos
                </p>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-dental-mint to-green-600 rounded-2xl shadow-xl flex items-center justify-center"
            >
              <div className="text-center text-white">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-xs">Años</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-linear-to-br from-primary-500 to-dental-mint rounded-2xl text-white shadow-lg">
                <stat.icon size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
