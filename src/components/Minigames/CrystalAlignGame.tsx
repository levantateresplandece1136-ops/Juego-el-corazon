import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface CrystalAlignGameProps {
  onSuccess: () => void;
  onHintUsed: () => void;
}

export const CrystalAlignGame: React.FC<CrystalAlignGameProps> = ({ onSuccess, onHintUsed }) => {
  // 3 Mirrors with angles 0, 90, 180, 270 deg
  const [angles, setAngles] = useState([0, 0, 0]);

  const rotate = (idx: number) => {
    soundEngine.playSFX('click');
    const updated = [...angles];
    updated[idx] = (updated[idx] + 90) % 360;
    setAngles(updated);

    // Target solution: Prism 0 = 90deg, Prism 1 = 180deg, Prism 2 = 90deg
    if (updated[0] === 90 && updated[1] === 180 && updated[2] === 90) {
      soundEngine.playSFX('exito');
      setTimeout(() => onSuccess(), 500);
    }
  };

  return (
    <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 rounded-lg max-w-lg w-full text-center my-4 shadow-xl border-gold-glow">
      <h3 className="text-xl font-cinzel text-gold-glow mb-2">
        Alineación de los Prismas Subterráneos
      </h3>
      <p className="text-xs text-[#f5e6c8]/80 italic mb-6">
        Haz clic en cada espejo prismático para rotarlo y canalizar la luz hasta el receptor verde.
      </p>

      {/* Prisms row */}
      <div className="flex items-center justify-around my-8 bg-[#241a0e] p-6 rounded-lg border border-[#5c3a1a]">
        {/* Light Source */}
        <div className="flex flex-col items-center">
          <span className="text-2xl animate-pulse">🔦</span>
          <span className="text-[10px] font-cinzel text-[#d4af37] mt-1">Fuente</span>
        </div>

        {/* 3 Prisms */}
        {angles.map((ang, i) => (
          <button
            key={i}
            onClick={() => rotate(i)}
            className="w-16 h-16 rounded-full border-2 border-[#1abc9c] bg-[#122626] flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-105 cursor-pointer shadow-lg shadow-[#1abc9c]/20"
            style={{ transform: `rotate(${ang}deg)` }}
          >
            📐
          </button>
        ))}

        {/* Target Receptacle */}
        <div className="flex flex-col items-center">
          <span className="text-2xl text-[#2ecc71]">🟢</span>
          <span className="text-[10px] font-cinzel text-[#2ecc71] mt-1">Altar</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            setAngles([90, 180, 90]);
            onHintUsed();
            setTimeout(() => onSuccess(), 500);
          }}
          className="text-[#8b5a2b] hover:text-[#d4af37] underline"
        >
          Alinear Automáticamente (Pista)
        </button>

        <span className="text-[#8b5a2b]">Ángulos: {angles.join('° • ')}°</span>
      </div>
    </div>
  );
};
