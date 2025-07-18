import { HashRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home';
import Navigation from './components/Navigation';
import './App.css'
import About from './pages/About';
import Projects from './pages/Projects';
import TechStack from './pages/TechStack';
import Blog from './pages/Blog';

function App() {

  return (
    <Router>
      <div className='min-h-screen bg-black text-white'>
        {/* navigation present on all pages */}
        <Navigation />
        
        {/* main content area */}
        <main className='ml-0 lg:ml-64 transition-all duration-300'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/tech-stack' element={<TechStack/>} />
            <Route path='/blog' element={<Blog/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
