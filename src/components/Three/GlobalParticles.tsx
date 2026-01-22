"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Check if mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

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

// Light interactive particle network
function ParticleNetwork({
  mouse,
  isMobile,
}: {
  mouse: { x: number; y: number };
  isMobile: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  // Fewer particles on mobile, more spread out
  const particleCount = isMobile ? 40 : 100;
  const connectionDistance = isMobile ? 5 : 2;

  // Generate initial particle positions - spread wider on mobile
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const spreadX = isMobile ? 30 : 20;
    const spreadY = isMobile ? 25 : 15;

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * spreadX;
      positions[i + 1] = (Math.random() - 0.5) * spreadY;
      positions[i + 2] = (Math.random() - 0.5) * 5 - 5;

      velocities[i] = (Math.random() - 0.5) * 0.003;
      velocities[i + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i + 2] = (Math.random() - 0.5) * 0.001;
    }

    return { positions, velocities };
  }, [particleCount, isMobile]);

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
    const mouseX = mouse.x * 8;
    const mouseY = mouse.y * 6;

    // Update particle positions with floating motion
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Slow float animation - independent movement
      posArray[i] +=
        velocities[i] + Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.002;
      posArray[i + 1] +=
        velocities[i + 1] + Math.cos(state.clock.elapsedTime * 0.2 + i) * 0.002;
      posArray[i + 2] += velocities[i + 2];

      // Gentle cursor attraction (subtle, only on desktop)
      if (!isMobile) {
        const dx = mouseX - posArray[i];
        const dy = mouseY - posArray[i + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5 && dist > 0.5) {
          // Very gentle attraction - particles slowly drift toward cursor
          const force = (5 - dist) * 0.003;
          posArray[i] += (dx / dist) * force;
          posArray[i + 1] += (dy / dist) * force;
        }
      }

      // Particle separation - spread apart when too close
      for (let j = 0; j < particleCount * 3; j += 3) {
        if (i === j) continue;

        const dx = posArray[i] - posArray[j];
        const dy = posArray[i + 1] - posArray[j + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If particles are too close, push them apart
        const minDist = 1.5;
        if (dist < minDist && dist > 0.01) {
          const repelForce = (minDist - dist) * 0.01;
          posArray[i] += (dx / dist) * repelForce;
          posArray[i + 1] += (dy / dist) * repelForce;
        }
      }

      // Boundary wrapping
      const boundX = isMobile ? 15 : 10;
      const boundY = isMobile ? 12 : 8;
      if (posArray[i] > boundX) posArray[i] = -boundX;
      if (posArray[i] < -boundX) posArray[i] = boundX;
      if (posArray[i + 1] > boundY) posArray[i + 1] = -boundY;
      if (posArray[i + 1] < -boundY) posArray[i + 1] = boundY;
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
          size={isMobile ? 0.06 : 0.08}
          color="#ffffff"
          transparent
          opacity={isMobile ? 0.5 : 0.5}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={isMobile ? 0.08 : 0.12}
        />
      </lineSegments>
    </>
  );
}

function Scene() {
  const mouse = useMousePosition();
  const isMobile = useIsMobile();

  return (
    <>
      <ParticleNetwork mouse={mouse} isMobile={isMobile} />
    </>
  );
}

export default function GlobalParticles({
  className = "fixed inset-0 pointer-events-none z-0",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
