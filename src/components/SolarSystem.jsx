/* eslint-disable react/no-unknown-property */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sun from '@/components/Sun';
import Planet from '@/components/Planet';

function SolarSystem() {
    const navigate = useNavigate();

    const handleSnap = (path) => {
        navigate(path);
    };

    const planets = [
        { name: 'About', path: '/about', color: '#4a90e2', radius: 8, size: 0.8, type: 'metallic', speed: 0.4 },
        { name: 'Education', path: '/education', color: '#e67e22', radius: 12, size: 1.2, type: 'ringed', speed: 0.3 },
        { name: 'Projects', path: '/projects', color: '#e74c3c', radius: 16, size: 1.0, type: 'cratered', speed: 0.25 },
        { name: 'Skills', path: '/skills', color: '#2E63E7', radius: 20, size: 1.1, type: 'earth', speed: 0.2 },
        { name: 'Contact', path: '/contact', color: '#9b59b6', radius: 24, size: 0.7, type: 'dark', speed: 0.15 }
    ];

    return (
        <group>
            <Sun />

            {planets.map((planet, index) => (
                <Planet
                    key={planet.name}
                    index={index}
                    {...planet}
                    orbitRadius={planet.radius}
                    orbitSpeed={planet.speed}
                    onSnap={() => handleSnap(planet.path)}
                />
            ))}
        </group>
    );
}

export default SolarSystem;