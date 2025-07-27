import { HashRouter as Router, Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home';
import Navigation from './components/Navigation';
import './App.css'
import About from './pages/About';
import Projects from './pages/Projects';
import TechStack from './pages/TechStack';
import Blog from './pages/Blog';

function AppContent() {
  const location = useLocation();

  return (
    <div className='min-h-screen text-white'>
      {/* navigation present on all pages */}
      <Navigation />
      
      <main className={`transition-all duration-300 ml-0 `}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/tech-stack' element={<TechStack/>} />
          <Route path='/blog' element={<Blog/>}/>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App