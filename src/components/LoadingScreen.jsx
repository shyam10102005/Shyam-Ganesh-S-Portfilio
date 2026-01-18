import React from 'react';
import { motion } from 'framer-motion';

function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
            <div className="text-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
                    style={{
                        boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)'
                    }}
                />

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-orbitron text-3xl font-bold text-white mb-2"
                    style={{
                        textShadow: '0 0 20px rgba(0, 217, 255, 0.5)'
                    }}
                >
                    Initializing Cosmos
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-inter text-white/60"
                >
                    Preparing your journey through the stars...
                </motion.p>
            </div>
        </motion.div>
    );
}

export default LoadingScreen;