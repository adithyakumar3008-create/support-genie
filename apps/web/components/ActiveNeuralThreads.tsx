'use client';
import React from 'react';
import useNeuralThreads, { NeuralThread } from '../app/hooks/useNeuralThreads';

const ActiveNeuralThreads = () => {
  const threads = useNeuralThreads();

  const getLanguageDetails = (lang: NeuralThread['language']) => {
    switch (lang) {
      case 'TELUGU':
        return {
          symbol: 'ఆ',
          className: 'font-telugu text-primary',
          borderColor: 'border-primary/50',
          shadow: 'shadow-[0_0_8px_rgba(0,240,255,0.4)]',
        };
      case 'HINDI':
        return {
          symbol: 'हि',
          className: 'font-hindi text-india-orange',
          borderColor: 'border-india-orange/50',
          shadow: 'shadow-[0_0_8px_rgba(255,153,51,0.2)]',
        };
      default:
        return {
          symbol: <span className="material-symbols-outlined text-lg text-slate-300 group-hover:text-white">language</span>,
          className: '',
          borderColor: 'border-white/20',
          shadow: '',
        };
    }
  };

  const getStateIndicator = (state: NeuralThread['state']) => {
    switch (state) {
      case 'Thinking...':
        return (
          <div className="flex items-center gap-2 text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            {state}
          </div>
        );
      case 'Typing':
        return (
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[14px] animate-pulse">keyboard</span>
            {state}
          </div>
        );
      case 'Ready':
        return (
          <div className="flex items-center gap-2 text-accent">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            {state}
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-red-500">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {state}
          </div>
        );
    }
  };

  return (
    <div className="glass-panel flex flex-col overflow-hidden flex-1 min-h-[300px]">
      <div className="p-3 border-b border-white/10 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
            <span className="material-symbols-outlined text-primary text-sm">grid_view</span>
            Active Neural Threads
          </h3>
          <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-[9px] font-bold text-green-400 tracking-wider shadow-[0_0_8px_rgba(34,197,94,0.2)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            LANGUAGE MATRIX ACTIVE
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-[10px] text-slate-400 font-mono">LIVE FEED</span>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-black/60 text-[10px] uppercase font-bold text-slate-500 sticky top-0 font-mono">
            <tr>
              <th className="px-6 py-3 tracking-wider">Session ID</th>
              <th className="px-6 py-3 tracking-wider">Tier</th>
              <th className="px-6 py-3 tracking-wider">Lang</th>
              <th className="px-6 py-3 tracking-wider">State</th>
              <th className="px-6 py-3 tracking-wider text-right">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-[11px]">
            {threads.map((thread) => {
              const langDetails = getLanguageDetails(thread.language);
              return (
                <tr
                  key={thread.session_id}
                  className="hover:bg-white/5 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-primary"
                >
                  <td className="px-6 py-4 font-bold text-white group-hover:text-primary transition-colors">
                    {thread.session_id}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs ${
                        thread.tier === 'ENTERPRISE'
                          ? 'text-yellow-500 drop-shadow-[0_0_3px_rgba(234,179,8,0.5)]'
                          : thread.tier === 'PRO'
                          ? 'text-secondary drop-shadow-[0_0_3px_rgba(112,0,255,0.5)]'
                          : 'text-slate-400'
                      }`}
                    >
                      {thread.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-white/90">
                      <div
                        className={`relative w-8 h-8 rounded-full bg-black/40 flex items-center justify-center overflow-hidden border ${langDetails.borderColor} ${langDetails.shadow}`}
                      >
                        <span className={`text-xl font-bold leading-none mt-1 ${langDetails.className}`}>
                          {langDetails.symbol}
                        </span>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className={`text-[10px] font-bold tracking-wider ${
                          thread.language === 'ENGLISH' ? 'text-slate-300' : langDetails.className
                        }`}>
                          {thread.language}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {thread.language === 'ENGLISH' ? 'Global Default' : 'Output Active'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStateIndicator(thread.state)}</td>
                  <td className="px-6 py-4 text-right text-white font-bold">{thread.latency}ms</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveNeuralThreads;
