import { useState, useRef, useEffect } from "react"
import Scene3D from "../components/3d/Scene3D"
import EnhancedBars3D from "../components/3d/EnhancedBars3D"
import ParticleSystem from "../components/3d/ParticleSystem"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { algorithms, getSteps } from "../../utils/sortingAlgorithms"

const MIN_SIZE = 2
const MAX_SIZE = 20
const defaultArray = (size = 10) => Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1)

const Visualizer = () => {
  const [algo, setAlgo] = useState("bubble")
  const [arraySize, setArraySize] = useState(10)
  const [array, setArray] = useState(defaultArray(10))
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [stepIdx, setStepIdx] = useState(0)
  const [steps, setSteps] = useState(() => getSteps(algo, array))
  const intervalRef = useRef()

  useEffect(() => {
    setSteps(getSteps(algo, array))
    setStepIdx(0)
  }, [array, algo])

  useEffect(() => {
    if (!isPlaying) return
    if (stepIdx >= steps.length - 1) {
      setIsPlaying(false)
      return
    }
    intervalRef.current = setTimeout(() => {
      setStepIdx((idx) => idx + 1)
    }, 600 / speed)
    return () => clearTimeout(intervalRef.current)
  }, [isPlaying, stepIdx, steps.length, speed])

  const handleAlgoChange = (e) => setAlgo(e.target.value)
  const handleReset = () => {
    const newArr = defaultArray(arraySize)
    setArray(newArr)
    setStepIdx(0)
    setIsPlaying(false)
  }
  const handleSizeChange = (e) => {
    const size = Number(e.target.value)
    setArraySize(size)
    setArray(defaultArray(size))
    setStepIdx(0)
    setIsPlaying(false)
  }
  const handleSpeedChange = (e) => setSpeed(Number(e.target.value))
  const handleStep = () => {
    if (stepIdx < steps.length - 1) setStepIdx((idx) => idx + 1)
  }

  const current = steps[stepIdx]
  let highlight = [], swap = [], merge = []
  if (current?.type === "compare") highlight = current.indices
  if (current?.type === "swap") swap = current.indices
  if (current?.type === "merge") merge = current.indices

  const selectedAlgo = algorithms.find((a) => a.value === algo)
  const displayWidth = arraySize * 2.5;

  return (
    // This container now correctly continues the flex-col layout from Layout.jsx
    <div className="flex-1 flex flex-col p-2 md:p-6">
      <Card className="flex-1 flex flex-col backdrop-blur-md bg-white/70 border-blue-200 shadow-2xl p-1 sm:p-6 gap-4 w-full">
        {/* Controls */}
        <Card className="bg-white/60 border-blue-100 shadow-sm p-1 sm:p-3 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-base md:text-lg overflow-x-auto">
            {/* ... all controls are the same ... */}
             <div className="flex items-center gap-2 flex-shrink-0">
              <label className="font-semibold text-gray-700">Algorithm:</label>
              <select value={algo} onChange={handleAlgoChange} className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-400">
                {algorithms.map((a) => (<option key={a.value} value={a.value}>{a.label}</option>))}
              </select>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700">Speed:</label>
                <input type="range" min={0.5} max={3} step={0.5} value={speed} onChange={handleSpeedChange} className="w-24 accent-blue-500" />
                <span className="w-10 text-center">{speed.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700">Size:</label>
                <input type="range" min={MIN_SIZE} max={MAX_SIZE} value={arraySize} onChange={handleSizeChange} className="w-24 accent-green-500" />
                <span className="w-8 text-center">{arraySize}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap flex-shrink-0">
              <Button onClick={() => setIsPlaying(true)} disabled={isPlaying || stepIdx >= steps.length - 1} size="sm">Play</Button>
              <Button variant="secondary" onClick={() => setIsPlaying(false)} disabled={!isPlaying} size="sm">Pause</Button>
              <Button variant="outline" onClick={handleStep} disabled={isPlaying || stepIdx >= steps.length - 1} size="sm">Step</Button>
              <Button variant="success" onClick={handleReset} size="sm">Reset</Button>
            </div>
          </div>
        </Card>

        {/* Algorithm Info */}
        <Card gradient className="p-4 w-full">
          <div className="font-semibold text-lg text-blue-800 mb-1">{selectedAlgo.label}</div>
          <div className="text-gray-700 mb-1">{selectedAlgo.description}</div>
          <div className="text-sm text-gray-600">
            Best: <span className="font-semibold">{selectedAlgo.best}</span>&nbsp;|&nbsp;
            Worst: <span className="font-semibold">{selectedAlgo.worst}</span>
          </div>
        </Card>

        {/* 3D Visualization Container - This will now grow correctly */}
        <div className="w-full flex-1 relative bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-xl border border-blue-200">
          <Scene3D
            camera={{ position: [0, 25, 55], fov: 50 }}
            controls={{ enableZoom: false, minDistance: 10, maxDistance: 120 }}
            environment="city"
            effects={true}
            shadows={true}
          >
            <EnhancedBars3D
              array={current?.array || array}
              highlight={highlight}
              swap={swap}
              merge={merge}
              maxBarHeight={25}
              displayWidth={displayWidth}
            />
            <ParticleSystem count={80} color="#4f46e5" size={0.08} />
          </Scene3D>
        </div>
      </Card>
    </div>
  )
}

export default Visualizer
