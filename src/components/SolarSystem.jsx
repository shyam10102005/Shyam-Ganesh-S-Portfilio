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

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scaleFactor = isMobile ? 0.6 : 1;
    const radiusFactor = isMobile ? 0.7 : 1;

    const planets = [
        { name: 'About', path: '/about', color: '#4a90e2', radius: 8 * radiusFactor, size: 0.8 * scaleFactor, type: 'metallic', speed: 0.4 },
        { name: 'Education', path: '/education', color: '#e67e22', radius: 12 * radiusFactor, size: 1.2 * scaleFactor, type: 'ringed', speed: 0.3 },
        { name: 'Projects', path: '/projects', color: '#e74c3c', radius: 16 * radiusFactor, size: 1.0 * scaleFactor, type: 'cratered', speed: 0.25 },
        { name: 'Skills', path: '/skills', color: '#2E63E7', radius: 20 * radiusFactor, size: 1.1 * scaleFactor, type: 'earth', speed: 0.2 },
        { name: 'Contact', path: '/contact', color: '#9b59b6', radius: 24 * radiusFactor, size: 0.7 * scaleFactor, type: 'dark', speed: 0.15 }
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