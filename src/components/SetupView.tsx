import React, { useState } from 'react';
import { Player, GameSettings } from '../types';
import { AVATARS_LIST, PLAYER_COLORS } from '../data/avatars';
import { soundEngine } from '../audio/soundEngine';
import { PresenterHost } from './PresenterHost';

interface SetupViewProps {
  onStartGame: (players: Player[], settings: GameSettings) => void;
  presenterVoiceActive: boolean;
}

export const SetupView: React.FC<SetupViewProps> = ({
  onStartGame,
  presenterVoiceActive
}) => {
  const [durationMinutes, setDurationMinutes] = useState<20 | 30 | 40>(30);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'p1',
      name: 'Jugador 1',
      age: 10,
      avatarId: 'chef',
      color: PLAYER_COLORS[0].hex,
      colorBg: PLAYER_COLORS[0].bgClass,
      stars: 0,
      coins: 0,
      position: 0,
      challengesCompleted: 0,
      badges: []
    },
    {
      id: 'p2',
      name: 'Jugador 2',
      age: 12,
      avatarId: 'robot',
      color: PLAYER_COLORS[1].hex,
      colorBg: PLAYER_COLORS[1].bgClass,
      stars: 0,
      coins: 0,
      position: 0,
      challengesCompleted: 0,
      badges: []
    }
  ]);

  const addPlayer = () => {
    if (players.length >= 12) return;
    soundEngine.playSFX('click');
    const nextIdx = players.length;
    const avatar = AVATARS_LIST[nextIdx % AVATARS_LIST.length];
    const colorObj = PLAYER_COLORS[nextIdx % PLAYER_COLORS.length];

    setPlayers(prev => [
      ...prev,
      {
        id: `p${Date.now()}_${nextIdx}`,
        name: `Jugador ${nextIdx + 1}`,
        age: 8 + nextIdx,
        avatarId: avatar.id,
        color: colorObj.hex,
        colorBg: colorObj.bgClass,
        stars: 0,
        coins: 0,
        position: 0,
        challengesCompleted: 0,
        badges: []
      }
    ]);
  };

  const removePlayer = (id: string) => {
    if (players.length <= 2) return;
    soundEngine.playSFX('click');
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const updatePlayer = (id: string, updates: Partial<Player>) => {
    setPlayers(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePlayer(id, { photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunch = () => {
    soundEngine.playSFX('fanfare');
    // Calculate total turns according to duration
    const turnsMap: Record<number, number> = { 20: 10, 30: 15, 40: 20 };
    const settings: GameSettings = {
      durationMinutes,
      totalTurns: turnsMap[durationMinutes],
      presenterVoiceEnabled: presenterVoiceActive,
      bgmActive: true,
      sfxActive: true
    };
    onStartGame(players, settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 p-4 sm:p-8 flex flex-col items-center justify-center select-none text-white">
      <div className="max-w-5xl w-full bg-slate-900/90 backdrop-blur-md border-4 border-yellow-400 p-6 sm:p-8 rounded-3xl shadow-2xl">
        
        {/* Presenter Speech Banner */}
        <PresenterHost
          dialogue="¡Hora de registrar a los competidores! Cada jugador elige su avatar extravagante y su color de la suerte."
          mood="happy"
          autoSpeak={presenterVoiceActive}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-yellow-400/30 pb-4 mb-6 gap-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight">
              ⚙️ REGISTRO DE JUGADORES (2 a 12)
            </h2>
            <p className="text-xs sm:text-sm text-pink-200">
              ¡Todos participan todo el tiempo sin eliminaciones!
            </p>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-2xl border border-yellow-400/50">
            <span className="text-xs font-bold text-yellow-300 uppercase px-2">⏳ Duración:</span>
            {[20, 30, 40].map(mins => (
              <button
                key={mins}
                onClick={() => {
                  soundEngine.playSFX('click');
                  setDurationMinutes(mins as 20 | 30 | 40);
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition border cursor-pointer ${
                  durationMinutes === mins
                    ? 'bg-yellow-400 text-slate-950 border-white shadow-lg scale-105'
                    : 'bg-slate-700 text-white border-slate-600 hover:bg-slate-600'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        {/* Player List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-2 mb-6">
          {players.map((player, idx) => {
            const avatarInfo = AVATARS_LIST.find(a => a.id === player.avatarId) || AVATARS_LIST[0];

            return (
              <div
                key={player.id}
                style={{ borderColor: player.color }}
                className="bg-slate-800/90 border-4 p-4 rounded-2xl flex flex-col gap-3 relative shadow-xl hover:scale-[1.01] transition-transform"
              >
                {/* Header with Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: player.color }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white flex-shrink-0"
                  >
                    {player.photoUrl ? (
                      <img src={player.photoUrl} alt={player.name} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      avatarInfo.icono
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    <label className="text-[10px] uppercase font-black text-yellow-300">
                      Nombre Jugador {idx + 1}
                    </label>
                    <input
                      type="text"
                      value={player.name}
                      onChange={e => updatePlayer(player.id, { name: e.target.value })}
                      className="w-full bg-slate-950 border-2 border-slate-700 text-white font-bold px-3 py-1 rounded-xl focus:border-yellow-400 focus:outline-none text-sm"
                    />
                  </div>

                  <div className="w-20 text-left">
                    <label className="text-[10px] uppercase font-black text-yellow-300">Edad</label>
                    <input
                      type="number"
                      min={3}
                      max={99}
                      value={player.age}
                      onChange={e => updatePlayer(player.id, { age: parseInt(e.target.value) || 8 })}
                      className="w-full bg-slate-950 border-2 border-slate-700 text-white font-bold px-2 py-1 rounded-xl text-sm text-center"
                    />
                  </div>

                  {players.length > 2 && (
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full font-black text-xs shadow border border-red-300 flex items-center justify-center"
                      title="Eliminar Jugador"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Avatar Carousel / Picker */}
                <div>
                  <div className="text-[10px] font-black uppercase text-pink-300 text-left mb-1">
                    Selecciona Avatar:
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {AVATARS_LIST.map(av => (
                      <button
                        key={av.id}
                        onClick={() => {
                          soundEngine.playSFX('click');
                          updatePlayer(player.id, { avatarId: av.id });
                        }}
                        className={`p-1.5 rounded-xl text-xl transition border cursor-pointer ${
                          player.avatarId === av.id
                            ? 'bg-yellow-400 text-slate-950 border-white scale-110 shadow-lg'
                            : 'bg-slate-900 hover:bg-slate-700 text-white border-slate-700 opacity-70'
                        }`}
                        title={av.nombre}
                      >
                        {av.icono}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Picker & Photo Upload */}
                <div className="flex items-center justify-between border-t border-slate-700/60 pt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-yellow-200 uppercase mr-1">Color:</span>
                    {PLAYER_COLORS.slice(0, 8).map(c => (
                      <button
                        key={c.hex}
                        onClick={() => {
                          soundEngine.playSFX('click');
                          updatePlayer(player.id, { color: c.hex, colorBg: c.bgClass });
                        }}
                        style={{ backgroundColor: c.hex }}
                        className={`w-5 h-5 rounded-full border-2 transition ${
                          player.color === c.hex ? 'border-white scale-125 ring-2 ring-yellow-400' : 'border-slate-900 opacity-60'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Photo Upload */}
                  <label className="bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer border border-slate-500">
                    📷 Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handlePhotoUpload(player.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {players.length < 12 && (
            <button
              onClick={addPlayer}
              className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm uppercase rounded-2xl shadow-lg border-2 border-purple-300 transition cursor-pointer"
            >
              ➕ AGREGAR OTRO JUGADOR ({players.length}/12)
            </button>
          )}

          <button
            onClick={handleLaunch}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 text-xl font-black uppercase rounded-2xl shadow-2xl border-4 border-white transition transform hover:scale-105 active:scale-95 cursor-pointer ml-auto"
          >
            🎲 ¡ENTRAR A LA CASA Y LANZAR DADOS! ⭐
          </button>
        </div>
      </div>
    </div>
  );
};
