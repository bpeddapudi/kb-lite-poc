import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.jsx'

function SpinningMesh() {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.45
    ref.current.rotation.y += delta * 0.65
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.65, 0.22, 160, 24]} />
      <meshStandardMaterial
        color="#818cf8"
        metalness={0.55}
        roughness={0.28}
        emissive="#312e81"
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0a12']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#a5b4fc" />
      <SpinningMesh />
    </>
  )
}

export function ThreePreview() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Three.js</CardTitle>
        <CardDescription>React Three Fiber — animated torus knot (no external HDR).</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[min(38vh,320px)] w-full bg-[#0a0a12]">
          <Canvas
            camera={{ position: [0, 0.2, 2.8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <Scene />
          </Canvas>
        </div>
      </CardContent>
    </Card>
  )
}
