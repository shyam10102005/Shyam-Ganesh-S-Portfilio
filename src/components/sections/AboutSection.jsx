import React from 'react';
import { motion } from 'framer-motion';

function AboutSection() {
    return (
        <div className="cosmic-panel p-8">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-orbitron text-4xl font-bold text-white mb-6"
                style={{
                    textShadow: '0 0 20px rgba(74, 144, 226, 0.5)'
                }}
            >
                About Me
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 font-inter text-white/90"
            >
                <p className="text-lg leading-relaxed">
                    Welcome to my cosmic journey through technology and innovation. I'm a passionate developer
                    and data enthusiast exploring the vast universe of software development and machine learning.
                </p>
                <p className="text-lg leading-relaxed">
                    Each planet in this digital solar system represents a different aspect of my professional journey,
                    from education to skills, projects to contact. Navigate through the cosmos to discover more.
                </p>
            </motion.div>
        </div>
    );
}

export default AboutSection;