"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Play, Lock } from "lucide-react";

// Placeholder data structure for user to easily swap
const albums = [
    {
        id: 1,
        title: "Your Sweet Memories",
        cover: "/her_3.JPG",
        media: [
            { type: "video", src: "/her_1.MP4" },
            { type: "image", src: "/her_2.PNG" },
            { type: "image", src: "/her_3.JPG" },
            { type: "image", src: "/her_4.JPG" },
            { type: "video", src: "/her_5.MP4" },
            { type: "image", src: "/her_6.JPG" },
            { type: "image", src: "/her_7.JPG" },
            { type: "video", src: "/her_8.MOV" },
            { type: "image", src: "/her_9.JPG" },
            { type: "image", src: "/her_10.JPG" },
            { type: "image", src: "/her_11.JPG" },
            { type: "video", src: "/her_12.MOV" },
            { type: "video", src: "/her_13.MP4" },
            { type: "image", src: "/her_14.JPG" },
            { type: "image", src: "/her_15.JPG" },
            { type: "image", src: "/her_16.JPG" },
            { type: "image", src: "/her_17.JPG" },
            { type: "image", src: "/her_18.JPG" },
            { type: "image", src: "/her_19.JPG" },
            { type: "image", src: "/her_20.JPG" },
        ]
    },
    {
        id: 2,
        title: "Fun With Friends",
        cover: "/All_3.JPG",
        media: [
            { type: "video", src: "/All_1.MOV" },
            { type: "image", src: "/All_2.JPG" },
            { type: "image", src: "/All_3.JPG" },
            { type: "video", src: "/All_4.MOV" },
            { type: "image", src: "/All_5.JPG" },
            { type: "image", src: "/All_6.JPG" },
            { type: "image", src: "/All_7.JPG" },
            { type: "image", src: "/All_8.JPG" },
            { type: "image", src: "/All_9.JPG" },
            { type: "video", src: "/All_10.MOV" },
            { type: "image", src: "/All_11.JPG" },
            { type: "image", src: "/All_12.JPG" },
            { type: "image", src: "/All_13.JPG" },
            { type: "image", src: "/All_14.JPG" },
            { type: "image", src: "/All_15.JPG" },
        ]
    },
    {
        id: 3,
        title: "You N Me",
        cover: "/Us_3.JPG",
        media: [
            { type: "video", src: "/Us_1.MP4" },
            { type: "video", src: "/Us_2.MP4" },
            { type: "image", src: "/Us_3.JPG" },
            { type: "video", src: "/Us_5.MOV" },
            { type: "image", src: "/Us_6.JPG" },
            { type: "image", src: "/Us_7.JPG" },
            { type: "video", src: "/Us_8.MOV" },
            { type: "image", src: "/Us_9.JPG" },
            { type: "image", src: "/Us_11.JPG" },
            { type: "image", src: "/Us_12.JPG" },
            { type: "image", src: "/Us_13.JPG" },
            { type: "image", src: "/Us_14.JPG" },
            { type: "image", src: "/Us_15.JPG" },
            { type: "image", src: "/Us_17.JPG" },
            { type: "image", src: "/Us_18.JPG" },
            { type: "image", src: "/Us_19.JPG" },
            { type: "image", src: "/Us_20.JPG" }
        ]
    },
    {
        id: 4,
        title: "You Slay Bubs ✨",
        cover: "/Slay_12.JPG", // Fashion/Cool
        media: [
            { type: "image", src: "/Slay_1.JPG" },
            { type: "image", src: "/Slay_2.JPG" },
            { type: "image", src: "/Slay_3.JPG" },
            { type: "image", src: "/Slay_4.JPG" },
            { type: "image", src: "/Slay_5.JPG" },
            { type: "video", src: "/Slay_6.MP4" },
            { type: "video", src: "/Slay_7.MP4" },
            { type: "image", src: "/Slay_8.JPG" },
            { type: "image", src: "/Slay_9.JPG" },
            { type: "video", src: "/Slay_10.MP4" },
            { type: "image", src: "/Slay_11.JPG" },
            { type: "image", src: "/Slay_12.JPG" },
            { type: "video", src: "/Slay_13.MOV" },
            { type: "image", src: "/Slay_14.JPG" },
            { type: "image", src: "/Slay_15.JPG" },
            { type: "image", src: "/Slay_16.JPG" },
            { type: "image", src: "/Slay_17.JPG" },
            { type: "video", src: "/Slay_18.MOV" },
            { type: "video", src: "/Slay_19.MOV" },
            { type: "image", src: "/Slay_20.JPG" },

        ]
    },
];

const Gallery = () => {
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [[currentIndex, direction], setPage] = useState([0, 0]);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState(false);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (passwordInput === "Bubs_Birthday") {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
        }
    };

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
        <section id="gallery" className="py-20 bg-gradient-to-b from-pink-50 to-white dark:from-[#0a0a0a] dark:to-[#111] min-h-screen relative transition-colors duration-500 overflow-hidden">
            {/* Background Floating Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-[0.03]">
                <motion.div animate={{ y: [0, -30, 0], x: [0, 30, 0], rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} className="absolute top-40 left-10 text-rose-500 dark:text-white"><Camera size={120} /></motion.div>
                <motion.div animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 2 }} className="absolute bottom-40 right-10 text-purple-500 dark:text-white"><Camera size={150} /></motion.div>
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 5 }} className="absolute top-1/2 left-1/4 text-pink-500 dark:text-white"><Camera size={80} /></motion.div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {!isUnlocked ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center min-h-[60vh]"
                    >
                        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-rose/20 dark:border-white/10 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
                            <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <Lock className="text-rose-500" size={32} />
                            </div>
                            <h2 className="text-3xl font-playfair text-black dark:text-white mb-2">Private Gallery</h2>
                            <p className="text-gray-600 dark:text-gray-400 font-sans mb-8">Please enter the secret password to unlock your memories.</p>

                            <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                                <input
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => { setPasswordInput(e.target.value); setError(false); }}
                                    placeholder="Enter password..."
                                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border focus:outline-none focus:ring-2 focus:ring-rose/50 transition-all ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
                                />
                                {error && <p className="text-red-500 text-sm -mt-1 text-left px-2">Incorrect password. Please try again.</p>}
                                <button
                                    type="submit"
                                    className="w-full py-3 mt-2 bg-gradient-to-r from-rose-400 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:opacity-90 transition-all"
                                >
                                    Unlock 🔓
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16 flex flex-col items-center"
                        >
                            <div className="flex items-center justify-center gap-4">
                                <h2 className="text-4xl md:text-5xl font-playfair text-black dark:text-white flex items-center justify-center gap-3">
                                    <Camera className="text-rose" size={40} />
                                    Memory Gallery
                                </h2>
                                <button
                                    onClick={() => { setIsUnlocked(false); setPasswordInput(""); }}
                                    className="text-rose-400 hover:text-rose-600 transition-all p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                    title="Lock Gallery"
                                >
                                    <Lock size={28} />
                                </button>
                            </div>
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
                    </>
                )}
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
