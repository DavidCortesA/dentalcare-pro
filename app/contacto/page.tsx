'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  MessageCircle,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

const contactInfo = {
  address: 'Av. Constitución 500, Centro, Monterrey, N.L. 64000',
  phone: '(81) 8765-4321',
  whatsapp: '(81) 1234-5678',
  email: 'contacto@dentalcarepro.mx',
  hours: {
    weekdays: 'Lunes - Viernes: 9:00 AM - 7:00 PM',
    saturday: 'Sábado: 9:00 AM - 2:00 PM',
    sunday: 'Domingo: Cerrado',
  },
  emergencies: '24/7 - (81) 9999-8888',
  social: {
    facebook: 'https://facebook.com/dentalcarepro',
    instagram: 'https://instagram.com/dentalcarepro',
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactoPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (aquí conectarías con tu API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);

    // Reset form después de 5 segundos
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-dental-mint text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0tMiAzMGgtMnYtMzBoMnYzMHptLTQgMGgtMlYwaDJ2NjB6bS0yLTMwaC0yVjBoMnYzMHptLTQgMzBoLTJWMGgydjYwem0tMiAwSDh2LTJIMHY2MHptMzAtMmgyVjBoLTJ2NTh6bS0yIDJoLTJWMGgydjYwem0tNCAwaC0yVjBoMnY2MHptLTIgMGgtMlYwaDJ2NjB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto">
              Estamos aquí para responder todas tus preguntas sobre nuestros servicios dentales
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
              >
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Envíanos un Mensaje
                </h2>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Gracias por contactarnos. Te responderemos dentro de las próximas 24 horas.
                    </p>
                    <Link
                      href="/"
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Volver al Inicio
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Juan Pérez"
                      />
                    </div>

                    {/* Email y Teléfono */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="(81) 1234-5678"
                        />
                      </div>
                    </div>

                    {/* Asunto */}
                    <div>
                      <label htmlFor="asunto" className="block text-sm font-semibold text-gray-700 mb-2">
                        Asunto *
                      </label>
                      <select
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="consulta-general">Consulta General</option>
                        <option value="agendar-cita">Agendar Cita</option>
                        <option value="informacion-servicios">Información sobre Servicios</option>
                        <option value="presupuesto">Solicitar Presupuesto</option>
                        <option value="emergencia">Emergencia Dental</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-dental-mint text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      Al enviar este formulario, aceptas nuestra{' '}
                      <Link href="/privacidad" className="text-primary-600 hover:underline">
                        Política de Privacidad
                      </Link>
                    </p>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Información de Contacto */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Dirección</p>
                      <p className="text-gray-600 text-sm">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Teléfono</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-primary-600 hover:underline text-sm">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MessageCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <a 
                        href={`https://wa.me/521${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline text-sm"
                      >
                        {contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-primary-600 hover:underline text-sm">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Horarios */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 text-primary-600 mr-2" />
                  Horarios de Atención
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{contactInfo.hours.weekdays}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactInfo.hours.saturday}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactInfo.hours.sunday}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="font-semibold text-red-600">Emergencias 24/7</p>
                    <a href={`tel:${contactInfo.emergencies}`} className="text-primary-600 hover:underline">
                      {contactInfo.emergencies}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Redes Sociales */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-primary-600 to-dental-mint text-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-display font-bold mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  <a
                    href={contactInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href={contactInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </motion.div>

              {/* CTA Rápido */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="/agendar"
                  className="block w-full px-6 py-4 bg-primary-600 text-white text-center rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <Calendar size={20} />
                  <span>Agendar Cita Ahora</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Encuéntranos
            </h2>
            <p className="text-xl text-gray-600">
              Ubicados en el corazón de Monterrey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.2861738034447!2d-100.31203368497656!3d25.669195983687425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86629531b437f8ad%3A0x96d338467c53ff7!2sCentro%2C%20Monterrey%2C%20N.L.!5e0!3m2!1sen!2smx!4v1234567890123!5m2!1sen!2smx"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>

          {/* Indicaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
              Cómo Llegar
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Estacionamiento disponible en el edificio
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                A 5 minutos de la Macroplaza
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Acceso por transporte público (Línea 2 del Metro)
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Instalaciones con acceso para personas con discapacidad
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
            ¿Tienes Preguntas?
          </h3>
          <p className="text-gray-600 mb-8">
            Revisa nuestras preguntas frecuentes para obtener respuestas inmediatas
          </p>
          <Link
            href="/faq"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Ver Preguntas Frecuentes
          </Link>
        </div>
      </section>
    </div>
  );
}
