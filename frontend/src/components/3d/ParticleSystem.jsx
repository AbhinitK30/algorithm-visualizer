"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"

const ParticleSystem = ({ count = 100, color = "#4f46e5", size = 0.1 }) => {
  const mesh = useRef()

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 50
      temp[i * 3 + 1] = (Math.random() - 0.5) * 50
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default ParticleSystem
