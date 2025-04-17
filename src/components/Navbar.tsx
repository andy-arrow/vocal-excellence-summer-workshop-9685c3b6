
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

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 border-b border-violet-500/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          Vocal Excellence
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/#home"
            className={({ isActive }) =>
              `text-white/90 hover:text-white transition-colors flex items-center gap-2 ${isActive || activeSection === 'home' ? 'text-white' : ''}`
            }
          >
            <Sparkles className="w-4 h-4" />
            Home
          </NavLink>
          <NavLink
            to="/#about"
            className={({ isActive }) =>
              `text-white/90 hover:text-white transition-colors flex items-center gap-2 ${isActive || activeSection === 'about' ? 'text-white' : ''}`
            }
          >
            <Music className="w-4 h-4" />
            About
          </NavLink>
          <NavLink
            to="/#curriculum"
            className={({ isActive }) =>
              `text-white/90 hover:text-white transition-colors flex items-center gap-2 ${isActive || activeSection === 'curriculum' ? 'text-white' : ''}`
            }
          >
            <Calendar className="w-4 h-4" />
            Curriculum
          </NavLink>
          <NavLink
            to="/#instructors"
            className={({ isActive }) =>
              `text-white/90 hover:text-white transition-colors flex items-center gap-2 ${isActive || activeSection === 'instructors' ? 'text-white' : ''}`
            }
          >
            <Users className="w-4 h-4" />
            Instructors
          </NavLink>
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
            <NavLink
              to="/#home"
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Sparkles className="w-4 h-4" />
              Home
            </NavLink>
            <NavLink
              to="/#about"
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Music className="w-4 h-4" />
              About
            </NavLink>
            <NavLink
              to="/#curriculum"
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Calendar className="w-4 h-4" />
              Curriculum
            </NavLink>
            <NavLink
              to="/#instructors"
              className="text-white/90 hover:text-white transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Users className="w-4 h-4" />
              Instructors
            </NavLink>
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
