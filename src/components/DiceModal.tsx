import React, { useEffect, useState } from 'react';
import { Player, BoardSpace } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface DiceModalProps {
  player: Player;
  onDiceResult: (roll: number) => void;
  targetSpace: BoardSpace | null;
  onProceedToSpace: () => void;
  presenterVoiceActive: boolean;
}

export const DiceModal: React.FC<DiceModalProps> = ({
  player,
  onDiceResult,
  targetSpace,
  onProceedToSpace,
  presenterVoiceActive
}) => {
  const [rolling, setRolling] = useState(true);
  const [currentDisplayRoll, setCurrentDisplayRoll] = useState(1);
  const [finalRoll, setFinalRoll] = useState<number | null>(null);

  useEffect(() => {
    let interval: number;
    if (rolling) {
      interval = window.setInterval(() => {
        const rand = Math.floor(Math.random() * 6) + 1;
        setCurrentDisplayRoll(rand);
        soundEngine.playSFX('hover');
      }, 80);

      // Stop rolling after 1.8 seconds
      const timeout = setTimeout(() => {
        clearInterval(interval);
        const result = Math.floor(Math.random() * 6) + 1;
        setFinalRoll(result);
        setCurrentDisplayRoll(result);
        setRolling(false);
        soundEngine.playSFX('star');
        onDiceResult(result);

        if (presenterVoiceActive) {
          narratorEngine.speak(`¡El dado mágico de ${player.name} marca un ${result}! ¡Avanza ${result} casillas!`);
        }
      }, 1800);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, []);

  const getDiceDots = (num: number) => {
    switch (num) {
      case 1: return '⚀';
      case 2: return '⚁';
      case 3: return '⚂';
      case 4: return '⚃';
      case 5: return '⚄';
      case 6: return '⚅';
      default: return '🎲';
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 z-50 select-none text-white">
      <div className="max-w-lg w-full bg-slate-900 border-4 border-yellow-400 p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-6 animate-scale-up">
        
        <span className="bg-yellow-400 text-slate-950 font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest">
          🎲 DADO MÁGICO DE LA CASA DE SILVIA
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          ¡Turno de <span style={{ color: player.color }}>{player.name}</span>!
        </h2>

        {/* Animated Dice Cube */}
        <div
          style={{ borderColor: player.color }}
          className={`w-36 h-36 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-500 rounded-3xl border-4 shadow-2xl flex items-center justify-center text-8xl text-slate-950 transform transition-transform duration-200 ${
            rolling ? 'animate-spin scale-110' : 'scale-100 ring-4 ring-white'
          }`}
        >
          {getDiceDots(currentDisplayRoll)}
        </div>

        {rolling ? (
          <p className="text-lg font-black text-yellow-300 animate-pulse">
            ¡Girando el dado mágico...!
          </p>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full animate-fade-in">
            <div className="text-3xl font-black text-yellow-400">
              ¡Salió un {finalRoll}! 🎉
            </div>

            {targetSpace && (
              <div className="bg-slate-800 p-4 rounded-2xl border-2 border-slate-700 w-full text-left flex items-center gap-3">
                <span className="text-3xl">{targetSpace.icon}</span>
                <div>
                  <div className="text-xs font-bold text-yellow-300 uppercase">
                    Casilla #{targetSpace.id + 1} • {targetSpace.room}
                  </div>
                  <div className="text-base font-black text-white">
                    {targetSpace.title}
                  </div>
                  <div className="text-xs text-slate-300">
                    {targetSpace.description}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                soundEngine.playSFX('click');
                onProceedToSpace();
              }}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-xl uppercase rounded-2xl shadow-xl border-2 border-white transform hover:scale-105 active:scale-95 transition-all cursor-pointer mt-2"
            >
              🚀 ¡IR AL RETO DE LA CASILLA!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
