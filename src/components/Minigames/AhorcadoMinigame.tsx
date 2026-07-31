import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface AhorcadoMinigameProps {
  targetWord: string;
  category: string;
  hint: string;
  onSolved: () => void;
}

export const AhorcadoMinigame: React.FC<AhorcadoMinigameProps> = ({
  targetWord,
  category,
  hint,
  onSolved
}) => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  const cleanWord = targetWord.toUpperCase().replace(/\s+/g, '');

  const isLetterGuessed = (letter: string) => guessedLetters.includes(letter);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (cleanWord.includes(letter)) {
      soundEngine.playSFX('coin');
      // Check win condition
      const allGuessed = cleanWord.split('').every(l => newGuessed.includes(l));
      if (allGuessed) {
        soundEngine.playSFX('fanfare');
        onSolved();
      }
    } else {
      soundEngine.playSFX('buzzer');
      setMistakes(prev => prev + 1);
    }
  };

  return (
    <div className="bg-slate-900 border-4 border-yellow-400 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 text-white w-full max-w-2xl mx-auto my-4">
      {/* Category Badge & Hint */}
      <div className="flex flex-col items-center">
        <span className="bg-pink-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow">
          🔤 AHORCADO EXPRESS • {category}
        </span>
        <p className="text-xs sm:text-sm text-yellow-200 mt-2 italic font-bold">
          💡 Pista: "{hint}"
        </p>
      </div>

      {/* Secret Word Display */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-4">
        {targetWord.split('').map((char, idx) => {
          if (char === ' ') {
            return <div key={idx} className="w-4" />;
          }
          const isGuessed = guessedLetters.includes(char.toUpperCase());
          return (
            <div
              key={idx}
              className={`w-10 h-12 sm:w-12 sm:h-14 rounded-2xl border-4 flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg transition-all ${
                isGuessed
                  ? 'bg-yellow-400 text-slate-950 border-white scale-105'
                  : 'bg-slate-950 border-slate-700 text-transparent'
              }`}
            >
              {isGuessed ? char.toUpperCase() : '_'}
            </div>
          );
        })}
      </div>

      {/* Mistakes Indicator */}
      <div className="text-xs font-black text-red-400 uppercase">
        Fallos: {mistakes} / 6 {mistakes >= 6 && '❌ ¡Intenta otra letra!'}
      </div>

      {/* TV Alphabet Keyboard */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-lg mt-2">
        {alphabet.map(letter => {
          const guessed = isLetterGuessed(letter);
          const isCorrect = guessed && cleanWord.includes(letter);
          const isWrong = guessed && !cleanWord.includes(letter);

          return (
            <button
              key={letter}
              disabled={guessed}
              onClick={() => handleGuess(letter)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-sm transition border cursor-pointer ${
                isCorrect
                  ? 'bg-emerald-500 text-white border-white scale-105'
                  : isWrong
                  ? 'bg-red-600/50 text-slate-400 border-red-800 opacity-40'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};
