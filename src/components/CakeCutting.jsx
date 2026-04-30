"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CakeCutting({ onCut }) {
    const [candleBlown, setCandleBlown] = useState(false);
    const [isCut, setIsCut] = useState(false);
    const [points, setPoints] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const containerRef = useRef(null);

    // Microphone logic for blowing the candle
    useEffect(() => {
        let audioContext;
        let microphone;
        let analyser;
        let rafId;

        const startListening = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                
                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 256;

                microphone.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const checkAudio = () => {
                    if (candleBlown) return; // Stop checking if already blown
                    
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / dataArray.length;
                    
                    // Threshold for blowing (loud low-frequency noise from blowing into mic)
                    if (average > 60) { 
                        setCandleBlown(true);
                        stream.getTracks().forEach(track => track.stop());
                        return; 
                    }
                    rafId = requestAnimationFrame(checkAudio);
                };
                checkAudio();
            } catch (err) {
                console.log("Microphone access denied or not supported. Fallback to tap active.", err);
            }
        };

        startListening();

        return () => {
            if (audioContext && audioContext.state !== 'closed') audioContext.close();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [candleBlown]);

    const triggerCut = () => {
        setIsCut(true);
        setIsDrawing(false);
        setTimeout(() => {
            if (onCut) onCut();
        }, 2000); // Wait for the cake split animation to finish
    };

    const handlePointerDown = (e) => {
        if (isCut) return;
        
        // Fallback: If candle isn't blown yet, the first tap anywhere will blow it!
        if (!candleBlown) {
            setCandleBlown(true);
            return;
        }

        setIsDrawing(true);
        const rect = containerRef.current.getBoundingClientRect();
        setPoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    };

    const handlePointerMove = (e) => {
        if (!isDrawing || isCut || !candleBlown) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        
        setPoints((prev) => [...prev, newPoint]);

        if (points.length > 5) {
            const first = points[0];
            const distance = Math.sqrt(Math.pow(newPoint.x - first.x, 2) + Math.pow(newPoint.y - first.y, 2));
            
            // If the swipe length is greater than 100px, trigger cut
            if (distance > 100) {
                triggerCut();
            }
        }
    };

    const handlePointerUp = (e) => {
        setIsDrawing(false);
        if (!isCut && points.length > 0 && candleBlown) {
            const first = points[0];
            const rect = containerRef.current.getBoundingClientRect();
            const lastX = e.clientX - rect.left;
            const lastY = e.clientY - rect.top;
            const distance = Math.sqrt(Math.pow(lastX - first.x, 2) + Math.pow(lastY - first.y, 2));
            
            // If it was just a quick click (after blown), trigger cut and draw a fake cut line for effect
            if (distance < 20) {
                setPoints([
                    { x: first.x - 100, y: first.y - 100 },
                    { x: first.x + 100, y: first.y + 100 }
                ]);
                triggerCut();
            } else {
                setPoints([]); // reset line if swipe was too short
            }
        }
    };

    const svgPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-orange-50/90 dark:bg-black/80 backdrop-blur-md"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            ref={containerRef}
            style={{ touchAction: 'none' }}
        >
            <div className="relative text-center pointer-events-none z-10 w-full px-4">
                <motion.h3 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-dancing text-amber-600 dark:text-white mb-12 drop-shadow-md dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                >
                    {isCut 
                        ? "Yay! Let's celebrate! 🎉" 
                        : !candleBlown 
                            ? "Make a wish and blow into your mic! 🌬️🎂" 
                            : "Now swipe to cut the cake! 🔪"}
                </motion.h3>

                {/* Cake Container */}
                <motion.div 
                    className="relative w-[95vw] md:w-[85vw] h-[50vh] md:h-[65vh] max-h-[700px] mx-auto rounded-3xl"
                    animate={isCut ? {} : { 
                        y: [0, -25, 0],
                        rotateX: [0, 8, 0],
                        rotateY: [0, -6, 0],
                        scale: [1, 1.03, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ perspective: 1500 }}
                >
                    {/* Left half */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden rounded-3xl"
                        style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                        initial={{ x: 0, rotate: 0 }}
                        animate={isCut ? { x: "-15vw", y: 150, rotateZ: -15, rotateX: 30, opacity: 0 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <Animated3DCake candleBlown={candleBlown} />
                    </motion.div>
                    
                    {/* Right half */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden rounded-3xl"
                        style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                        initial={{ x: 0, rotate: 0 }}
                        animate={isCut ? { x: "15vw", y: 150, rotateZ: 15, rotateX: 30, opacity: 0 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <Animated3DCake candleBlown={candleBlown} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Glowing Knife swipe line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-50">
                {/* Glow effect */}
                <motion.path 
                    d={svgPath} 
                    fill="none" 
                    stroke="#f59e0b" // warm amber glow matching mango
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(0 0 15px #f59e0b)' }}
                    animate={isCut ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                {/* Core line */}
                <motion.path 
                    d={svgPath} 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    animate={isCut ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </svg>
        </motion.div>
    );
}

// Fixed coordinate data so left and right halves are identical when split
const sparkles = [
    { t: 5, l: 25, d: 0 },
    { t: 15, l: 65, d: 0.5 },
    { t: 35, l: 15, d: 1.0 },
    { t: 45, l: 80, d: 1.5 },
    { t: -5, l: 75, d: 0.2 },
    { t: 20, l: 30, d: 0.8 },
    { t: 10, l: 50, d: 1.2 },
    { t: 30, l: 60, d: 0.7 },
];

// Elegant Two-Tier Mango Cake
const Animated3DCake = ({ candleBlown }) => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-visible pointer-events-none">
            {/* The Plate */}
            <div className="absolute top-[75%] left-[10%] w-[80%] h-[20%] bg-gradient-to-b from-stone-100 to-stone-300 rounded-[50%] border-b-[8px] border-stone-400 shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-0 flex items-center justify-center">
                <div className="w-[95%] h-[90%] rounded-[50%] border-[2px] border-amber-300/60" />
            </div>
            
            {/* BOTTOM TIER */}
            {/* Base */}
            <div className="absolute top-[50%] left-[15%] w-[70%] h-[30%] rounded-b-[50%] bg-gradient-to-br from-orange-50 via-yellow-100 to-amber-200 shadow-[inset_-30px_-20px_60px_rgba(0,0,0,0.1)] border-b-[8px] border-amber-300 flex flex-col justify-start overflow-hidden z-10">
                {/* Mango Glaze Drips */}
                <svg className="w-full h-[60%] drop-shadow-md" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 L100,6 Q90,14 80,6 Q65,20 55,6 Q40,16 30,6 Q15,22 0,6 Z" fill="#f59e0b" />
                </svg>
            </div>
            {/* Top Surface */}
            <div className="absolute top-[40%] left-[15%] w-[70%] h-[20%] bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 rounded-[50%] shadow-[inset_0_-5px_20px_rgba(0,0,0,0.2)] border-[4px] border-amber-300 z-20 flex items-center justify-center overflow-hidden">
                <div className="absolute top-[10%] left-[15%] w-[45%] h-[25%] bg-white/40 rounded-[50%] blur-[2px] rotate-[-10deg]" />
            </div>

            {/* TOP TIER */}
            {/* Base */}
            <div className="absolute top-[30%] left-[25%] w-[50%] h-[20%] rounded-b-[50%] bg-gradient-to-br from-orange-50 via-yellow-100 to-amber-200 shadow-[inset_-30px_-20px_60px_rgba(0,0,0,0.1)] border-b-[6px] border-amber-300 flex flex-col justify-start overflow-hidden z-[25]">
                <svg className="w-full h-[70%] drop-shadow-md" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 L100,8 Q85,18 75,8 Q60,22 50,8 Q35,18 25,8 Q10,22 0,8 Z" fill="#f59e0b" />
                </svg>
            </div>
            {/* Top Surface */}
            <div className="absolute top-[20%] left-[25%] w-[50%] h-[20%] bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 rounded-[50%] shadow-[inset_0_-5px_20px_rgba(0,0,0,0.2)] border-[4px] border-amber-300 z-[30] flex items-center justify-center overflow-hidden">
                <div className="absolute top-[10%] left-[15%] w-[45%] h-[25%] bg-white/40 rounded-[50%] blur-[2px] rotate-[-10deg]" />
            </div>

            {/* DECORATIONS */}
            {/* Cream Dollops around Bottom Tier */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                    <div 
                        key={`bottom-cream-${i}`}
                        className="absolute z-[24] bg-gradient-to-br from-white to-stone-100 rounded-[50%] shadow-[0_4px_6px_rgba(0,0,0,0.2)] border border-white/80"
                        style={{
                            top: `${48 + Math.sin(angle) * 8}%`,
                            left: `${47.5 + Math.cos(angle) * 25}%`,
                            width: '5%', height: '5%'
                        }}
                    >
                        <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] border-t-2 border-stone-200 rounded-[50%]" />
                    </div>
                )
            })}

            {/* Mango Cubes along Top Tier front edge */}
            {[...Array(7)].map((_, i) => {
                const angle = (i / 6) * Math.PI; 
                return (
                    <div 
                        key={`top-mango-${i}`}
                        className="absolute z-[31] bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 shadow-md border-t border-yellow-200/50"
                        style={{
                            top: `${27 + Math.sin(angle) * 7}%`, 
                            left: `${48.5 + Math.cos(angle) * 18}%`,
                            width: '3%', height: '4%',
                            borderRadius: '2px 4px 2px 4px',
                            transform: `rotate(${angle * 50}deg)`
                        }}
                    >
                         <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-white/40 rounded-full blur-[1px]" />
                    </div>
                )
            })}

            {/* Cream Dollops around Candle */}
            {[...Array(5)].map((_, i) => {
                const angle = (i / 5) * Math.PI * 2;
                return (
                    <div 
                        key={`top-cream-${i}`}
                        className="absolute z-[31] bg-gradient-to-br from-white to-stone-100 rounded-[50%] shadow-[0_2px_4px_rgba(0,0,0,0.2)] border border-white/80"
                        style={{
                            top: `${28 + Math.sin(angle) * 2}%`,
                            left: `${47.5 + Math.cos(angle) * 4}%`,
                            width: '5%', height: '5%'
                        }}
                    >
                        <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] border-t-2 border-stone-200 rounded-[50%]" />
                    </div>
                )
            })}

            {/* Elegant Candle */}
            <div className="absolute top-[10%] left-[48%] w-[4%] h-[20%] bg-gradient-to-r from-stone-100 via-white to-stone-200 rounded-sm shadow-xl overflow-hidden border border-white/80 z-[32]">
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, #fbbf24 8px, #fbbf24 10px)' }}></div>
            </div>

            {/* Flame */}
            <AnimatePresence>
                {!candleBlown && (
                    <motion.div 
                        key="flame"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: 1,
                            scaleY: [1, 1.2, 0.9, 1.1, 1],
                            skewX: [0, -5, 5, -2, 0],
                            scale: 1
                        }}
                        exit={{ opacity: 0, scale: 0, y: -20, transition: { duration: 0.5 } }}
                        className="absolute top-[0%] left-[47%] w-[6%] h-[10%] bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-50 z-[40]"
                        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', boxShadow: '0 0 40px 20px rgba(251, 191, 36, 0.8)' }}
                        transition={{ 
                            scaleY: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
                            skewX: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Smoke puff when blown */}
            <AnimatePresence>
                {candleBlown && (
                    <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -50, scale: 2 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute top-[0%] left-[48%] w-[4%] h-[10%] bg-gray-300 rounded-full blur-md z-[40]"
                    />
                )}
            </AnimatePresence>

            {/* Ambient Sparkles */}
            {!candleBlown && sparkles.map((s, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-[2%] h-[3%] bg-amber-200 rounded-full blur-[1px] z-50"
                    style={{
                        top: `${s.t}%`,
                        left: `${s.l}%`
                    }}
                    animate={{ 
                        y: [0, -40, 0], 
                        opacity: [0, 1, 0],
                        scale: [0.5, 2, 0.5] 
                    }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: s.d
                    }}
                />
            ))}
        </div>
    );
};
