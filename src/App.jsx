import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ThreeScene from '@/components/ThreeScene';
import HomePage from '@/pages/HomePage';
import PlanetDetail from '@/pages/PlanetDetail';
import LoadingScreen from '@/components/LoadingScreen';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate scene loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // FORCE NAVIGATION FUNCTION REMOVED - Using Link instead

    return (
        <>
            <Helmet>
                <title>Shyam Ganesh S Portfolio</title>
                <meta name="description" content="An immersive 3D space portfolio showcasing projects, skills, and experience." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Helmet>

            {/* GLOBAL NAVIGATION OUTSIDE MAIN CONTAINER 
                 This ensures it is not affected by overflow:hidden, transforms, or other stacking contexts of the main app div. 
                 It sits directly on the body. 
             */}
            {location.pathname !== '/' && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 99999, width: '100%', padding: '24px', pointerEvents: 'none' }}
                >
                    <Link
                        to="/"
                        style={{ pointerEvents: 'auto', zIndex: 99999, position: 'relative' }}
                        className="inline-flex items-center justify-center bg-black/40 hover:bg-black/60 text-white border border-white/30 backdrop-blur-xl rounded-full px-6 py-3 gap-3 font-orbitron text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>RETURN TO ORBIT</span>
                    </Link>
                </div>
            )}

            <div className="relative w-full h-screen overflow-hidden bg-black text-white">
                {isLoading && <LoadingScreen />}

                {/* 1. Deep Space Background (Bottom Layer) */}
                <div className="absolute inset-0 z-0 bg-black" />

                {/* 2. Text Content (Middle Layer) */}
                <div className={`relative w-full h-full pointer-events-none ${location.pathname === '/' ? 'z-10' : 'z-30'}`}>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/:planetId" element={<PlanetDetail />} />
                        </Routes>
                    </AnimatePresence>
                </div>

                {/* 3. 3D Solar System (Top Layer) - Planets overlay text */}
                <div className={`absolute inset-0 ${location.pathname === '/' ? 'z-20 pointer-events-auto' : 'z-0 pointer-events-none opacity-0'}`}>
                    <div className={location.pathname === '/' ? 'w-full h-full' : 'hidden'}>
                        <ThreeScene />
                    </div>
                </div>

                <Toaster />
            </div>
        </>
    );
}

export default App;