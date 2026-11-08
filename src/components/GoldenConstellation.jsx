import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GoldenConstellation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera & Renderer ---
    const scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x121212, 1); // Match portfolio dark background

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // --- Procedural Glowing Particle Texture ---
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 245, 205, 1)'); // Bright gold-white core
      gradient.addColorStop(0.25, 'rgba(218, 178, 85, 0.9)'); // Warm gold body
      gradient.addColorStop(0.65, 'rgba(184, 156, 98, 0.35)'); // Soft gold halo
      gradient.addColorStop(1, 'rgba(184, 156, 98, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createGlowTexture();

    // --- Particle Settings ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 55 : 105;
    const maxDistance = isMobile ? 95 : 130;
    const boundsX = isMobile ? 200 : 360;
    const boundsY = isMobile ? 240 : 220;
    const boundsZ = 160;

    const particlesData = [];
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * boundsX * 2;
      const y = (Math.random() - 0.5) * boundsY * 2;
      const z = (Math.random() - 0.5) * boundsZ * 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.25
        ),
      });
    }

    // --- Points (Nodes) ---
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff, // Texture supplies rich golden colors
      size: isMobile ? 12 : 16,
      map: particleTexture || undefined,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(pointCloud);

    // --- Lines (Constellation Connections) ---
    const maxLineSegments = particleCount * particleCount;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // --- Ambient Golden Stardust Layer ---
    const dustCount = isMobile ? 50 : 100;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * boundsX * 2.5;
      dustPositions[i + 1] = (Math.random() - 0.5) * boundsY * 2.5;
      dustPositions[i + 2] = (Math.random() - 0.5) * boundsZ * 2;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 4,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // --- Mouse Parallax Interaction ---
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      targetX = (event.clientX - halfWidth) * 0.14;
      targetY = (event.clientY - halfHeight) * 0.14;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;
        targetX = (touch.clientX - halfWidth) * 0.08;
        targetY = (touch.clientY - halfHeight) * 0.08;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera parallax
      currentX += (targetX - currentX) * 0.04;
      currentY += (-targetY - currentY) * 0.04;
      camera.position.x = currentX;
      camera.position.y = currentY;
      camera.lookAt(0, 0, 0);

      // Ambient dust slow drift
      dust.rotation.y += 0.0004;
      dust.rotation.x += 0.0002;

      // Update particle positions & bounce inside bounds
      let vertexPosIndex = 0;
      let colorPosIndex = 0;
      let numConnectedLines = 0;

      for (let i = 0; i < particleCount; i++) {
        const data = particlesData[i];

        // Move
        particlePositions[i * 3] += data.velocity.x;
        particlePositions[i * 3 + 1] += data.velocity.y;
        particlePositions[i * 3 + 2] += data.velocity.z;

        // Bounce horizontally
        if (
          particlePositions[i * 3] < -boundsX ||
          particlePositions[i * 3] > boundsX
        ) {
          data.velocity.x = -data.velocity.x;
        }

        // Bounce vertically
        if (
          particlePositions[i * 3 + 1] < -boundsY ||
          particlePositions[i * 3 + 1] > boundsY
        ) {
          data.velocity.y = -data.velocity.y;
        }

        // Bounce in depth
        if (
          particlePositions[i * 3 + 2] < -boundsZ ||
          particlePositions[i * 3 + 2] > boundsZ
        ) {
          data.velocity.z = -data.velocity.z;
        }

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            // Alpha diminishes smoothly as distance increases
            const alpha = Math.max(0, 1.0 - dist / maxDistance);

            // Rich warm gold RGB values
            const r = 0.88 * alpha; // ~224 / 255
            const g = 0.74 * alpha; // ~188 / 255
            const b = 0.42 * alpha; // ~107 / 255

            // Point A
            linePositions[vertexPosIndex++] = particlePositions[i * 3];
            linePositions[vertexPosIndex++] = particlePositions[i * 3 + 1];
            linePositions[vertexPosIndex++] = particlePositions[i * 3 + 2];

            lineColors[colorPosIndex++] = r;
            lineColors[colorPosIndex++] = g;
            lineColors[colorPosIndex++] = b;

            // Point B
            linePositions[vertexPosIndex++] = particlePositions[j * 3];
            linePositions[vertexPosIndex++] = particlePositions[j * 3 + 1];
            linePositions[vertexPosIndex++] = particlePositions[j * 3 + 2];

            lineColors[colorPosIndex++] = r;
            lineColors[colorPosIndex++] = g;
            lineColors[colorPosIndex++] = b;

            numConnectedLines++;
          }
        }
      }

      // Mark buffer updates
      linesGeometry.setDrawRange(0, numConnectedLines * 2);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      if (particleTexture) particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
    />
  );
};

export default GoldenConstellation;
