import React, { useState } from 'react';
import { Testimonial, GalleryItem, FieldVideo, Project } from '../types';
import {
  Quote,
  Heart,
  Play,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Share2,
  Check,
  Calendar,
  Layers,
} from 'lucide-react';

interface StoriesViewProps {
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  videos: FieldVideo[];
  projects: Project[];
  onNavigate: (view: string, idOrSlug?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
  onOpenLightbox: (index: number) => void;
  onPlayVideo: (video: FieldVideo) => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  testimonials,
  gallery,
  videos,
  projects,
  onNavigate,
  onOpenDonateModal,
  onOpenLightbox,
  onPlayVideo,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // In-depth verified community field stories
  const featuredStories = [
    {
      id: 'story-amina',
      title: 'Amina’s Dream: From Trekking for Water to Studying Structural Engineering',
      category: 'Girl Child Education',
      location: 'Savelugu, Northern Region',
      date: 'March 2026',
      readTime: '4 min read',
      leadQuote: '“When the scholarship letter arrived, my mother danced in the compound. Today I am studying Physics, Chemistry, and Elective Maths.”',
      body: `Before BK Construction arrived in our village, seventeen-year-old Amina woke up at 4:30 AM every morning. Along with her sisters, she walked three miles to a muddy seasonal dam to haul 25 liters of water in a yellow container before getting ready for junior high school.

Her father, a subsistence groundnut farmer, had already informed her that she would have to stop schooling after JHS 3 due to the crushing expense of Senior High School boarding house items, mattresses, and textbooks.

Through the BK Humanity Brighter Futures Scholarship, Amina received full tuition coverage, a government-approved textbook package, termly menstrual health dignity kits, and solar study tablet. Today, Amina ranks 2nd in her cohort of 180 students in Savelugu and aspires to design climate-resilient rural bridges as a civil engineer.`,
      imageUrl: '/images/project_girl_child_education_1793198758731.jpg',
      impactMetrics: ['100% Tuition & Boarding Funded', 'Straight A’s in Elective Science', 'Zero School Days Missed'],
      relatedProjectId: 'proj-3',
    },
    {
      id: 'story-adaklu-mothers',
      title: 'The Women of Adaklu: How Pure Water Restored Dignity & Ended Clinic Queues',
      category: 'Clean Water',
      location: 'Adaklu Kpetoe, Volta Region',
      date: 'February 2026',
      readTime: '5 min read',
      leadQuote: '“For over twenty years, our clinic was crowded with children suffering from waterborne amoebiasis. Today, the taps flow right in our town center.”',
      body: `In Adaklu Kpetoe, the rainy season brought contaminated surface runoff, while the dry Harmattan season dried up streams into stagnant breeding pools for schistosoma and typhoid. Mothers like Mama Akosua Dzifa spent hours boiling muddy water over firewood while nursing sick children.

In early 2026, BK Construction’s hydrogeological team drilled 95 meters into the subterranean bedrock, installing a solar-powered submersible pump and a 12,000-liter overhead storage tower with multi-tap distribution heads. 

Within ninety days of commissioning, local health centers recorded an 84% reduction in pediatric waterborne clinic visits, while daily water collection time plummeted from 3.5 hours to under 6 minutes.`,
      imageUrl: '/images/hero_african_water_well_1793198749440.jpg',
      impactMetrics: ['3,200 Daily Beneficiaries', '84% Drop in Waterborne Illness', '6 Taps Powered by Solar'],
      relatedProjectId: 'proj-1',
    },
    {
      id: 'story-kwame-craftsman',
      title: 'Kwame’s New Foundation: How a Tool Kit & Masonry Training Built a Business',
      category: 'Construction Training',
      location: 'Amasaman, Greater Accra',
      date: 'January 2026',
      readTime: '4 min read',
      leadQuote: '“I thought construction was just carrying heavy blocks until BK taught us blueprint reading and foundation physics. Now I employ eight people.”',
      body: `Kwame Mensah spent two long years sitting at roadside taxi ranks in Amasaman after finishing senior high school, with no financial means to enter university and no certified technical trade.

When BK Construction launched the Youth Vocational Masonry Academy, Kwame was selected for the intensive 9-month apprenticeship. He mastered laser level alignment, reinforced concrete column casting, and Interlocking Compressed Earth Bricks (CSEB).

Upon graduation, Kwame was awarded a complete professional artisan toolkit. Today, he manages his own registered contracting crew, laying residential foundations across Pokuase and Amasaman while funding the education of his three younger siblings.`,
      imageUrl: '/images/project_construction_training_1793198750855.jpg',
      impactMetrics: ['COTVET Certified Artisan', 'Employs 8 Local Youths', 'GHS 250+ Daily Earning Power'],
      relatedProjectId: 'proj-2',
    },
  ];

  const handleShareStory = (title: string, id: string) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Read this inspiring grassroots story from BK Construction NGO: ${title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const categories = ['All', 'Clean Water', 'Girl Child Education', 'Construction Training'];

  const filteredFeaturedStories = activeCategory === 'All'
    ? featuredStories
    : featuredStories.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0F2942] via-[#14375A] to-[#0A1D30] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Lives · Real Transformations</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
              Voices From The Field: Community Stories
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every borehole drilled, every scholarship awarded, and every young mason trained represents an individual human life lifted out of hardship. Here are the firsthand voices of the people you empower across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0F2942] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium px-2">
            Showing <strong className="text-slate-900">{filteredFeaturedStories.length}</strong> featured dispatch{filteredFeaturedStories.length !== 1 ? 'es' : ''}
          </div>
        </div>
      </section>

      {/* Featured In-Depth Field Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredFeaturedStories.map((story, idx) => (
          <article
            key={story.id}
            className={`bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col lg:flex-row ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Story Visual */}
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-slate-100 overflow-hidden">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0F2942]/90 backdrop-blur text-white shadow-sm">
                  {story.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 backdrop-blur text-white shadow-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {story.location}
                </span>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {story.date}
                  </span>
                  <span>{story.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display leading-tight">
                  {story.title}
                </h2>

                {/* Highlight Quote */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-950 text-sm italic font-medium relative">
                  <Quote className="w-5 h-5 text-amber-500/40 absolute top-2 right-2" />
                  {story.leadQuote}
                </div>

                {/* Story Body */}
                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                  {story.body}
                </div>

                {/* Impact Metrics Badges */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Verified Outcomes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {story.impactMetrics.map((metric, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onOpenDonateModal(story.relatedProjectId)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support Similar Impact</span>
                </button>

                <button
                  onClick={() => handleShareStory(story.title, story.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedId === story.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-slate-500" />
                      <span>Share Story</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Before & After Visual Transformations */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-display">
              Visual Transparency
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942] font-display">
              Before & After Community Transformation
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              See the direct physical contrast when clean, pressurized water replaces open muddy ponds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gallery
              .filter((g) => g.beforeImageUrl)
              .map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                        <img
                          src={item.beforeImageUrl}
                          alt="Before condition"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-extrabold uppercase">
                          Before
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Stagnant surface river with bilharzia risk
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                        <img
                          src={item.imageUrl}
                          alt="After condition"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-extrabold uppercase">
                          After
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        95m deep solar borehole delivering pure water
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-[#0F2942]">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{item.subtitle}</p>
                    {item.comparisonNote && (
                      <p className="text-xs font-semibold text-emerald-700 mt-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                        {item.comparisonNote}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Direct Testimonials Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-display">
            Direct Quotes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942] font-display">
            Community Elders, Mothers & Youth Speak
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Quote className="w-5 h-5" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{test.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-[#0F2942]">{test.name}</h4>
                <p className="text-xs text-slate-500">{test.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{test.community}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Field Video Stories */}
      {videos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-display">
                Field Video Reports
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] font-display">
                Watch Our Teams in Action
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => onPlayVideo(vid)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-white text-[11px] font-medium">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
                    {vid.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#0F2942] line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2942] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Be Part of the Next Success Story
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every donation goes directly toward clean borehole systems, certified vocational toolkits, and secondary scholarships with complete transparency.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenDonateModal()}
              className="px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Make an Impact</span>
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <span>Read Our Blog & Research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
