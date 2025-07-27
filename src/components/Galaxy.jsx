import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
    const galaxyRef = useRef();

    // generate spiral galaxy particles mathematically
    const [positions, colors] = useMemo(() => {
        const particleCount = 200000; // change num of particles for density of galaxy
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        // galaxy params for spiral structure
        const arms = 5; // num of spiral arms
        const maxRadius = 12; // galaxy size
        const coreRadius = 2;
        const armTightness = 0.45; // controls spiral tightness
        const heightFalloff = 1.5; // galaxy thickness

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // determine which spiral arm this particle belongs to
            const armIndex = i % arms;
            const baseArmAngle = (armIndex / arms) * Math.PI * 2;

            // distance from galaxy center (power distribution for realistic density)
            const t = Math.random();
            const radius = Math.pow(t, 0.7) * maxRadius;

            // calc spiral angle using logarithmic spiral formula
            const spiralAngle = baseArmAngle + radius * armTightness;

            // add randomness for realistic star distribution
            const randomOffset = (Math.random() - 0.5) * 0.8;
            const finalAngle = spiralAngle + randomOffset;

            // calculate 3D position
            const x = Math.cos(finalAngle) * radius;
            const z = Math.sin(finalAngle) * radius;

            // height distribution - thinner at edges, denser at core
            const heightScale = Math.exp(-radius / heightFalloff);
            const y = (Math.random() - 0.5) * heightScale * 3;

            positions[i3] = x + (Math.random() - 0.5) * 1.5;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z + (Math.random() - 0.5) * 1.5;

            // calculate distance from galactic center for color determination
            const distanceFromCenter = Math.sqrt(x * x + z * z);
            const normalizedDistance = distanceFromCenter / maxRadius;

            // create realistic galaxy colors: bright core to outer arms
            let r, g, b;

            if (distanceFromCenter < coreRadius) {
                // Galactic core: bright white/yellow (supermassive black hole region)
                const coreIntensity = 1 - (distanceFromCenter / coreRadius) * 0.3;
                r = 1.0 * coreIntensity;
                g = 0.9 * coreIntensity;
                b = 0.6 * coreIntensity;
            } else if (normalizedDistance < 0.4) {
                // innter spiral arms: electric blue with hints of magenta
                const innerMix = Math.random();
                r = 0.3 + innerMix * 0.4; // Blue to magenta mix
                g = 0.4 + innerMix * 0.3;
                b = 0.9 + innerMix * 0.1;
            } else if (normalizedDistance < 0.7) {
                // middle regions: magenta and purple blend
                const middleMix = Math.random();
                r = 0.6 + middleMix * 0.3;
                g = 0.2 + middleMix * 0.3;
                b = 0.8 + middleMix * 0.2;
            } else {
                // outer regions: deep purple and dark blue
                const outerMix = Math.random();
                r = 0.4 + outerMix * 0.2;
                g = 0.1 + outerMix * 0.2;
                b = 0.6 + outerMix * 0.3;
            }

            // apply distance-based brightness falloff for realistic appearance
            const brightnessFalloff = Math.exp(-normalizedDistance * 2);
            const randomBrightness = 0.3 + Math.random() * 0.7;
            const finalBrightness = brightnessFalloff * randomBrightness;

            colors[i3] = r * finalBrightness;
            colors[i3 + 1] = g * finalBrightness;
            colors[i3 + 2] = b * finalBrightness;
        }

        return [positions, colors];
    }, []);

    // animation loop for galaxy rotation
    useFrame((state) => {
        if (galaxyRef.current) {
            // slow clockwise rotation to simulate galactic rotation
            galaxyRef.current.rotation.y += 0.0008;
        }
    });

    return (
        <group rotation={[0.2, -0.1, 0.4]} position={[6, 1, 0]}>
            <points ref={galaxyRef}>
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
                    size={0.04}
                    vertexColors={true}
                    alphaTest={0.1}
                    transparent={true}
                    blending={THREE.AdditiveBlending} // gaseous, nebula-like glow effect
                />
            </points>
        </group>
    );
}

export default Galaxy;