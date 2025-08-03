"use client"

import { useState, useEffect } from "react"
import Scene3D from "../components/3d/Scene3D"
import Typewriter from "../components/ui/Typewriter"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import SortingAnimation from "../components/3d/animations/SortingAnimation"
import GraphAnimation from "../components/3d/animations/GraphAnimation"
import MazeAnimation from "../components/3d/animations/MazeAnimation"
import StackQueueAnimation from "../components/3d/animations/StackQueueAnimation"
import ParticleSystem from "../components/3d/ParticleSystem"

const phrases = [
  "Visualize Algorithms in 3D",
  "Learn. Interact. Conquer.",
  "Algorithms, Quizzes, Leaderboards!",
  "Make Algorithms Fun!",
]

const heroVisuals = [
  {
    title: "Sorting Visualization",
    Component: SortingAnimation,
  },
  {
    title: "Graph Traversal",
    Component: GraphAnimation,
  },
  {
    title: "Pathfinding Maze",
    Component: MazeAnimation,
  },
  {
    title: "Stack & Queue",
    Component: StackQueueAnimation,
  },
]

const Home = () => {
  const [visualIdx, setVisualIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setVisualIdx((i) => (i + 1) % heroVisuals.length), 6000)
    return () => clearInterval(interval)
  }, [])

  const { title, Component } = heroVisuals[visualIdx]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl">
      <div className="absolute inset-0 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 animate-gradient-x z-0" />

      <div className="relative z-10 flex flex-col items-center gap-8 pt-10 pb-10 px-10">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
          {/* 3D Visualization Card */}
          <Card className="w-[380px] h-[380px] bg-white/90 border-blue-100 shadow-2xl animate-float">
            <div className="text-blue-700 font-bold mb-4 text-lg">{title}</div>
            <div className="w-full h-[300px]">
              <Scene3D
                key={visualIdx}
                camera={{ position: [7, 7, 18] }}
                environment="city"
                effects={true}
                shadows={true}
              >
                <Component />
                <ParticleSystem count={30} color="#4f46e5" size={0.03} />
              </Scene3D>
            </div>
          </Card>

          {/* Hero Content */}
          <div className="flex flex-col items-center gap-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-lg">
              <Typewriter phrases={phrases} />
            </h1>

            <p className="text-lg md:text-xl text-gray-700 font-medium max-w-lg leading-relaxed">
              Welcome to Algorithm Visualizer — the most interactive way to learn, visualize, and master algorithms.
              Compete on the leaderboard, test your knowledge with quizzes, and see algorithms come to life in 3D!
            </p>

            <div className="flex gap-4 mt-4">
              <Button size="lg" onClick={() => (window.location.href = "/visualizer")} className="animate-pulse-glow">
                Start Visualizing
              </Button>

              <Button variant="outline" size="lg" onClick={() => (window.location.href = "/quizzes")}>
                Take Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
          <Card gradient className="text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Interactive Learning</h3>
            <p className="text-gray-600">
              Step through algorithms with real-time 3D visualizations and interactive controls.
            </p>
          </Card>

          <Card gradient className="text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Compete & Learn</h3>
            <p className="text-gray-600">Test your knowledge with quizzes and climb the leaderboard.</p>
          </Card>

          <Card gradient className="text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Advanced 3D Graphics</h3>
            <p className="text-gray-600">
              Experience algorithms like never before with stunning 3D effects and animations.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
