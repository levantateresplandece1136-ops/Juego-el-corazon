import React from 'react';
import { soundEngine } from '../audio/soundEngine';

interface SplashViewProps {
  onStart: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onStart }) => {
  const handleFullscreen = () => {
    soundEngine.playSFX('click');
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-20 select-none animate-fadeIn">
      {/* Decorative Ancient Seal */}
      <div className="relative w-56 h-56 sm:w-72 sm:h-72 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/60" />
        <div className="absolute inset-3 rounded-full border border-dashed border-[#8b5a2b] animate-slow-spin" />
        <div className="absolute inset-8 rounded-full border-2 border-[#e9c96a] animate-slow-spin-reverse opacity-80" />
        
        {/* Glowing Heart Gem Core */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-radial from-[#e9c96a] via-[#8b5a2b] to-[#1a140c] shadow-[0_0_50px_rgba(212,175,55,0.7)] animate-pulse-glow flex items-center justify-center">
          <span className="text-4xl sm:text-5xl text-[#fff] drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
            ◈
          </span>
        </div>
      </div>

      <div className="text-xs sm:text-sm font-cinzel tracking-[0.35em] text-[#8b5a2b] uppercase mb-2">
        Una Expedición Familiar Cinematográfica
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black text-gold-glow mb-4 leading-tight">
        El Corazón de Aurelia
      </h1>

      <p className="max-w-xl text-base sm:text-lg italic text-[#f5e6c8] mb-8 font-serif leading-relaxed drop-shadow">
        Cinco cristales. Cinco virtudes. Una familia unida capaz de desvelar el tesoro milenario.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={() => {
            soundEngine.init();
            soundEngine.resume();
            soundEngine.playSFX('campana');
            onStart();
          }}
          className="gold-btn w-full sm:w-auto px-8 py-3.5 text-base font-cinzel font-bold tracking-widest uppercase rounded cursor-pointer"
        >
          Comenzar la aventura
        </button>

        <button
          onClick={handleFullscreen}
          className="w-full sm:w-auto px-6 py-3 text-xs font-cinzel tracking-wider uppercase border border-[#5c3a1a] text-[#8b5a2b] hover:text-[#d4af37] hover:border-[#8b5a2b] rounded transition-colors"
        >
          Pantalla Completa
        </button>
      </div>

      <p className="text-xs text-[#8b5a2b] mt-8 max-w-md italic">
        Se recomienda activar el volumen y usar audífonos para disfrutar la banda sonora adaptativa y la narración en vivo.
      </p>
    </div>
  );
};
