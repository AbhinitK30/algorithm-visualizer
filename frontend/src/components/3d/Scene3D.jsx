import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing"
import { Suspense } from "react"
import LoadingSpinner from "../ui/LoadingSpinner"

const Scene3D = ({
  children,
  camera = { position: [0, 40, 60], fov: 45 },
  controls = {},
  environment = "city",
  effects = false,
  shadows = true,
  className = "",
}) => {
  return (
    // CRITICAL FIX: By making this container absolute, it will fill the nearest
    // 'relative' parent, which is the visualization card. This should force it
    // to take up the correct amount of space, ignoring any other layout issues.
    <div className={`absolute top-0 left-0 w-full h-full ${className}`}>
      <Canvas
        shadows={shadows}
        camera={camera}
        gl={{ antialias: true, alpha: true }}
        fallback={<div className="w-full h-full flex items-center justify-center"><LoadingSpinner size="lg" color="blue" /></div>}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4f46e5" />
          <spotLight position={[0, 30, 0]} intensity={0.5} angle={0.3} penumbra={0.5} castShadow color="#06b6d4" />

          <Environment preset={environment} />

          {children}

          {controls && (
            <OrbitControls
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              {...controls}
            />
          )}
          
          {effects && (
            <EffectComposer>
              <Bloom intensity={0.5} luminanceThreshold={0.9} luminanceSmoothing={0.9} />
              <ToneMapping />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
