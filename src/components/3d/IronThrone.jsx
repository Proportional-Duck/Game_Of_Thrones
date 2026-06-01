import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function IronThrone() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const triggerAssemblyRef = useRef(null);

  // Expose a reset/re-assemble trigger
  const triggerReassemble = () => {
    if (triggerAssemblyRef.current) {
      triggerAssemblyRef.current();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.3, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lights (Moody High-Contrast Drama!)
    const ambientLight = new THREE.AmbientLight(0x0b0b12, 0.7);
    scene.add(ambientLight);

    // Gold spotlight focusing on the center
    const spotLight = new THREE.SpotLight(0xd4af37, 10, 22, Math.PI * 0.28, 0.4, 1.2);
    spotLight.position.set(0, 7, 5);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.bias = -0.001;
    scene.add(spotLight);

    // Glowing magma / firelight from below
    const fireLight = new THREE.PointLight(0xe65c00, 16, 12);
    fireLight.position.set(0, -1.6, 1.2);
    scene.add(fireLight);

    // Dynamic cold blue rim light for realistic metal reflections
    const blueRimLight = new THREE.DirectionalLight(0x4a9eca, 4.5);
    blueRimLight.position.set(-4, 3, -6);
    scene.add(blueRimLight);

    // 3. Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4d55,
      roughness: 0.32,
      metalness: 0.95,
      bumpScale: 0.05,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b7e31,
      roughness: 0.4,
      metalness: 0.85,
    });

    const hiltMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1a17, // Wrapped leather / dark fabric
      roughness: 0.8,
      metalness: 0.1,
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0xe65c00,
      emissive: 0xe65c00,
      emissiveIntensity: 3.0,
    });

    // 4. Procedurally build a HIGHLY REALISTIC individual sword mesh group
    const createRealisticSword = (bladeLength = 1.4, bladeWidth = 0.07, hiltScale = 1.0) => {
      const sword = new THREE.Group();

      // Blade: double-edged diamond profile
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(0, 0);
      bladeShape.lineTo(bladeWidth * 0.5, 0.005);
      bladeShape.lineTo(bladeWidth * 0.5, bladeLength * 0.88);
      bladeShape.lineTo(0, bladeLength); // Pointy tip
      bladeShape.lineTo(-bladeWidth * 0.5, bladeLength * 0.88);
      bladeShape.lineTo(-bladeWidth * 0.5, 0.005);
      bladeShape.lineTo(0, 0);

      const extrudeSettings = {
        steps: 1,
        depth: 0.015,
        bevelEnabled: true,
        bevelThickness: 0.005,
        bevelSize: 0.003,
        bevelSegments: 2,
      };

      const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
      bladeGeo.center();
      // Adjust geometry center to align at the crossguard attachment point
      bladeGeo.translate(0, bladeLength * 0.5, 0);
      const blade = new THREE.Mesh(bladeGeo, steelMaterial);
      blade.castShadow = true;
      blade.receiveShadow = true;
      sword.add(blade);

      // Crossguard (horizontal guard bar)
      const guardWidth = 0.22 * hiltScale;
      const guardGeo = new THREE.CylinderGeometry(0.012, 0.009, guardWidth, 8);
      const guard = new THREE.Mesh(guardGeo, brassMaterial);
      guard.rotation.z = Math.PI / 2;
      guard.position.y = 0;
      guard.castShadow = true;
      sword.add(guard);

      // Grip/Hilt (wrapped handle)
      const gripLength = 0.24 * hiltScale;
      const gripGeo = new THREE.CylinderGeometry(0.012, 0.012, gripLength, 8);
      const grip = new THREE.Mesh(gripGeo, hiltMaterial);
      grip.position.y = -gripLength * 0.5;
      grip.castShadow = true;
      sword.add(grip);

      // Pommel (end weight ring/sphere)
      const pommelGeo = new THREE.SphereGeometry(0.02 * hiltScale, 8, 8);
      const pommel = new THREE.Mesh(pommelGeo, brassMaterial);
      pommel.position.y = -gripLength;
      pommel.castShadow = true;
      sword.add(pommel);

      return sword;
    };

    // 5. Assemble Throne Structure with Sword target coordinates
    const throneGroup = new THREE.Group();
    scene.add(throneGroup);

    // List to store all individual swords that will fly in
    const flyingSwords = [];

    // Dark slate steps/blocks base
    const baseGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const w = 2.4 - i * 0.4;
      const stepGeo = new THREE.BoxGeometry(w, 0.25, 2.4 - i * 0.3);
      const step = new THREE.Mesh(stepGeo, steelMaterial);
      step.position.y = -1.3 + i * 0.25;
      step.receiveShadow = true;
      baseGroup.add(step);
    }
    throneGroup.add(baseGroup);

    // Glow cracks in the pedestal
    for (let i = 0; i < 15; i++) {
      const glowGeo = new THREE.BoxGeometry(0.12 + Math.random() * 0.25, 0.02, 0.6 + Math.random() * 0.6);
      const glow = new THREE.Mesh(glowGeo, glowMaterial);
      glow.position.set((Math.random() - 0.5) * 3, -1.33, (Math.random() - 0.5) * 3);
      glow.rotation.y = Math.random() * Math.PI;
      throneGroup.add(glow);
    }

    // Helper to register a sword to the flying assembly
    const registerSword = (sword, targetPos, targetRot) => {
      sword.position.copy(targetPos);
      sword.rotation.copy(targetRot);
      throneGroup.add(sword);
      
      // Store metadata for the flight simulation
      flyingSwords.push({
        mesh: sword,
        targetPosition: targetPos.clone(),
        targetRotation: targetRot.clone(),
        startPosition: new THREE.Vector3(),
        startRotation: new THREE.Euler(),
        delay: 0,
        duration: 0
      });
    };

    // --- SUB-ASSEMBLY 1: SEAT LAYER (overlapping swords flat on seat box) ---
    const seatCoreGeo = new THREE.BoxGeometry(1.2, 0.8, 1.2);
    const seatCore = new THREE.Mesh(seatCoreGeo, steelMaterial);
    seatCore.position.set(0, -0.2, 0);
    seatCore.receiveShadow = true;
    throneGroup.add(seatCore);

    for (let i = 0; i < 16; i++) {
      const sword = createRealisticSword(1.1, 0.06, 0.95);
      const targetPos = new THREE.Vector3(
        (Math.random() - 0.5) * 0.9,
        0.2,
        (Math.random() - 0.5) * 0.8 + 0.1
      );
      const targetRot = new THREE.Euler(
        Math.PI * 0.5 + (Math.random() - 0.5) * 0.15,
        (Math.random() - 0.5) * 0.2,
        Math.PI * 0.5 + (Math.random() - 0.5) * 0.3
      );
      registerSword(sword, targetPos, targetRot);
    }

    // --- SUB-ASSEMBLY 2: ARMRESTS & SIDES ---
    // Left Armrest
    for (let i = 0; i < 12; i++) {
      const sword = createRealisticSword(1.3, 0.07, 1.0);
      const targetPos = new THREE.Vector3(
        -0.75 - i * 0.02,
        0.35 + Math.sin(i * 0.2) * 0.05,
        0.2 - i * 0.06
      );
      const targetRot = new THREE.Euler(
        Math.PI * 0.4,
        -0.1,
        -0.2 - i * 0.08
      );
      registerSword(sword, targetPos, targetRot);
    }

    // Right Armrest
    for (let i = 0; i < 12; i++) {
      const sword = createRealisticSword(1.3, 0.07, 1.0);
      const targetPos = new THREE.Vector3(
        0.75 + i * 0.02,
        0.35 + Math.sin(i * 0.2) * 0.05,
        0.2 - i * 0.06
      );
      const targetRot = new THREE.Euler(
        Math.PI * 0.4,
        0.1,
        0.2 + i * 0.08
      );
      registerSword(sword, targetPos, targetRot);
    }

    // --- SUB-ASSEMBLY 3: BACKREST FAN (The iconic towering iron circle) ---
    // Inner back pad core support
    const backPadGeo = new THREE.BoxGeometry(0.8, 1.5, 0.2);
    const backPad = new THREE.Mesh(backPadGeo, steelMaterial);
    backPad.position.set(0, 0.8, -0.4);
    backPad.receiveShadow = true;
    throneGroup.add(backPad);

    const backFanCount = 65; // Massive heavy back swords fan!
    for (let i = 0; i < backFanCount; i++) {
      const sword = createRealisticSword(1.7 + Math.random() * 0.4, 0.075, 1.15);
      const angle = ((i - (backFanCount - 1) / 2) / (backFanCount - 1)) * (Math.PI * 0.72);
      
      const targetPos = new THREE.Vector3(
        Math.sin(angle) * 0.85,
        Math.cos(angle) * 0.85 + 0.65,
        -0.45 - i * 0.006 // Stagger in depth to avoid fighting
      );

      const targetRot = new THREE.Euler(
        -Math.PI * 0.08 + (Math.random() - 0.5) * 0.06,
        -angle * 0.2, // Curve outwards
        -angle * 0.85 // Fan outwards
      );

      registerSword(sword, targetPos, targetRot);
    }

    // --- SUB-ASSEMBLY 4: CHAOTIC ACCENT SWORDS (sticking out everywhere) ---
    const chaoticCount = 20;
    for (let i = 0; i < chaoticCount; i++) {
      const sword = createRealisticSword(1.5, 0.065, 1.0);
      const targetPos = new THREE.Vector3(
        (Math.random() - 0.5) * 0.8,
        Math.random() * 1.6 + 0.2,
        -0.2 + (Math.random() - 0.5) * 0.2
      );
      const targetRot = new THREE.Euler(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 2.2
      );
      registerSword(sword, targetPos, targetRot);
    }

    // 6. Assemble / Fly-in Physics Initializer Function
    let assemblyStartTime = 0;
    const animateDuration = 1.6; // Speed of each sword's landing

    const resetAssembly = () => {
      assemblyStartTime = clock.getElapsedTime();
      
      flyingSwords.forEach((item, index) => {
        // Stagger the delay so swords cascade into place beautifully
        item.delay = index * 0.015; // wave effect
        item.duration = animateDuration;

        // Set random far off-screen start position
        const angle = Math.random() * Math.PI * 2;
        const dist = 14 + Math.random() * 10;
        
        // Let them fly in from a dome-like hemisphere above and around the screen
        item.startPosition.set(
          Math.sin(angle) * dist,
          5 + Math.random() * 15,
          Math.cos(angle) * dist
        );

        // Heavy dramatic chaotic start rotation
        item.startRotation.set(
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4
        );

        // Initially position them far away
        item.mesh.position.copy(item.startPosition);
        item.mesh.rotation.copy(item.startRotation);
      });

      setLoading(false);
    };

    // Attach function to ref so UI triggers can call it
    triggerAssemblyRef.current = resetAssembly;

    // 7. Mouse Interact Parallax Tilt
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationY = x * 0.35; // yaw
      targetRotationX = -y * 0.15 + 0.08; // pitch
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Engine
    const clock = new THREE.Clock();
    
    // Trigger initial assembly on mount
    resetAssembly();

    // Cubic ease out function
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const assemblyTime = elapsedTime - assemblyStartTime;

      // Smoothly interpolate mouse rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.04;
      currentRotationY += (targetRotationY - currentRotationY) * 0.04;

      throneGroup.rotation.x = currentRotationX;
      throneGroup.rotation.y = currentRotationY + elapsedTime * 0.045; // Slow constant rotation

      // 9. Update each sword's flight progress
      let activeFlyingCount = 0;
      let totalCompleted = 0;

      flyingSwords.forEach((item) => {
        if (assemblyTime < item.delay) {
          // Hasn't started flying yet, keep at start position
          item.mesh.position.copy(item.startPosition);
          item.mesh.rotation.copy(item.startRotation);
          activeFlyingCount++;
        } else if (assemblyTime >= item.delay && assemblyTime < item.delay + item.duration) {
          // Actively flying
          const ratio = (assemblyTime - item.delay) / item.duration;
          const easeRatio = easeOutCubic(ratio);

          // Linear lerp position
          item.mesh.position.lerpVectors(item.startPosition, item.targetPosition, easeRatio);

          // Smooth lerp Euler angles
          item.mesh.rotation.x = THREE.MathUtils.lerp(item.startRotation.x, item.targetRotation.x, easeRatio);
          item.mesh.rotation.y = THREE.MathUtils.lerp(item.startRotation.y, item.targetRotation.y, easeRatio);
          item.mesh.rotation.z = THREE.MathUtils.lerp(item.startRotation.z, item.targetRotation.z, easeRatio);
          activeFlyingCount++;
        } else {
          // Completed flight, locked in place
          item.mesh.position.copy(item.targetPosition);
          item.mesh.rotation.copy(item.targetRotation);
          totalCompleted++;
        }
      });

      // Update state for UI visual feedback bar
      const progressPercent = Math.min(100, Math.floor((totalCompleted / flyingSwords.length) * 100));
      setAssemblyProgress(progressPercent);

      // Lights Pulsing
      fireLight.intensity = 15 + Math.sin(elapsedTime * 4.5) * 4;
      glowMaterial.emissiveIntensity = 3.0 + Math.sin(elapsedTime * 4.5) * 0.8;
      spotLight.intensity = 10 + Math.cos(elapsedTime * 1.5) * 1.5;

      // Dynamic cinematic camera slide on initial assembly
      if (assemblyTime < 4) {
        camera.position.z = 8.5 + (4 - assemblyTime) * 0.6;
        camera.position.y = 2.3 + (4 - assemblyTime) * 0.1;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Handle Window resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup resources
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
      steelMaterial.dispose();
      brassMaterial.dispose();
      hiltMaterial.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return (
    <div 
      className="throne-scene-container"
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Assembly HUD panel */}
      <div className="assembly-hud-overlay glass-card">
        <div className="hud-metric">
          <span className="hud-label">Throne Synthesis</span>
          <span className="hud-val">{assemblyProgress}%</span>
        </div>
        <div className="hud-progress-track">
          <div className="hud-progress-fill" style={{ width: `${assemblyProgress}%` }} />
        </div>
        
        {assemblyProgress === 100 ? (
          <button className="btn-gold reassemble-btn" onClick={triggerReassemble}>
            ⚡ Re-Forge Throne
          </button>
        ) : (
          <div className="synthesis-hint">⚔️ Staggering sword vectors...</div>
        )}
      </div>

      <style>{`
        .throne-scene-container {
          background: radial-gradient(circle, rgba(16,16,22,0.4) 0%, rgba(5,5,8,0.9) 100%);
        }

        .assembly-hud-overlay {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(5, 5, 8, 0.85) !important;
          border: 1px solid var(--border-gold) !important;
          border-radius: 8px;
          padding: 1rem 1.5rem !important;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
          pointer-events: auto;
          transition: var(--transition-smooth);
        }

        .hud-metric {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-title);
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hud-label {
          color: var(--text-secondary);
        }

        .hud-val {
          color: var(--gold);
          font-weight: 900;
          text-shadow: 0 0 5px var(--gold-glow);
        }

        .hud-progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
          border: 0.5px solid rgba(255,255,255,0.05);
        }

        .hud-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--red), var(--gold));
          box-shadow: 0 0 8px var(--gold-glow);
          transition: width 0.1s linear;
        }

        .reassemble-btn {
          font-size: 0.65rem;
          padding: 0.4rem 0.8rem;
          align-self: center;
          margin-top: 0.2rem;
        }

        .synthesis-hint {
          font-family: var(--font-title);
          font-size: 0.6rem;
          color: var(--text-dim);
          letter-spacing: 1px;
          text-align: center;
          text-transform: uppercase;
          animation: pulseFade 1.5s infinite alternate;
        }

        @keyframes pulseFade {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
