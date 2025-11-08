import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Galaxy from '../components/Galaxy';
import Starfield from '../components/Starfield';
import CareerTimeline from '../components/CareerTimeline';
import { FaLinkedin, FaGithub } from 'react-icons/fa';


const Home = () => {
    return (
        <>
            {/* Fixed infinite starfield background - continues behind all content */}
            <div className="fixed inset-0 w-screen h-screen -z-20 overflow-hidden">
                <Canvas
                    camera={{
                        position: [0, 0, 50],
                        fov: 60,
                        near: 0.1,
                        far: 1000
                    }}
                    className="bg-black"
                >
                    <Starfield />
                </Canvas>
            </div>

            {/* Galaxy Hero Section - scrolls away */}
            <div className="relative w-screen h-screen z-10 overflow-hidden">
                <Canvas
                    camera={{
                        position: [3, 5, 20],  // Side view position for edge-on galaxy view
                        fov: 60,
                        near: 0.1,
                        far: 1000
                    }}
                    className="w-full h-full bg-transparent"
                >
                    <Suspense fallback={null}>
                        {/* Main spiral galaxy - the centerpiece */}
                        <Galaxy />
                        <ambientLight intensity={0.2} />
                    </Suspense>
                </Canvas>

                {/* Hero text overlay */}
                <div className="absolute inset-0 flex items-center pointer-events-none">
                    <div className="text-left z-10 mb-50 ml-8 md:ml-16 lg:ml-24 max-w-xl">
                        {/* <div className="text-sm md:text-base text-orange-400 mb-8">
                            [ STARFLEET COMMAND ]
                        </div> */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-blue-400 leading-tight"
                            style={{ fontFamily: 'TNG, Orbitron, sans-serif' }}>
                            MAHIR HUSAIN KHAN
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-6">CS + DS Student at UW-Madison</p>
                        <p className="text-lg md:text-xl text-gray-300 mb-6">Software Engineer at PlayStation</p>
                        <div className="flex gap-4 pointer-events-auto">
                            <a 
                                href="https://github.com/Mahir-2003" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaGithub className="text-blue-400 text-3xl hover:text-blue-600 transition"/>
                            </a>
                            <a 
                                href="https://linkedin.com/in/mahir-h-khan" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaLinkedin className="text-blue-400 text-3xl hover:text-blue-600 transition"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-8 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {/* Current status dash */}
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-orange-400 mb-6">
                            [ CURRENT STATUS ]
                        </h2>
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border border-blue-400/30">
                            <p className="text-gray-300 leading-relaxed">
                                I am an aspiring software engineer with a passion for creating innovative solutions
                                and exploring the possibilities of technology. I believe in seeking out new technologies,
                                new frameworks, and boldly building what no one has built before.
                            </p>
                            <br />
                            <p className="text-gray-300 leading-relaxed">
                                When I'm not engineering, you'll likely find me playing video games, listening to music, watching movies, or contemplating about space.
                            </p>
                        </div>
                    </section>

                    <section className="mt-16">
                        <CareerTimeline />
                    </section>

                </div>
            </div>
        </>
    );
}

export default Home;