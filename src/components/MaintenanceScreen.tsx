import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Lock, ShieldAlert, KeyRound, Building2, Phone, Mail, MapPin, ExternalLink, CheckCircle } from 'lucide-react';

interface MaintenanceScreenProps {
  settings: SiteSettings;
  onUnlock: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({ settings, onUnlock }) => {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const correctCode = settings.maintenancePasscode || 'admin@2024';
    
    // Accepts strictly the configured staff authorization passkey
    if (passcode.trim() === correctCode) {
      sessionStorage.setItem('bkh_staff_preview_unlocked', 'true');
      setError('');
      onUnlock();
    } else {
      setError('Access denied: Invalid authorization passkey.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] via-[#0F2942] to-[#1E3A5F] text-white flex flex-col justify-between selection:bg-amber-400 selection:text-slate-900">
      {/* Top Bar with Minimal Branding */}
      <header className="px-6 py-6 border-b border-white/10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900 text-lg shadow-lg font-display">
            BK
          </div>
          <div>
            <span className="block font-bold text-sm tracking-wide text-white uppercase font-display">
              {settings.orgName}
            </span>
            <span className="block text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
              {settings.tagline}
            </span>
          </div>
        </div>

        {/* Staff Access Trigger Button */}
        <button
          onClick={() => setShowUnlockModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
          title="Authorized Staff / Management Preview"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Staff Access</span>
        </button>
      </header>

      {/* Main Holding Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Private Staging & Scheduled Launch</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
              {settings.maintenanceHeadline || 'Official Portal Staging & Private Preparation'}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              {settings.maintenanceMessage ||
                'Access to this public portal is temporarily restricted while final domain linkage, security audits, and system configuration are completed.'}
            </p>
          </div>

          {/* Verification Pillars Notice */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">Status</div>
              <div className="text-sm font-semibold text-white">Under Staging</div>
              <div className="text-xs text-slate-400">Public access paused</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Domain Setup</div>
              <div className="text-sm font-semibold text-white">DNS & SSL in Progress</div>
              <div className="text-xs text-slate-400">Configuring custom host</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="text-sky-400 text-xs font-bold uppercase tracking-wider">Official Launch</div>
              <div className="text-sm font-semibold text-white">Coming Soon</div>
              <div className="text-xs text-slate-400">Restricted to authorized team</div>
            </div>
          </div>

          {/* Action Call for Authorized Team */}
          <div className="pt-2">
            <button
              onClick={() => setShowUnlockModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Enter Staff Authorization Code</span>
            </button>
            <p className="text-xs text-slate-400 mt-2">
              Website owner or authorized team member? Unlock immediate access to preview or edit the portal.
            </p>
          </div>
        </div>
      </main>

      {/* Official Contact Footer for Inquiries */}
      <footer className="px-6 py-8 border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{settings.ghanaOffice.city} · {settings.usaOffice.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`mailto:${settings.ghanaOffice.email}`} className="hover:text-white transition-colors underline">
                {settings.ghanaOffice.email}
              </a>
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} {settings.orgName}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Staff Passcode Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0F2942] font-display">
                    Authorized Staff Access
                  </h3>
                  <p className="text-xs text-slate-500">
                    Unlock full site preview & administrative controls
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowUnlockModal(false);
                  setError('');
                  setPasscode('');
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Administrative Passkey
                </label>
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="Enter authorized passkey"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
                {error && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">Staff Tip:</span> Entering your passkey unlocks your personal browser session so you can review the website, add projects, and manage donations while the public link remains locked.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Unlock Preview</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
