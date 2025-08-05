import { Canvas } from '@react-three/fiber';
import Starfield from '../components/Starfield';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Toodaloo Mobile App",
      description: ["Find public bathrooms with geolocation, reviews, and accessibility filters", "60,000+ locations with AI-powered summaries"],
      technologies: ["React Native", "Firebase", "JavaScript", "RapidAPI", "Google Gemini API", "Geolocation Services"],
      status: "In Development",
      link: "https://github.com/Mahir-2003/toodaloo-app"
    },
    {
      id: 2,
      name: "Turismo Telemetry",
      description: ["Real-time racing telemetry visualization dashboard for Gran Turismo 7", "Live telemetry streaming, 60fps data visualization, and sub-100ms latency"],
      technologies: ["TypeScript", "React", "TailwindCSS", "Python", "FastAPI", "WebSocket", "Pydantic", "Recharts", "Salsa20"],
      status: "In Development",
      link: "https://github.com/Mahir-2003/turismo-telemetry"

    },
    {
      id: 3,
      name: "Mortgage Master",
      description: ["3rd place Badger Blockchain hackathon winner", "Smart contract loan platform with MetaMask integration and secure disbursement"],
      technologies: ["React", "Solidity", "HTML/CSS", "Hardhat", "MetaMask", "Web3"],
      status: "Completed",
      link: "https://github.com/dgopinath3693/Mortgage-Master"
    },
    {
      id: 4,
      name: "Nyla - Parental Education App",
      description: ["Duolingo-style parenting education with interactive modules", "Community forum for parent discussions and advice sharing"],
      technologies: ["React Native", "Firebase", "JavaScript", "Google Cloud"],
      status: "Completed",
      link: "https://github.com/Mahir-2003/nyla-frontend"
    },
    {
      id: 5,
      name: "CS 220 Queue Monitor",
      description: ["Automated help queue monitoring for CS 220", "Google Sheets integration with macOS notifications"],
      technologies: ["Python", "Google Sheets API", "MacOS Notifications", "Google Cloud Platform"],
      status: "Completed",
      link: "https://github.com/Mahir-2003/cs220-queue-monitor",
    },
    {
      id: 6,
      name: "Personal Portfolio",
      description: ["The website you're on :)"],
      technologies: ["React", "Three.js", "TailwindCSS", "Vite", "React Router", "Spotify API", "RSS Parsing", "JavaScript"],
      status: "In Development",
      link: "https://github.com/CS571-SU25/p24"
    }
  ];

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
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-400 mb-8">
            [ PROJECT ARCHIVE ]
          </h1>

          <p className="text-gray-300 mb-12 text-lg">
            Take a look at some of the projects I've worked on!
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-blue-400">{project.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${project.status === 'Active' ? 'bg-green-600' :
                    project.status === 'Completed' ? 'bg-blue-600' :
                      'bg-orange-600'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <div className="text-gray-300 mb-4">
                  {Array.isArray(project.description) ? (
                    <ul className="space-y-1">
                      {project.description.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-400 mr-2 mt-1">-</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{project.description}</p>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="text-orange-400 text-sm font-semibold mb-2">TECHNOLOGIES:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-green-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition-colors duration-200 text-center no-underline"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <span className="text-white font-bold">EXPLORE PROJECT</span>
                </a>
              </div>
            ))}
          </div>

          {/* Add Project Note */}
          <div className="mt-12 bg-gray-900 p-6 rounded-lg border-l-4 border-orange-400">
            <p className="text-gray-300">
              <span className="text-orange-400 font-semibold">MISSION LOG:</span> More projects
              are being catalogued and will be added to this archive as they complete their
              respective development cycles.
            </p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Projects