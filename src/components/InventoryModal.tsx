import React from 'react';
import { CRISTALES } from '../data/gameData';
import { CrystalId } from '../types';
import { soundEngine } from '../audio/soundEngine';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectedCrystals: CrystalId[];
  completedLevelsCount: number;
  totalLevelsCount?: number;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  collectedCrystals,
  completedLevelsCount,
  totalLevelsCount = 5
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#1a140c] border-2 border-[#8b5a2b] rounded-lg max-w-2xl w-full p-6 text-center shadow-2xl relative border-gold-glow">
        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onClose();
          }}
          className="absolute top-4 right-4 text-[#8b5a2b] hover:text-[#d4af37] text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        <div className="text-xs font-cinzel tracking-[0.25em] text-[#8b5a2b] uppercase mb-1">
          Reliquias de la Expedición
        </div>
        <h2 className="text-2xl sm:text-3xl font-cinzel text-gold-glow mb-4">
          Inventario del Expedicionario
        </h2>

        {/* Crystals Row */}
        <div className="mb-6">
          <h3 className="text-sm font-cinzel text-[#d4af37] mb-3 uppercase tracking-wider">
            Cristales Sagrados ({collectedCrystals.length} / {totalLevelsCount})
          </h3>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {(Object.keys(CRISTALES) as CrystalId[]).slice(0, totalLevelsCount).map(id => {
              const c = CRISTALES[id];
              const owned = collectedCrystals.includes(id);
              return (
                <div
                  key={id}
                  className={`p-3 rounded border text-center transition-all ${
                    owned
                      ? 'bg-[#2a1f12] border-[#d4af37] shadow-lg shadow-[#d4af37]/20 scale-105'
                      : 'bg-[#120d08] border-[#3a2f1e] opacity-40'
                  }`}
                >
                  <div
                    className="text-2xl mb-1"
                    style={{ color: owned ? c.color : '#555' }}
                  >
                    {owned ? '◆' : '◇'}
                  </div>
                  <div className="text-[10px] font-cinzel uppercase text-[#f5e6c8] truncate">
                    {c.nombre}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Relics & Scroll Records */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-left">
          <div className="p-3 bg-[#241a0e] border border-[#3a2f1e] rounded flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <div className="text-xs font-cinzel text-[#d4af37]">Mapa de Aurelia</div>
              <div className="text-[11px] text-[#8b5a2b]">Activo</div>
            </div>
          </div>

          <div className="p-3 bg-[#241a0e] border border-[#3a2f1e] rounded flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <div className="text-xs font-cinzel text-[#d4af37]">Pergaminos</div>
              <div className="text-[11px] text-[#8b5a2b]">{completedLevelsCount} Hallados</div>
            </div>
          </div>

          <div className="p-3 bg-[#241a0e] border border-[#3a2f1e] rounded flex items-center gap-3 col-span-2 sm:col-span-1">
            <span className="text-2xl">🗝️</span>
            <div>
              <div className="text-xs font-cinzel text-[#d4af37]">Llave de Cristal</div>
              <div className="text-[11px] text-[#8b5a2b]">
                {collectedCrystals.length === totalLevelsCount ? 'Ensamblada' : `${collectedCrystals.length}/${totalLevelsCount} Piezas`}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playSFX('click');
            onClose();
          }}
          className="gold-btn px-6 py-2 text-sm uppercase tracking-wider rounded font-cinzel"
        >
          Cerrar Inventario
        </button>
      </div>
    </div>
  );
};
