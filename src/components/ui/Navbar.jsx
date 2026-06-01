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
        <svg viewBox="0 0 100 100" className="brand-emblem">
          {/* Stylized crown/sword emblem */}
          <path d="M50 15 L55 35 L75 35 L60 48 L65 70 L50 58 L35 70 L40 48 L25 35 L45 35 Z" fill="var(--gold)" />
          <circle cx="50" cy="50" r="42" stroke="var(--gold)" strokeWidth="2" fill="none" strokeDasharray="4,4" />
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
