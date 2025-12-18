// apps/web/app/dashboard/components/Sidebar.tsx
export const Sidebar = () => {
    return (
        <aside className="w-20 lg:w-64 border-r border-white/5 hidden md:flex flex-col bg-[#050505] shrink-0 z-30 relative">
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
            <div className="p-4 lg:p-6 pb-2 border-b border-white/5">
                <div className="flex items-center gap-4 mb-2 lg:mb-6 justify-center lg:justify-start">
                    <div className="relative group cursor-pointer">
                        <div className="bg-center bg-no-repeat bg-cover rounded-none clip-path-hexagon size-10 lg:size-12 border border-primary/50 shadow-neon-blue transition-all duration-300 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqOGvnWeMYYBAF2WkK0YfteHXGGMLo0e0xozmV9d7Ay5EW_2gx4aRUNHA5yPbfJQ3VVmr0ixCtOH7BBkWruXKvhuCG81faeSsoYXcPS7gJYSINUrxNXXjXfJC5KtuXHZeku_HauGm2uYWQWks2FYjQf-NB9MEpxrvzxShFsZ3aYkQlIuVVGSg2uXCXTb-iBwsdKXEit8NKPy7VetVtCGPOHmYweEeYXsf8sdD9BAWjWrZgojAhwgK7zc9FhhZ9XJ9hcGzC7hwM3sKT")'}}></div>
                        <div className="absolute -inset-1 bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <h1 className="text-white text-lg font-bold tracking-widest uppercase font-mono holographic-text">God Mode</h1>
                        <p className="text-primary text-[10px] font-bold tracking-[0.2em] animate-pulse">SYSTEM_ACTIVE</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2 lg:p-4 flex-1 overflow-y-auto font-mono">
                <p className="hidden lg:block px-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 mt-2">Neural Link</p>
                <a className="flex items-center gap-3 px-3 py-3 rounded-sm bg-primary/5 border-l-2 border-primary text-primary group transition-all hover:bg-primary/10 hover:translate-x-1" href="#">
                    <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">neurology</span>
                    <span className="hidden lg:block text-xs font-bold uppercase tracking-wider">Cortex Status</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-white/5 border-l-2 border-transparent hover:border-white/20 text-slate-500 hover:text-white group transition-all hover:translate-x-1" href="#">
                    <span className="material-symbols-outlined text-xl group-hover:text-secondary transition-colors">memory</span>
                    <span className="hidden lg:block text-xs font-bold uppercase tracking-wider">Memory Core</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-white/5 border-l-2 border-transparent hover:border-white/20 text-slate-500 hover:text-white group transition-all hover:translate-x-1" href="#">
                    <span className="material-symbols-outlined text-xl group-hover:text-accent transition-colors">translate</span>
                    <span className="hidden lg:block text-xs font-bold uppercase tracking-wider">Polyglot</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-white/5 border-l-2 border-transparent hover:border-white/20 text-slate-500 hover:text-white group transition-all hover:translate-x-1" href="#">
                    <span className="material-symbols-outlined text-xl group-hover:text-red-500 transition-colors">admin_panel_settings</span>
                    <span className="hidden lg:block text-xs font-bold uppercase tracking-wider">Firewall</span>
                </a>
            </div>
            <div className="p-4 border-t border-white/5 bg-[#080808]">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="relative">
                        <div className="size-8 lg:size-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10 relative z-10">
                            <img className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all" data-alt="User avatar profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAguTHHvY_A_EdTngUflhxqiV-Yu3w6NGIxlBZTWP0hqZKrKKNf-Uhs_4bmiRv51iYCiUmbx9hM2ErrxWn7Z8wIdSqLWdw3RBq8w22dR7rvK7ij1coh6FgOga_abZtC6G8G5mua9ZaHNQFjO8qORyjulhGRVe7khb6Mlc2d6-CfOPAPKxQCa4nGgz84TX0MPAPa9dAVQniTodlH9lyBv8efojoi6JRW6FyX6WXCM-IYJhsUF6YfvnptsGUEuppwlkQOfHMOgjWQOJuF"/>
                        </div>
                        <div className="absolute -inset-0.5 bg-accent/30 rounded-full blur-sm animate-pulse-fast"></div>
                        <div className="absolute bottom-0 right-0 size-2.5 bg-accent rounded-full border-2 border-black z-20 shadow-[0_0_8px_#00ff9d]"></div>
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <span className="text-xs font-bold text-white font-mono">OP: TURING</span>
                        <span className="text-[10px] text-slate-500 font-mono tracking-tight">LVL 5 ACCESS</span>
                    </div>
                    <div className="group relative hidden lg:block ml-auto cursor-help">
                        <button className="text-slate-600 hover:text-slate-400 transition-colors">
                            <span className="text-lg grayscale opacity-50">💰</span>
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-max px-2 py-1 bg-black/90 border border-white/10 text-[9px] text-slate-300 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-mono">
                            Soft Sales Engine Idle
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
