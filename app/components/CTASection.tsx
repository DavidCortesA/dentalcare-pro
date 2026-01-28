'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 bg-linear-to-br from-primary-600 via-primary-700 to-dental-mint overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              ¿Listo para Transformar
              <br />
              Tu Sonrisa?
            </h2>
            <p className="text-xl text-primary-100 mb-12 leading-relaxed">
              Agenda tu consulta gratuita hoy y descubre cómo podemos ayudarte 
              a lograr la sonrisa que siempre has deseado
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/agendar"
                  className="flex items-center space-x-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                >
                  <Calendar size={22} />
                  <span>Agendar Cita Ahora</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="tel:+528112345678"
                  className="flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  <Phone size={22} />
                  <span>(81) 1234-5678</span>
                </a>
              </motion.div>
            </div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12"
            >
              <div className="flex items-center space-x-3 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left">
                  <div className="text-sm text-primary-200">WhatsApp</div>
                  <a href="https://wa.me/528112345678" className="font-bold hover:underline">
                    +52 81 1234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div className="text-left">
                  <div className="text-sm text-primary-200">Horario</div>
                  <div className="font-bold">Lun - Vie: 9AM - 7PM</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-500/30"
          >
            {[
              { value: '10,000+', label: 'Pacientes Atendidos' },
              { value: '15+', label: 'Años de Experiencia' },
              { value: '4.9/5', label: 'Calificación' },
              { value: '100%', label: 'Garantía' },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
