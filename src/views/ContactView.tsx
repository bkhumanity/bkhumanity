import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { addContactMessage } from '../services/storage';
import { MapPin, Phone, Mail, ExternalLink, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface ContactViewProps {
  settings: SiteSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Borehole Sponsorship');
  const [officeTarget, setOfficeTarget] = useState<'Ghana' | 'USA' | 'General'>('Ghana');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please confirm consent for our staff to respond to your inquiry.');
      return;
    }

    addContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: subject.trim(),
      category,
      message: message.trim(),
      officeTarget,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0F2942] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Contact Our Team
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We operate across Ghana with international liaison in Washington, D.C. Connect with our field teams regarding borehole drilling, scholarships, or organizational partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Office Cards + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Dual Office Locations & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            {/* Ghana Office */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <h3 className="text-base font-bold text-[#0F2942] font-display">
                    Ghana Operations Headquarters
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Field HQ
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{settings.ghanaOffice.city}</span>
                    <span className="text-slate-500">{settings.ghanaOffice.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href={`tel:${settings.ghanaOffice.phone.replace(/\s+/g, '')}`}
                    className="hover:text-emerald-700 font-semibold"
                  >
                    {settings.ghanaOffice.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href={`mailto:${settings.ghanaOffice.email}`}
                    className="hover:text-emerald-700 font-semibold"
                  >
                    {settings.ghanaOffice.email}
                  </a>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.ghanaOffice.whatsapp}?text=Hello%20BK%20Construction%20NGO`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Chat with Field Office</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* USA Office */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  <h3 className="text-base font-bold text-[#0F2942] font-display">
                    USA Liaison & Diaspora Office
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                  Liaison
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{settings.usaOffice.city}</span>
                    <span className="text-slate-500">{settings.usaOffice.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                  <a
                    href={`tel:${settings.usaOffice.phone.replace(/[^\d+]/g, '')}`}
                    className="hover:text-sky-700 font-semibold"
                  >
                    {settings.usaOffice.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <a
                    href={`mailto:${settings.usaOffice.email}`}
                    className="hover:text-sky-700 font-semibold"
                  >
                    {settings.usaOffice.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              Note: Contact telephone lines and addresses are demonstration fixtures during current development and will update when verified organizational leases are approved.
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Message Successfully Sent!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to BK Construction Humanity For Habitat NGO. Your inquiry has been routed to our {officeTarget} desk. We will respond promptly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F2942] font-display">
                      Send Us an Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We respond to community proposals, sponsorship inquiries, and general questions.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. kwame@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +233 24 123 4567"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Office to Direct Message
                      </label>
                      <select
                        value={officeTarget}
                        onChange={(e) => setOfficeTarget(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Ghana">Ghana Operations Office</option>
                        <option value="USA">USA Liaison Office</option>
                        <option value="General">General Inquiries Desk</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Borehole Sponsorship">Borehole Well Sponsorship</option>
                        <option value="Youth Construction Training">Youth Construction Apprenticeships</option>
                        <option value="Girl Child Education">Girl Child Scholarships</option>
                        <option value="Corporate Partnership">Corporate Partnership / CSR</option>
                        <option value="Media & Press">Media & Press Inquiries</option>
                        <option value="General">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject Line <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Proposal for borehole in Volta"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please write your detailed inquiry or community request..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 h-4 w-4"
                      />
                      <span>
                        I consent to BK Construction Humanity for Habitat storing my details to reply to this message.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to {officeTarget} Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
