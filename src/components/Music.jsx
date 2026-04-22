"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, Music as MusicIcon } from "lucide-react";

// Placeholder audio data
const playlist = [
    { id: 1, title: "Happy Birthday Song", artist: "Birthday Collection", duration: "2:30", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Celebration Time", artist: "Party Mix", duration: "3:15", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Party Anthem", artist: "The Grooves", duration: "2:45", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

const Music = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(false);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    const handleSeek = (e) => {
        if (audioRef.current) {
            const seekTime = (e.target.value / 100) * audioRef.current.duration;
            audioRef.current.currentTime = seekTime;
            setProgress(e.target.value);
        }
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
        }
    }, [currentTrackIndex]);

    const currentTrack = playlist[currentTrackIndex];

    return (
        <section id="music" className="py-20 bg-gradient-to-b from-rose-50 to-pink-50 dark:from-black dark:to-[#0a0a0a] relative transition-colors duration-500">
            <div className="max-w-3xl mx-auto px-4 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-playfair text-black dark:text-white flex items-center justify-center gap-3">
                        <MusicIcon className="text-purple-500 dark:text-purple-400" size={36} />
                        Birthday Playlist
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md border border-rose/20 dark:border-white/5 text-black dark:text-white rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative"
                >
                    {/* Audio Element */}
                    <audio
                        ref={audioRef}
                        src={currentTrack.src}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={nextTrack}
                    />

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                        {/* Spinning Record */}
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-800 shadow-xl border-4 border-zinc-900 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s', animationTimingFunction: 'linear' }}>
                            <div className="w-12 h-12 rounded-full bg-rose border-4 border-zinc-900"></div>
                        </div>

                        {/* Track Info & Controls */}
                        <div className="flex-1 w-full relative pt-2">
                            <h3 className="text-2xl font-bold font-sans">{currentTrack.title}</h3>
                            <p className="text-gray-500 font-sans">{currentTrack.artist}</p>

                            {/* Progress Bar */}
                            <div className="mt-6">
                                <div className="flex justify-between text-xs text-gray-400 font-sans mb-2">
                                    <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
                                    <span>{currentTrack.duration}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress || 0}
                                    onChange={handleSeek}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-center gap-6 mt-6">
                                <button onClick={prevTrack} className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-200 transition-colors">
                                    <SkipBack size={20} className="fill-current" />
                                </button>
                                <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
                                    {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                                </button>
                                <button onClick={nextTrack} className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-200 transition-colors">
                                    <SkipForward size={20} className="fill-current" />
                                </button>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-gray-400">
                                <Volume2 size={16} />
                                <input type="range" min="0" max="1" step="0.01" defaultValue="1" onChange={(e) => { if (audioRef.current) audioRef.current.volume = e.target.value }} className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Playlist */}
                    <div>
                        <h4 className="font-bold flex items-center gap-2 text-gray-600 mb-4 font-sans">
                            <MusicIcon size={16} /> Playlist
                        </h4>
                        <div className="space-y-2">
                            {playlist.map((track, i) => (
                                <div
                                    key={track.id}
                                    onClick={() => { setCurrentTrackIndex(i); setIsPlaying(true); }}
                                    className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition-colors ${currentTrackIndex === i ? 'bg-gradient-to-r from-pink-100 to-teal-50 dark:from-pink-900/30 dark:to-teal-900/30 border-l-4 border-rose' : 'hover:bg-gray-50 dark:hover:bg-zinc-800'}`}
                                >
                                    <span className="font-sans font-medium text-gray-800 dark:text-gray-200">{i + 1}. {track.title}</span>
                                    <span className="font-sans text-sm text-gray-500 dark:text-gray-400">{track.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Music;
