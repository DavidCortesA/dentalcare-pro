import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { blogPosts } from '../../lib/data';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-700">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary-700">
              Blog
            </Link>
          </nav>

          <div className="mt-6">
            <div className="inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-700 shadow">
              {post.category}
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-display font-bold text-gray-900">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center space-x-2">
                <Calendar size={16} className="text-primary-600" />
                <span>
                  {new Date(post.date).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </span>
              <span className="flex items-center space-x-2">
                <Clock size={16} className="text-primary-600" />
                <span>{post.readTime}</span>
              </span>
              <span className="flex items-center space-x-2">
                <User size={16} className="text-primary-600" />
                <span>{post.author}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content ?? ''}
            </ReactMarkdown>
          </article>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/blog"
              className="flex items-center justify-center px-8 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all"
            >
              Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

