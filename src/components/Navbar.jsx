"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Gallery", href: "#gallery" },
    { name: "Music", href: "#music" },
    { name: "Game", href: "#game" },
    { name: "Countdown", href: "#countdown" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3 text-black dark:text-white shadow-lg"
                    : "bg-transparent py-5 text-black/90 dark:text-white/90"
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-2xl">🎂</span>
                        <span className="font-dancing text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose to-gold">
                            Birthday Bash
                        </span>
                    </motion.div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="font-sans text-sm hover:text-gold-light transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose transition-all group-hover:w-full"></span>
                            </motion.a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        
                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-black/10 dark:border-white/10"
                >
                    <div className="flex flex-col items-center py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg hover:text-rose transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;
