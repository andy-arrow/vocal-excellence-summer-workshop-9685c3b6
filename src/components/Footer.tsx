
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

  // Memoize these arrays to prevent recreating them on each render
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
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-energy-purple via-energy-pink to-energy-cyan"></div>
      {/* Reduce number of absolute elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-energy-purple/20 blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-energy-pink/20 blur-[100px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto py-12 sm:py-16 px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
          <div className="md:col-span-1 space-y-5">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/e980c9b0-8cdc-423d-a726-2f677be33737.png" 
                alt="Vocal Excellence Logo" 
                className="w-32 h-32 mr-3"
                loading="lazy" 
                width="128"
                height="128"
              />
            </Link>
            
            <p className="text-white/75 text-sm leading-relaxed max-w-md">
              Transforming passionate singers into confident performers through immersive, expert-led training in the stunning coastal setting of Limassol, Cyprus.
            </p>
            
            {/* Simplified social icons with proper hover styles */}
            <div className="flex space-x-4 pt-2">
              {socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-outfit text-xs font-semibold mb-4 text-white/50 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  {link.href ? (
                    <Link 
                      to={link.href} 
                      className="text-white/70 hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 rounded-full bg-energy-purple mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  ) : (
                    <button 
                      onClick={link.action}
                      className="text-white/70 hover:text-white transition-colors text-sm text-left flex items-center group"
                    >
                      <span className="w-1 h-1 rounded-full bg-energy-purple mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link 
                to="/apply" 
                className="inline-flex items-center text-sm text-white hover:text-energy-cyan transition-colors"
              >
                <span>Start Your Application</span>
                <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-outfit text-xs font-semibold mb-4 text-white/50 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-energy-pink shrink-0 mt-0.5" />
                <span className="text-white/75 text-sm">Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-energy-pink shrink-0" />
                <a href="mailto:info@vocalexcellence.com" className="text-white/75 hover:text-white transition-colors text-sm">
                  info@vocalexcellence.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-energy-pink shrink-0" />
                <a href="tel:+35725775885" className="text-white/75 hover:text-white transition-colors text-sm">
                  +357 25 775 885
                </a>
              </li>
            </ul>
            
            <div className="mt-7 pt-6 border-t border-white/10 flex flex-col">
              <span className="text-xs text-white/40 mb-1">Sign up for program updates</span>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/5 border border-white/10 rounded-l-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-energy-purple/50"
                  aria-label="Email for updates"
                />
                <button className="bg-energy-purple hover:bg-energy-purple/90 text-white rounded-r-md px-3 py-2 text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-5 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs">&copy; {new Date().getFullYear()} Vocal Excellence Summer Workshop. All rights reserved.</p>
            
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link 
                to="/terms-and-conditions" 
                className="text-white/70 hover:text-white text-xs sm:text-sm flex items-center group transition-colors"
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-energy-purple group-hover:text-energy-pink transition-colors" />
                Terms & Conditions
              </Link>
              
              <Link 
                to="/privacy-policy" 
                className="text-white/70 hover:text-white text-xs sm:text-sm flex items-center group transition-colors"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-energy-purple group-hover:text-energy-pink transition-colors" />
                Privacy Policy
              </Link>
              
              <Link 
                to="/cancellation-policy" 
                className="text-white/70 hover:text-white text-xs sm:text-sm flex items-center group transition-colors"
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-energy-purple group-hover:text-energy-pink transition-colors" />
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
