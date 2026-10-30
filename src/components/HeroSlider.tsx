import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Droplets,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export interface HeroSlide {
  id: string;
  image: string;
  kicker: string;
  headline: string;
  subtext: string;
  projectId?: string;
  objectPosition?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-construction',
    image: '/images/hero_modern_architecture_1793349107851.jpg',
    kicker: 'Humanity For Habitat · Modern Construction',
    headline: 'BUILDING A BETTER TOMORROW',
    subtext:
      'Creating opportunities and helping communities build stronger foundations for the future through sustainable housing, quality civil engineering, and infrastructure development across Ghana.',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-water-crisis',
    image: '/images/hero_water_scarcity_1793349124145.jpg',
    kicker: 'Water Security Across Ghana',
    headline: 'CLEAN WATER. HEALTHIER COMMUNITIES.',
    subtext:
      'Working towards a future where every rural child and family can access safe, uncontaminated drinking water, eliminating waterborne diseases and long daily journeys.',
    projectId: 'proj-1',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-water-joy',
    image: '/images/hero_borehole_joy_1793349139405.jpg',
    kicker: 'Deep Aquifer Solar Systems',
    headline: 'LIFELONG HEALTH & LASTING DIGNITY',
    subtext:
      'Solar-mechanized boreholes delivering fresh, crystalline water directly into schools and villages—bringing smiles, restoring dignity, and creating permanent community self-reliance.',
    projectId: 'proj-1',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-education',
    image: '/images/hero_girl_education_1793349154660.jpg',
    kicker: 'Brighter Futures Initiative',
    headline: 'EDUCATE A GIRL. EMPOWER A GENERATION.',
    subtext:
      'Supporting ambitious girls with full secondary scholarships, learning materials, STEM mentorship, and dignity kits so every young woman can thrive and lead.',
    projectId: 'proj-3',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-training',
    image: '/images/hero_vocational_training_1793349168797.jpg',
    kicker: 'TVET Skills Development',
    headline: 'BUILDING SKILLS. CREATING OPPORTUNITIES.',
    subtext:
      'Supporting practical masonry, structural plumbing, and electrical skills to create sustainable pathways towards employment and entrepreneurship for Ghanaian youth.',
    objectPosition: 'object-center',
  },
];

const SLIDE_DURATION = 6500; // 6.5s automatic slide transition

interface HeroSliderProps {
  onNavigate: (view: any) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate, onOpenDonateModal }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlideIndex) return;
      setIsTransitioning(true);
      setCurrentSlideIndex((index + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentSlideIndex, isTransitioning, totalSlides]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentSlideIndex + 1);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlideIndex - 1);
  }, [currentSlideIndex, goToSlide]);

  // 100% Automatic slideshow loop
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides]);

  // Keyboard arrow controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative w-full bg-[#082238] overflow-hidden select-none" aria-label="Hero Slideshow">
      {/* =========================================================================
          1. MOBILE LAYOUT (< md screens): Image on Top, Bold Text Elegantly Below
      ========================================================================= */}
      <div className="md:hidden flex flex-col w-full">
        {/* Top Image Showcase (16:10 / 16:9 widescreen ratio, full clarity) */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 shadow-md">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={`mobile-img-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className={`w-full h-full object-cover ${slide.objectPosition || 'object-center'} transform transition-transform duration-[6500ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {/* Soft natural edge gradient so image stays vivid and unblocked */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#082238]/70 via-transparent to-black/20" />
              </div>
            );
          })}

          {/* Mobile Left & Right Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md shadow-lg active:scale-90 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md shadow-lg active:scale-90 transition-transform cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Text Content (Animated in sync with slide) */}
        <div className="bg-[#082238] px-5 py-6 sm:py-8 text-white">
          <div key={`mobile-content-${currentSlideIndex}`} className="animate-fade-in-up space-y-4">
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentSlide.kicker}</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight font-display text-white">
              {currentSlide.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {currentSlide.subtext}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => onOpenDonateModal(currentSlide.projectId || 'proj-1')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-sm"
              >
                <Droplets className="w-4 h-4 fill-white/30 text-white" />
                <span>Sponsor a Borehole</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F2942] hover:bg-[#133555] border border-white/30 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm"
              >
                <span>Our Projects</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP LAYOUT (md+ screens): Full Cinematic Widescreen Overlay
      ========================================================================= */}
      <div className="hidden md:flex relative min-h-[620px] lg:min-h-[700px] items-center">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={`desktop-img-${slide.id}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Image with Ken Burns animation */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className={`w-full h-full object-cover ${slide.objectPosition || 'object-center'} transform transition-transform duration-[6500ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Gradient scrims for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#082238]/95 via-[#082238]/85 md:via-[#082238]/70 to-transparent lg:w-3/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082238] via-black/40 to-black/20" />
            </div>
          );
        })}

        {/* Desktop Hero Content Box */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 w-full">
          <div className="max-w-2xl text-white space-y-6">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md shadow-lg shadow-emerald-950/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase font-display">
                {currentSlide.kicker}
              </span>
            </div>

            {/* Headline with animated entrance */}
            <div key={`desktop-headline-${currentSlideIndex}`} className="animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-display text-white drop-shadow-md text-balance">
                {currentSlide.headline}
              </h1>
            </div>

            {/* Supporting Copy */}
            <div key={`desktop-subtext-${currentSlideIndex}`} className="animate-fade-in-up">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl text-balance drop-shadow-xs">
                {currentSlide.subtext}
              </p>
            </div>

            {/* Desktop Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenDonateModal(currentSlide.projectId || 'proj-1')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base group"
              >
                <Droplets className="w-5 h-5 fill-white/30 text-white group-hover:scale-110 transition-transform" />
                <span>Sponsor a Borehole</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F2942]/90 hover:bg-[#0F2942] border border-white/30 hover:border-emerald-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base group"
              >
                <span>Our Projects</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Left / Right Arrow Controls */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-6 pointer-events-none">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="pointer-events-auto p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="pointer-events-auto p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
