'use client';
import React from 'react';
import useLanguageMatrix from '../app/hooks/useLanguageMatrix';

const DeepThinkStream = () => {
  const { language_detected, confidence_score } = useLanguageMatrix();

  const getLanguageSymbol = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'telugu':
        return 'ఆ';
      case 'hindi':
        return 'हि';
      default:
        return 'EN';
    }
  };

  return (
    <div className="glass-panel flex flex-col h-full overflow-hidden relative border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="p-3 border-b border-white/10 bg-black/40 flex items-center justify-between relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        <h3 className="text-xs font-bold text-primary uppercase tracking-widest font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-base animate-pulse">psychology</span>
          'Deep Think' Stream
        </h3>
        <div className="flex gap-1">
          <span className="size-1.5 bg-secondary rounded-full animate-pulse"></span>
          <span className="size-1.5 bg-primary rounded-full animate-pulse delay-75"></span>
          <span className="size-1.5 bg-accent rounded-full animate-pulse delay-150"></span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-5 font-mono text-xs relative animate-hologram-flicker">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQwLCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20 pointer-events-none mix-blend-screen bg-fixed"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-0 deep-think-gradient"></div>
        <div className="relative z-50 animate-toast-slide mb-6">
          <div className="bg-black/80 backdrop-blur-md border-l-2 border-primary p-3 rounded-r shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center gap-3 w-full border-t border-b border-r border-white/10">
            <div className="h-8 w-8 flex items-center justify-center bg-primary/10 rounded-full border border-primary/30">
              <span className="text-lg font-bold text-primary font-serif pb-1">{getLanguageSymbol(language_detected)}</span>
            </div>
            <div className="flex flex-col">
              <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Language Detected</div>
              <div className="text-xs font-bold text-white">
                {language_detected.toUpperCase()}{' '}
                <span className="text-accent ml-1">{(confidence_score * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative pl-4 border-l border-white/10 hover:border-accent transition-colors duration-300 group z-10 animate-fade-in-up">
          <div className="absolute -left-[5px] top-0 size-2.5 bg-black border border-slate-600 group-hover:border-accent rounded-full flex items-center justify-center transition-all duration-300">
            <div className="size-1 bg-slate-600 group-hover:bg-accent rounded-full group-hover:shadow-[0_0_8px_#00ff9d]"></div>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-slate-500 font-bold opacity-70">10:42:01.442</span>
            <span className="px-1.5 py-0.5 bg-accent/10 border border-accent/30 text-accent text-[9px] rounded font-bold tracking-wider shadow-[0_0_10px_rgba(0,255,157,0.3)] animate-badge-pulse backdrop-blur-sm">
              DETECT_EMOTION
            </span>
          </div>
          <div className="text-slate-300 font-sans text-[11px] relative leading-relaxed">
            User sentiment:{' '}
            <span className="char-reveal animate-color-surge-red font-bold inline-block" style={{ animationDelay: '0.1s' }}>
              Frustration
            </span>{' '}
            detected.
            <br />
            <span className="text-[10px] text-slate-400">&gt; Ripple effect: Initiated.</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>
        <div className="relative pl-4 border-l border-white/10 hover:border-secondary transition-colors duration-300 group z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -left-[5px] top-0 size-2.5 bg-black border border-slate-600 group-hover:border-secondary rounded-full flex items-center justify-center transition-all duration-300">
            <div className="size-1 bg-slate-600 group-hover:bg-secondary rounded-full group-hover:shadow-[0_0_8px_#7000ff]"></div>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-slate-500 font-bold opacity-70">10:42:01.890</span>
            <span className="px-1.5 py-0.5 bg-secondary/10 border border-secondary/30 text-secondary text-[9px] rounded font-bold tracking-wider shadow-[0_0_10px_rgba(112,0,255,0.3)] animate-badge-pulse backdrop-blur-sm" style={{ animationDelay: '1s' }}>
              THOUGHT_PROCESS
            </span>
          </div>
          <div className="text-slate-300 font-mono text-[10px] leading-relaxed relative overflow-hidden">
            <div className="flex flex-col">
              <span className="block text-slate-400 opacity-80 mb-0.5">&gt; Analyzing context vector...</span>
              <span className="block text-secondary opacity-90 shadow-neon-purple mb-0.5">
                &gt; Retrieving policy #8842...
              </span>
              <span className="block text-white glow-text relative w-fit pr-1 electric-text font-bold">
                <span className="char-reveal">S</span>
                <span className="char-reveal">y</span>
                <span className="char-reveal">n</span>
                <span className="char-reveal">t</span>
                <span className="char-reveal">h</span>
                <span className="char-reveal">e</span>
                <span className="char-reveal">s</span>
                <span className="char-reveal">i</span>
                <span className="char-reveal">z</span>
                <span className="char-reveal">i</span>
                <span className="char-reveal">n</span>
                <span className="char-reveal">g</span> <span className="char-reveal">e</span>
                <span className="char-reveal">m</span>
                <span className="char-reveal">p</span>
                <span className="char-reveal">a</span>
                <span className="char-reveal">t</span>
                <span className="char-reveal">h</span>
                <span className="char-reveal">y</span> <span className="char-reveal">m</span>
                <span className="char-reveal">o</span>
                <span className="char-reveal">d</span>
                <span className="char-reveal">u</span>
                <span className="char-reveal">l</span>
                <span className="char-reveal">e</span>
                <span className="char-reveal">.</span>
                <span className="char-reveal">.</span>
                <span className="char-reveal">.</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center text-primary/50 text-xs font-mono mt-6 pl-4 border-l border-transparent">
          <span className="w-1.5 h-3 bg-primary animate-pulse shadow-[0_0_5px_#00f0ff]"></span>
          <span className="typing-effect animate-pulse opacity-70">Awaiting next token stream...</span>
        </div>
      </div>
    </div>
  );
};

export default DeepThinkStream;
