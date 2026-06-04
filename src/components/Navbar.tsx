import { useState, useEffect } from 'react';
import { Menu, X, Landmark, Compass, HelpCircle, Briefcase, Users, Handshake } from 'lucide-react';

interface NavbarProps {
  onOpenMitra: () => void;
  onScrollToSearch: () => void;
}

export default function Navbar({ onOpenMitra, onScrollToSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur shadow-md py-3'
          : 'bg-warm-beige/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand / Branding */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-coffee-brown flex items-center justify-center shadow-md shadow-coffee-brown/25 group-hover:scale-105 transition-transform">
              <Landmark className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <div className="font-display font-extrabold text-lg text-dark-gray leading-none flex items-center gap-1">
                We <span className="text-coffee-brown">Work</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-dark-gray/60 leading-none">
                Open Office Space
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-dark-gray/80">
            <button
              onClick={() => scrollToSection('cara-kerja')}
              className="hover:text-coffee-brown transition-colors cursor-pointer"
            >
              Cara Kerja
            </button>
            <button
              onClick={() => scrollToSection('cari-workspace')}
              className="hover:text-coffee-brown transition-colors cursor-pointer"
            >
              Cari Workspace
            </button>
            <button
              onClick={() => scrollToSection('mengapa-memilih')}
              className="hover:text-coffee-brown transition-colors cursor-pointer"
            >
              Keunggulan
            </button>
            <button
              onClick={() => scrollToSection('kemitraan')}
              className="hover:text-coffee-brown transition-colors cursor-pointer"
            >
              Peluang Kemitraan
            </button>
            <button
              onClick={() => scrollToSection('komunitas')}
              className="hover:text-coffee-brown transition-colors cursor-pointer"
            >
              Komunitas
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-coffee-brown transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-btn-cari"
              onClick={onScrollToSearch}
              className="px-4 py-2 text-xs font-bold text-coffee-brown bg-coffee-brown/10 hover:bg-coffee-brown/15 rounded-lg transition-colors cursor-pointer"
            >
              Cari Workspace
            </button>
            <button
              id="nav-btn-mitra"
              onClick={onOpenMitra}
              className="px-4 py-2 text-xs font-bold text-white bg-coffee-brown hover:bg-coffee-dark rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Jadi Mitra
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-md text-dark-gray hover:text-coffee-brown focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-warm-beige/60 shadow-lg absolute top-full left-0 right-0 py-4 px-6 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-3 text-sm font-semibold text-dark-gray/90">
            <button
              onClick={() => scrollToSection('cara-kerja')}
              className="flex items-center gap-2.5 py-1.5 hover:text-coffee-brown transition-colors text-left"
            >
              <Compass className="w-4 h-4 text-coffee-light" /> Cara Kerja
            </button>
            <button
              onClick={() => scrollToSection('cari-workspace')}
              className="flex items-center gap-2.5 py-1.5 hover:text-coffee-brown transition-colors text-left"
            >
              <Briefcase className="w-4 h-4 text-coffee-light" /> Cari Workspace
            </button>
            <button
              onClick={() => scrollToSection('mengapa-memilih')}
              className="flex items-center gap-2.5 py-1.5 hover:text-coffee-brown transition-colors text-left"
            >
              <Users className="w-4 h-4 text-coffee-light" /> Keunggulan
            </button>
            <button
              onClick={() => scrollToSection('kemitraan')}
              className="flex items-center gap-2.5 py-1.5 hover:text-coffee-brown transition-colors text-left"
            >
              <Handshake className="w-4 h-4 text-coffee-light" /> Peluang Kemitraan
            </button>
            <button
              onClick={() => scrollToSection('komunitas')}
              className="flex items-center gap-2.5 py-1.5 hover:text-coffee-brown transition-colors text-left"
            >
              <Users className="w-4 h-4 text-coffee-light" /> Komunitas & Networking
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="flex items-center gap-2.5 py-1.5 hover:text-coffee-brown transition-colors text-left"
            >
              <HelpCircle className="w-4 h-4 text-coffee-light" /> FAQ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-warm-beige">
            <button
              id="nav-mobile-btn-cari"
              onClick={() => {
                setIsOpen(false);
                onScrollToSearch();
              }}
              className="w-full text-center py-2 bg-coffee-brown/5 hover:bg-coffee-brown/10 text-coffee-brown text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Cari Workspace
            </button>
            <button
              id="nav-mobile-btn-mitra"
              onClick={() => {
                setIsOpen(false);
                onOpenMitra();
              }}
              className="w-full text-center py-2 bg-coffee-brown hover:bg-coffee-dark text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Jadi Mitra
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
