// apps/web/app/dashboard/components/NeuralNetworkGraph.tsx
export const NeuralNetworkGraph = () => {
    return (
        <div className="glass-panel rounded-none p-1 min-h-[300px] relative group overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-20"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary z-20"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary z-20"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-20"></div>
            <div className="absolute top-4 left-4 z-20 flex flex-col pointer-events-none">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] holographic-text">Neural Network Graph</h3>
                <span className="text-[10px] text-primary font-mono tracking-[0.3em] animate-pulse">PROCESSING...</span>
            </div>
            <div className="w-full h-full bg-[#020202] relative overflow-hidden">
                <div className="absolute inset-0 bg-center bg-cover opacity-40 mix-blend-screen" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdqkHFv8-79Kv6ji-4cSfAD4ut2mZ3IcTC6SAs-AmphcaG1whugJNq-s89yZ1MC84tLPqGX_O8Ehfh-epnnw7dwdhBdpL81_JIfkfwee1P5pWtWDd-pN_5yu4JZD881utnoeTcmDixrMXaMIEdGX9fYxv_sjFGRTmABNEevo02WdTW_UAnKmZDPAQVHeTwqeXEwKCfJn4WPJe2OG8KGcGByBXxLwPSvdwV7sYJ2Fn05sc8VNI8ZM6uPj1frZy3erugEkN1i7ioOoJ9")', filter: 'hue-rotate(180deg) saturate(200%)'}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80"></div>
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur result="coloredBlur" stdDeviation="2.5"></feGaussianBlur>
                            <feMerge>
                                <feMergeNode in="coloredBlur"></feMergeNode>
                                <feMergeNode in="SourceGraphic"></feMergeNode>
                            </feMerge>
                        </filter>
                        <linearGradient id="stream-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="0%" style={{stopColor:'transparent', stopOpacity:0}}></stop>
                            <stop offset="50%" style={{stopColor:'#00f0ff', stopOpacity:1}}></stop>
                            <stop offset="100%" style={{stopColor:'transparent', stopOpacity:0}}></stop>
                        </linearGradient>
                    </defs>
                    <path d="M 100 200 L 300 150 L 500 220" fill="none" stroke="#1a1a1a" strokeWidth="1"></path>
                    <path d="M 300 150 L 400 80" fill="none" stroke="#1a1a1a" strokeWidth="1"></path>
                    <path className="tendril-path" d="M 100 200 Q 200 175 300 150 T 500 220" fill="none" stroke="url(#stream-gradient)" strokeWidth="2"></path>
                    <circle className="brain-node-pulse" cx="100" cy="200" fill="#00f0ff" filter="url(#glow)" r="4"></circle>
                    <circle className="brain-node-pulse" cx="300" cy="150" fill="#7000ff" filter="url(#glow)" r="6" style={{animationDelay: '0.5s'}}></circle>
                    <circle className="brain-node-pulse" cx="500" cy="220" fill="#00ff9d" filter="url(#glow)" r="4" style={{animationDelay: '1s'}}></circle>
                </svg>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
                    <div className="flex flex-col gap-1 backdrop-blur-sm bg-black/40 p-2 rounded border border-white/5 w-2/3 h-16 relative overflow-hidden">
                        <span className="text-[10px] text-primary font-mono font-bold tracking-wider">CURRENT FOCUS THREAD</span>
                        <div className="relative w-full h-full">
                            <p className="absolute inset-0 text-white text-sm font-medium leading-tight font-mono holographic-text animate-text-cycle" style={{animationDelay: '0s'}}>
                                "Routing via Language Matrix..."
                            </p>
                            <p className="absolute inset-0 text-white text-sm font-medium leading-tight font-mono holographic-text animate-text-cycle opacity-0" style={{animationDelay: '3s'}}>
                                "Resolving financial anomaly..."
                            </p>
                            <p className="absolute inset-0 text-white text-sm font-medium leading-tight font-mono holographic-text animate-text-cycle opacity-0" style={{animationDelay: '6s'}}>
                                "Executing refund protocol..."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
