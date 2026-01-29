import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Award, HeartHandshake, Stethoscope, Shield } from 'lucide-react';

import { aboutPage } from '../lib/static-content';

export default function NosotrosPage() {
  const highlights = [
    {
      icon: Stethoscope,
      title: 'Especialistas certificados',
      desc: 'Equipo con experiencia y formación continua.',
    },
    {
      icon: Shield,
      title: 'Tecnología y seguridad',
      desc: 'Protocolos y equipo moderno para tu tranquilidad.',
    },
    {
      icon: HeartHandshake,
      title: 'Trato humano',
      desc: 'Acompañamiento claro y empático en cada paso.',
    },
    {
      icon: Award,
      title: 'Calidad comprobable',
      desc: 'Enfoque en resultados, estética y función.',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow border border-primary-100">
                <span className="text-sm font-semibold text-primary-700">{aboutPage.title}</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-display font-bold text-gray-900">
                {aboutPage.subtitle}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Conoce nuestra filosofía, valores y cómo trabajamos para cuidar tu sonrisa.
              </p>
            </div>

            <div className="relative">
              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={aboutPage.heroImage}
                  alt="Equipo dental"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary-600 to-dental-mint text-white flex items-center justify-center shadow mb-4">
                    <Icon size={22} />
                  </div>
                  <div className="font-bold text-gray-900">{h.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{h.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-primary-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{aboutPage.content}</ReactMarkdown>
          </article>
        </div>
      </section>
    </div>
  );
}

