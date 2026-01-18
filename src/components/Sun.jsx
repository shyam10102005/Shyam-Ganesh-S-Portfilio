/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import SnapIndicator from './SnapIndicator';

function Sun() {
    const sunRef = useRef();
    const [isSnapActive, setIsSnapActive] = useState(false);

    // We can listen to a global state or simple proximity check here if we wanted complex interaction
    // For now, let's keep the sun purely visual + the snap indicator
    // The Planet component handles the distance check logic, but visual feedback on Sun could be nice.

    useFrame(({ clock }) => {
        if (sunRef.current) {
            const time = clock.getElapsedTime();
            sunRef.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.05);
        }
    });

    return (
        <group>
            <mesh ref={sunRef}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial
                    color="#ffd700"
                    emissive="#ff8800"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>
            <pointLight color="#ffd700" intensity={2} distance={50} decay={2} />

            {/* Visual snap zone hint */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.2, 2.3, 64]} />
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.1} />
            </mesh>

            <SnapIndicator isActive={false} /> {/* Logic to activate this can be added via context if needed */}
        </group>
    );
}

export default Sun;