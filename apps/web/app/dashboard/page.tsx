'use client';
import React from 'react';
import ActiveNeuralThreads from '@/components/ActiveNeuralThreads';
import CommsLog from '@/components/CommsLog';
import DeepThinkStream from '@/components/DeepThinkStream';
import Header from '@/components/Header';
import NeuralNetworkGraph from '@/components/NeuralNetworkGraph';
import Sidebar from '@/components/Sidebar';
import SystemMetrics from '@/components/SystemMetrics';
import useGodMode from '../hooks/useGodMode'; // Ensure this path is correct

export default function DashboardPage() {
  const { god_mode_active, isLoading, error, toggleGodMode } = useGodMode();

  return (
    <div className="bg-background-dark text-slate-200 font-sans overflow-hidden h-screen flex selection:bg-primary selection:text-black">
      <Sidebar godModeActive={god_mode_active} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#050505]">
        <div className="absolute inset-0 pointer-events-none grid-bg opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none"></div>
        <Header
          godModeActive={god_mode_active}
          isLoading={isLoading}
          toggleGodMode={toggleGodMode}
        />
        <main
          className={`flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth scrollbar-thin scrollbar-thumb-gray-800 relative transition-opacity duration-500 ${
            error ? 'opacity-30 pointer-events-none' : 'opacity-100'
          }`}
        >
          {error && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto">
              <div className="bg-red-900/50 border border-red-500 text-red-300 px-8 py-6 rounded-lg text-center font-mono shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-4xl animate-pulse">error</span>
                  <h2 className="text-2xl font-bold uppercase tracking-widest">Neural Link Degraded</h2>
                </div>
                <p className="text-red-400">{error.message}</p>
                <p className="text-slate-400 mt-2 text-sm">UI is in a read-only state. Last known values are shown.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-12 gap-6 max-w-[1800px] mx-auto min-h-[800px]">
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-140px)]">
              <DeepThinkStream />
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto">
              <NeuralNetworkGraph />
              <SystemMetrics />
              <ActiveNeuralThreads />
            </div>
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-140px)]">
              <CommsLog />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
