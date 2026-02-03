import { Metadata } from 'next';
import AppointmentForm from '../components/AppointmentForm';
import { Calendar, Clock, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agendar Cita - DentalCare Pro',
  description: 'Agenda tu cita dental en línea. Rápido, fácil y seguro.',
};

export default function AgendarPage() {
  const benefits = [
    {
      icon: Calendar,
      title: 'Agenda en Línea',
      description: 'Reserva tu cita 24/7 desde cualquier dispositivo',
    },
    {
      icon: Clock,
      title: 'Confirmación Inmediata',
      description: 'Recibe confirmación al instante por email y SMS',
    },
    {
      icon: CheckCircle,
      title: 'Sin Compromiso',
      description: 'Consulta inicial gratuita sin obligación',
    },
    {
      icon: Shield,
      title: 'Datos Seguros',
      description: 'Tu información está 100% protegida',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-linear-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display italic font-bold mb-6">
            <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
              Agenda Tu Cita
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo para 
            confirmar tu cita en el horario que mejor te convenga
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <AppointmentForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-display italic font-bold text-gray-900 mb-6">
                ¿Por qué agendar con nosotros?
              </h3>
              <div className="space-y-6">
                {benefits?.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="shrink-0 w-12 h-12 bg-linear-to-br from-primary-500 to-dental-mint rounded-lg flex items-center justify-center">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-linear-to-br from-primary-600 to-dental-mint rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-display italic font-bold mb-4">
                ¿Prefieres llamar?
              </h3>
              <p className="text-primary-100 mb-6">
                Nuestro equipo está listo para atenderte
              </p>
              <a
                href="tel:+528112345678"
                className="block w-full px-6 py-4 bg-white text-primary-700 rounded-xl font-bold text-center hover:shadow-lg transition-all"
              >
                (81) 1234-5678
              </a>
              <div className="mt-6 pt-6 border-t border-primary-400">
                <div className="text-sm text-primary-100 mb-2">Horario de Atención:</div>
                <div className="font-semibold">
                  <div>Lun - Vie: 9:00 AM - 7:00 PM</div>
                  <div>Sábado: 9:00 AM - 2:00 PM</div>
                </div>
              </div>
            </div>

            {/* Emergency Card */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h4 className="font-bold text-red-900 mb-2">
                ¿Emergencia Dental?
              </h4>
              <p className="text-sm text-red-700 mb-4">
                Llámanos inmediatamente para atención prioritaria
              </p>
              <a
                href="tel:+528112345678"
                className="block w-full px-4 py-3 bg-red-600 text-white rounded-lg font-bold text-center hover:bg-red-700 transition-colors"
              >
                Llamar Emergencias
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: '¿Cuánto tiempo dura una consulta?',
                a: 'La consulta inicial dura aproximadamente 30-45 minutos, donde evaluaremos tu situación y crearemos un plan de tratamiento personalizado.',
              },
              {
                q: '¿Qué debo llevar a mi primera cita?',
                a: 'Te recomendamos traer tu identificación oficial, estudios dentales previos si los tienes, y una lista de medicamentos que estés tomando.',
              },
              {
                q: '¿Aceptan seguros dentales?',
                a: 'Sí, trabajamos con las principales aseguradoras. Contacta a nuestro equipo para verificar tu cobertura específica.',
              },
              {
                q: '¿Puedo reagendar mi cita?',
                a: 'Por supuesto. Puedes reagendar con al menos 24 horas de anticipación llamando a nuestra clínica o enviando un mensaje.',
              },
            ]?.map((faq, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
