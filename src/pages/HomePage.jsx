import React from 'react';
import { motion } from 'framer-motion';

function HomePage() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none z-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                // Adjusted positioning and font sizes for a more compact and overlapping effect
                className="text-center absolute top-1/4 -translate-y-1/2 w-full px-4"
            >
                <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(0,217,255,0.5)]">
                    SHYAM GANESH S
                </h1>
                <p className="mt-2 text-lg md:text-xl text-cyan-100/80 font-light tracking-widest font-inter">
                    COSMIC PORTFOLIO
                </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-center bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 absolute bottom-12 md:bottom-24" // Positioned lower
            >
                <p className="text-white/70 font-inter text-sm md:text-base tracking-wide animate-pulse">
                    Drag a planet to the sun to explore
                </p>
            </motion.div>

        </div>
    );
}

export default HomePage;