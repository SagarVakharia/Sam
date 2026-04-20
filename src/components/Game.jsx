"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Puzzle, Trophy, RotateCcw, ChevronRight, Lightbulb } from "lucide-react";

// Available puzzle images from public folder
const puzzleImages = [
    "/Puzzle_1.JPG",
    "/Puzzle_2.JPG",
    "/Puzzle_3.JPG",
    "/Puzzle_4.JPG",
    "/Puzzle_5.JPG"
];

const Game = () => {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const puzzleImage = puzzleImages[currentPuzzleIndex];

    const [tiles, setTiles] = useState([...Array(9).keys()]); // 0-8, 8 is the empty space
    const [isWon, setIsWon] = useState(false);
    const [moves, setMoves] = useState(0);
    const [hintIndex, setHintIndex] = useState(null);

    // Initialize and shuffle
    useEffect(() => {
        shufflePuzzle(false);
    }, []);

    const changePuzzle = (index) => {
        setCurrentPuzzleIndex(index);
        shufflePuzzle(true);
    };

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

    const getHint = () => {
        if (isWon) return;
        
        // Minimal A* solver implementation
        const isGoalState = (t) => t.every((val, i) => val === i);
        if (isGoalState(tiles)) return;

        const manhattan = (state) => {
            let dist = 0;
            for (let i = 0; i < 9; i++) {
                if (state[i] === 8) continue;
                const targetRow = Math.floor(state[i] / 3);
                const targetCol = state[i] % 3;
                const currRow = Math.floor(i / 3);
                const currCol = i % 3;
                dist += Math.abs(targetRow - currRow) + Math.abs(targetCol - currCol);
            }
            return dist;
        };

        const getNeighborsState = (state) => {
            const neighbors = [];
            const emptyIdx = state.indexOf(8);
            const row = Math.floor(emptyIdx / 3);
            const col = emptyIdx % 3;
            const movesList = [];
            if (row > 0) movesList.push(emptyIdx - 3);
            if (row < 2) movesList.push(emptyIdx + 3);
            if (col > 0) movesList.push(emptyIdx - 1);
            if (col < 2) movesList.push(emptyIdx + 1);

            for (let nextIdx of movesList) {
                const newState = [...state];
                [newState[emptyIdx], newState[nextIdx]] = [newState[nextIdx], newState[emptyIdx]];
                neighbors.push({ state: newState, move: nextIdx });
            }
            return neighbors;
        };

        let openSet = [{ state: tiles, g: 0, f: manhattan(tiles), move: null, parent: null }];
        let closedSet = new Set();
        const stateToStr = (s) => s.join('');

        let iterations = 0;
        while (openSet.length > 0) {
            openSet.sort((a,b) => a.f - b.f);
            const curr = openSet.shift();
            const currStr = stateToStr(curr.state);

            if (isGoalState(curr.state)) {
                let pathNode = curr;
                let steps = [];
                while (pathNode.parent !== null) {
                    steps.push(pathNode.move);
                    pathNode = pathNode.parent;
                }
                setHintIndex(steps[steps.length - 1]);
                return;
            }

            closedSet.add(currStr);

            for (let neighbor of getNeighborsState(curr.state)) {
                const neighborStr = stateToStr(neighbor.state);
                if (closedSet.has(neighborStr)) continue;

                const tentative_g = curr.g + 1;
                const existingNode = openSet.find(n => stateToStr(n.state) === neighborStr);

                if (!existingNode || tentative_g < existingNode.g) {
                    const neighborNode = {
                        state: neighbor.state,
                        g: tentative_g,
                        f: tentative_g + manhattan(neighbor.state),
                        move: neighbor.move,
                        parent: curr
                    };
                    if (!existingNode) {
                        openSet.push(neighborNode);
                    } else {
                        existingNode.g = tentative_g;
                        existingNode.f = neighborNode.f;
                        existingNode.parent = curr;
                        existingNode.move = neighbor.move;
                    }
                }
            }
            iterations++;
            // Safety breakout to keep UI perfectly responsive
            if (iterations > 1500) break;
        }

        // Fallback if breakout triggered
        const nbs = getNeighbors(tiles.indexOf(8));
        setHintIndex(nbs[0]);
    };

    const handleTileClick = (index) => {
        if (isWon) return;
        setHintIndex(null); // Clear hint on interaction

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
                            <div className="flex gap-2">
                                <button
                                    onClick={getHint}
                                    className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors bg-white/10 px-4 py-1 rounded-full text-sm"
                                >
                                    <Lightbulb size={14} /> Hint
                                </button>
                                <button
                                    onClick={() => shufflePuzzle(true)}
                                    className="flex items-center gap-1 hover:text-white transition-colors bg-white/10 px-4 py-1 rounded-full text-sm"
                                >
                                    <RotateCcw size={14} /> Reset
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-0 relative w-[300px] h-[300px] mx-auto bg-black rounded-lg border-2 border-white/20 shadow-xl overflow-hidden">
                            {tiles.map((tile, index) => {
                                const isEmpty = tile === 8;
                                const isHint = hintIndex === index;
                                return (
                                    <motion.div
                                        key={tile}
                                        layout
                                        initial={false}
                                        className={`relative w-full h-full cursor-pointer border-[0.5px] border-black/50 ${isEmpty ? 'bg-transparent border-0' : 'bg-gray-800 hover:brightness-110'} ${isHint ? 'bg-yellow-500/50 z-20 shadow-[inset_0_0_15px_rgba(250,204,21,1)] ring-2 ring-yellow-400' : ''}`}
                                        onClick={() => handleTileClick(index)}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    >
                                        {!isEmpty && (
                                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                <img
                                                    src={puzzleImage}
                                                    alt={`Tile ${tile}`}
                                                    className="max-w-none object-cover"
                                                    style={{
                                                        width: '300px',
                                                        height: '300px',
                                                        transform: `translate(-${(tile % 3) * 100}px, -${Math.floor(tile / 3) * 100}px)`
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {isHint && !isEmpty && (
                                            <div className="absolute inset-0 border-4 border-yellow-400 animate-pulse rounded-sm pointer-events-none" />
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
                                    <div className="flex gap-3 mt-4">
                                        <button onClick={() => shufflePuzzle(true)} className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-bold transition">Replay</button>
                                        <button onClick={() => changePuzzle((currentPuzzleIndex + 1) % puzzleImages.length)} className="px-5 py-2 bg-rose hover:bg-rose/80 rounded-full text-white font-bold tracking-wide transition flex items-center gap-1">Next <ChevronRight size={18} /></button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Reference Image */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-sans text-gray-300 mb-4">Solution Preview</h3>
                        <div className="w-[200px] h-[200px] rounded-lg shadow-xl border-4 border-white/10 overflow-hidden bg-black/20">
                            <img src={puzzleImage} alt={`Puzzle Solution ${currentPuzzleIndex + 1}`} className="w-full h-full object-cover" />
                        </div>
                    </div>

                </div>

                {/* Puzzle Selector Thumbnail Grid */}
                <div className="mt-16 w-full">
                    <h3 className="text-xl font-sans text-gray-400 mb-6 text-center">Choose a Puzzle To Solve</h3>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {puzzleImages.map((imgSrc, index) => (
                            <button
                                key={index}
                                onClick={() => changePuzzle(index)}
                                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-black/40 hover:scale-105 hover:shadow-[0_0_15px_rgba(192,128,129,0.5)] ${currentPuzzleIndex === index ? 'border-rose scale-110 shadow-[0_0_20px_rgba(192,128,129,0.8)] opacity-100 relative z-10' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                            >
                                <img src={imgSrc} alt={`Puzzle ${index + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 text-xs text-white font-sans text-center">
                                    Puzzle {index + 1}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Game;
