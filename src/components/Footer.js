"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-12 bg-black flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <motion.div
                className="flex items-center space-x-3 text-neutral-400 font-sans tracking-widest text-sm uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <span>Forever yours</span>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-rose-500"
                >
                    <Heart size={16} fill="currentColor" strokeWidth={0} />
                </motion.div>

                <span>Happy Birthday</span>
            </motion.div>
        </footer>
    );
};

export default Footer;
