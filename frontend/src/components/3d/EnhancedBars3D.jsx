import { useRef, useState, useLayoutEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"

const AnimatedBar = ({
  value,
  position,
  color,
  isHighlighted,
  isSwapping,
  isMerging,
  barWidth = 1,
  barHeight = 1,
  fontSize = 0.5,
  animationSpeed = 0.1,
}) => {
  const meshRef = useRef()
  const textRef = useRef()
  const [currentHeight, setCurrentHeight] = useState(0)

  useLayoutEffect(() => {
    setCurrentHeight(0)
  }, [barHeight])

  useFrame((state) => {
    if (meshRef.current) {
      const targetHeight = barHeight
      const diff = targetHeight - currentHeight
      let newHeight = currentHeight

      if (Math.abs(diff) > 0.01) {
        newHeight = currentHeight + diff * animationSpeed
        setCurrentHeight(newHeight)
      } else if (currentHeight !== barHeight) {
        newHeight = barHeight
        setCurrentHeight(barHeight)
      }

      meshRef.current.scale.y = newHeight
      meshRef.current.position.y = newHeight / 2

      if (isHighlighted || isSwapping) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 5) * 0.2
      }

      if (isSwapping) {
        meshRef.current.material.emissive.setHex(0x22c55e)
        meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.4
      } else if (isMerging) {
        meshRef.current.material.emissive.setHex(0xa855f7)
        meshRef.current.material.emissiveIntensity = 0.4
      } else if (isHighlighted) {
        meshRef.current.material.emissive.setHex(0xf59e42)
        meshRef.current.material.emissiveIntensity = 0.4
      } else {
        meshRef.current.material.emissive.setHex(0x000000)
        meshRef.current.material.emissiveIntensity = 0
      }
    }
    if (textRef.current && meshRef.current) {
      textRef.current.position.y = meshRef.current.scale.y + fontSize * 0.8
    }
  })

  return (
    <group position={position}>
      <RoundedBox ref={meshRef} args={[barWidth, 1, barWidth]} radius={0.15} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </RoundedBox>

      <Text
        ref={textRef}
        position={[0, 0.5 + fontSize * 0.8, 0]}
        fontSize={fontSize} // Use the passed fontSize directly
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        outlineColor="#f9fafb"
        outlineWidth={0.03}
      >
        {value}
      </Text>
    </group>
  )
}

const EnhancedBars3D = ({ array, highlight = [], swap = [], merge = [], displayWidth = 20, maxBarHeight = 12 }) => {
  const palette = [
    "#3b82f6", "#f59e42", "#22c55e", "#a855f7", "#ef4444", "#eab308", "#06b6d4", "#f472b6", "#6366f1", "#10b981"
  ]
  const maxValue = Math.max(...array, 1)
  const heights = array.map((v) => (v / maxValue) * maxBarHeight)

  // 1. Decreased gapRatio to make bars wider
  const gapRatio = 0.5 // Decreased from 0.8 to 0.2 for wider bars
  const totalBarUnits = array.length
  const totalGapUnits = (array.length - 1) * gapRatio
  const totalUnits = totalBarUnits + totalGapUnits
  const barWidth = displayWidth / totalUnits
  const gap = barWidth * gapRatio

  // 2. Increased font size calculation
  const fontSize = Math.max(0.6, barWidth * 0.8) // Increased minimum size and multiplier

  const totalWidth = array.length * barWidth + (array.length - 1) * gap

  return (
    <group position={[-totalWidth / 2 + barWidth / 2, -maxBarHeight / 3, 0]}>
      {array.map((value, i) => {
        const color = palette[value % palette.length]
        const isHighlighted = highlight.includes(i)
        const isSwapping = swap.includes(i)
        const isMerging = merge.includes(i)

        return (
          <AnimatedBar
            key={`${i}-${value}`}
            value={value}
            barHeight={heights[i] || 0.1}
            position={[i * (barWidth + gap), 0, 0]}
            color={color}
            isHighlighted={isHighlighted}
            isSwapping={isSwapping}
            isMerging={isMerging}
            barWidth={barWidth}
            fontSize={fontSize}
          />
        )
      })}
    </group>
  )
}

export default EnhancedBars3D
