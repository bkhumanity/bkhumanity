import React, { useEffect } from 'react';
import { X, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { FieldVideo } from '../types';

interface VideoModalProps {
  video: FieldVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  // Extract embed URL
  const getEmbedInfo = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      };
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return {
        type: 'vimeo',
        src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      };
    }

    // Direct MP4 / WebM
    if (url.match(/\.(mp4|webm|ogg)($|\?)/i)) {
      return {
        type: 'html5',
        src: url,
      };
    }

    // Fallback: embed if contains embed or treat as iframe
    return {
      type: 'iframe',
      src: url,
    };
  };

  const embedInfo = getEmbedInfo(video.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/95 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              {video.category}
            </span>
            <h3 className="text-white font-semibold text-sm sm:text-base truncate">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-3"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {embedInfo.type === 'html5' ? (
            <video
              src={embedInfo.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={embedInfo.src}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* Video Details & Meta */}
        <div className="p-4 sm:p-5 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="text-slate-300 leading-relaxed max-w-2xl text-xs sm:text-sm">
              {video.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {video.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {video.date}
              </span>
              {video.duration && (
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  Duration: {video.duration}
                </span>
              )}
            </div>
          </div>

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors shrink-0 self-start sm:self-center"
          >
            <span>Open in Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
