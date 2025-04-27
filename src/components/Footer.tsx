
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerLinks = React.useMemo(() => [
    { name: "Home", action: () => scrollToSection('home') },
    { name: "About the Workshop", action: () => scrollToSection('about') },
    { name: "Curriculum & Schedule", action: () => scrollToSection('curriculum') },
    { name: "Instructors", action: () => scrollToSection('instructors') },
    { name: "Apply Now", href: "/apply" }
  ], []);

  const socials = React.useMemo(() => [
    { icon: <Instagram size={18} />, url: "https://instagram.com/vocalexcellence", label: "Instagram" },
    { icon: <Twitter size={18} />, url: "https://twitter.com/vocalexcellence", label: "Twitter" },
    { icon: <Youtube size={18} />, url: "https://youtube.com/vocalexcellence", label: "YouTube" }
  ], []);

  return (
    <footer className="relative bg-[#fbfbfd] overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        <div className="py-4 border-b border-[#d2d2d7]">
          <p className="text-[12px] leading-[1.33337] font-normal text-[#6e6e73]">
            Vocal Excellence brings transformative musical education to passionate singers through expert-led training in Limassol, Cyprus.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 py-12">
          <div className="md:col-span-2">
            <nav>
              <h3 className="text-[12px] leading-[1.33337] font-semibold mb-3 text-[#1d1d1f]">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link, i) => (
                  <li key={i}>
                    {link.href ? (
                      <Link 
                        to={link.href}
                        className="text-[12px] leading-[1.33337] text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button 
                        onClick={link.action} 
                        className="text-[12px] leading-[1.33337] text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300 text-left"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-[12px] leading-[1.33337] font-semibold mb-3 text-[#1d1d1f]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-[12px] leading-[1.33337] text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[12px] leading-[1.33337] text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[12px] leading-[1.33337] font-semibold mb-3 text-[#1d1d1f]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-[#424245] mr-2" />
                <a href="mailto:info@vocalexcellence.com" className="text-[12px] leading-[1.33337] text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300">
                  info@vocalexcellence.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-[#424245] mr-2" />
                <a href="tel:+35799123456" className="text-[12px] leading-[1.33337] text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300">
                  +357 99 123 456
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 text-[#424245] mr-2" />
                <span className="text-[12px] leading-[1.33337] text-[#424245]">
                  Limassol, Cyprus
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-4 border-t border-[#d2d2d7]">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#424245] hover:text-[#1d1d1f] transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <p className="text-[12px] leading-[1.33337] text-[#6e6e73]">
              Copyright © {new Date().getFullYear()} Vocal Excellence. All rights reserved.
            </p>
            <Link 
              to="/"
              className="hidden md:block"
            >
              <img 
                src="/lovable-uploads/9994f82c-80e4-477a-b629-3bef5ef8f2c1.png" 
                alt="Vocal Excellence Logo" 
                className="w-12 h-12"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
