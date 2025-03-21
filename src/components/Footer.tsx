import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-apple-dark text-white">
      <div className="max-w-6xl mx-auto py-16 px-6 md:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-sans text-2xl font-semibold mb-4">Vocal Excellence</h3>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Transforming passionate singers into confident performers through immersive, expert-led training.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold mb-4 text-white/50 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/70 hover:text-white transition-colors text-sm">Home</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors text-sm">About the Programme</a>
              </li>
              <li>
                <a href="#curriculum" className="text-white/70 hover:text-white transition-colors text-sm">Curriculum & Schedule</a>
              </li>
              <li>
                <a href="#instructors" className="text-white/70 hover:text-white transition-colors text-sm">Instructors</a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-white transition-colors text-sm">Testimonials</a>
              </li>
              <li>
                <a href="#apply" className="text-white/70 hover:text-white transition-colors text-sm">Apply Now</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold mb-4 text-white/50 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Student Resources</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Scholarships</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Blog</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold mb-4 text-white/50 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-apple-blue shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Royal Conservatory Building, 123 Music Lane, London, UK</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-apple-blue shrink-0" />
                <a href="mailto:info@vocalexcellence.academy" className="text-white/70 hover:text-white transition-colors text-sm">
                  info@vocalexcellence.academy
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-apple-blue shrink-0" />
                <a href="tel:+441234567890" className="text-white/70 hover:text-white transition-colors text-sm">
                  +44 (0) 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-white/50 text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Vocal Excellence Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
