import React, { useEffect, useState } from 'react';
import { PROLOGO_TEXTO } from '../data/gameData';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface PrologueViewProps {
  onContinue: () => void;
  narratorEnabled: boolean;
}

export const PrologueView: React.FC<PrologueViewProps> = ({ onContinue, narratorEnabled }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    soundEngine.setBiome('inicio');

    let charIndex = 0;
    const speed = 22;

    const interval = setInterval(() => {
      setDisplayedText(PROLOGO_TEXTO.slice(0, charIndex));
      charIndex++;
      if (charIndex > PROLOGO_TEXTO.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, speed);

    if (narratorEnabled) {
      narratorEngine.speak(PROLOGO_TEXTO, () => {
        setIsTypingComplete(true);
      });
    }

    return () => {
      clearInterval(interval);
      narratorEngine.stop();
    };
  }, [narratorEnabled]);

  const handleNext = () => {
    soundEngine.playSFX('click');
    narratorEngine.stop();
    onContinue();
  };

  const handleSkipTyping = () => {
    setDisplayedText(PROLOGO_TEXTO);
    setIsTypingComplete(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center z-20 max-w-3xl mx-auto select-none animate-fadeIn">
      <div className="text-xs font-cinzel tracking-[0.3em] text-[#8b5a2b] uppercase mb-2">
        Prólogo de la Leyenda
      </div>

      <h2 className="text-3xl sm:text-4xl font-cinzel text-gold-glow mb-6">
        La Leyenda de Aurelia
      </h2>

      <div className="bg-[#1a140c]/80 border border-[#8b5a2b] p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-sm mb-8 text-left min-h-[260px] relative">
        <p className="text-base sm:text-lg leading-relaxed text-[#f5e6c8] font-serif whitespace-pre-line italic">
          {displayedText}
          {!isTypingComplete && <span className="typewriter-cursor" />}
        </p>

        {!isTypingComplete && (
          <button
            onClick={handleSkipTyping}
            className="absolute bottom-3 right-4 text-xs font-cinzel text-[#8b5a2b] hover:text-[#d4af37] underline"
          >
            Mostrar todo el texto
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="gold-btn px-8 py-3 text-base font-cinzel tracking-widest uppercase rounded cursor-pointer"
        >
          Aceptar la Misión
        </button>
      </div>
    </div>
  );
};
