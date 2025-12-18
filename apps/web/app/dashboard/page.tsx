"use client"

import { useAgentEvents, SessionEvent } from '../hooks/useAgentEvents'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { DeepThinkStream } from './components/DeepThinkStream'
import { NeuralNetworkGraph } from './components/NeuralNetworkGraph'
import { SystemMetrics } from './components/SystemMetrics'
import { ActiveNeuralThreads } from './components/ActiveNeuralThreads'
import { CommsLog } from './components/CommsLog'

export default function Dashboard() {
    const events = useAgentEvents()

    return (
        <div className="bg-background-dark text-slate-200 font-sans overflow-hidden h-screen flex selection:bg-primary selection:text-black">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#050505]">
                <div className="absolute inset-0 pointer-events-none grid-bg opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none"></div>
                <Header />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth scroll-bar-thin scrollbar-thumb-gray-800">
                    <div className="grid grid-cols-12 gap-6 max-w-[1800px] mx-auto min-h-[800px]">
                        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-140px)]">
                            <DeepThinkStream events={events} />
                        </div>
                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto">
                            <NeuralNetworkGraph events={events} />
                            <SystemMetrics events={events} />
                            <ActiveNeuralThreads events={events.filter(e => e.type === 'session') as SessionEvent[]} />
                        </div>
                        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-140px)]">
                            <CommsLog events={events} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
