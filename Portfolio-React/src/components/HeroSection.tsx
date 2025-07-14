import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { ChevronDown } from 'lucide-react'
import './HeroSection.css'
import ReactLogo from '../assets/react.svg'

// Particle system component
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const [sphere] = useState(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  })

  useEffect(() => {
    let frame: number
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001
        meshRef.current.rotation.y += 0.002
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <Points ref={meshRef} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#667eea"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating icons component
const techIcons = [
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', logo: ReactLogo },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Adobe Photoshop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Adobe After Effects', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' },
  { name: 'Blender', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
  { name: 'Unreal Engine', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' }
];

function FloatingIcons() {
  // Random positions and animation delays for each icon
  const positions = [
    { top: '10%', left: '15%' },
    { top: '20%', left: '70%' },
    { top: '60%', left: '20%' },
    { top: '75%', left: '60%' },
    { top: '40%', left: '40%' },
    { top: '30%', left: '80%' },
    { top: '80%', left: '30%' },
    { top: '55%', left: '75%' },
    { top: '15%', left: '50%' },
    { top: '65%', left: '10%' },
    { top: '85%', left: '80%' }
  ];
  return (
    <div className="floating-icons">
      {techIcons.map((icon, i) => (
        <img
          key={icon.name}
          src={typeof icon.logo === 'string' ? icon.logo : icon.logo}
          alt={icon.name + ' logo'}
          className="floating-icon"
          style={{
            position: 'absolute',
            width: 48,
            height: 48,
            top: positions[i].top,
            left: positions[i].left,
            animation: `floatIcon 4s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            zIndex: 2,
            filter: 'drop-shadow(0 2px 8px rgba(59,130,246,0.15))'
          }}
        />
      ))}
    </div>
  );
}

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Ming Jie'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-section" id="hero">
      <div className="hero-canvas" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <FloatingIcons />
      </div>
      <div className="hero-content">
        <div className="hero-mainbox">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-name">{displayText}</span>
              <span className="hero-role">Creative | Technology</span>
            </h1>
            <p className="hero-description">
              I am a creative technologist with a track record in animation, event coordination, and financial advisory. Currently doing a career transition to a Full-Stack Developer.
            </p>
          </div>
          <div className="hero-profile">
            <div className="hero-profile-image">
              <img
                src="https://cdn.midjourney.com/a02d2257-ca0a-449e-8dd5-26590606305c/0_0.png"
                alt="Ming Jie"
                className="hero-avatar"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <ChevronDown size={24} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default HeroSection
