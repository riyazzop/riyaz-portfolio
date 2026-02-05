"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface FloatingIcon {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  iconSrc: string;
  image: HTMLImageElement | null;
}

function createIcon(
  width: number,
  height: number,
  index: number,
  iconSrc: string,
): FloatingIcon {
  // Responsive size: smaller on mobile, larger on desktop
  const isMobile = width < 768;
  const baseSize = isMobile ? 40 : 80;
  const sizeVariance = isMobile ? 30 : 70;
  const size = baseSize + Math.random() * sizeVariance; // Mobile: 40-70px, Desktop: 80-150px
  return {
    id: `icon-${index}-${Date.now()}-${Math.random()}`,
    x: size + Math.random() * (width - size * 2),
    y: size + Math.random() * (height - size * 2),
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    size,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.01,
    opacity: 0.2 + Math.random() * 0.3,
    iconSrc,
    image: null,
  };
}

function checkCollision(a: FloatingIcon, b: FloatingIcon): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDist = (a.size + b.size) / 2;
  return distance < minDist;
}

function resolveCollision(a: FloatingIcon, b: FloatingIcon): void {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) return;

  // Normal vector
  const nx = dx / distance;
  const ny = dy / distance;

  // Relative velocity
  const dvx = a.vx - b.vx;
  const dvy = a.vy - b.vy;

  // Relative velocity along normal
  const dvn = dvx * nx + dvy * ny;

  // Don't resolve if moving apart
  if (dvn > 0) return;

  // Collision response with mass based on size
  const massA = a.size * a.size;
  const massB = b.size * b.size;
  const totalMass = massA + massB;

  // Update velocities (elastic collision)
  const impulse = (2 * dvn) / totalMass;

  a.vx -= impulse * massB * nx * 0.8;
  a.vy -= impulse * massB * ny * 0.8;
  b.vx += impulse * massA * nx * 0.8;
  b.vy += impulse * massA * ny * 0.8;

  // Separate overlapping icons
  const overlap = (a.size + b.size) / 2 - distance;
  if (overlap > 0) {
    const separateX = (overlap / 2) * nx;
    const separateY = (overlap / 2) * ny;
    a.x -= separateX;
    a.y -= separateY;
    b.x += separateX;
    b.y += separateY;
  }
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconsRef = useRef<FloatingIcon[]>([]);
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [iconPaths, setIconPaths] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Fetch icon list from API
  useEffect(() => {
    async function fetchIcons() {
      try {
        const response = await fetch("/api/icons");
        const data = await response.json();
        if (data.icons && data.icons.length > 0) {
          setIconPaths(data.icons);
        }
      } catch (error) {
        console.error("Failed to fetch icons:", error);
        // Fallback to known icons
        setIconPaths([
          "/icons/react.svg",
          "/icons/nextjs.svg",
          "/icons/mongodb.svg",
          "/icons/mysql.svg",
          "/icons/python.svg",
          "/icons/java.svg",
        ]);
      }
    }
    fetchIcons();
  }, []);

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Load images and create icons when paths are available
  useEffect(() => {
    if (
      iconPaths.length === 0 ||
      dimensions.width === 0 ||
      dimensions.height === 0
    )
      return;

    // Calculate number of icons based on screen size
    // Limit to max 2 instances per icon
    const maxIcons = iconPaths.length * 2;
    const iconCount = Math.floor(
      (dimensions.width * dimensions.height) / 60000,
    );
    const numIcons = Math.min(Math.max(iconCount, 6), maxIcons);

    // Create icons - each icon appears at most twice
    const newIcons: FloatingIcon[] = [];
    const iconUsageCount: Record<string, number> = {};

    // Shuffle icon paths to randomize which icons appear
    const shuffledPaths = [...iconPaths].sort(() => Math.random() - 0.5);

    let pathIndex = 0;
    for (let i = 0; i < numIcons; i++) {
      // Find next icon that hasn't been used twice
      let iconSrc = shuffledPaths[pathIndex % shuffledPaths.length];
      while ((iconUsageCount[iconSrc] || 0) >= 2) {
        pathIndex++;
        iconSrc = shuffledPaths[pathIndex % shuffledPaths.length];
      }

      iconUsageCount[iconSrc] = (iconUsageCount[iconSrc] || 0) + 1;
      newIcons.push(
        createIcon(dimensions.width, dimensions.height, i, iconSrc),
      );
      pathIndex++;
    }

    // Load images for each icon
    let loadedCount = 0;
    newIcons.forEach((icon) => {
      const img = new Image();
      img.onload = () => {
        icon.image = img;
        loadedCount++;
        if (loadedCount === newIcons.length) {
          iconsRef.current = newIcons;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === newIcons.length) {
          iconsRef.current = newIcons.filter((i) => i.image !== null);
          setImagesLoaded(true);
        }
      };
      img.src = icon.iconSrc;
    });
  }, [iconPaths, dimensions.width, dimensions.height]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const { width, height } = dimensions;
    if (!width || !height) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const icons = iconsRef.current;

    // Check collisions between all pairs
    for (let i = 0; i < icons.length; i++) {
      for (let j = i + 1; j < icons.length; j++) {
        if (checkCollision(icons[i], icons[j])) {
          resolveCollision(icons[i], icons[j]);
        }
      }
    }

    // Update positions and draw
    for (const icon of icons) {
      // Update position
      icon.x += icon.vx;
      icon.y += icon.vy;
      icon.rotation += icon.rotationSpeed;

      // Bounce off edges
      if (icon.x <= icon.size / 2) {
        icon.x = icon.size / 2;
        icon.vx = Math.abs(icon.vx);
      }
      if (icon.x >= width - icon.size / 2) {
        icon.x = width - icon.size / 2;
        icon.vx = -Math.abs(icon.vx);
      }
      if (icon.y <= icon.size / 2) {
        icon.y = icon.size / 2;
        icon.vy = Math.abs(icon.vy);
      }
      if (icon.y >= height - icon.size / 2) {
        icon.y = height - icon.size / 2;
        icon.vy = -Math.abs(icon.vy);
      }

      // Apply slight friction
      icon.vx *= 0.9998;
      icon.vy *= 0.9998;

      // Maintain minimum speed
      const speed = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
      if (speed < 0.2) {
        const angle = Math.random() * Math.PI * 2;
        icon.vx = Math.cos(angle) * 0.4;
        icon.vy = Math.sin(angle) * 0.4;
      }

      // Draw icon
      if (icon.image) {
        ctx.save();
        ctx.translate(icon.x, icon.y);
        ctx.rotate(icon.rotation);
        ctx.globalAlpha = icon.opacity;

        // Draw the SVG image
        ctx.drawImage(
          icon.image,
          -icon.size / 2,
          -icon.size / 2,
          icon.size,
          icon.size,
        );

        ctx.restore();
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions]);

  useEffect(() => {
    if (!imagesLoaded) return;

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [imagesLoaded, animate]);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
