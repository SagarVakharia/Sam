"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Play } from "lucide-react";

// Placeholder data structure for user to easily swap
const albums = [
    {
        id: 1,
        title: "Sweet Memories",
        cover: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
        ]
    },
    {
        id: 2,
        title: "Adventures",
        cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop" },
            // Placeholder for a video. The user can add their own video src later.
            { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
        ]
    },
    {
        id: 3,
        title: "Funny Times",
        cover: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800&auto=format&fit=crop",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800&auto=format&fit=crop" },
        ]
    },
    {
        id: 4,
        title: "You Slay ✨",
        cover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", // Fashion/Cool
        media: [
            // Placeholder for an image
            { type: "image", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
            // Placeholder for a video to be added later
            { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
            // Placeholders can be freely added below
            { type: "image", src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" }
        ]
    },
];

const Gallery = () => {
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [[currentIndex, direction], setPage] = useState([0, 0]);

    const openAlbum = (album) => {
        setActiveAlbum(album);
        setPage([0, 0]);
    };

    const closeAlbum = () => {
        setActiveAlbum(null);
    };

    const nextMedia = (e) => {
        e.stopPropagation();
        if (activeAlbum) {
            setPage([(currentIndex + 1) % activeAlbum.media.length, 1]);
        }
    };

    const prevMedia = (e) => {
        e.stopPropagation();
        if (activeAlbum) {
            setPage([(currentIndex - 1 + activeAlbum.media.length) % activeAlbum.media.length, -1]);
        }
    };

    return (
        <section id="gallery" className="py-20 bg-gradient-to-b from-pink-50 to-white dark:from-[#0a0a0a] dark:to-[#111] min-h-screen relative transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-playfair text-black dark:text-white flex items-center justify-center gap-3">
                        <Camera className="text-rose" size={40} />
                        Memory Gallery
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 font-sans text-lg">Select an album to relive the moments</p>
                </motion.div>

                {/* Album Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {albums.map((album, index) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            onClick={() => openAlbum(album)}
                            className="group cursor-pointer rounded-2xl overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-rose/10 dark:border-white/10 hover:border-rose/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(192,128,129,0.2)] aspect-square relative shadow-xl"
                        >
                            <img
                                src={album.cover}
                                alt={album.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-serif text-white drop-shadow-md">{album.title}</h3>
                                <p className="text-gold-light/80 text-sm mt-1">{album.media.length} items</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Album Slideshow View */}
            <AnimatePresence>
                {activeAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white/90 dark:bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 transition-colors duration-500"
                        onClick={closeAlbum}
                    >
                        <button
                            className="absolute top-6 right-6 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/10 hover:bg-rose p-3 rounded-full transition-all"
                            onClick={closeAlbum}
                        >
                            <X size={24} />
                        </button>

                        <div
                            className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeAlbum.media.length > 1 && (
                                <button
                                    className="absolute left-0 md:-left-12 text-black/50 dark:text-white/50 hover:text-rose dark:hover:text-white hover:scale-110 transition-all z-10 p-2"
                                    onClick={prevMedia}
                                >
                                    <ChevronLeft size={48} />
                                </button>
                            )}

                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={{
                                        enter: (dir) => ({
                                            x: dir > 0 ? 150 : dir < 0 ? -150 : 0,
                                            opacity: 0,
                                            scale: 0.95,
                                            filter: "blur(12px)",
                                        }),
                                        center: {
                                            zIndex: 1,
                                            x: 0,
                                            opacity: 1,
                                            scale: 1,
                                            filter: "blur(0px)",
                                        },
                                        exit: (dir) => ({
                                            zIndex: 0,
                                            x: dir > 0 ? -150 : dir < 0 ? 150 : 0,
                                            opacity: 0,
                                            scale: 1.05,
                                            filter: "blur(12px)",
                                        })
                                    }}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 1.2 },
                                        opacity: { duration: 1.0 },
                                        scale: { type: "tween", ease: "easeOut", duration: 1.4 },
                                        filter: { duration: 1.0 }
                                    }}
                                    className="absolute w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
                                >
                                    {activeAlbum.media[currentIndex].type === "video" ? (
                                        <video
                                            controls
                                            autoPlay
                                            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-white/10"
                                            src={activeAlbum.media[currentIndex].src}
                                        />
                                    ) : (
                                        <img
                                            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-white/10"
                                            src={activeAlbum.media[currentIndex].src}
                                            alt={`${activeAlbum.title} ${currentIndex + 1}`}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {activeAlbum.media.length > 1 && (
                                <button
                                    className="absolute right-0 md:-right-12 text-black/50 dark:text-white/50 hover:text-rose dark:hover:text-white hover:scale-110 transition-all z-10 p-2"
                                    onClick={nextMedia}
                                >
                                    <ChevronRight size={48} />
                                </button>
                            )}

                            {/* Indicator dots */}
                            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                                {activeAlbum.media.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage([i, i > currentIndex ? 1 : i < currentIndex ? -1 : 0])}
                                        className={`w-2 h-2 rounded-full transition-all shadow-sm ${i === currentIndex ? "bg-rose w-6" : "bg-black/20 dark:bg-white/30 hover:bg-black/40 dark:hover:bg-white/60"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
