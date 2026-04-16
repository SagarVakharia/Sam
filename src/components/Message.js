"use client";

import { motion } from "framer-motion";

const Message = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-neutral-950 flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

            <div className="max-w-3xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-neutral-200 leading-relaxed md:leading-loose">
                        &quot;Every year with you is more beautiful than the last. May this special day be filled with all the bright and wonderful things you deserve.&quot;
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16"
                >
                    <span className="font-handwriting text-5xl md:text-6xl text-gold-light">
                        With all my love
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default Message;
