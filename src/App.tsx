import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal, Cpu, Zap, Activity, ShieldAlert, Database, Radio } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center justify-center p-4 relative font-mono selection:bg-[var(--neon-magenta)] selection:text-black overflow-hidden">
      <div className="scanline" />
      <div className="static-noise" />
      <div className="screen-tear" />
      <div className="crt-overlay" />

      {/* Background Grid - Jarring Cyan */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }} 
      />

      {/* Header UI - Cryptic & Machine-like */}
      <header className="w-full max-w-7xl flex justify-between items-start mb-12 z-10 border-b-4 border-double border-[var(--neon-cyan)] pb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 neon-border animate-pulse bg-black">
            <Cpu className="text-[var(--neon-cyan)] w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold tracking-tighter glitch-text text-[var(--neon-cyan)] uppercase" data-text="VOID_LINK_ESTABLISHED">
              VOID_LINK_ESTABLISHED
            </h1>
            <div className="flex gap-4 mt-2">
              <span className="text-[10px] bg-[var(--neon-magenta)] text-black px-2 font-bold">SECURE_CHANNEL_01</span>
              <span className="text-[10px] text-[var(--neon-cyan)] animate-pulse">SYNCING_NEURAL_NODES...</span>
            </div>
          </div>
        </div>
        
        <div className="hidden xl:grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] text-[var(--neon-cyan)]/60">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-[var(--neon-magenta)]" />
            <span>CORE_TEMP: 341K</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-[var(--neon-yellow)]" />
            <span>VOLTAGE: 1.21GW</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert size={12} className="text-red-500" />
            <span>THREAT_LEVEL: NULL</span>
          </div>
          <div className="flex items-center gap-2">
            <Radio size={12} className="animate-ping" />
            <span>SIGNAL: STABLE</span>
          </div>
        </div>
      </header>

      {/* Main Content - Jarring Layout */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
        
        {/* Left Sidebar - Cryptic Logs */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="p-6 neon-border bg-black/90 text-[10px] flex flex-col gap-3 border-l-8 border-l-[var(--neon-magenta)]">
            <div className="flex items-center justify-between text-[var(--neon-cyan)] border-b border-[var(--neon-cyan)]/30 pb-2">
              <div className="flex items-center gap-2">
                <Terminal size={14} />
                <span className="font-bold">KERNEL_DUMP</span>
              </div>
              <span className="opacity-50">0x00F3FF</span>
            </div>
            <div className="space-y-1 opacity-80">
              <p className="text-[var(--neon-magenta)] font-bold">ERR: MEMORY_LEAK_DETECTED</p>
              <p>{'>'} Re-routing sub-routines...</p>
              <p>{'>'} Patching void_gate_v4.2...</p>
              <p className="text-[var(--neon-cyan)]">{'>'} Handshake successful.</p>
              <p>{'>'} Awaiting user_input_sequence...</p>
              <p className="animate-pulse">{'>'} _</p>
            </div>
          </div>

          <div className="p-6 neon-border-magenta bg-black/90">
            <div className="flex items-center gap-2 text-[var(--neon-magenta)] mb-4">
              <Database size={16} />
              <h4 className="font-bold uppercase tracking-widest text-sm">Directives</h4>
            </div>
            <ul className="space-y-3 text-[11px] text-white/70">
              <li className="flex gap-2">
                <span className="text-[var(--neon-magenta)]">[01]</span>
                <span>CONSUME_DATA_FRAGMENTS</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--neon-magenta)]">[02]</span>
                <span>AVOID_TEMPORAL_LOOPS</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--neon-magenta)]">[03]</span>
                <span>MAINTAIN_SYNCHRONICITY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Center - Snake Game - The Core */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="absolute -top-8 left-0 text-[10px] text-[var(--neon-cyan)] font-bold tracking-widest animate-pulse">
            PRIMARY_SIMULATION_ACTIVE
          </div>
          <SnakeGame />
          <div className="absolute -bottom-8 right-0 text-[10px] text-[var(--neon-magenta)] font-bold tracking-widest">
            NODE_ID: 7CMEVOLBUT22O7
          </div>
        </div>

        {/* Right Sidebar - Music Player - The Pulse */}
        <div className="lg:col-span-3 flex flex-col gap-6 items-center lg:items-end">
          <div className="w-full">
            <MusicPlayer />
          </div>
          
          <div className="w-full p-6 neon-border bg-black/90 text-[10px] border-r-8 border-r-[var(--neon-magenta)]">
            <div className="flex justify-between mb-2 font-bold">
              <span className="text-[var(--neon-cyan)]">NEURAL_LOAD</span>
              <span>88.4%</span>
            </div>
            <div className="w-full bg-white/5 h-2 border border-[var(--neon-cyan)]/30">
              <div className="w-[88%] h-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]" />
            </div>
            
            <div className="flex justify-between mt-6 mb-2 font-bold">
              <span className="text-[var(--neon-magenta)]">VOID_RESONANCE</span>
              <span>MAX</span>
            </div>
            <div className="w-full bg-white/5 h-2 border border-[var(--neon-magenta)]/30">
              <div className="w-full h-full bg-[var(--neon-magenta)] shadow-[0_0_10px_var(--neon-magenta)] animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Cryptic & Minimal */}
      <footer className="mt-16 w-full max-w-7xl border-t-4 border-double border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center z-10 text-[10px] text-white/30 gap-4">
        <div className="flex items-center gap-4">
          <span className="bg-white/10 px-2 py-1">BUILD_VER: 0.9.4-BETA</span>
          <span>© 2026 VOID_INDUSTRIES_GLOBAL</span>
        </div>
        <div className="flex gap-8 font-bold">
          <span className="hover:text-[var(--neon-magenta)] cursor-crosshair transition-colors">TERMINATE_SESSION</span>
          <span className="hover:text-[var(--neon-cyan)] cursor-crosshair transition-colors">WIPE_MEMORY</span>
          <span className="text-[var(--neon-yellow)] animate-pulse">UPLINK_ENCRYPTED</span>
        </div>
      </footer>
    </div>
  );
}
