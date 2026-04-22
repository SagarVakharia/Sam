"use client";

import { motion } from "framer-motion";
import Particles from "./Particles";

const Hero = ({ name = "Mimi" }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    };

    const title = `Happy Birthday ${name}!`;

    return (
        <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 via-white to-pink-50 dark:from-black dark:via-[#1a0f14] dark:to-black transition-colors duration-500">
            <Particles />

            <div className="z-10 text-center px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center font-dancing text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400 dark:from-gold-light dark:via-gold dark:to-rose drop-shadow-lg mb-6"
                >
                    {title.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="text-lg md:text-2xl font-serif text-gray-800 dark:text-gray-300 max-w-2xl mx-auto"
                >
                    Let's celebrate this special day together!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
                    className="mt-10"
                >
                    <a
                        href="#gallery"
                        className="px-8 py-4 bg-gradient-to-r from-rose to-purple-800 text-white font-sans rounded-full shadow-[0_0_15px_rgba(192,128,129,0.5)] hover:shadow-[0_0_25px_rgba(192,128,129,0.8)] transition-all duration-300 font-semibold tracking-wide"
                    >
                        Start the Celebration! 🎊
                    </a>
                </motion.div>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400 dark:bg-rose rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-30 dark:opacity-20 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
        </section>
    );
};

export default Hero;
