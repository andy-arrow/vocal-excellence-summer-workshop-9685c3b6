
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    setOpen(false);
  };

  const handleApplyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/apply');
    window.scrollTo(0, 0);
    setOpen(false);
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
          <a 
            href="/apply" 
            onClick={handleApplyNowClick}
            className="ml-3 primary-button text-xs py-2 px-4"
          >
            Apply Now
          </a>
        </nav>

        {/* Mobile Menu - Using Sheet component for improved reliability */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "md:hidden p-2 rounded-md",
                scrolled ? "text-apple-dark" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-black text-white w-full sm:max-w-md p-0 flex flex-col"
          >
            <div className="flex flex-col space-y-6 pt-6 pb-6 px-6">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      "text-base py-2 text-white/90 hover:text-white transition-colors",
                      activeSection === link.href.replace('#', '') && isHomePage ? "text-white font-medium" : ""
                    )}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a 
                  href="/apply"
                  onClick={handleApplyNowClick}
                  className="mt-2 border border-white text-white hover:bg-white hover:text-black transition-colors py-3 px-6 text-center text-sm font-medium tracking-wider uppercase"
                >
                  Apply Now
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
