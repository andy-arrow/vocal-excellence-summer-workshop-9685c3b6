
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AuthButtons from '@/components/AuthButtons';
import AuthButtonsPlaceholder from './AuthButtonsPlaceholder';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'summer-programme', label: 'Summer Programme', href: '/summer-programme' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-energy-purple/10" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-outfit text-energy-purple tracking-tight transition-all hover:opacity-80"
          aria-label="Vocal Excellence - Home"
        >
          <motion.div 
            className="flex items-center" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/lovable-uploads/e980c9b0-8cdc-423d-a726-2f677be33737.png" 
              alt="Vocal Excellence Logo" 
              className="w-14 h-14 mr-3" 
            />
          </motion.div>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <Link
                    to={link.href}
                    className={cn(
                      "relative py-2 px-4 text-sm font-medium rounded-lg transition-colors",
                      location.pathname === link.href 
                        ? "text-energy-purple bg-energy-purple/5" 
                        : "text-slate-600 hover:text-energy-purple hover:bg-energy-purple/5"
                    )}
                    onMouseEnter={() => setHovered(link.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="relative z-10 flex items-center">
                      {link.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                    className={cn(
                      "relative py-2 px-4 text-sm font-medium rounded-lg transition-colors",
                      activeSection === link.id 
                        ? "text-energy-purple bg-energy-purple/5" 
                        : "text-slate-600 hover:text-energy-purple hover:bg-energy-purple/5"
                    )}
                    onMouseEnter={() => setHovered(link.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="relative z-10 flex items-center">
                      {link.label}
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/apply"
            className={({ isActive }) => cn(
              "group px-5 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all",
              isActive 
                ? "bg-energy-purple text-white shadow-lg shadow-energy-purple/20" 
                : "bg-white text-energy-purple border border-energy-purple/30 hover:bg-energy-purple/5"
            )}
          >
            <span>Apply Now</span>
            <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </NavLink>
          
          {(() => {
            try {
              return <AuthButtons />;
            } catch (error) {
              return <AuthButtonsPlaceholder />;
            }
          })()}
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 text-energy-purple rounded-lg hover:bg-energy-purple/5 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full max-w-full p-0 border-none bg-white"
          >
            <div className="px-6 py-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <Link 
                  to="/" 
                  className="font-outfit text-energy-purple tracking-tight transition-opacity hover:opacity-80"
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/e980c9b0-8cdc-423d-a726-2f677be33737.png" 
                      alt="Vocal Excellence Logo" 
                      className="w-12 h-12 mr-3" 
                    />
                  </div>
                </Link>
                <SheetClose className="rounded-lg w-10 h-10 flex items-center justify-center hover:bg-energy-purple/5 text-energy-purple">
                  <X size={18} />
                </SheetClose>
              </div>
              
              <nav className="flex-1">
                <ul className="space-y-1">
                  {navLinks.map((link, idx) => (
                    <motion.li 
                      key={link.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.06 }}
                      className="overflow-hidden"
                    >
                      <SheetClose asChild>
                        {link.href ? (
                          <Link
                            to={link.href}
                            className={cn(
                              "block py-3 px-4 text-base font-medium transition-colors rounded-xl relative overflow-hidden group",
                              location.pathname === link.href 
                                ? "text-energy-purple bg-energy-purple/5" 
                                : "text-slate-700 hover:text-energy-purple hover:bg-energy-purple/5"
                            )}
                          >
                            <span className="relative z-10 flex items-center">
                              {link.label}
                              <ArrowUpRight className="ml-2 w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                          </Link>
                        ) : (
                          <a
                            href={`#${link.id}`}
                            onClick={(e) => handleSmoothScroll(e, link.id)}
                            className={cn(
                              "block py-3 px-4 text-base font-medium transition-colors rounded-xl relative overflow-hidden group",
                              activeSection === link.id 
                                ? "text-energy-purple bg-energy-purple/5" 
                                : "text-slate-700 hover:text-energy-purple hover:bg-energy-purple/5"
                            )}
                          >
                            <span className="relative z-10 flex items-center">
                              {link.label}
                              <ArrowUpRight className="ml-2 w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                          </a>
                        )}
                      </SheetClose>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <SheetClose asChild>
                  <NavLink
                    to="/apply"
                    className="w-full py-3.5 flex justify-center items-center bg-energy-purple text-white rounded-xl text-base font-medium shadow-lg shadow-energy-purple/20 hover:shadow-xl hover:shadow-energy-purple/30 transition-all"
                  >
                    Apply Now
                    <ArrowUpRight size={16} className="ml-2 opacity-70" />
                  </NavLink>
                </SheetClose>
              </motion.div>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4 flex justify-center"
              >
                <AuthButtonsPlaceholder />
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
