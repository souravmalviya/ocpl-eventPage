import React, { useEffect, useRef } from 'react';

export default function OCPL2026DetailedRoadmap({ onNavigateToGantt }) {
  const containerRef = useRef(null);
  const defaultDatesRef = useRef({});
  const DATE_STORAGE_KEY = 'ocpl2026-editable-dates';

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const editableElements = containerRef.current.querySelectorAll(
      '.milestone-date, .phase-duration, .stat-box-date, .footer-date'
    );

    let savedDates = {};
    try {
      savedDates = JSON.parse(localStorage.getItem(DATE_STORAGE_KEY) || '{}');
    } catch {
      savedDates = {};
    }

    editableElements.forEach((element, index) => {
      const id = `date-${index}`;
      const originalText = element.textContent || '';

      element.setAttribute('data-date-id', id);
      element.setAttribute('contenteditable', 'true');
      element.setAttribute('spellcheck', 'false');
      element.setAttribute('title', 'Click and edit date');

      defaultDatesRef.current[id] = originalText;

      if (typeof savedDates[id] === 'string') {
        element.textContent = savedDates[id];
      }
    });

    const persistDates = () => {
      const currentDates = {};

      const allEditableElements = containerRef.current.querySelectorAll(
        '.milestone-date, .phase-duration, .stat-box-date, .footer-date'
      );
      allEditableElements.forEach((element) => {
        const id = element.getAttribute('data-date-id');
        if (id) {
          currentDates[id] = (element.textContent || '').trim();
        }
      });

      localStorage.setItem(DATE_STORAGE_KEY, JSON.stringify(currentDates));
    };

    editableElements.forEach((element) => {
      element.addEventListener('input', persistDates);
    });

    return () => {
      editableElements.forEach((element) => {
        element.removeEventListener('input', persistDates);
      });
    };
  }, []);

  const resetEditedDates = () => {
    if (!containerRef.current) {
      return;
    }

    const editableElements = containerRef.current.querySelectorAll(
      '.milestone-date, .phase-duration, .stat-box-date, .footer-date'
    );

    editableElements.forEach((element) => {
      const id = element.getAttribute('data-date-id');
      if (id && typeof defaultDatesRef.current[id] === 'string') {
        element.textContent = defaultDatesRef.current[id];
      }
    });

    localStorage.removeItem(DATE_STORAGE_KEY);
  };

  const getDateEntries = () => {
    if (!containerRef.current) {
      return [];
    }

    const editableElements = containerRef.current.querySelectorAll(
      '.milestone-date, .phase-duration, .stat-box-date, .footer-date'
    );

    return Array.from(editableElements).map((element) => {
      const id = element.getAttribute('data-date-id') || '';
      const currentValue = (element.textContent || '').trim();
      const originalValue = defaultDatesRef.current[id] || '';

      return {
        id,
        originalValue,
        currentValue,
        edited: currentValue !== originalValue
      };
    });
  };

  const downloadTextFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const exportDatesAsCSV = () => {
    const entries = getDateEntries();
    const timestamp = new Date().toISOString();
    const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;
    const header = ['id', 'originalValue', 'currentValue', 'edited'];
    const rows = entries.map((entry) => [
      entry.id,
      entry.originalValue,
      entry.currentValue,
      entry.edited
    ]);
    const csv = [header, ...rows].map((row) => row.map(escapeCSV).join(',')).join('\n');

    downloadTextFile(
      csv,
      `ocpl-dates-${timestamp.slice(0, 10)}.csv`,
      'text/csv;charset=utf-8'
    );
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>

      {/* ── Navbar ── */}
      <nav className="ocpl-navbar">
        <div className="ocpl-navbar-inner">
          <div className="ocpl-navbar-left">
            <img src="/onclusive-logo.png" alt="Onclusive" className="ocpl-navbar-logo-img" />
            <span className="ocpl-navbar-brand">Onclusive</span>
          </div>
        </div>
      </nav>

      <div ref={containerRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'Arial, sans-serif', lineHeight: 1.6, boxSizing: 'border-box' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;600;500&family=Inter:wght@400;500;600&display=swap');

        * {
          box-sizing: border-box;
        }
        
        .main-title {
          font-family: 'Poppins', sans-serif;
          text-align: center;
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #ffffff;
        }

        /* ── Navbar ── */
        .ocpl-navbar {
          width: 100%;
          background: #0a0f1e;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 16px rgba(0,0,0,0.4);
        }

        .ocpl-navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ocpl-navbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ocpl-navbar-logo-img {
          height: 38px;
          width: 38px;
          object-fit: contain;
          border-radius: 6px;
        }

        .ocpl-navbar-brand {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.3px;
        }

        .ocpl-navbar-right {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .subtitle {
          text-align: center;
          font-size: 18px;
          color: #cbd5e1;
          margin-bottom: 40px;
          font-weight: 500;
        }
        
        .phase-section {
          margin-bottom: 80px;
          border-left: 6px solid;
          padding: 30px;
          border-radius: 8px;
          background: rgba(51, 65, 85, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .phase-title {
          font-family: 'Poppins', sans-serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .phase-duration {
          font-size: 14px;
          color: #a1a1aa;
          margin-bottom: 24px;
          font-weight: 500;
        }
        
        .milestone-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .milestone-card {
          background: rgba(30, 41, 59, 0.6);
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.3s ease;
        }
        
        .milestone-card:hover {
          background: rgba(30, 41, 59, 0.9);
          border-color: rgba(148, 163, 184, 0.4);
          transform: translateY(-4px);
        }
        
        .milestone-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .milestone-date {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
          margin-bottom: 4px;
          text-transform: uppercase;
          border-radius: 4px;
          transition: background-color 0.2s ease;
          cursor: text;
        }

        .milestone-date[contenteditable='true']:hover,
        .phase-duration[contenteditable='true']:hover,
        .stat-box-date[contenteditable='true']:hover,
        .footer-date[contenteditable='true']:hover {
          background: rgba(148, 163, 184, 0.15);
        }

        .milestone-date[contenteditable='true']:focus,
        .phase-duration[contenteditable='true']:focus,
        .stat-box-date[contenteditable='true']:focus,
        .footer-date[contenteditable='true']:focus {
          outline: 2px solid #22d3ee;
          outline-offset: 2px;
          background: rgba(34, 211, 238, 0.12);
        }

        .stat-box-date {
          font-size: 11px;
          color: #64748b;
          margin-top: 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
          cursor: text;
        }

        .footer-date {
          display: inline;
          border-radius: 4px;
          transition: background-color 0.2s ease;
          cursor: text;
        }
        
        .milestone-name {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .outcomes-section {
          background: rgba(20, 30, 48, 0.8);
          padding: 16px;
          border-radius: 6px;
          margin-top: 16px;
        }
        
        .outcomes-title {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
          opacity: 0.8;
        }
        
        .outcome-item {
          font-size: 13px;
          color: #cbd5e1;
          margin-bottom: 8px;
          padding-left: 12px;
          border-left: 3px solid;
        }
        
        .critical-box {
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid #EF4444;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          color: #fca5a5;
          font-weight: 600;
          font-size: 13px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;
          margin: 60px 0;
          padding: 40px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .stat-box {
          text-align: center;
        }
        
        .stat-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }
        
        .stat-number {
          font-family: 'Poppins', sans-serif;
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #94a3b8;
        }
        
        .success-factors {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 40px;
          padding: 40px;
          background: rgba(51, 65, 85, 0.3);
          border-radius: 12px;
        }
        
        .factor-box {
          border-left: 4px solid;
          padding-left: 16px;
        }
        
        .factor-title {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        
        .factor-item {
          font-size: 13px;
          color: #cbd5e1;
          margin-bottom: 8px;
          padding-left: 8px;
        }
        
        .footer {
          text-align: center;
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          color: #94a3b8;
          font-size: 12px;
        }

        .action-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: -16px;
          margin-bottom: 28px;
        }

        .reset-btn {
          background: rgba(14, 116, 144, 0.18);
          color: #bae6fd;
          border: 1px solid rgba(125, 211, 252, 0.5);
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-btn:hover {
          background: rgba(14, 116, 144, 0.32);
          border-color: rgba(125, 211, 252, 0.9);
        }

        .export-btn {
          background: rgba(22, 101, 52, 0.22);
          color: #bbf7d0;
          border: 1px solid rgba(134, 239, 172, 0.55);
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .export-btn:hover {
          background: rgba(22, 101, 52, 0.36);
          border-color: rgba(134, 239, 172, 0.95);
        }

        .gantt-btn {
          background: rgba(37, 99, 235, 0.22);
          color: #bfdbfe;
          border: 1px solid rgba(147, 197, 253, 0.55);
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .gantt-btn:hover {
          background: rgba(37, 99, 235, 0.36);
          border-color: rgba(147, 197, 253, 0.95);
        }

        @media (max-width: 1024px) {
          .main-title {
            font-size: 44px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
            padding: 28px;
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 34px;
          }

          .subtitle {
            font-size: 15px;
            margin-bottom: 28px;
          }

          .phase-section {
            padding: 18px;
            margin-bottom: 36px;
          }

          .phase-title {
            font-size: 22px;
          }

          .milestone-grid,
          .success-factors,
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid,
          .success-factors {
            padding: 20px;
            gap: 14px;
            margin: 30px 0;
          }

          .stat-number {
            font-size: 30px;
          }

          .milestone-card {
            padding: 14px;
          }

          .action-row {
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/* Main Title */}
      <h1 className="main-title">OCPL 2026 EVENT ROADMAP</h1>
      <p className="subtitle">Complete Timeline & Milestone Tracking</p>
      <p className="subtitle" style={{ marginTop: '-20px', fontSize: '13px', color: '#93c5fd' }}>
        Click any phase duration or milestone date to edit directly. Changes are auto-saved.
      </p>
      <div className="action-row">
        <button type="button" className="reset-btn" onClick={resetEditedDates}>
          Reset All Edited Dates
        </button>
        <button type="button" className="export-btn" onClick={exportDatesAsCSV}>
          Export Dates CSV
        </button>
        <button type="button" className="gantt-btn" onClick={onNavigateToGantt}>
          View Gantt Chart
        </button>
      </div>

      {/* Key Stats */}
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-icon">📅</div>
          <div className="stat-number">64</div>
          <div className="stat-label">Days</div>
          <div className="stat-box-date">Feb 12 - Apr 16</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">✅</div>
          <div className="stat-number">48</div>
          <div className="stat-label">Total Tasks</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>All Categories</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">📊</div>
          <div className="stat-number">4</div>
          <div className="stat-label">Phases</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>Foundation to Launch</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">⚡</div>
          <div className="stat-number">4</div>
          <div className="stat-label">Categories</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>Turf, Players, Other, Food</div>
        </div>
      </div>

      {/* Phase 1 */}
      <div className="phase-section" style={{ borderColor: '#10B981' }}>
        <div className="phase-title" style={{ color: '#10B981' }}>
          <span>🏗️</span> PHASE 1: FOUNDATION PHASE
        </div>
        <div className="phase-duration">February 12-25, 2026 (14 Days)</div>
        
        <div className="milestone-grid">
          <div className="milestone-card">
            <div className="milestone-icon">🏟️</div>
            <div className="milestone-date">Feb 12-18</div>
            <div className="milestone-name">Turf Scouting & Evaluation</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📝</div>
            <div className="milestone-date">Feb 18</div>
            <div className="milestone-name">Turf Booking (Advance)</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">👥</div>
            <div className="milestone-date">Feb 23-25</div>
            <div className="milestone-name">Owners & Captains Finalized</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">🎯</div>
            <div className="milestone-date">Feb 25</div>
            <div className="milestone-name">All Teams Confirmed</div>
          </div>
        </div>
        
        <div className="outcomes-section" style={{ borderLeft: '4px solid #10B981' }}>
          <div className="outcomes-title">Expected Outcomes</div>
          <div className="outcome-item" style={{ borderColor: '#10B981' }}>✓ Venue completely confirmed and booked</div>
          <div className="outcome-item" style={{ borderColor: '#10B981' }}>✓ All team owners finalized (48+ Players)</div>
          <div className="outcome-item" style={{ borderColor: '#10B981' }}>✓ All captains appointed</div>
          <div className="outcome-item" style={{ borderColor: '#10B981' }}>✓ Budget allocated and locked</div>
        </div>
      </div>

      {/* Phase 2 */}
      <div className="phase-section" style={{ borderColor: '#F59E0B' }}>
        <div className="phase-title" style={{ color: '#F59E0B' }}>
          <span>🎪</span> PHASE 2: PLANNING & AUCTION PHASE
        </div>
        <div className="phase-duration">February 26 - March 24, 2026 (27 Days)</div>
        
        <div className="milestone-grid">
          <div className="milestone-card">
            <div className="milestone-icon">🎨</div>
            <div className="milestone-date">Mar 2-4</div>
            <div className="milestone-name">Logos & Banners Finalized</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📋</div>
            <div className="milestone-date">Mar 3-6</div>
            <div className="milestone-name">Auction Rules Finalized</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📊</div>
            <div className="milestone-date">Mar 8</div>
            <div className="milestone-name">Final Player List Released</div>
          </div>
          <div className="milestone-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))', border: '2px solid #F59E0B' }}>
            <div className="milestone-icon">🚀</div>
            <div className="milestone-date">Mar 10</div>
            <div className="milestone-name" style={{ color: '#FCD34D', fontWeight: 'bold' }}>🎯 AUCTION DAY - MAJOR MILESTONE</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📢</div>
            <div className="milestone-date">Mar 12+</div>
            <div className="milestone-name">Email & Marketing Campaign</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📸</div>
            <div className="milestone-date">Mar 13-18</div>
            <div className="milestone-name">Media Vendors Finalized</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📋</div>
            <div className="milestone-date">Mar 17-20</div>
            <div className="milestone-name">Audience Form Rollout</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">✅</div>
            <div className="milestone-date">Mar 24</div>
            <div className="milestone-name">Phase Completion</div>
          </div>
        </div>
        
        <div className="outcomes-section" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div className="outcomes-title">Expected Outcomes</div>
          <div className="outcome-item" style={{ borderColor: '#F59E0B' }}>✓ Auction successfully executed</div>
          <div className="outcome-item" style={{ borderColor: '#F59E0B' }}>✓ All teams and players finalized</div>
          <div className="outcome-item" style={{ borderColor: '#F59E0B' }}>✓ Media teams and photographers hired</div>
          <div className="outcome-item" style={{ borderColor: '#F59E0B' }}>✓ Marketing campaign in full swing</div>
        </div>
      </div>

      {/* Phase 3 */}
      <div className="phase-section" style={{ borderColor: '#EF4444' }}>
        <div className="phase-title" style={{ color: '#EF4444' }}>
          <span>⚙️</span> PHASE 3: PRODUCTION & CONFIRMATION
        </div>
        <div className="phase-duration">March 25 - April 10, 2026 (17 Days) | ⚠️ PEAK ACTIVITY</div>
        
        <div className="critical-box">
          ⚡ CRITICAL PERIOD: Apr 7-10 has 10+ simultaneous tasks. Maximum coordination required!
        </div>
        
        <div className="milestone-grid">
          <div className="milestone-card">
            <div className="milestone-icon">👔</div>
            <div className="milestone-date">Mar 24</div>
            <div className="milestone-name">Umpires & Scorers Confirmed</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">🏆</div>
            <div className="milestone-date">Mar 28-31</div>
            <div className="milestone-name">Trophies Order (Advance)</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">⚕️</div>
            <div className="milestone-date">Apr 4-6</div>
            <div className="milestone-name">Medical Supplies (Advance)</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">🍽️</div>
            <div className="milestone-date">Apr 6-8</div>
            <div className="milestone-name">Food Vendors Selected</div>
          </div>
          <div className="milestone-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))', border: '2px solid #EF4444' }}>
            <div className="milestone-icon">⚡</div>
            <div className="milestone-date">Apr 7-10</div>
            <div className="milestone-name" style={{ color: '#FCA5A5', fontWeight: 'bold' }}>🔥 PEAK COORDINATION</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">👕</div>
            <div className="milestone-date">Apr 9</div>
            <div className="milestone-name">Jerseys Collection</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">👨‍🍳</div>
            <div className="milestone-date">Apr 10</div>
            <div className="milestone-name">Food Tasting & Approval</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">✅</div>
            <div className="milestone-date">Apr 10</div>
            <div className="milestone-name">Production Phase Complete</div>
          </div>
        </div>
        
        <div className="outcomes-section" style={{ borderLeft: '4px solid #EF4444' }}>
          <div className="outcomes-title">Expected Outcomes</div>
          <div className="outcome-item" style={{ borderColor: '#EF4444' }}>✓ All equipment sourced and vendors confirmed</div>
          <div className="outcome-item" style={{ borderColor: '#EF4444' }}>✓ All officials (umpires, scorers) appointed</div>
          <div className="outcome-item" style={{ borderColor: '#EF4444' }}>✓ All supplies (trophies, medical, jerseys) secured</div>
          <div className="outcome-item" style={{ borderColor: '#EF4444' }}>✓ Food arrangements locked and tested</div>
          <div className="outcome-item" style={{ borderColor: '#EF4444' }}>✓ All advance payments completed</div>
        </div>
      </div>

      {/* Phase 4 */}
      <div className="phase-section" style={{ borderColor: '#8B5CF6' }}>
        <div className="phase-title" style={{ color: '#8B5CF6' }}>
          <span>🎊</span> PHASE 4: FINAL SETUP & LAUNCH
        </div>
        <div className="phase-duration">April 11-16, 2026 (6 Days) | COUNTDOWN TO EVENT</div>
        
        <div className="milestone-grid">
          <div className="milestone-card">
            <div className="milestone-icon">🎾</div>
            <div className="milestone-date">Apr 11</div>
            <div className="milestone-name">Balls (36 units) Ordered</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">📱</div>
            <div className="milestone-date">Apr 13</div>
            <div className="milestone-name">Remote Players Final Setup</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">✈️</div>
            <div className="milestone-date">Apr 14</div>
            <div className="milestone-name">Women Travel Arrangements</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">🙏</div>
            <div className="milestone-date">Apr 16</div>
            <div className="milestone-name">Pooja Material Ordered</div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">🎉</div>
            <div className="milestone-date">Apr 15-16</div>
            <div className="milestone-name">Final Venue Setup & Deco</div>
          </div>
          <div className="milestone-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))', border: '2px solid #8B5CF6' }}>
            <div className="milestone-icon">🚀</div>
            <div className="milestone-date">Apr 16</div>
            <div className="milestone-name" style={{ color: '#E9D5FF', fontWeight: 'bold' }}>✅ EVENT READY!</div>
          </div>
        </div>
        
        <div className="outcomes-section" style={{ borderLeft: '4px solid #8B5CF6' }}>
          <div className="outcomes-title">Expected Outcomes</div>
          <div className="outcome-item" style={{ borderColor: '#8B5CF6' }}>✓ Venue completely set up and decorated</div>
          <div className="outcome-item" style={{ borderColor: '#8B5CF6' }}>✓ All materials delivered and in place</div>
          <div className="outcome-item" style={{ borderColor: '#8B5CF6' }}>✓ All arrangements 100% confirmed</div>
          <div className="outcome-item" style={{ borderColor: '#8B5CF6' }}>✓ Backup plans activated and tested</div>
          <div className="outcome-item" style={{ borderColor: '#8B5CF6' }}>✓ READY FOR EVENT EXECUTION</div>
        </div>
      </div>

      {/* Critical Success Factors */}
      <div className="success-factors">
        <div className="factor-box" style={{ borderColor: '#10B981' }}>
          <div className="factor-title" style={{ color: '#10B981' }}>📌 Dependencies to Monitor</div>
          <div className="factor-item">✓ Team finalization BEFORE auction rules</div>
          <div className="factor-item">✓ Auction completion BEFORE player list</div>
          <div className="factor-item">✓ Vendors selected BEFORE payments</div>
          <div className="factor-item">✓ Medical approvals BEFORE Apr 10</div>
          <div className="factor-item">✓ All collections BEFORE Apr 16</div>
        </div>
        
        <div className="factor-box" style={{ borderColor: '#F59E0B' }}>
          <div className="factor-title" style={{ color: '#F59E0B' }}>📅 Weekly Checkpoints</div>
          <div className="factor-item">📌 Feb 25: Teams locked in</div>
          <div className="factor-item">📌 Mar 10: Auction completed ⭐</div>
          <div className="factor-item">📌 Mar 24: Officials confirmed</div>
          <div className="factor-item">📌 Apr 7: Payment deadlines met</div>
          <div className="factor-item">📌 Apr 14: All arrangements final</div>
        </div>

        <div className="factor-box" style={{ borderColor: '#EF4444' }}>
          <div className="factor-title" style={{ color: '#EF4444' }}>⚡ Critical Tasks</div>
          <div className="factor-item">🔴 Apr 7-10: Peak coordination (10+ tasks)</div>
          <div className="factor-item">🔴 Vendor tasting & approval (Apr 10)</div>
          <div className="factor-item">🔴 Jersey collection (Apr 9)</div>
          <div className="factor-item">🔴 Women travel arrangements (Apr 14)</div>
          <div className="factor-item">🔴 Final venue setup (Apr 15-16)</div>
        </div>

        <div className="factor-box" style={{ borderColor: '#8B5CF6' }}>
          <div className="factor-title" style={{ color: '#8B5CF6' }}>🎯 Success Metrics</div>
          <div className="factor-item">✅ 100% vendor payments by Apr 17</div>
          <div className="factor-item">✅ All 48 teams & players confirmed</div>
          <div className="factor-item">✅ All equipment delivered by Apr 15</div>
          <div className="factor-item">✅ Food arrangements locked by Apr 10</div>
          <div className="factor-item">✅ Event-ready status on Apr 16</div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p><strong>OCPL 2026 Event Management Roadmap</strong></p>
        <p>Complete Timeline: <span className="footer-date">February 12 - April 16, 2026</span> | 64 Days | 48 Tasks | 4 Phases</p>
        <p style={{ marginTop: '16px', fontSize: '11px' }}>FCC TEAM</p>
      </div>
    </div>
    </div>
  );
}