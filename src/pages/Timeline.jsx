import React, { useState } from 'react';

const TIMELINE_DATA = [
  {
    id: 1,
    era: 'PRE-SHOW HISTORY',
    title: 'Robert\'s Rebellion',
    summary: 'The event that set the entire story in motion.',
    details: 'The Mad King (Aerys Targaryen) goes insane and brutally executes Ned Stark\'s father and brother. In response, Ned Stark and his best friend Robert Baratheon launch a massive rebellion. Robert kills the crown prince Rhaegar at the Trident, the Mad King is assassinated by his own Kingsguard (Jaime Lannister), and Robert claims the Iron Throne, exiles the surviving Targaryen children, and marries Cersei Lannister.',
    icon: '👑',
    tragedy: 'Wipes out the Targaryen dynasty from Westeros, driving Daenerys into hiding.'
  },
  {
    id: 2,
    era: 'THE SPARK (SEASONS 1-2)',
    title: 'The Betrayal & War of Five Kings',
    summary: 'Ned Stark goes South, and the realm fractures.',
    details: 'Ned Stark is appointed Hand of the King (prime minister) and discovers that Queen Cersei\'s children are actually fathered by her twin brother Jaime, not King Robert. Before Ned can act, Robert dies in a suspicious hunting accident. Ned is betrayed and publicly executed by the sadistic child-king Joffrey. In fury, Ned\'s eldest son Robb Stark is crowned King in the North and marches south, sparking a five-way war for the crown.',
    icon: '⚔️',
    tragedy: 'The honorable Starks are scattered, and King Joffrey rules with absolute terror.'
  },
  {
    id: 3,
    era: 'THE DEEPEST DARK (SEASONS 3-4)',
    title: 'The Red Wedding & Chaos',
    summary: 'The Starks are crushed, and the villains win.',
    details: 'Robb Stark wins every battle but breaks a marriage pact with the proud Lord Frey. In revenge, the Freys and Boltons conspire with Tywin Lannister. During a wedding feast, they break sacred guest-right and brutally slaughter Robb Stark, his pregnant wife, his mother Catelyn, and their northern army. Meanwhile, Joffrey is poisoned at his own royal wedding, and Tyrion Lannister escapes execution by killing his abusive father Tywin.',
    icon: '🍷',
    tragedy: 'The Northern rebellion is destroyed. Total Lannister supremacy.'
  },
  {
    id: 4,
    era: 'THE RISING TIDE (SEASONS 5-6)',
    title: 'Resurrections & Reclamations',
    summary: 'Magic awakens, and the Starks return.',
    details: 'In the north, Jon Snow is murdered by mutinous watchmen but is resurrected by a fire priestess. He gathers an army and defeats the psychotic Ramsay Bolton in the spectacular "Battle of the Bastards" to reclaim Winterfell. In the south, Cersei blows up the great cathedral with wildfire to wipe out all her religious and political rivals, crowning herself Queen. Across the sea, Daenerys hatches three massive dragons and amasses a giant navy.',
    icon: '❄️',
    tragedy: 'Winter arrives, and the mythical White Walkers breach the ancient Wall.'
  },
  {
    id: 5,
    era: 'THE COLLISION (SEASON 7)',
    title: 'Fire and Ice Unite',
    summary: 'The dragon meets the direwolf.',
    details: 'Daenerys arrives in Westeros and establishes her base at Dragonstone. Jon Snow travels south to meet her, refusing to bend the knee but pleading for help against the undead. The two fall in love and discover they have a shared enemy. To prove the threat, they capture an undead wight, leading to a temporary truce with Cersei. However, the Night King kills and resurrects one of Daenerys\'s dragons, using it to melt down the Wall.',
    icon: '🐉',
    tragedy: 'The barrier between humanity and the dead is completely shattered.'
  },
  {
    id: 6,
    era: 'THE ENDING (SEASON 8)',
    title: 'The Long Night & The Last Reign',
    summary: 'The dead fall, and the Throne burns.',
    details: 'The living stand together at Winterfell and defeat the White Walkers in a pitch-black night of terror, thanks to Arya Stark stabbing the Night King. Daenerys then marches on the capital. Grief-stricken by betrayals and loss, she uses her remaining dragon to incinerate the entire civilian city of King\'s Landing. Knowing she has become a tyrant, Jon Snow stabs her. The Iron Throne is melted by dragon fire, and a council of lords elects Bran Stark as the new, peaceful King.',
    icon: '💀',
    tragedy: 'The Iron Throne is destroyed, and the Seven Kingdoms are split into a parliamentary republic.'
  }
];

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="timeline-page container section">
      <h2>The Chronicle of Westeros</h2>
      <p className="timeline-intro">
        Follow the narrative path of Game of Thrones. Click on the chronological chronicle gates below to deep dive into the major historical eras and seasonal turnabouts.
      </p>

      <div className="timeline-wrapper">
        {/* Navigation Gates */}
        <div className="timeline-gates">
          {TIMELINE_DATA.map((item) => (
            <button
              key={item.id}
              className={`gate-btn ${activeStep === item.id ? 'active' : ''}`}
              onClick={() => setActiveStep(item.id)}
            >
              <span className="gate-icon">{item.icon}</span>
              <span className="gate-era">{item.era}</span>
            </button>
          ))}
        </div>

        {/* Selected Era Card */}
        <div className="timeline-content-card glass-card animate-fade-in">
          <div className="era-card-header">
            <span className="era-tag">{TIMELINE_DATA[activeStep - 1].era}</span>
            <h3>{TIMELINE_DATA[activeStep - 1].title}</h3>
            <p className="era-summary">"{TIMELINE_DATA[activeStep - 1].summary}"</p>
          </div>

          <div className="era-card-body">
            <div className="history-text">
              <h4>WHAT HAPPENS:</h4>
              <p>{TIMELINE_DATA[activeStep - 1].details}</p>
            </div>

            <div className="tragedy-box">
              <h4>🔥 THE CRITICAL CONSEQUENCE:</h4>
              <p>{TIMELINE_DATA[activeStep - 1].tragedy}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-intro {
          text-align: center;
          max-width: 700px;
          margin: -1.5rem auto 3rem;
          color: var(--text-secondary);
        }

        .timeline-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline-gates {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.8rem;
          border-bottom: 2px solid var(--border-gold);
          padding-bottom: 1.5rem;
        }

        .gate-btn {
          background: rgba(16, 16, 22, 0.4);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          padding: 1rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .gate-icon {
          font-size: 1.6rem;
        }

        .gate-era {
          font-family: var(--font-title);
          font-size: 0.55rem;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.2;
        }

        .gate-btn:hover, .gate-btn.active {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 15px var(--gold-glow);
          transform: translateY(-4px);
        }

        .gate-btn.active .gate-era {
          color: var(--gold);
          font-weight: 700;
        }

        .timeline-content-card {
          text-align: left;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background-image: linear-gradient(135deg, rgba(16, 16, 22, 0.9) 0%, rgba(5, 5, 8, 0.95) 100%);
        }

        .era-card-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-bottom: 1px solid var(--border-gold);
          padding-bottom: 1.2rem;
        }

        .era-tag {
          font-family: var(--font-title);
          font-size: 0.75rem;
          color: var(--gold);
          letter-spacing: 1.5px;
        }

        .era-card-header h3 {
          font-size: 1.8rem;
          color: var(--text-primary);
        }

        .era-summary {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--text-secondary);
        }

        .era-card-body {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .history-text h4, .tragedy-box h4 {
          font-size: 0.75rem;
          color: var(--text-dim);
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }

        .history-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .tragedy-box {
          background: rgba(163, 29, 29, 0.05);
          border-left: 3px solid var(--red);
          padding: 1.2rem;
          border-radius: 0 6px 6px 0;
        }

        .tragedy-box p {
          color: var(--text-primary);
          font-size: 1.05rem;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }

        @media (max-width: 900px) {
          .timeline-gates {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
          
          .timeline-content-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
