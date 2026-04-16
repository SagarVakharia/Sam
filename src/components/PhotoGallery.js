"use client";

import { motion } from "framer-motion";

const photos = [
    { id: 1, src: "/photos/pic1.jpg", alt: "Memory 1", span: "col-span-1 row-span-2" },
    { id: 2, src: "/photos/pic2.jpg", alt: "Memory 2", span: "col-span-2 row-span-1" },
    { id: 3, src: "/photos/pic3.jpg", alt: "Memory 3", span: "col-span-1 row-span-1" },
    { id: 4, src: "/photos/pic4.jpg", alt: "Memory 4", span: "col-span-1 row-span-2" },
    { id: 5, src: "/photos/pic5.jpg", alt: "Memory 5", span: "col-span-2 row-span-2" },
    { id: 6, src: "/photos/pic6.jpg", alt: "Memory 6", span: "col-span-1 row-span-1" },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    },
};

const PhotoGallery = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-black w-full min-h-screen">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-serif text-gold-light mb-6"
                    >
                        The Memories
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-24 h-px bg-gold/50 mx-auto"
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4"
                >
                    {photos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            variants={itemVariants}
                            className={`relative overflow-hidden rounded-xl bg-neutral-900 group ${photo.span}`}
                        >
                            {/* Using a placeholder div to simulate images since we use placeholder paths */}
                            <div className="absolute inset-0 bg-neutral-800 transition-transform duration-700 ease-in-out group-hover:scale-110">
                                {/* Fallback pattern for placeholders if there's no real image */}
                                <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                                {/* 
                  When real images are provided, uncomment the img tag below:
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-125"
                  />
                */}

                                {/* Remove this flex container once real images are used */}
                                <div className="w-full h-full flex items-center justify-center border border-white/5 rounded-xl transition-all duration-700 group-hover:bg-neutral-700/50 group-hover:brightness-125">
                                    <span className="text-neutral-500 font-sans text-sm tracking-wider">{photo.src}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PhotoGallery;
