import React, { useState } from 'react';
import { Play, MapPin, Calendar, Film, Sparkles } from 'lucide-react';
import { FieldVideo } from '../types';

interface VideoSectionProps {
  videos: FieldVideo[];
  onPlayVideo: (video: FieldVideo) => void;
  title?: string;
  subtitle?: string;
}

export function VideoSection({
  videos,
  onPlayVideo,
  title = "Stories From The Field: Impact in Motion",
  subtitle = "Documentary footage, community celebrations, and firsthand voices showing how your contributions transform daily life across Ghana."
}: VideoSectionProps) {
  const [selectedPillar, setSelectedPillar] = useState<string>('all');

  const filteredVideos = selectedPillar === 'all'
    ? videos
    : videos.filter((v) => v.pillar === selectedPillar);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="field-videos">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>Video Documentation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'water', label: 'Clean Water' },
              { id: 'construction', label: 'Vocational Skills' },
              { id: 'education', label: 'Girl Child' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setSelectedPillar(pill.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedPillar === pill.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onPlayVideo(video)}
              className="group cursor-pointer bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback thumbnail if custom image not loaded
                    (e.target as HTMLImageElement).src = '/images/hero-community.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-md font-mono font-medium border border-slate-700/60">
                    {video.duration}
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow">
                  {video.category}
                </div>
              </div>

              {/* Card Meta & Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {video.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {video.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Watch Video Story
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
