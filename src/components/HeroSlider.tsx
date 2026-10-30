import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Droplets,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Building2,
  GraduationCap,
  Wrench,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export interface HeroSlide {
  id: string;
  image: string;
  category: string;
  kicker: string;
  headline: string;
  subtext: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaText?: string;
  ctaAction?: 'donate' | 'projects';
  projectId?: string;
  objectPosition?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-construction',
    image: '/images/hero_modern_architecture_1793349107851.jpg',
    category: 'Real Estate & Infrastructure',
    kicker: 'Humanity For Habitat · Modern Construction',
    headline: 'BUILDING A BETTER TOMORROW',
    subtext:
      'Creating opportunities and helping communities build stronger foundations for the future through sustainable housing, quality civil engineering, and infrastructure development across Ghana.',
    tag: 'Sustainable Housing & Civil Works',
    icon: Building2,
    ctaText: 'Explore Our Projects',
    ctaAction: 'projects',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-water-crisis',
    image: '/images/hero_water_scarcity_1793349124145.jpg',
    category: 'Rural Water Security',
    kicker: 'Water Security Across Ghana',
    headline: 'CLEAN WATER. HEALTHIER COMMUNITIES.',
    subtext:
      'Working towards a future where every rural child and family can access safe, uncontaminated drinking water, eliminating waterborne diseases and long daily journeys.',
    tag: 'Urgent Rural Water Need',
    icon: Droplets,
    ctaText: 'Sponsor a Borehole',
    ctaAction: 'donate',
    projectId: 'proj-1',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-water-joy',
    image: '/images/hero_borehole_joy_1793349139405.jpg',
    category: 'Clean Water in Action',
    kicker: 'Deep Aquifer Solar Systems',
    headline: 'LIFELONG HEALTH & LASTING DIGNITY',
    subtext:
      'Solar-mechanized boreholes delivering fresh, crystalline water directly into schools and villages—bringing smiles, restoring dignity, and creating permanent community self-reliance.',
    tag: 'Flowing Boreholes In Action',
    icon: Droplets,
    ctaText: 'Sponsor a Borehole',
    ctaAction: 'donate',
    projectId: 'proj-1',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-education',
    image: '/images/hero_girl_education_1793349154660.jpg',
    category: "Girl-Child Education",
    kicker: 'Brighter Futures Initiative',
    headline: 'EDUCATE A GIRL. EMPOWER A GENERATION.',
    subtext:
      'Supporting ambitious girls with full secondary scholarships, learning materials, STEM mentorship, and dignity kits so every young woman can thrive and lead.',
    tag: "Girls' Education & STEM Grants",
    icon: GraduationCap,
    ctaText: 'Fund a Scholarship',
    ctaAction: 'donate',
    projectId: 'proj-3',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-training',
    image: '/images/hero_vocational_training_1793349168797.jpg',
    category: 'Vocational Training',
    kicker: 'TVET Skills Development',
    headline: 'BUILDING SKILLS. CREATING OPPORTUNITIES.',
    subtext:
      'Supporting practical masonry, structural plumbing, and electrical skills to create sustainable pathways towards employment and entrepreneurship for Ghanaian youth.',
    tag: 'Certified Apprenticeship Trades',
    icon: Wrench,
    ctaText: 'View Training Academy',
    ctaAction: 'projects',
    objectPosition: 'object-center',
  },
];

const SLIDE_DURATION = 7000; // 7 seconds per slide

interface HeroSliderProps {
  onNavigate: (view: any) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate, onOpenDonateModal }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlideIndex) return;
      setIsTransitioning(true);
      setCurrentSlideIndex((index + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [currentSlideIndex, isTransitioning, totalSlides]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentSlideIndex + 1);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlideIndex - 1);
  }, [currentSlideIndex, goToSlide]);

  // Autoplay effect
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides, currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative w-full bg-[#082238] overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="BK Construction & Humanity For Habitat Hero Showcase"
    >
      {/* Slides Container */}
      <div className="relative min-h-[620px] sm:min-h-[660px] lg:min-h-[720px] flex items-center">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Image with Ken Burns subtle scale animation */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className={`w-full h-full object-cover ${slide.objectPosition || 'object-center'} transform transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Cinematic Multi-Layered Overlays */}
              {/* 1. Primary Left Scrim: Deeper navy for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#082238]/95 via-[#082238]/85 md:via-[#082238]/70 to-transparent lg:w-3/5" />
              {/* 2. Bottom Scrim: Anchors slide controls and stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#082238] via-black/40 to-black/20" />
              {/* 3. Ambient Blue/Emerald subtle radial glow */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          );
        })}

        {/* Hero Content Box with Animated Entrance */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          <div className="max-w-2xl text-white space-y-6">
            {/* 3D-Style Perspective Brand Pill & Category Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md shadow-lg shadow-emerald-950/30 transition-all duration-500 transform hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase font-display">
                  {currentSlide.kicker}
                </span>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-xs text-slate-300 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {currentSlide.category}
              </span>
            </div>

            {/* Main Headline with dynamic key update */}
            <div key={`headline-${currentSlideIndex}`} className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-display text-white drop-shadow-md text-balance">
                {currentSlide.headline}
              </h1>
            </div>

            {/* Supporting Copy */}
            <div key={`subtext-${currentSlideIndex}`} className="animate-fade-in-up">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl text-balance drop-shadow-xs">
                {currentSlide.subtext}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenDonateModal(currentSlide.projectId || 'proj-1')}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base group"
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

            {/* Slide Quick-Fact Pill & Field Trust */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">100% of public borehole donations fund field drilling materials</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="inline-flex items-center gap-1.5 text-emerald-300/90 font-semibold">
                <span>Theme:</span>
                <span className="underline decoration-emerald-500/50 underline-offset-2">{currentSlide.tag}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-6 pointer-events-none">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Bottom Slide Navigation Bar & Dynamic Thumbnail Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Slide Indicators with Progress Fill */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {HERO_SLIDES.map((slide, idx) => {
                const isSelected = idx === currentSlideIndex;
                const IconComponent = slide.icon;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${slide.headline}`}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 text-white border border-emerald-400/40 shadow-sm'
                        : 'bg-black/30 hover:bg-black/50 text-slate-300 border border-white/10 hover:text-white'
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    <span className="hidden md:inline font-display whitespace-nowrap">
                      {slide.category}
                    </span>
                    <span className="md:hidden font-mono text-[11px]">0{idx + 1}</span>

                    {/* Active slide progress bar indicator */}
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full overflow-hidden">
                        <span
                          className={`block h-full bg-emerald-300 ${
                            isPaused ? 'w-full' : 'animate-hero-progress'
                          }`}
                          style={{
                            animationDuration: `${SLIDE_DURATION}ms`,
                          }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls: Play/Pause toggle & Slide counter */}
            <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-slate-300">
              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-xs transition-colors cursor-pointer text-slate-300 hover:text-white"
                title={isPaused ? 'Resume autoplay' : 'Pause on current slide'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px]">Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-[11px]">Pause</span>
                  </>
                )}
              </button>

              <div className="font-mono text-[11px] text-slate-400 px-2 py-0.5 rounded bg-black/30 border border-white/10">
                <span className="text-emerald-400 font-bold">{currentSlideIndex + 1}</span> / {totalSlides}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
