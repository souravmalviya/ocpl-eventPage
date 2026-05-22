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

/* ── Date parser: "Mar 10" → "10/3/26", "Feb 12 – 18" → {start,end} ── */
const MMAP = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };
function parseRoadmapDate(txt) {
  const t = (txt || '').trim();
  const rng = t.match(/([A-Za-z]+)\s+(\d+)\s*[–\-]+\s*(\d+)/);
  if (rng) { const m = MMAP[rng[1].toLowerCase()]; if (m) return { start:`${rng[2]}/${m}/26`, end:`${rng[3]}/${m}/26` }; }
  const sin = t.match(/([A-Za-z]+)\s+(\d+)/);
  if (sin) { const m = MMAP[sin[1].toLowerCase()]; if (m) return { start:`${sin[2]}/${m}/26`, end:`${sin[2]}/${m}/26` }; }
  return null;
}

export default function OCPL2026DetailedRoadmap({ onNavigateToGantt, theme = 'dark', toggleTheme, updateGanttDates }) {
  const containerRef   = useRef(null);
  const defaultDatesRef = useRef({});
  const DATE_KEY = 'ocpl2026-editable-dates';

  const phases = [
    {
      num:'01', color:'#10B981', bg:'rgba(16,185,129,0.08)', label:'FOUNDATION',
      title:'Foundation Phase',
      duration:'February 12 – 25, 2026  ·  14 Days',
      milestones:[
        { date:'Feb 12 – 18', name:'Turf Scouting & Evaluation',   ganttIds:[1]    },
        { date:'Feb 18',      name:'Turf Booking (Advance)',        ganttIds:[2]    },
        { date:'Feb 23 – 25', name:'Owners & Captains Finalized',   ganttIds:[9]    },
        { date:'Feb 25',      name:'All Teams Confirmed',           key:true        },
      ],
      outcomes:['Venue confirmed and booked','All team owners finalized (48+ Players)','All captains appointed','Budget allocated and locked'],
    },
    {
      num:'02', color:'#F59E0B', bg:'rgba(245,158,11,0.08)', label:'PLANNING',
      title:'Planning & Auction Phase',
      duration:'February 26 – March 24, 2026  ·  27 Days',
      milestones:[
        { date:'Mar 2 – 4',   name:'Logos & Banners Finalized',        ganttIds:[10]    },
        { date:'Mar 3 – 6',   name:'Auction Rules Finalized',           ganttIds:[11]    },
        { date:'Mar 8',       name:'Final Player List Released',         ganttIds:[13]    },
        { date:'Mar 10',      name:'Auction Day — Major Milestone',      key:true, ganttIds:[15] },
        { date:'Mar 12+',     name:'Email & Marketing Campaign',         ganttIds:[20]    },
        { date:'Mar 13 – 18', name:'Media Vendors Finalized',            ganttIds:[21,22] },
        { date:'Mar 17 – 20', name:'Audience Form Rollout',              ganttIds:[16]    },
        { date:'Mar 24',      name:'Phase Completion'                                    },
      ],
      outcomes:['Auction successfully executed','All teams and players finalized','Media teams and photographers hired','Marketing campaign in full swing'],
    },
    {
      num:'03', color:'#EF4444', bg:'rgba(239,68,68,0.08)', label:'PRODUCTION',
      title:'Production & Confirmation',
      duration:'March 25 – April 10, 2026  ·  17 Days',
      alert:'Apr 7–10 has 10+ simultaneous tasks. Maximum coordination required.',
      milestones:[
        { date:'Mar 24',      name:'Umpires & Scorers Confirmed',        ganttIds:[24,25] },
        { date:'Mar 28 – 31', name:'Trophies Order (Advance)',            ganttIds:[28]    },
        { date:'Apr 4 – 6',   name:'Medical Supplies (Advance)',          ganttIds:[29]    },
        { date:'Apr 6 – 8',   name:'Food Vendors Selected',               ganttIds:[36]    },
        { date:'Apr 7 – 10',  name:'Peak Coordination Window',            key:true         },
        { date:'Apr 9',       name:'Jerseys Collection',                  ganttIds:[33]    },
        { date:'Apr 10',      name:'Food Tasting & Approval',             ganttIds:[41]    },
        { date:'Apr 10',      name:'Production Phase Complete',           key:true         },
      ],
      outcomes:['All equipment sourced and confirmed','Officials (umpires, scorers) appointed','Trophies, medical & jerseys secured','Food arrangements locked and tested','All advance payments completed'],
    },
    {
      num:'04', color:'#8B5CF6', bg:'rgba(139,92,246,0.08)', label:'LAUNCH',
      title:'Final Setup & Launch',
      duration:'April 11 – 16, 2026  ·  6 Days',
      milestones:[
        { date:'Apr 11',      name:'Balls (36 units) Ordered',            ganttIds:[34] },
        { date:'Apr 13',      name:'Remote Players Final Setup',           ganttIds:[17] },
        { date:'Apr 14',      name:'Women Travel Arrangements',            ganttIds:[19] },
        { date:'Apr 16',      name:'Pooja Material Ordered',               ganttIds:[35] },
        { date:'Apr 15 – 16', name:'Final Venue Setup & Decoration',       ganttIds:[7]  },
        { date:'Apr 16',      name:'Event Ready',                          key:true      },
      ],
      outcomes:['Venue completely set up and decorated','All materials delivered and in place','All arrangements 100% confirmed','Backup plans activated','Ready for event execution'],
    },
  ];

  /* ── contenteditable + localStorage persistence ── */
  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll('.milestone-date,.phase-duration,.stat-box-date,.footer-date');
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(DATE_KEY) || '{}'); } catch {}
    els.forEach((el, i) => {
      const id = `d${i}`;
      el.setAttribute('data-did', id);
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');
      el.setAttribute('title', 'Click to edit');
      defaultDatesRef.current[id] = el.textContent || '';
      if (typeof saved[id] === 'string') el.textContent = saved[id];
    });
    const persist = () => {
      const cur = {};
      containerRef.current.querySelectorAll('.milestone-date,.phase-duration,.stat-box-date,.footer-date')
        .forEach(el => { const id = el.getAttribute('data-did'); if (id) cur[id] = (el.textContent||'').trim(); });
      localStorage.setItem(DATE_KEY, JSON.stringify(cur));
    };
    const syncGantt = (e) => {
      const el = e.target;
      if (!el.classList.contains('milestone-date')) return;
      const raw = el.getAttribute('data-gids');
      if (!raw || !updateGanttDates) return;
      const parsed = parseRoadmapDate(el.textContent || '');
      if (parsed) updateGanttDates(raw.split(',').map(Number), parsed);
    };
    els.forEach(el => { el.addEventListener('input', persist); el.addEventListener('input', syncGantt); });
    return () => els.forEach(el => { el.removeEventListener('input', persist); el.removeEventListener('input', syncGantt); });
  }, [updateGanttDates]);

  const resetDates = () => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll('.milestone-date,.phase-duration,.stat-box-date,.footer-date')
      .forEach(el => { const id = el.getAttribute('data-did'); if (id && defaultDatesRef.current[id] != null) el.textContent = defaultDatesRef.current[id]; });
    localStorage.removeItem(DATE_KEY);
  };

  const exportCSV = () => {
    if (!containerRef.current) return;
    const rows = Array.from(containerRef.current.querySelectorAll('.milestone-date,.phase-duration,.stat-box-date,.footer-date'))
      .map(el => { const id = el.getAttribute('data-did')||''; const cur = (el.textContent||'').trim(); const orig = defaultDatesRef.current[id]||''; return [id,orig,cur,cur!==orig]; });
    const e = v => `"${String(v).replace(/"/g,'""')}"`;
    const csv = [['id','original','current','edited'],...rows].map(r=>r.map(e).join(',')).join('\n');
    const a = Object.assign(document.createElement('a'),{ href:URL.createObjectURL(new Blob([csv],{type:'text/csv'})), download:`ocpl-dates-${new Date().toISOString().slice(0,10)}.csv` });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <div ref={containerRef} data-theme={theme} style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'Inter,sans-serif', transition:'background 0.3s,color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        /* ── Theme Tokens ── */
        [data-theme="dark"] {
          --bg:           #0a0a14;
          --nav-bg:       rgba(10,10,20,0.94);
          --nav-bd:       rgba(255,255,255,0.08);
          --card:         #0f0f1e;
          --card-h:       #141428;
          --card-k:       #131325;
          --surface:      #12121f;
          --outcome-bg:   #0d0d1c;
          --factor-bg:    #0d0d1a;
          --hero-bg:      rgba(16,185,129,0.04);
          --bd:           rgba(255,255,255,0.10);
          --bd-s:         rgba(255,255,255,0.05);
          --bd-m:         rgba(255,255,255,0.08);
          --tx1:          #f0f0fc;
          --tx2:          #c8c8e8;
          --tx3:          #9898c0;
          --tx4:          #6868a0;
          --tx5:          #404080;
          --hero-lbl:     #8888b8;
          --conn:         rgba(255,255,255,0.12);
          --stats-bg:     #0c0c1c;
          --stat-div:     rgba(255,255,255,0.08);
          --btn-tx:       #8888c8;
          --btn-bd:       #28285a;
          --btn-h-bg:     #181838;
          --btn-h-bd:     #3c3c78;
          --btn-h-tx:     #d4d4f8;
          --toggle-bg:    #14142a;
          --toggle-bd:    #28285a;
          --toggle-tx:    #8888c4;
          --toggle-h:     #1e1e38;
          --sync-badge:   rgba(16,185,129,0.12);
          --sync-bd:      rgba(16,185,129,0.3);
          --sync-tx:      #34d399;
          --alert-bg:     rgba(239,68,68,0.07);
          --alert-bd:     rgba(239,68,68,0.2);
        }
        [data-theme="light"] {
          --bg:           #f2f2fa;
          --nav-bg:       rgba(242,242,250,0.94);
          --nav-bd:       rgba(0,0,0,0.07);
          --card:         #ffffff;
          --card-h:       #f5f5ff;
          --card-k:       #eeeeff;
          --surface:      #ffffff;
          --outcome-bg:   #f0f0fc;
          --factor-bg:    #fafafe;
          --hero-bg:      rgba(16,185,129,0.03);
          --bd:           rgba(0,0,0,0.08);
          --bd-s:         rgba(0,0,0,0.04);
          --bd-m:         rgba(0,0,0,0.06);
          --tx1:          #08081a;
          --tx2:          #2a2a90;
          --tx3:          #5050a8;
          --tx4:          #7070b8;
          --tx5:          #a0a0cc;
          --hero-lbl:     #7070a8;
          --conn:         rgba(0,0,0,0.07);
          --stats-bg:     #e8e8f8;
          --stat-div:     rgba(0,0,0,0.08);
          --btn-tx:       #3030a0;
          --btn-bd:       #b0b0e0;
          --btn-h-bg:     #e4e4ff;
          --btn-h-bd:     #8080c0;
          --btn-h-tx:     #0808a0;
          --toggle-bg:    #eaeaf8;
          --toggle-bd:    #c8c8e8;
          --toggle-tx:    #4040a0;
          --toggle-h:     #dcdcf4;
          --sync-badge:   rgba(16,185,129,0.1);
          --sync-bd:      rgba(16,185,129,0.25);
          --sync-tx:      #059669;
          --alert-bg:     rgba(239,68,68,0.06);
          --alert-bd:     rgba(239,68,68,0.18);
        }

        /* ── Navbar ── */
        .navbar {
          position:sticky; top:0; z-index:200;
          background:var(--nav-bg); backdrop-filter:blur(20px);
          border-bottom:1px solid var(--nav-bd);
          padding:0 40px; transition:background 0.3s,border-color 0.3s;
        }
        .navbar-inner {
          max-width:1180px; margin:0 auto; height:60px;
          display:flex; align-items:center; justify-content:space-between;
        }
        .navbar-logo { display:flex; align-items:center; gap:10px; }
        .navbar-logo img { height:30px; width:30px; border-radius:6px; object-fit:contain; }
        .navbar-logo-text { display:flex; flex-direction:column; gap:1px; }
        .navbar-brand {
          font-family:'Poppins',sans-serif; font-size:14px; font-weight:700;
          color:var(--tx1); line-height:1.1; transition:color 0.3s;
        }
        .navbar-sub {
          font-size:9px; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; color:var(--tx4); transition:color 0.3s;
        }
        .theme-toggle {
          display:flex; align-items:center; justify-content:center;
          width:34px; height:34px; border-radius:8px;
          background:var(--toggle-bg); border:1px solid var(--toggle-bd);
          color:var(--toggle-tx); cursor:pointer; transition:all 0.2s;
        }
        .theme-toggle:hover { background:var(--toggle-h); color:var(--tx1); }

        /* ── Hero ── */
        .hero {
          position:relative; overflow:hidden;
          padding:70px 40px 56px; border-bottom:1px solid var(--bd);
        }
        .hero::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 70% 60% at 20% 50%, var(--hero-bg), transparent 70%);
          pointer-events:none;
        }
        .hero-inner { max-width:1180px; margin:0 auto; position:relative; display:flex; gap:48px; align-items:flex-start; }
        .hero-left { flex:1; }
        .hero-right { flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; gap:20px; padding-top:12px; }
        .hero-eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          font-size:10px; font-weight:700; letter-spacing:3px;
          text-transform:uppercase; color:var(--hero-lbl); margin-bottom:18px;
        }
        .hero-eyebrow::before { content:''; width:28px; height:1px; background:var(--hero-lbl); }
        .hero-headline {
          font-family:'Poppins',sans-serif; font-weight:900;
          line-height:0.88; letter-spacing:-4px; margin-bottom:0;
          color:var(--tx1); transition:color 0.3s;
        }
        .hero-headline-main { font-size:96px; display:block; }
        .hero-headline-year {
          font-size:96px; display:block;
          background:linear-gradient(135deg,#10B981 0%,#34d399 60%,#6ee7b7 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }
        .hero-rule {
          display:flex; align-items:center; gap:16px;
          margin:20px 0 28px;
        }
        .hero-rule-line { width:60px; height:2px; background:var(--bd); flex-shrink:0; }
        .hero-rule-text {
          font-size:11px; font-weight:700; letter-spacing:5px;
          text-transform:uppercase; color:var(--tx3); white-space:nowrap;
        }
        .hero-rule-flex { flex:1; height:1px; background:var(--bd-s); }
        .hero-tags { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; }
        .hero-tag {
          display:inline-flex; align-items:center; gap:6px;
          padding:5px 12px; border-radius:20px;
          font-size:10px; font-weight:700; letter-spacing:0.5px;
          border:1px solid; white-space:nowrap; text-transform:uppercase;
        }
        .hero-tag-dot { width:6px; height:6px; border-radius:50%; }
        .hero-actions { display:flex; gap:8px; flex-wrap:wrap; }
        .btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 16px; border-radius:8px;
          font-size:12px; font-weight:600; cursor:pointer;
          border:1px solid; transition:all 0.18s; font-family:'Inter',sans-serif;
          text-transform:uppercase; letter-spacing:0.3px;
        }
        .btn-outline { color:var(--btn-tx); border-color:var(--btn-bd); background:transparent; }
        .btn-outline:hover { color:var(--btn-h-tx); border-color:var(--btn-h-bd); background:var(--btn-h-bg); }
        .btn-accent { color:#fff; border-color:transparent; background:linear-gradient(135deg,#10B981,#059669); }
        .btn-accent:hover { opacity:0.85; transform:translateY(-1px); box-shadow:0 8px 24px rgba(16,185,129,0.28); }
        .sync-badge {
          display:inline-flex; align-items:center; gap:6px;
          padding:5px 12px; border-radius:20px;
          background:var(--sync-badge); border:1px solid var(--sync-bd);
          font-size:10px; font-weight:700; color:var(--sync-tx);
          letter-spacing:0.5px; text-transform:uppercase;
        }
        .sync-dot { width:6px; height:6px; border-radius:50%; background:var(--sync-tx); animation:pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* ── Hero Stats (right side) ── */
        .hero-stats { display:flex; flex-direction:column; gap:0; }
        .hero-stat-item {
          display:flex; align-items:baseline; gap:8px;
          padding:10px 0; border-bottom:1px solid var(--bd-s);
        }
        .hero-stat-item:last-child { border-bottom:none; }
        .hero-stat-num {
          font-family:'Poppins',sans-serif; font-size:32px; font-weight:900;
          line-height:1; letter-spacing:-1px; color:var(--tx1); transition:color 0.3s;
        }
        .hero-stat-lbl {
          font-size:9px; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; color:var(--tx4); transition:color 0.3s;
        }
        .hero-stat-sub { font-size:10px; color:var(--tx4); margin-top:1px; transition:color 0.3s; }

        /* ── Phase Section ── */
        .phase-section { max-width:1180px; margin:0 auto; padding:60px 40px; }
        .phase-section-header {
          display:flex; align-items:center; gap:16px; margin-bottom:48px;
        }
        .phase-section-title {
          font-size:10px; font-weight:700; letter-spacing:3px;
          text-transform:uppercase; color:var(--tx4); transition:color 0.3s; white-space:nowrap;
        }
        .phase-section-line { flex:1; height:1px; background:var(--bd-m); }

        /* ── Phase Row (side-by-side layout) ── */
        .phase-row { display:flex; gap:0; margin-bottom:4px; }
        .phase-spine {
          width:72px; flex-shrink:0;
          display:flex; flex-direction:column; align-items:center;
          padding-top:22px;
        }
        .phase-num-circle {
          width:44px; height:44px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-family:'Poppins',sans-serif; font-size:12px; font-weight:900;
          letter-spacing:0.5px; flex-shrink:0;
          border:2px solid;
        }
        .phase-spine-line {
          width:2px; flex:1; min-height:32px; margin-top:10px;
        }
        .phase-card {
          flex:1; border-radius:0 14px 14px 0; overflow:hidden;
          border:1px solid var(--bd); border-left:3px solid;
          transition:border-color 0.3s; position:relative;
        }
        .phase-card-ghost {
          position:absolute; top:-8px; right:16px;
          font-family:'Poppins',sans-serif; font-size:100px; font-weight:900;
          line-height:1; letter-spacing:-3px; pointer-events:none;
          opacity:0.035; color:var(--tx1); transition:color 0.3s;
        }
        .phase-header {
          padding:22px 26px 18px; background:var(--surface);
          border-bottom:1px solid var(--bd-m); transition:background 0.3s;
        }
        .phase-tag-line {
          font-size:9px; font-weight:800; letter-spacing:2px;
          text-transform:uppercase; margin-bottom:6px;
        }
        .phase-name {
          font-family:'Poppins',sans-serif; font-size:19px; font-weight:700;
          color:var(--tx1); margin-bottom:5px; transition:color 0.3s;
        }
        .phase-duration {
          font-size:11px; color:var(--tx3); cursor:text;
          border-radius:3px; padding:1px 3px; display:inline-block;
          transition:background 0.15s,color 0.15s;
        }
        .phase-duration[contenteditable='true']:hover { background:var(--card-h); color:var(--tx2); }
        .phase-duration[contenteditable='true']:focus { outline:1px solid #10B981; outline-offset:2px; background:rgba(16,185,129,0.08); color:#34d399; }

        /* ── Alert ── */
        .phase-alert {
          margin:16px 26px 0; padding:10px 14px; border-radius:8px;
          display:flex; align-items:flex-start; gap:9px;
          background:var(--alert-bg); border:1px solid var(--alert-bd);
        }
        .phase-alert-icon { color:#f87171; flex-shrink:0; margin-top:1px; font-size:13px; }
        .phase-alert-text { font-size:11px; color:#f87171; font-weight:500; line-height:1.55; }

        /* ── Milestone Grid ── */
        .milestone-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:0; border-top:1px solid var(--bd-m);
          background:var(--bd-s);
        }
        .milestone-cell {
          background:var(--card); padding:14px 20px;
          border-right:1px solid var(--bd-s); border-bottom:1px solid var(--bd-s);
          transition:background 0.2s; position:relative;
        }
        .milestone-cell:hover { background:var(--card-h); }
        .milestone-cell.is-key {
          background:var(--card-k);
        }
        .milestone-cell.is-key::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:3px; background:var(--cell-accent);
        }
        .milestone-date {
          font-size:9px; font-weight:800; letter-spacing:1px;
          text-transform:uppercase; margin-bottom:5px; cursor:text;
          border-radius:3px; padding:1px 3px; display:inline-block;
          transition:background 0.15s,color 0.15s;
        }
        .milestone-date[contenteditable='true']:hover { background:var(--bd-s); }
        .milestone-date[contenteditable='true']:focus { outline:1px solid #10B981; outline-offset:2px; background:rgba(16,185,129,0.08); color:#34d399; }
        .milestone-name { font-size:12px; font-weight:500; color:var(--tx2); line-height:1.4; transition:color 0.3s; }
        .milestone-name.bold { color:var(--tx1); font-weight:700; }
        .milestone-key-pip {
          display:inline-block; width:6px; height:6px; border-radius:50%;
          margin-left:6px; vertical-align:middle;
        }

        /* ── Outcomes ── */
        .outcomes-wrap {
          padding:18px 26px; background:var(--outcome-bg);
          border-top:1px solid var(--bd-m); transition:background 0.3s;
        }
        .outcomes-title {
          font-size:9px; font-weight:800; letter-spacing:2px;
          text-transform:uppercase; color:var(--tx4); margin-bottom:12px;
          transition:color 0.3s;
        }
        .outcomes-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .outcome-row { display:flex; align-items:flex-start; gap:9px; }
        .outcome-check {
          width:16px; height:16px; border-radius:4px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-size:9px; font-weight:900; margin-top:1px;
        }
        .outcome-text { font-size:11px; color:var(--tx3); line-height:1.5; transition:color 0.3s; }

        /* ── Phase connector ── */
        .phase-connector { display:flex; align-items:stretch; }
        .connector-spine { width:72px; flex-shrink:0; display:flex; justify-content:center; }
        .connector-line { width:2px; height:36px; background:linear-gradient(to bottom, var(--conn), transparent); }

        /* ── Success Factors ── */
        .factors-section { max-width:1180px; margin:0 auto 0; padding:0 40px 72px; }
        .section-header {
          display:flex; align-items:center; gap:16px; margin-bottom:28px;
        }
        .section-title {
          font-size:10px; font-weight:700; letter-spacing:3px;
          text-transform:uppercase; color:var(--tx4); white-space:nowrap; transition:color 0.3s;
        }
        .section-line { flex:1; height:1px; background:var(--bd-m); }
        .factors-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          border:1px solid var(--bd); border-radius:12px; overflow:hidden;
        }
        .factor-col {
          padding:22px 20px; background:var(--factor-bg);
          border-right:1px solid var(--bd-s); transition:background 0.3s;
        }
        .factor-col:last-child { border-right:none; }
        .factor-heading {
          font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
          color:var(--tx1); margin-bottom:14px; padding-bottom:11px;
          border-bottom:1px solid var(--bd-m); transition:color 0.3s;
        }
        .factor-item {
          font-size:11px; color:var(--tx3); padding:5px 0;
          border-bottom:1px solid var(--bd-s); line-height:1.5; transition:color 0.3s;
        }
        .factor-item:last-child { border-bottom:none; padding-bottom:0; }
        .factor-item strong { color:var(--tx2); font-weight:600; transition:color 0.3s; }

        /* ── Footer ── */
        .footer {
          border-top:1px solid var(--bd-m); padding:24px 40px;
          max-width:1180px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;
        }
        .footer-l { font-size:12px; font-weight:600; color:var(--tx4); transition:color 0.3s; }
        .footer-r { font-size:11px; color:var(--tx4); transition:color 0.3s; }
        .footer-date { cursor:text; border-radius:3px; padding:1px 3px; transition:background 0.15s,color 0.15s; }
        .footer-date[contenteditable='true']:hover { background:var(--card-h); color:var(--tx2); }
        .footer-date[contenteditable='true']:focus { outline:1px solid #10B981; outline-offset:2px; color:#34d399; background:rgba(16,185,129,0.08); }
        .stat-box-date {
          font-size:10px; color:var(--tx4); cursor:text;
          border-radius:3px; padding:1px 3px; display:inline-block; transition:background 0.15s,color 0.15s;
        }
        .stat-box-date[contenteditable='true']:hover { background:var(--card-h); color:var(--tx2); }
        .stat-box-date[contenteditable='true']:focus { outline:1px solid #10B981; outline-offset:2px; color:#34d399; background:rgba(16,185,129,0.08); }

        /* ── Responsive ── */
        @media(max-width:900px){
          .hero-inner { flex-direction:column; gap:28px; }
          .hero-right { align-items:flex-start; flex-direction:row; flex-wrap:wrap; }
          .hero-stats { flex-direction:row; flex-wrap:wrap; gap:16px; }
          .hero-stat-item { border-bottom:none; padding:0; }
          .hero-headline-main,.hero-headline-year { font-size:64px; letter-spacing:-2px; }
          .factors-grid { grid-template-columns:1fr 1fr; }
          .milestone-grid { grid-template-columns:1fr; }
          .outcomes-grid { grid-template-columns:1fr; }
          .hero,.phase-section,.factors-section,.footer { padding-left:20px; padding-right:20px; }
          .phase-spine { width:48px; }
          .phase-card-ghost { font-size:70px; }
        }
        @media(max-width:600px){
          .hero-headline-main,.hero-headline-year { font-size:48px; letter-spacing:-1.5px; }
          .factors-grid { grid-template-columns:1fr; }
          .hero-rule-text { letter-spacing:3px; }
          .phase-spine { display:none; }
          .phase-card { border-radius:12px; border-left-width:1px; }
          .phase-card::before { display:none; }
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
          <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">Onclusive Cricket Premier League</div>
            <div className="hero-headline">
              <span className="hero-headline-main">OCPL</span>
              <span className="hero-headline-year">2026</span>
            </div>
            <div className="hero-rule">
              <div className="hero-rule-line" />
              <span className="hero-rule-text">Event Roadmap</span>
              <div className="hero-rule-flex" />
            </div>
            <div className="hero-tags">
              {[
                { color:'#10B981', bg:'rgba(16,185,129,0.1)',  bd:'rgba(16,185,129,0.25)', label:'Turf'           },
                { color:'#F59E0B', bg:'rgba(245,158,11,0.1)',  bd:'rgba(245,158,11,0.25)', label:'Auction'        },
                { color:'#EF4444', bg:'rgba(239,68,68,0.1)',   bd:'rgba(239,68,68,0.25)',  label:'Arrangements'   },
                { color:'#8B5CF6', bg:'rgba(139,92,246,0.1)',  bd:'rgba(139,92,246,0.25)', label:'Food'           },
              ].map(t => (
                <span key={t.label} className="hero-tag" style={{ color:t.color, background:t.bg, borderColor:t.bd }}>
                  <span className="hero-tag-dot" style={{ background:t.color }} />
                  {t.label}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <button type="button" className="btn btn-outline" onClick={resetDates}>Reset Dates</button>
              <button type="button" className="btn btn-outline" onClick={exportCSV}>Export CSV</button>
              <button type="button" className="btn btn-accent" onClick={onNavigateToGantt}>View Gantt →</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="sync-badge">
              <span className="sync-dot" />
              Dates sync to Gantt
            </div>
            <div className="hero-stats">
              {[
                { num:'64', lbl:'Days', sub:<span className="stat-box-date">Feb 12 – Apr 16</span> },
                { num:'48', lbl:'Tasks', sub:'All categories' },
                { num:'4',  lbl:'Phases', sub:'Foundation → Launch' },
                { num:'4',  lbl:'Categories', sub:'Turf · Auction · Other · Food' },
              ].map((s,i) => (
                <div key={i} className="hero-stat-item">
                  <div>
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-lbl">{s.lbl}</div>
                    <div className="hero-stat-sub">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Phases ── */}
      <div className="phase-section">
        <div className="phase-section-header">
          <span className="phase-section-title">Event Phases</span>
          <div className="phase-section-line" />
        </div>

        {phases.map((phase, pi) => (
          <div key={phase.num}>
            {pi > 0 && (
              <div className="phase-connector">
                <div className="connector-spine"><div className="connector-line" /></div>
              </div>
            )}
            <div className="phase-row">
              {/* Spine */}
              <div className="phase-spine">
                <div className="phase-num-circle" style={{ background:`${phase.color}12`, color:phase.color, borderColor:`${phase.color}40` }}>
                  {phase.num}
                </div>
                {pi < phases.length - 1 && (
                  <div className="phase-spine-line" style={{ background:`linear-gradient(to bottom, ${phase.color}40, transparent)` }} />
                )}
              </div>

              {/* Card */}
              <div className="phase-card" style={{ borderColor:`${phase.color}50`, borderLeftColor:phase.color }}>
                <div className="phase-card-ghost">{phase.num}</div>

                {/* Card header */}
                <div className="phase-header">
                  <div className="phase-tag-line" style={{ color:phase.color }}>{phase.label}</div>
                  <div className="phase-name">{phase.title}</div>
                  <div className="phase-duration">{phase.duration}</div>
                </div>

                {/* Alert */}
                {phase.alert && (
                  <div className="phase-alert">
                    <span className="phase-alert-icon">⚠</span>
                    <span className="phase-alert-text">{phase.alert}</span>
                  </div>
                )}

                {/* Milestones */}
                <div className="milestone-grid">
                  {phase.milestones.map((m, mi) => (
                    <div
                      key={mi}
                      className={`milestone-cell${m.key ? ' is-key' : ''}`}
                      style={{ '--cell-accent': phase.color }}
                    >
                      <div
                        className="milestone-date"
                        style={{ color: m.key ? phase.color : 'var(--tx4)' }}
                        data-gids={m.ganttIds ? m.ganttIds.join(',') : undefined}
                      >
                        {m.date}
                      </div>
                      <div className={`milestone-name${m.key ? ' bold' : ''}`}>
                        {m.name}
                        {m.key && <span className="milestone-key-pip" style={{ background:phase.color }} />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outcomes */}
                <div className="outcomes-wrap">
                  <div className="outcomes-title">Expected Outcomes</div>
                  <div className="outcomes-grid">
                    {phase.outcomes.map((o, oi) => (
                      <div key={oi} className="outcome-row">
                        <div className="outcome-check" style={{ background:`${phase.color}14`, color:phase.color }}>✓</div>
                        <div className="outcome-text">{o}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Critical Success Factors ── */}
      <div className="factors-section">
        <div className="section-header">
          <span className="section-title">Critical Success Factors</span>
          <div className="section-line" />
        </div>
        <div className="factors-grid">
          <div className="factor-col">
            <div className="factor-heading">Dependencies</div>
            <div className="factor-item">Team finalization <strong>before</strong> auction rules</div>
            <div className="factor-item">Auction completion <strong>before</strong> player list</div>
            <div className="factor-item">Vendors selected <strong>before</strong> payments</div>
            <div className="factor-item">Medical approvals <strong>before</strong> Apr 10</div>
            <div className="factor-item">All collections <strong>before</strong> Apr 16</div>
          </div>
          <div className="factor-col">
            <div className="factor-heading">Weekly Checkpoints</div>
            <div className="factor-item"><strong>Feb 25</strong> — Teams locked in</div>
            <div className="factor-item"><strong>Mar 10</strong> — Auction completed</div>
            <div className="factor-item"><strong>Mar 24</strong> — Officials confirmed</div>
            <div className="factor-item"><strong>Apr 7</strong>  — Payment deadlines met</div>
            <div className="factor-item"><strong>Apr 14</strong> — All arrangements final</div>
          </div>
          <div className="factor-col">
            <div className="factor-heading">Critical Tasks</div>
            <div className="factor-item"><strong>Apr 7–10</strong> peak coordination (10+ tasks)</div>
            <div className="factor-item">Vendor tasting & approval — <strong>Apr 10</strong></div>
            <div className="factor-item">Jersey collection — <strong>Apr 9</strong></div>
            <div className="factor-item">Women travel — <strong>Apr 14</strong></div>
            <div className="factor-item">Final venue setup — <strong>Apr 15–16</strong></div>
          </div>
          <div className="factor-col">
            <div className="factor-heading">Success Metrics</div>
            <div className="factor-item">100% vendor payments by <strong>Apr 17</strong></div>
            <div className="factor-item">All <strong>48+ players</strong> confirmed</div>
            <div className="factor-item">Equipment delivered by <strong>Apr 15</strong></div>
            <div className="factor-item">Food locked by <strong>Apr 10</strong></div>
            <div className="factor-item">Event-ready status on <strong>Apr 16</strong></div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="footer">
        <div className="footer-l">OCPL 2026 — FCC Team Event Management</div>
        <div className="footer-r">
          <span className="footer-date">February 12 – April 16, 2026</span>
          &nbsp;·&nbsp; 64 Days &nbsp;·&nbsp; 48 Tasks &nbsp;·&nbsp; 4 Phases
        </div>
      </div>
    </div>
  );
}
