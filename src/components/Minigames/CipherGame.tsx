import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface CipherGameProps {
  onSuccess: () => void;
  onHintUsed: () => void;
}

const ENCRYPTED_WORD = 'OHJHQGD'; // LEYENDA shift +3
const SOLUTION = 'LEYENDA';

export const CipherGame: React.FC<CipherGameProps> = ({ onSuccess, onHintUsed }) => {
  const [shift, setShift] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const decodeLetter = (char: string, shiftVal: number) => {
    const idx = alphabet.indexOf(char);
    if (idx === -1) return char;
    let newIdx = (idx - shiftVal) % 26;
    if (newIdx < 0) newIdx += 26;
    return alphabet[newIdx];
  };

  const decodedWord = ENCRYPTED_WORD.split('')
    .map(c => decodeLetter(c, shift))
    .join('');

  const handleShiftChange = (delta: number) => {
    soundEngine.playSFX('click');
    const newShift = (shift + delta + 26) % 26;
    setShift(newShift);

    if (ENCRYPTED_WORD.split('').map(c => decodeLetter(c, newShift)).join('') === SOLUTION) {
      soundEngine.playSFX('exito');
      setTimeout(() => {
        onSuccess();
      }, 500);
    }
  };

  return (
    <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 rounded-lg max-w-lg w-full text-center my-4 shadow-xl border-gold-glow">
      <h3 className="text-xl font-cinzel text-gold-glow mb-2">
        El Cifrado Místico de los Códices
      </h3>
      <p className="text-xs text-[#f5e6c8]/80 italic mb-6">
        Gira el disco alfanumérico para desplazar las letras y reconstruir la palabra sagrada.
      </p>

      {/* Encrypted & Decoded Display */}
      <div className="bg-[#241a0e] border border-[#5c3a1a] p-4 rounded-lg mb-6">
        <div className="text-xs text-[#8b5a2b] uppercase mb-1">Texto Encritado</div>
        <div className="text-2xl font-cinzel text-[#8b5a2b] tracking-widest mb-3">
          {ENCRYPTED_WORD}
        </div>

        <div className="text-xs text-[#d4af37] uppercase mb-1">Traducción Actual</div>
        <div className="text-3xl font-cinzel text-gold-glow tracking-widest font-bold">
          {decodedWord}
        </div>
      </div>

      {/* Shift Controller */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={() => handleShiftChange(-1)}
          className="gold-btn w-12 h-12 text-xl rounded font-bold"
        >
          ◄
        </button>

        <div className="text-center">
          <div className="text-xs font-cinzel text-[#8b5a2b] uppercase">Desplazamiento</div>
          <div className="text-2xl font-cinzel text-[#d4af37] font-bold">{shift}</div>
        </div>

        <button
          onClick={() => handleShiftChange(1)}
          className="gold-btn w-12 h-12 text-xl rounded font-bold"
        >
          ►
        </button>
      </div>

      {showHint && (
        <div className="bg-[#2a1f12] p-3 rounded border border-[#8b5a2b] text-xs text-[#f5e6c8] italic mb-4">
          Pista del Sabio: El desplazamiento correcto es igual al número de cristales sagrados menos 2 (Shift = 3).
        </div>
      )}

      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            setShowHint(true);
            onHintUsed();
          }}
          className="text-[#8b5a2b] hover:text-[#d4af37] underline"
        >
          Pedir Pista del Sabio
        </button>
        <span className="text-[#8b5a2b]">Estructura de 7 Letras</span>
      </div>
    </div>
  );
};
