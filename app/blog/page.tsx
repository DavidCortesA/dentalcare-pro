'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

import { useBlogPosts } from '../lib/hooks/useStrapi';
import LoadingPage from '../components/LoadingPage';
import NotFound from '../not-found';

export default function BlogPage() {
  const { posts, isLoading, error } = useBlogPosts(3);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  
  if (isLoading) return <LoadingPage />;
  if (error || !posts) NotFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-16 -right-16 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-dental-mint/20 rounded-full blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.45, 0.25, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg border border-primary-100"
            >
              <span className="text-sm font-semibold text-primary-700">Blog</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-700">{posts?.length} artículos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              <span className="text-gray-900">Consejos de</span>{' '}
              <span className="bg-linear-to-r from-primary-700 to-dental-mint bg-clip-text text-transparent">
                Salud Dental
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Artículos cortos y prácticos escritos por nuestros especialistas para ayudarte a mantener
              una sonrisa saludable.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section ref={ref} className="py-20 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-white shadow-md text-primary-700 rounded-full text-sm font-semibold mb-4">
              Blog
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
              Últimos artículos
            </h2>
            <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
              Haz clic en un artículo para leerlo completo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts?.map((post: any, index: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 26 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.image.url}`}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-700">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>
                            {new Date(post.date).toLocaleDateString('es-MX', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <User size={16} />
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                          <span className="mr-1">Leer</span>
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-2 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

