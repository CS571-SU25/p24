import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Galaxy from '../components/Galaxy';
import Starfield from '../components/Starfield';
import CareerTimeline from '../components/CareerTimeline';


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
                        <p className="text-lg md:text-xl text-gray-300 mb-6">Software Engineer</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-8 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {/* Quick stats */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border-l-4 border-blue-400">
                            <h3 className="text-orange-400 text-lg font-semibold mb-2">LOCATION</h3>
                            <p className="text-white">Earth • Sol System</p>
                        </div>
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border-l-4 border-orange-400">
                            <h3 className="text-blue-400 text-lg font-semibold mb-2">STATUS</h3>
                            <p className="text-white">Active Development</p>
                        </div>
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="text-orange-400 text-lg font-semibold mb-2">MISSION</h3>
                            <p className="text-white">To Boldly Build What No One Has Built</p>
                        </div>
                    </section>

                    {/* Current status dash */}
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-orange-400 mb-6">
                            [ CURRENT STATUS ]
                        </h2>
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg">
                            <p className="text-gray-300 leading-relaxed">
                                This website showcases my journey in software development
                                while simultaneously incorporating elements of things I love. Music. Video Games. Movies. Star Trek.
                                I hope you enjoy your stay.
                            </p>
                        </div>
                    </section>

                    <section className="mt-16">
                        <CareerTimeline/>
                    </section>

                </div>
            </div>
        </>
    );
}

export default Home;