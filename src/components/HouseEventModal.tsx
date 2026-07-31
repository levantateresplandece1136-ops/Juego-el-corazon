import React, { useEffect } from 'react';
import { HouseEvent } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { PresenterHost } from './PresenterHost';

interface HouseEventModalProps {
  event: HouseEvent;
  onDismiss: () => void;
  presenterVoiceActive: boolean;
}

export const HouseEventModal: React.FC<HouseEventModalProps> = ({
  event,
  onDismiss,
  presenterVoiceActive
}) => {
  useEffect(() => {
    soundEngine.playSFX('party_horn');
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 z-50 select-none text-white animate-fade-in">
      <div className="max-w-xl w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border-4 border-yellow-400 p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-6 animate-scale-up">
        
        {/* Presenter Speech Banner */}
        <PresenterHost
          dialogue={event.presenterDialogue}
          mood="excited"
          autoSpeak={presenterVoiceActive}
        />

        <div className="w-24 h-24 bg-yellow-400 text-slate-950 rounded-full flex items-center justify-center text-6xl shadow-2xl border-4 border-white animate-bounce my-2">
          {event.icon}
        </div>

        <div>
          <span className="bg-yellow-400 text-slate-950 font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest shadow">
            ⚡ EVENTO ESPECIAL DE LA CASA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-yellow-300 uppercase tracking-tight mt-2">
            {event.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-100 font-bold mt-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onDismiss();
          }}
          className="w-full py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-xl uppercase rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 active:scale-95 transition-all cursor-pointer mt-4"
        >
          🎉 ¡ENTENDIDO, CONTINUAR LA FIESTA!
        </button>
      </div>
    </div>
  );
};
