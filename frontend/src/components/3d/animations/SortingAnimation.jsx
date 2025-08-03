
import { useRef, useEffect, useState } from "react"
import EnhancedBars3D from "../EnhancedBars3D"
import ParticleSystem from "../ParticleSystem"

const SortingAnimation = ({ algorithm = "bubble" }) => {
  const [bars, setBars] = useState(() => Array.from({ length: 8 }, () => Math.floor(Math.random() * 8) + 2))
  const [step, setStep] = useState(0)
  const [sorting, setSorting] = useState(false)
  const stepsRef = useRef([])
  const intervalRef = useRef()

  // Generate sorting steps based on algorithm
  useEffect(() => {
    const generateSteps = (arr, algo) => {
      const steps = []
      const a = arr.slice()

      if (algo === "bubble") {
        for (let i = 0; i < a.length - 1; i++) {
          for (let j = 0; j < a.length - i - 1; j++) {
            steps.push({ type: "compare", indices: [j, j + 1], arr: a.slice() })
            if (a[j] > a[j + 1]) {
              ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
              steps.push({ type: "swap", indices: [j, j + 1], arr: a.slice() })
            }
          }
        }
      }

      return steps
    }

    stepsRef.current = generateSteps(bars, algorithm)
    setStep(0)
    setSorting(true)
  }, [bars, algorithm])

  // Animate steps
  useEffect(() => {
    if (!sorting) return
    if (step >= stepsRef.current.length) {
      setTimeout(() => {
        const newBars = Array.from({ length: 8 }, () => Math.floor(Math.random() * 8) + 2)
        setBars(newBars)
        setSorting(false)
      }, 1200)
      return
    }

    intervalRef.current = setTimeout(() => {
      setBars(stepsRef.current[step].arr)
      setStep((s) => s + 1)
    }, 350)

    return () => clearTimeout(intervalRef.current)
  }, [step, sorting])

  const highlight = sorting && step < stepsRef.current.length ? stepsRef.current[step].indices : []
  const isSwap = sorting && step < stepsRef.current.length && stepsRef.current[step].type === "swap"

  return (
    <group>
      <EnhancedBars3D array={bars} highlight={isSwap ? [] : highlight} swap={isSwap ? highlight : []} maxBarHeight={7} displayWidth={12} />
      <ParticleSystem count={50} color="#4f46e5" size={0.05} />
    </group>
  )
}

export default SortingAnimation
