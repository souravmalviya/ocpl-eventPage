import React, { useEffect, useRef } from 'react';

export default function OCPL2026DetailedRoadmap({ onNavigateToGantt }) {
  const containerRef = useRef(null);
  const defaultDatesRef = useRef({});
  const DATE_STORAGE_KEY = 'ocpl2026-editable-dates';

  useEffect(() => {
    if (!containerRef.current) return;
    const editableElements = containerRef.current.querySelectorAll(
      '.milestone-date, .phase-duration, .stat-box-date, .footer-date'
    );
    let savedDates = {};
    try { savedDates = JSON.parse(localStorage.getItem(DATE_STORAGE_KEY) || '{}'); } catch { savedDates = {}; }
    editableElements.forEach((element, index) => {
      const id = `date-${index}`;
      element.setAttribute('data-date-id', id);
      element.setAttribute('contenteditable', 'true');
      element.setAttribute('spellcheck', 'false');
      element.setAttribute('title', 'Click to edit');
      defaultDatesRef.current[id] = element.textContent || '';
      if (typeof savedDates[id] === 'string') element.textContent = savedDates[id];
    });
    const persist = () => {
      const cur = {};
      containerRef.current.querySelectorAll('.milestone-date, .phase-duration, .stat-box-date, .footer-date')
        .forEach(el => { const id = el.getAttribute('data-date-id'); if (id) cur[id] = (el.textContent || '').trim(); });
      localStorage.setItem(DATE_STORAGE_KEY, JSON.stringify(cur));
    };
    editableElements.forEach(el => el.addEventListener('input', persist));
    return () => editableElements.forEach(el => el.removeEventListener('input', persist));
  }, []);

  const resetEditedDates = () => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll('.milestone-date, .phase-duration, .stat-box-date, .footer-date')
      .forEach(el => { const id = el.getAttribute('data-date-id'); if (id && defaultDatesRef.current[id] != null) el.textContent = defaultDatesRef.current[id]; });
    localStorage.removeItem(DATE_STORAGE_KEY);
  };

  const exportDatesAsCSV = () => {
    if (!containerRef.current) return;
    const entries = Array.from(containerRef.current.querySelectorAll('.milestone-date, .phase-duration, .stat-box-date, .footer-date'))
      .map(el => { const id = el.getAttribute('data-date-id') || ''; const cur = (el.textContent || '').trim(); const orig = defaultDatesRef.current[id] || ''; return { id, orig, cur, edited: cur !== orig }; });
    const esc = v => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [['id','original','current','edited'], ...entries.map(e => [e.id, e.orig, e.cur, e.edited])].map(r => r.map(esc).join(',')).join('\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: `ocpl-dates-${new Date().toISOString().slice(0,10)}.csv` });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const phases = [
    {
      num: '01', color: '#10B981', bg: 'rgba(16,185,129,0.07)',
      title: 'Foundation Phase',
      duration: 'February 12 – 25, 2026  ·  14 Days',
      milestones: [
        { date: 'Feb 12 – 18', name: 'Turf Scouting & Evaluation' },
        { date: 'Feb 18', name: 'Turf Booking (Advance)' },
        { date: 'Feb 23 – 25', name: 'Owners & Captains Finalized' },
        { date: 'Feb 25', name: 'All Teams Confirmed', key: true },
      ],
      outcomes: ['Venue completely confirmed and booked', 'All team owners finalized (48+ Players)', 'All captains appointed', 'Budget allocated and locked'],
    },
    {
      num: '02', color: '#F59E0B', bg: 'rgba(245,158,11,0.07)',
      title: 'Planning & Auction Phase',
      duration: 'February 26 – March 24, 2026  ·  27 Days',
      milestones: [
        { date: 'Mar 2 – 4', name: 'Logos & Banners Finalized' },
        { date: 'Mar 3 – 6', name: 'Auction Rules Finalized' },
        { date: 'Mar 8', name: 'Final Player List Released' },
        { date: 'Mar 10', name: 'Auction Day — Major Milestone', key: true },
        { date: 'Mar 12+', name: 'Email & Marketing Campaign' },
        { date: 'Mar 13 – 18', name: 'Media Vendors Finalized' },
        { date: 'Mar 17 – 20', name: 'Audience Form Rollout' },
        { date: 'Mar 24', name: 'Phase Completion' },
      ],
      outcomes: ['Auction successfully executed', 'All teams and players finalized', 'Media teams and photographers hired', 'Marketing campaign in full swing'],
    },
    {
      num: '03', color: '#EF4444', bg: 'rgba(239,68,68,0.07)',
      title: 'Production & Confirmation',
      duration: 'March 25 – April 10, 2026  ·  17 Days',
      alert: 'Apr 7 – 10 has 10+ simultaneous tasks. Maximum coordination required.',
      milestones: [
        { date: 'Mar 24', name: 'Umpires & Scorers Confirmed' },
        { date: 'Mar 28 – 31', name: 'Trophies Order (Advance)' },
        { date: 'Apr 4 – 6', name: 'Medical Supplies (Advance)' },
        { date: 'Apr 6 – 8', name: 'Food Vendors Selected' },
        { date: 'Apr 7 – 10', name: 'Peak Coordination Window', key: true },
        { date: 'Apr 9', name: 'Jerseys Collection' },
        { date: 'Apr 10', name: 'Food Tasting & Approval' },
        { date: 'Apr 10', name: 'Production Phase Complete', key: true },
      ],
      outcomes: ['All equipment sourced and vendors confirmed', 'All officials (umpires, scorers) appointed', 'All supplies — trophies, medical, jerseys — secured', 'Food arrangements locked and tested', 'All advance payments completed'],
    },
    {
      num: '04', color: '#8B5CF6', bg: 'rgba(139,92,246,0.07)',
      title: 'Final Setup & Launch',
      duration: 'April 11 – 16, 2026  ·  6 Days',
      milestones: [
        { date: 'Apr 11', name: 'Balls (36 units) Ordered' },
        { date: 'Apr 13', name: 'Remote Players Final Setup' },
        { date: 'Apr 14', name: 'Women Travel Arrangements' },
        { date: 'Apr 16', name: 'Pooja Material Ordered' },
        { date: 'Apr 15 – 16', name: 'Final Venue Setup & Decoration' },
        { date: 'Apr 16', name: 'Event Ready', key: true },
      ],
      outcomes: ['Venue completely set up and decorated', 'All materials delivered and in place', 'All arrangements 100% confirmed', 'Backup plans activated and tested', 'Ready for event execution'],
    },
  ];

  return (
    <div ref={containerRef} style={{ background: '#07070d', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Navbar ─── */
        .navbar {
          position: sticky; top: 0; z-index: 200;
          background: rgba(7,7,13,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 40px;
        }
        .navbar-inner {
          max-width: 1160px; margin: 0 auto;
          height: 62px; display: flex; align-items: center;
        }
        .navbar-logo { display: flex; align-items: center; gap: 10px; }
        .navbar-logo img { height: 32px; width: 32px; border-radius: 6px; object-fit: contain; }
        .navbar-logo span {
          font-family: 'Poppins', sans-serif; font-size: 16px;
          font-weight: 600; color: #f0f0f8;
        }

        /* ─── Hero ─── */
        .hero {
          max-width: 1160px; margin: 0 auto;
          padding: 72px 40px 64px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #4a4a6a;
          margin-bottom: 20px;
        }
        .hero-label::before {
          content: ''; width: 20px; height: 1px; background: #4a4a6a;
        }
        .hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: 64px; font-weight: 800;
          color: #ffffff; line-height: 1.05;
          letter-spacing: -2px; margin-bottom: 6px;
        }
        .hero-title span { color: #ffffff; }
        .hero-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 64px; font-weight: 800;
          color: #1e1e30; line-height: 1.05;
          letter-spacing: -2px; margin-bottom: 36px;
          -webkit-text-stroke: 1px #2a2a46;
        }
        .hero-meta {
          display: flex; align-items: center; gap: 24px;
          flex-wrap: wrap; margin-bottom: 32px;
        }
        .hero-meta-item { display: flex; align-items: center; gap: 8px; }
        .hero-meta-dot { width: 6px; height: 6px; border-radius: 50%; }
        .hero-meta-text { font-size: 13px; color: #5a5a7a; font-weight: 500; }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          border: 1px solid; transition: all 0.18s;
          font-family: 'Inter', sans-serif; text-decoration: none;
        }
        .btn-outline { color: #6a6a8a; border-color: #1e1e30; background: transparent; }
        .btn-outline:hover { color: #c0c0e0; border-color: #2e2e48; background: #10101e; }
        .btn-accent {
          color: #fff; border-color: transparent;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }
        .btn-accent:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }

        /* ─── Stats ─── */
        .stats-section {
          max-width: 1160px; margin: 0 auto;
          padding: 52px 40px;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .stat-card {
          background: #07070d; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .stat-number {
          font-family: 'Poppins', sans-serif; font-size: 48px;
          font-weight: 800; color: #ffffff; line-height: 1;
          letter-spacing: -2px;
        }
        .stat-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #3a3a58;
        }
        .stat-box-date {
          font-size: 12px; color: #3a3a56; margin-top: 4px;
          cursor: text; border-radius: 4px; padding: 2px 4px;
          transition: background 0.15s, color 0.15s; display: inline-block;
        }
        .stat-box-date[contenteditable='true']:hover { background: #12121e; color: #6060a0; }
        .stat-box-date[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; color: #a5b4fc; background: rgba(99,102,241,0.08); }

        /* ─── Timeline ─── */
        .timeline { max-width: 1160px; margin: 0 auto; padding: 64px 40px; }
        .timeline-section { margin-bottom: 64px; position: relative; }
        .phase-connector {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);
          margin: 0 0 0 30px;
        }

        /* Phase Card */
        .phase-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; overflow: hidden;
        }
        .phase-card-header {
          padding: 28px 32px;
          display: flex; align-items: flex-start; gap: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .phase-num {
          font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 800; letter-spacing: 2px;
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .phase-info { flex: 1; }
        .phase-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .phase-name {
          font-family: 'Poppins', sans-serif;
          font-size: 22px; font-weight: 700;
          color: #f0f0f8; margin-bottom: 6px; line-height: 1.2;
        }
        .phase-duration {
          font-size: 13px; color: #4a4a6a; cursor: text;
          border-radius: 4px; padding: 2px 4px; display: inline-block;
          transition: background 0.15s, color 0.15s;
        }
        .phase-duration[contenteditable='true']:hover { background: #12121e; color: #6060a0; }
        .phase-duration[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; color: #a5b4fc; background: rgba(99,102,241,0.08); }

        /* Alert */
        .phase-alert {
          margin: 20px 32px 0;
          padding: 12px 16px; border-radius: 8px;
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
        }
        .phase-alert-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ef4444; flex-shrink: 0; margin-top: 4px;
        }
        .phase-alert-text { font-size: 12px; color: #f87171; font-weight: 500; line-height: 1.6; }

        /* Milestone Grid */
        .milestone-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: rgba(255,255,255,0.04);
          margin-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .milestone-card {
          background: #0b0b14; padding: 20px 24px;
          position: relative; transition: background 0.2s;
          border-left: 2px solid transparent;
        }
        .milestone-card:hover { background: #0f0f1c; }
        .milestone-card.is-key { border-left-color: var(--phase-color); background: #0d0d18; }
        .milestone-date {
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; margin-bottom: 8px;
          cursor: text; border-radius: 3px; padding: 1px 2px;
          display: inline-block;
          transition: background 0.15s, color 0.15s;
        }
        .milestone-date[contenteditable='true']:hover { background: #1a1a2a; }
        .milestone-date[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; background: rgba(99,102,241,0.1); color: #a5b4fc; }
        .milestone-name {
          font-size: 13px; font-weight: 500; color: #8888a8; line-height: 1.45;
        }
        .milestone-name.bold { color: #d0d0f0; font-weight: 600; }

        /* Outcomes */
        .outcomes-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 10px; padding: 24px 32px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: #09091a;
        }
        .outcome-row {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .outcome-check {
          width: 18px; height: 18px; border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px; font-size: 10px; font-weight: 700;
        }
        .outcome-text { font-size: 12px; color: #4a4a6a; line-height: 1.5; }

        /* ─── Success Section ─── */
        .success-section {
          max-width: 1160px; margin: 0 auto 80px;
          padding: 0 40px;
        }
        .section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #3a3a58; margin-bottom: 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-eyebrow::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05); }
        .factors-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; overflow: hidden;
        }
        .factor-col { background: #0a0a16; padding: 28px 24px; }
        .factor-title {
          font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 700; color: #d0d0f0;
          margin-bottom: 18px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .factor-item {
          font-size: 12px; color: #4a4a6a;
          padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);
          line-height: 1.5;
        }
        .factor-item:last-child { border-bottom: none; padding-bottom: 0; }
        .factor-item strong { color: #7070a0; font-weight: 600; }

        /* ─── Footer ─── */
        .footer-bar {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 32px 40px;
          max-width: 1160px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-left { font-size: 13px; font-weight: 600; color: #2a2a48; }
        .footer-right { font-size: 12px; color: #2a2a48; }
        .footer-date {
          display: inline; cursor: text; border-radius: 3px; padding: 1px 3px;
          transition: background 0.15s, color 0.15s;
        }
        .footer-date[contenteditable='true']:hover { background: #12121e; color: #4a4a6a; }
        .footer-date[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; color: #a5b4fc; background: rgba(99,102,241,0.08); }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .hero-title, .hero-subtitle { font-size: 40px; letter-spacing: -1px; }
          .stats-section { grid-template-columns: 1fr 1fr; padding: 32px 24px; }
          .factors-grid { grid-template-columns: 1fr 1fr; }
          .timeline { padding: 40px 24px; }
          .hero { padding: 48px 24px 40px; }
        }
        @media (max-width: 600px) {
          .hero-title, .hero-subtitle { font-size: 30px; }
          .milestone-grid { grid-template-columns: 1fr; }
          .outcomes-grid { grid-template-columns: 1fr; }
          .stats-section { grid-template-columns: 1fr; }
          .factors-grid { grid-template-columns: 1fr; }
          .phase-card-header { flex-direction: column; gap: 14px; }
        }
      `}</style>

      {/* ─── Navbar ─── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src="/onclusive-logo.png" alt="Onclusive" />
            <span>Onclusive</span>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <div className="hero">
        <div className="hero-label">Event Planning Dashboard</div>
        <h1 className="hero-title">OCPL 2026</h1>
        <div className="hero-subtitle">EVENT ROADMAP</div>
        <div className="hero-meta">
          {[
            { color: '#10B981', text: 'TURF' },
            { color: '#F59E0B', text: 'AUCTION & PLAYERS' },
            { color: '#EF4444', text: 'OTHER ARRANGEMENTS' },
            { color: '#8B5CF6', text: 'FOOD' },
          ].map(c => (
            <div className="hero-meta-item" key={c.text}>
              <div className="hero-meta-dot" style={{ background: c.color }} />
              <span className="hero-meta-text">{c.text}</span>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <button type="button" className="btn btn-outline" onClick={resetEditedDates}>Reset Dates</button>
          <button type="button" className="btn btn-outline" onClick={exportDatesAsCSV}>Export CSV</button>
          <button type="button" className="btn btn-accent" onClick={onNavigateToGantt}>View Gantt Chart →</button>
        </div>
      </div>

      {/* ─── Stats ─── */}
      <div className="stats-section">
        {[
          { num: '64', label: 'Days', sub: 'Feb 12 – Apr 16', editable: true },
          { num: '48', label: 'Total Tasks', sub: 'All categories', editable: false },
          { num: '4', label: 'Phases', sub: 'Foundation → Launch', editable: false },
          { num: '4', label: 'Categories', sub: 'Turf · Players · Other · Food', editable: false },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-number">{s.num}</div>
            <div className="stat-label">{s.label}</div>
            {s.editable
              ? <div className="stat-box-date">{s.sub}</div>
              : <div style={{ fontSize: '12px', color: '#3a3a56', marginTop: '4px' }}>{s.sub}</div>
            }
          </div>
        ))}
      </div>

      {/* ─── Timeline Phases ─── */}
      <div className="timeline">
        {phases.map((phase, pi) => (
          <div className="timeline-section" key={phase.num}>
            {pi > 0 && <div className="phase-connector" />}
            <div className="phase-card" style={{ '--phase-color': phase.color }}>

              {/* Phase Header */}
              <div className="phase-card-header" style={{ background: phase.bg }}>
                <div className="phase-num" style={{ background: `${phase.color}18`, color: phase.color }}>
                  {phase.num}
                </div>
                <div className="phase-info">
                  <div className="phase-tag" style={{ color: phase.color }}>{phase.title.toUpperCase()}</div>
                  <div className="phase-name">{phase.title}</div>
                  <div className="phase-duration">{phase.duration}</div>
                </div>
              </div>

              {/* Alert */}
              {phase.alert && (
                <div className="phase-alert">
                  <div className="phase-alert-dot" />
                  <div className="phase-alert-text">{phase.alert}</div>
                </div>
              )}

              {/* Milestones */}
              <div className="milestone-grid">
                {phase.milestones.map((m, mi) => (
                  <div
                    key={mi}
                    className={`milestone-card${m.key ? ' is-key' : ''}`}
                    style={{ '--phase-color': phase.color }}
                  >
                    <div
                      className="milestone-date"
                      style={{ color: m.key ? phase.color : '#3a3a58' }}
                    >
                      {m.date}
                    </div>
                    <div className={`milestone-name${m.key ? ' bold' : ''}`}>{m.name}</div>
                  </div>
                ))}
              </div>

              {/* Outcomes */}
              <div className="outcomes-grid">
                {phase.outcomes.map((o, oi) => (
                  <div className="outcome-row" key={oi}>
                    <div className="outcome-check" style={{ background: `${phase.color}18`, color: phase.color }}>✓</div>
                    <div className="outcome-text">{o}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ─── Success Factors ─── */}
      <div className="success-section">
        <div className="section-eyebrow">Critical Success Factors</div>
        <div className="factors-grid">
          <div className="factor-col">
            <div className="factor-title">Dependencies</div>
            <div className="factor-item">Team finalization <strong>before</strong> auction rules</div>
            <div className="factor-item">Auction completion <strong>before</strong> player list</div>
            <div className="factor-item">Vendors selected <strong>before</strong> payments</div>
            <div className="factor-item">Medical approvals <strong>before</strong> Apr 10</div>
            <div className="factor-item">All collections <strong>before</strong> Apr 16</div>
          </div>
          <div className="factor-col">
            <div className="factor-title">Weekly Checkpoints</div>
            <div className="factor-item"><strong>Feb 25</strong> — Teams locked in</div>
            <div className="factor-item"><strong>Mar 10</strong> — Auction completed</div>
            <div className="factor-item"><strong>Mar 24</strong> — Officials confirmed</div>
            <div className="factor-item"><strong>Apr 7</strong> — Payment deadlines met</div>
            <div className="factor-item"><strong>Apr 14</strong> — All arrangements final</div>
          </div>
          <div className="factor-col">
            <div className="factor-title">Critical Tasks</div>
            <div className="factor-item"><strong>Apr 7–10</strong> peak coordination (10+ tasks)</div>
            <div className="factor-item">Vendor tasting & approval — <strong>Apr 10</strong></div>
            <div className="factor-item">Jersey collection — <strong>Apr 9</strong></div>
            <div className="factor-item">Women travel arrangements — <strong>Apr 14</strong></div>
            <div className="factor-item">Final venue setup — <strong>Apr 15–16</strong></div>
          </div>
          <div className="factor-col">
            <div className="factor-title">Success Metrics</div>
            <div className="factor-item">100% vendor payments by <strong>Apr 17</strong></div>
            <div className="factor-item">All <strong>48 teams</strong> & players confirmed</div>
            <div className="factor-item">All equipment delivered by <strong>Apr 15</strong></div>
            <div className="factor-item">Food arrangements locked by <strong>Apr 10</strong></div>
            <div className="factor-item">Event-ready status on <strong>Apr 16</strong></div>
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div className="footer-bar">
        <div className="footer-left">OCPL 2026 Event Management Roadmap</div>
        <div className="footer-right">
          <span className="footer-date">February 12 – April 16, 2026</span>
          &nbsp;·&nbsp; 64 Days &nbsp;·&nbsp; 48 Tasks &nbsp;·&nbsp; 4 Phases &nbsp;·&nbsp; FCC TEAM
        </div>
      </div>

    </div>
  );
}
