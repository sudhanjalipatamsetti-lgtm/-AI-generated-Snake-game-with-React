import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "NEON_DREAMS_V1",
    artist: "CYBER_GEN_AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "var(--neon-cyan)"
  },
  {
    id: 2,
    title: "GLITCH_VOID_02",
    artist: "VOID_SYNTH",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "var(--neon-magenta)"
  },
  {
    id: 3,
    title: "BIT_CRUSH_REVENGE",
    artist: "PIXEL_PUNK",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "var(--neon-yellow)"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 neon-border-magenta bg-black flex flex-col gap-6 relative overflow-hidden border-r-8 border-r-[var(--neon-magenta)]">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 neon-border flex items-center justify-center bg-black animate-pulse shadow-[0_0_20px_rgba(0,243,255,0.4)]">
          <Music className="text-[var(--neon-cyan)] w-10 h-10 drop-shadow-[0_0_12px_var(--neon-cyan)]" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[9px] text-[var(--neon-cyan)] uppercase tracking-widest mb-1">AUDIO_DECODING...</span>
          <h3 className="text-2xl font-bold text-[var(--neon-magenta)] truncate glitch-text uppercase tracking-tighter" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-[10px] font-bold text-white/40 uppercase">
            SOURCE: {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="w-full bg-white/5 h-3 border border-[var(--neon-magenta)]/20 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-[var(--neon-magenta)] shadow-[0_0_15px_var(--neon-magenta)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white/20 pointer-events-none uppercase">
          BUFFER_LOAD_SEQUENCE
        </div>
      </div>

      <div className="flex justify-center items-center gap-8">
        <button onClick={prevTrack} className="text-white/80 hover:text-[var(--neon-cyan)] transition-colors">
          <SkipBack size={24} className="drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full neon-border flex items-center justify-center text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)] hover:text-black transition-all shadow-[0_0_10px_var(--neon-cyan)]"
        >
          {isPlaying ? 
            <Pause size={24} className="drop-shadow-[0_0_5px_var(--neon-cyan)]" /> : 
            <Play size={24} className="ml-1 drop-shadow-[0_0_5px_var(--neon-cyan)]" />
          }
        </button>
        <button onClick={nextTrack} className="text-white/80 hover:text-[var(--neon-cyan)] transition-colors">
          <SkipForward size={24} className="drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-mono text-white/30">
        <Volume2 size={12} className="text-[var(--neon-cyan)] opacity-50 drop-shadow-[0_0_3px_var(--neon-cyan)]" />
        <span>AUDIO_STREAM_STABLE</span>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      {/* Visualizer bars simulation */}
      <div className="flex items-end gap-1 h-8 mt-2 opacity-50">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="flex-1 bg-[var(--neon-magenta)]"
            style={{ 
              height: isPlaying ? `${Math.random() * 100}%` : '10%',
              transition: 'height 0.15s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
