

import { useRef, useEffect, useState } from "react"
import { RoundedBox } from "@react-three/drei"

const MazeAnimation = () => {
  const gridSize = 7
  const [visited, setVisited] = useState([])
  const [path, setPath] = useState([])
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState("search")
  const intervalRef = useRef()

  useEffect(() => {
    // BFS pathfinding simulation
    const queue = [[0, 0]]
    const prev = Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
    const vis = Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
    vis[0][0] = true
    const order = [[0, 0]]
    let found = false

    while (queue.length && !found) {
      const [x, y] = queue.shift()
      for (const [dx, dy] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const nx = x + dx,
          ny = y + dy
        if (nx >= 0 && ny >= 0 && nx < gridSize && ny < gridSize && !vis[nx][ny]) {
          vis[nx][ny] = true
          prev[nx][ny] = [x, y]
          order.push([nx, ny])
          queue.push([nx, ny])
          if (nx === gridSize - 1 && ny === gridSize - 1) {
            found = true
            break
          }
        }
      }
    }

    // Reconstruct path
    let px = gridSize - 1,
      py = gridSize - 1
    const pathArr = [[px, py]]
    while (prev[px][py]) {
      ;[px, py] = prev[px][py]
      pathArr.push([px, py])
    }

    setVisited(order)
    setPath(pathArr.reverse())
    setStep(0)
    setPhase("search")
  }, [])

  useEffect(() => {
    if (phase === "search") {
      if (step < visited.length) {
        intervalRef.current = setTimeout(() => setStep((s) => s + 1), 80)
      } else {
        setTimeout(() => {
          setPhase("path")
          setStep(0)
        }, 500)
      }
    } else if (phase === "path") {
      if (step < path.length) {
        intervalRef.current = setTimeout(() => setStep((s) => s + 1), 120)
      } else {
        setTimeout(() => {
          setPhase("search")
          setStep(0)
        }, 1200)
      }
    }
    return () => clearTimeout(intervalRef.current)
  }, [step, phase, visited, path])

  return (
    <group scale={[1.25, 1.25, 1.25]}>
      {[...Array(gridSize)].map((_, x) =>
        [...Array(gridSize)].map((_, y) => {
          let color = "#e0e7ef"
          let emissive = "#000000"
          let emissiveIntensity = 0

          if (phase === "search" && visited.slice(0, step).some(([vx, vy]) => vx === x && vy === y)) {
            color = "#f59e42"
            emissive = "#f59e42"
            emissiveIntensity = 0.2
          }
          if (phase === "path" && path.slice(0, step).some(([px, py]) => px === x && py === y)) {
            color = "#22c55e"
            emissive = "#22c55e"
            emissiveIntensity = 0.3
          }
          if (x === 0 && y === 0) {
            color = "#3b82f6"
            emissive = "#3b82f6"
            emissiveIntensity = 0.2
          }
          if (x === gridSize - 1 && y === gridSize - 1) {
            color = "#ef4444"
            emissive = "#ef4444"
            emissiveIntensity = 0.2
          }

          return (
            <RoundedBox key={`${x}-${y}`} args={[0.9, 0.3, 0.9]} position={[x, 0, y]} radius={0.05} smoothness={4}>
              <meshStandardMaterial
                color={color}
                emissive={emissive}
                emissiveIntensity={emissiveIntensity}
                metalness={0.1}
                roughness={0.5}
              />
            </RoundedBox>
          )
        }),
      )}
    </group>
  )
}

export default MazeAnimation
