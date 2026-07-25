import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CRISTALES, AVATARES } from '../data/gameData';
import { LevelData, PlayerAssignment } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';
import { RunicSequenceGame } from './Minigames/RunicSequenceGame';
import { PathMazeGame } from './Minigames/PathMazeGame';
import { CipherGame } from './Minigames/CipherGame';
import { CrystalAlignGame } from './Minigames/CrystalAlignGame';
import { ConstellationGame } from './Minigames/ConstellationGame';

interface LevelViewProps {
  level: LevelData;
  assignedPlayer?: PlayerAssignment;
  onCompleteLevel: () => void;
  onGoToMap: () => void;
  narratorEnabled: boolean;
  onHintUsed: () => void;
}

export const LevelView: React.FC<LevelViewProps> = ({
  level,
  assignedPlayer,
  onCompleteLevel,
  onGoToMap,
  narratorEnabled,
  onHintUsed
}) => {
  const [step, setStep] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState('');
  
  // Trial step choices (Physical vs Enigma)
  const [trialMode, setTrialMode] = useState<'physical' | 'enigma'>('physical');
  const [timerSeconds, setTimerSeconds] = useState(level.desafioFisico?.duracionSegundos || 30);
  const [timerActive, setTimerActive] = useState(false);
  
  // Enigma state
  const [selectedEnigmaOption, setSelectedEnigmaOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [enigmaSolved, setEnigmaSolved] = useState(false);
  const [enigmaFeedback, setEnigmaFeedback] = useState<string | null>(null);
  const [showPista, setShowPista] = useState(false);

  const crystal = CRISTALES[level.cristal];

  useEffect(() => {
    soundEngine.setBiome(level.escena);
    setDisplayedText('');

    let textToSpeak = '';
    if (step === 0) textToSpeak = level.intro;
    else if (step === 1) textToSpeak = level.narracion;
    else if (step === 4) textToSpeak = level.recompensa;
    else if (step === 5) textToSpeak = level.transicionMordrak;

    if (textToSpeak) {
      setDisplayedText(textToSpeak);
      if (narratorEnabled) {
        narratorEngine.speak(textToSpeak);
      }
    }

    return () => {
      narratorEngine.stop();
    };
  }, [level, step, narratorEnabled]);

  // Countdown timer for physical challenge
  useEffect(() => {
    let interval: number | null = null;
    if (timerActive) {
      interval = window.setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) {
            setTimerActive(false);
            soundEngine.playSFX('cristal');
            return 0;
          }
          if (s % 10 === 0) {
            soundEngine.playSFX('runa');
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const handleNextStep = () => {
    soundEngine.playSFX('click');
    narratorEngine.stop();

    if (step === 3) {
      // Complete level!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      soundEngine.playSFX('cristal');
      onCompleteLevel();
      setStep(4);
    } else {
      setStep(s => s + 1);
    }
  };

  const toggleTimer = () => {
    soundEngine.playSFX('click');
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    soundEngine.playSFX('click');
    setTimerActive(false);
    setTimerSeconds(level.desafioFisico?.duracionSegundos || 30);
  };

  const handleVerifyEnigmaOption = (option: string) => {
    soundEngine.playSFX('click');
    setSelectedEnigmaOption(option);
    
    // Check if the selected option corresponds to correct answer
    const cleaned = option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const isCorrect = level.enigma.respuestasCorrectas.some(ans => 
      cleaned.includes(ans.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    ) || option === level.enigma.opcionesMultiples[0]; // first option is designed as correct

    if (isCorrect) {
      soundEngine.playSFX('victoria');
      setEnigmaSolved(true);
      setEnigmaFeedback('¡Respuesta correcta! El candado místico se ha abierto.');
    } else {
      soundEngine.playSFX('error');
      setEnigmaFeedback('Esa respuesta no resuena con la verdad ancestral. ¡Inténtalo de nuevo!');
    }
  };

  const handleVerifyTypedAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedAnswer.trim()) return;
    
    soundEngine.playSFX('click');
    const cleaned = typedAnswer.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const isCorrect = level.enigma.respuestasCorrectas.some(ans => 
      cleaned.includes(ans.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );

    if (isCorrect) {
      soundEngine.playSFX('victoria');
      setEnigmaSolved(true);
      setEnigmaFeedback('¡Excelente razonamiento! El sello del enigma se ha roto.');
    } else {
      soundEngine.playSFX('error');
      setEnigmaFeedback('El sello no reconoce esa palabra. Revisa la pregunta o pide una pista.');
    }
  };

  const formatTimer = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 max-w-3xl mx-auto select-none my-8 animate-fadeIn">
      {/* Header Badge */}
      {(() => {
        const avatar = assignedPlayer ? AVATARES.find(a => a.id === assignedPlayer.avatarId) : null;
        return (
          <>
            <div className="text-xs font-cinzel tracking-[0.3em] text-[#8b5a2b] uppercase mb-1">
              Santuario {level.n} • {level.subtitulo}
            </div>

            <h1 className="text-2xl sm:text-4xl font-cinzel text-gold-glow mb-2">
              {level.titulo}
            </h1>

            <div className="inline-flex items-center gap-2 bg-[#234f3f]/50 border border-[#234f3f] rounded-full px-4 py-1 text-xs text-[#e9c96a] font-cinzel mb-6">
              ✦ Protagonista: <strong>{assignedPlayer ? assignedPlayer.playerName : level.protagonista}</strong> {avatar ? `(${avatar.icono} ${avatar.nombre})` : `(${level.rol})`}
            </div>
          </>
        );
      })()}

      {/* STEP 0: Cinematic Intro */}
      {step === 0 && (
        <div className="bg-[#1a140c]/80 border border-[#8b5a2b] p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-sm mb-6 text-left border-gold-glow w-full">
          <p className="text-base sm:text-lg leading-relaxed text-[#f5e6c8] font-serif italic mb-6">
            {displayedText}
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleNextStep}
              className="gold-btn px-6 py-2.5 text-sm font-cinzel tracking-wider uppercase rounded"
            >
              Avanzar hacia el Dintel
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: Guardian's Lore */}
      {step === 1 && (
        <div className="bg-[#1a140c]/80 border border-[#8b5a2b] p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-sm mb-6 text-left border-gold-glow w-full">
          <p className="text-base sm:text-lg leading-relaxed text-[#f5e6c8] font-serif italic mb-6">
            {displayedText}
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleNextStep}
              className="gold-btn px-6 py-2.5 text-sm font-cinzel tracking-wider uppercase rounded"
            >
              Enfrentar el Minijuego
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Interactive Minigame */}
      {step === 2 && (
        <div className="w-full flex flex-col items-center">
          {level.n === 1 && (
            <RunicSequenceGame onSuccess={handleNextStep} onHintUsed={onHintUsed} />
          )}
          {level.n === 2 && (
            <PathMazeGame onSuccess={handleNextStep} onHintUsed={onHintUsed} />
          )}
          {level.n === 3 && (
            <CipherGame onSuccess={handleNextStep} onHintUsed={onHintUsed} />
          )}
          {level.n === 4 && (
            <CrystalAlignGame onSuccess={handleNextStep} onHintUsed={onHintUsed} />
          )}
          {level.n === 5 && (
            <ConstellationGame onSuccess={handleNextStep} onHintUsed={onHintUsed} />
          )}
        </div>
      )}

      {/* STEP 3: Real World Challenge OR Enigma Choice */}
      {step === 3 && (
        <div className="bg-[#1a140c]/95 border border-[#8b5a2b] p-5 sm:p-8 rounded-xl shadow-2xl text-center w-full border-gold-glow mb-6">
          <div className="text-xs font-cinzel text-[#8b5a2b] uppercase mb-1 tracking-widest">
            Prueba Final del Santuario {level.n}
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel text-gold-glow mb-4">
            Elige tu Desafío para Reclamar el Cristal
          </h3>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <button
              onClick={() => {
                soundEngine.playSFX('click');
                setTrialMode('physical');
              }}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-cinzel uppercase tracking-wider transition-all border ${
                trialMode === 'physical'
                  ? 'bg-[#8b5a2b] text-[#f5e6c8] border-[#e9c96a] shadow-lg scale-105 font-bold'
                  : 'bg-[#241a0e] text-[#a08a6e] border-[#5c3a1a] hover:border-[#8b5a2b]'
              }`}
            >
              🤸‍♂️ Desafío Físico Instantáneo (Sin Preparación)
            </button>
            <button
              onClick={() => {
                soundEngine.playSFX('click');
                setTrialMode('enigma');
              }}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-cinzel uppercase tracking-wider transition-all border ${
                trialMode === 'enigma'
                  ? 'bg-[#234f3f] text-[#f5e6c8] border-[#e9c96a] shadow-lg scale-105 font-bold'
                  : 'bg-[#241a0e] text-[#a08a6e] border-[#5c3a1a] hover:border-[#234f3f]'
              }`}
            >
              🧩 Descifrar Enigma Digital (Reto de Ingenio)
            </button>
          </div>

          {/* OPTION A: Instant Zero-Prep Physical Challenge */}
          {trialMode === 'physical' && (() => {
            const activePlayerName = assignedPlayer ? assignedPlayer.playerName : level.protagonista;
            const avatar = assignedPlayer ? AVATARES.find(a => a.id === assignedPlayer.avatarId) : null;

            return (
              <div className="bg-[#241a0e] p-5 sm:p-6 rounded-lg border border-[#5c3a1a] text-left max-w-2xl mx-auto mb-6">
                {/* Active Player Solo Turn Highlight Box */}
                <div className="bg-gradient-to-r from-[#2a1b0a] via-[#3a2010] to-[#2a1b0a] border-2 border-[#e9c96a] p-4 rounded-lg mb-5 text-center shadow-lg">
                  <div className="text-[10px] font-cinzel text-[#e9c96a] uppercase tracking-[0.2em] font-bold mb-1">
                    🎯 Desafío Físico Individual • Santuario {level.n}
                  </div>
                  <div className="text-xl sm:text-2xl font-cinzel text-gold-glow font-bold">
                    Turno Personal de: <span className="text-[#ffffff] underline decoration-[#e9c96a]">{activePlayerName}</span> {avatar ? `(${avatar.icono} ${avatar.nombre})` : ''}
                  </div>
                  <p className="text-xs text-[#f5e6c8]/90 font-serif italic mt-1.5 max-w-lg mx-auto">
                    Esta prueba física debe ser realizada exclusivamente por <strong>{activePlayerName}</strong>. Sus compañeros observan en silencio, llevan el tiempo y ofrecen apoyo moral.
                  </p>
                </div>

                <div className="flex items-center justify-between mb-3 border-b border-[#5c3a1a] pb-2">
                  <h4 className="text-base font-cinzel text-[#e9c96a] font-bold">
                    ✦ {level.desafioFisico.titulo}
                  </h4>
                  <span className="text-xs font-cinzel bg-[#8b5a2b]/40 text-[#f5e6c8] px-2.5 py-1 rounded border border-[#8b5a2b]">
                    Solo {activePlayerName} • En vivo
                  </span>
                </div>

                <div className="text-xs font-cinzel text-[#8b5a2b] uppercase mb-2 font-bold">
                  Instrucciones para {activePlayerName}:
                </div>
                <ul className="space-y-2 mb-4 text-xs sm:text-sm text-[#f5e6c8] font-serif leading-relaxed">
                  {level.desafioFisico.instrucciones.map((inst, i) => {
                    const formattedInst = inst.replace(/El jugador en turno/g, activePlayerName);
                    return (
                      <li key={i} className="bg-[#1a140c]/80 p-2.5 rounded border border-[#5c3a1a]/50">
                        {formattedInst}
                      </li>
                    );
                  })}
                </ul>

                <div className="bg-[#1a140c] p-3 rounded border border-[#8b5a2b]/50 mb-4 text-xs font-serif text-[#e9c96a] italic">
                  🎯 <strong>Meta de {activePlayerName}:</strong> {level.desafioFisico.metaObjetivo.replace(/El jugador en turno/g, activePlayerName)}
                </div>

                {/* Interactive Countdown Timer */}
                <div className="bg-[#181109] p-4 rounded-lg border border-[#8b5a2b] text-center my-4">
                  <div className="text-xs font-cinzel text-[#8b5a2b] uppercase mb-1">Cronómetro para {activePlayerName}</div>
                  <div className="text-3xl font-cinzel text-gold-glow tracking-widest mb-2">
                    ⏱ {formatTimer(timerSeconds)}
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={toggleTimer}
                      className="gold-btn px-4 py-1.5 text-xs font-cinzel uppercase rounded cursor-pointer"
                    >
                      {timerActive ? 'Pausar Tiempo' : 'Iniciar Tiempo'}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="bg-[#3a2010] hover:bg-[#5c3a1a] text-[#f5e6c8] px-3 py-1.5 text-xs font-cinzel uppercase rounded border border-[#8b5a2b] cursor-pointer"
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={handleNextStep}
                    className="gold-btn w-full py-3 text-sm sm:text-base font-cinzel tracking-widest uppercase rounded font-bold cursor-pointer"
                  >
                    ¡Prueba Completada por {activePlayerName}! Reclamar Cristal
                  </button>
                </div>
              </div>
            );
          })()}

          {/* OPTION B: Digital Enigma / Riddle */}
          {trialMode === 'enigma' && (
            <div className="bg-[#192b23] p-5 sm:p-6 rounded-lg border border-[#234f3f] text-left max-w-2xl mx-auto mb-6">
              <div className="flex items-center justify-between mb-3 border-b border-[#234f3f] pb-2">
                <h4 className="text-base font-cinzel text-[#e9c96a] font-bold">
                  ✦ El Enigma del Guardián Ancestral
                </h4>
                <span className="text-xs font-cinzel bg-[#234f3f]/60 text-[#f5e6c8] px-2.5 py-1 rounded border border-[#e9c96a]/30">
                  Acertijo Místico
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#f5e6c8] font-serif italic mb-5 leading-relaxed bg-[#111e18] p-4 rounded border border-[#234f3f]">
                {level.enigma.pregunta}
              </p>

              {/* Multiple Choice Options */}
              <div className="mb-5">
                <div className="text-xs font-cinzel text-[#e9c96a] uppercase mb-2">
                  Elige una opción o escribe tu respuesta:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  {level.enigma.opcionesMultiples.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleVerifyEnigmaOption(opt)}
                      className={`p-3 rounded text-xs font-cinzel border text-center transition-all ${
                        selectedEnigmaOption === opt
                          ? 'bg-[#e9c96a] text-[#111e18] border-[#e9c96a] font-bold'
                          : 'bg-[#111e18] text-[#f5e6c8] border-[#234f3f] hover:border-[#e9c96a]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Typed Answer Input */}
                <form onSubmit={handleVerifyTypedAnswer} className="flex gap-2">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={e => setTypedAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="flex-1 bg-[#111e18] border border-[#234f3f] focus:border-[#e9c96a] rounded px-3 py-2 text-xs sm:text-sm text-[#f5e6c8] outline-none font-serif"
                  />
                  <button
                    type="submit"
                    className="gold-btn px-4 py-2 text-xs font-cinzel uppercase rounded"
                  >
                    Verificar
                  </button>
                </form>
              </div>

              {/* Clue button */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSFX('click');
                    setShowPista(!showPista);
                    onHintUsed();
                  }}
                  className="text-xs text-[#e9c96a] hover:underline font-cinzel"
                >
                  {showPista ? '🙈 Ocultar Pista' : '💡 Ver Pista del Enigma'}
                </button>
              </div>

              {showPista && (
                <div className="bg-[#111e18] p-3 rounded border border-[#e9c96a]/40 text-xs text-[#f5e6c8] font-serif italic mb-4">
                  <strong>Pista:</strong> {level.enigma.pista}
                </div>
              )}

              {/* Feedback Message */}
              {enigmaFeedback && (
                <div
                  className={`p-3 rounded text-xs font-serif mb-4 border ${
                    enigmaSolved
                      ? 'bg-[#27ae60]/20 border-[#27ae60] text-[#2ecc71]'
                      : 'bg-[#c0392b]/20 border-[#c0392b] text-[#e74c3c]'
                  }`}
                >
                  {enigmaFeedback}
                </div>
              )}

              {/* Continue button when solved or ready */}
              <div className="text-center pt-2">
                <button
                  onClick={handleNextStep}
                  disabled={!enigmaSolved && trialMode === 'enigma'}
                  className={`w-full py-3 text-sm sm:text-base font-cinzel tracking-widest uppercase rounded font-bold transition-all ${
                    enigmaSolved || trialMode !== 'enigma'
                      ? 'gold-btn'
                      : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed opacity-60'
                  }`}
                >
                  {enigmaSolved ? '¡Enigma Resuelto! Reclamar Cristal' : 'Resuelve el enigma para continuar'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: Crystal Acquisition */}
      {step === 4 && (
        <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-6 sm:p-8 rounded-lg shadow-2xl text-center w-full border-gold-glow mb-6">
          <div className="text-6xl mb-4 animate-bounce" style={{ color: crystal.color }}>
            ◆
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel text-gold-glow mb-2">
            Cristal de {crystal.nombre}
          </h2>
          <div className="text-xs font-cinzel text-[#8b5a2b] uppercase tracking-widest mb-4">
            Virtud: {crystal.virtud}
          </div>

          <p className="text-base text-[#f5e6c8] font-serif italic mb-6 max-w-xl mx-auto">
            {displayedText}
          </p>

          <button
            onClick={handleNextStep}
            className="gold-btn px-8 py-3 text-sm font-cinzel tracking-widest uppercase rounded"
          >
            Tomar la gema y continuar
          </button>
        </div>
      )}

      {/* STEP 5: Mordrak's Shadow Warning */}
      {step === 5 && (
        <div className="bg-[#1a140c]/90 border border-[#c0392b] p-6 sm:p-8 rounded-lg shadow-2xl text-center w-full mb-6">
          <div className="text-4xl mb-3 text-[#c0392b]">👁️</div>
          <h3 className="text-xl font-cinzel text-[#c0392b] mb-3">
            La Sombra de Mordrak
          </h3>

          <p className="text-sm text-[#f5e6c8] font-serif italic mb-6 max-w-xl mx-auto">
            {displayedText}
          </p>

          <button
            onClick={() => {
              soundEngine.playSFX('click');
              narratorEngine.stop();
              onGoToMap();
            }}
            className="gold-btn px-8 py-3 text-sm font-cinzel tracking-widest uppercase rounded"
          >
            Volver al Mapa Sagrado
          </button>
        </div>
      )}
    </div>
  );
};
