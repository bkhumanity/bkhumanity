import React, { useState, useMemo } from 'react';
import { Project, ImpactStat, Testimonial, GalleryItem, FieldVideo } from '../types';
import { addNewsletterSubscriber, getBlogPosts } from '../services/storage';
import { FAQs } from '../components/FAQs';
import { VideoSection } from '../components/VideoSection';
import { HeroSlider } from '../components/HeroSlider';
import {
  Droplets,
  HardHat,
  GraduationCap,
  ArrowRight,
  Heart,
  Search,
  CheckCircle,
  ExternalLink,
  Users,
  HandHeart,
  Building2,
  Sparkles,
  BookOpen,
  Clock,
} from 'lucide-react';

interface HomeViewProps {
  projects: Project[];
  stats: ImpactStat[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  videos: FieldVideo[];
  onNavigate: (view: string, projectId?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
  onOpenLightbox: (index: number) => void;
  onPlayVideo: (video: FieldVideo) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  stats,
  testimonials,
  gallery,
  videos,
  onNavigate,
  onOpenDonateModal,
  onOpenLightbox,
  onPlayVideo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState<{ success: boolean; text: string } | null>(null);

  const latestArticles = useMemo(() => {
    return getBlogPosts().slice(0, 3);
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterMsg({ success: false, text: 'Please enter a valid email address.' });
      return;
    }
    const res = addNewsletterSubscriber(newsletterEmail);
    setNewsletterMsg({ success: res.success, text: res.message });
    if (res.success) setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* =========================================================================
          SECTION B: CINEMATIC MULTI-IMAGE HERO SHOWCASE
      ========================================================================= */}
      <HeroSlider onNavigate={onNavigate} onOpenDonateModal={onOpenDonateModal} />

      {/* =========================================================================
          SECTION C: IMPACT STATISTICS (With Count-Up & Demonstration Transparency)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
                Verified Community Footprint
              </h3>
              <p className="text-base font-bold text-[#0F2942] font-display">
                Delivering Measurable Change on the Ground
              </p>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              Demonstration baseline metrics · Configurable via Admin Dashboard
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] font-display tabular-nums">
                  {stat.value}
                  <span className="text-emerald-600 text-2xl font-bold ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-sm font-bold text-slate-800 font-display">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: OUR THREE PILLARS (Clean Water, Construction Training, Girls Education)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
            Our Three Pillars
          </h2>
          <p className="text-sm text-slate-600">
            A holistic humanitarian model targeting foundational community survival, economic self-reliance, and generational education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Clean Water */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              {/* Pillar Icon Emblem matching reference */}
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto text-sky-600 group-hover:scale-105 transition-transform">
                <Droplets className="w-8 h-8 fill-sky-500 text-sky-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[#0F2942] font-display">
                  Clean Water
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Installing boreholes and water purification systems to provide safe, clean drinking water to rural communities, eradicating preventable waterborne disease.
                </p>
              </div>

              {/* Bullet Highlights */}
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Deep borehole drilling (80–120m aquifers)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Solar-powered pumping & multi-tap stations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Community WATSAN maintenance training</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onOpenDonateModal('proj-1')}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Support Clean Water</span>
              </button>
            </div>
          </div>

          {/* Pillar 2: Construction Training */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              {/* Pillar Icon Emblem matching reference */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 group-hover:scale-105 transition-transform">
                <HardHat className="w-8 h-8 text-emerald-700" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[#0F2942] font-display">
                  Construction Training
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vocational training programs empowering youth with practical construction skills, safety certification, and mentorship for sustainable livelihoods and jobs.
                </p>
              </div>

              {/* Bullet Highlights */}
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Masonry, bricklaying & compressed earth blocks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Carpentry, plumbing & electrical certifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Free professional starter artisan toolkits</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onOpenDonateModal('proj-2')}
                className="w-full py-2.5 px-4 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Support Training</span>
              </button>
            </div>
          </div>

          {/* Pillar 3: Girl Child Education */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              {/* Pillar Icon Emblem matching reference */}
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto text-teal-600 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-8 h-8 text-teal-700" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[#0F2942] font-display">
                  Girl Child Education
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scholarships, school supplies, menstrual hygiene dignity kits, and STEM mentorship programs to help young girls stay in school and achieve their full potential.
                </p>
              </div>

              {/* Bullet Highlights */}
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Full Senior High School & vocational tuition grants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Solar study lamps & textbooks for rural homes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Monthly hygiene packs preventing school absenteeism</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onOpenDonateModal('proj-3')}
                className="w-full py-2.5 px-4 bg-[#0D828A] hover:bg-[#0B6E75] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Support Education</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: OUR IMPACT IN ACTION (Community Gallery Strip from Reference)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-8 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
              Our Impact In Action
            </h2>
            <p className="text-xs text-slate-500">
              Real stories and documentary photographic evidence from the rural communities we serve. Click any photo to inspect in full-screen.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {gallery.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => onOpenLightbox(idx)}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <div className="aspect-4/3 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase block tracking-wider truncate">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">
                    {item.title}
                  </span>
                </div>
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: FEATURED PROJECTS (Showcase with Filter & Verified Raised Bar)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
              Active Programs & Field Initiatives
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
              Featured Projects
            </h2>
          </div>

          {/* Category Filter Tabs & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-44"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
              {['All', 'Clean Water', 'Construction Training', 'Girl Child Education'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0F2942] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All Projects' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const percentage = Math.min(
              100,
              Math.round((project.raisedAmountGHS / project.goalAmountGHS) * 100)
            );

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-800 shadow-xs">
                      {project.status}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700">{project.category}</span>
                      <span>·</span>
                      <span>{project.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F2942] font-display leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Funding Progress Bar */}
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 tabular-nums">
                          GH₵{project.raisedAmountGHS.toLocaleString()}{' '}
                          <span className="text-slate-400 font-normal">raised</span>
                        </span>
                        <span className="font-semibold text-slate-500 tabular-nums">
                          Goal: GH₵{project.goalAmountGHS.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-right font-bold text-emerald-700">
                        {percentage}% Funded
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('project-detail', project.id)}
                    className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                  >
                    View Project
                  </button>
                  <button
                    onClick={() => onOpenDonateModal(project.id)}
                    className="flex-1 py-2 px-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white/20" />
                    <span>Donate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION G: OUR STORY & MISSION (Authentic Non-Profit Purpose)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2942] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Our Mission & Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
                Rooted in Community Ownership, Built for Lifelong Sustainability
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                BK Construction — Humanity For Habitat NGO was founded on the conviction that a durable shelter is only as strong as the human community it protects. By uniting physical infrastructure (clean water boreholes), human capital development (vocational construction academies), and equitable opportunity (girl child scholarships), we build self-sustaining ecosystems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dual operational coordination in Accra, Ghana and Washington, D.C.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Democratic local Water Committees overseeing lifelong maintenance</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct tuition disbursement to accredited Ghanaian senior high schools</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Public audit trails and transparent financial allocation</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0F2942] hover:bg-slate-100 font-bold rounded-lg text-sm transition-all cursor-pointer"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-4/3">
                <img
                  src="/images/community_borehole_celebration_1793198752184.jpg"
                  alt="Ghanaian village elders and mothers celebrating new clean water well"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: BENEFICIARY STORIES & TESTIMONIALS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
            Voices from the Field
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
            Stories of Transformation
          </h2>
          <p className="text-xs text-slate-500">
            Initial illustrative beneficiary accounts from community participants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-amber-500 text-base">★★★★★</div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{t.story}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                <p className="text-xs text-emerald-700 font-medium">{t.role}</p>
                <p className="text-[11px] text-slate-400">{t.community}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FIELD VIDEOS SECTION (Impact in Motion)
      ========================================================================= */}
      <VideoSection videos={videos} onPlayVideo={onPlayVideo} />

      {/* =========================================================================
          FAQS SECTION (Frequently Asked Questions)
      ========================================================================= */}
      <FAQs onNavigate={onNavigate} onOpenDonateModal={onOpenDonateModal} />

      {/* =========================================================================
          SECTION I: GET INVOLVED (4 Action Cards)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
            Get Involved With Our Mission
          </h2>
          <p className="text-xs text-slate-600">
            Whether through personal sponsorship, on-the-ground volunteering, or corporate partnership, your involvement creates generational change.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Make a Donation */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-emerald-600/30" />
              </div>
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Make a Donation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directly fund borehole drilling kits, vocational apprentice tools, or secondary school tuition.
              </p>
            </div>
            <button
              onClick={() => onOpenDonateModal()}
              className="mt-6 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Donate Now
            </button>
          </div>

          {/* Card 2: Volunteer With Us */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Volunteer With Us
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join our field logistics teams in Ghana or support communications and mentorship remotely.
              </p>
            </div>
            <button
              onClick={() => onNavigate('volunteer')}
              className="mt-6 w-full py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Apply to Volunteer
            </button>
          </div>

          {/* Card 3: Become a Partner */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Become a Partner
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corporate CSR initiatives, institutional grants, and international engineering alliances.
              </p>
            </div>
            <button
              onClick={() => onNavigate('volunteer')}
              className="mt-6 w-full py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Partner Inquiry
            </button>
          </div>

          {/* Card 4: Sponsor a Borehole */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Sponsor a Borehole
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicate a complete community borehole well with a personalized dedication plaque for your family or organization.
              </p>
            </div>
            <button
              onClick={() => onOpenDonateModal('proj-1')}
              className="mt-6 w-full py-2 bg-[#0F2942] hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Sponsor Today
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION I.2: FIELD STORIES & EDUCATIONAL DISPATCHES
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Field Reports & Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
              Stories of Impact & Educational Dispatches
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              In-depth articles from our hydrologists, vocational instructors, and education coordinators on the ground in Ghana.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate('blog-detail', article.slug)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#0F2942]/90 backdrop-blur-xs text-white text-[10px] font-bold rounded">
                  {article.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.readTimeMinutes} min read</span>
                    <span>&bull;</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F2942] group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">
                    {article.author.name}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION J: NEWSLETTER SUBSCRIPTION (Validated with Feedback)
      ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-10 border border-slate-200/80 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F2942] font-display">
            Stay Connected with Field Updates
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Subscribe to our quarterly humanitarian digest featuring borehole water testing results, student graduation stories, and new community initiatives.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          {newsletterMsg && (
            <p className={`text-xs font-semibold ${newsletterMsg.success ? 'text-emerald-700' : 'text-rose-600'}`}>
              {newsletterMsg.text}
            </p>
          )}

          <p className="text-[10px] text-slate-400">
            We respect your privacy. No spam. You may unsubscribe anytime with one click.
          </p>
        </div>
      </section>
    </div>
  );
};
