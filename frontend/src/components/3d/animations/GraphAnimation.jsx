

import { useEffect, useState } from "react"
import { Sphere, Line } from "@react-three/drei"

const GraphAnimation = () => {
  const [highlight, setHighlight] = useState(0)
  const [pulse, setPulse] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => setHighlight((h) => (h + 1) % 5), 900)
    const pulseInterval = setInterval(() => setPulse((p) => (p === 1 ? 1.15 : 1)), 450)
    return () => {
      clearInterval(interval)
      clearInterval(pulseInterval)
    }
  }, [])

  const nodePositions = [
    [0, 3, 0],
    [-3, 0, 0],
    [3, 0, 0],
    [-1.5, -3, 0],
    [1.5, -3, 0],
  ]

  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ]

  return (
    <group scale={[1.25, 1.25, 1.25]}>
      {/* Edges with enhanced visuals */}
      {edges.map(([a, b], i) => {
        const isActive = highlight === a || highlight === b
        const start = nodePositions[a]
        const end = nodePositions[b]

        return (
          <Line
            key={i}
            points={[start, end]}
            color={isActive ? "#f59e42" : "#64748b"}
            lineWidth={isActive ? 3 : 1}
            transparent
            opacity={isActive ? 1 : 0.6}
          />
        )
      })}

      {/* Nodes with enhanced effects */}
      {nodePositions.map((pos, i) => {
        const isActive = highlight === i
        return (
          <group key={i} position={pos}>
            <Sphere args={[0.7, 32, 32]} scale={isActive ? [pulse, pulse, pulse] : [1, 1, 1]}>
              <meshStandardMaterial
                color={isActive ? "#f59e42" : "#3b82f6"}
                emissive={isActive ? "#f59e42" : "#000"}
                emissiveIntensity={isActive ? 0.3 : 0}
                metalness={0.2}
                roughness={0.3}
              />
            </Sphere>

            {/* Glow effect for active nodes */}
            {isActive && (
              <Sphere args={[1.2, 16, 16]}>
                <meshBasicMaterial color="#f59e42" transparent opacity={0.2} />
              </Sphere>
            )}
          </group>
        )
      })}
    </group>
  )
}

export default GraphAnimation
