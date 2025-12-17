'use client';
import React from 'react';
import useSystemMetrics from '../app/hooks/useSystemMetrics';

const SystemMetrics = () => {
  const { neural_load, confidence, latency_ms } = useSystemMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass-panel p-4 relative overflow-hidden group hover:border-accent/50 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">Neural Load</p>
            <p className="text-white text-3xl font-bold mt-1 tracking-tighter holographic-text">{neural_load}%</p>
          </div>
          <span className="material-symbols-outlined text-slate-700 group-hover:text-accent transition-colors">memory</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a1a1a]">
          <div
            className="h-full bg-accent shadow-[0_0_10px_#00ff9d] transition-all duration-500 ease-in-out"
            style={{ width: `${neural_load}%` }}
          ></div>
        </div>
      </div>
      <div className="glass-panel p-4 relative overflow-hidden group hover:border-secondary/50 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">Confidence</p>
            <p className="text-white text-3xl font-bold mt-1 tracking-tighter holographic-text">{confidence}%</p>
          </div>
          <span className="material-symbols-outlined text-slate-700 group-hover:text-secondary transition-colors">
            verified
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a1a1a]">
          <div
            className="h-full bg-secondary shadow-[0_0_10px_#7000ff] transition-all duration-500 ease-in-out"
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>
      <div className="glass-panel p-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">Latency</p>
            <p className="text-white text-3xl font-bold mt-1 tracking-tighter holographic-text">{latency_ms}ms</p>
          </div>
          <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors">speed</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a1a1a]">
          <div
            className="h-full bg-primary shadow-[0_0_10px_#00f0ff] transition-all duration-500 ease-in-out"
            style={{ width: `${100 - (latency_ms / 100) * 100}%` }} // Inverse relationship for visual
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;
