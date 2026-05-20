import React, { useEffect, useRef } from 'react';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function OCPL2026DetailedRoadmap({ onNavigateToGantt, theme = 'dark', toggleTheme }) {
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
      num: '01', color: '#10B981',
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
      num: '02', color: '#F59E0B',
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
      num: '03', color: '#EF4444',
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
      num: '04', color: '#8B5CF6',
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
    <div ref={containerRef} data-theme={theme} style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Theme Variables ── */
        [data-theme="dark"] {
          --bg:           #0e0e1c;
          --nav-bg:       rgba(14,14,28,0.92);
          --nav-bd:       rgba(255,255,255,0.1);
          --card:         #161628;
          --card-h:       #1c1c38;
          --card-k:       #191932;
          --surface:      #191930;
          --outcome-bg:   #131326;
          --factor-bg:    #141428;
          --bd:           rgba(255,255,255,0.12);
          --bd-s:         rgba(255,255,255,0.07);
          --bd-m:         rgba(255,255,255,0.09);
          --tx1:          #f2f2fc;
          --tx2:          #c8c8e8;
          --tx3:          #9898c0;
          --tx4:          #7070a8;
          --tx5:          #505090;
          --hero-ol:      #2a2a58;
          --hero-stroke:  #38388a;
          --hero-lbl:     #8888b8;
          --conn:         rgba(255,255,255,0.15);
          --stats-bg:     rgba(255,255,255,0.05);
          --stat-bg:      #0e0e1c;
          --btn-tx:       #9898c8;
          --btn-bd:       #30305a;
          --btn-h-bg:     #1e1e3c;
          --btn-h-bd:     #44447a;
          --btn-h-tx:     #dcdcfa;
          --toggle-bg:    #1c1c34;
          --toggle-bd:    #34345c;
          --toggle-tx:    #9898c4;
          --toggle-h-bg:  #26263e;
        }
        [data-theme="light"] {
          --bg:           #f4f4fb;
          --nav-bg:       rgba(244,244,251,0.92);
          --nav-bd:       rgba(0,0,0,0.08);
          --card:         #ffffff;
          --card-h:       #f5f5ff;
          --card-k:       #eeeefc;
          --surface:      #ffffff;
          --outcome-bg:   #eeeef8;
          --factor-bg:    #f8f8ff;
          --bd:           rgba(0,0,0,0.08);
          --bd-s:         rgba(0,0,0,0.04);
          --bd-m:         rgba(0,0,0,0.06);
          --tx1:          #0a0a1a;
          --tx2:          #3838a8;
          --tx3:          #6060b0;
          --tx4:          #8080c0;
          --tx5:          #b0b0d8;
          --hero-ol:      #c0c0e0;
          --hero-stroke:  #c8c8e8;
          --hero-lbl:     #8080c0;
          --conn:         rgba(0,0,0,0.08);
          --stats-bg:     rgba(0,0,0,0.02);
          --stat-bg:      #ffffff;
          --btn-tx:       #4040a0;
          --btn-bd:       #c0c0e0;
          --btn-h-bg:     #e8e8ff;
          --btn-h-bd:     #a0a0d0;
          --btn-h-tx:     #1010a0;
          --toggle-bg:    #eeeef8;
          --toggle-bd:    #d0d0e8;
          --toggle-tx:    #5050a0;
          --toggle-h-bg:  #e0e0f4;
        }

        /* ── Navbar ── */
        .navbar {
          position: sticky; top: 0; z-index: 200;
          background: var(--nav-bg);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--nav-bd);
          padding: 0 40px;
          transition: background 0.3s, border-color 0.3s;
        }
        .navbar-inner {
          max-width: 1160px; margin: 0 auto;
          height: 62px; display: flex; align-items: center;
          justify-content: space-between;
        }
        .navbar-logo { display: flex; align-items: center; gap: 10px; }
        .navbar-logo img { height: 32px; width: 32px; border-radius: 6px; object-fit: contain; }
        .navbar-logo-text { display: flex; flex-direction: column; gap: 1px; }
        .navbar-brand {
          font-family: 'Poppins', sans-serif; font-size: 15px;
          font-weight: 600; color: var(--tx1); line-height: 1.1;
          transition: color 0.3s;
        }
        .navbar-sub {
          font-size: 10px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: var(--tx3);
          transition: color 0.3s;
        }
        .theme-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--toggle-bg); border: 1px solid var(--toggle-bd);
          color: var(--toggle-tx); cursor: pointer;
          transition: all 0.2s;
        }
        .theme-toggle:hover {
          background: var(--toggle-h-bg); color: var(--tx1);
        }

        /* ── Hero ── */
        .hero {
          max-width: 1160px; margin: 0 auto;
          padding: 72px 40px 60px;
          border-bottom: 1px solid var(--bd-m);
        }
        .hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--hero-lbl); margin-bottom: 20px;
        }
        .hero-label::before { content: ''; width: 20px; height: 1px; background: var(--hero-lbl); }
        .hero-title {
          font-family: 'Poppins', sans-serif; font-size: 62px; font-weight: 800;
          color: var(--tx1); line-height: 1.05; letter-spacing: -2px; margin-bottom: 4px;
          transition: color 0.3s;
        }
        .hero-subtitle {
          font-family: 'Poppins', sans-serif; font-size: 62px; font-weight: 800;
          color: var(--hero-ol); line-height: 1.05; letter-spacing: -2px;
          margin-bottom: 36px; -webkit-text-stroke: 1px var(--hero-stroke);
          transition: color 0.3s;
        }
        .hero-meta { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-bottom: 32px; }
        .hero-meta-item { display: flex; align-items: center; gap: 8px; }
        .hero-meta-dot { width: 6px; height: 6px; border-radius: 50%; }
        .hero-meta-text { font-size: 13px; color: var(--tx3); font-weight: 500; transition: color 0.3s; }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

        /* ── Buttons ── */
        .btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          border: 1px solid; transition: all 0.18s;
          font-family: 'Inter', sans-serif;
        }
        .btn-outline { color: var(--btn-tx); border-color: var(--btn-bd); background: transparent; }
        .btn-outline:hover { color: var(--btn-h-tx); border-color: var(--btn-h-bd); background: var(--btn-h-bg); }
        .btn-accent { color: #fff; border-color: transparent; background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        .btn-accent:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }

        /* ── Stats ── */
        .stats-wrap {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--stats-bg);
          border-bottom: 1px solid var(--bd-m);
        }
        .stat-card {
          background: var(--stat-bg); padding: 32px 28px;
          display: flex; flex-direction: column; gap: 6px;
          transition: background 0.3s;
        }
        .stat-number {
          font-family: 'Poppins', sans-serif; font-size: 46px; font-weight: 800;
          color: var(--tx1); line-height: 1; letter-spacing: -2px; transition: color 0.3s;
        }
        .stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--tx4); transition: color 0.3s;
        }
        .stat-box-date {
          font-size: 12px; color: var(--tx4); margin-top: 4px;
          cursor: text; border-radius: 4px; padding: 2px 4px; display: inline-block;
          transition: background 0.15s, color 0.15s;
        }
        .stat-box-date[contenteditable='true']:hover { background: var(--card-h); color: var(--tx2); }
        .stat-box-date[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; color: #a5b4fc; background: rgba(99,102,241,0.1); }

        /* ── Timeline & Phase ── */
        .timeline { max-width: 1160px; margin: 0 auto; padding: 64px 40px; }
        .phase-connector { width: 1px; height: 36px; background: linear-gradient(to bottom, var(--conn), transparent); margin: 0 0 0 30px; }
        .phase-card { border: 1px solid var(--bd); border-radius: 14px; overflow: hidden; transition: border-color 0.3s; }
        .phase-card-header {
          padding: 24px 28px; border-bottom: 1px solid var(--bd-m);
          display: flex; align-items: flex-start; gap: 18px;
          background: var(--surface); transition: background 0.3s;
        }
        .phase-badge {
          font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 800;
          letter-spacing: 1.5px; width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .phase-info { flex: 1; }
        .phase-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 5px;
        }
        .phase-name {
          font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 700;
          color: var(--tx1); margin-bottom: 6px; line-height: 1.2; transition: color 0.3s;
        }
        .phase-duration {
          font-size: 12px; color: var(--tx3); cursor: text;
          border-radius: 4px; padding: 2px 4px; display: inline-block;
          transition: background 0.15s, color 0.15s;
        }
        .phase-duration[contenteditable='true']:hover { background: var(--card-h); color: var(--tx2); }
        .phase-duration[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; color: #a5b4fc; background: rgba(99,102,241,0.1); }

        /* ── Alert ── */
        .phase-alert {
          margin: 18px 28px 0; padding: 11px 16px; border-radius: 8px;
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.18);
        }
        .phase-alert-dot { width: 6px; height: 6px; border-radius: 50%; background: #ef4444; flex-shrink: 0; margin-top: 4px; }
        .phase-alert-text { font-size: 12px; color: #f87171; font-weight: 500; line-height: 1.6; }

        /* ── Milestones ── */
        .milestone-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--bd-s);
          margin-top: 20px; border-top: 1px solid var(--bd-m);
        }
        .milestone-card {
          background: var(--card); padding: 18px 22px;
          transition: background 0.2s; border-left: 2px solid transparent;
        }
        .milestone-card:hover { background: var(--card-h); }
        .milestone-card.is-key { border-left-color: var(--phase-color); background: var(--card-k); }
        .milestone-date {
          font-size: 10px; font-weight: 700; letter-spacing: 0.8px;
          text-transform: uppercase; margin-bottom: 8px; cursor: text;
          border-radius: 3px; padding: 1px 2px; display: inline-block;
          transition: background 0.15s, color 0.15s;
        }
        .milestone-date[contenteditable='true']:hover { background: var(--bd-s); }
        .milestone-date[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; background: rgba(99,102,241,0.1); color: #a5b4fc; }
        .milestone-name { font-size: 13px; font-weight: 500; color: var(--tx2); line-height: 1.45; transition: color 0.3s; }
        .milestone-name.bold { color: var(--tx1); font-weight: 600; }

        /* ── Outcomes ── */
        .outcomes-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 10px; padding: 22px 28px;
          border-top: 1px solid var(--bd-m);
          background: var(--outcome-bg); transition: background 0.3s;
        }
        .outcome-row { display: flex; align-items: flex-start; gap: 10px; }
        .outcome-check {
          width: 18px; height: 18px; border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px; font-size: 10px; font-weight: 700;
        }
        .outcome-text { font-size: 12px; color: var(--tx3); line-height: 1.5; transition: color 0.3s; }

        /* ── Success Section ── */
        .success-section { max-width: 1160px; margin: 0 auto 80px; padding: 0 40px; }
        .section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--tx4); margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px; transition: color 0.3s;
        }
        .section-eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--bd-m); }
        .factors-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--bd-s);
          border: 1px solid var(--bd); border-radius: 12px; overflow: hidden;
        }
        .factor-col { background: var(--factor-bg); padding: 24px 22px; transition: background 0.3s; }
        .factor-title {
          font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
          color: var(--tx1); margin-bottom: 16px; padding-bottom: 12px;
          border-bottom: 1px solid var(--bd-m); transition: color 0.3s;
        }
        .factor-item { font-size: 12px; color: var(--tx3); padding: 6px 0; border-bottom: 1px solid var(--bd-s); line-height: 1.5; transition: color 0.3s; }
        .factor-item:last-child { border-bottom: none; padding-bottom: 0; }
        .factor-item strong { color: var(--tx2); font-weight: 600; transition: color 0.3s; }

        /* ── Footer ── */
        .footer-bar {
          border-top: 1px solid var(--bd-m); padding: 28px 40px;
          max-width: 1160px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-left { font-size: 13px; font-weight: 600; color: var(--tx4); transition: color 0.3s; }
        .footer-right { font-size: 12px; color: var(--tx4); transition: color 0.3s; }
        .footer-date {
          display: inline; cursor: text; border-radius: 3px; padding: 1px 3px;
          transition: background 0.15s, color 0.15s;
        }
        .footer-date[contenteditable='true']:hover { background: var(--card-h); color: var(--tx2); }
        .footer-date[contenteditable='true']:focus { outline: 1px solid #6366f1; outline-offset: 2px; color: #a5b4fc; background: rgba(99,102,241,0.1); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-title, .hero-subtitle { font-size: 40px; letter-spacing: -1px; }
          .stats-wrap { grid-template-columns: 1fr 1fr; }
          .factors-grid { grid-template-columns: 1fr 1fr; }
          .timeline { padding: 40px 20px; }
          .hero { padding: 48px 20px 40px; }
          .navbar { padding: 0 20px; }
          .success-section { padding: 0 20px; }
        }
        @media (max-width: 600px) {
          .hero-title, .hero-subtitle { font-size: 28px; letter-spacing: -0.5px; }
          .milestone-grid, .outcomes-grid, .stats-wrap, .factors-grid { grid-template-columns: 1fr; }
          .phase-card-header { flex-wrap: wrap; }
          .footer-bar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src="/onclusive-logo.png" alt="Onclusive" />
            <div className="navbar-logo-text">
              <span className="navbar-brand">Onclusive</span>
              <span className="navbar-sub">FCC Team</span>
            </div>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="hero">
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

      {/* ── Stats ── */}
      <div className="stats-wrap">
        {[
          { num: '64', label: 'Days', sub: 'Feb 12 – Apr 16', editable: true },
          { num: '48', label: 'Total Tasks', sub: 'All categories', editable: false },
          { num: '4',  label: 'Phases',      sub: 'Foundation → Launch', editable: false },
          { num: '4',  label: 'Categories',  sub: 'Turf · Players · Other · Food', editable: false },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-number">{s.num}</div>
            <div className="stat-label">{s.label}</div>
            {s.editable
              ? <div className="stat-box-date">{s.sub}</div>
              : <div style={{ fontSize: '12px', color: 'var(--tx4)', marginTop: '4px' }}>{s.sub}</div>
            }
          </div>
        ))}
      </div>

      {/* ── Phases ── */}
      <div className="timeline">
        {phases.map((phase, pi) => (
          <div key={phase.num} style={{ marginBottom: '60px' }}>
            {pi > 0 && <div className="phase-connector" />}
            <div className="phase-card" style={{ '--phase-color': phase.color }}>
              <div className="phase-card-header" style={{ background: `color-mix(in srgb, var(--surface) 96%, ${phase.color} 4%)` }}>
                <div className="phase-badge" style={{ background: `${phase.color}18`, color: phase.color }}>{phase.num}</div>
                <div className="phase-info">
                  <div className="phase-tag" style={{ color: phase.color }}>{phase.title.toUpperCase()}</div>
                  <div className="phase-name">{phase.title}</div>
                  <div className="phase-duration">{phase.duration}</div>
                </div>
              </div>
              {phase.alert && (
                <div className="phase-alert">
                  <div className="phase-alert-dot" />
                  <div className="phase-alert-text">{phase.alert}</div>
                </div>
              )}
              <div className="milestone-grid">
                {phase.milestones.map((m, mi) => (
                  <div key={mi} className={`milestone-card${m.key ? ' is-key' : ''}`} style={{ '--phase-color': phase.color }}>
                    <div className="milestone-date" style={{ color: m.key ? phase.color : 'var(--tx4)' }}>{m.date}</div>
                    <div className={`milestone-name${m.key ? ' bold' : ''}`}>{m.name}</div>
                  </div>
                ))}
              </div>
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

      {/* ── Success Factors ── */}
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
            <div className="factor-item"><strong>Apr 7</strong>  — Payment deadlines met</div>
            <div className="factor-item"><strong>Apr 14</strong> — All arrangements final</div>
          </div>
          <div className="factor-col">
            <div className="factor-title">Critical Tasks</div>
            <div className="factor-item"><strong>Apr 7–10</strong> peak coordination (10+ tasks)</div>
            <div className="factor-item">Vendor tasting & approval — <strong>Apr 10</strong></div>
            <div className="factor-item">Jersey collection — <strong>Apr 9</strong></div>
            <div className="factor-item">Women travel — <strong>Apr 14</strong></div>
            <div className="factor-item">Final venue setup — <strong>Apr 15–16</strong></div>
          </div>
          <div className="factor-col">
            <div className="factor-title">Success Metrics</div>
            <div className="factor-item">100% vendor payments by <strong>Apr 17</strong></div>
            <div className="factor-item">All <strong>48 teams</strong> & players confirmed</div>
            <div className="factor-item">Equipment delivered by <strong>Apr 15</strong></div>
            <div className="factor-item">Food locked by <strong>Apr 10</strong></div>
            <div className="factor-item">Event-ready status on <strong>Apr 16</strong></div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
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
