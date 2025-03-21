
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Curriculum', href: '#curriculum' },
  { name: 'Instructors', href: '#instructors' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.replace('#', ''));
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
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
        <a 
          href="#home" 
          className={cn(
            "flex items-center transition-colors",
            scrolled ? "text-apple-dark hover:text-apple-blue" : "text-white hover:text-white/80"
          )}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#home');
          }}
        >
          <span className="text-base font-sans font-medium">Vocal Excellence</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-xs font-medium transition-colors",
                scrolled 
                  ? (activeSection === link.href.replace('#', '') ? "text-apple-blue" : "text-apple-dark hover:text-apple-blue") 
                  : "text-white hover:text-white/80"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#apply" 
            className="ml-3 primary-button text-xs py-2 px-4"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#apply');
            }}
          >
            Apply Now
          </a>
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

      {/* Mobile Navigation */}
      <nav
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 pb-6 px-6 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-base py-1 hover:text-apple-blue transition-colors",
                activeSection === link.href.replace('#', '') ? "text-apple-blue font-medium" : "text-apple-dark"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#apply" 
            className="mt-2 primary-button text-center"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#apply');
            }}
          >
            Apply Now
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
