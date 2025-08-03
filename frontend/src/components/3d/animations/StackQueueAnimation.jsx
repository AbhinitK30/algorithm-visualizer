

import { useEffect, useState } from "react"
import { RoundedBox, Text } from "@react-three/drei"

const StackQueueAnimation = () => {
  const [stack, setStack] = useState([1, 2, 3])
  const [queue, setQueue] = useState([4, 5, 6])
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState("push")

  useEffect(() => {
    const sequence = [
      { mode: "push", stack: [1, 2, 3, 7], queue: [4, 5, 6] },
      { mode: "pop", stack: [1, 2, 3], queue: [4, 5, 6] },
      { mode: "enqueue", stack: [1, 2, 3], queue: [4, 5, 6, 8] },
      { mode: "dequeue", stack: [1, 2, 3], queue: [5, 6, 8] },
    ]

    const interval = setInterval(() => {
      const s = (step + 1) % sequence.length
      setStep(s)
      setMode(sequence[s].mode)
      setStack(sequence[s].stack)
      setQueue(sequence[s].queue)
    }, 1200)

    return () => clearInterval(interval)
  }, [step])

  return (
    <group scale={[2, 2, 2]}>
      {/* Stack */}
      <group position={[-2.5, 0, 0]}>
        {stack.map((v, i) => {
          const isHighlighted = i === stack.length - 1 && (mode === "push" || mode === "pop")
          return (
            <RoundedBox key={i} args={[1, 1, 1]} position={[0, i * 1.1, 0]} radius={0.1} smoothness={4}>
              <meshStandardMaterial
                color={isHighlighted ? "#f59e42" : "#3b82f6"}
                emissive={isHighlighted ? "#f59e42" : "#000000"}
                emissiveIntensity={isHighlighted ? 0.2 : 0}
                metalness={0.2}
                roughness={0.4}
              />
            </RoundedBox>
          )
        })}
        <Text
          position={[0, stack.length * 1.1 + 0.7, 0]}
          fontSize={0.5}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          STACK
        </Text>
      </group>

      {/* Queue */}
      <group position={[2.5, 0, 0]}>
        {queue.map((v, i) => {
          const isDequeue = i === 0 && mode === "dequeue"
          const isEnqueue = i === queue.length - 1 && mode === "enqueue"
          let color = "#3b82f6"
          let emissive = "#000000"
          let emissiveIntensity = 0

          if (isDequeue) {
            color = "#f59e42"
            emissive = "#f59e42"
            emissiveIntensity = 0.2
          } else if (isEnqueue) {
            color = "#22c55e"
            emissive = "#22c55e"
            emissiveIntensity = 0.2
          }

          return (
            <RoundedBox key={i} args={[1, 1, 1]} position={[i * 1.1, 0, 0]} radius={0.1} smoothness={4}>
              <meshStandardMaterial
                color={color}
                emissive={emissive}
                emissiveIntensity={emissiveIntensity}
                metalness={0.2}
                roughness={0.4}
              />
            </RoundedBox>
          )
        })}
        <Text
          position={[(queue.length - 1) * 0.55, -1.2, 0]}
          fontSize={0.5}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          QUEUE
        </Text>
      </group>
    </group>
  )
}

export default StackQueueAnimation
