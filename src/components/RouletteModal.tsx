import React, { useState, useEffect } from 'react';
import { Player, RouletteOption } from '../types';
import { ROULETTE_OPTIONS } from '../data/rouletteData';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';
import { PresenterHost } from './PresenterHost';

interface RouletteModalProps {
  player: Player;
  onOptionSelected: (option: RouletteOption) => void;
  presenterVoiceActive: boolean;
}

export const RouletteModal: React.FC<RouletteModalProps> = ({
  player,
  onOptionSelected,
  presenterVoiceActive
}) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [selectedOption, setSelectedOption] = useState<RouletteOption | null>(null);

  const totalSlices = ROULETTE_OPTIONS.length;
  const sliceAngle = 360 / totalSlices;

  useEffect(() => {
    // Determine target index randomly
    const winningIndex = Math.floor(Math.random() * totalSlices);
    const chosen = ROULETTE_OPTIONS[winningIndex];

    // Compute target rotation (5 full spins + slice offset centered at top pointer)
    // Slice 0 is top (0 to -45 deg)
    const extraSpins = 360 * 6;
    // To land winningIndex at top pointer (270deg or 0deg depending on orientation)
    // Each slice center: winningIndex * sliceAngle
    const targetAngle = extraSpins + (360 - winningIndex * sliceAngle) - sliceAngle / 2;

    setRotationDegrees(targetAngle);
    soundEngine.playSFX('dice_roll');

    // Interval tick sound while spinning
    const tickInterval = setInterval(() => {
      soundEngine.playSFX('hover');
    }, 120);

    const spinTimeout = setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setSelectedOption(chosen);
      soundEngine.playSFX('star');

      if (presenterVoiceActive) {
        narratorEngine.speak(chosen.presenterPhrase);
      }
    }, 3200);

    return () => {
      clearInterval(tickInterval);
      clearTimeout(spinTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 z-50 select-none text-white animate-fade-in overflow-y-auto">
      <div className="max-w-2xl w-full bg-slate-900 border-4 border-yellow-400 p-6 sm:p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-5 relative z-10">
        
        {/* Presenter Banner */}
        <div className="w-full">
          <PresenterHost
            dialogue={
              isSpinning
                ? `¡GIRANDO LA RULETA GIGANTE SORPRESA PARA ${player.name.toUpperCase()}! ¿Qué saldrá ahora?`
                : selectedOption?.presenterPhrase || '¡El destino ha hablado!'
            }
            mood={isSpinning ? 'excited' : 'celebrate'}
            autoSpeak={presenterVoiceActive}
          />
        </div>

        {/* Title Header */}
        <div className="flex flex-col items-center">
          <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow border border-white">
            🌀 RULETA GIGANTE DE LA CASA DE SILVIA
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Turno de <span style={{ color: player.color }}>{player.name}</span>
          </h2>
        </div>

        {/* Wheel Container with Top Pointer */}
        <div className="relative my-2 flex flex-col items-center justify-center">
          
          {/* Top Pointer Arrow */}
          <div className="z-30 -mb-4 text-4xl text-yellow-400 drop-shadow-lg animate-bounce">
            ▼
          </div>

          {/* Outer Glowing Ring with Stage Bulbs */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-yellow-400 shadow-2xl p-2 bg-slate-950 flex items-center justify-center overflow-hidden">
            
            {/* Spinning Wheel Canvas */}
            <div
              className="w-full h-full rounded-full relative transition-all duration-[3000ms] cubic-bezier(0.15, 0.85, 0.35, 1.05)"
              style={{
                transform: `rotate(${rotationDegrees}deg)`
              }}
            >
              {ROULETTE_OPTIONS.map((opt, idx) => {
                const rotation = idx * sliceAngle;
                return (
                  <div
                    key={opt.id}
                    className="absolute w-full h-full top-0 left-0"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: '50% 50%'
                    }}
                  >
                    {/* Slice visual line & label */}
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-start pt-2 text-center"
                      style={{
                        height: '50%'
                      }}
                    >
                      <span className="text-2xl sm:text-3xl drop-shadow">{opt.icon}</span>
                      <span className="text-[10px] font-black uppercase text-white bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/20 mt-1 max-w-[70px] leading-tight">
                        {opt.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Wheel Center Peg */}
            <div className="absolute z-20 w-16 h-16 bg-gradient-to-tr from-yellow-400 to-amber-500 border-4 border-white rounded-full flex items-center justify-center shadow-2xl text-2xl text-slate-950 font-black animate-pulse">
              🌀
            </div>
          </div>
        </div>

        {/* Outcome Result Card */}
        {selectedOption && !isSpinning && (
          <div className="w-full bg-slate-950/90 border-2 border-yellow-400 p-4 sm:p-5 rounded-2xl flex flex-col items-center gap-3 animate-scale-up shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl">{selectedOption.icon}</span>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded border border-yellow-400/40">
                  ¡RESULTADO DE LA RULETA!
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white capitalize mt-0.5">
                  {selectedOption.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-200 bg-slate-900 p-3 rounded-xl border border-slate-700 w-full">
              {selectedOption.description}
            </p>

            {/* Action button */}
            <button
              onClick={() => {
                soundEngine.playSFX('fanfare');
                onOptionSelected(selectedOption);
              }}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-lg uppercase rounded-2xl shadow-2xl border-2 border-white transform hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              🚀 ¡APLICAR EFECTO Y CONTINUAR!
            </button>
          </div>
        )}

        {isSpinning && (
          <p className="text-base font-black text-yellow-300 animate-pulse">
            🎲 ¡Girando a toda velocidad...!
          </p>
        )}

      </div>
    </div>
  );
};
