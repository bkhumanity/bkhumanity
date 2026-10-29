import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={onPrev}
        className="absolute left-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden sm:block"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <div className="relative overflow-hidden rounded-xl bg-black shadow-2xl max-h-[70vh] flex items-center justify-center">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Caption */}
        <div className="text-center mt-4 text-white max-w-xl">
          <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            {currentItem.category}
          </span>
          <h4 className="text-lg font-bold font-display mt-0.5">{currentItem.title}</h4>
          <p className="text-xs text-slate-300 mt-1">{currentItem.subtitle}</p>
          {currentItem.comparisonNote && (
            <p className="text-[11px] text-amber-300 font-mono mt-2 bg-black/40 py-1 px-3 rounded-md inline-block">
              {currentItem.comparisonNote}
            </p>
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden sm:block"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
