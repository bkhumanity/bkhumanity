import React, { useState } from 'react';
import { addVolunteerApplication, addPartnershipInquiry } from '../services/storage';
import { Users, Building2, CheckCircle2, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface VolunteerViewProps {
  onOpenDonateModal: () => void;
}

export const VolunteerView: React.FC<VolunteerViewProps> = ({ onOpenDonateModal }) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner'>('volunteer');

  // Volunteer form state
  const [volFullName, setVolFullName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volCountry, setVolCountry] = useState('Ghana');
  const [volArea, setVolArea] = useState('Clean water projects');
  const [volSkills, setVolSkills] = useState('');
  const [volAvailability, setVolAvailability] = useState('Weekends');
  const [volMotivation, setVolMotivation] = useState('');
  const [volExperience, setVolExperience] = useState('');
  const [volConsent, setVolConsent] = useState(false);
  const [volSubmitted, setVolSubmitted] = useState(false);
  const [volError, setVolError] = useState('');

  // Partnership form state
  const [partOrg, setPartOrg] = useState('');
  const [partPerson, setPartPerson] = useState('');
  const [partEmail, setPartEmail] = useState('');
  const [partPhone, setPartPhone] = useState('');
  const [partCountry, setPartCountry] = useState('Ghana');
  const [partType, setPartType] = useState('Corporate Social Responsibility (CSR)');
  const [partDesc, setPartDesc] = useState('');
  const [partConsent, setPartConsent] = useState(false);
  const [partSubmitted, setPartSubmitted] = useState(false);
  const [partError, setPartError] = useState('');

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolError('');

    if (!volFullName.trim() || !volEmail.trim() || !volPhone.trim()) {
      setVolError('Please complete all required fields.');
      return;
    }

    if (!volConsent) {
      setVolError('Please confirm your consent to data processing for volunteer coordination.');
      return;
    }

    addVolunteerApplication({
      fullName: volFullName.trim(),
      email: volEmail.trim(),
      phone: volPhone.trim(),
      country: volCountry,
      areaOfInterest: volArea,
      skills: volSkills.trim(),
      availability: volAvailability,
      motivation: volMotivation.trim(),
      experience: volExperience.trim() || undefined,
    });

    setVolSubmitted(true);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartError('');

    if (!partOrg.trim() || !partPerson.trim() || !partEmail.trim() || !partPhone.trim()) {
      setPartError('Please complete all required fields.');
      return;
    }

    if (!partConsent) {
      setPartError('Please confirm your consent for our partnership liaison team to contact you.');
      return;
    }

    addPartnershipInquiry({
      organizationName: partOrg.trim(),
      contactPerson: partPerson.trim(),
      email: partEmail.trim(),
      phone: partPhone.trim(),
      country: partCountry,
      partnershipType: partType,
      description: partDesc.trim(),
    });

    setPartSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      {/* Banner */}
      <section className="bg-[#0F2942] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Get Involved
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Volunteer & Partnership
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Join hands with BK Construction Humanity For Habitat NGO. Whether giving your time on the ground in Ghana or establishing an institutional CSR collaboration, you directly advance humanitarian dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Switcher & Forms Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          {/* Segmented Mode Selector */}
          <div className="p-2 sm:p-3 bg-slate-100/80 border-b border-slate-200 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'volunteer'
                  ? 'bg-white text-[#0F2942] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Volunteer Application</span>
            </button>

            <button
              onClick={() => setActiveTab('partner')}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-white text-[#0F2942] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-sky-600" />
              <span>Institutional & Corporate Partnership</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10">
            {activeTab === 'volunteer' ? (
              volSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Volunteer Application Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for stepping forward to serve. Our volunteer coordinators in Accra and Washington, D.C. will review your submission and contact you within 3 business days.
                  </p>
                  <button
                    onClick={() => {
                      setVolSubmitted(false);
                      setVolFullName('');
                      setVolEmail('');
                      setVolSkills('');
                      setVolMotivation('');
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F2942] font-display">
                      Volunteer With Us
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Lend your hands and expertise to borehole installations, apprentice mentoring, or educational drives.
                    </p>
                  </div>

                  {volError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                      {volError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={volFullName}
                        onChange={(e) => setVolFullName(e.target.value)}
                        placeholder="e.g. John K. Mensah"
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
                        value={volEmail}
                        onChange={(e) => setVolEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={volPhone}
                        onChange={(e) => setVolPhone(e.target.value)}
                        placeholder="e.g. +233 24 123 4567"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country of Residence
                      </label>
                      <select
                        value={volCountry}
                        onChange={(e) => setVolCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Ghana">Ghana</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Other">Other International</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Area of Interest
                      </label>
                      <select
                        value={volArea}
                        onChange={(e) => setVolArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Clean water projects">Clean water & borehole drilling</option>
                        <option value="Construction training">Construction training & apprenticeships</option>
                        <option value="Education">Girl child education & mentoring</option>
                        <option value="Fundraising">Fundraising & donor relations</option>
                        <option value="Communications">Media, photography & communications</option>
                        <option value="Administration">Administration & logistics</option>
                        <option value="Community outreach">Community health outreach</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Availability
                      </label>
                      <select
                        value={volAvailability}
                        onChange={(e) => setVolAvailability(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Weekends">Weekends only</option>
                        <option value="Full-time">Full-time field placement</option>
                        <option value="Part-time">Part-time (10-15 hrs/week)</option>
                        <option value="Remote">Remote digital / mentorship (flexible)</option>
                        <option value="Quarterly">Quarterly expeditions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Relevant Skills & Professional Background
                    </label>
                    <input
                      type="text"
                      value={volSkills}
                      onChange={(e) => setVolSkills(e.target.value)}
                      placeholder="e.g. Civil engineering, plumbing, nurse, teacher, social worker, photographer..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Motivation Statement
                    </label>
                    <textarea
                      rows={3}
                      value={volMotivation}
                      onChange={(e) => setVolMotivation(e.target.value)}
                      placeholder="Why do you wish to volunteer with BK Construction Humanity for Habitat?"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={volConsent}
                        onChange={(e) => setVolConsent(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 h-4 w-4"
                      />
                      <span>
                        I consent to BK Construction Humanity for Habitat processing my contact information solely for volunteer coordination in accordance with the Privacy Policy.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Volunteer Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )
            ) : (
              partSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Partnership Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in partnering with our humanitarian mission. Our Executive Partnership Liaison in Washington, D.C. or Accra will reach out to schedule an exploratory discussion.
                  </p>
                  <button
                    onClick={() => {
                      setPartSubmitted(false);
                      setPartOrg('');
                      setPartPerson('');
                      setPartEmail('');
                      setPartDesc('');
                    }}
                    className="px-6 py-2.5 bg-sky-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F2942] font-display">
                      Institutional & Corporate Partnership
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Collaborate on impactful CSR programs, co-sponsored boreholes, or technical apprenticeships.
                    </p>
                  </div>

                  {partError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                      {partError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company / Organization Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={partOrg}
                        onChange={(e) => setPartOrg(e.target.value)}
                        placeholder="e.g. Volta Minerals Ltd / US Water Aid Fdn"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Person & Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={partPerson}
                        onChange={(e) => setPartPerson(e.target.value)}
                        placeholder="e.g. Angela Davis, Head of CSR"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Official Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={partEmail}
                        onChange={(e) => setPartEmail(e.target.value)}
                        placeholder="e.g. adavis@company.org"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Direct Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={partPhone}
                        onChange={(e) => setPartPhone(e.target.value)}
                        placeholder="e.g. +1 (202) 555-0199 or +233 24 123 4567"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Partnership Modality
                      </label>
                      <select
                        value={partType}
                        onChange={(e) => setPartType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Corporate Social Responsibility (CSR)">Corporate Social Responsibility (CSR)</option>
                        <option value="Borehole Sponsorship & Co-Financing">Complete Borehole Sponsorship & Co-Financing</option>
                        <option value="Institutional Grant & Funding">Institutional Grant & Foundation Funding</option>
                        <option value="Vocational Equipment In-Kind">Vocational Equipment & Tool In-Kind Donation</option>
                        <option value="Technical Assistance & Engineering">Technical Assistance & Engineering Exchange</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country of Headquarters
                      </label>
                      <select
                        value={partCountry}
                        onChange={(e) => setPartCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Ghana">Ghana</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Partnership Scope & Objectives
                    </label>
                    <textarea
                      rows={3}
                      value={partDesc}
                      onChange={(e) => setPartDesc(e.target.value)}
                      placeholder="Briefly describe your proposed project, target communities, or grant parameters..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={partConsent}
                        onChange={(e) => setPartConsent(e.target.checked)}
                        className="rounded text-sky-600 focus:ring-sky-500 mt-0.5 h-4 w-4"
                      />
                      <span>
                        I confirm authority to submit this partnership inquiry and consent to follow-up contact by BK Construction Humanity for Habitat leadership.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Partnership Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
