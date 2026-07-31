import React, { useEffect } from 'react';
import { narratorEngine } from '../audio/narratorEngine';

interface PresenterHostProps {
  dialogue: string;
  mood?: 'happy' | 'excited' | 'surprised' | 'talking' | 'celebrate';
  autoSpeak?: boolean;
}

export const PresenterHost: React.FC<PresenterHostProps> = ({
  dialogue,
  mood = 'happy',
  autoSpeak = true
}) => {
  useEffect(() => {
    if (autoSpeak && dialogue) {
      narratorEngine.speak(dialogue);
    }
  }, [dialogue, autoSpeak]);

  const getEmoji = () => {
    switch (mood) {
      case 'excited': return '🎉👩‍🦰';
      case 'surprised': return '😮👩‍🦰';
      case 'celebrate': return '⭐👩‍🦰';
      default: return '👩‍🦰';
    }
  };

  return (
    <div className="flex items-end gap-3 max-w-2xl mx-auto my-2 animate-bounce-subtle">
      {/* Host Avatar Badge */}
      <div className="relative group flex-shrink-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-1 shadow-xl border-2 border-white flex items-center justify-center text-3xl sm:text-4xl animate-pulse">
          {getEmoji()}
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase shadow border border-white whitespace-nowrap">
          Silvia
        </div>
      </div>

      {/* Host Speech Bubble */}
      <div className="relative bg-white/95 text-slate-900 border-4 border-yellow-400 p-3 sm:p-4 rounded-2xl shadow-2xl flex-1 text-left text-xs sm:text-sm font-bold font-sans leading-snug tracking-wide">
        {/* Pointer Arrow */}
        <div className="absolute -left-2 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
        
        <div className="flex items-center justify-between gap-2">
          <p className="text-slate-900 font-semibold">{dialogue}</p>
          <button
            onClick={() => narratorEngine.speak(dialogue)}
            className="flex-shrink-0 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full p-1.5 transition text-xs border border-yellow-300 shadow"
            title="Escuchar a Silvia"
          >
            🔊
          </button>
        </div>
      </div>
    </div>
  );
};
