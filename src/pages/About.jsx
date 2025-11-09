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
                        [ PERSONAL LOG ]
                    </h1>

                    {/* bio */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">RECENT ACTIVITY</h2>
                        <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg">
                            <p className="text-gray-300 leading-relaxed">
                                I'm drawn to stories - whether they're told through film, music, books, or anything else. I also like keeping track of the things I watch and listen to.
                            </p>
                            <br />
                            <p className="text-gray-300 leading-relaxed">
                                Below you can find what I've been up to recently!
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <LetterboxdFeed/>
                    </section>

                    <section className="mb-12">
                        <SpotifyStats/>
                    </section>
                </div>
            </div>
        </>
    )
}

export default About