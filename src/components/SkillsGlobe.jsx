import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { 
    FaReact, 
    FaNodeJs, 
    FaPython, 
    FaJava, 
    FaGitAlt, 
    FaDocker, 
    FaAws,
    FaHtml5,
} from 'react-icons/fa';
import { 
    SiJavascript, 
    SiTypescript, 
    SiCplusplus, 
    SiC,
    SiTailwindcss,
    SiFastapi,
    SiFirebase,
    SiMongodb,
    SiPostgresql,
    SiFlutter,
    SiGooglecloud
} from 'react-icons/si';

const SkillsGlobe = () => {
    const groupRef = useRef();
    
    const { viewport } = useThree();
    const isMobile = viewport.width < 768;
    
    // Define skills with categories, relationships, and FontAwesome icons
    const skills = useMemo(() => [
        // Programming Languages
        { name: 'JavaScript', category: 'Programming Languages', proficiency: 90, icon: SiJavascript, iconColor: '#F7DF1E', related: ['React', 'Node.js', 'TypeScript'] },
        { name: 'TypeScript', category: 'Programming Languages', proficiency: 90, icon: SiTypescript, iconColor: '#3178C6', related: ['JavaScript', 'React', 'Node.js'] },
        { name: 'Python', category: 'Programming Languages', proficiency: 95, icon: FaPython, iconColor: '#3776AB', related: ['FastAPI', 'Firebase'] },
        { name: 'Java', category: 'Programming Languages', proficiency: 70, icon: FaJava, iconColor: '#007396', related: [] },
        { name: 'C++', category: 'Programming Languages', proficiency: 50, icon: SiCplusplus, iconColor: '#00599C', related: ['C'] },
        { name: 'C', category: 'Programming Languages', proficiency: 70, icon: SiC, iconColor: '#A8B9CC', related: ['C++'] },
        
        // Frontend
        { name: 'React', category: 'Frontend Frameworks', proficiency: 90, icon: FaReact, iconColor: '#61DAFB', related: ['JavaScript', 'TypeScript', 'TailwindCSS'] },
        { name: 'TailwindCSS', category: 'Frontend Frameworks', proficiency: 80, icon: SiTailwindcss, iconColor: '#06B6D4', related: ['React', 'HTML/CSS'] },
        { name: 'HTML/CSS', category: 'Frontend Frameworks', proficiency: 92, icon: FaHtml5, iconColor: '#E34F26', related: ['TailwindCSS', 'React'] },
        { name: 'Flutter', category: 'Frontend Frameworks', proficiency: 75, icon: SiFlutter, iconColor: '#02569B', related: [] },
        
        // Backend
        { name: 'Node.js', category: 'Backend & Databases', proficiency: 65, icon: FaNodeJs, iconColor: '#339933', related: ['JavaScript', 'TypeScript'] },
        { name: 'FastAPI', category: 'Backend & Databases', proficiency: 70, icon: SiFastapi, iconColor: '#009688', related: ['Python'] },
        { name: 'Firebase', category: 'Backend & Databases', proficiency: 75, icon: SiFirebase, iconColor: '#FFCA28', related: ['Python', 'JavaScript'] },
        { name: 'MongoDB', category: 'Backend & Databases', proficiency: 50, icon: SiMongodb, iconColor: '#47A248', related: ['Node.js'] },
        { name: 'PostgreSQL', category: 'Backend & Databases', proficiency: 72, icon: SiPostgresql, iconColor: '#4169E1', related: [] },
        
        // Tools
        { name: 'Git', category: 'Tools & Technologies', proficiency: 90, icon: FaGitAlt, iconColor: '#F05032', related: [] },
        { name: 'Docker', category: 'Tools & Technologies', proficiency: 75, icon: FaDocker, iconColor: '#2496ED', related: [] },
        { name: 'AWS', category: 'Tools & Technologies', proficiency: 55, icon: FaAws, iconColor: '#FF9900', related: [] },
        { name: 'Google Cloud', category: 'Tools & Technologies', proficiency: 50, icon: SiGooglecloud, iconColor: '#4285F4', related: [] },
    ], []);

    // Calculate positions using Fibonacci sphere algorithm
    const skillPositions = useMemo(() => {
        const positions = [];
        const radius = isMobile ? 6 : 10;
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angleIncrement = Math.PI * 2 * goldenRatio;
        
        skills.forEach((skill, i) => {
            const t = i / skills.length;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleIncrement * i;
            
            const x = radius * Math.sin(inclination) * Math.cos(azimuth);
            const y = radius * Math.sin(inclination) * Math.sin(azimuth);
            const z = radius * Math.cos(inclination);
            
            // Scale based on proficiency: much smaller nodes (0.3x to 0.8x)
            const scale = 0.3 + (skill.proficiency / 100) * 0.5;
            
            // Assign blue shades based on category
            let color;
            if (skill.category === 'Programming Languages') {
                color = '#60a5fa'; // Light blue
            } else if (skill.category === 'Frontend Frameworks') {
                color = '#3b82f6'; // Blue
            } else if (skill.category === 'Backend & Databases') {
                color = '#2563eb'; // Darker blue
            } else {
                color = '#1e40af'; // Deep blue
            }
            
            positions.push({
                ...skill,
                position: [x, y, z],
                scale,
                color,
                iconColor: skill.iconColor
            });
        });
        
        return positions;
    }, [skills, isMobile]);

    // Generate connection lines with orange/golden color
    const connections = useMemo(() => {
        const lines = [];
        
        skillPositions.forEach((skill) => {
            skill.related.forEach(relatedName => {
                const relatedSkill = skillPositions.find(s => s.name === relatedName);
                if (relatedSkill) {
                    // Only add each connection once (avoid duplicates)
                    const exists = lines.some(line => 
                        (line.start === skill.position && line.end === relatedSkill.position) ||
                        (line.start === relatedSkill.position && line.end === skill.position)
                    );
                    
                    if (!exists) {
                        lines.push({
                            start: skill.position,
                            end: relatedSkill.position,
                            color: '#3b82f6' // Orange LCARS color
                        });
                    }
                }
            });
        });
        
        return lines;
    }, [skillPositions]);

    // Slow auto-rotation
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    return (
        <>
            <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={12.5}
                maxDistance={12.5}
                rotateSpeed={0.6}
                dampingFactor={0.05}
                zoomSpeed={0.8}
                enableDamping={true}
            />
            
            <group ref={groupRef} rotation={[0.2, 0, 0]}>
                {/* Wireframe sphere backdrop */}
                <mesh>
                    <sphereGeometry args={[isMobile ? 6 : 10, 32, 32]} />
                    <meshBasicMaterial
                        color="#fb923c"
                        wireframe
                        opacity={0.1}
                        transparent
                    />
                </mesh>

                {/* Connection lines with orange/golden color */}
                {connections.map((connection, i) => (
                    <ConnectionLine
                        key={`connection-${i}`}
                        start={connection.start}
                        end={connection.end}
                        color={connection.color}
                    />
                ))}

                {/* Skill nodes */}
                {skillPositions.map((skill) => (
                    <SkillNode
                        key={skill.name}
                        skill={skill}
                        isMobile={isMobile}
                    />
                ))}

                {/* Outer glow */}
                <mesh>
                    <sphereGeometry args={[isMobile ? 6.5 : 10.5, 32, 32]} />
                    <meshBasicMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.02}
                        side={THREE.BackSide}
                    />
                </mesh>
            </group>
        </>
    );
};

// Individual skill node
const SkillNode = ({ skill, isMobile }) => {
    const IconComponent = skill.icon;

    return (
        <group position={skill.position}>
            {/* Small invisible sphere at exact connection point for alignment */}
            <mesh>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                    color={skill.color}
                    transparent
                    opacity={0}
                />
            </mesh>

            {/* FontAwesome Icon as the main visual - perfectly centered */}
            <Html
                center
                distanceFactor={10}
                position={[0, 0, 0]}
                transform
                sprite
                style={{
                    pointerEvents: 'none'
                }}
            >
                <div style={{
                    fontSize: '24px',
                    color: skill.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <IconComponent />
                </div>
            </Html>

            {/* Point light for glow */}
            <pointLight
                color={skill.color}
                intensity={0.3}
                distance={2}
            />

            {/* Always visible label on desktop */}
            {!isMobile && (
                <Html
                    center
                    distanceFactor={14}
                    position={[0, -0.7, 0]}
                    style={{
                        opacity: 0.7,
                        pointerEvents: 'none'
                    }}
                >
                    <div style={{
                        background: 'rgba(30, 41, 59, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '2px 7px',
                        borderRadius: '3px',
                        border: `1px solid ${skill.color}`,
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        boxShadow: `0 0 10px ${skill.color}40`,
                        fontFamily: 'Orbitron, sans-serif'
                    }}>
                        {skill.name}
                    </div>
                </Html>
            )}
        </group>
    );
};

// Connection line with proper orange color
const ConnectionLine = ({ start, end, color }) => {
    const ref = useRef();
    
    // Adjust points to account for icon position offset
    const points = useMemo(() => {
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);
        
        // Icons are rendered at the exact position, so we use the position directly
        return [startVec, endVec];
    }, [start, end]);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(points);
    }, [points]);

    const tubeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 20, 0.015, 8, false);
    }, [curve]);

    return (
        <mesh geometry={tubeGeometry}>
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.25}
            />
        </mesh>
    );
};

export default SkillsGlobe;