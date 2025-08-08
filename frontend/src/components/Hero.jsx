
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col sm:flex-row border border-gray-100 overflow-hidden min-h-[440px] shadow-2xl rounded-3xl bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 rounded-3xl"
        src={assets.hero_bg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 rounded-3xl pointer-events-none" />

      {/* Content */}
      <div className="w-full relative min-h-[440px] flex items-center justify-center z-20">
        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-full px-4 flex flex-col items-center">
          {/* Removed Latest Arrivals badge */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center leading-tight mb-2 drop-shadow-xl text-white">
            <span className="inline-block text-base sm:text-lg md:text-xl font-extrabold tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{letterSpacing:'0.08em'}}>
              OWN IT
            </span>
            <span className="inline-block text-blue-400 px-0.5 text-base sm:text-lg md:text-xl font-extrabold align-middle">|</span>
            <span className="inline-block text-base sm:text-lg md:text-xl font-extrabold tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{letterSpacing:'0.08em'}}>
              RENT IT
            </span>
            <span className="inline-block text-blue-400 px-0.5 text-base sm:text-lg md:text-xl font-extrabold align-middle">|</span>
            <span className="inline-block text-base sm:text-lg md:text-xl font-extrabold tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{letterSpacing:'0.08em'}}>
              TRY IT
            </span>
          </h2>
          <div className="flex justify-center mb-2">
            <span className="block w-24 h-1 rounded-full bg-white/80" />
          </div>
          <p className="text-base sm:text-lg text-gray-100 font-medium text-center mt-1 mb-1 drop-shadow-lg">
            New Season, New Vibe. Trending Now in Store. Best Deals on Fashion.
          </p>
          <p className="text-lg sm:text-xl font-bold text-gray-200 text-center tracking-wide mb-3 drop-shadow-xl uppercase">
            Your Style, Your Way <span className="text-blue-300">with Aruzz</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4">
          <button
            className="font-semibold text-xs px-3 py-1 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-700 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => navigate('/collection')}
          >
            SHOP NOW
          </button>
          <a
            href="https://wa.me/919322465522?text=I%20want%20to%20rent%20a%20product%20from%20Aruzz%20Clothing."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-xs px-3 py-1 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z"/></svg>
            Rent Now
          </a>
          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20book%20an%20appointment%20with%20Aruzz%20Clothing."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-xs px-3 py-1 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-500 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
