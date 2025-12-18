// apps/web/app/dashboard/components/SystemMetrics.tsx
"use client";

import { AgentEvent } from "@/app/hooks/useAgentEvents";
import { useState, useEffect } from "react";

export const SystemMetrics = ({ events }: { events: AgentEvent[] }) => {
    const [metrics, setMetrics] = useState({
        neuralLoad: 0,
        confidence: 0,
        latency: 0,
    });

    useEffect(() => {
        // Find the latest metrics event
        const metricEvent = [...events].reverse().find(event => event.type === 'metrics');
        if (metricEvent && metricEvent.type === 'metrics') {
            const { neural_load, confidence, latency_ms } = metricEvent.data;
            setMetrics({
                neuralLoad: Math.round(neural_load * 100),
                confidence: parseFloat((confidence * 100).toFixed(1)),
                latency: latency_ms,
            });
        }
    }, [events]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 relative overflow-hidden group hover:border-accent/50 transition-colors">
                <div className="flex justify-between items-start z-10 relative">
                    <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">Neural Load</p>
                        <p className="text-white text-3xl font-bold mt-1 tracking-tighter holographic-text">{metrics.neuralLoad}%</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-700 group-hover:text-accent transition-colors">memory</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a1a1a]">
                    <div className="h-full bg-accent shadow-[0_0_10px_#00ff9d]" style={{ width: `${metrics.neuralLoad}%` }}></div>
                </div>
            </div>
            <div className="glass-panel p-4 relative overflow-hidden group hover:border-secondary/50 transition-colors">
                <div className="flex justify-between items-start z-10 relative">
                    <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">Confidence</p>
                        <p className="text-white text-3xl font-bold mt-1 tracking-tighter holographic-text">{metrics.confidence}%</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-700 group-hover:text-secondary transition-colors">verified</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a1a1a]">
                    <div className="h-full bg-secondary shadow-[0_0_10px_#7000ff]" style={{ width: `${metrics.confidence}%` }}></div>
                </div>
            </div>
            <div className="glass-panel p-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start z-10 relative">
                    <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">Latency</p>
                        <p className="text-white text-3xl font-bold mt-1 tracking-tighter holographic-text">{metrics.latency}ms</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors">speed</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a1a1a]">
                    <div className="h-full bg-primary shadow-[0_0_10px_#00f0ff]" style={{ width: `${Math.max(0, 100 - metrics.latency / 2)}%` }}></div>
                </div>
            </div>
        </div>
    )
}
