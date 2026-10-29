import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCw, Eye } from 'lucide-react';

interface LegalViewProps {
  initialTab?: 'privacy' | 'terms' | 'refund' | 'transparency';
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'transparency'>(initialTab);

  return (
    <div className="space-y-12 lg:space-y-16 pb-20">
      <section className="bg-[#0F2942] text-white py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Trust & Governance
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Legal, Policies & Accountability
            </h1>
            <p className="text-sm text-slate-300">
              Clear governance terms, data privacy practices, and donation accountability policies for BK Construction — Humanity For Habitat NGO.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Policy Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-white text-[#0F2942] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-white text-[#0F2942] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'refund'
                ? 'bg-white text-[#0F2942] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span>Donation & Refund Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('transparency')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'transparency'
                ? 'bg-white text-[#0F2942] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Transparency & Governance</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs">
            <strong>Draft Policy Notice:</strong> This document contains editable sample provisions prepared for organizational review prior to formal legal ratification by BK Construction Humanity for Habitat NGO leadership.
          </div>

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Privacy Policy</h2>
              <p>
                BK Construction — Humanity For Habitat NGO values and respects the privacy of our donors, volunteers, beneficiaries, and website visitors. This policy outlines how information is collected, safeguarded, and utilized across our Ghana and USA operations.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">1. Information We Collect</h3>
              <p>
                When you make a donation, apply to volunteer, or send an inquiry, we may collect your name, email address, phone number, residential country, and payment reference. We do not store raw credit card numbers or Mobile Money PINs; all processing is handled through secure, certified payment gateways (e.g. Paystack / Flutterwave).
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">2. How Information is Used</h3>
              <p>
                Your data is used strictly to process donations, issue official tax receipts, coordinate volunteer assignments, send requested field updates, and respond to your direct communications. We never sell, rent, or trade donor lists to third parties.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">3. Beneficiary Dignity & Consent</h3>
              <p>
                All photographs of African communities, children, and youth apprentices displayed on this website are published with dignity, cultural respect, and prior consent from community leaders, school headteachers, and guardians.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Terms of Service</h2>
              <p>
                Welcome to the official website of BK Construction — Humanity For Habitat NGO. By accessing or using this website, you agree to be bound by these Terms of Service.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">1. Use of Content</h3>
              <p>
                All text, photographs, project data, and emblems are the intellectual property of BK Construction — Humanity For Habitat NGO. They may not be reproduced for commercial gain without express written authorization.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">2. Volunteer and Partnership Applications</h3>
              <p>
                Submitting an application to volunteer or partner does not constitute a legally binding employment contract. Acceptance is subject to reference checks, background clearance, and organizational field availability.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">3. Accuracy of Field Information</h3>
              <p>
                While we strive for complete accuracy, project timelines and budget targets may vary due to field realities, hydrogeological ground conditions, and local climatic seasons.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Donation & Refund Policy</h2>
              <p>
                As a humanitarian non-profit organization, contributions made to BK Construction Humanity for Habitat are immediately allocated toward purchasing borehole drilling hardware, subsidizing vocational tools, or paying school tuition fees.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">1. Voluntary Contributions</h3>
              <p>
                All donations are voluntary charitable gifts. Donors are advised to confirm their intended contribution amount and project allocation before completing payment.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">2. Erroneous or Duplicate Charges</h3>
              <p>
                In the event of an accidental duplicate transaction or technical error during payment processing, donors may request a reversal by writing to <span className="font-mono text-emerald-700">finance@bkhumanity.org</span> within 14 calendar days with their transaction reference number. Verified duplicate charges will be refunded via the original payment method.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">3. Restricted vs. General Donations</h3>
              <p>
                Donations made to specific projects are restricted to those projects. In the rare circumstance where a project becomes fully funded or encounters insurmountable geological obstruction, remaining funds are redirected to the closest related clean water or education initiative with donor notice.
              </p>
            </div>
          )}

          {activeTab === 'transparency' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Transparency & Accountability</h2>
              <p>
                We believe that radical transparency is the foundation of enduring donor trust and community dignity.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">1. Fund Allocation Ratios</h3>
              <p>
                We target maintaining at least 85% of every dollar or cedi directly in programs and field construction materials, capping operational and administrative overhead at 15%.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">2. Community Oversight Committees</h3>
              <p>
                Every borehole drilled is handed over to a 7-member community Water & Sanitation Committee (WATSAN), composed of local elders, women leaders, and youth, ensuring communal ownership and preventing external dependency.
              </p>
              <h3 className="font-bold text-slate-900 text-base pt-2">3. Independent Audit</h3>
              <p>
                Our annual accounts undergo external financial inspection. Demonstration figures on this development site are clearly flagged as illustrative baselines editable by authorized administrators.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
