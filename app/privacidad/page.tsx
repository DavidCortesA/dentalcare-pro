import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { privacyPolicyMarkdown } from '../lib/static-content';

export default function PrivacidadPage() {
  return (
    <div className="pt-20">
      <section className="bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow border border-primary-100">
            <span className="text-sm font-semibold text-primary-700">Legal</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl font-display font-bold text-gray-900">
            Aviso de Privacidad
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Información sobre el uso y protección de tus datos.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-primary-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {privacyPolicyMarkdown}
            </ReactMarkdown>
          </article>
        </div>
      </section>
    </div>
  );
}

