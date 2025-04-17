
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, Menu, Music, Users, Calendar, Sparkles } from 'lucide-react';
import AuthButtons from '@/components/AuthButtons';
import AuthButtonsPlaceholder from './AuthButtonsPlaceholder';

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-violet-500/15 shadow-sm shadow-violet-500/5">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-outfit font-bold text-white tracking-tight hover:text-energy-purple/90 transition-colors"
        >
          Vocal Excellence Summer Workshop
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'home' ? 'text-white' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, 'about')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'about' ? 'text-white' : ''}`}
          >
            <Music className="w-3.5 h-3.5" />
            About
          </a>
          <a
            href="#curriculum"
            onClick={(e) => handleSmoothScroll(e, 'curriculum')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'curriculum' ? 'text-white' : ''}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Curriculum
          </a>
          <a
            href="#instructors"
            onClick={(e) => handleSmoothScroll(e, 'instructors')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'instructors' ? 'text-white' : ''}`}
          >
            <Users className="w-3.5 h-3.5" />
            Instructors
          </a>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              `text-white/85 hover:text-white transition-colors text-sm font-medium ${isActive ? 'text-white' : ''}`
            }
          >
            Apply Now
          </NavLink>
          
          {(() => {
            try {
              return <AuthButtons />;
            } catch (error) {
              return <AuthButtonsPlaceholder />;
            }
          })()}
        </div>

        <button 
          onClick={toggleMenu} 
          className="md:hidden text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu with improved spacing and transitions */}
      {isMenuOpen && (
        <div className="bg-slate-900/95 backdrop-blur-lg md:hidden absolute top-full left-0 w-full py-5 px-6 border-b border-violet-500/15 shadow-lg shadow-black/10 animate-fade-in">
          <div className="flex flex-col gap-5">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, 'home')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-1.5"
            >
              <Music className="w-4 h-4" />
              About
            </a>
            <a
              href="#curriculum"
              onClick={(e) => handleSmoothScroll(e, 'curriculum')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-1.5"
            >
              <Calendar className="w-4 h-4" />
              Curriculum
            </a>
            <a
              href="#instructors"
              onClick={(e) => handleSmoothScroll(e, 'instructors')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-1.5"
            >
              <Users className="w-4 h-4" />
              Instructors
            </a>
            <NavLink
              to="/apply"
              className="text-white/90 hover:text-white transition-colors block py-1.5"
              onClick={toggleMenu}
            >
              Apply Now
            </NavLink>
            <div className="pt-2 mt-2 border-t border-white/10">
              <AuthButtonsPlaceholder />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
