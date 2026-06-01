import React, { useState } from 'react';
import Navbar from './components/ui/Navbar';
import ParticleField from './components/3d/ParticleField';
import IntroSequence from './components/ui/IntroSequence';
import Hero from './pages/Hero';
import Map from './pages/Map';
import Houses from './pages/Houses';
import Characters from './pages/Characters';
import Timeline from './pages/Timeline';
import Lore from './pages/Lore';

function App() {
  const [activePage, setActivePage] = useState('hero');
  const [showIntro, setShowIntro] = useState(true);

  // Render the selected page dynamically
  const renderPage = () => {
    switch (activePage) {
      case 'hero':
        return <Hero setActivePage={setActivePage} />;
      case 'map':
        return <Map />;
      case 'houses':
        return <Houses />;
      case 'characters':
        return <Characters />;
      case 'timeline':
        return <Timeline />;
      case 'lore':
        return <Lore />;
      default:
        return <Hero setActivePage={setActivePage} />;
    }
  };

  return (
    <>
      {/* Cinematic Dragon Fire intro overlay */}
      {showIntro && (
        <IntroSequence onComplete={() => setShowIntro(false)} />
      )}

      {/* 3D background particle system (rising fire and falling ice snow) */}
      <ParticleField />

      {/* Main glass nav bar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content viewport */}
      <main className="main-viewport animate-fade-in">
        {renderPage()}
      </main>

      {/* Medieval Styled Footer */}
      <footer className="footer-container">
        <div className="footer-decoration">
          <span className="decoration-line"></span>
          <span className="decoration-sword">⚔️</span>
          <span className="decoration-line"></span>
        </div>
        <p className="footer-copyright">
          Valar Morghulis • All Men Must Die • Forged for newbies & fans alike
        </p>
      </footer>

      <style>{`
        .main-viewport {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
        }

        .footer-container {
          padding: 2.5rem 1rem;
          background: rgba(5, 5, 8, 0.9);
          border-top: 1px solid var(--border-gold);
          text-align: center;
          position: relative;
          z-index: 10;
          margin-top: auto;
        }

        .footer-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 0.8rem;
        }

        .decoration-line {
          height: 1px;
          width: 80px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .decoration-sword {
          font-size: 0.95rem;
          filter: drop-shadow(0 0 4px var(--gold-glow));
        }

        .footer-copyright {
          font-family: var(--font-title);
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        @keyframes pageFadeIn {
          from {
            opacity: 0;
            transform: scale(0.99);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: pageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}

export default App;
