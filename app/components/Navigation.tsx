'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Doctores', href: '/doctores' },
    { name: 'Blog', href: '/blog' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={'/images/DentalCarePro.png'}
              alt="DentalCarePro"
              width={40}
              height={40}
            />
            <div>
              <span className="text-2xl font-bold text-gray-900">
                DentalCare
              </span>
              <span className="font-display italic text-2xl font-bold bg-linear-to-r from-primary-600 to-dental-mint bg-clip-text text-transparent pr-2">
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+528112345678"
              className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <Phone size={18} />
              <span>(81) 1234-5678</span>
            </a>
            <Link
              href="/agendar"
              className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Calendar size={18} />
              <span>Agendar Cita</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-lg text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:+528112345678"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold"
                >
                  <Phone size={18} />
                  <span>(81) 1234-5678</span>
                </a>
                <Link
                  href="/agendar"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-linear-to-r from-primary-600 to-dental-mint text-white rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar size={18} />
                  <span>Agendar Cita</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
