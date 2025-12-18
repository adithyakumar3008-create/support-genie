// apps/web/app/dashboard/components/CommsLog.tsx
import { AgentEvent } from "@/app/hooks/useAgentEvents";

export const CommsLog = ({ events }: { events: AgentEvent[] }) => {
    const thoughtEvents = events.filter(e => e.type === 'thought');

    return (
        <div className="glass-panel flex flex-col h-full overflow-hidden bg-[#080808]">
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Comms Log
                </h3>
                <div className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] text-slate-400 font-mono">
                    ENCRYPTED::AES-256
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative scanline-overlay">
                <div className="flex flex-col gap-1 items-end">
                    <div className="text-[9px] text-slate-500 font-mono uppercase">User #8829 <span className="text-slate-700">|</span> 10:41:55</div>
                    <div className="max-w-[85%] msg-container border-l-0 border-r-2 border-r-slate-500 bg-white/5 p-3 rounded-l-lg rounded-tr-sm text-xs text-slate-300 font-mono">
                        <p className="opacity-90">My billing shows a double charge for the last cycle. Can you check?</p>
                    </div>
                </div>

                {thoughtEvents.map(event => (
                    <div key={event.id} className="flex flex-col gap-1 items-start">
                        <div className="text-[9px] text-primary font-mono uppercase flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">smart_toy</span> GOD MODE AI <span className="text-slate-700">|</span> {new Date(event.created_at).toLocaleTimeString()}
                        </div>
                        <div className="max-w-[90%] msg-container border-primary bg-primary/5 p-3 rounded-r-lg rounded-tl-sm text-xs text-white font-mono shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                            <p className="leading-relaxed">
                                {event.thought_content}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col gap-1 items-end">
                    <div className="text-[9px] text-slate-500 font-mono uppercase">User #8829 <span className="text-slate-700">|</span> 10:42:10</div>
                    <div className="max-w-[85%] msg-container border-l-0 border-r-2 border-r-slate-500 bg-white/5 p-3 rounded-l-lg rounded-tr-sm text-xs text-slate-300 font-mono">
                        <p className="opacity-90">Wait, really? That was incredibly fast. Thanks.</p>
                    </div>
                </div>
            </div>
            <div className="p-3 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 bg-black border border-white/10 rounded px-3 py-2 focus-within:border-primary/50 focus-within:shadow-neon-blue transition-all">
                    <span className="text-primary font-mono">&gt;</span>
                    <input className="bg-transparent border-none p-0 text-xs text-white w-full font-mono focus:ring-0 placeholder:text-slate-700" placeholder="Inject System Override..." type="text"/>
                    <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined text-sm">send</span></button>
                </div>
            </div>
        </div>
    )
}
