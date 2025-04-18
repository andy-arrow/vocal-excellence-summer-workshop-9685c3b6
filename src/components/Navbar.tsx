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

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'summer-programme', label: 'Summer Programme', href: '/summer-programme' },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-energy-purple/10 backdrop-blur-md border-b border-energy-purple/10 shadow-sm" 
          : "bg-energy-purple/5 backdrop-blur-sm"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-outfit font-medium text-slate-900 tracking-tight transition-all hover:opacity-80"
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
              className="w-20 h-20 mr-3" 
            />
          </motion.div>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <Link
                    to={link.href}
                    className={cn(
                      "relative py-1 text-sm font-medium transition-colors",
                      location.pathname === link.href ? "text-energy-purple" : "text-slate-800 hover:text-energy-purple"
                    )}
                    onMouseEnter={() => setHovered(link.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {link.label}
                    {(location.pathname === link.href || hovered === link.id) && (
                      <motion.div
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-energy-purple"
                        layoutId="navUnderline"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      />
                    )}
                  </Link>
                ) : (
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                    onMouseEnter={() => setHovered(link.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "relative py-1 text-sm font-medium transition-colors",
                      activeSection === link.id ? "text-energy-purple" : "text-slate-800 hover:text-energy-purple"
                    )}
                  >
                    {link.label}
                    {(activeSection === link.id || hovered === link.id) && (
                      <motion.div
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-energy-purple"
                        layoutId="navUnderline"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      />
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/apply"
            className={({ isActive }) => cn(
              "group px-5 py-2 text-sm font-medium rounded-full flex items-center gap-1.5 transition-all shadow-sm hover:shadow",
              isActive 
                ? "bg-energy-purple text-white" 
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
              className="md:hidden flex items-center justify-center w-10 h-10 text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full max-w-full p-0 border-none bg-white text-slate-900"
          >
            <div className="px-6 py-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <Link 
                  to="/" 
                  className="font-outfit font-medium text-slate-900 tracking-tight transition-opacity hover:opacity-80"
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/e980c9b0-8cdc-423d-a726-2f677be33737.png" 
                      alt="Vocal Excellence Logo" 
                      className="w-16 h-16 mr-3" 
                    />
                    <div>
                      <span className="text-lg font-medium">Vocal Excellence</span>
                      <span className="block text-xs text-slate-500 -mt-1">Summer Workshop</span>
                    </div>
                  </div>
                </Link>
                <SheetClose className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-100">
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
                      transition={{ delay: 0.1 + idx * 0.06, duration: 0.5, ease: "easeOut" }}
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
                                : "text-slate-800 hover:text-energy-purple hover:bg-slate-50"
                            )}
                          >
                            <span className="relative z-10 flex items-center">
                              {link.label}
                              <motion.div
                                initial={{ x: -4, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + idx * 0.05 }}
                              >
                                <ArrowUpRight className="ml-2 w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </motion.div>
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
                                : "text-slate-800 hover:text-energy-purple hover:bg-slate-50"
                            )}
                          >
                            <span className="relative z-10 flex items-center">
                              {link.label}
                              <motion.div
                                initial={{ x: -4, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + idx * 0.05 }}
                              >
                                <ArrowUpRight className="ml-2 w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </motion.div>
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
                transition={{ delay: 0.4, duration: 0.5 }}
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
                transition={{ delay: 0.5, duration: 0.5 }}
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
