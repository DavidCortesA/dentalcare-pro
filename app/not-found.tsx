import Link from 'next/link';
import { ArrowRight, Home, Calendar, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg border border-primary-100">
              <Search size={18} className="text-primary-700" />
              <span className="text-sm font-semibold text-primary-700">Página no encontrada</span>
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl font-display italic font-bold leading-tight">
              <span className="text-gray-900">Error</span>{' '}
              <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
                404
              </span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed">
              La página que buscas no existe o fue movida. Puedes volver al inicio o agendar una cita.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
              >
                <Home size={20} />
                <span>Volver al inicio</span>
              </Link>
              <Link
                href="/agendar"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <Calendar size={20} />
                <span>Agendar cita</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

