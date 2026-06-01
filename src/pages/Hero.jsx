import React from 'react';
import IronThrone from '../components/3d/IronThrone';

export default function Hero({ setActivePage }) {
  return (
    <div className="hero-page-container">
      <div className="hero-content">
        <h1 className="hero-title animate-title">
          The World of <br />
          <span className="gold-text">Westeros</span>
        </h1>
        <p className="hero-subtitle">
          Every secret. Every war. Every betrayal. <br />
          <strong>Understand Game of Thrones completely — without watching a single episode.</strong>
        </p>

        <div className="hero-cta-group">
          <button className="btn-gold" onClick={() => setActivePage('map')}>
            ⚔️ Enter Westeros Map
          </button>
          <button className="btn-gold secondary-btn" onClick={() => setActivePage('timeline')}>
            📜 Read the Chronicle
          </button>
        </div>

        <div className="quick-guide-glass glass-card">
          <h3>Why use this guide?</h3>
          <p>
            Game of Thrones is a massive, complex epic filled with hundreds of characters, complex histories, and hidden motivations. 
            This guide is designed as an interactive 3D companion to give you all the knowledge, lore, and drama of the Seven Kingdoms 
            in under 10 minutes. Click the tabs above to explore the interactive 3D Westeros Map, study the Great Houses, browse the Character Encyclopedia, or trace the entire timeline.
          </p>
        </div>
      </div>

      <div className="throne-canvas-wrapper">
        <IronThrone />
      </div>

      <style>{`
        .hero-page-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: calc(100vh - 80px);
          padding: 2rem 4rem;
          gap: 3rem;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.8rem;
          max-width: 650px;
          text-align: left;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          letter-spacing: 3px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .hero-subtitle strong {
          color: var(--gold);
          font-weight: 600;
        }

        .hero-cta-group {
          display: flex;
          gap: 1.5rem;
        }

        .secondary-btn {
          border-color: var(--text-secondary);
          color: var(--text-secondary);
        }

        .secondary-btn:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
          border-color: var(--text-primary);
          box-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .quick-guide-glass {
          padding: 1.5rem;
          border-color: var(--border-dim);
          background: rgba(16, 16, 22, 0.45);
        }

        .quick-guide-glass h3 {
          color: var(--gold);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .quick-guide-glass p {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .throne-canvas-wrapper {
          flex: 1.5;
          height: 70vh;
          min-height: 450px;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%);
        }

        /* Title Animation */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-title {
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 1024px) {
          .hero-page-container {
            flex-direction: column-reverse;
            padding: 2rem;
            text-align: center;
          }

          .hero-content {
            text-align: center;
            align-items: center;
            max-width: 100%;
          }

          .throne-canvas-wrapper {
            width: 100%;
            height: 50vh;
            min-height: 350px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-cta-group {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
