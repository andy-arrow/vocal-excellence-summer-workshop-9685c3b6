
import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface NavbarProps {
  activeSection?: string;
}

interface NavLinkItem {
  id?: string;
  href?: string;
  label: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Separate threshold: show nav CTA only after scrolling past the hero (~500px).
  // This prevents the duplicate-button problem on the home page above the fold.
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setPastHero(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks: NavLinkItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructors', label: 'Instructors' },
  ];

  const isLandingPage = location.pathname === '/';
  const visibleNavLinks = isLandingPage ? [] : navLinks;

  // Nav CTA is visible when:
  // - on any page other than home (hero CTA not present), OR
  // - on the home page after scrolling past the hero (hero CTA has left viewport)
  const showNavCta = !isLandingPage || pastHero;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-apple-border shadow-sm"
          : "bg-apple-light/90 backdrop-blur-md"
      )}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-4">

        {        /*
         * Logo is 518×481px — nearly square (1.08:1 ratio).
         * At h-40 (160px) the rendered width is ~172px, giving each text layer
         * inside the mark ample height (~48px) to be clearly legible.
         * Navbar total height: 160px logo + 16px vertical padding = 176px.
         */}
        <Link
          to="/"
          className="transition-opacity hover:opacity-80 flex-shrink-0"
          aria-label="Vocal Excellence – Home"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/branding/logo.png"
              alt="Vocal Excellence Logo"
              className="h-40 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop nav links (non-home pages only) */}
        {visibleNavLinks.length > 0 && (
          <nav className="hidden md:flex items-center flex-grow justify-center">
            <ul className="flex space-x-2 items-center">
              {visibleNavLinks.map((link) => (
                <li key={link.id || link.href}>
                  {link.href ? (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) => cn(
                        "relative py-2 px-3 text-sm font-medium transition-colors duration-300 hover:text-apple-blue",
                        isActive ? "text-apple-blue" : "text-apple-text"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </NavLink>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleSmoothScroll(e, link.id!)}
                      className={cn(
                        "relative py-2 px-3 text-sm font-medium transition-colors duration-300 hover:text-apple-blue",
                        activeSection === link.id ? "text-apple-blue" : "text-apple-text"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Desktop CTA — hidden on home page until user scrolls past the hero */}
        <div className="hidden md:flex items-center">
          <AnimatePresence>
            {showNavCta && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <NavLink
                  to="/apply"
                  className={({ isActive }) => cn(
                    "group px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-1.5",
                    "uppercase tracking-wide transition-all duration-300",
                    isActive
                      ? "bg-apple-blue text-white"
                      : "bg-apple-blue text-white hover:bg-apple-blue-hover"
                  )}
                >
                  <span>Request Your Place</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile hamburger */}
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
            className="w-[100vw] max-w-full p-0 border-none bg-white/[0.985] backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-6 h-full flex flex-col">

              {/* Mobile drawer header */}
              <div className="flex items-center justify-between pb-2 border-b border-apple-border">
                <Link
                  to="/"
                  className="transition-opacity hover:opacity-80"
                  onClick={closeMenu}
                >
                  <img
                    src="/images/branding/logo.png"
                    alt="Vocal Excellence Logo"
                    className="h-40 w-auto"
                  />
                </Link>
                <SheetClose className={cn(
                  "rounded-lg w-10 h-10 flex items-center justify-center",
                  "text-apple-text hover:bg-apple-light/80 active:bg-apple-light",
                  "transition-all duration-300"
                )}>
                  <X className="w-5 h-5" />
                </SheetClose>
              </div>

              {/* Mobile nav links */}
              <nav className="flex-1 -mx-6">
                <ul className="space-y-[2px] px-2">
                  {visibleNavLinks.map((link, idx) => (
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

              {/* Mobile CTA — always present in the drawer (user opened it deliberately) */}
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
                      "w-full py-3.5 flex justify-center items-center gap-1.5",
                      "bg-apple-blue text-white rounded-full",
                      "text-[17px] font-semibold uppercase tracking-wide",
                      "transition-colors duration-200 hover:bg-apple-blue-hover"
                    )}
                  >
                    Request Your Place
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </NavLink>
                </SheetClose>
              </motion.div>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
