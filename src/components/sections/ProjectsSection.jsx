import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
    {
        id: 0,
        title: 'Student Dropout Classification',
        description: 'ML model predicting student dropout rates',
        icon: '🎓'
    },
    {
        id: 1,
        title: 'Gmail to WhatsApp Forwarder',
        description: 'Automated email forwarding system',
        icon: '📧'
    }
];

function ProjectsSection({ onCraterDive }) {
    return (
        <div className="cosmic-panel p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 mb-6"
            >
                <Rocket className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
                <h2
                    className="font-orbitron text-3xl md:text-4xl font-bold text-white"
                    style={{
                        textShadow: '0 0 20px rgba(231, 76, 60, 0.5)'
                    }}
                >
                    Projects
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 mb-6 font-inter text-lg"
            >
                Click on a crater hotspot to dive deeper into each project
            </motion.p>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <Button
                            onClick={() => onCraterDive(project.id)}
                            className="w-full cosmic-button text-left justify-start group"
                        >
                            <span className="text-2xl mr-4">{project.icon}</span>
                            <div>
                                <p className="font-orbitron font-semibold text-lg">{project.title}</p>
                                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    {project.description}
                                </p>
                            </div>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsSection;