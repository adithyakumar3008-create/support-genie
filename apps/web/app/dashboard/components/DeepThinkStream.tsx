// apps/web/app/dashboard/components/DeepThinkStream.tsx
"use client";

import { AgentEvent } from "@/app/hooks/useAgentEvents";
import { useState, useEffect } from "react";

// Helper to get language character code
const getLanguageCharacter = (lang: string) => {
    switch (lang.toUpperCase()) {
        case 'TELUGU':
            return 'ఆ';
        case 'HINDI':
            return 'हि';
        default:
            return 'EN';
    }
};

export const DeepThinkStream = ({ events }: { events: AgentEvent[] }) => {
    const [langEvent, setLangEvent] = useState<AgentEvent | null>(null);

    useEffect(() => {
        const latestLangEvent = [...events].reverse().find(event => event.type === 'language');
        if (latestLangEvent && latestLangEvent.id !== langEvent?.id) {
            setLangEvent(latestLangEvent);
            const timer = setTimeout(() => {
                setLangEvent(null);
            }, 5000); // Duration of the toast animation
            return () => clearTimeout(timer);
        }
    }, [events, langEvent?.id]);

    const thoughtEvents = events.filter(event => event.type === 'thought');

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
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQwLCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20 pointer-events-none mix-blend-screen bg-fixed"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-0 deep-think-gradient"></div>

                {/* Language Detection Toast */}
                {langEvent && langEvent.type === 'language' && (
                     <div key={langEvent.id} className="relative z-50 animate-toast-slide mb-6">
                        <div className="bg-black/80 backdrop-blur-md border-l-2 border-primary p-3 rounded-r shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center gap-3 w-full border-t border-b border-r border-white/10">
                            <div className="h-8 w-8 flex items-center justify-center bg-primary/10 rounded-full border border-primary/30">
                                <span className="text-lg font-bold text-primary font-serif pb-1">{getLanguageCharacter(langEvent.data.language_detected)}</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Language Detected</div>
                                <div className="text-xs font-bold text-white">{langEvent.data.language_detected} <span className="text-accent ml-1">{(langEvent.data.confidence_score * 100).toFixed(1)}%</span></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Agent Thought Events */}
                {thoughtEvents.map((event, index) => (
                    <div key={event.id} className="relative pl-4 border-l border-white/10 hover:border-accent transition-colors duration-300 group z-10 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="absolute -left-[5px] top-0 size-2.5 bg-black border border-slate-600 group-hover:border-accent rounded-full flex items-center justify-center transition-all duration-300">
                            <div className="size-1 bg-slate-600 group-hover:bg-accent rounded-full group-hover:shadow-[0_0_8px_#00ff9d]"></div>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-slate-500 font-bold opacity-70">{new Date(event.created_at).toLocaleTimeString()}</span>
                            <span className="px-1.5 py-0.5 bg-accent/10 border border-accent/30 text-accent text-[9px] rounded font-bold tracking-wider shadow-[0_0_10px_rgba(0,255,157,0.3)] animate-badge-pulse backdrop-blur-sm">{event.agent_name}</span>
                        </div>
                        <div className="text-slate-300 font-sans text-[11px] relative leading-relaxed">
                            {event.thought_content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
