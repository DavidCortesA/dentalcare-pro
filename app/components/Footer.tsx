'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    servicios: [
      { name: 'Limpieza Dental', href: '/servicios/limpieza-dental' },
      { name: 'Blanqueamiento', href: '/servicios/blanqueamiento-dental' },
      { name: 'Ortodoncia', href: '/servicios/ortodoncia-invisible' },
      { name: 'Implantes', href: '/servicios/implantes-dentales' },
    ],
    informacion: [
      { name: 'Sobre Nosotros', href: '/nosotros' },
      { name: 'Nuestros Doctores', href: '/doctores' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contacto', href: '/contacto' },
    ],
    legal: [
      { name: 'Aviso de Privacidad', href: '/privacidad' },
      { name: 'Términos y Condiciones', href: '/terminos' },
      { name: 'Preguntas Frecuentes', href: '/faq' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-dental-mint rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DC</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white">
                  DentalCare
                </span>
                <span className="font-display text-2xl font-bold bg-linear-to-r from-primary-400 to-dental-mint bg-clip-text text-transparent">
                  {' '}Pro
                </span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Tu clínica dental de confianza en Monterrey. Tratamientos de primera clase 
              con tecnología de vanguardia.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Información</h3>
            <ul className="space-y-3">
              {footerLinks.informacion.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Av. Constitución 123<br />
                  Col. Centro, Monterrey, NL
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-400 shrink-0" />
                <a href="tel:+528112345678" className="text-gray-400 hover:text-white transition-colors">
                  (81) 1234-5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-400 shrink-0" />
                <a href="mailto:contacto@dentalcarepro.com" className="text-gray-400 hover:text-white transition-colors">
                  contacto@dentalcarepro.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={20} className="text-primary-400 shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <div>Lun - Vie: 9:00 AM - 7:00 PM</div>
                  <div>Sábado: 9:00 AM - 2:00 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DentalCare Pro. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
