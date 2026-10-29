import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Clean Water & Boreholes',
    question: 'How does BK Construction select rural communities for borehole drilling?',
    answer:
      'We prioritize communities facing severe hydrological vulnerability where residents currently trek over 2 kilometers to fetch water from seasonal streams or contaminated ponds. Before any drilling commences, our technical team conducts geological acoustic surveys and water quality risk assessments in coordination with local District Assemblies and traditional chiefs.',
  },
  {
    id: 'faq-2',
    category: 'Sustainability & Maintenance',
    question: 'How do you ensure boreholes continue functioning long after commissioning?',
    answer:
      'Rather than drilling and departing, we establish and train a democratically chosen 7-member Water & Sanitation Committee (WATSAN) in every community. The committee is equipped with basic maintenance toolkits, trained in pump diagnostics, and manages a modest communal maintenance tariff to replace seals, solar inverters, and pipes without external dependency.',
  },
  {
    id: 'faq-3',
    category: 'Construction Training',
    question: 'What trades are taught in the Youth Vocational Construction Academy?',
    answer:
      'Our 9-month curriculum covers structural masonry, interlocking compressed earth brick (CSEB) production, steel bending, eco-friendly carpentry, domestic plumbing, and electrical conduit installation. Every enrolled apprentice receives free safety gear, tools, daily field lunch stipends, and COTVET-recognized artisan certification.',
  },
  {
    id: 'faq-4',
    category: 'Girl Child Education',
    question: 'What support is included in the Brighter Futures Girls Scholarship?',
    answer:
      'Scholarships cover full Senior High School and technical tuition, state-prescribed textbooks, uniforms, and solar study lamps for homes lacking electricity. Additionally, we provide reusable menstrual hygiene dignity kits and host mentorship workshops with female Ghanaian engineers, ensuring period poverty never interrupts schooling.',
  },
  {
    id: 'faq-5',
    category: 'Sponsorship & Plaque Dedications',
    question: 'Can diaspora individuals or corporate groups sponsor an entire borehole?',
    answer:
      'Yes. Individuals, families, and corporations can fully sponsor a complete mechanized solar borehole installation (typically GH₵120,000–GH₵140,000 or ~$8,000–$9,500 USD). Full sponsors receive custom stainless steel plaque dedications at the water station, GPS coordinates, water laboratory purity reports, and a video documentary of the community commissioning ceremony.',
  },
  {
    id: 'faq-6',
    category: 'Financial Transparency',
    question: 'How are donations audited between Ghana field operations and the USA office?',
    answer:
      'We maintain dual compliance standards. Our Washington, D.C. liaison manages international donor records and governance oversight, while our Accra office manages field procurement directly with vetted local suppliers. At least 85% of all charitable revenue is spent directly on construction materials and scholarships, with annual accounts submitted for independent professional auditing.',
  },
  {
    id: 'faq-7',
    category: 'Payment Methods',
    question: 'What payment methods can donors in Ghana and internationally use?',
    answer:
      'In Ghana, donors can contribute using all major Mobile Money networks (MTN MoMo, Telecel Cash, and AirtelTigo Money). International contributors from the United States, UK, Europe, and beyond can securely use Visa, Mastercard, or bank transfer through our encrypted payment gateway with instant electronic receipts.',
  },
];

interface FAQsProps {
  onNavigate?: (view: string) => void;
  onOpenDonateModal?: (projectId?: string) => void;
}

export const FAQs: React.FC<FAQsProps> = ({ onNavigate, onOpenDonateModal }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Clean Water & Boreholes', 'Construction Training', 'Girl Child Education', 'Financial Transparency'];

  const filteredFaqs = filterCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === filterCategory || (filterCategory === 'Clean Water & Boreholes' && item.category === 'Sustainability & Maintenance'));

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block font-display">
          Got Questions? We Have Answers
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Everything you need to know about our community selection criteria, borehole sustainability, construction apprenticeships, and financial governance.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === cat
                ? 'bg-white text-[#0F2942] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-400/20'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={isOpen}
                className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    {faq.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#0F2942] font-display">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-emerald-100 text-emerald-800 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Help Callout */}
      <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F2942]">Have a question not listed here?</h4>
            <p className="text-xs text-slate-500">
              Our Ghana operations desk and USA liaison team are happy to assist you directly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Contact Our Desk
            </button>
          )}
          {onOpenDonateModal && (
            <button
              onClick={() => onOpenDonateModal()}
              className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Support Our Work
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
