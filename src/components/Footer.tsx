import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ArrowRight, FileText, Shield } from 'lucide-react';
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
    { icon: <Facebook size={18} />, url: "https://facebook.com/vocalexcellence", label: "Facebook" },
    { icon: <Youtube size={18} />, url: "https://youtube.com/vocalexcellence", label: "YouTube" }
  ], []);

  return (
    <footer className="relative bg-apple-text text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-apple-blue via-apple-blue to-apple-blue/70"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-apple-blue/10 blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-apple-blue/10 blur-[100px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto py-12 sm:py-16 px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
          <div className="md:col-span-1 space-y-5">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/9994f82c-80e4-477a-b629-3bef5ef8f2c1.png" 
                alt="Vocal Excellence Logo" 
                className="w-32 h-32 mr-3"
                loading="lazy" 
                width="128"
                height="128"
              />
            </Link>
            
            <p className="text-apple-grey text-sm leading-relaxed max-w-md">
              Transforming passionate singers into confident performers through immersive, expert-led training in the stunning coastal setting of Limassol, Cyprus.
            </p>
            
            <ul className="flex space-x-4 mt-4">
              {socials.map((social, i) => (
                <li key={i}>
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-apple-blue/10 text-apple-grey hover:text-white hover:bg-apple-blue/20 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-white mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link, i) => (
                  <li key={i}>
                    {link.href ? (
                      <Link 
                        to={link.href}
                        className="text-apple-grey hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button 
                        onClick={link.action} 
                        className="text-apple-grey hover:text-white transition-colors duration-300 text-sm text-left"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4 uppercase text-sm tracking-wider">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-apple-grey hover:text-white transition-colors duration-300 text-sm">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-apple-grey hover:text-white transition-colors duration-300 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/accessibility" className="text-apple-grey hover:text-white transition-colors duration-300 text-sm">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4 uppercase text-sm tracking-wider">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="w-4 h-4 text-apple-grey mt-1 mr-2" />
                  <a href="mailto:info@vocalexcellence.com" className="text-apple-grey hover:text-white transition-colors duration-300 text-sm">
                    info@vocalexcellence.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="w-4 h-4 text-apple-grey mt-1 mr-2" />
                  <a href="tel:+35799123456" className="text-apple-grey hover:text-white transition-colors duration-300 text-sm">
                    +357 99 123 456
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 text-apple-grey mt-1 mr-2" />
                  <span className="text-apple-grey text-sm">
                    Limassol, Cyprus
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-apple-grey/20 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-apple-grey mb-4 sm:mb-0">
            © {new Date().getFullYear()} Vocal Excellence. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/apply"
              className="flex items-center text-apple-blue/90 hover:text-apple-blue transition-colors duration-300 text-xs font-medium"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
