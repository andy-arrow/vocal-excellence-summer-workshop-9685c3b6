
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
    <header className="bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 border-b border-violet-500/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          Vocal Excellence
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className={`text-white/90 hover:text-white transition-colors flex items-center gap-2 ${activeSection === 'home' ? 'text-white' : ''}`}
          >
            <Sparkles className="w-4 h-4" />
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, 'about')}
            className={`text-white/90 hover:text-white transition-colors flex items-center gap-2 ${activeSection === 'about' ? 'text-white' : ''}`}
          >
            <Music className="w-4 h-4" />
            About
          </a>
          <a
            href="#curriculum"
            onClick={(e) => handleSmoothScroll(e, 'curriculum')}
            className={`text-white/90 hover:text-white transition-colors flex items-center gap-2 ${activeSection === 'curriculum' ? 'text-white' : ''}`}
          >
            <Calendar className="w-4 h-4" />
            Curriculum
          </a>
          <a
            href="#instructors"
            onClick={(e) => handleSmoothScroll(e, 'instructors')}
            className={`text-white/90 hover:text-white transition-colors flex items-center gap-2 ${activeSection === 'instructors' ? 'text-white' : ''}`}
          >
            <Users className="w-4 h-4" />
            Instructors
          </a>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              `text-white/90 hover:text-white transition-colors ${isActive ? 'text-white' : ''}`
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

        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-slate-900 md:hidden absolute top-full left-0 w-full py-4 px-6 border-b border-violet-500/10">
          <div className="flex flex-col gap-4">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, 'home')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
            >
              <Music className="w-4 h-4" />
              About
            </a>
            <a
              href="#curriculum"
              onClick={(e) => handleSmoothScroll(e, 'curriculum')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Curriculum
            </a>
            <a
              href="#instructors"
              onClick={(e) => handleSmoothScroll(e, 'instructors')}
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Instructors
            </a>
            <NavLink
              to="/apply"
              className="text-white/90 hover:text-white transition-colors block"
              onClick={toggleMenu}
            >
              Apply Now
            </NavLink>
            <AuthButtonsPlaceholder />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
