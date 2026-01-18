import React from 'react';
import { motion } from 'framer-motion';

function OrbitalProgress({ currentPlanet, totalPlanets }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = (currentPlanet / (totalPlanets - 1)) * circumference;

    return (
        <div className="fixed top-8 right-8 z-50">
            <svg width="100" height="100" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transition={{ duration: 0.5 }}
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Moving dot */}
            <motion.div
                className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                style={{
                    top: '50%',
                    left: '50%',
                    x: Math.cos((currentPlanet / (totalPlanets - 1)) * Math.PI * 2 - Math.PI / 2) * radius - 6,
                    y: Math.sin((currentPlanet / (totalPlanets - 1)) * Math.PI * 2 - Math.PI / 2) * radius - 6
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Planet indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-cyan-400 font-orbitron text-2xl font-bold">
                    {currentPlanet + 1}
                </span>
                <span className="text-white/50 text-xs block">/{totalPlanets}</span>
            </div>
        </div>
    );
}

export default OrbitalProgress;