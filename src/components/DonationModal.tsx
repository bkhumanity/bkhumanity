import React, { useState } from 'react';
import { Project, Donation } from '../types';
import { addDonation } from '../services/storage';
import { X, Heart, CheckCircle2, ShieldCheck, Printer, ArrowRight, Smartphone, CreditCard } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  preselectedProjectId?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  projects,
  preselectedProjectId = 'general',
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'annually'>('one-time');
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(preselectedProjectId);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  
  // Donor form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorCountry, setDonorCountry] = useState('Ghana');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [message, setMessage] = useState('');
  
  // Payment simulation
  const [paymentMethod, setPaymentMethod] = useState<'Mobile Money' | 'Card'>('Mobile Money');
  const [momoProvider, setMomoProvider] = useState<'MTN' | 'Telecel' | 'AirtelTigo'>('MTN');
  const [momoNumber, setMomoNumber] = useState('');
  
  // Status states
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<Donation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Keep preselected project updated if changed
  React.useEffect(() => {
    if (preselectedProjectId) {
      setSelectedProjectId(preselectedProjectId);
    }
  }, [preselectedProjectId]);

  if (!isOpen) return null;

  const ghsAmounts = [50, 100, 250, 500, 1000];
  const usdAmounts = [15, 35, 75, 150, 300];
  const presetAmounts = currency === 'GHS' ? ghsAmounts : usdAmounts;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleCurrencyChange = (newCurr: 'GHS' | 'USD') => {
    setCurrency(newCurr);
    setCustomAmount('');
    setSelectedAmount(newCurr === 'GHS' ? 250 : 75);
    if (newCurr === 'USD' && donorCountry === 'Ghana') {
      setDonorCountry('United States');
      setPaymentMethod('Card');
    } else if (newCurr === 'GHS' && donorCountry === 'United States') {
      setDonorCountry('Ghana');
      setPaymentMethod('Mobile Money');
    }
  };

  const handleAmountSelect = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!currentAmount || currentAmount <= 0) {
      setErrorMessage('Please select or enter a valid donation amount.');
      return;
    }

    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setErrorMessage('Please enter a valid donor email address.');
      return;
    }

    if (!isAnonymous && !donorName.trim()) {
      setErrorMessage('Please enter your name or check the "Donate anonymously" box.');
      return;
    }

    if (paymentMethod === 'Mobile Money' && !momoNumber.trim()) {
      setErrorMessage('Please provide your mobile money wallet number.');
      return;
    }

    setIsProcessing(true);

    // Simulate verified server-side payment transaction via Paystack / MoMo gateway
    setTimeout(() => {
      const selectedProj = projects.find((p) => p.id === selectedProjectId);
      const projectName = selectedProjectId === 'general' ? 'General Humanitarian Fund' : (selectedProj ? selectedProj.title : 'General Fund');
      const randomRefNum = Math.floor(10000 + Math.random() * 90000);
      const refNumber = `BK-DON-2026-${randomRefNum}`;

      const newDonation: Donation = {
        id: `don-${Date.now()}`,
        referenceNumber: refNumber,
        donorName: isAnonymous ? 'Anonymous Benefactor' : donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorCountry,
        donorPhone: donorPhone.trim() || undefined,
        isAnonymous,
        receiveUpdates,
        message: message.trim() || undefined,
        amount: currentAmount,
        currency,
        frequency,
        projectId: selectedProjectId,
        projectName,
        paymentMethod: paymentMethod === 'Mobile Money' ? 'Mobile Money' : 'Card',
        status: 'Verified',
        createdAt: new Date().toISOString(),
      };

      addDonation(newDonation);
      setCompletedDonation(newDonation);
      setIsProcessing(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#0F2942] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Heart className="w-5 h-5 fill-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display leading-snug">
                Support Humanity For Habitat
              </h3>
              <p className="text-xs text-slate-300">
                Safe, verified donation powering boreholes, training & scholarships
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {completedDonation ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-display">
                Medaase! Thank You for Your Generosity
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your donation of <span className="font-bold text-slate-900">{completedDonation.currency === 'GHS' ? 'GH₵' : '$'}{completedDonation.amount.toLocaleString()}</span> has been verified and recorded to support clean water and community empowerment in Ghana.
              </p>
            </div>

            {/* Official Receipt Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 uppercase">Donation Receipt</span>
                <span className="font-mono text-emerald-700 font-semibold">{completedDonation.referenceNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-1">
                <div>
                  <span className="text-slate-500 block">Beneficiary Project:</span>
                  <span className="font-semibold text-slate-900">{completedDonation.projectName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Frequency:</span>
                  <span className="font-semibold text-slate-900 capitalize">{completedDonation.frequency}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Donor Name:</span>
                  <span className="font-semibold text-slate-900">{completedDonation.donorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Method:</span>
                  <span className="font-semibold text-slate-900">{completedDonation.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date & Time:</span>
                  <span className="font-semibold text-slate-900">{new Date(completedDonation.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified & Recorded
                  </span>
                </div>
              </div>
              {completedDonation.message && (
                <div className="border-t border-slate-200 pt-2 italic text-slate-600">
                  &ldquo;{completedDonation.message}&rdquo;
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Return to Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* 1. Frequency & Currency Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
                  {(['one-time', 'monthly', 'annually'] as const).map((freq) => (
                    <button
                      type="button"
                      key={freq}
                      onClick={() => setFrequency(freq)}
                      className={`py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                        frequency === freq
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {freq === 'one-time' ? 'One-time' : freq === 'monthly' ? 'Monthly' : 'Annual'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Currency
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange('GHS')}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      currency === 'GHS'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Ghanaian Cedi (GH₵)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange('USD')}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      currency === 'USD'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    US Dollar ($ USD)
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Destination Project Allocation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Allocate to Project / Program
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="general">★ General Humanitarian Fund (Greatest Need)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Preset Amounts & Custom Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Donation Amount
                </label>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  {currency === 'GHS' ? 'GH₵' : '$'}
                  {currentAmount > 0 ? currentAmount.toLocaleString() : '0'}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                {presetAmounts.map((amt) => {
                  const isSelected = !customAmount && selectedAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`py-2 px-1 text-sm font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {currency === 'GHS' ? 'GH₵' : '$'}
                      {amt.toLocaleString()}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount field */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-sm font-semibold">
                  {currency === 'GHS' ? 'GH₵' : '$'}
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* 4. Donor Information */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Donor Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Full Name {!isAnonymous && <span className="text-rose-500">*</span>}
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={isAnonymous ? 'Anonymous' : 'e.g. Kwame Mensah'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm disabled:opacity-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. kwame@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Country
                  </label>
                  <select
                    value={donorCountry}
                    onChange={(e) => setDonorCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Ghana">Ghana</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other">Other International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="e.g. +233 24 123 4567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Optional Dedication / Note
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="In honor of my grandmother, or special prayer..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span>Make this donation anonymous on public project contributor lists</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={receiveUpdates}
                    onChange={(e) => setReceiveUpdates(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span>Send me quarterly field progress photos and impact reports</span>
                </label>
              </div>
            </div>

            {/* 5. Payment Method & Gateway Simulation */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Payment Gateway
                </h4>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  256-Bit SSL Encrypted
                </span>
              </div>

              {/* Method tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Mobile Money')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'Mobile Money'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <div className="text-left">
                    <span className="block text-xs">Mobile Money</span>
                    <span className="text-[10px] text-slate-500 font-normal">MTN, Telecel, AirtelTigo</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'Card'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  <div className="text-left">
                    <span className="block text-xs">Debit / Credit Card</span>
                    <span className="text-[10px] text-slate-500 font-normal">Visa, Mastercard</span>
                  </div>
                </button>
              </div>

              {/* Payment Details Form */}
              {paymentMethod === 'Mobile Money' ? (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex gap-2">
                    {(['MTN', 'Telecel', 'AirtelTigo'] as const).map((prov) => (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => setMomoProvider(prov)}
                        className={`flex-1 py-1 px-2 text-xs font-semibold rounded-md border ${
                          momoProvider === prov
                            ? 'bg-amber-400/20 border-amber-500 text-amber-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {prov} MoMo
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Wallet Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      placeholder="e.g. 024 123 4567"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      You will receive an instant USSD prompt on your phone to approve the contribution.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242 (Test Mode Active)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="888"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying with Payment Gateway...</span>
                  </span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    <span>
                      Complete Donation of {currency === 'GHS' ? 'GH₵' : '$'}
                      {currentAmount > 0 ? currentAmount.toLocaleString() : '0'}
                    </span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                By donating, you agree to our Donation & Refund Policy. Official receipt issued immediately upon confirmation.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
