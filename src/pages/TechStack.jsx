const TechStack = () => {
  const technologies = {
    "Programming Languages": [
      { name: "JavaScript", proficiency: 90, color: "bg-yellow-500" },
      { name: "Python", proficiency: 85, color: "bg-blue-500" },
      { name: "Java", proficiency: 75, color: "bg-red-500" },
      { name: "C++", proficiency: 70, color: "bg-purple-500" }
    ],
    "Frontend Frameworks": [
      { name: "React", proficiency: 88, color: "bg-cyan-500" },
      { name: "HTML/CSS", proficiency: 92, color: "bg-orange-500" },
      { name: "TailwindCSS", proficiency: 80, color: "bg-teal-500" }
    ],
    "Backend & Databases": [
      { name: "Node.js", proficiency: 75, color: "bg-green-500" },
      { name: "Express", proficiency: 70, color: "bg-gray-500" },
      { name: "MongoDB", proficiency: 65, color: "bg-green-600" },
      { name: "SQL", proficiency: 72, color: "bg-blue-600" }
    ],
    "Tools & Technologies": [
      { name: "Git", proficiency: 85, color: "bg-orange-600" },
      { name: "Docker", proficiency: 60, color: "bg-blue-400" },
      { name: "AWS", proficiency: 55, color: "bg-yellow-600" }
    ]
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-400 mb-8">
          [ TECHNOLOGY SOLAR SYSTEM ]
        </h1>

        <p className="text-gray-300 mb-12 text-lg">
          Navigate through my technological universe. Each planet represents my proficiency 
          and experience with different technologies, with larger planets indicating greater expertise.
        </p>

        {/* Technology Categories */}
        {Object.entries(technologies).map(([category, techs]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">{category.toUpperCase()}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techs.map(tech => (
                <div 
                  key={tech.name}
                  className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                    <div 
                      className={`w-6 h-6 rounded-full ${tech.color}`}
                      style={{ 
                        transform: `scale(${0.5 + (tech.proficiency / 100) * 0.8})` 
                      }}
                    ></div>
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Proficiency</span>
                      <span>{tech.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${tech.color}`}
                        style={{ width: `${tech.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-orange-400">
                    ORBITAL STATUS: {tech.proficiency >= 80 ? 'STABLE' : tech.proficiency >= 60 ? 'DEVELOPING' : 'LEARNING'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Solar System Visualization Placeholder */}
        <section className="mt-16 bg-gray-900 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            INTERACTIVE SOLAR SYSTEM
          </h2>
          <p className="text-gray-300 mb-4">
            Future Enhancement: 3D interactive visualization coming soon...
          </p>
          <div className="text-orange-400 text-sm">
            [ CONSTRUCTION IN PROGRESS - ENGINEERING TEAMS DEPLOYED ]
          </div>
        </section>
      </div>
    </div>
  )
}

export default TechStack