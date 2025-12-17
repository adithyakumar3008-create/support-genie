'use client';
import React from 'react';

interface HeaderProps {
  godModeActive: boolean;
  isLoading: boolean;
  toggleGodMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ godModeActive, isLoading, toggleGodMode }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-white/5 px-6 py-3 bg-[#050505]/80 backdrop-blur-md z-20 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-4 text-white">
        <div className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: '10s' }}>
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeDasharray="4 4"
              strokeWidth="2"
            ></path>
            <circle className="animate-pulse" cx="12" cy="12" fill="currentColor" r="4"></circle>
          </svg>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-sm font-bold leading-none tracking-[0.2em] font-mono flex items-center gap-2">
            SUPPORT GENIE <span className="text-white/20">|</span>{' '}
            <span className="text-accent animate-pulse">NEURAL STATUS: ONLINE</span>
          </h2>
          <div className="flex items-center gap-1 mt-1 opacity-50">
            <div className="flex items-end gap-0.5 h-3">
              <div className="w-0.5 bg-primary h-1 animate-[pulse_0.5s_ease-in-out_infinite]"></div>
              <div className="w-0.5 bg-primary h-2 animate-[pulse_0.7s_ease-in-out_infinite]"></div>
              <div className="w-0.5 bg-primary h-3 animate-[pulse_0.4s_ease-in-out_infinite]"></div>
              <div className="w-0.5 bg-primary h-1 animate-[pulse_0.6s_ease-in-out_infinite]"></div>
              <div className="w-0.5 bg-primary h-2 animate-[pulse_0.8s_ease-in-out_infinite]"></div>
            </div>
            <span className="text-[9px] font-mono text-primary/80 ml-2">SYSTEM HUM: NORMAL</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleGodMode}
          disabled={isLoading}
          className={`btn-glitch flex items-center gap-2 px-4 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
            godModeActive
              ? 'bg-secondary/20 border border-secondary/50 text-secondary shadow-neon-purple hover:bg-secondary/30 hover:text-white'
              : 'bg-slate-700/50 border border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white'
          } ${isLoading ? 'animate-pulse cursor-not-allowed' : ''}`}
        >
          <span className="material-symbols-outlined text-sm">{godModeActive ? 'verified_user' : 'no_accounts'}</span>
          {isLoading ? 'UPDATING...' : godModeActive ? 'God Mode Active' : 'Activate God Mode'}
        </button>
        <button className="btn-glitch flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 hover:text-white rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all shadow-neon-blue">
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
          Deploy V2.0
        </button>
      </div>
    </header>
  );
};

export default Header;
