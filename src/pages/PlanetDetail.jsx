import React from 'react';
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-auto overflow-y-auto"
        >
            <div className="absolute top-6 left-6 z-50">
                <Button
                    onClick={() => navigate('/')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-full px-6 py-2 flex items-center gap-2 font-orbitron transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Orbit
                </Button>
            </div>

            <div className="w-full max-w-4xl pt-16 pb-8">
                <PlanetInfo
                    currentPlanet={planetIndex}
                    isDiving={false}
                    selectedProject={null}
                    onCraterDive={() => { }} // Placeholder if needed inside detail view
                />
            </div>
        </motion.div>
    );
}

export default PlanetDetail;