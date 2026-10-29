import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Heart, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, projectId?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenDonateModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'impact', label: 'Our Impact' },
    { id: 'stories', label: 'Stories' },
    { id: 'blog', label: 'Blog' },
    { id: 'volunteer', label: 'Get Involved' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
          isScrolled ? 'shadow-md border-b border-slate-200/80 py-2.5' : 'border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-12">
            {/* Zone 1: Brand Wordmark & Icon */}
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5 cursor-pointer"
              aria-label="BK Construction Humanity For Habitat NGO Home"
            >
              <Logo size="md" />
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
              {navLinks.map((link) => {
                const isActive =
                  currentView === link.id ||
                  (link.id === 'blog' && currentView.startsWith('blog'));
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#0F2942] font-bold'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action (Desktop) */}
            <div className="hidden lg:flex items-center gap-3.5 shrink-0">
              <button
                onClick={() => handleLinkClick('admin')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                title="Admin Dashboard Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => onOpenDonateModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-98"
              >
                <Heart className="w-4 h-4 fill-white/20 text-white" />
                <span>Donate Now</span>
              </button>
            </div>

            {/* Mobile Menu & Quick Donate Button */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button
                onClick={() => onOpenDonateModal()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#059669] text-white text-xs font-bold rounded-md shadow-sm whitespace-nowrap"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20 text-white" />
                <span>Donate</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  currentView === link.id ||
                  (link.id === 'blog' && currentView.startsWith('blog'));
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left px-3.5 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenDonateModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#059669] text-white font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 text-base"
                >
                  <Heart className="w-5 h-5 fill-white/30 text-white" />
                  <span>Support Humanity — Donate Now</span>
                </button>

                <button
                  onClick={() => handleLinkClick('admin')}
                  className="w-full py-2.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg font-medium flex items-center justify-center gap-2 border border-slate-200"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Staff & Admin Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
