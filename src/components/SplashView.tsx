import React, { useEffect } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { PresenterHost } from './PresenterHost';

interface SplashViewProps {
  onStartSetup: () => void;
  presenterVoiceActive: boolean;
}

export const SplashView: React.FC<SplashViewProps> = ({
  onStartSetup,
  presenterVoiceActive
}) => {
  useEffect(() => {
    soundEngine.startPartyBGM();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden relative">
      {/* Floating Animated Background Decorations */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce duration-1000 opacity-60">🏠</div>
      <div className="absolute top-20 right-12 text-5xl animate-spin duration-3000 opacity-50">⭐</div>
      <div className="absolute bottom-12 left-16 text-6xl animate-pulse opacity-70">🎈</div>
      <div className="absolute bottom-16 right-20 text-5xl animate-bounce duration-700 opacity-60">🐶</div>
      <div className="absolute top-1/2 left-8 text-4xl animate-pulse opacity-40">🐱</div>
      <div className="absolute top-1/3 right-10 text-6xl animate-bounce opacity-50">🎉</div>

      <div className="z-10 max-w-4xl w-full bg-slate-900/85 backdrop-blur-lg border-4 border-yellow-400 p-6 sm:p-10 rounded-3xl shadow-2xl my-6">
        {/* Presenter Speech Banner */}
        <PresenterHost
          dialogue="¡Bienvenidos a mi casa! Soy Silvia. ¡Aquí cualquier objeto o rincón se convierte en un reto salvaje!"
          mood="excited"
          autoSpeak={presenterVoiceActive}
        />

        <div className="inline-block bg-yellow-400 text-slate-950 font-black px-4 py-1 rounded-full uppercase text-xs sm:text-sm tracking-widest shadow-md mb-3">
          TV Party Game Familiar • Nintendo & Jackbox Style
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-amber-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-2 uppercase tracking-tight transform hover:scale-105 transition-transform duration-300">
          ¡BIENVENIDOS A LA CASA DE SILVIA! 🏠
        </h1>

        <p className="text-base sm:text-2xl font-extrabold text-yellow-200 drop-shadow mb-6 italic">
          "La casa donde cualquier cosa puede convertirse en un reto."
        </p>

        {/* Room Badges Preview */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { name: 'Sala', icon: '🛋️', color: 'bg-amber-500' },
            { name: 'Comedor', icon: '🍽️', color: 'bg-red-500' },
            { name: 'Cocina', icon: '🍳', color: 'bg-emerald-500' },
            { name: 'Patio', icon: '🌿', color: 'bg-lime-500' },
            { name: 'Recámara', icon: '🛏️', color: 'bg-purple-500' },
            { name: 'Baño', icon: '🛁', color: 'bg-cyan-500' },
            { name: 'Garage', icon: '🚗', color: 'bg-slate-500' },
            { name: 'Azotea', icon: '⭐', color: 'bg-pink-500' }
          ].map(r => (
            <span
              key={r.name}
              className={`${r.color} text-white font-black text-xs px-3 py-1.5 rounded-full shadow border border-white/40 flex items-center gap-1`}
            >
              {r.icon} {r.name}
            </span>
          ))}
        </div>

        {/* Big Action Button */}
        <button
          onClick={() => {
            soundEngine.playSFX('fanfare');
            onStartSetup();
          }}
          className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 text-xl sm:text-3xl font-black uppercase rounded-2xl shadow-2xl border-4 border-white transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer animate-pulse"
        >
          🎮 ¡COMENZAR LA FIESTA FAMILIAR! ⭐
        </button>

        <p className="text-xs sm:text-sm text-pink-200 mt-4 font-bold">
          Para 2 a 12 jugadores • Sin pantallas individuales • ¡Toda la acción ocurre en la vida real!
        </p>
      </div>
    </div>
  );
};
