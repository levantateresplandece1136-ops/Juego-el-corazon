import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface RunicSequenceGameProps {
  onSuccess: () => void;
  onHintUsed: () => void;
}

const RUNES = [
  { id: 0, symbol: '☉', name: 'Sol', color: '#f39c12', tone: 523 },
  { id: 1, symbol: '☽', name: 'Luna', color: '#3498db', tone: 659 },
  { id: 2, symbol: '✦', name: 'Estrella', color: '#9b59b6', tone: 784 },
  { id: 3, symbol: '🛡', name: 'Escudo', color: '#2ecc71', tone: 1047 }
];

export const RunicSequenceGame: React.FC<RunicSequenceGameProps> = ({ onSuccess, onHintUsed }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [activeRune, setActiveRune] = useState<number | null>(null);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [round, setRound] = useState(1);
  const targetRounds = 3;

  const startNewSequence = () => {
    const newSeq = [
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4)
    ];
    setSequence(newSeq);
    setPlayerInput([]);
    playSequence(newSeq);
  };

  useEffect(() => {
    startNewSequence();
  }, []);

  const playSequence = (seq: number[]) => {
    setIsDisplaying(true);
    setPlayerInput([]);

    seq.forEach((runeId, index) => {
      setTimeout(() => {
        setActiveRune(runeId);
        soundEngine.tone(RUNES[runeId].tone, 0.4, 'sine', 0.25);
        setTimeout(() => setActiveRune(null), 400);

        if (index === seq.length - 1) {
          setTimeout(() => setIsDisplaying(false), 500);
        }
      }, (index + 1) * 700);
    });
  };

  const handleRuneClick = (id: number) => {
    if (isDisplaying) return;

    soundEngine.tone(RUNES[id].tone, 0.3, 'sine', 0.25);
    setActiveRune(id);
    setTimeout(() => setActiveRune(null), 300);

    const updated = [...playerInput, id];
    setPlayerInput(updated);

    const stepIndex = updated.length - 1;
    if (updated[stepIndex] !== sequence[stepIndex]) {
      // Wrong entry
      soundEngine.playSFX('error');
      setPlayerInput([]);
      setTimeout(() => playSequence(sequence), 800);
      return;
    }

    if (updated.length === sequence.length) {
      if (round < targetRounds) {
        soundEngine.playSFX('exito');
        setRound(r => r + 1);
        setTimeout(() => {
          const extended = [...sequence, Math.floor(Math.random() * 4)];
          setSequence(extended);
          playSequence(extended);
        }, 1000);
      } else {
        soundEngine.playSFX('exito');
        onSuccess();
      }
    }
  };

  return (
    <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 rounded-lg max-w-lg w-full text-center my-4 shadow-xl border-gold-glow">
      <div className="text-xs font-cinzel text-[#8b5a2b] uppercase mb-1">
        Fase {round} de {targetRounds}
      </div>
      <h3 className="text-xl font-cinzel text-gold-glow mb-2">
        Sincronización de Runas Místicas
      </h3>
      <p className="text-xs text-[#f5e6c8]/80 italic mb-6">
        Memoriza el orden en que destellan los cuatro glifos sagrados y repítelo en el mismo orden.
      </p>

      {/* Rune buttons grid */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
        {RUNES.map(r => {
          const isActive = activeRune === r.id;
          return (
            <button
              key={r.id}
              disabled={isDisplaying}
              onClick={() => handleRuneClick(r.id)}
              className={`h-24 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'scale-105 border-white shadow-2xl'
                  : 'bg-[#241a0e] border-[#5c3a1a] hover:border-[#d4af37]'
              }`}
              style={{
                borderColor: isActive ? '#fff' : r.color,
                backgroundColor: isActive ? r.color : '#241a0e',
                boxShadow: isActive ? `0 0 25px ${r.color}` : 'none'
              }}
            >
              <span className="text-3xl mb-1" style={{ color: isActive ? '#fff' : r.color }}>
                {r.symbol}
              </span>
              <span className="text-[11px] font-cinzel text-[#f5e6c8] uppercase">
                {r.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onHintUsed();
            playSequence(sequence);
          }}
          disabled={isDisplaying}
          className="text-[#8b5a2b] hover:text-[#d4af37] underline"
        >
          Repetir Secuencia
        </button>

        <span className="text-[#8b5a2b]">
          {isDisplaying ? 'Escuchando glifos...' : 'Tu Turno'}
        </span>
      </div>
    </div>
  );
};
