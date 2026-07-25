import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface PathMazeGameProps {
  onSuccess: () => void;
  onHintUsed: () => void;
}

export const PathMazeGame: React.FC<PathMazeGameProps> = ({ onSuccess, onHintUsed }) => {
  const [position, setPosition] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [hintVisible, setHintVisible] = useState(false);

  // 4x4 Grid representation: 0=Safe, 1=Vine Trap, 2=Target
  const grid = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 2]
  ];

  const move = (dr: number, dc: number) => {
    const nr = position.r + dr;
    const nc = position.c + dc;

    if (nr < 0 || nr >= 4 || nc < 0 || nc >= 4) {
      soundEngine.playSFX('error');
      return;
    }

    if (grid[nr][nc] === 1) {
      soundEngine.playSFX('rugido');
      setPosition({ r: 0, c: 0 }); // Reset to start on trap
      return;
    }

    soundEngine.playSFX('click');
    setPosition({ r: nr, c: nc });

    if (grid[nr][nc] === 2) {
      soundEngine.playSFX('exito');
      onSuccess();
    }
  };

  return (
    <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 rounded-lg max-w-lg w-full text-center my-4 shadow-xl border-gold-glow">
      <h3 className="text-xl font-cinzel text-gold-glow mb-2">
        El Laberinto de Espinas Sagradas
      </h3>
      <p className="text-xs text-[#f5e6c8]/80 italic mb-6">
        Dirige la luz del explorador hasta la salida verde evitando las trampas ocultas en la espesura.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = position.r === r && position.c === c;
            const isTarget = cell === 2;
            const isTrapRevealed = hintVisible && cell === 1;

            return (
              <div
                key={`${r}-${c}`}
                className={`w-16 h-16 rounded border flex items-center justify-center text-xl transition-all ${
                  isPlayer
                    ? 'bg-[#d4af37] border-white shadow-lg shadow-[#d4af37]/50 scale-105'
                    : isTarget
                    ? 'bg-[#27ae60]/40 border-[#27ae60]'
                    : isTrapRevealed
                    ? 'bg-[#c0392b]/40 border-[#c0392b]'
                    : 'bg-[#241a0e] border-[#5c3a1a]'
                }`}
              >
                {isPlayer ? '🧭' : isTarget ? '💎' : isTrapRevealed ? '🌵' : ''}
              </div>
            );
          })
        )}
      </div>

      {/* D-Pad controls */}
      <div className="flex flex-col items-center gap-1 mb-4">
        <button
          onClick={() => move(-1, 0)}
          className="gold-btn w-12 h-12 text-lg rounded flex items-center justify-center"
        >
          ▲
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => move(0, -1)}
            className="gold-btn w-12 h-12 text-lg rounded flex items-center justify-center"
          >
            ◄
          </button>
          <button
            onClick={() => move(0, 1)}
            className="gold-btn w-12 h-12 text-lg rounded flex items-center justify-center"
          >
            ►
          </button>
        </div>
        <button
          onClick={() => move(1, 0)}
          className="gold-btn w-12 h-12 text-lg rounded flex items-center justify-center"
        >
          ▼
        </button>
      </div>

      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            setHintVisible(true);
            onHintUsed();
          }}
          className="text-[#8b5a2b] hover:text-[#d4af37] underline"
        >
          Revelar Espinas (Pista)
        </button>
        <span className="text-[#8b5a2b]">Llega hasta el Cristal 💎</span>
      </div>
    </div>
  );
};
