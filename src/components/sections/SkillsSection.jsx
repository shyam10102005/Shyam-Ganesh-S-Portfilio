import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const skills = [
    'Python',
    'Java',
    'SQL',
    'Machine Learning',
    'Tableau',
    'Web Development',
    'React',
    'Data Analysis',
    'JavaScript'
];

function SkillsSection() {
    return (
        <div className="cosmic-panel p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 mb-6"
            >
                <Code2 className="w-12 h-12 text-cyan-400" />
                <h2
                    className="font-orbitron text-4xl font-bold text-white"
                    style={{
                        textShadow: '0 0 20px rgba(0, 217, 255, 0.5)'
                    }}
                >
                    Skills
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 mb-6 font-inter text-lg"
            >
                A constellation of technologies and expertise
            </motion.p>

            <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="skill-tag"
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </div>
    );
}

export default SkillsSection;