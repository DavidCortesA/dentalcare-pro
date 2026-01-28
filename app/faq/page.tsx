'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { faqItems } from '../lib/data';

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(faqItems[0]?.id ?? null);

  return (
    <div className="pt-20">
      <section className="bg-linear-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow border border-primary-100">
            <HelpCircle size={18} className="text-primary-700" />
            <span className="text-sm font-semibold text-primary-700">Preguntas Frecuentes</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl font-display font-bold text-gray-900">
            FAQ
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Respuestas rápidas a las dudas más comunes.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqItems.map((item) => {
              const isOpen = item.id === openId;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="text-primary-700" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="prose max-w-none prose-a:text-primary-700 prose-headings:font-display">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {item.answer}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

