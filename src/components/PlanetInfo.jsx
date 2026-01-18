import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import CraterDive from '@/components/CraterDive';

const sections = [
    { name: 'About', component: AboutSection },
    { name: 'Education', component: EducationSection },
    { name: 'Projects', component: ProjectsSection },
    { name: 'Skills', component: SkillsSection },
    { name: 'Contact', component: ContactSection }
];

function PlanetInfo({ currentPlanet, isDiving, selectedProject, onCraterDive, onReturnToOrbit }) {
    const Section = sections[currentPlanet]?.component || AboutSection;

    if (isDiving && selectedProject !== null) {
        return (
            <CraterDive
                project={selectedProject}
                onReturnToOrbit={onReturnToOrbit}
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full"
        >
            <Section onCraterDive={onCraterDive} />
        </motion.div>
    );
}

export default PlanetInfo;