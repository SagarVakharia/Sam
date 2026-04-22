"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-black dark:to-black py-10 border-t border-rose/10 dark:border-white/10 text-center relative overflow-hidden transition-colors duration-500">
            {/* Small floating hearts effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute bottom-10 left-10 text-rose">🎈</motion.div>
                <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }} className="absolute top-4 right-20 text-blue-400">🎈</motion.div>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <p className="text-gray-600 dark:text-gray-400 font-sans flex items-center justify-center gap-2 flex-wrap text-sm md:text-base">
                    © {new Date().getFullYear()} Birthday Celebration Website. Made with
                    <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        <Heart size={18} className="text-rose fill-rose" />
                    </motion.span>
                    for special moments!
                </p>

                <div className="mt-6 flex justify-center gap-4 text-sm font-sans text-gray-500">
                    <a href="#home" className="hover:text-gold-light transition-colors">Home</a>
                    <a href="#gallery" className="hover:text-gold-light transition-colors">Gallery</a>
                    <a href="#music" className="hover:text-gold-light transition-colors">Music</a>
                    <a href="#countdown" className="hover:text-gold-light transition-colors">Countdown</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
