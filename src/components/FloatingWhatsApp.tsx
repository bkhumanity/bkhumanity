import React, { useState } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappNumber,
  defaultMessage = 'Hello BK Construction Humanity For Habitat NGO, I would like to inquire about your humanitarian programs.',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Clean the number so only digits remain
  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '') || '233241234567';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-90 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-xs"
        >
          <path d="M12.031 2C6.495 2 2 6.486 2 12.012c0 1.954.563 3.774 1.536 5.32L2 22l4.834-1.503A9.97 9.97 0 0 0 12.031 22C17.568 22 22 17.514 22 12.012 22 6.486 17.568 2 12.031 2zm5.794 14.28c-.244.686-1.42 1.309-1.956 1.391-.497.075-1.127.108-3.327-.803-2.617-1.085-4.29-3.766-4.42-3.94-.131-.174-1.058-1.41-1.058-2.689 0-1.28.669-1.91 0.908-2.17.239-.261.524-.326.699-.326.175 0 .349.002.5.01.162.008.38-.061.593.452.221.532.756 1.846.822 1.98.065.133.109.289.022.463-.087.174-.131.282-.261.434-.131.152-.275.34-.392.457-.131.13-.268.271-.115.532.152.261.678 1.117 1.455 1.808 1.002.89 1.847 1.167 2.108 1.297.261.13.414.108.567-.066.153-.174.654-.761.829-1.022.174-.261.349-.217.589-.13.24.087 1.526.719 1.787.85.261.13.436.195.5.304.066.109.066.63-.178 1.316z" />
        </svg>
      </a>
    </div>
  );
};
