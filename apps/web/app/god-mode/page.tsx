"use client";

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIG ---
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

// --- TYPES ---
interface Thought {
    id: string;
    step_name: string;
    thought_content: string;
    detected_emotion: string;
    detected_language: string;
    timestamp: string;
}

interface Message {
    id: string;
    sender: 'user' | 'agent';
    content: string;
    msg_type: string;
    timestamp: string;
}

export default function GodMode() {
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // --- REALTIME SUBSCRIPTIONS ---
    useEffect(() => {
        // 1. Thoughts Channel
        const thoughtChannel = supabase
            .channel('god-mode-thoughts')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'thought_logs' },
                (payload) => {
                    setThoughts((prev) => [...prev, payload.new as Thought]);
                }
            )
            .subscribe();

        // 2. Chat Channel
        const chatChannel = supabase
            .channel('god-mode-chat')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new as Message]);
                }
            )
            .subscribe();

        // Initial Fetch (Optional, limited)
        const fetchHistory = async () => {
            const { data: t } = await supabase.from('thought_logs').select('*').order('timestamp', { ascending: false }).limit(20);
            if (t) setThoughts(t.reverse());

            const { data: m } = await supabase.from('messages').select('*').order('timestamp', { ascending: false }).limit(20);
            if (m) setMessages(m.reverse());
        };
        fetchHistory();

        return () => {
            supabase.removeChannel(thoughtChannel);
            supabase.removeChannel(chatChannel);
        };
    }, []);

    // Auto-scroll
    useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [thoughts]);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    return (
        <div className="flex h-screen w-screen bg-[#0d1117] text-[#c9d1d9] font-mono overflow-hidden">

            {/* LEFT: NEURAL LOG (The Brain) */}
            <div className="w-1/2 h-full flex flex-col border-r border-[#30363d] p-4 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff94] to-[#ff0055] opacity-50"></div>
                <h2 className="text-xl font-bold mb-4 tracking-widest text-[#00ff94] flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00ff94] rounded-full animate-pulse"></span>
                    NEURAL_STREAM
                </h2>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                    <AnimatePresence>
                        {thoughts.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[#161b22] border-l-2 border-[#8b9bb4] p-3 rounded bg-opacity-50"
                                style={{ borderColor: getEmotionColor(log.detected_emotion) }}
                            >
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span className="uppercase tracking-wider font-bold text-[#8b9bb4]">[{log.step_name}]</span>
                                    <div className="flex gap-2">
                                        {log.detected_language && <span className="bg-[#21262d] px-1 rounded text-[#c9d1d9]">{log.detected_language}</span>}
                                        <span className="text-[#c9d1d9] opacity-50">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                                <p className="text-sm font-fira leading-relaxed text-[#e6edf3]">
                                    {/* Typewriter effect simulation could go here, but raw text is faster for debug */}
                                    <span className="text-[#7ee787]">{'>'}</span> {log.thought_content}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={logsEndRef} />
                </div>
            </div>

            {/* RIGHT: LIVE MIRROR (The User) */}
            <div className="w-1/2 h-full flex flex-col p-4 bg-[#010409]">
                <h2 className="text-xl font-bold mb-4 tracking-widest text-[#a371f7] flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    LIVE_MIRROR
                </h2>

                <div className="flex-1 overflow-y-auto space-y-4 px-4">
                    {messages.map((msg) => {
                        const isUser = msg.sender === 'user';
                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex w-full ${isUser ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`max-w-[70%] p-3 rounded-lg shadow-lg relative ${isUser
                                    ? 'bg-[#1f6feb] text-white rounded-tl-none'
                                    : 'bg-[#21262d] text-[#e6edf3] border border-[#30363d] rounded-tr-none'
                                    }`}>
                                    <div className="text-[10px] opacity-70 mb-1 uppercase tracking-wide">
                                        {isUser ? 'User' : 'Agent Genie'}
                                    </div>
                                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                                    {msg.msg_type !== 'text' && (
                                        <div className="mt-1 text-xs bg-black/20 p-1 rounded px-2 w-fit">
                                            📎 {msg.msg_type} attached
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>
            </div>

        </div>
    );
}

function getEmotionColor(emotion: string) {
    if (!emotion) return '#8b9bb4'; // default
    if (emotion.includes('angry')) return '#ff0055'; // Red/Pink
    if (emotion.includes('happy')) return '#00ff94'; // Green
    if (emotion.includes('neutral')) return '#a371f7'; // Purple
    return '#8b9bb4';
}
