import React from 'react';
import { AVATARES, CRISTALES } from '../data/gameData';
import { CrystalId } from '../types';
import { soundEngine } from '../audio/soundEngine';

interface CreditsViewProps {
  selectedAvatarId: string | null;
  collectedCrystals: CrystalId[];
  onRestartGame: () => void;
}

export const CreditsView: React.FC<CreditsViewProps> = ({
  selectedAvatarId,
  collectedCrystals,
  onRestartGame
}) => {
  const avatar = AVATARES.find(a => a.id === selectedAvatarId) || AVATARES[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center z-20 max-w-2xl mx-auto select-none my-8 animate-fadeIn">
      <div className="text-xs font-cinzel tracking-[0.3em] text-[#8b5a2b] uppercase mb-1">
        Conclusión de la Leyenda
      </div>

      <h1 className="text-3xl sm:text-5xl font-cinzel text-gold-glow mb-4">
        El Corazón de Aurelia
      </h1>

      <p className="text-sm sm:text-base text-[#f5e6c8] font-serif italic mb-8 max-w-lg">
        «El verdadero tesoro no habitaba en el cofre... sino en haber pensado, reído, perseverado y confiado en equipo».
      </p>

      {/* Hero and Crystals Summary */}
      <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 rounded-lg shadow-2xl mb-8 w-full border-gold-glow">
        <div className="flex items-center justify-center gap-3 mb-4 border-b border-[#3a2f1e] pb-4">
          <span className="text-4xl">{avatar.icono}</span>
          <div className="text-left">
            <div className="text-xs font-cinzel text-[#8b5a2b] uppercase">Expedicionario Lider</div>
            <div className="text-lg font-cinzel text-gold-glow font-bold">{avatar.nombre}</div>
          </div>
        </div>

        <div className="text-xs font-cinzel text-[#8b5a2b] uppercase mb-3">
          Cristales Sagrados Desbloqueados
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {(Object.keys(CRISTALES) as CrystalId[]).map(id => {
            const owned = collectedCrystals.includes(id);
            const c = CRISTALES[id];
            return (
              <div
                key={id}
                className="flex flex-col items-center"
                style={{ opacity: owned ? 1 : 0.3 }}
              >
                <div className="text-2xl" style={{ color: c.color }}>
                  ◆
                </div>
                <div className="text-[10px] font-cinzel text-[#8b5a2b]">{c.nombre}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onRestartGame();
          }}
          className="gold-btn px-10 py-3.5 text-base font-cinzel tracking-widest uppercase rounded cursor-pointer font-bold"
        >
          Comenzar Nueva Expedición
        </button>

        <p className="text-xs text-[#8b5a2b] italic tracking-wider uppercase mt-4">
          Una Expedición Familiar · Levántate Responde
        </p>
      </div>
    </div>
  );
};
