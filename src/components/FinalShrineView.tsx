import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CRISTALES, EPILOGO_TEXTO } from '../data/gameData';
import { CrystalId } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface FinalShrineViewProps {
  onFinishGame: () => void;
  narratorEnabled: boolean;
}

export const FinalShrineView: React.FC<FinalShrineViewProps> = ({
  onFinishGame,
  narratorEnabled
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    soundEngine.setBiome('final', 'triumph');

    if (step === 2) {
      soundEngine.playSFX('puerta');
      setTimeout(() => {
        soundEngine.playSFX('moneda');
      }, 1200);
    } else if (step === 3) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
      soundEngine.playSFX('exito');
    } else {
      soundEngine.playSFX('campana');
    }

    const currentText = EPILOGO_TEXTO[step];
    if (narratorEnabled && currentText) {
      narratorEngine.speak(currentText);
    }

    return () => {
      narratorEngine.stop();
    };
  }, [step, narratorEnabled]);

  const handleNext = () => {
    soundEngine.playSFX('click');
    narratorEngine.stop();

    if (step < EPILOGO_TEXTO.length - 1) {
      setStep(s => s + 1);
    } else {
      onFinishGame();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 max-w-3xl mx-auto select-none my-8 animate-fadeIn">
      <div className="text-xs font-cinzel tracking-[0.3em] text-[#8b5a2b] uppercase mb-1">
        El Santuario Central
      </div>

      <h1 className="text-3xl sm:text-5xl font-cinzel text-gold-glow mb-6">
        El Corazón de Aurelia
      </h1>

      {/* Visual stage illustration */}
      <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
        {/* Orbiting Crystals */}
        {(Object.keys(CRISTALES) as CrystalId[]).map((id, i) => {
          const c = CRISTALES[id];
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const radius = step === 0 ? 90 : step === 1 ? 60 : 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={id}
              className="absolute text-3xl transition-all duration-1000"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                color: c.color,
                filter: `drop-shadow(0 0 10px ${c.color})`
              }}
            >
              ◆
            </div>
          );
        })}

        {/* Center Heart / Chest Core */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e9c96a] to-[#8b5a2b] border-2 border-white shadow-[0_0_50px_rgba(212,175,55,0.9)] flex items-center justify-center text-4xl animate-pulse-glow">
          {step < 2 ? '🗝️' : step === 2 ? '📦' : '🏆'}
        </div>
      </div>

      {/* Narrative Card */}
      <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-sm mb-8 text-left border-gold-glow w-full">
        <p className="text-base sm:text-lg leading-relaxed text-[#f5e6c8] font-serif italic mb-6">
          {EPILOGO_TEXTO[step]}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs font-cinzel text-[#8b5a2b]">
            Epílogo {step + 1} de {EPILOGO_TEXTO.length}
          </span>

          <button
            onClick={handleNext}
            className="gold-btn px-8 py-3 text-sm font-cinzel tracking-widest uppercase rounded font-bold"
          >
            {step < EPILOGO_TEXTO.length - 1 ? 'Siguiente Revelación' : 'Descubrir el Verdadero Tesoro'}
          </button>
        </div>
      </div>
    </div>
  );
};
