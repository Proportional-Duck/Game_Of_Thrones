import React from 'react';

const HOUSES_DATA = [
  {
    id: 'stark',
    name: 'House Stark',
    words: 'Winter is Coming',
    seat: 'Winterfell',
    sigil: '🐺 Direwolf',
    trait: 'Honorable, Resilient, Traditional',
    alliance: 'Allied with House Tully & Arryn',
    difficulty: 'Low political deceit, high military survival',
    desc: 'The rulers of the North. Honorable to a fault, they value duty, family, and tradition. They are the first line of defense against the ancient terrors that lie beyond the massive northern Wall.',
    accent: '#3d85c6',
  },
  {
    id: 'lannister',
    name: 'House Lannister',
    words: 'Hear Me Roar!',
    seat: 'Casterly Rock',
    sigil: '🦁 Golden Lion',
    trait: 'Wealthy, Ruthless, Politically Clever',
    alliance: 'Allied with House Frey & Boltons (mostly bought)',
    difficulty: 'Extremely high political deceit, massive gold funds',
    desc: 'The richest house in Westeros. Operating under the unofficial motto "A Lannister always pays his debts," they use gold, marriage alliance, and sheer ruthlessness to maintain control of the Iron Throne.',
    accent: '#d4af37',
  },
  {
    id: 'targaryen',
    name: 'House Targaryen',
    words: 'Fire and Blood',
    seat: 'Dragonstone',
    sigil: '🐉 Three-Headed Dragon',
    trait: 'Magical, Ambitious, Unpredictable',
    alliance: 'Allied with Dothraki hordes & Unsullied legions',
    difficulty: 'Unprecedented power (Dragons), unstable sanity',
    desc: 'The blood of old Valyria. They ruled Westeros for 300 years after conquering it with three giant dragons. Following a brutal rebellion that wiped out most of their family, they seek to reclaim the throne.',
    accent: '#a31d1d',
  },
  {
    id: 'baratheon',
    name: 'House Baratheon',
    words: 'Ours is the Fury',
    seat: 'Storm\'s End',
    sigil: '👑 Crowned Stag',
    trait: 'Fierce, Proud, Headstrong',
    alliance: 'Fractured internally (Stannis vs. Renly)',
    difficulty: 'Excellent warfare prowess, terrible compromise skills',
    desc: 'The house that overthrew the Targaryen dynasty. Led by Robert Baratheon, they claimed the throne but struggled to govern peacefully. They are heavily militaristic, loud, and proud warriors.',
    accent: '#e67e22',
  },
  {
    id: 'tyrell',
    name: 'House Tyrell',
    words: 'Growing Strong',
    seat: 'Highgarden',
    sigil: '🌹 Golden Rose',
    trait: 'Diplomatic, Wealthy, Opportunistic',
    alliance: 'Allied with Lannisters (for crown access)',
    difficulty: 'High charm, deep resources, strong family unity',
    desc: 'Masters of diplomacy and agriculture. While appearing soft and flowery, they are incredibly shrewd political players. They control the food supply of Westeros, giving them immense leverage.',
    accent: '#27ae60',
  },
  {
    id: 'greyjoy',
    name: 'House Greyjoy',
    words: 'We Do Not Sow',
    seat: 'Pyke',
    sigil: '🦑 Golden Kraken',
    trait: 'Fierce Sailors, Rebellious, Hardened',
    alliance: 'None (independent raiders)',
    difficulty: 'Fierce naval warfare, zero diplomacy',
    desc: 'Sea-faring raiders of the Iron Islands. They follow the "Old Way" of raiding coastal lands. They reject mainland politics and value sea combat, reaving, and their mystical Drowned God.',
    accent: '#7f8c8d',
  }
];

export default function Houses() {
  return (
    <div className="houses-page container section">
      <h2>The Great Houses of Westeros</h2>
      <p className="houses-intro">
        Hover over each House's royal shield to flip it and explore their unique values, military strengths, alliances, and historical backgrounds.
      </p>

      <div className="houses-grid">
        {HOUSES_DATA.map((house) => (
          <div 
            key={house.id} 
            className="house-card-wrapper"
          >
            <div className="house-card-inner">
              {/* Front Side */}
              <div className="house-card-front" style={{ borderTop: `5px solid ${house.accent}` }}>
                <div className="house-emblem-container">
                  <span className="house-sigil-icon">{house.sigil.split(' ')[0]}</span>
                </div>
                <h3 className="house-title">{house.name}</h3>
                <p className="house-motto">"{house.words}"</p>
                <div className="house-front-info">
                  <span>🏰 {house.seat}</span>
                </div>
                <div className="card-flip-indicator">⚔️ Hover to inspect</div>
              </div>

              {/* Back Side */}
              <div className="house-card-back" style={{ borderBottom: `5px solid ${house.accent}` }}>
                <h4>{house.name}</h4>
                <div className="back-attributes">
                  <div className="attribute">
                    <strong>TRAITS:</strong> <span>{house.trait}</span>
                  </div>
                  <div className="attribute">
                    <strong>ALLIANCES:</strong> <span>{house.alliance}</span>
                  </div>
                  <div className="attribute">
                    <strong>POLITICAL RISK:</strong> <span>{house.difficulty}</span>
                  </div>
                </div>
                <p className="house-history">{house.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .houses-intro {
          text-align: center;
          max-width: 700px;
          margin: -1.5rem auto 3rem;
          color: var(--text-secondary);
        }

        .houses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
          perspective: 1200px;
        }

        .house-card-wrapper {
          height: 380px;
          perspective: 1000px;
          cursor: pointer;
        }

        .house-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .house-card-wrapper:hover .house-card-inner {
          transform: rotateY(180deg);
        }

        .house-card-front, .house-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          background: rgba(16, 16, 22, 0.8);
          border: 1px solid var(--border-gold);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .house-card-front {
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        .house-emblem-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
        }

        .house-sigil-icon {
          font-size: 2.5rem;
        }

        .house-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          letter-spacing: 1px;
        }

        .house-motto {
          font-family: var(--font-title);
          font-size: 1rem;
          font-style: italic;
          color: var(--gold);
        }

        .house-front-info {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .card-flip-indicator {
          font-family: var(--font-title);
          font-size: 0.7rem;
          letter-spacing: 1px;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        /* Back Side styling */
        .house-card-back {
          transform: rotateY(180deg);
          justify-content: flex-start;
          text-align: left;
          gap: 1.2rem;
          background-image: linear-gradient(rgba(16,16,22,0.95), rgba(10,10,15,0.98));
        }

        .house-card-back h4 {
          font-size: 1.3rem;
          color: var(--gold);
          border-bottom: 1px solid var(--border-gold);
          padding-bottom: 0.5rem;
        }

        .back-attributes {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .attribute strong {
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }

        .attribute span {
          color: var(--text-primary);
          margin-left: 0.3rem;
        }

        .house-history {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-secondary);
          overflow-y: auto;
          padding-right: 4px;
        }
      `}</style>
    </div>
  );
}
