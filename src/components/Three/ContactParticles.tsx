"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Mouse position tracking hook
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
}

// Interactive particle network
function ParticleNetwork({ mouse }: { mouse: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particleCount = 40;
  const connectionDistance = 2.5;

  // Generate initial particle positions
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 4 - 3;

      velocities[i] = (Math.random() - 0.5) * 0.01;
      velocities[i + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions, velocities };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geo;
  }, [positions]);

  // Line geometry for connections
  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry();
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionAttr = pointsRef.current.geometry.getAttribute("position");
    const posArray = positionAttr.array as Float32Array;

    // Mouse influence
    const mouseX = mouse.x * 5;
    const mouseY = mouse.y * 3;

    // Update particle positions with floating motion and mouse interaction
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Float animation
      posArray[i] +=
        velocities[i] + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      posArray[i + 1] +=
        velocities[i + 1] + Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.002;
      posArray[i + 2] += velocities[i + 2];

      // Mouse push effect
      const dx = posArray[i] - mouseX;
      const dy = posArray[i + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        const force = (2 - dist) * 0.02;
        posArray[i] += (dx / dist) * force;
        posArray[i + 1] += (dy / dist) * force;
      }

      // Boundary wrapping
      if (posArray[i] > 6) posArray[i] = -6;
      if (posArray[i] < -6) posArray[i] = 6;
      if (posArray[i + 1] > 4) posArray[i + 1] = -4;
      if (posArray[i + 1] < -4) posArray[i + 1] = 4;
    }

    positionAttr.needsUpdate = true;

    // Update connection lines
    if (linesRef.current) {
      const linePositions: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions.push(
              posArray[i3],
              posArray[i3 + 1],
              posArray[i3 + 2],
              posArray[j3],
              posArray[j3 + 1],
              posArray[j3 + 2],
            );
          }
        }
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3),
      );
    }
  });

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

function Scene() {
  const mouse = useMousePosition();

  return (
    <>
      <ambientLight intensity={0.2} />
      <ParticleNetwork mouse={mouse} />
    </>
  );
}

export default function ContactParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
