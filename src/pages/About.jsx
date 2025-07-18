const About = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-orange-400 mb-8">
                    [ PERSONNEL RECORD ]
                </h1>

                {/* bio */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">BIOGRAPHICAL DATA</h2>
                    <div className="bg-gray-900 p-6 rounded-lg">
                        <p className="text-gray-300 leading-relaxed">
                            I am an aspiring software engineer with a passion for creating innovative solutions
                            and exploring possibilities of technology. I believe in seeking out new technologies,
                            new frameworks, and boldly building what no one has built before.
                        </p>
                        <br />
                        <p className="text-gray-300 leading-relaxed">
                            When I'm not engineering, I'm likely playing video games, listening to music, watching movies or thinking about
                            space and cars.
                        </p>
                    </div>
                </section>

                {/* experience timeline */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">CAREER HISTORY</h2>
                    <div className="space-y-6">

                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-orange-400">
                            <h3 className="text-orange-400 font-semibold text-lg">Current</h3>
                            <h4 className="text-blue-400">UW-Madison Space Science and Engineering Center</h4>
                            <p className="text-green-400">Software Engineer Intern</p>
                            <p className="text-gray-300 mt-2">
                                Working on the NASA Cloud Mask Project, optimizing the codebase to be more memory efficient.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-orange-400">
                            <h3 className="text-orange-400 font-semibold text-lg">Current</h3>
                            <h4 className="text-blue-400">UW-Madison Housing Department</h4>
                            <p className="text-green-400">House Fellow (Resident Assistant)</p>
                            <p className="text-gray-300 mt-2">
                                Working at Sellery Residence Hall, building safe, respectful and inclusive communities for all residents.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="text-purple-400 font-semibold text-lg">Previous</h3>
                            <h4 className="text-blue-400">UW-Madison Computer Science Department</h4>
                            <p className="text-green-400">Peer Mentor / Undergraduate TA</p>
                            <p className="text-gray-300 mt-2">
                                Led office hours and provided individualized support in Python for a course with over 1,000 students
                                , contributing to over 150 hours of coding and teaching assistance per semester.
                            </p>
                            <p className="text-gray-300 mt-2">
                                Improved TA response times with a Python script leveraging Google Sheets API and macOS notifications.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="text-purple-400 font-semibold text-lg">Previous</h3>
                            <h4 className="text-blue-400">Wisconsin Messenger</h4>
                            <p className="text-green-400">Software Engineer Intern</p>
                            <p className="text-gray-300 mt-2">
                                Built web scrapers using Python/BeautifulSoup, efficiently processing article information from over 1,000 articles weekly.
                            </p>
                            <p className="text-gray-300 mt-2">
                                Designed a Python-based political sentiment analyzer with NLTK, classifying news articles as left, 
                                right or neutral to streamline editorial review
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="text-purple-400 font-semibold text-lg">Previous</h3>
                            <h4 className="text-blue-400">CyberForce</h4>
                            <p className="text-green-400">Software Engineer Intern</p>
                            <p className="text-gray-300 mt-2">
                                Developed a mobile application for hiring intake, candidate screening and placement using Flutter and Firebase
                            </p>
                            <p className="text-gray-300 mt-2">
                                Engineered a personality assessment system with a 20-question quiz, matching users with cybersecurity specializations.
                            </p>
                        </div>

                    </div>
                </section>

                {/* skills overview */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">SKILL MATRIX</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 p-6 rounded-lg">
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

                        <div className="bg-gray-900 p-6 rounded-lg">
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
    )
}

export default About