const Home = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                {/* profile section */}
                <section className="text-center py-20">
                    <h1 className="text-6xl font-bold mb-6 text-blue-400">
                        MAHIR HUSAIN KHAN
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">Software Engineer</p>
                    <div className="text-lg text-orange-400">
                        [ STARFLEET COMMAND • AUTHORIZED ACCESS ONLY ]
                    </div>
                </section>

                {/* quick stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-blue-400">
                        <h3 className="text-orange-400 text-lg font-semibold mb-2">LOCATION</h3>
                        <p className="text-white">Earth • Sol System</p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-orange-400">
                        <h3 className="text-blue-400 text-lg font-semibold mb-2">STATUS</h3>
                        <p className="text-white">Active Development</p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-purple-400">
                        <h3 className="text-orange-400 text-lg font-semibold mb-2">MISSION</h3>
                        <p className="text-white">To Boldy Build What No One Has Built</p>
                    </div>
                </section>

                {/* current status dash */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-orange-400 mb-6">
                        [ CURRENT STATUS ]
                    </h2>
                    <div className="bg-gray-900 p-6 rounded-lg">
                        <p className="text-gray-300">
                            This website showcases my journey in software development
                            while simulatenously incorporating elements of things I love. Music. Video Games. Movies. Star Trek.
                            I hope you enjoy your stay.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;