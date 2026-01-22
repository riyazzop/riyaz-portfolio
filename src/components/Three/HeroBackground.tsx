"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Animated Torus Knot - Central attraction
function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, -2]} scale={2.4}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

// Glowing Sphere with distortion
function GlowingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere ref={meshRef} args={[0.8, 64, 64]} position={position}>
        <MeshDistortMaterial
          color="#808080"
          transparent
          opacity={0.2}
          distort={0.4}
          speed={2}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

// Icosahedron - Geometric beauty
function Icosahedron({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

// Dodecahedron
function Dodecahedron({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#606060"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Ring orbiting
function OrbitingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// Particle field
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 12;

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      // White to gray gradient
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i] = brightness;
      colors[i + 1] = brightness;
      colors[i + 2] = brightness;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Connecting lines between points
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodeCount = 20;
    const nodes: THREE.Vector3[] = [];

    // Create random nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 5,
        ),
      );
    }

    // Connect nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 6) {
          points.push(nodes[i].x, nodes[i].y, nodes[i].z);
          points.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#404040" transparent opacity={0.15} />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#606060" />
      <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.3} />

      {/* Stars background */}
      <Stars
        radius={80}
        depth={60}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Central Torus Knot */}
      <TorusKnot />

      {/* Orbiting Ring */}
      <OrbitingRing />

      {/* Glowing Spheres */}
      <GlowingSphere position={[-4, 2, -4]} />
      <GlowingSphere position={[4, -1, -5]} />

      {/* Icosahedrons */}
      <Icosahedron position={[-5, -2, -6]} scale={0.6} speed={0.2} />
      <Icosahedron position={[5, 3, -7]} scale={0.5} speed={0.15} />
      <Icosahedron position={[2, -3, -4]} scale={0.4} speed={0.25} />

      {/* Dodecahedrons */}
      <Dodecahedron position={[-3, 3, -8]} scale={0.5} />
      <Dodecahedron position={[4, -2, -9]} scale={0.4} />

      {/* Particle Field */}
      <ParticleField />

      {/* Connection Lines */}
      <ConnectionLines />
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
