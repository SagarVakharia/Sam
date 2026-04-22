"use client";

import { motion } from "framer-motion";

const Message = () => {
    return (
        <section className="py-32 bg-gradient-to-br from-white to-rose-50 dark:from-[#1a0f14] dark:to-[#110a0d] relative overflow-hidden flex items-center justify-center transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-40 dark:opacity-10 pointer-events-none">
                <motion.div 
                    animate={{ y: [0, -30, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} 
                    className="absolute top-0 right-0 w-96 h-96 bg-rose-200 dark:bg-gold-light rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px]"
                ></motion.div>
                <motion.div 
                    animate={{ y: [0, 30, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }} 
                    className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-rose rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px]"
                ></motion.div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-rose/20 dark:border-white/10 p-10 md:p-16 rounded-3xl shadow-[0_8px_32px_rgba(192,128,129,0.15)] dark:shadow-2xl"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-gold to-rose rounded-full flex items-center justify-center shadow-lg"
                    >
                        <span className="text-3xl">💌</span>
                    </motion.div>

                    <h2 className="font-dancing text-4xl md:text-5xl lg:text-6xl text-rose-600 dark:text-gold-light mb-8 drop-shadow-sm dark:drop-shadow-none">
                        My Dearest...
                    </h2>

                    <div className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 space-y-6">
                        <p>
                            On this special day, I just wanted to take a moment to celebrate you.
                            You bring so much light and joy into the world, and every memory we've
                            made is a treasure I hold close to my heart.
                        </p>
                        <p>
                            May this new chapter of your life be filled with endless laughter,
                            beautiful adventures, and all the love you truly deserve.
                        </p>
                        <p className="font-dancing text-3xl text-rose mt-8">
                            Happy Birthday!
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Message;
