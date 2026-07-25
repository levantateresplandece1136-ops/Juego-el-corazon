import React, { useState } from 'react';
import { CRISTALES } from '../data/gameData';
import { CrystalId, ScreenId } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface HUDProps {
  collectedCrystals: CrystalId[];
  onOpenInventory: () => void;
  onGoToMap: () => void;
  currentScreen: ScreenId;
  narratorEnabled: boolean;
  onToggleNarrator: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  collectedCrystals,
  onOpenInventory,
  onGoToMap,
  currentScreen,
  narratorEnabled,
  onToggleNarrator,
  audioMuted,
  onToggleAudio
}) => {
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  if (currentScreen === 'splash' || currentScreen === 'credits') return null;

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-40 px-4 sm:px-6 flex items-center justify-between bg-gradient-to-b from-[#1a140c]/95 to-transparent backdrop-blur-xs border-b border-[#8b5a2b]/20">
      {/* Brand title */}
      <div className="flex items-center gap-2">
        <span className="text-[#d4af37] font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
          ◈ Aurelia
        </span>
      </div>

      {/* Center Crystal Inventory Indicator */}
      <div className="flex items-center gap-1.5 bg-[#120d08]/70 px-3 py-1 rounded-full border border-[#8b5a2b]/40">
        {(Object.keys(CRISTALES) as CrystalId[]).map(id => {
          const owned = collectedCrystals.includes(id);
          const c = CRISTALES[id];
          return (
            <div
              key={id}
              title={owned ? `${c.nombre} (${c.virtud})` : 'Cristal Oculto'}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs transition-all duration-500 ${
                owned
                  ? 'border border-[#d4af37] shadow-sm animate-pulse'
                  : 'border border-[#3a2f1e] opacity-30'
              }`}
              style={{
                color: owned ? c.color : '#666',
                boxShadow: owned ? `0 0 10px ${c.color}` : 'none'
              }}
            >
              {owned ? '◆' : '◇'}
            </div>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 relative">
        {/* Inventory Backpack */}
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onOpenInventory();
          }}
          title="Ver Inventario"
          className="w-9 h-9 rounded-full bg-[#3a2f1e]/60 border border-[#8b5a2b] hover:border-[#d4af37] hover:bg-[#8b5a2b]/70 flex items-center justify-center text-sm transition-all text-[#d4af37]"
        >
          🎒
        </button>

        {/* Narrator Voice Button */}
        <div className="relative">
          <button
            onClick={() => {
              soundEngine.playSFX('click');
              onToggleNarrator();
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setSpeedMenuOpen(!speedMenuOpen);
            }}
            title={narratorEnabled ? 'Voz del Narrador Activada (Clic derecho para velocidad)' : 'Voz del Narrador Desactivada'}
            className={`w-9 h-9 rounded-full border transition-all flex items-center justify-center text-sm ${
              narratorEnabled
                ? 'bg-[#8b5a2b]/70 border-[#d4af37] text-[#fff] shadow-sm shadow-[#d4af37]/30'
                : 'bg-[#2a1f12]/50 border-[#5c3a1a] text-[#8b5a2b] opacity-60'
            }`}
          >
            {narratorEnabled ? '🗣️' : '🤫'}
          </button>

          {/* Speed adjustment dropdown */}
          {speedMenuOpen && narratorEnabled && (
            <div className="absolute right-0 top-11 bg-[#1a140c] border border-[#8b5a2b] p-2 rounded shadow-xl flex flex-col gap-1 w-32 z-50">
              <span className="text-[10px] font-cinzel text-[#d4af37] text-center">Velocidad Voz</span>
              <div className="flex justify-between items-center text-xs">
                {[0.75, 1.0, 1.25].map(rate => (
                  <button
                    key={rate}
                    onClick={() => {
                      narratorEngine.setRate(rate);
                      setSpeedMenuOpen(false);
                      soundEngine.playSFX('click');
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      narratorEngine.getRate() === rate
                        ? 'bg-[#d4af37] text-[#0f0c08] font-bold'
                        : 'bg-[#241a0e] text-[#f5e6c8] hover:bg-[#8b5a2b]'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onToggleAudio();
          }}
          title={audioMuted ? 'Música y Sonido Muteados' : 'Música y Sonido Activados'}
          className={`w-9 h-9 rounded-full border transition-all flex items-center justify-center text-sm ${
            !audioMuted
              ? 'bg-[#8b5a2b]/70 border-[#d4af37] text-[#fff]'
              : 'bg-[#2a1f12]/50 border-[#5c3a1a] text-[#8b5a2b] opacity-50'
          }`}
        >
          {!audioMuted ? '🔊' : '🔇'}
        </button>

        {/* Jump to Map Button */}
        {currentScreen === 'level' && (
          <button
            onClick={() => {
              soundEngine.playSFX('click');
              narratorEngine.stop();
              onGoToMap();
            }}
            title="Volver al Mapa"
            className="w-9 h-9 rounded-full bg-[#3a2f1e]/60 border border-[#8b5a2b] hover:border-[#d4af37] hover:bg-[#8b5a2b]/70 flex items-center justify-center text-sm transition-all text-[#d4af37]"
          >
            🗺️
          </button>
        )}
      </div>
    </header>
  );
};
