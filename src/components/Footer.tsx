import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto py-16 px-6 md:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-sans text-2xl font-semibold mb-4">Vocal Excellence Summer Programme</h3>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Transforming passionate singers into confident performers through immersive, expert-led training.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/vocalexcellence" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/vocalexcellence" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/vocalexcellence" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com/vocalexcellence" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold mb-4 text-white/50 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="text-white/70 hover:text-white transition-colors text-sm">About the Programme</Link>
              </li>
              <li>
                <Link to="/#curriculum" className="text-white/70 hover:text-white transition-colors text-sm">Curriculum & Schedule</Link>
              </li>
              <li>
                <Link to="/#instructors" className="text-white/70 hover:text-white transition-colors text-sm">Instructors</Link>
              </li>
              <li>
                <Link to="/apply" className="text-white/70 hover:text-white transition-colors text-sm">Apply Now</Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-white/70 hover:text-white transition-colors text-sm">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/70 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold mb-4 text-white/50 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400 shrink-0" />
                <a href="mailto:info@vocalexcellence.com" className="text-white/70 hover:text-white transition-colors text-sm">
                  info@vocalexcellence.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400 shrink-0" />
                <a href="tel:+35725775885" className="text-white/70 hover:text-white transition-colors text-sm">
                  +357 25 775 885
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-white/50 text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Vocal Excellence Summer Programme. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
