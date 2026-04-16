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
];

const Gallery = () => {
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openAlbum = (album) => {
        setActiveAlbum(album);
        setCurrentIndex(0);
    };

    const closeAlbum = () => {
        setActiveAlbum(null);
    };

    const nextMedia = (e) => {
        e.stopPropagation();
        if (activeAlbum) {
            setCurrentIndex((prev) => (prev + 1) % activeAlbum.media.length);
        }
    };

    const prevMedia = (e) => {
        e.stopPropagation();
        if (activeAlbum) {
            setCurrentIndex((prev) => (prev - 1 + activeAlbum.media.length) % activeAlbum.media.length);
        }
    };

    return (
        <section id="gallery" className="py-20 bg-[#0a0a0a] min-h-screen relative">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-playfair text-white flex items-center justify-center gap-3">
                        <Camera className="text-rose" size={40} />
                        Memory Gallery
                    </h2>
                    <p className="text-gray-400 mt-4 font-sans text-lg">Select an album to relive the moments</p>
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
                            className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-rose/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(192,128,129,0.2)] aspect-square relative"
                        >
                            <img
                                src={album.cover}
                                alt={album.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-serif text-white">{album.title}</h3>
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
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={closeAlbum}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-rose p-3 rounded-full transition-all"
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
                                    className="absolute left-0 md:-left-12 text-white/50 hover:text-white hover:scale-110 transition-all z-10 p-2"
                                    onClick={prevMedia}
                                >
                                    <ChevronLeft size={48} />
                                </button>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full flex items-center justify-center"
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
                                    className="absolute right-0 md:-right-12 text-white/50 hover:text-white hover:scale-110 transition-all z-10 p-2"
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
                                        onClick={() => setCurrentIndex(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-rose w-6" : "bg-white/30 hover:bg-white/60"}`}
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
