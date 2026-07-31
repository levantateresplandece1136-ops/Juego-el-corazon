import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface MemoriaMinigameProps {
  onSolved: () => void;
}

const ITEMS_POOL = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Gato', icon: '🐱' },
  { name: 'Sillón', icon: '🛋️' },
  { name: 'Llave', icon: '🔑' },
  { name: 'Zapatilla', icon: '👟' },
  { name: 'Libro', icon: '📚' },
  { name: 'Reloj', icon: '⏰' },
  { name: 'Teléfono', icon: '📱' },
  { name: 'Peluche', icon: '🧸' }
];

export const MemoriaMinigame: React.FC<MemoriaMinigameProps> = ({ onSolved }) => {
  const [phase, setPhase] = useState<'memorize' | 'guess' | 'revealed'>('memorize');
  const [items, setItems] = useState<{ name: string; icon: string }[]>([]);
  const [hiddenIndex, setHiddenIndex] = useState(0);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Pick 6 random items
    const shuffled = [...ITEMS_POOL].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    setItems(selected);
    const hidden = Math.floor(Math.random() * 6);
    setHiddenIndex(hidden);

    // Memorize timer (5 seconds)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('guess');
          soundEngine.playSFX('buzzer');
          return 0;
        }
        soundEngine.playSFX('hover');
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border-4 border-yellow-400 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 text-white w-full max-w-2xl mx-auto my-4 text-center">
      <span className="bg-purple-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest">
        🧠 RETO DE MEMORIA VISUAL
      </span>

      {phase === 'memorize' && (
        <>
          <h3 className="text-xl sm:text-2xl font-black text-yellow-300">
            ¡Memoriza estos 6 objetos! ({countdown}s)
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 my-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800 border-2 border-yellow-400 p-3 rounded-2xl flex flex-col items-center justify-center text-4xl shadow-lg animate-bounce"
              >
                <span>{item.icon}</span>
                <span className="text-[10px] font-bold text-slate-300 mt-1">{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {phase === 'guess' && (
        <>
          <h3 className="text-xl sm:text-2xl font-black text-pink-400">
            ¿Cuál objeto desapareció de la pantalla?
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 my-4">
            {items.map((item, idx) => {
              const isHidden = idx === hiddenIndex;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-4xl shadow-lg ${
                    isHidden
                      ? 'bg-red-950 border-red-500 animate-pulse text-red-400'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <span>{isHidden ? '❓' : item.icon}</span>
                  <span className="text-[10px] font-bold text-slate-300 mt-1">
                    {isHidden ? '¿Cual es?' : item.name}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              soundEngine.playSFX('fanfare');
              setPhase('revealed');
              onSolved();
            }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-base uppercase rounded-2xl shadow-xl border-2 border-white transition transform hover:scale-105 cursor-pointer"
          >
            🔍 ¡REVELAR OBJETO FALTANTE!
          </button>
        </>
      )}

      {phase === 'revealed' && (
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <div className="text-5xl">{items[hiddenIndex]?.icon}</div>
          <div className="text-2xl font-black text-yellow-300">
            ¡Era: {items[hiddenIndex]?.name}! 🎉
          </div>
        </div>
      )}
    </div>
  );
};
