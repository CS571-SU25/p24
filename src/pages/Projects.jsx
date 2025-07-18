const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Stellar Navigation System",
      description: "A web-based navigation system for space exploration",
      technologies: ["React", "JavaScript", "CSS"],
      status: "Active"
    },
    {
      id: 2,
      name: "Data Analysis Algorithms",
      description: "Advanced algorithms for processing astronomical data",
      technologies: ["Python", "NumPy", "Pandas"],
      status: "Completed"
    },
    {
      id: 3,
      name: "Communication Protocol",
      description: "Real-time communication system for starship operations",
      technologies: ["Node.js", "WebSocket", "Express"],
      status: "In Development"
    }
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-400 mb-8">
          [ PROJECT ARCHIVE ]
        </h1>

        <p className="text-gray-300 mb-12 text-lg">
          Explore the asteroid field of my projects. Each celestial body represents 
          a unique journey through the cosmos of code and creativity.
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
                <span className={`px-2 py-1 rounded text-xs ${
                  project.status === 'Active' ? 'bg-green-600' :
                  project.status === 'Completed' ? 'bg-blue-600' :
                  'bg-orange-600'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="text-orange-400 text-sm font-semibold mb-2">TECHNOLOGIES:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="bg-purple-600 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200">
                EXPLORE PROJECT
              </button>
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
  )
}

export default Projects