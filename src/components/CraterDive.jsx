import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
    {
        id: 0,
        title: 'Student Dropout Classification using ML',
        description: 'Machine learning model to predict student dropout rates using various academic and demographic factors. Implemented using Python, scikit-learn, and data visualization libraries.',
        technologies: ['Python', 'Machine Learning', 'scikit-learn', 'Pandas', 'Matplotlib']
    },
    {
        id: 1,
        title: 'Gmail to WhatsApp Forwarder',
        description: 'Automated system to forward important emails from Gmail to WhatsApp using API integration. Features intelligent filtering and real-time notifications.',
        technologies: ['Python', 'Gmail API', 'WhatsApp API', 'Automation']
    }
];

function CraterDive({ project, onReturnToOrbit }) {
    const projectData = projects[project] || projects[0];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center p-6 z-50"
        >
            <div className="relative w-full max-w-3xl">
                {/* Glassmorphism panel */}
                <div className="cosmic-panel p-8 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-orbitron text-4xl font-bold text-white mb-4"
                        style={{
                            textShadow: '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)'
                        }}
                    >
                        {projectData.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-inter text-lg text-white/80 leading-relaxed"
                    >
                        {projectData.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                    >
                        <h3 className="font-orbitron text-xl text-cyan-400">Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                            {projectData.technologies.map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="skill-tag"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="pt-6"
                    >
                        <Button
                            onClick={onReturnToOrbit}
                            className="cosmic-button group"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Return to Orbit
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default CraterDive;