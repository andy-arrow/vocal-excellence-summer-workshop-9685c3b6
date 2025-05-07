import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ChevronUp } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AuthButtons from '@/components/AuthButtons';
import AuthButtonsPlaceholder from './AuthButtonsPlaceholder';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavbarScroll } from '@/hooks/use-navbar-scroll';

interface NavbarProps {
  activeSection?: string;
}

interface NavLink {
  id?: string;
  label: string;
  href?: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { visible, scrollPosition } = useNavbarScroll();
  
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
  
  // Show the scroll-to-top button after scrolling down a bit
  React.useEffect(() => {
    setShowScrollToTop(scrollPosition > 300);
  }, [scrollPosition]);
  
  // Handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructors', label: 'Instructors' },
    { href: '/tuition', label: 'Tuition' },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          visible ? "translate-y-0" : "-translate-y-full",
          scrollPosition > 10 
            ? "bg-white/95 backdrop-blur-md border-b border-apple-border" 
            : "bg-apple-light/90 backdrop-blur-md"
        )}
        style={{ height: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link 
            to="/" 
            className="font-sans text-apple-text tracking-tight transition-all hover:opacity-80 flex-shrink-0"
            aria-label="Vocal Excellence - Home"
          >
            <motion.div 
              className="flex items-center" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/lovable-uploads/9994f82c-80e4-477a-b629-3bef5ef8f2c1.png" 
                alt="Vocal Excellence Logo" 
                className="w-48 h-48 mr-3" 
              />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center flex-grow justify-center">
            <ul className="flex space-x-2 items-center">
              {navLinks.map((link) => (
                <li key={link.id || link.href}>
                  {link.href ? (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) => cn(
                        "relative py-2 px-3 text-sm font-medium transition-colors duration-300",
                        "hover:text-apple-blue",
                        isActive ? "text-apple-blue" : "text-apple-text"
                      )}
                    >
                      <span className="relative z-10">
                        {link.label}
                      </span>
                    </NavLink>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleSmoothScroll(e, link.id!)}
                      className={cn(
                        "relative py-2 px-3 text-sm font-medium transition-colors duration-300",
                        "hover:text-apple-blue",
                        activeSection === link.id ? "text-apple-blue" : "text-apple-text"
                      )}
                    >
                      <span className="relative z-10">
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
                "group px-4 py-1 text-sm font-medium rounded-full flex items-center gap-1.5 transition-all duration-300",
                isActive 
                  ? "bg-apple-blue text-white" 
                  : "bg-apple-light text-apple-blue hover:bg-apple-light-hover"
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
                className={cn(
                  "md:hidden w-10 h-10 flex items-center justify-center rounded-lg",
                  "text-apple-text hover:bg-apple-light/80 active:bg-apple-light",
                  "transition-all duration-300"
                )}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent 
              side="left"
              className={cn(
                "w-[100vw] max-w-full p-0 border-none",
                "bg-white/[0.985] backdrop-blur-xl"
              )}
            >
              <div className="px-6 py-4 space-y-6 h-full flex flex-col">
                <div className="flex items-center justify-between pb-2 border-b border-apple-border">
                  <Link 
                    to="/" 
                    className="font-sans text-apple-text tracking-tight transition-opacity hover:opacity-80"
                    onClick={closeMenu}
                  >
                    <div className="flex items-center">
                      <img 
                        src="/lovable-uploads/9994f82c-80e4-477a-b629-3bef5ef8f2c1.png" 
                        alt="Vocal Excellence Logo" 
                        className="w-32 h-32" 
                      />
                    </div>
                  </Link>
                  <SheetClose className={cn(
                    "rounded-lg w-10 h-10 flex items-center justify-center",
                    "text-apple-text hover:bg-apple-light/80 active:bg-apple-light",
                    "transition-all duration-300"
                  )}>
                    <X className="w-5 h-5" />
                  </SheetClose>
                </div>
                
                <nav className="flex-1 -mx-6">
                  <ul className="space-y-[2px] px-2">
                    {navLinks.map((link, idx) => (
                      <motion.li 
                        key={link.id || link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                      >
                        <SheetClose asChild>
                          {link.href ? (
                            <Link
                              to={link.href}
                              className={cn(
                                "flex items-center justify-between py-3 px-4",
                                "text-[17px] font-normal text-apple-text",
                                "rounded-xl transition-colors duration-200",
                                "hover:bg-apple-light active:bg-apple-light-hover",
                                location.pathname === link.href && "text-apple-blue"
                              )}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-60" />
                            </Link>
                          ) : (
                            <a
                              href={`#${link.id}`}
                              onClick={(e) => handleSmoothScroll(e, link.id!)}
                              className={cn(
                                "flex items-center justify-between py-3 px-4",
                                "text-[17px] font-normal text-apple-text",
                                "rounded-xl transition-colors duration-200",
                                "hover:bg-apple-light active:bg-apple-light-hover",
                                activeSection === link.id && "text-apple-blue"
                              )}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-60" />
                            </a>
                          )}
                        </SheetClose>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 space-y-4"
                >
                  <SheetClose asChild>
                    <NavLink
                      to="/apply"
                      className={cn(
                        "w-full py-3 flex justify-center items-center",
                        "bg-apple-blue text-white rounded-full",
                        "text-[17px] font-normal",
                        "transition-colors duration-200",
                        "hover:bg-apple-blue-hover"
                      )}
                    >
                      Apply Now
                      <ArrowUpRight className="ml-1 w-4 h-4 opacity-70" />
                    </NavLink>
                  </SheetClose>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                  >
                    <AuthButtonsPlaceholder />
                  </motion.div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Float-to-top button that appears when navbar is hidden */}
      <AnimatePresence>
        {(!visible && showScrollToTop) && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-apple-blue/90 text-white shadow-md backdrop-blur-sm hover:bg-apple-blue transition-all"
            aria-label="Scroll to top and show menu"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
