"use client"

import { useAgentEvents } from '../hooks/useAgentEvents'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cpu, Database, MessageSquare, Search, Brain } from 'lucide-react'

export default function Dashboard() {
    const events = useAgentEvents()
    const lastEvent = events[events.length - 1]

    // Determine active node based on last event
    const activeNode = lastEvent?.agent_name?.toLowerCase() || 'idle'

    return (
        <div className="flex h-screen bg-black text-green-500 font-mono overflow-hidden">
            {/* Left Panel: The Graph Visualization */}
            <div className="w-2/3 p-8 border-r border-green-900 relative">
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Cpu className="w-6 h-6 animate-pulse" />
                    <h1 className="text-xl font-bold tracking-widest">GEMINI 3 PRO // ORCHESTRATION</h1>
                </div>

                {/* Simulated Graph Nodes */}
                <div className="relative h-full w-full flex items-center justify-center">

                    {/* Triage Agent Node */}
                    <AgentNode
                        name="Triage Agent"
                        isActive={activeNode.includes('triage') || activeNode.includes('core')}
                        x={-250} y={-150}
                        icon={<MessageSquare />}
                    />

                    {/* Inventory Agent Node */}
                    <AgentNode
                        name="Inventory Agent"
                        isActive={activeNode.includes('inventory')}
                        x={0} y={0}
                        icon={<Database />}
                    />

                    {/* Stitch Integration Node (Was Deep Research) */}
                    <AgentNode
                        name="Stitch Integration"
                        isActive={activeNode.includes('research')}
                        x={250} y={-150}
                        icon={<Search />}
                    />

                    {/* Sales Agent Node */}
                    <AgentNode
                        name="Sales Agent"
                        isActive={activeNode.includes('sales')}
                        x={250} y={100}
                        icon={<Database />}
                    />

                    {/* Response Handler Node */}
                    <AgentNode
                        name="Response Handler"
                        isActive={activeNode.includes('response')}
                        x={0} y={200}
                        icon={<MessageSquare />}
                    />

                    {/* Connecting Lines (Simulated SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {/* Triage -> Others */}
                        <line x1="30%" y1="35%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" />
                        <line x1="30%" y1="35%" x2="70%" y2="35%" stroke="currentColor" strokeWidth="2" />

                        {/* Research -> Response */}
                        <line x1="70%" y1="35%" x2="50%" y2="75%" stroke="currentColor" strokeWidth="2" />

                        {/* Inventory -> Response */}
                        <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* Right Panel: The Neural Stream (Terminal) */}
            <div className="w-1/3 flex flex-col bg-gray-950">
                <div className="p-4 border-b border-green-900 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> NEURAL STREAM</span>
                    <span className="text-xs text-green-700">LIVE_TRACE_ACTIVE</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                    <AnimatePresence>
                        {events.map((event, i) => {
                            // Style logic: Thoughts are BLUE/CYAN, Final is GREEN
                            const isThought = event.status === 'thought' || event.step_name.includes('Trace');
                            const borderColor = isThought ? 'border-cyan-500' : 'border-green-500';
                            const textColor = isThought ? 'text-cyan-400' : 'text-green-400';

                            return (
                                <motion.div
                                    key={event.id || i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-sm border-l-2 ${borderColor} pl-3 py-1 bg-gray-900/30 mb-2 rounded-r`}
                                >
                                    <div className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                                        <span>[{new Date(event.created_at).toLocaleTimeString()}] :: {event.agent_name.toUpperCase()}</span>
                                        {isThought && <Brain className="w-3 h-3 text-cyan-500 animate-pulse" />}
                                    </div>
                                    <div className={`${textColor} font-bold text-xs uppercase tracking-wider`}>{event.step_name}</div>

                                    {/* Typed text effect for thoughts could go here, simply rendering for now */}
                                    <div className={`mt-1 font-light ${isThought ? 'text-cyan-100 italic' : 'text-gray-300'}`}>
                                        {event.thought_content}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                    <div className="h-4" /> {/* Spacer for auto-scroll */}
                </div>
            </div>
        </div>
    )
}

function AgentNode({ name, isActive, x, y, icon }: { name: string, isActive: boolean, x: number, y: number, icon: any }) {
    // Dynamic color based on node type logic could go here
    const isResearch = name.includes('Research')
    const activeColor = isResearch ? 'border-purple-400 text-purple-100 bg-purple-900/50' : 'border-green-400 text-green-100 bg-green-900/50'
    const shadowColor = isResearch ? '#a855f7' : '#22c55e'

    return (
        <motion.div
            animate={{
                scale: isActive ? 1.2 : 1,
                boxShadow: isActive ? `0 0 30px ${shadowColor}` : "0 0 0px #000"
            }}
            className={`absolute w-32 h-32 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-300
                ${isActive ? activeColor : 'bg-gray-900 border-gray-800 text-gray-600'}
            `}
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            {icon}
            <span className="text-xs font-bold">{name}</span>
            {isActive && <motion.div className="text-[10px] animate-pulse">PROCESSING</motion.div>}
        </motion.div>
    )
}
