import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import ThreeScene from '@/components/ThreeScene';
import HomePage from '@/pages/HomePage';
import PlanetDetail from '@/pages/PlanetDetail';
import LoadingScreen from '@/components/LoadingScreen';
import { Toaster } from '@/components/ui/toaster';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Simulate scene loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Helmet>
                <title>Shyam Ganesh S Portfolio</title>
                <meta name="description" content="An immersive 3D space portfolio showcasing projects, skills, and experience." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Helmet>

            <div className="relative w-full h-screen overflow-hidden bg-black text-white">
                {isLoading && <LoadingScreen />}

                {/* 1. Deep Space Background (Bottom Layer) */}
                <div className="absolute inset-0 z-0 bg-black" />

                {/* 2. Text Content (Middle Layer) */}
                <div className="relative z-10 w-full h-full pointer-events-none">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/:planetId" element={<PlanetDetail />} />
                        </Routes>
                    </AnimatePresence>
                </div>

                {/* 3. 3D Solar System (Top Layer) - Planets overlay text */}
                <div className="absolute inset-0 z-20 pointer-events-auto">
                    <ThreeScene />
                </div>

                <Toaster />
            </div>
        </>
    );
}

export default App;