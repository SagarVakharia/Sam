"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const Countdown = () => {
    // Default target date is 11th May 2026 12 am.
    const getDefaultDate = () => {
        return "2026-05-11T00:00";
    };

    const [targetDate, setTargetDate] = useState(getDefaultDate());
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <section id="countdown" className="py-20 bg-gradient-to-b from-rose-100 to-white dark:from-black dark:to-[#1a0f14] relative transition-colors duration-500 overflow-hidden">
            {/* Background Floating Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5">
                <motion.div animate={{ y: [0, 40, 0], rotate: [0, -45, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} className="absolute top-10 left-1/4 text-rose-500 dark:text-rose"><Clock size={100} /></motion.div>
                <motion.div animate={{ y: [0, -40, 0], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }} className="absolute bottom-10 right-1/4 text-purple-500 dark:text-gold-light"><Clock size={120} /></motion.div>
            </div>

            <div className="max-w-4xl mx-auto px-4 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-playfair text-black dark:text-white flex items-center justify-center gap-3">
                        <Clock className="text-rose" size={40} />
                        Birthday Countdown
                    </h2>

                    <div className="mt-8 flex flex-col items-center justify-center gap-2">
                        <label className="text-gray-600 dark:text-gray-400 font-sans">Set Your Birthday Date:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="datetime-local"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="bg-black/5 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-rose transition-colors"
                            />
                            <button
                                onClick={() => setTargetDate(getDefaultDate())}
                                className="bg-black/5 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg px-4 py-2 font-sans hover:bg-rose dark:hover:bg-rose hover:text-white dark:hover:border-rose focus:outline-none transition-colors active:scale-95"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Timer Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
                    {Object.entries(timeLeft).map(([unit, value], index) => (
                        <motion.div
                            key={unit}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center border border-rose/20 dark:border-white/10 shadow-[0_8px_32px_rgba(192,128,129,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-rose/50 transition-colors"
                        >
                            <div className="text-5xl md:text-7xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-br from-rose-500 to-purple-600 dark:from-white dark:to-rose mb-2">
                                {value.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xs md:text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase font-sans">
                                {unit}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-white/70 dark:bg-white/5 border border-rose/20 dark:border-white/10 rounded-2xl p-6 text-center shadow-xl"
                >
                    <p className="text-xl font-sans text-gray-800 dark:text-gray-200">
                        🎂 {timeLeft.days} days until your special day!
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Countdown;
