import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface ConstellationGameProps {
  onSuccess: () => void;
  onHintUsed: () => void;
}

export const ConstellationGame: React.FC<ConstellationGameProps> = ({ onSuccess, onHintUsed }) => {
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

  // 5 star nodes forming a pentagram / heart constellation
  const stars = [
    { id: 0, x: 150, y: 50, label: 'Alpha' },
    { id: 1, x: 250, y: 120, label: 'Beta' },
    { id: 2, x: 210, y: 220, label: 'Gamma' },
    { id: 3, x: 90, y: 220, label: 'Delta' },
    { id: 4, x: 50, y: 120, label: 'Epsilon' }
  ];

  const handleStarClick = (id: number) => {
    soundEngine.playSFX('click');

    if (selectedNodes.includes(id)) {
      return;
    }

    const updated = [...selectedNodes, id];
    setSelectedNodes(updated);

    if (updated.length === stars.length) {
      soundEngine.playSFX('exito');
      setTimeout(() => onSuccess(), 500);
    }
  };

  return (
    <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 rounded-lg max-w-lg w-full text-center my-4 shadow-xl border-gold-glow">
      <h3 className="text-xl font-cinzel text-gold-glow mb-2">
        La Constelación del Corazón
      </h3>
      <p className="text-xs text-[#f5e6c8]/80 italic mb-6">
        Toca las 5 estrellas rúnicas en el firmamento para tejer la constelación sagrada.
      </p>

      {/* Star Canvas */}
      <div className="relative w-[300px] h-[260px] mx-auto bg-[#0b0a1a] border border-[#5c3a1a] rounded-lg mb-6 overflow-hidden">
        {/* SVG lines between connected stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {selectedNodes.map((starId, index) => {
            if (index === 0) return null;
            const prev = stars[selectedNodes[index - 1]];
            const curr = stars[starId];
            return (
              <line
                key={index}
                x1={prev.x}
                y1={prev.y}
                x2={curr.x}
                y2={curr.y}
                stroke="#9b59b6"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Stars */}
        {stars.map(s => {
          const isSelected = selectedNodes.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => handleStarClick(s.id)}
              style={{ left: `${s.x - 18}px`, top: `${s.y - 18}px` }}
              className={`absolute w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#9b59b6] border-white shadow-lg shadow-[#9b59b6]/60 scale-110 text-white'
                  : 'bg-[#1b1938] border-[#8b5a2b] text-[#9b59b6] hover:border-[#9b59b6]'
              }`}
            >
              ✦
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            setSelectedNodes([0, 1, 2, 3, 4]);
            onHintUsed();
            setTimeout(() => onSuccess(), 500);
          }}
          className="text-[#8b5a2b] hover:text-[#d4af37] underline"
        >
          Trazar Constelación (Pista)
        </button>

        <span className="text-[#8b5a2b]">
          Estrellas Alineadas: {selectedNodes.length} / 5
        </span>
      </div>
    </div>
  );
};
