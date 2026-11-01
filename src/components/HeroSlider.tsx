import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Droplets,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { HeroSlide } from '../types';
import { getHeroSlides, subscribeToStore } from '../services/storage';

interface HeroSliderProps {
  slides?: HeroSlide[];
  onNavigate: (view: any, projectId?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides: propSlides,
  onNavigate,
  onOpenDonateModal,
}) => {
  const [slides, setSlides] = useState<HeroSlide[]>(propSlides || getHeroSlides());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with store updates if not passed directly via props
  useEffect(() => {
    if (propSlides) {
      setSlides(propSlides);
      return;
    }
    const unsub = subscribeToStore(() => {
      setSlides(getHeroSlides());
    });
    return unsub;
  }, [propSlides]);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlideIndex || totalSlides === 0) return;
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

  // Clean automatic picture slideshow transition (every 6 seconds)
  useEffect(() => {
    if (totalSlides === 0) return;

    timerRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!currentSlide) return null;

  return (
    <section
      className="relative w-full bg-[#082238] overflow-hidden select-none"
      aria-label="BK Humanity Project Showcase"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Mission Copy, Dynamic Headline, Subtext & Action Buttons
          ========================================================================= */}
          <div className="lg:col-span-6 text-white space-y-6 z-10">
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md shadow-lg shadow-emerald-950/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase font-display">
                {currentSlide.kicker}
              </span>
            </div>

            {/* Headline */}
            <div key={`headline-${currentSlideIndex}`} className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.14] font-display text-white text-balance drop-shadow-sm">
                {currentSlide.headline}
              </h1>
            </div>

            {/* Subtext */}
            <div key={`subtext-${currentSlideIndex}`} className="animate-fade-in-up">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal text-balance">
                {currentSlide.subtext}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenDonateModal(currentSlide.projectId || 'proj-1')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base group"
              >
                <Droplets className="w-5 h-5 fill-white/30 text-white group-hover:scale-110 transition-transform" />
                <span>Support This Project</span>
              </button>

              <button
                onClick={() => {
                  if (currentSlide.projectId) {
                    onNavigate('project-detail', currentSlide.projectId);
                  } else {
                    onNavigate('projects');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F2942] hover:bg-[#133555] border border-white/30 hover:border-emerald-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base group"
              >
                <span>Explore Initiative</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Slide Navigation Dots */}
            <div className="pt-4 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={`slide-dot-${idx}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-emerald-400 shadow-md shadow-emerald-400/50'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
              <span className="ml-3 text-xs text-slate-400 font-mono">
                {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Pristine Sliding Picture Frame (Pure Photographs Only)
          ========================================================================= */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/15 ring-1 ring-white/10 bg-slate-900 group">
              {slides.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <div
                    key={`hero-img-${slide.id}`}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <img
                      src={slide.mediaUrl}
                      alt={slide.headline}
                      className={`w-full h-full object-cover ${slide.objectPosition || 'object-center'} transform transition-transform duration-[6000ms] ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                );
              })}

              {/* Previous / Next Arrow Controls */}
              <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-4 pointer-events-none">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-black/45 hover:bg-black/75 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-black/45 hover:bg-black/75 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
