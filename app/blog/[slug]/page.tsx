'use client';

import { useBlogPost } from '@/app/lib/hooks/useStrapi';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { use } from 'react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { post, isLoading, error } = useBlogPost(slug);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Artículo no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El artículo que buscas no existe o fue eliminado.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get attributes from Strapi format
  const attributes = post.attributes || post;
  const title = attributes.title || '';
  const content = attributes.content || '';
  const excerpt = attributes.excerpt || '';
  const date = attributes.date || '';
  const author = attributes.author?.data?.attributes?.name || attributes.author.name || 'DentalCare Pro';
  const category = attributes.category || '';
  const readTime = attributes.readTime || '5 min';
  const imageUrl = attributes.image?.url?.startsWith('http')
    ? attributes.image.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${attributes.image?.url}`;

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Category Badge */}
            {category && (
              <span className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold mb-4">
                {category}
              </span>
            )}
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span>{author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>
                  {new Date(date).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
            {excerpt}
          </p>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-6 mt-8">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 mt-8">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <span className="text-gray-700 leading-relaxed mb-6">
                  {children}
                </span>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-6 ml-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-6 ml-6 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary-500 pl-6 py-2 my-6 bg-primary-50 rounded-r-lg">
                  <p className="text-gray-700 italic">{children}</p>
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="text-primary-700 font-semibold">
                  {children}
                </strong>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-primary-600 hover:text-primary-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft size={20} />
            <span>Volver al Blog</span>
          </Link>
        </div>
      </article>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary-600 to-dental-mint py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-display font-bold mb-4">
            ¿Listo para tu consulta?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Agenda tu cita y comienza tu camino hacia una sonrisa saludable
          </p>
          <Link
            href="/agendar"
            className="inline-block px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            Agendar Cita Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}