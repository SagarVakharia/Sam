"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Puzzle, Trophy, RotateCcw } from "lucide-react";

// Placeholder image for the puzzle
const puzzleImage = "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop";

const Game = () => {
    const [tiles, setTiles] = useState([...Array(9).keys()]); // 0-8, 8 is the empty space
    const [isWon, setIsWon] = useState(false);
    const [moves, setMoves] = useState(0);

    // Initialize and shuffle
    useEffect(() => {
        shufflePuzzle(false);
    }, []);

    const shufflePuzzle = (countMoves = true) => {
        let newTiles = [...Array(9).keys()];
        // Simple shuffle by making random valid moves to ensure solvability
        let emptyIdx = 8;
        for (let i = 0; i < 100; i++) {
            const neighbors = getNeighbors(emptyIdx);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            // swap
            [newTiles[emptyIdx], newTiles[randomNeighbor]] = [newTiles[randomNeighbor], newTiles[emptyIdx]];
            emptyIdx = randomNeighbor;
        }
        setTiles(newTiles);
        setIsWon(false);
        if (countMoves) setMoves(0);
    };

    const getNeighbors = (index) => {
        const neighbors = [];
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (row > 0) neighbors.push(index - 3); // top
        if (row < 2) neighbors.push(index + 3); // bottom
        if (col > 0) neighbors.push(index - 1); // left
        if (col < 2) neighbors.push(index + 1); // right
        return neighbors;
    };

    const handleTileClick = (index) => {
        if (isWon) return;

        const emptyIndex = tiles.indexOf(8);
        if (getNeighbors(emptyIndex).includes(index)) {
            // Swap tiles
            const newTiles = [...tiles];
            newTiles[emptyIndex] = newTiles[index];
            newTiles[index] = 8;

            setTiles(newTiles);
            setMoves(moves + 1);

            // Check win condition
            if (newTiles.every((val, i) => val === i)) {
                setIsWon(true);
            }
        }
    };

    return (
        <section id="game" className="py-20 bg-[#0a0a0a] relative flex items-center justify-center min-h-[80vh]">
            <div className="max-w-4xl mx-auto px-4 z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl font-playfair text-white flex items-center justify-center gap-3">
                        <Puzzle className="text-green-400" size={36} /> Birthday Puzzle Challenge
                    </h2>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

                    {/* Game Board */}
                    <div className="bg-white/5 p-4 rounded-xl shadow-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4 text-gray-300 font-sans px-2">
                            <span className="bg-white/10 px-4 py-1 rounded-full text-sm">Moves: <strong className="text-rose">{moves}</strong></span>
                            <button
                                onClick={() => shufflePuzzle(true)}
                                className="flex items-center gap-1 hover:text-white transition-colors bg-white/10 px-4 py-1 rounded-full text-sm"
                            >
                                <RotateCcw size={14} /> Reset
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-1 relative w-[300px] h-[300px] mx-auto bg-black p-1 rounded-lg">
                            {tiles.map((tile, index) => {
                                const isEmpty = tile === 8;
                                return (
                                    <motion.div
                                        key={tile}
                                        layout
                                        initial={false}
                                        className={`rounded overflow-hidden cursor-pointer shadow-sm relative w-full h-full ${isEmpty ? 'bg-transparent' : 'bg-gray-800'}`}
                                        onClick={() => handleTileClick(index)}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    >
                                        {!isEmpty && (
                                            <div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    backgroundImage: `url(${puzzleImage})`,
                                                    backgroundSize: '300% 300%',
                                                    backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%`
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}

                            {isWon && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg"
                                >
                                    <Trophy size={60} className="text-yellow-400 mb-4" />
                                    <h3 className="text-2xl font-bold font-sans text-white mb-2">You Won!</h3>
                                    <button onClick={() => shufflePuzzle(true)} className="px-6 py-2 bg-rose rounded-full text-white font-bold tracking-wide mt-2">Play Again</button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Reference Image */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-sans text-gray-300 mb-4">Solution Preview</h3>
                        <div className="w-[200px] h-[200px] rounded-lg shadow-xl border-4 border-white/10 overflow-hidden">
                            <img src={puzzleImage} alt="Puzzle Solution" className="w-full h-full object-cover" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Game;
