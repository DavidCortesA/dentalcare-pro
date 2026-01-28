import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, GraduationCap, Languages, Award, Clock } from 'lucide-react';

import { doctors } from '../../lib/data';

export function generateStaticParams() {
  return doctors.map((d) => ({ id: String(d.id) }));
}

export default function DoctorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const doctorId = Number(id);
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) notFound();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="relative w-full lg:w-[420px]">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex-1">
              <nav className="text-sm text-gray-600">
                <Link href="/" className="hover:text-primary-700">
                  Inicio
                </Link>
                <span className="mx-2">/</span>
                <Link href="/doctores" className="hover:text-primary-700">
                  Doctores
                </Link>
              </nav>

              <h1 className="mt-4 text-4xl sm:text-5xl font-display font-bold text-gray-900">
                {doctor.name}
              </h1>
              <p className="mt-2 text-lg text-primary-700 font-semibold">{doctor.specialty}</p>

              <p className="mt-6 text-gray-700 leading-relaxed">{doctor.bio}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/agendar"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <Calendar size={22} />
                  <span>Agendar con este doctor</span>
                </Link>
                <Link
                  href="/doctores"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
                >
                  <span>Ver todos</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Credenciales y formación
                </h2>
                <ul className="space-y-3">
                  {doctor.credentials.map((c) => (
                    <li key={c} className="flex items-start text-gray-700">
                      <Award className="mt-0.5 mr-3 text-primary-600" size={18} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Idiomas y experiencia
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 rounded-xl bg-primary-50 border border-primary-100">
                    <GraduationCap className="text-primary-700 mr-3" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">Experiencia</div>
                      <div className="font-bold text-gray-900">{doctor.experience}</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-xl bg-primary-50 border border-primary-100">
                    <Languages className="text-primary-700 mr-3" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">Idiomas</div>
                      <div className="font-bold text-gray-900">
                        {doctor.languages.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Horario de atención
                </h2>
                <div className="space-y-3">
                  {Object.entries(doctor.schedule).map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex items-start justify-between gap-4 p-3 rounded-xl bg-gray-50"
                    >
                      <div className="font-semibold text-gray-900">{day}</div>
                      <div className="flex items-center text-gray-700">
                        <Clock size={16} className="mr-2 text-primary-600" />
                        <span>{hours}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/agendar"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                  >
                    <Calendar size={20} />
                    <span>Agendar cita</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

