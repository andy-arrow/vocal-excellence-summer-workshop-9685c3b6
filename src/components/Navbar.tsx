
import React, { useState, useEffect } from 'react';
import { Menu, X, Music, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: 'Home', href: '#home', path: '/' },
  { name: 'About', href: '#about', path: '/' },
  { name: 'Program', href: '#curriculum', path: '/' },
  { name: 'Coaches', href: '#instructors', path: '/' },
  { name: 'FAQs', href: '#faq', path: '/' },
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
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-3 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-2 transition-colors",
            scrolled ? "text-primary hover:text-secondary" : "text-white hover:text-white/80"
          )}
        >
          <Music className={cn(
            "w-7 h-7",
            scrolled ? "text-primary" : "text-white"
          )} />
          <span className="text-lg font-outfit font-bold">VocalCrush</span>
          <Star className={cn(
            "w-4 h-4",
            scrolled ? "text-secondary" : "text-energy-yellow",
            "animate-pulse-slow"
          )} />
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
                "text-sm font-medium transition-all duration-300 px-2 py-1 relative",
                scrolled 
                  ? (activeSection === link.href.replace('#', '') && isHomePage 
                    ? "text-secondary" 
                    : "text-foreground hover:text-secondary") 
                  : "text-white hover:text-white/80",
                activeSection === link.href.replace('#', '') && isHomePage 
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded-full"
                  : ""
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            onClick={handleApplyNowClick}
            className={cn(
              "rounded-xl text-white",
              scrolled 
                ? "bg-primary hover:bg-primary/80" 
                : "bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
            )}
            size="sm"
          >
            Apply Now <Sparkles className="ml-1 w-3 h-3" />
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "md:hidden p-2 rounded-md",
                scrolled ? "text-primary" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-gradient-to-br from-energy-purple to-energy-pink text-white w-full sm:max-w-md p-0 flex flex-col border-none"
          >
            <div className="absolute inset-0 bg-subtle-noise opacity-10 pointer-events-none"></div>
            <div className="flex flex-col space-y-6 pt-12 pb-6 px-6 relative z-10">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      "text-lg py-2 text-white hover:text-white/80 transition-colors flex items-center font-medium",
                      activeSection === link.href.replace('#', '') && isHomePage ? "text-white font-bold" : ""
                    )}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg mr-3">
                      <Music className="w-4 h-4" />
                    </span>
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
              <div className="pt-6">
                <SheetClose asChild>
                  <Button
                    onClick={handleApplyNowClick}
                    className="w-full bg-white text-energy-purple hover:bg-white/90 rounded-xl py-6"
                    size="lg"
                  >
                    Apply Now <Sparkles className="ml-2" />
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
