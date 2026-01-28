import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, BadgeCheck } from 'lucide-react';

import { services } from '../../lib/data';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServicioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-700">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/servicios" className="hover:text-primary-700">
              Servicios
            </Link>
          </nav>

          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">{service.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow border border-primary-100 text-sm font-semibold text-primary-700">
                  <Clock size={16} className="mr-2" /> {service.duration}
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow border border-primary-100 text-sm font-semibold text-primary-700">
                  {service.price}
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/agendar"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <Calendar size={22} />
                  <span>Agendar Cita</span>
                </Link>
                <Link
                  href="/servicios"
                  className="flex items-center justify-center px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
                >
                  Ver todos
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src={service.image} alt={service.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Beneficios principales
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start text-gray-700">
                      <BadgeCheck className="mt-0.5 mr-3 text-primary-600" size={18} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg p-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                  ¿Quieres una valoración?
                </h3>
                <p className="text-gray-600 mb-6">
                  Agenda tu cita y te recomendamos el plan ideal para tu caso.
                </p>
                <Link
                  href="/agendar"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                >
                  <Calendar size={20} />
                  <span>Agendar ahora</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

