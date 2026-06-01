import React from 'react';

export default function Navbar({ activePage, setActivePage }) {
  const menuItems = [
    { id: 'hero', label: 'Throne Room' },
    { id: 'map', label: 'Westeros Map' },
    { id: 'houses', label: 'Great Houses' },
    { id: 'characters', label: 'Encyclopedia' },
    { id: 'timeline', label: 'Chronicle' },
    { id: 'lore', label: 'Lore Vault' },
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-brand" onClick={() => setActivePage('hero')}>
        <svg viewBox="0 0 512 512" className="brand-emblem">
          <g>
            <path d="M120 180 C80 140, 40 240, 70 320 C100 290, 140 280, 160 300 C130 260, 120 220, 120 180 Z" fill="#7a1212" opacity="0.6"/>
            <path d="M280 120 C380 60, 460 220, 420 360 C380 300, 310 320, 270 360 C320 280, 310 180, 280 120 Z" fill="var(--gold)"/>
            <path d="M160 420 C180 340, 210 240, 180 180 C190 200, 240 220, 260 300 C270 350, 290 400, 320 440 C250 460, 180 450, 160 420 Z" fill="#a31d1d" />
            <path d="M180 180 C170 140, 190 100, 230 80 C240 75, 255 70, 265 85 C250 90, 240 105, 245 120 C255 110, 275 105, 290 115 C295 120, 280 130, 270 135 C285 140, 305 145, 300 160 C290 165, 275 160, 260 160 C275 175, 265 190, 250 195 C235 200, 200 200, 180 180 Z" fill="var(--gold)" />
            <path d="M220 85 C210 50, 180 30, 150 25 C175 40, 195 65, 210 82 Z" fill="#ffd700" />
            <circle cx="225" cy="115" r="8" fill="#ffffff" />
            <circle cx="225" cy="115" r="14" fill="none" stroke="#ff5500" stroke-width="2" />
            <path d="M285 145 L340 135 M275 155 L350 165" stroke="#ffd700" stroke-width="6" stroke-linecap="round" />
          </g>
        </svg>
        <span className="brand-text">Realm Guide</span>
      </div>

      <div className="navbar-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link-btn ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <style>{`
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 3rem;
          background: rgba(5, 5, 8, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-gold);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .brand-emblem {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 0 5px var(--gold-glow));
          transition: var(--transition-smooth);
        }

        .navbar-brand:hover .brand-emblem {
          transform: rotate(360deg);
        }

        .brand-text {
          font-family: var(--font-title);
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 2px;
          color: var(--text-primary);
          text-transform: uppercase;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-link-btn {
          background: none;
          border: none;
          font-family: var(--font-title);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: var(--transition-smooth);
          cursor: pointer;
          padding: 0.5rem 1rem;
          position: relative;
        }

        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: var(--transition-smooth);
          box-shadow: 0 0 8px var(--gold-glow);
        }

        .nav-link-btn:hover {
          color: var(--gold);
          text-shadow: 0 0 8px var(--gold-glow);
        }

        .nav-link-btn:hover::after {
          width: 60%;
        }

        .nav-link-btn.active {
          color: var(--gold);
          text-shadow: 0 0 8px var(--gold-glow);
        }

        .nav-link-btn.active::after {
          width: 80%;
        }

        @media (max-width: 900px) {
          .navbar-container {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .navbar-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .nav-link-btn {
            font-size: 0.7rem;
            padding: 0.3rem 0.6rem;
          }
        }
      `}</style>
    </nav>
  );
}
