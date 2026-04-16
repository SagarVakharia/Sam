"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Particles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles only on the client side to avoid hydration mismatch
        const particleArray = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            xEnd: Math.random() * 10 - 5,
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(particleArray);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-gold rounded-full opacity-30"
                    initial={{
                        x: `${p.x}vw`,
                        y: "110vh",
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: "-10vh",
                        x: [`${p.x}vw`, `${p.x + p.xEnd}vw`],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const letters = "Happy Birthday [Name]".split("");

const Hero = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden flex-col">
            <Particles />

            {/* Background soft glow gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-black to-black"></div>

            <motion.div
                className="z-10 text-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 1 },
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-handwriting text-gold-light drop-shadow-lg tracking-wider">
                    {letters.map((char, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.2, 0.65, 0.3, 0.9],
                            }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className="mt-8 text-lg md:text-2xl font-sans text-gray-300 font-light tracking-widest uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
                >
                    A celebration of you
                </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
            >
                <span className="text-xs text-gray-400 tracking-widest uppercase mb-2 font-serif">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
