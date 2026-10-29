import React from 'react';
import { ImpactStat, GalleryItem } from '../types';
import { Droplets, HardHat, GraduationCap, Heart, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

interface ImpactViewProps {
  stats: ImpactStat[];
  gallery: GalleryItem[];
  onNavigate: (view: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
  onOpenLightbox: (index: number) => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  stats,
  gallery,
  onNavigate,
  onOpenDonateModal,
  onOpenLightbox,
}) => {
  const regions = [
    { name: 'Volta Region', boreholes: 12, scholars: 380, trainees: 140, focus: 'Deep aquifer boreholes & rural school sanitation' },
    { name: 'Greater Accra', boreholes: 4, scholars: 220, trainees: 380, focus: 'Vocational masonry & electrical apprenticeships' },
    { name: 'Northern Region (Tamale/Savelugu)', boreholes: 8, scholars: 450, trainees: 90, focus: 'Girl child secondary STEM scholarships & hygiene' },
    { name: 'Eastern Region (Kwahu)', boreholes: 6, scholars: 110, trainees: 120, focus: 'Solar-pumped hilltop community water stations' },
    { name: 'Ashanti Region', boreholes: 2, scholars: 80, trainees: 120, focus: 'Women in construction carpentry & tiling fellowships' },
  ];

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0F2942] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Measurable Human Outcomes
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Our Community Impact
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transparent, data-backed evidence of how clean water, construction trade skills, and girl child scholarships break generational poverty cycles in Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#0F2942] font-display">
                Field Progress & Key Indicators
              </h2>
              <p className="text-xs text-slate-500">
                Audited data reflecting projects commissioned between 2022 and 2026.
              </p>
            </div>
            <button
              onClick={() => onOpenDonateModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Expand Our Impact</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.id} className="space-y-1.5">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] font-display tabular-nums">
                  {s.value}
                  <span className="text-emerald-600 text-2xl font-bold ml-0.5">{s.suffix}</span>
                </div>
                <div className="text-sm font-bold text-slate-800 font-display">{s.label}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Before and After Comparison (As showcased in Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
              The Reality on the Ground
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
              Before & After Intervention
            </h2>
            <p className="text-xs text-slate-600">
              The profound transformation when children transition from collecting contaminated surface puddle water to drinking from a deep subterranean aquifer pump.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Before Card */}
            <div className="bg-white rounded-2xl border border-rose-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 bg-slate-200 overflow-hidden">
                  <img
                    src="/assets/aistudio/image_312ace31.png"
                    alt="Children drinking dirty stream water before borehole"
                    className="w-full h-full object-cover object-left-bottom"
                  />
                  <div className="absolute top-3 left-3 bg-rose-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Before: Stagnant Muddy Water
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Untreated Stream & Puddle Water
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prior to borehole installation, mothers and children walked an average of 4.2 km daily to retrieve turbid, parasite-laden river water. Children frequently missed elementary schooling due to severe gastrointestinal infections.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-[11px] font-semibold text-rose-700 border-t border-slate-100 flex items-center gap-1.5">
                <span>⚠ High risk of cholera, amoebiasis, and parasitic bilharzia</span>
              </div>
            </div>

            {/* After Card */}
            <div className="bg-white rounded-2xl border border-emerald-300 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 bg-slate-200 overflow-hidden">
                  <img
                    src="/images/hero_african_water_well_1793198749440.jpg"
                    alt="Children drinking clean borehole water"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    After: Pure Borehole Water
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Mechanized Solar Borehole Station
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Crystal-clear subterranean water pumped directly into stainless steel distribution taps right in the village square. Waterborne clinic visits drop by 88% within 90 days of commissioning.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-[11px] font-semibold text-emerald-700 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero pathogen presence · Tested to WHO drinking water guidelines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ghana Regional Impact Zones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                Regional Distribution
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
                Impact Zones Across Ghana
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Focusing resources where maternal and infant vulnerability or youth underemployment is highest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((reg, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-display">{reg.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{reg.focus}</p>
                  </div>
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-sm font-bold text-slate-900">{reg.boreholes}</span>
                    <span className="text-[10px] text-slate-500">Boreholes</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-sm font-bold text-slate-900">{reg.trainees}</span>
                    <span className="text-[10px] text-slate-500">Trainees</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-sm font-bold text-slate-900">{reg.scholars}</span>
                    <span className="text-[10px] text-slate-500">Scholars</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip with Lightbox Trigger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0F2942] font-display">
              Field Photo Archive
            </h3>
            <span className="text-xs text-slate-400">Click photo for high-res preview</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {gallery.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => onOpenLightbox(idx)}
                className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer"
              >
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#059669] text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold font-display">
              Help Bring Safe Water to Another Village
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Every borehole drilled saves dozens of young lives and restores thousands of school hours. Partner with us today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenDonateModal('proj-1')}
              className="px-6 py-3 bg-white text-emerald-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Sponsor a Borehole
            </button>
            <button
              onClick={() => onNavigate('volunteer')}
              className="px-6 py-3 border border-white/40 hover:bg-white/10 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
