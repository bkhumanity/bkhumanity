import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '', size = 'md' }) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* House & Droplet SVG Emblem matching the reference image */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* House Roof - Emerald / Forest Green */}
          <path
            d="M32 6L6 28H14V52H50V28H58L32 6Z"
            stroke="#059669"
            strokeWidth="4"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner Water Droplet - Vibrant Cyan / Cerulean */}
          <path
            d="M32 18C32 18 24 28 24 35C24 39.4183 27.5817 43 32 43C36.4183 43 40 39.4183 40 35C40 28 32 18 32 18Z"
            fill="#0284C7"
          />
          {/* Droplet Highlight */}
          <path
            d="M29 32C28 34 28 37 30 39"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Flowing Water Wave Foundation */}
          <path
            d="M8 56C16 52 24 58 32 55C40 52 48 58 56 55"
            stroke="#0EA5E9"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M12 60C20 57 28 62 36 59C44 57 52 61 58 59"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none uppercase font-display ${titleSizes[size]} ${
            isDark ? 'text-white' : 'text-[#0F2942]'
          }`}
        >
          BK CONSTRUCTION
        </span>
        <span
          className={`font-bold tracking-wider leading-tight uppercase mt-0.5 ${subtitleSizes[size]} ${
            isDark ? 'text-emerald-400' : 'text-[#0D828A]'
          }`}
        >
          HUMANITY FOR HABITAT NGO
        </span>
      </div>
    </div>
  );
};
