import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function IntroSequence({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [phaseText, setPhaseText] = useState('THE DRAGON AWAKENS');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle class for the realistic firestorm
    class FireStormParticle {
      constructor(isBlast = false) {
        this.reset(isBlast);
        if (!isBlast) {
          // Scatter initially
          this.y = Math.random() * canvas.height;
        }
      }

      reset(isBlast) {
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 50;
        this.y = canvas.height * 0.45 + (Math.random() - 0.5) * 30; // Dragon's mouth position
        
        if (isBlast) {
          // Massive outward blast directly towards screen
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 15 + 8;
          this.vx = Math.sin(angle) * speed;
          this.vy = Math.cos(angle) * speed;
          this.size = Math.random() * 30 + 15;
          this.maxSize = Math.random() * 250 + 120; // Grow massive to cover screen!
        } else {
          // Slow trickle pre-blast
          this.vx = (Math.random() - 0.5) * 3;
          this.vy = (Math.random() - 0.5) * 3 - 2;
          this.size = Math.random() * 10 + 5;
          this.maxSize = Math.random() * 60 + 30;
        }

        this.life = 1.0;
        this.decay = Math.random() * 0.015 + 0.008;
        
        // Color hue (red to golden-yellow)
        this.hue = Math.random() * 25 + 5; 
      }

      update(isBlast) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (isBlast) {
          // Expand rapidly to engulf camera
          this.size += 6.5;
          this.vx *= 1.02;
          this.vy *= 1.02;
        } else {
          this.size += 0.8;
        }

        this.life -= this.decay;
      }

      draw() {
        if (this.size <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Flame glow color shifting
        let alpha = this.life;
        let r = 255;
        let g = Math.floor(180 * this.life + 30);
        let b = Math.floor(50 * this.life);

        if (this.life < 0.3) {
          // Fade to ash grey
          r = g = b = Math.floor(100 * this.life);
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.7)`;
        ctx.shadowBlur = this.size * 0.6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const particles = [];
    let stateTime = 0;
    const clock = new THREE.Clock();
    let screenShake = 0;

    // Animation phases
    // Phase 0: 0s - 1.8s -> Dragon Silhouette + Growling screen shake
    // Phase 1: 1.8s - 2.8s -> Fire Charges in mouth (small spark leaks)
    // Phase 2: 2.8s - 4.5s -> Massive full blast! Fire engulfs screen
    // Phase 3: 4.5s -> Trigger complete transition (fade out overlay)

    const animate = () => {
      const dt = clock.getDelta();
      stateTime += dt;

      // Apply screen shake
      let shakeX = 0;
      let shakeY = 0;
      if (screenShake > 0) {
        shakeX = (Math.random() - 0.5) * screenShake;
        shakeY = (Math.random() - 0.5) * screenShake;
        screenShake = Math.max(0, screenShake - 0.5);
      }

      // Draw background
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Phase-specific logic
      if (stateTime < 1.8) {
        // --- PHASE 0: THE SILHOUETTE ---
        setPhaseText('A DRAGON IS AWAKENING...');
        screenShake = 3;

        // Draw terrifying dragon eyes in the dark
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 - 80, canvas.height * 0.44, 25, 8, Math.PI / 12, 0, Math.PI * 2);
        ctx.ellipse(canvas.width / 2 + 80, canvas.height * 0.44, 25, 8, -Math.PI / 12, 0, Math.PI * 2);
        ctx.fillStyle = '#ff3300';
        ctx.shadowColor = '#ff3300';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Glowing dragon horn outlines
        ctx.strokeStyle = 'rgba(255, 60, 0, 0.08)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        // Left Horn
        ctx.moveTo(canvas.width / 2 - 40, canvas.height * 0.4);
        ctx.quadraticCurveTo(canvas.width / 2 - 160, canvas.height * 0.28, canvas.width / 2 - 200, canvas.height * 0.2);
        // Right Horn
        ctx.moveTo(canvas.width / 2 + 40, canvas.height * 0.4);
        ctx.quadraticCurveTo(canvas.width / 2 + 160, canvas.height * 0.28, canvas.width / 2 + 200, canvas.height * 0.2);
        ctx.stroke();

      } else if (stateTime >= 1.8 && stateTime < 2.8) {
        // --- PHASE 1: CHARGING THE FLAME ---
        setPhaseText('PREPARING THE DRAGON BREATH...');
        screenShake = 8;

        // Massive white-hot glowing mouth charge
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height * 0.46, 50, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffbb00';
        ctx.shadowBlur = 80;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Leak tiny charge sparks
        if (particles.length < 50) {
          particles.push(new FireStormParticle(false));
        }

      } else if (stateTime >= 2.8 && stateTime < 4.5) {
        // --- PHASE 2: FULL FIRESTORM SCREEN BLAST ---
        setPhaseText('FIRE AND BLOOD!');
        screenShake = 25; // Massive continuous shake

        // Flood the canvas with blast particles
        for (let i = 0; i < 8; i++) {
          particles.push(new FireStormParticle(true));
        }

        // Draw solid bright fire core expanding from center
        const firestormProgress = (stateTime - 2.8) / 1.7; // 0 to 1
        const fireRad = Math.min(canvas.width * 1.5, firestormProgress * canvas.width * 1.6);
        
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height * 0.46, fireRad, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height * 0.46, 10,
          canvas.width / 2, canvas.height * 0.46, fireRad
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, '#ffcc00');
        grad.addColorStop(0.5, '#e65c00');
        grad.addColorStop(0.8, '#a31d1d');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

      } else if (stateTime >= 4.5) {
        // --- PHASE 3: TOTAL BLINDING WHITEOUT & TRANSITION ---
        setPhaseText('ENTER WESTEROS');
        
        // Draw total solid flame coverage
        ctx.fillStyle = '#ffaa33';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Trigger parent fade out coordinator
        if (!isFadingOut) {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 1200); // 1.2s fade-out duration
        }
      }

      // Update and draw floating particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(stateTime >= 2.8);
        p.draw();
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    clock.start();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFadingOut, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`intro-sequence-viewport ${isFadingOut ? 'fade-out-intro' : ''}`}
    >
      <canvas ref={canvasRef} className="intro-canvas" />
      
      {/* Dynamic cinematic captions */}
      <div className="intro-hud">
        <div className="medieval-runes">𝔙𝔞𝔩𝔞𝔯 𝔐𝔬𝔯𝔤𝔥𝔲𝔩𝔦𝔰</div>
        <h2 className="intro-subtitle-hud">{phaseText}</h2>
      </div>

      <style>{`
        .intro-sequence-viewport {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10000; /* Overrides everything */
          overflow: hidden;
          background: #030305;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 1.2s ease-in-out;
        }

        .fade-out-intro {
          opacity: 0;
          pointer-events: none;
        }

        .intro-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .intro-hud {
          position: absolute;
          bottom: 12%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          pointer-events: none;
          text-align: center;
        }

        .medieval-runes {
          font-family: var(--font-title);
          font-size: 1.4rem;
          color: var(--gold);
          letter-spacing: 4px;
          text-shadow: 0 0 10px var(--gold-glow);
          opacity: 0.7;
          animation: glowPulse 2s infinite alternate;
        }

        .intro-subtitle-hud {
          font-family: var(--font-title);
          font-size: 1.5rem;
          color: var(--text-primary);
          letter-spacing: 5px;
          text-transform: uppercase;
          text-shadow: 0 0 12px rgba(255, 60, 0, 0.6);
        }

        @keyframes glowPulse {
          0% { text-shadow: 0 0 5px var(--gold-glow); opacity: 0.5; }
          100% { text-shadow: 0 0 15px var(--gold-glow); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
