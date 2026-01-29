'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { doctors } from '../lib/data';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export default function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentFormData>();

  const onSubmit = async (data: AppointmentFormData) => {
    console.log('Appointment data:', data);
    // TODO: Connect with Strapi API
    // await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) });
    
    setIsSubmitted(true);
    reset();
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const services = [
    'Limpieza Dental',
    'Blanqueamiento',
    'Ortodoncia',
    'Implantes',
    'Carillas',
    'Endodoncia',
    'Otro'
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6"
        >
          <CheckCircle size={40} className="text-white" />
        </motion.div>
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
          ¡Cita Agendada!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Hemos recibido tu solicitud. Te contactaremos pronto para confirmar tu cita.
        </p>
        <p className="text-sm text-gray-600">
          También te enviamos un correo de confirmación a tu email.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <User size={16} className="mr-2" />
            Nombre Completo *
          </label>
          <input
            {...register('name', { required: 'El nombre es requerido' })}
            type="text"
            id="name"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Mail size={16} className="mr-2" />
            Correo Electrónico *
          </label>
          <input
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="juan@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <Phone size={16} className="mr-2" />
          Teléfono *
        </label>
        <input
          {...register('phone', { required: 'El teléfono es requerido' })}
          type="tel"
          id="phone"
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="(81) 1234-5678"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Doctor and Service Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Doctor */}
        <div>
          <label htmlFor="doctor" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <User size={16} className="mr-2" />
            Odontólogo de Preferencia
          </label>
          <select
            {...register('doctor')}
            id="doctor"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            <option value="">Cualquier doctor disponible</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.documentId}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare size={16} className="mr-2" />
            Tipo de Servicio *
          </label>
          <select
            {...register('service', { required: 'Selecciona un servicio' })}
            id="service"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            <option value="">Selecciona un servicio</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
          )}
        </div>
      </div>

      {/* Date and Time Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Calendar size={16} className="mr-2" />
            Fecha Preferida *
          </label>
          <input
            {...register('date', { required: 'La fecha es requerida' })}
            type="date"
            id="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Clock size={16} className="mr-2" />
            Hora Preferida *
          </label>
          <select
            {...register('time', { required: 'La hora es requerida' })}
            id="time"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            <option value="">Selecciona una hora</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <MessageSquare size={16} className="mr-2" />
          Mensaje Adicional
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          placeholder="¿Tienes alguna pregunta o comentario adicional?"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
      >
        <Calendar size={22} />
        <span>Agendar Mi Cita</span>
      </motion.button>

      <p className="text-sm text-gray-600 text-center">
        * Campos requeridos. Te contactaremos para confirmar tu cita.
      </p>
    </form>
  );
}
