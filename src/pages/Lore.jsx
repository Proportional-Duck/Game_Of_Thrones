import React, { useState, useEffect, useRef } from 'react';

const LORE_DATA = [
  {
    id: 'dragons',
    title: 'Dragons & Magic',
    subtitle: 'Living weapons of fire and blood.',
    icon: '🐉',
    details: 'Dragons are magical, fire-breathing reptilian beasts with massive wings. They are intrinsically tied to magic in the world — when dragons die out, magic fades; when dragons hatch, magic returns. They were discovered in volcanic lands by ancient Valyrians, who used magical horns to bond with them. The Targaryens were the only noble family to survive Valyria\'s collapse, bringing their dragons to Westeros to conquer the Seven Kingdoms.',
    secrets: [
      'They never stop growing as long as they are free and have food.',
      'They are immune to ordinary fire and heat.',
      'Only those with ancient Valyrian blood (Targaryens) can ride them.'
    ]
  },
  {
    id: 'white_walkers',
    title: 'The White Walkers',
    subtitle: 'The ancient winter nightmare.',
    icon: '❄️',
    details: 'The White Walkers (also called the Others) are a magical race of ice-creatures. Thousands of years ago, they were created by the Children of the Forest (native magical forest spirits) by plunging a dragonglass blade into a human\'s heart, intending to use them as weapons to defeat early human invaders. However, the Walkers turned on their creators and sought to freeze the entire world in an eternal night.',
    secrets: [
      'They can raise any dead human or animal as a mindless zombie "wight".',
      'They can only be killed by Dragonglass (obsidian) or Valyrian Steel.',
      'Their leader, the Night King, was killed by Arya Stark, instantly shattering all his followers.'
    ]
  },
  {
    id: 'wall',
    title: 'The Ice Wall',
    subtitle: '700 feet of ice, magic, and sworn brothers.',
    icon: '🏰',
    details: 'The Wall is a colossal fortification stretching 300 miles across the northern border of Westeros, standing 700 feet tall. It was built 8,000 years ago by Bran the Builder (ancestor of the Starks) after the first war with the White Walkers, infused with ancient magic to prevent the dead from passing. It is guarded by the Night\'s Watch, an order of sworn brothers who wear black, swear off marriage, and defend the realms of men.',
    secrets: [
      'Sworn brothers of the Night\'s Watch are called "Crows" or "Men in Black".',
      'It is comprised of 19 castles, though only 3 are actively manned by the time of the show.',
      'It is completely melted down in the final season by a dead dragon breathing blue fire.'
    ]
  },
  {
    id: 'throne',
    title: 'The Iron Throne',
    subtitle: 'Forged in fire, coveted by all.',
    icon: '👑',
    details: 'The ultimate seat of power in Westeros. It was constructed by the first Targaryen King, Aegon the Conqueror. He collected 1,000 swords surrendered by his defeated enemies and melted them down using the fire of his colossal dragon, Balerion the Black Dread. It is deliberately sharp, uncomfortable, and dangerous to sit on — a reminder that a ruler should never sit easily on power.',
    secrets: [
      'Countless rulers are cut by the throne\'s blades, seen as a sign of unworthiness.',
      'It represents the absolute unification of the Seven Kingdoms.',
      'It is melted down into slag by the dragon Drogon in the final episode.'
    ]
  }
];

export default function Lore() {
  const [activeTab, setActiveTab] = useState('dragons');
  const flameCanvasRef = useRef(null);
  const [breathType, setBreathType] = useState('fire'); // 'fire' or 'ice'

  // Dynamic particle flame simulator
  useEffect(() => {
    const canvas = flameCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 150;
    };
    resize();
    window.addEventListener('resize', resize);

    class FlameParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 20;
        this.size = Math.random() * 12 + 6;
        this.speedY = -(Math.random() * 2 + 1);
        this.speedX = (Math.random() - 0.5) * 4;
        this.life = 1.0;
        this.decay = Math.random() * 0.03 + 0.015;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
        this.size = Math.max(0, this.size - 0.1);

        if (this.life <= 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (breathType === 'fire') {
          // Fiery colors (orange, red, yellow)
          const r = 230;
          const g = Math.floor(100 * this.life + 30);
          const b = 20;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.life})`;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
        } else {
          // Icy colors (blue, cyan, white)
          const r = 60;
          const g = Math.floor(160 * this.life + 80);
          const b = 250;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.life})`;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
        }
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles = Array.from({ length: 45 }, () => new FlameParticle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dragon skull or emblem placeholder in center background
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.fillText(breathType === 'fire' ? '🐉' : '❄️', canvas.width / 2, canvas.height - 35);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [breathType]);

  const activeData = LORE_DATA.find((item) => item.id === activeTab);

  return (
    <div className="lore-page container section">
      <h2>The Lore Vault</h2>
      <p className="lore-intro">
        Uncover the mystical elements, colossal structures, and legendary artifacts that govern the fantasy physics and myths of Game of Thrones.
      </p>

      {/* Simulator Card */}
      <div className="simulator-card glass-card">
        <h3>Dragon Breath Visualizer</h3>
        <p className="sim-sub">Procedural elemental simulation. Choose the force to breathe:</p>
        <div className="sim-buttons">
          <button 
            className={`btn-gold sim-btn ${breathType === 'fire' ? 'active-fire' : ''}`}
            onClick={() => setBreathType('fire')}
          >
            🔥 Fire Breath (Drogon)
          </button>
          <button 
            className={`btn-gold sim-btn ice-btn ${breathType === 'ice' ? 'active-ice' : ''}`}
            onClick={() => setBreathType('ice')}
          >
            ❄️ Ice Breath (Viserion)
          </button>
        </div>
        <div className="canvas-holder">
          <canvas ref={flameCanvasRef} />
        </div>
      </div>

      <div className="lore-split-grid">
        {/* Tab Buttons */}
        <div className="lore-tabs">
          {LORE_DATA.map((item) => (
            <button
              key={item.id}
              className={`lore-tab-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="tab-icon">{item.icon}</span>
              <div className="tab-headings">
                <span className="tab-title">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="lore-content-panel glass-card">
          {activeData && (
            <div className="lore-info-card animate-fade-in">
              <div className="lore-info-header">
                <span className="info-icon">{activeData.icon}</span>
                <div>
                  <h3>{activeData.title}</h3>
                  <p className="info-subtitle">{activeData.subtitle}</p>
                </div>
              </div>

              <div className="lore-info-body">
                <p className="lore-full-text">{activeData.details}</p>
                
                <div className="secrets-vault">
                  <h4>💡 CRITICAL KNOWLEDGE POINTS:</h4>
                  <ul>
                    {activeData.secrets.map((secret, idx) => (
                      <li key={idx}>⚔️ {secret}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .lore-intro {
          text-align: center;
          max-width: 700px;
          margin: -1.5rem auto 3rem;
          color: var(--text-secondary);
        }

        .simulator-card {
          margin-bottom: 3rem;
          text-align: center;
          padding: 2rem;
          background: rgba(10, 10, 15, 0.7);
        }

        .simulator-card h3 {
          font-size: 1.3rem;
          color: var(--gold);
        }

        .sim-sub {
          font-size: 0.9rem;
          color: var(--text-dim);
          margin-bottom: 1rem;
        }

        .sim-buttons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .sim-btn {
          font-size: 0.75rem;
          padding: 0.5rem 1.2rem;
        }

        .active-fire {
          background: var(--orange) !important;
          color: var(--bg-dark) !important;
          border-color: var(--orange) !important;
          box-shadow: 0 0 15px var(--orange-glow) !important;
        }

        .ice-btn {
          border-color: var(--blue);
          color: var(--blue);
        }

        .ice-btn:hover {
          background: rgba(61, 133, 198, 0.1);
        }

        .active-ice {
          background: var(--blue) !important;
          color: var(--bg-dark) !important;
          border-color: var(--blue) !important;
          box-shadow: 0 0 15px var(--blue-glow) !important;
        }

        .canvas-holder {
          background: rgba(5,5,8,0.5);
          border-radius: 6px;
          border: 1px solid var(--border-dim);
          overflow: hidden;
          margin-top: 1rem;
        }

        .lore-split-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2.5rem;
          align-items: start;
        }

        .lore-tabs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .lore-tab-btn {
          background: rgba(16, 16, 22, 0.6);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
          text-align: left;
        }

        .tab-icon {
          font-size: 2rem;
        }

        .tab-headings {
          display: flex;
          flex-direction: column;
        }

        .tab-title {
          font-family: var(--font-title);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 1px;
        }

        .lore-tab-btn:hover, .lore-tab-btn.active {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 15px var(--gold-glow);
          transform: translateX(5px);
        }

        .lore-tab-btn.active .tab-title {
          color: var(--gold);
        }

        .lore-content-panel {
          min-height: 400px;
          padding: 3rem;
          background-image: linear-gradient(rgba(16,16,22,0.9), rgba(10,10,15,0.95));
        }

        .lore-info-card {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .lore-info-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border-gold);
          padding-bottom: 1.5rem;
        }

        .info-icon {
          font-size: 3rem;
        }

        .info-subtitle {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--gold);
        }

        .lore-full-text {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .secrets-vault {
          margin-top: 1.8rem;
          background: rgba(212, 175, 55, 0.03);
          border: 1px dashed var(--gold-dim);
          border-radius: 6px;
          padding: 1.5rem;
        }

        .secrets-vault h4 {
          font-size: 0.75rem;
          color: var(--gold);
          letter-spacing: 2px;
          margin-bottom: 0.8rem;
        }

        .secrets-vault ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .secrets-vault li {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }

        @media (max-width: 900px) {
          .lore-split-grid {
            grid-template-columns: 1fr;
          }
          
          .lore-content-panel {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
