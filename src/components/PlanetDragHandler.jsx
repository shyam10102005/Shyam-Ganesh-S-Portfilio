import React, { useState, useRef, useLayoutEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Utility component to handle drag logic
export function PlanetDragHandler({
    children,
    position,
    onDragStart,
    onDragEnd,
    onSnap,
    snapThreshold = 3.5
}) {
    const { camera, raycaster, pointer } = useThree();
    const [isDragging, setIsDragging] = useState(false);
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plane at y=0
    const groupRef = useRef();

    // Fix: Apply position via ref to avoid React prop conflicts and ensure proper Three.js handling
    useLayoutEffect(() => {
        if (groupRef.current && !isDragging) {
            if (Array.isArray(position)) {
                groupRef.current.position.set(...position);
            } else if (position instanceof THREE.Vector3) {
                groupRef.current.position.copy(position);
            } else if (typeof position === 'object' && position !== null) {
                groupRef.current.position.set(
                    position.x ?? 0,
                    position.y ?? 0,
                    position.z ?? 0
                );
            }
        }
    }, [position, isDragging]);

    // Track drag position
    useFrame(() => {
        if (isDragging && groupRef.current) {
            raycaster.setFromCamera(pointer, camera);
            const target = new THREE.Vector3();
            raycaster.ray.intersectPlane(dragPlane, target);

            if (target) {
                groupRef.current.position.x = target.x;
                groupRef.current.position.z = target.z;
                // Keep Y at 0 during drag (or allow slight float)
                groupRef.current.position.y = 0;

                // Check distance to center (Sun)
                const distance = Math.sqrt(target.x * target.x + target.z * target.z);
                if (distance < snapThreshold) {
                    setIsDragging(false); // Stop dragging
                    if (onSnap) onSnap();
                }
            }
        }
    });

    const handlePointerDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        if (onDragStart) onDragStart();

        // Capture pointer
        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        if (onDragEnd) onDragEnd();

        // Release pointer
        e.target.releasePointerCapture(e.pointerId);
    };

    return (
        <group
            ref={groupRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {children}
        </group>
    );
}

export default PlanetDragHandler;