const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Mission Log 001: Setting Course for Web Development",
      date: "Stardate 2025.199",
      excerpt: "Beginning my journey into the vast universe of web development. First contact with React and the fascinating world of component-based architecture...",
      tags: ["Web Development", "React", "Learning"]
    },
    {
      id: 2,
      title: "Mission Log 002: Navigating the CSS Nebula",
      date: "Stardate 2025.203",
      excerpt: "Encountered the mysterious CSS Grid and Flexbox phenomena. Initial observations suggest these technologies can bend space and time in web layouts...",
      tags: ["CSS", "Design", "Frontend"]
    },
    {
      id: 3,
      title: "Mission Log 003: First Contact with APIs",
      date: "Stardate 2025.207",
      excerpt: "Established communication protocols with external data sources. The API integration proved successful, opening new possibilities for data exchange...",
      tags: ["API", "JavaScript", "Backend"]
    }
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-400 mb-8">
          [ MISSION LOGS ]
        </h1>

        <p className="text-gray-300 mb-12 text-lg">
          Personal logs documenting my exploration through the digital frontier. 
          Each entry chronicles discoveries, challenges, and breakthroughs in my 
          continuing mission to explore strange new technologies.
        </p>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.map(post => (
            <article 
              key={post.id}
              className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              <header className="mb-4">
                <h2 className="text-2xl font-bold text-blue-400 mb-2 hover:text-blue-300 cursor-pointer">
                  {post.title}
                </h2>
                <div className="text-orange-400 text-sm">{post.date}</div>
              </header>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              
              <footer className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-purple-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200">
                  READ FULL LOG →
                </button>
              </footer>
            </article>
          ))}
        </div>

        {/* Future Enhancement */}
        <div className="mt-12 bg-gray-900 p-6 rounded-lg border-l-4 border-orange-400">
          <h3 className="text-orange-400 font-semibold mb-2">FUTURE ENHANCEMENTS</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Like/Dislike functionality for visitor engagement</li>
            <li>• Commenting system for mission log discussions</li>
            <li>• Search and filter capabilities</li>
            <li>• RSS feed integration</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded transition-colors duration-200">
            SUBMIT NEW MISSION LOG
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog