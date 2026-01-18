/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

function SnapIndicator({ isActive }) {
    const ringRef = useRef();

    useFrame(({ clock }) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = clock.getElapsedTime();
            const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.1;
            ringRef.current.scale.set(scale, scale, 1);
        }
    });

    if (!isActive) return null;

    return (
        <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh ref={ringRef}>
                <ringGeometry args={[2.8, 3, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={2} />
            </mesh>
            <Html position={[0, 0, 0]} center>
                <div className="text-white font-orbitron text-xs tracking-widest uppercase animate-pulse opacity-80 pointer-events-none">
                    Release to Unlock
                </div>
            </Html>
        </group>
    );
}

export default SnapIndicator;