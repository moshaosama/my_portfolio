import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useScrollRef } from '../../context/ScrollContext'

const MAGENTA = new THREE.Color('#e879f9')
const PURPLE = new THREE.Color('#a855f7')
const CYAN = new THREE.Color('#67e8f9')

function ScrollCamera() {
  const scrollRef = useScrollRef()

  useFrame((state) => {
    const { progress, mouse, velocity } = scrollRef.current
    const cam = state.camera
    const workZone = Math.max(0, Math.min(1, (progress - 0.35) * 2.5))

    cam.position.x = THREE.MathUtils.lerp(cam.position.x, mouse.x * 0.7 + Math.sin(progress * Math.PI * 2) * 0.25, 0.03)
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, mouse.y * 0.45 + workZone * 0.3, 0.03)
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 5.4 - progress * 14, 0.04)
    cam.rotation.z = THREE.MathUtils.lerp(cam.rotation.z, velocity * 0.00004, 0.035)
    cam.lookAt(mouse.x * 0.25, mouse.y * 0.15 - workZone * 0.2, -progress * 16 - 2)
  })

  return null
}

function MagentaNebula() {
  const ref = useRef<THREE.Points>(null)
  const scrollRef = useScrollRef()
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, sizes, phases, tints } = useMemo(() => {
    const count = 8000
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const ph = new Float32Array(count)
    const tint = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.55) * 18
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65
      pos[i * 3 + 2] = r * Math.cos(phi) - 5 - Math.random() * 28
      sz[i] = Math.random() * 0.09 + 0.012
      ph[i] = Math.random() * Math.PI * 2
      tint[i] = Math.random()
    }
    return { positions: pos, sizes: sz, phases: ph, tints: tint }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const { progress, velocity, mouse } = scrollRef.current
    ref.current.rotation.y = state.clock.elapsedTime * 0.01 + progress * 0.6
    ref.current.rotation.x = mouse.y * 0.06
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, progress * 6 + velocity * 0.0008, 0.04)
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-tint" args={[tints, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={/* glsl */ `
          attribute float size;
          attribute float phase;
          attribute float tint;
          uniform float uTime;
          varying float vTwinkle;
          varying float vTint;
          void main() {
            vTwinkle = sin(uTime * 1.8 + phase) * 0.5 + 0.5;
            vTint = tint;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mv.z) * (0.5 + vTwinkle);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          varying float vTwinkle;
          varying float vTint;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float glow = smoothstep(0.5, 0.0, d);
            vec3 magenta = vec3(0.95, 0.35, 0.85);
            vec3 purple = vec3(0.65, 0.35, 0.98);
            vec3 cyan = vec3(0.45, 0.92, 1.0);
            vec3 col = mix(mix(magenta, purple, vTint), cyan, vTwinkle * 0.35);
            gl_FragColor = vec4(col, glow * (0.28 + vTwinkle * 0.5));
          }
        `}
      />
    </points>
  )
}

function IridescentSpine() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useScrollRef()
  const segments = 16

  useFrame((state) => {
    if (!groupRef.current) return
    const { progress, mouse } = scrollRef.current
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.08 + mouse.x * 0.2
    groupRef.current.position.z = -1.2 - progress * 9
    groupRef.current.position.x = mouse.x * 0.15

    groupRef.current.children.forEach((child, i) => {
      child.position.x = Math.sin(t * 0.6 + i * 0.45) * 0.12
      child.rotation.z = Math.sin(t * 0.4 + i * 0.3) * 0.25
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, -1.2]}>
      {Array.from({ length: segments }, (_, i) => {
        const y = (i - segments / 2) * 0.38
        const scale = 0.18 + Math.sin(i * 0.7) * 0.06
        return (
          <Float key={i} speed={1.2 + i * 0.05} floatIntensity={0.15} rotationIntensity={0.2}>
            <mesh position={[0, y, Math.sin(i * 0.5) * 0.08]}>
              <sphereGeometry args={[scale, 48, 48]} />
              <MeshDistortMaterial
                color="#f0abfc"
                emissive={i % 2 === 0 ? '#c026d3' : '#0891b2'}
                emissiveIntensity={0.9 + (i % 3) * 0.15}
                roughness={0.08}
                metalness={0.95}
                distort={0.28 + (i % 4) * 0.05}
                speed={2 + i * 0.15}
                transparent
                opacity={0.88}
              />
            </mesh>
          </Float>
        )
      })}

      {/* connecting tendrils */}
      {Array.from({ length: segments - 1 }, (_, i) => (
        <mesh key={`link-${i}`} position={[0, (i - segments / 2 + 0.5) * 0.38, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.28, 12]} />
          <meshBasicMaterial color="#e879f9" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

function ParticleSparkles() {
  const scrollRef = useScrollRef()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const { progress } = scrollRef.current
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03
    groupRef.current.position.z = -progress * 3
  })

  return (
    <group ref={groupRef}>
      <Sparkles count={500} scale={[16, 12, 16]} size={4} speed={0.3} opacity={0.65} color="#e879f9" />
      <Sparkles count={300} scale={[10, 8, 10]} size={5} speed={0.2} opacity={0.45} color="#a855f7" />
      <Sparkles count={180} scale={[6, 5, 6]} size={7} speed={0.12} opacity={0.35} color="#67e8f9" />
    </group>
  )
}

function LightStreaks() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const scrollRef = useScrollRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const streaks = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        x: (Math.random() - 0.5) * 12,
        z: -Math.random() * 14 - 1,
        h: 0.6 + Math.random() * 2.2,
        speed: 0.4 + Math.random() * 1,
        offset: Math.random() * 8,
      })),
    [],
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const { progress } = scrollRef.current
    streaks.forEach((s, i) => {
      const t = state.clock.elapsedTime * s.speed + s.offset
      dummy.position.set(s.x, ((t * 2) % 7) - 1.5, s.z - progress * 7)
      dummy.scale.set(0.01, s.h, 0.01)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 60]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#fae8ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  )
}

function DynamicFog() {
  const scrollRef = useScrollRef()
  const { scene } = useThree()

  useFrame(() => {
    const { progress } = scrollRef.current
    const accent = MAGENTA.clone().lerp(CYAN, progress)
    document.documentElement.style.setProperty('--scene-accent', `#${accent.getHexString()}`)
    if (scene.fog && scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerpColors(new THREE.Color('#050208'), new THREE.Color('#120818'), progress * 0.4)
    }
  })

  return null
}

function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={1.6} luminanceThreshold={0.06} luminanceSmoothing={0.92} mipmapBlur />
      <Vignette offset={0.2} darkness={0.9} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  )
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#050208']} />
      <fog attach="fog" args={['#050208', 2, 22]} />
      <ScrollCamera />
      <ambientLight intensity={0.06} />
      <pointLight position={[2, 3, 4]} intensity={2.2} color="#e879f9" />
      <pointLight position={[-3, -1, -2]} intensity={1.4} color="#a855f7" />
      <pointLight position={[0, -2, 3]} intensity={0.9} color="#67e8f9" />
      <DynamicFog />
      <MagentaNebula />
      <ParticleSparkles />
      <LightStreaks />
      <IridescentSpine />
      <PostFX />
    </>
  )
}

export default function ScrollScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 46 }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <SceneContent />
    </Canvas>
  )
}
