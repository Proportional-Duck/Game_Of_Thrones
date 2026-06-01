import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const REGIONS = [
  {
    id: 'north',
    name: 'The North (Winterfell)',
    house: 'House Stark',
    color: 0x4a9eca, // Ice blue
    coords: { lat: 40, lon: -20 },
    words: 'Winter is Coming',
    desc: 'The largest region in Westeros, defined by its freezing cold climate, vast pine forests, and resilient, honorable people. Ruled by House Stark for thousands of years from the ancient fortress of Winterfell.',
    climate: 'Sub-zero temperatures, dense snowy forests, protected by the giant ice Wall in the far North.',
    sigil: '🐺 Direwolf'
  },
  {
    id: 'westerlands',
    name: 'The Westerlands (Casterly Rock)',
    house: 'House Lannister',
    color: 0xd4af37, // Gold
    coords: { lat: 10, lon: -50 },
    words: 'Hear Me Roar!',
    desc: 'A wealthy region rich in gold mines, rocky hills, and strong fortresses. Ruled by the ambitious and powerful House Lannister. Their wealth buys them immense political power in King\'s Landing.',
    climate: 'Temperate hills, rich coastlines, and impregnable cliffs.',
    sigil: '🦁 Golden Lion'
  },
  {
    id: 'crownlands',
    name: 'The Crownlands (King\'s Landing)',
    house: 'House Targaryen / Baratheon',
    color: 0xa31d1d, // Blood red
    coords: { lat: 5, lon: -10 },
    words: 'Fire and Blood',
    desc: 'The political center of Westeros. Home to the legendary Iron Throne, Red Keep, and the capital city, King\'s Landing. It was built by Aegon the Conqueror after he unified the Seven Kingdoms using dragons.',
    climate: 'Coastal sea breezes, dense city slums (Flea Bottom), and royal ports.',
    sigil: '🐉 Three-headed Dragon'
  },
  {
    id: 'reach',
    name: 'The Reach (Highgarden)',
    house: 'House Tyrell',
    color: 0x27ae60, // Emerald Green
    coords: { lat: -15, lon: -40 },
    words: 'Growing Strong',
    desc: 'The most fertile region in Westeros, supplying food, grains, and flowers to the rest of the realm. Famous for chivalry, knights, and beautiful gardens. Ruled by the clever and wealthy House Tyrell.',
    climate: 'Warm, sunny, highly productive farmlands and flower valleys.',
    sigil: '🌹 Golden Rose'
  },
  {
    id: 'dorne',
    name: 'Dorne (Sunspear)',
    house: 'House Martell',
    color: 0xe67e22, // Sun orange
    coords: { lat: -35, lon: -15 },
    words: 'Unbowed, Unbent, Unbroken',
    desc: 'A dry, hot desert region in the far south with unique Dornish culture and customs. Known for their fierce independence, they were the only kingdom that resisted Aegon\'s dragons and joined through marriage.',
    climate: 'Arid deserts, red mountain passes, warm oasis springs.',
    sigil: '☀️ Spear piercing a Red Sun'
  },
  {
    id: 'iron_islands',
    name: 'The Iron Islands (Pyke)',
    house: 'House Greyjoy',
    color: 0x7f8c8d, // Iron grey
    coords: { lat: 20, lon: -60 },
    words: 'We Do Not Sow',
    desc: 'A cluster of cold, stormy, barren islands off the western coast. The inhabitants, called Ironborn, are fierce sailors, raiders, and worship the Drowned God. Ruled by House Greyjoy.',
    climate: 'Stormy seas, rocky shores, cold damp salt air.',
    sigil: '🦑 Golden Kraken'
  }
];

// Helper to convert lat/lon to 3D cartesian coordinates on a sphere of radius R
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

export default function WesterosGlobe({ onRegionSelect }) {
  const containerRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  useEffect(() => {
    onRegionSelect(selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 15);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    const blueRimLight = new THREE.PointLight(0x4a9eca, 2.5, 10);
    blueRimLight.position.set(-5, -2, -5);
    scene.add(blueRimLight);

    // 3. Globe creation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 2.2;

    // A wireframe glowing sphere for stylized look
    const sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x12121a,
      transparent: true,
      opacity: 0.6,
    });
    const baseSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(baseSphere);

    // Add gold gridlines
    const gridGeo = new THREE.SphereGeometry(radius, 16, 16);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const gridSphere = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(gridSphere);

    // Dynamic latitude/longitude rings
    const ringGeo = new THREE.RingGeometry(radius, radius + 0.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    globeGroup.add(ring);

    // 4. Region Pins
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const pinGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const pins = [];

    REGIONS.forEach((region) => {
      const position = latLonToVector3(region.coords.lat, region.coords.lon, radius + 0.04);
      
      const pinMaterial = new THREE.MeshStandardMaterial({
        color: region.color,
        emissive: region.color,
        emissiveIntensity: 1.5,
        roughness: 0.1,
      });

      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      pin.position.copy(position);
      pin.userData = { regionData: region };
      pinGroup.add(pin);
      pins.push(pin);

      // Add a small aura ring around the pin
      const auraGeo = new THREE.RingGeometry(0.12, 0.18, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: region.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.position.copy(position);
      // Make aura look outwards from center
      aura.lookAt(new THREE.Vector3(0, 0, 0));
      aura.rotation.y += Math.PI;
      pinGroup.add(aura);
      pin.userData.aura = aura; // reference to animate
    });

    // 5. Interactivity with Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredPin = null;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pins);

      if (intersects.length > 0) {
        const pin = intersects[0].object;
        setSelectedRegion(pin.userData.regionData);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // 6. Animation Loop
    let lastTime = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Auto-rotation of the globe when not hovering/interacting
      globeGroup.rotation.y = elapsedTime * 0.05;
      globeGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.08;

      // Pulse the aura rings of the pins
      pins.forEach((pin) => {
        if (pin.userData.aura) {
          const scale = 1 + Math.sin(elapsedTime * 5 + pin.position.x) * 0.2;
          pin.userData.aura.scale.set(scale, scale, 1);
        }
      });

      // Handle Raycaster Hovering
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pins);

      if (intersects.length > 0) {
        const pin = intersects[0].object;
        if (hoveredPin !== pin) {
          if (hoveredPin) {
            hoveredPin.scale.set(1, 1, 1);
            hoveredPin.material.emissiveIntensity = 1.5;
          }
          hoveredPin = pin;
          container.style.cursor = 'pointer';
        }
        // Hover effect
        pin.scale.set(1.4, 1.4, 1.4);
        pin.material.emissiveIntensity = 3.0;
      } else {
        if (hoveredPin) {
          hoveredPin.scale.set(1, 1, 1);
          hoveredPin.material.emissiveIntensity = 1.5;
          hoveredPin = null;
          container.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="westeros-globe-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div className="globe-overlay-hint">
        ⚔️ Click glowing pins to reveal House Lore
      </div>
      <style>{`
        .westeros-globe-container {
          position: relative;
        }
        .globe-overlay-hint {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(5, 5, 8, 0.85);
          border: 1px solid var(--gold);
          padding: 6px 16px;
          border-radius: 20px;
          font-family: var(--font-title);
          font-size: 0.8rem;
          color: var(--gold);
          pointer-events: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          text-align: center;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
export { REGIONS };
