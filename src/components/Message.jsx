"use client";

import { motion } from "framer-motion";

const Message = () => {
    return (
        <section className="py-32 bg-[#1a0f14] relative overflow-hidden flex items-center justify-center">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-light rounded-full mix-blend-screen filter blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose rounded-full mix-blend-screen filter blur-[100px]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl"
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

                    <h2 className="font-dancing text-4xl md:text-5xl lg:text-6xl text-gold-light mb-8">
                        My Dearest...
                    </h2>

                    <div className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 space-y-6">
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
