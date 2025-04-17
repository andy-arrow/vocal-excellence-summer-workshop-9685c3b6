
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Music, ChevronDown } from 'lucide-react';
import AuthButtons from '@/components/AuthButtons';
import AuthButtonsPlaceholder from './AuthButtonsPlaceholder';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructors', label: 'Instructors' },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "backdrop-blur-md border-b border-white/10" 
          : "backdrop-blur-sm"
      )}
      style={{
        backgroundColor: scrolled ? 'rgba(22, 22, 23, 0.8)' : 'rgba(22, 22, 23, 0.5)'
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-outfit font-medium text-white tracking-tight transition-opacity hover:opacity-80"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-energy-purple to-energy-pink flex items-center justify-center mr-3">
              <Music className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-medium md:text-xl">Vocal Excellence</span>
              <span className="hidden md:block text-xs opacity-80 -mt-1">Summer Workshop</span>
            </div>
          </div>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors",
                    activeSection === link.id ? "text-white" : "text-white/75 hover:text-white"
                  )}
                >
                  {link.label}
                  {(activeSection === link.id || hovered === link.id) && (
                    <motion.div
                      className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-white/60"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/apply"
            className={({ isActive }) => cn(
              "group px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-1.5 transition-all",
              isActive 
                ? "bg-white text-slate-900" 
                : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
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

        {/* Mobile Navigation with Sheet component */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full max-w-full p-0 border-none bg-slate-900/95 text-white backdrop-blur-md"
          >
            <div className="px-6 py-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <Link 
                  to="/" 
                  className="font-outfit font-medium text-white tracking-tight transition-opacity hover:opacity-80"
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-energy-purple to-energy-pink flex items-center justify-center mr-3">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-lg font-medium">Vocal Excellence</span>
                      <span className="block text-xs opacity-80 -mt-1">Summer Workshop</span>
                    </div>
                  </div>
                </Link>
                <SheetClose className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/10">
                  <X size={18} />
                </SheetClose>
              </div>
              
              <nav className="flex-1">
                <ul className="space-y-5">
                  {navLinks.map((link, idx) => (
                    <motion.li 
                      key={link.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.06 }}
                    >
                      <SheetClose asChild>
                        <a
                          href={`#${link.id}`}
                          onClick={(e) => handleSmoothScroll(e, link.id)}
                          className={cn(
                            "block py-2 text-xl font-medium transition-colors relative overflow-hidden group",
                            activeSection === link.id ? "text-white" : "text-white/70 hover:text-white"
                          )}
                        >
                          <span className="relative z-10 flex items-center">
                            {link.label}
                            <motion.div
                              initial={{ x: -4, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                            >
                              <ArrowUpRight className="ml-1 w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </motion.div>
                          </span>
                          {activeSection === link.id && (
                            <motion.div 
                              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-energy-purple to-energy-pink"
                              initial={{ width: 0 }}
                              animate={{ width: '30%' }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            />
                          )}
                        </a>
                      </SheetClose>
                      <Separator className="mt-2 bg-white/10" />
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
                    className="w-full py-3.5 flex justify-center items-center bg-white text-slate-900 rounded-xl text-base font-medium"
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
