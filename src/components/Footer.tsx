import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Heart, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (view: string) => void;
  onOpenDonateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenDonateModal,
}) => {
  const handleNav = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1E32] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column Grid matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Organization */}
          <div className="space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <Logo variant="dark" size="md" />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We don&apos;t just build houses, we build futures. Dedicated to community empowerment across Ghana and international partnership via clean water, vocational construction trades, and girl child education.
            </p>
            {/* Social media links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.socialUrls.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0284C7] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="BK Construction on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialUrls.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0EA5E9] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="BK Construction on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socialUrls.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="BK Construction on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialUrls.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="BK Construction on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('impact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('volunteer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Volunteer & Partner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDonateModal()}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Heart className="w-3 h-3 fill-emerald-400/30" />
                  <span>Donate Today</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-[11px]"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact - Ghana */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">
              Contact — Ghana
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.ghanaOffice.city}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${settings.ghanaOffice.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.ghanaOffice.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${settings.ghanaOffice.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {settings.ghanaOffice.email}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={`https://wa.me/${settings.ghanaOffice.whatsapp}?text=Hello%20BK%20Construction%20NGO`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 rounded-md hover:bg-emerald-900/60 transition-colors text-[11px]"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact - USA */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">
              Contact — USA
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{settings.usaOffice.city}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${settings.usaOffice.phone.replace(/[^\d+]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.usaOffice.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${settings.usaOffice.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {settings.usaOffice.email}
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Liaison office coordinating international technical assistance, diaspora contributions, and corporate partnerships.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            &copy; 2026 BK CONSTRUCTION HUMANITY FOR HABITAT NGO. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => handleNav('legal-privacy')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNav('legal-terms')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNav('legal-refund')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Donation & Refund Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNav('legal-transparency')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Transparency
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
