import React, { useState } from 'react';
import WesterosGlobe, { REGIONS } from '../components/3d/WesterosGlobe';

export default function Map() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  return (
    <div className="map-page-container container section">
      <h2>Interactive Map of Westeros</h2>
      <p className="map-intro">
        Drag and rotate the 3D map globe. Hover and click on the glowing sigil pins to instantly explore the geography, climates, and royal seats of the Seven Kingdoms.
      </p>

      <div className="map-content-grid">
        <div className="map-canvas-container glass-card">
          <WesterosGlobe onRegionSelect={setSelectedRegion} />
        </div>

        <div className="map-sidebar-info">
          {selectedRegion ? (
            <div className="region-parchment-card animate-fade-in">
              <div className="card-header">
                <span className="house-badge" style={{ borderColor: '#' + selectedRegion.color.toString(16), color: '#' + selectedRegion.color.toString(16) }}>
                  {selectedRegion.sigil}
                </span>
                <h3 className="region-name">{selectedRegion.name}</h3>
              </div>

              <div className="words-banner">
                <span className="words-label">HOUSE WORDS</span>
                <p className="house-words">"{selectedRegion.words}"</p>
              </div>

              <div className="parchment-body">
                <div className="info-group">
                  <h4>RULING DYNASTY</h4>
                  <p className="gold-text highlight-text">{selectedRegion.house}</p>
                </div>

                <div className="info-group">
                  <h4>GEOGRAPHY & CLIMATE</h4>
                  <p>{selectedRegion.climate}</p>
                </div>

                <div className="info-group">
                  <h4>HISTORICAL OVERVIEW</h4>
                  <p className="region-desc">{selectedRegion.desc}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="region-parchment-card empty-card flex-center">
              <p>Select a region on the globe to reveal its secrets...</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .map-intro {
          text-align: center;
          max-width: 700px;
          margin: -1.5rem auto 3rem;
          color: var(--text-secondary);
        }

        .map-content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2.5rem;
          align-items: stretch;
          min-height: 550px;
        }

        .map-canvas-container {
          padding: 0;
          height: 600px;
          overflow: hidden;
          background: rgba(10, 10, 15, 0.6);
          position: relative;
        }

        .map-sidebar-info {
          display: flex;
          flex-direction: column;
        }

        .region-parchment-card {
          background: rgba(16, 16, 22, 0.85);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          background-image: 
            radial-gradient(circle at 100% 0%, rgba(212,175,55,0.05) 0%, transparent 40%),
            linear-gradient(rgba(10, 10, 15, 0.4) 0%, rgba(16, 16, 22, 0.9) 100%);
        }

        .empty-card {
          justify-content: center;
          align-items: center;
          text-align: center;
          color: var(--text-dim);
          border-style: dashed;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .house-badge {
          align-self: flex-start;
          border: 1px solid;
          padding: 4px 12px;
          font-family: var(--font-title);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
        }

        .region-name {
          font-size: 1.6rem;
          color: var(--text-primary);
          letter-spacing: 1px;
        }

        .words-banner {
          background: rgba(0, 0, 0, 0.4);
          border-left: 3px solid var(--gold);
          padding: 0.8rem 1.2rem;
          border-radius: 0 4px 4px 0;
        }

        .words-label {
          font-family: var(--font-title);
          font-size: 0.65rem;
          color: var(--text-dim);
          letter-spacing: 2px;
          display: block;
          margin-bottom: 0.2rem;
        }

        .house-words {
          font-size: 1.2rem;
          font-style: italic;
          color: var(--gold);
          font-family: var(--font-title);
          letter-spacing: 1px;
        }

        .parchment-body {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .info-group h4 {
          font-size: 0.75rem;
          color: var(--text-dim);
          letter-spacing: 2px;
          margin-bottom: 0.4rem;
        }

        .highlight-text {
          font-family: var(--font-title);
          font-size: 1.15rem;
          letter-spacing: 1px;
        }

        .region-desc {
          line-height: 1.6;
          font-size: 1.05rem;
        }

        /* Card Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }

        @media (max-width: 1024px) {
          .map-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .map-canvas-container {
            height: 450px;
          }
        }
      `}</style>
    </div>
  );
}
