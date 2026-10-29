import React from 'react';
import { Droplets, HardHat, GraduationCap, ShieldCheck, Heart, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
  onOpenDonateModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenDonateModal }) => {
  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      {/* Page Header Banner */}
      <section className="bg-[#0F2942] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              About BK Construction
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Humanity For Habitat NGO
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We Don&apos;t Just Build Houses, We Build Futures. Operating across Ghana with international liaison in Washington, D.C., we transform underserved rural and peri-urban communities through sustainable water, artisan vocational trades, and girls&apos; educational access.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Genesis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
              Our Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
              From Physical Structures to Human Transformation
            </h2>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                BK Construction began as an ethical building enterprise with a simple realization: erecting physical buildings without addressing fundamental human vulnerabilities in surrounding communities left development unfinished. When rural school pupils were falling ill from drinking contaminated stream water, and young school leavers stood idle without marketable artisan skills, a deeper humanitarian response was imperative.
              </p>
              <p>
                In 2021, the founders formalized <strong className="text-slate-900">Humanity For Habitat NGO</strong> as an independent humanitarian wing. The organization focuses squarely on three interdependent cornerstones: ensuring every child has safe water to thrive, training youth in valuable building and mechanical trades, and shielding young girls with scholarships and dignity kits so poverty never cuts their education short.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onOpenDonateModal()}
                className="px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support Our Mission</span>
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Explore Active Projects
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100 aspect-4/3">
              <img
                src="/images/hero_african_water_well_1793198749440.jpg"
                alt="Community members and children celebrating borehole water in Ghana"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2942] font-display">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To uplift vulnerable African communities by constructing solar-powered clean water boreholes, certifying youth in vocational building trades, and providing scholarships that keep girls in school.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2942] font-display">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A Ghana and wider African continent where no rural child suffers from preventable waterborne illness, where young artisans power sustainable infrastructure, and every girl child reaches secondary graduation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2942] font-display">Core Values</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrity, Radical Transparency, Community Stewardship, Equal Opportunity, and Lifelong Sustainability over short-term handouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our 3 Pillars Detailed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
            Holistic Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
            How Our Three Pillars Interconnect
          </h2>
          <p className="text-xs text-slate-600">
            Each pillar addresses a specific structural bottleneck in rural development, reinforcing community resilience.
          </p>
        </div>

        <div className="space-y-8">
          {/* Pillar 1 Detail */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-4/3 bg-slate-100">
              <img
                src="/images/project_clean_water_borehole_1793198751331.jpg"
                alt="Community clean water borehole system in Ghana"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <Droplets className="w-4 h-4 fill-sky-500" />
                <span>Pillar One: Clean Water & Borehole Infrastructure</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F2942] font-display">
                Eliminating Water Poverty from the Aquifer Up
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We perform comprehensive hydrogeological acoustic surveys to identify deep freshwater aquifers (typically 80–120 meters deep), bypassing contaminated surface runoff. Each project features stainless steel borehole casings, heavy-duty solar pumping systems, hygienic overhead poly-tanks, and multiple tap heads. To ensure long-term functionality, we establish and train a democratically elected Water & Sanitation Committee (WATSAN) with a communal maintenance tariff.
              </p>
            </div>
          </div>

          {/* Pillar 2 Detail */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-4/3 bg-slate-100">
              <img
                src="/images/project_construction_training_1793198750855.jpg"
                alt="Youth vocational construction training students"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <HardHat className="w-4 h-4" />
                <span>Pillar Two: Vocational Construction Trades & Youth Jobs</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F2942] font-display">
                Empowering the Next Generation of Master Artisans
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rather than importing external contractors, we train local youth to build and maintain their own communities. Our 9-month intensive apprenticeships cover foundation masonry, interlocking compressed earth brick making, plumbing, roofing, and electrical installation. Every graduate receives a COTVET-recognized credential and a professional artisan toolkit, transforming unemployed youth into self-employed breadwinners.
              </p>
            </div>
          </div>

          {/* Pillar 3 Detail */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-4/3 bg-slate-100">
              <img
                src="/images/project_girl_child_education_1793198758731.jpg"
                alt="Ghanaian schoolgirls studying in classroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Pillar Three: Girl Child Education & Scholarships</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F2942] font-display">
                Protecting Girls&apos; Dreams and STEM Horizons
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Educating a girl educates a nation. Our Brighter Futures program provides full scholarships covering tuition, textbooks, boarding fees, and solar study lamps for rural homes lacking electricity. Crucially, we distribute reusable menstrual hygiene kits and conduct dignity workshops, preventing girls from missing up to 20% of the school year due to period poverty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance, Transparency & Dual Operations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
              Governance & Oversight
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
              Transparency, Audited Stewardship & Dual Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              BK Construction Humanity For Habitat maintains operational and compliance offices in Accra, Ghana and Washington, D.C., USA. This dual structure ensures rigorous international financial accountability while keeping field decisions firmly anchored in local community consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">Direct Field Disbursement</h4>
              <p className="text-xs text-slate-600">
                Drilling materials and toolkits are procured locally in Ghana, minimizing overhead and directly strengthening the local commercial economy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">Annual Independent Audit</h4>
              <p className="text-xs text-slate-600">
                Financial records and donor allocations undergo independent accounting review, published openly in our annual reports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">Beneficiary Consent</h4>
              <p className="text-xs text-slate-600">
                All community photography and quotes are obtained with informed, dignified consent from village leadership and guardians.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
