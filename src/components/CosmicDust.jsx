/* eslint-disable react/no-unknown-property */
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CosmicDust() {
    const dustRef = useRef();

    const [positions, colors] = useMemo(() => {
        const count = 500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            positions[i3] = (Math.random() - 0.5) * 60;
            positions[i3 + 1] = (Math.random() - 0.5) * 60;
            positions[i3 + 2] = (Math.random() - 0.5) * 60;

            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return [positions, colors];
    }, []);

    useFrame(({ clock }) => {
        if (dustRef.current) {
            dustRef.current.rotation.y = clock.getElapsedTime() * 0.02;
            dustRef.current.rotation.x = clock.getElapsedTime() * 0.01;
        }
    });

    return (
        <points ref={dustRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.3}
                vertexColors
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default CosmicDust;