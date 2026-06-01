import React, { useEffect, useRef } from 'react';

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Classes
    class SnowParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Drift wind
        this.speedX += (Math.random() - 0.5) * 0.05;
        this.speedX = Math.max(-0.6, Math.min(0.6, this.speedX));

        if (this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 210, 240, ${this.opacity})`;
        ctx.fill();
      }
    }

    class EmberParticle {
      constructor() {
        this.reset();
        // Start scattered at different heights initially
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 1.2 + 0.4);
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.hue = Math.random() * 25 + 10; // Orange-red embers
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Sway back and forth
        this.speedX += (Math.random() - 0.5) * 0.08;
        this.speedX = Math.max(-1, Math.min(1, this.speedX));

        // Fade out as it goes up
        const lifeRatio = this.y / canvas.height;
        this.currentOpacity = this.opacity * Math.min(1, lifeRatio * 1.5);

        if (this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 85%, 55%, ${this.currentOpacity})`;
        ctx.shadowColor = `hsla(${this.hue}, 85%, 55%, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for other draws
      }
    }

    const particles = [];
    const maxSnow = 120;
    const maxEmbers = 80;

    for (let i = 0; i < maxSnow; i++) {
      particles.push(new SnowParticle());
    }
    for (let i = 0; i < maxEmbers; i++) {
      particles.push(new EmberParticle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
