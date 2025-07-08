import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme'
  }, [isDarkTheme])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <div className="app">
      <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <HeroSection />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
