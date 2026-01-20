import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlanetInfo from '@/components/PlanetInfo';

// Mapping IDs to indices for PlanetInfo
const PLANET_INDICES = {
    about: 0,
    education: 1,
    projects: 2,
    skills: 3,
    contact: 4
};

function PlanetDetail() {
    const { planetId } = useParams();
    const navigate = useNavigate();
    const planetIndex = PLANET_INDICES[planetId] ?? 0;

    const [isDiving, setIsDiving] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleCraterDive = (projectId) => {
        setSelectedProject(projectId);
        setIsDiving(true);
    };

    const handleReturnFromDive = () => {
        setIsDiving(false);
        setSelectedProject(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto overflow-y-auto bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
        >
            <div className="w-full max-w-4xl pt-16 pb-8">
                <PlanetInfo
                    currentPlanet={planetIndex}
                    isDiving={isDiving}
                    selectedProject={selectedProject}
                    onCraterDive={handleCraterDive}
                    onReturnToOrbit={handleReturnFromDive}
                />
            </div>
        </motion.div>
    );
}

export default PlanetDetail;