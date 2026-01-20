/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import gsap from 'gsap';

// ... other imports

function createEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    // Water (Base Blue)
    context.fillStyle = '#1a4b8c';
    context.fillRect(0, 0, 512, 256);

    // Land (Random Green Continents)
    context.fillStyle = '#2d5a27'; // Darker forest green

    // Draw random blobs for continents
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const radius = 30 + Math.random() * 60;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }

    // Add noise/detail
    context.fillStyle = '#3a7a30'; // Lighter green
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const radius = 10 + Math.random() * 30;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }

    return new THREE.CanvasTexture(canvas);
}

function Atmosphere({ color, scale = 1.2 }) {
    return (
        <mesh scale={[scale, scale, scale]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.3}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

function CloudLayer({ scale = 1.02 }) {
    return (
        <mesh scale={[scale, scale, scale]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color="white"
                transparent
                opacity={0.4}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Planet({ index, name, color, orbitRadius, orbitSpeed, size, type, onSnap }) {
    const planetRef = useRef();
    const ringsRef = useRef();
    const groupRef = useRef();

    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Initial random angle for orbit start position
    const angleRef = useRef(Math.random() * Math.PI * 2);

    useFrame(({ camera, raycaster, pointer, clock }) => {
        const time = clock.getElapsedTime();

        // 1. Handle Position (Drag vs Orbit)
        if (isDragging && groupRef.current) {
            raycaster.setFromCamera(pointer, camera);
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
            const target = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, target);

            if (target) {
                groupRef.current.position.copy(target);

                // Check snap distance to center (Sun)
                if (target.length() < 2.5) {
                    setIsDragging(false);
                    onSnap();

                    // Snap animation
                    gsap.to(groupRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
                }
            }
        } else if (groupRef.current) {
            // Orbit Logic
            // Calculate position based on initial angle + time * speed
            const angle = angleRef.current + (time * orbitSpeed * 0.2);
            groupRef.current.position.x = Math.cos(angle) * orbitRadius;
            groupRef.current.position.z = Math.sin(angle) * orbitRadius * 0.5; // Elliptical orbit to keep in view
            groupRef.current.position.y = 0;
        }

        // 2. Self Rotation
        if (planetRef.current) {
            planetRef.current.rotation.y += 0.005;
        }

        if (ringsRef.current) {
            ringsRef.current.rotation.z += 0.002;
            ringsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + (Math.PI / 2.5); // Add subtle wobble
        }
    });

    const renderPlanetGeometry = () => {
        // Base planet with atmosphere
        const PlanetBase = ({ children, materialProps }) => (
            <group>
                <mesh ref={planetRef}>
                    <sphereGeometry args={[size, 64, 64]} />
                    <meshStandardMaterial
                        color={color}
                        envMapIntensity={1} // Reflection from Environment
                        {...materialProps}
                    />
                </mesh>
                <Atmosphere color={color} scale={size * 1.2} />
            </group>
        );

        switch (type) {
            case 'metallic':
                return <PlanetBase materialProps={{ metalness: 0.9, roughness: 0.1, emissive: color, emissiveIntensity: 0.1 }} />;

            case 'ringed':
                return (
                    <group>
                        <mesh ref={planetRef}>
                            <sphereGeometry args={[size, 64, 64]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.6}
                                roughness={0.4}
                                emissive={color}
                                emissiveIntensity={0.1}
                                envMapIntensity={0.5}
                            />
                        </mesh>
                        {/* Atmosphere for ringed planet too */}
                        <Atmosphere color={color} scale={size * 1.2} />

                        <mesh ref={ringsRef} rotation={[Math.PI / 2.5, 0, 0]}>
                            <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
                            <meshStandardMaterial
                                color="#d4a373"
                                transparent
                                opacity={0.6}
                                side={THREE.DoubleSide}
                                metalness={0.4}
                                roughness={0.6}
                            />
                        </mesh>
                    </group>
                );

            case 'cratered':
                return <PlanetBase materialProps={{ roughness: 0.8, metalness: 0.2, emissive: color, emissiveIntensity: 0.05 }} />;

            case 'wireframe':
                return (
                    <mesh ref={planetRef}>
                        <sphereGeometry args={[size, 24, 24]} />
                        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.8} />
                    </mesh>
                );

            case 'earth':
                const earthTexture = useMemo(() => createEarthTexture(), []);

                return (
                    <group>
                        <PlanetBase materialProps={{
                            map: earthTexture,
                            roughness: 0.8, // Land is rough
                            metalness: 0.1,
                            emissive: '#1122AA',
                            emissiveIntensity: 0.05, // Lower emissive to see texture
                            color: 'white' // White base to show texture colors true
                        }} />
                        <CloudLayer scale={size * 1.03} />
                    </group>
                );

            case 'dark':
                return <PlanetBase materialProps={{ metalness: 0.5, roughness: 0.5, emissive: color, emissiveIntensity: 0.1 }} />;

            default:
                return <PlanetBase materialProps={{ emissive: color, emissiveIntensity: 0.1 }} />;
        }
    };

    return (
        <group
            ref={groupRef}
            onPointerDown={(e) => {
                e.stopPropagation();
                e.target.setPointerCapture(e.pointerId);
                setIsDragging(true);
            }}
            onPointerUp={(e) => {
                setIsDragging(false);
                e.target.releasePointerCapture(e.pointerId);
            }}
            onPointerOver={() => { document.body.style.cursor = 'grab'; setIsHovered(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setIsHovered(false); }}
        >
            {/* Invisible Hit Area for easier grabbing */}
            <mesh visible={false}>
                <sphereGeometry args={[size * 1.5, 16, 16]} />
                <meshBasicMaterial />
            </mesh>
            {renderPlanetGeometry()}

            {/* Label always facing camera */}
            <Html position={[0, size + 0.8, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
                <div className={`
                    px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-none select-none
                    ${isHovered || isDragging ? 'bg-white/20 border-white/50 scale-110 shadow-lg shadow-cyan-500/20' : 'bg-black/40 border-white/10 opacity-80'}
                    border text-white font-orbitron text-lg font-bold tracking-wider whitespace-nowrap
                `}>
                    {name}
                </div>
            </Html>

            {/* Glow effect on hover/drag */}
            {(isHovered || isDragging) && (
                <pointLight color={color} intensity={3} distance={8} />
            )}
        </group>
    );
}

export default Planet;