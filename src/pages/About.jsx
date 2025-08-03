import { Canvas } from '@react-three/fiber';
import Starfield from '../components/Starfield';
import LetterboxdFeed from '../components/LetterboxdFeed';
import SpotifyStats from '../components/SpotifyStats';

const About = () => {
    return (
        <>
            {/* Fixed infinite starfield background */}
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

            {/* Content Section */}
            <div className="relative z-10 p-8 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-orange-400 mb-8">
                        [ PERSONNEL RECORD ]
                    </h1>

                    {/* bio */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">BIOGRAPHICAL DATA</h2>
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg">
                            <p className="text-gray-300 leading-relaxed">
                                I am an aspiring software engineer with a passion for creating innovative solutions
                                and exploring the possibilities of technology. I believe in seeking out new technologies,
                                new frameworks, and boldly building what no one has built before.
                            </p>
                            <br />
                            <p className="text-gray-300 leading-relaxed">
                                When I'm not engineering, you'll likely find me playing video games, listening to music, watching movies, or contemplating about space and cars
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <LetterboxdFeed/>
                    </section>

                    <section className="mb-12">
                        <SpotifyStats/>
                    </section>

                    {/* skills overview */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-400 mb-6">SKILL MATRIX</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg">
                                <h3 className="text-orange-400 font-semibold mb-3">Programming Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">JavaScript</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">TypeScript</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">HTML/CSS</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">Flutter</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">Python</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">Java</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">C/C++</span>
                                </div>
                            </div>

                            <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg">
                                <h3 className="text-orange-400 font-semibold mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">React</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">Node.js</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">TailwindCSS</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">Pandas</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">NumPy</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">Firebase</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">PostgreSQL</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">WebSockets</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">Figma</span>
                                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">Git/GitHub</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default About