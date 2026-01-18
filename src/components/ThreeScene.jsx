/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import Starfield from '@/components/Starfield';
import CosmicDust from '@/components/CosmicDust';
import SolarSystem from '@/components/SolarSystem';

function ThreeScene() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <Canvas
            camera={{ position: [0, 20, 25], fov: 45 }}
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2
            }}
            className="w-full h-full"
        >
            {/* Transparent background so planets can overlay text while space BG is behind */}
            {/* <color attach="background" args={['#000000']} />  <-- REMOVED */}
            <fog attach="fog" args={['#000a1f', 20, 100]} />

            <ambientLight intensity={1.5} color="#4a5b8c" />
            <pointLight position={[0, 0, 0]} intensity={4} color="#ffd700" distance={50} decay={2} />

            {/* Background Elements */}
            <Starfield count={3000} />
            <CosmicDust />
            <Environment preset="city" />

            {/* Render Solar System only on Home Page */}
            {isHome && <SolarSystem />}

            <EffectComposer>
                <Bloom
                    intensity={1.2}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </Canvas>
    );
}

export default ThreeScene;