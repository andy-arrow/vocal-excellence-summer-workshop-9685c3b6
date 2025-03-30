
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home', path: '/' },
  { name: 'About', href: '#about', path: '/' },
  { name: 'Curriculum', href: '#curriculum', path: '/' },
  { name: 'Instructors', href: '#instructors', path: '/' },
  { name: 'Testimonials', href: '#testimonials', path: '/' },
  { name: 'FAQ', href: '#faq', path: '/' },
  { name: 'Contact', href: '#contact', path: '/' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id');

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight &&
            sectionId
          ) {
            setActiveSection(sectionId);
          }
        });
      }

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId.replace('#', ''));
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "py-2 bg-white/90 backdrop-blur-md shadow-sm" 
          : "py-3 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className={cn(
            "flex items-center transition-colors",
            scrolled ? "text-apple-dark hover:text-apple-blue" : "text-white hover:text-white/80"
          )}
        >
          <span className="text-base font-sans font-medium">Vocal Excellence</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection(link.href);
                }
              }}
              className={cn(
                "text-xs font-medium transition-colors",
                scrolled 
                  ? (activeSection === link.href.replace('#', '') && isHomePage ? "text-apple-blue" : "text-apple-dark hover:text-apple-blue") 
                  : "text-white hover:text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/apply" 
            className="ml-3 primary-button text-xs py-2 px-4"
          >
            Apply Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden",
            scrolled ? "text-apple-dark" : "text-white"
          )}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Updated with black background and white text */}
      <nav
        className={cn(
          "fixed inset-0 bg-black text-white z-40 pt-20 pb-6 px-6 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Exit Button - Added for mobile nav */}
        <button
          className="absolute top-6 right-6 bg-black text-white p-2 border border-white/20 rounded-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-base py-1 text-white/90 hover:text-white transition-colors",
                activeSection === link.href.replace('#', '') && isHomePage ? "text-white font-medium" : ""
              )}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection(link.href);
                }
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/apply" 
            className="mt-2 border border-white text-white hover:bg-white hover:text-black transition-colors py-3 px-6 text-center text-sm font-medium tracking-wider uppercase"
            onClick={() => setIsMenuOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
