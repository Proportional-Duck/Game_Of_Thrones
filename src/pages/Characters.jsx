import React, { useState } from 'react';

const CHARACTERS_DATA = [
  {
    id: 'jon_snow',
    name: 'Jon Snow',
    role: 'The Bastard of Winterfell',
    house: 'House Stark',
    status: 'Alive (Undead)',
    fate: 'Discovers he is secretly Aegon Targaryen, the rightful heir to the Iron Throne. After being forced to kill Daenerys to save the realm, he is banished back north of the Wall with the Free Folk.',
    words: 'I know nothing, but I protect the living.',
    imageIcon: '❄️',
    summary: 'Starting as an outcast bastard son, Jon joins the Night\'s Watch (defenders of the Wall). He rises to become Lord Commander, unites the realm against the icy White Walkers, and leads the battle for survival.'
  },
  {
    id: 'daenerys_targaryen',
    name: 'Daenerys Targaryen',
    role: 'The Dragon Queen / Mother of Dragons',
    house: 'House Targaryen',
    status: 'Deceased',
    fate: 'Reclaims the Iron Throne but burns King\'s Landing to ashes in a fit of grief and anger. Fearing she will become a tyrant, Jon Snow stabs her in the Throne Room, and her dragon Drogon flies away with her body.',
    words: 'I will take what is mine with fire and blood.',
    imageIcon: '🐉',
    summary: 'Exiled across the sea as an impoverished princess, she hatches three fossilized dragon eggs. She builds a massive army of freed slaves and Dothraki warriors to sail back to Westeros and claim the throne.'
  },
  {
    id: 'tyrion_lannister',
    name: 'Tyrion Lannister',
    role: 'The Clever Hand / "The Imp"',
    house: 'House Lannister',
    status: 'Alive',
    fate: 'Survives the entire war, serves as Hand of the King to the newly elected Bran Stark, and rebuilds the fractured Seven Kingdoms with humor, wisdom, and plenty of wine.',
    words: 'A mind needs books as a sword needs a whetstone.',
    imageIcon: '🍷',
    summary: 'A dwarf who is despised by his own family. He survives by relying on his supreme intelligence, wit, and tactical genius. He serves as Hand of the King for multiple rulers and tries to bring peace to the realm.'
  },
  {
    id: 'arya_stark',
    name: 'Arya Stark',
    role: 'The Faceless Assassin',
    house: 'House Stark',
    status: 'Alive',
    fate: 'Saves humanity by stabbing the Night King (leader of the White Walkers) during the Battle of Winterfell. Afterwards, she rejects noble life and sails west of Westeros to explore uncharted oceans.',
    words: 'Not Today.',
    imageIcon: '🗡️',
    summary: 'A tomboy princess who witnesses her father\'s execution. She flees, travels across the dangerous continent, trains with magical assassins in Essos to change faces, and executes a list of people who betrayed her family.'
  },
  {
    id: 'cersei_lannister',
    name: 'Cersei Lannister',
    role: 'The Ruthless Queen Regent',
    house: 'House Lannister',
    status: 'Deceased',
    fate: 'Is trapped and crushed under the collapsing Red Keep alongside her twin brother/lover Jaime Lannister as Daenerys Targaryen destroys the capital with dragon fire.',
    words: 'When you play the game of thrones, you win or you die.',
    imageIcon: '👑',
    summary: 'The fiercely protective and ambitious Queen who will commit any crime (including incest, murder, and blowing up holy temples) to secure power for herself and her children. The main human villain for much of the show.'
  },
  {
    id: 'ned_stark',
    name: 'Eddard "Ned" Stark',
    role: 'The Honorable Warden of the North',
    house: 'House Stark',
    status: 'Deceased',
    fate: 'Is betrayed by Littlefinger and Cersei in King\'s Landing. Despite pleading guilty to treason to protect his daughters, the sadistic boy-king Joffrey Baratheon orders his public execution by beheading.',
    words: 'The man who passes the sentence should swing the sword.',
    imageIcon: '🛡️',
    summary: 'The ultimate moral center of the show. Ned is a war hero who travels to the corrupt capital to serve as Hand of the King. His strict honor and refusal to play dirty politics lead directly to his tragic downfall and start the War of five Kings.'
  }
];

export default function Characters() {
  const [filterHouse, setFilterHouse] = useState('All');
  const [revealedSpoilers, setRevealedSpoilers] = useState({});

  const toggleSpoiler = (id) => {
    setRevealedSpoilers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const houses = ['All', 'House Stark', 'House Lannister', 'House Targaryen'];

  const filteredCharacters = filterHouse === 'All'
    ? CHARACTERS_DATA
    : CHARACTERS_DATA.filter(char => char.house === filterHouse);

  return (
    <div className="char-page container section">
      <h2>Character Encyclopedia</h2>
      <p className="char-intro">
        Meet the legendary players of the realm. Filter by House and toggle the spoiler button to reveal their ultimate fates at the end of the show without reading a giant novel.
      </p>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {houses.map(house => (
          <button
            key={house}
            className={`filter-btn ${filterHouse === house ? 'active' : ''}`}
            onClick={() => setFilterHouse(house)}
          >
            {house}
          </button>
        ))}
      </div>

      {/* Characters Grid */}
      <div className="chars-grid">
        {filteredCharacters.map((char) => (
          <div key={char.id} className="char-card glass-card">
            <div className="char-card-header">
              <div className="char-avatar-circle">
                <span className="char-icon">{char.imageIcon}</span>
              </div>
              <div className="char-headline">
                <span className="char-house-tag">{char.house}</span>
                <h3 className="char-name">{char.name}</h3>
                <span className="char-role">{char.role}</span>
              </div>
            </div>

            <p className="char-quote">"{char.words}"</p>
            <p className="char-desc">{char.summary}</p>

            <div className="char-status-bar">
              <span>STATUS:</span>
              <span className={`status-pill ${char.status.toLowerCase().includes('deceased') ? 'deceased' : 'alive'}`}>
                {char.status}
              </span>
            </div>

            {/* Spoiler Shield */}
            <div className="spoiler-section">
              <button 
                className="btn-gold spoiler-toggle"
                onClick={() => toggleSpoiler(char.id)}
              >
                {revealedSpoilers[char.id] ? '🔒 Hide Fate (Spoilers)' : '💀 Reveal Fate & Ending'}
              </button>

              {revealedSpoilers[char.id] && (
                <div className="spoiler-content animate-slide-down">
                  <strong>ULTIMATE ENDING:</strong>
                  <p>{char.fate}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .char-intro {
          text-align: center;
          max-width: 700px;
          margin: -1.5rem auto 3rem;
          color: var(--text-secondary);
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(16, 16, 22, 0.6);
          border: 1px solid var(--border-gold);
          color: var(--text-secondary);
          padding: 0.6rem 1.5rem;
          border-radius: 20px;
          font-family: var(--font-title);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-btn:hover, .filter-btn.active {
          color: var(--gold);
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 10px var(--gold-glow);
        }

        .chars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2.5rem;
        }

        .char-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
          height: 100%;
          justify-content: space-between;
        }

        .char-card-header {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .char-avatar-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .char-icon {
          font-size: 2rem;
        }

        .char-headline {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .char-house-tag {
          font-family: var(--font-title);
          font-size: 0.65rem;
          letter-spacing: 1px;
          color: var(--gold);
          text-transform: uppercase;
        }

        .char-name {
          font-size: 1.3rem;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .char-role {
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .char-quote {
          font-style: italic;
          color: var(--text-secondary);
          border-left: 2px solid var(--border-gold);
          padding-left: 0.8rem;
          font-size: 0.95rem;
        }

        .char-desc {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-secondary);
          flex-grow: 1;
        }

        .char-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-dim);
          border-bottom: 1px solid var(--border-dim);
          padding: 0.6rem 0;
          font-family: var(--font-title);
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        .status-pill {
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.7rem;
        }

        .status-pill.alive {
          background: rgba(39, 174, 96, 0.15);
          color: #27ae60;
          border: 1px solid #27ae60;
        }

        .status-pill.deceased {
          background: rgba(163, 29, 29, 0.15);
          color: #a31d1d;
          border: 1px solid #a31d1d;
        }

        .spoiler-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .spoiler-toggle {
          width: 100%;
          padding: 0.6rem 1rem;
          font-size: 0.75rem;
        }

        .spoiler-content {
          background: rgba(163, 29, 29, 0.05);
          border: 1px dashed var(--red);
          border-radius: 6px;
          padding: 1rem;
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .spoiler-content strong {
          color: var(--red);
          display: block;
          margin-bottom: 0.3rem;
          font-family: var(--font-title);
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease forwards;
        }

        @media (max-width: 768px) {
          .chars-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
