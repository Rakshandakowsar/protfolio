import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function BrainMesh() {
  const mesh = useRef<any>(null)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.4
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.2
    }
  })

  return (
    <Float speed={2.4} rotationIntensity={0.35} floatIntensity={0.5}>
      <mesh ref={mesh} castShadow receiveShadow>
        <icosahedronGeometry args={[1.35, 3]} />
        <meshStandardMaterial color="#6C63FF" emissive="#101128" roughness={0.2} metalness={0.55} />
      </mesh>
    </Float>
  )
}

export function BrainCanvas() {
  return (
    <div className="h-[320px] w-full rounded-[32px] border border-white/10 bg-slate-950/60 p-4 shadow-[0_0_60px_rgba(108,99,255,0.2)]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 3]} intensity={4} color="#6C63FF" />
        <pointLight position={[-3, -2, -2]} intensity={2.2} color="#00d9ff" />
        <BrainMesh />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
