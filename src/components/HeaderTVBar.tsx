import React from 'react';
import { Player } from '../types';
import { AVATARS_LIST } from '../data/avatars';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface HeaderTVBarProps {
  players: Player[];
  currentPlayerIndex: number;
  turnCount: number;
  audioActive: boolean;
  onToggleAudio: () => void;
  presenterVoiceActive: boolean;
  onTogglePresenterVoice: () => void;
  onGoHome?: () => void;
}

export const HeaderTVBar: React.FC<HeaderTVBarProps> = ({
  players,
  currentPlayerIndex,
  turnCount,
  audioActive,
  onToggleAudio,
  presenterVoiceActive,
  onTogglePresenterVoice,
  onGoHome
}) => {
  return (
    <header className="w-full bg-slate-950/90 backdrop-blur-md border-b-4 border-yellow-400 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xl z-30 sticky top-0 text-white select-none">
      {/* Brand & Turn Badge */}
      <div className="flex items-center gap-3">
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg text-xs font-bold shadow border border-red-300 transition"
            title="Inicio / Reiniciar"
          >
            🏠
          </button>
        )}

        <div className="flex flex-col text-left">
          <span className="text-sm sm:text-base font-black tracking-wider text-yellow-300 drop-shadow-md uppercase">
            ¡LA CASA DE SILVIA! 🏠
          </span>
          <span className="text-[10px] text-pink-300 font-bold tracking-widest uppercase">
            Party Game • Turno {turnCount}
          </span>
        </div>
      </div>

      {/* Scoreboard Chips */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 no-scrollbar">
        {players.map((p, idx) => {
          const avatar = AVATARS_LIST.find(a => a.id === p.avatarId) || AVATARS_LIST[0];
          const isCurrent = idx === currentPlayerIndex;

          return (
            <div
              key={p.id}
              style={{ borderColor: p.color }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 transition-all duration-300 text-xs font-bold ${
                isCurrent
                  ? 'bg-yellow-400 text-slate-950 scale-105 shadow-lg shadow-yellow-400/50 ring-2 ring-white animate-pulse'
                  : 'bg-slate-800/80 text-white opacity-90'
              }`}
            >
              <span className="text-base">{avatar.icono}</span>
              <span className="max-w-[80px] truncate">{p.name}</span>
              <span className="flex items-center text-yellow-300 font-extrabold ml-1">
                ⭐ {p.stars}
              </span>
            </div>
          );
        })}
      </div>

      {/* Global Sound / Voice Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onToggleAudio();
            soundEngine.playSFX('click');
          }}
          className={`p-1.5 rounded-lg text-xs font-bold border transition ${
            audioActive
              ? 'bg-emerald-500 text-white border-emerald-300'
              : 'bg-slate-700 text-slate-400 border-slate-600'
          }`}
          title="Música & Sonido"
        >
          {audioActive ? '🎵 SÍ' : '🔇 NO'}
        </button>

        <button
          onClick={() => {
            onTogglePresenterVoice();
            narratorEngine.setEnabled(!presenterVoiceActive);
            soundEngine.playSFX('click');
          }}
          className={`p-1.5 rounded-lg text-xs font-bold border transition ${
            presenterVoiceActive
              ? 'bg-pink-500 text-white border-pink-300'
              : 'bg-slate-700 text-slate-400 border-slate-600'
          }`}
          title="Voz de Silvia"
        >
          {presenterVoiceActive ? '🗣️ VOZ' : '🤐 SILENCIO'}
        </button>
      </div>
    </header>
  );
};
