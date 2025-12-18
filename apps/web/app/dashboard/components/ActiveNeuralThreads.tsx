// apps/web/app/dashboard/components/ActiveNeuralThreads.tsx
import { AgentEvent, SessionEvent } from "@/app/hooks/useAgentEvents"

// Helper to get language details
const getLanguageDetails = (lang: string) => {
    switch (lang.toUpperCase()) {
        case 'TELUGU':
            return { code: 'ఆ', color: 'text-primary', font: 'font-telugu' };
        case 'HINDI':
            return { code: 'हि', color: 'text-india-orange', font: 'font-hindi' };
        default:
            return { code: 'language', color: 'text-slate-300', font: '' };
    }
};

// Helper to get state details
const getStateDetails = (state: string) => {
    switch (state) {
        case 'thinking':
            return { text: 'Thinking...', color: 'text-primary', icon: <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span></span> };
        case 'typing':
            return { text: 'Typing', color: 'text-secondary', icon: <span className="material-symbols-outlined text-[14px] animate-pulse">keyboard</span> };
        default:
            return { text: 'Ready', color: 'text-accent', icon: <span className="material-symbols-outlined text-[14px]">check_circle</span> };
    }
};

export const ActiveNeuralThreads = ({ events }: { events: SessionEvent[] }) => {
    // Get the latest event for each session
    const latestEvents = new Map<string, SessionEvent>();
    events.forEach(event => {
        latestEvents.set(event.data.session_id, event);
    });
    const threads = Array.from(latestEvents.values());

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
                        {threads.map((event, index) => {
                            const thread = event.data;
                            const langDetails = getLanguageDetails(thread.language);
                            const stateDetails = getStateDetails(thread.state);
                            return (
                                <tr key={thread.session_id} className="hover:bg-white/5 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-accent">
                                    <td className="px-6 py-4 font-bold text-white group-hover:text-accent transition-colors">{thread.session_id}</td>
                                    <td className="px-6 py-4"><span className={`text-xs ${thread.tier === 'ENTERPRISE' ? 'text-yellow-500' : thread.tier === 'PRO' ? 'text-secondary' : 'text-slate-400'}`}>{thread.tier}</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3 text-white/90">
                                            <div className={`relative w-8 h-8 rounded-full bg-black/40 flex items-center justify-center overflow-hidden border border-primary/50 shadow-[0_0_8px_rgba(0,240,255,0.4)]`}>
                                                <span className={`text-xl font-bold ${langDetails.font} ${langDetails.color} leading-none mt-1`}>{langDetails.code}</span>
                                            </div>
                                            <div className="flex flex-col leading-none">
                                                <span className={`text-[10px] font-bold ${langDetails.color} tracking-wider`}>{thread.language.toUpperCase()}</span>
                                                <span className="text-[9px] text-slate-400">Output Active</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-2 ${stateDetails.color}`}>
                                            {stateDetails.icon}
                                            {stateDetails.text}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-white font-bold">{thread.latency}ms</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
