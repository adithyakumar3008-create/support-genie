'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Terminal, MessageSquare, Box, ShoppingCart, RefreshCcw, Search, ExternalLink } from 'lucide-react';

// --- CONFIG ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- TYPES ---
interface Thought {
  id: string;
  step_name: string;
  thought_content: string;
  timestamp: string;
  session_id: string;
  detected_emotion?: string;
  detected_language?: string;
}

// --- COMPONENTS ---

export default function GodModeDashboard() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [activeNode, setActiveNode] = useState<string>('idle');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thoughts]);

  // --- REALTIME SUBSCRIPTION ---
  useEffect(() => {
    console.log("🔌 Connecting to Brain Stream (GDG Protocol)...");

    // Initial fetch
    const fetchHistory = async () => {
      const { data } = await supabase.from('thought_logs').select('*').order('timestamp', { ascending: false }).limit(5);
      if (data) setThoughts(data.reverse());
    };
    fetchHistory();

    const channel = supabase
      .channel('thought_logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'thought_logs' },
        (payload) => {
          const newThought = payload.new as Thought;
          console.log("🧠 NEW THOUGHT:", newThought);
          setThoughts((prev) => [...prev, newThought]);
          setActiveNode('triage_node'); // Pulse center for now

          // Reset Pulse after 2s
          setTimeout(() => setActiveNode('idle'), 2000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex gap-4 overflow-hidden">

      {/* LEFT PANEL: MOCK WHATSAPP */}
      <div className="w-1/4 border border-gray-800 rounded-2xl bg-gray-900 flex flex-col relative overflow-hidden opacity-80">
        <div className="bg-[#075E54] p-3 flex items-center gap-2 text-white shadow-md">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div>
            <h2 className="font-bold text-sm">SupportGenie</h2>
            <p className="text-xs text-green-100">online</p>
          </div>
        </div>
        <div className="flex-1 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-50 p-4 flex flex-col gap-2">
          <div className="self-end bg-[#E2F7CB] text-black p-2 rounded-lg text-xs max-w-[80%] shadow">
            Can I get a refund for my rice?
          </div>
          <div className="self-start bg-white text-black p-2 rounded-lg text-xs max-w-[80%] shadow">
            Checking your order...
          </div>
          {/* Dynamic Overlay could go here */}
        </div>
        <div className="p-3 bg-gray-800">
          <div className="h-8 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* CENTER PANEL: REACT FLOW / VISUALIZATION */}
      <div className="flex-1 border border-green-900/50 rounded-2xl bg-black relative flex items-center justify-center">
        <div className="absolute top-4 left-4 text-xs text-green-700">NEURAL ARCHITECTURE</div>

        {/* NETWORK GRAPH */}
        <div className="relative w-full h-full max-w-2xl max-h-[600px] grid grid-cols-3 grid-rows-3 gap-8 p-12">

          {/* START */}
          <Node label="Webhook" icon={<ExternalLink />} active={activeNode === 'start'} col="col-start-1" row="row-start-2" />

          {/* TRIAGE (CENTRAL HUB) */}
          <Node label="Triage Core" icon={<Brain />} active={activeNode === 'triage_node'} col="col-start-2" row="row-start-2" large />

          {/* BRANCHES */}
          <Node label="Inventory" icon={<Box />} active={activeNode === 'inventory_agent'} col="col-start-3" row="row-start-1" />
          <Node label="Sales" icon={<ShoppingCart />} active={activeNode === 'sales_agent'} col="col-start-3" row="row-start-2" />
          <Node label="Refund" icon={<RefreshCcw />} active={activeNode === 'refund_node'} col="col-start-3" row="row-start-3" />

          {/* CONNECTIONS (SVG) */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full stroke-green-900 opacity-50 z-0">
            <line x1="20%" y1="50%" x2="50%" y2="50%" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="50%" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* RIGHT PANEL: THOUGHT STREAM */}
      <div className="w-1/3 border border-green-500/30 rounded-2xl bg-black p-4 flex flex-col font-mono shadow-[0_0_20px_rgba(0,255,0,0.1)]">
        <div className="flex items-center gap-2 mb-4 border-b border-green-900 pb-2">
          <Terminal size={16} />
          <h2 className="text-sm font-bold">COGNITIVE STREAM (Gemini 3 Pro)</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          <AnimatePresence>
            {thoughts.map((t, i) => (
              <motion.div
                key={t.id || i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs border-l-2 border-green-700 pl-3 py-1"
              >
                <span className="text-green-600 opacity-50">[{new Date(t.timestamp).toLocaleTimeString()}]</span>
                <span className="text-blue-400 font-bold ml-2">@{t.step_name}</span>
                {t.detected_emotion && <span className="ml-2 px-1 rounded bg-yellow-900 text-yellow-300 text-[10px]">{t.detected_emotion}</span>}
                {t.detected_language && <span className="ml-1 px-1 rounded bg-purple-900 text-purple-300 text-[10px]">{t.detected_language}</span>}
                <p className="mt-1 text-green-300 leading-relaxed typewriter">{t.thought_content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={terminalEndRef} />
        </div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function Node({ label, icon, active, col, row, large = false }: any) {
  return (
    <div className={`${col} ${row} flex flex-col items-center justify-center z-10 transition-all duration-300`}>
      <motion.div
        animate={{
          scale: active ? 1.2 : 1,
          boxShadow: active ? "0 0 30px #22c55e" : "0 0 0px #000"
        }}
        className={`
                    flex items-center justify-center rounded-xl bg-gray-900 border border-green-800
                    ${large ? 'w-24 h-24' : 'w-16 h-16'}
                    ${active ? 'border-green-400 bg-green-900/20' : ''}
                `}
      >
        <div className={`${active ? 'text-green-400' : 'text-green-800'}`}>
          {icon}
        </div>
      </motion.div>
      <span className={`mt-2 text-xs uppercase tracking-widest ${active ? 'text-green-400 font-bold' : 'text-green-900'}`}>{label}</span>
    </div>
  )
}
