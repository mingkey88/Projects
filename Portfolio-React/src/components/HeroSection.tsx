import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { ChevronDown } from 'lucide-react'
import './HeroSection.css'

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

// Floating shapes component
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    let frame: number
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.x += 0.005
        groupRef.current.rotation.y += 0.005
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <group ref={groupRef}>
      <mesh position={[2, 1, 0]}>
        <tetrahedronGeometry args={[0.5]} />
        <meshBasicMaterial wireframe color="#764ba2" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-2, -1, 1]}>
        <octahedronGeometry args={[0.4]} />
        <meshBasicMaterial wireframe color="#667eea" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 2, -1]}>
        <icosahedronGeometry args={[0.35]} />
        <meshBasicMaterial wireframe color="#764ba2" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-3, 1.5, -0.5]}>
        <dodecahedronGeometry args={[0.45]} />
        <meshBasicMaterial wireframe color="#667eea" transparent opacity={0.3} />
      </mesh>
      <mesh position={[1.5, -2, 0.5]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial wireframe color="#764ba2" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-1, 0, -2]}>
        <coneGeometry args={[0.4, 0.8, 6]} />
        <meshBasicMaterial wireframe color="#667eea" transparent opacity={0.3} />
      </mesh>
    </group>
  )
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
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
          <FloatingShapes />
        </Canvas>
      </div>
      
      <div className="hero-content">
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
              src="https://cdn.midjourney.com/21a9289f-8380-4d38-b02b-f6f3744e1053/0_0.png"
              alt="Ming Jie"
              className="hero-avatar"
            />
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
