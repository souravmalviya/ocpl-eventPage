import React, { useMemo, useRef, useEffect } from 'react';

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

/* Default task data — dates may be overridden via ganttDates prop from roadmap edits */
const DEFAULT_TASKS = [
  /* ─ TURF (green) ─ */
  { id:1,  group:'Turf',           name:'Turf Scouting',                                  start:'12/2/26', end:'18/2/26', color:'#10B981', grad:'#34d399' },
  { id:2,  group:'Turf',           name:'Turf Booking (Advance)',                          start:'18/2/26', end:'18/2/26', color:'#10B981', grad:'#34d399' },
  { id:3,  group:'Turf',           name:'Tables, Fans, Cooler, Mic, Speaker (Vendor)',     start:'2/4/26',  end:'8/4/26',  color:'#10B981', grad:'#34d399' },
  { id:4,  group:'Turf',           name:'Tables, Fans, Cooler, Mic, Speaker (Payment)',    start:'9/4/26',  end:'9/4/26',  color:'#10B981', grad:'#34d399' },
  { id:5,  group:'Turf',           name:'Parking Arrangements',                            start:'10/4/26', end:'15/4/26', color:'#10B981', grad:'#34d399' },
  { id:6,  group:'Turf',           name:'WiFi Management',                                 start:'10/4/26', end:'15/4/26', color:'#10B981', grad:'#34d399' },
  { id:7,  group:'Turf',           name:'Glasses, Tissues, Dustbins, Banners',             start:'15/4/26', end:'16/4/26', color:'#10B981', grad:'#34d399' },
  { id:8,  group:'Turf',           name:'Turf – Final Payment & Deposit',                  start:'17/4/26', end:'17/4/26', color:'#10B981', grad:'#34d399' },
  /* ─ AUCTION & PLAYERS (amber) ─ */
  { id:9,  group:'Auction',        name:'Owners & Captain Finalization',                   start:'23/2/26', end:'25/2/26', color:'#F59E0B', grad:'#fbbf24' },
  { id:10, group:'Auction',        name:'Final Logos & Banner for Auction',                start:'2/3/26',  end:'4/3/26',  color:'#F59E0B', grad:'#fbbf24' },
  { id:11, group:'Auction',        name:'Auction Rules',                                   start:'3/3/26',  end:'6/3/26',  color:'#F59E0B', grad:'#fbbf24' },
  { id:12, group:'Auction',        name:'Auction PPT',                                     start:'9/3/26',  end:'9/3/26',  color:'#F59E0B', grad:'#fbbf24' },
  { id:13, group:'Auction',        name:'Final List of Players',                           start:'8/3/26',  end:'8/3/26',  color:'#F59E0B', grad:'#fbbf24' },
  { id:14, group:'Auction',        name:'Rule Book Finalization',                          start:'9/3/26',  end:'12/3/26', color:'#F59E0B', grad:'#fbbf24' },
  { id:15, group:'Auction',        name:'🎯 AUCTION DAY',                                  start:'10/3/26', end:'10/3/26', color:'#F59E0B', grad:'#fbbf24' },
  { id:16, group:'Auction',        name:'Audience Form Rollout',                           start:'17/3/26', end:'20/3/26', color:'#F59E0B', grad:'#fbbf24' },
  { id:17, group:'Auction',        name:'Remote Players Arrangement',                      start:'10/4/26', end:'13/4/26', color:'#F59E0B', grad:'#fbbf24' },
  { id:18, group:'Auction',        name:'Total List & Food Coupons Finalization',          start:'10/4/26', end:'10/4/26', color:'#F59E0B', grad:'#fbbf24' },
  { id:19, group:'Auction',        name:'Women Travel Arrangements (after 8 PM)',          start:'14/4/26', end:'14/4/26', color:'#F59E0B', grad:'#fbbf24' },
  /* ─ OTHER ARRANGEMENTS (red) ─ */
  { id:20, group:'Other',          name:'Email & Marketing for Event',                     start:'12/3/26', end:'16/4/26', color:'#EF4444', grad:'#f87171' },
  { id:21, group:'Other',          name:'Jersey Vendors Finalization',                     start:'13/3/26', end:'17/3/26', color:'#EF4444', grad:'#f87171' },
  { id:22, group:'Other',          name:'Photographer & Videographer (Vendor & Advance)',  start:'16/3/26', end:'18/3/26', color:'#EF4444', grad:'#f87171' },
  { id:23, group:'Other',          name:'Jerseys Info for Players & Audience',             start:'20/3/26', end:'24/3/26', color:'#EF4444', grad:'#f87171' },
  { id:24, group:'Other',          name:'Umpires Arrangement',                             start:'24/3/26', end:'24/3/26', color:'#EF4444', grad:'#f87171' },
  { id:25, group:'Other',          name:'Scorer Arrangement',                              start:'24/3/26', end:'24/3/26', color:'#EF4444', grad:'#f87171' },
  { id:26, group:'Other',          name:'Photographer & Videographer (Finalize)',          start:'26/3/26', end:'26/3/26', color:'#EF4444', grad:'#f87171' },
  { id:27, group:'Other',          name:'Crickheroes Setup',                               start:'27/3/26', end:'27/3/26', color:'#EF4444', grad:'#f87171' },
  { id:28, group:'Other',          name:'Trophies Order (Advance)',                        start:'28/3/26', end:'31/3/26', color:'#EF4444', grad:'#f87171' },
  { id:29, group:'Other',          name:'Medical Supplies (Advance)',                      start:'4/4/26',  end:'6/4/26',  color:'#EF4444', grad:'#f87171' },
  { id:30, group:'Other',          name:'Trophies Collect (Final Payment)',                start:'8/4/26',  end:'8/4/26',  color:'#EF4444', grad:'#f87171' },
  { id:31, group:'Other',          name:'Medical Supplies (Final Payment)',                start:'7/4/26',  end:'7/4/26',  color:'#EF4444', grad:'#f87171' },
  { id:32, group:'Other',          name:'Team Setup on App',                               start:'7/4/26',  end:'7/4/26',  color:'#EF4444', grad:'#f87171' },
  { id:33, group:'Other',          name:'Collect Jersey',                                  start:'9/4/26',  end:'9/4/26',  color:'#EF4444', grad:'#f87171' },
  { id:34, group:'Other',          name:'Balls – 36 units',                                start:'11/4/26', end:'11/4/26', color:'#EF4444', grad:'#f87171' },
  { id:35, group:'Other',          name:'Pooja Material Ordering',                         start:'16/4/26', end:'16/4/26', color:'#EF4444', grad:'#f87171' },
  /* ─ FOOD (purple) ─ */
  { id:36, group:'Food',           name:'Contact Vendors',                                 start:'6/4/26',  end:'8/4/26',  color:'#8B5CF6', grad:'#a78bfa' },
  { id:37, group:'Food',           name:'Glucose Arrangement',                             start:'7/4/26',  end:'7/4/26',  color:'#8B5CF6', grad:'#a78bfa' },
  { id:38, group:'Food',           name:'ORS Arrangement',                                 start:'7/4/26',  end:'7/4/26',  color:'#8B5CF6', grad:'#a78bfa' },
  { id:39, group:'Food',           name:'Finalize Menu & Advance Payments',                start:'7/4/26',  end:'7/4/26',  color:'#8B5CF6', grad:'#a78bfa' },
  { id:40, group:'Food',           name:'Order 25 Jugs of Water',                          start:'10/4/26', end:'10/4/26', color:'#8B5CF6', grad:'#a78bfa' },
  { id:41, group:'Food',           name:'Tasting & Finalize Vendors',                      start:'10/4/26', end:'10/4/26', color:'#8B5CF6', grad:'#a78bfa' },
];

const parseDate = (s) => {
  const [d, m, y] = s.split('/').map(Number);
  return new Date(2000 + y, m - 1, d);
};

export default function OCPL2026GanttChart({ onNavigateToRoadmap, theme = 'dark', toggleTheme, ganttDates = {} }) {
  const timelineHeaderRef = useRef(null);
  const ganttBarsRef      = useRef(null);
  const ganttNamesRef     = useRef(null);

  /* Merge prop overrides (from roadmap edits) into the default task list */
  const allTasks = useMemo(() =>
    DEFAULT_TASKS.map(t => {
      const ov = ganttDates[t.id];
      if (!ov) return t;
      return { ...t, start: ov.start || t.start, end: ov.end || t.end };
    }),
  [ganttDates]);

  /* Chart metrics */
  const { minDate, maxDate } = useMemo(() => {
    const dates = allTasks.flatMap(t => [parseDate(t.start), parseDate(t.end)]);
    return { minDate: new Date(Math.min(...dates)), maxDate: new Date(Math.max(...dates)) };
  }, [allTasks]);

  const totalDays  = useMemo(() => Math.ceil((maxDate - minDate) / 864e5) + 1, [minDate, maxDate]);
  const dayWidth   = 42;
  const rowHeight  = 40;
  const chartWidth = totalDays * dayWidth;

  const getDayOffset = (d) => Math.floor((parseDate(d) - minDate) / 864e5);
  const getBarWidth  = (s, e) => Math.max(getDayOffset(e || s) - getDayOffset(s) + 1, 1);

  /* Today marker */
  const todayOffset = useMemo(() => {
    const today = new Date();
    if (today < minDate || today > maxDate) return null;
    return Math.floor((today - minDate) / 864e5) * dayWidth + dayWidth / 2;
  }, [minDate, maxDate]);

  /* Week headers */
  const weeks = useMemo(() => {
    const out = []; let cur = new Date(minDate);
    while (cur <= maxDate) {
      const end = new Date(cur); end.setDate(end.getDate() + 6);
      out.push({
        start: cur.toLocaleDateString('en-IN', { day:'numeric', month:'short' }),
        end:   end.toLocaleDateString('en-IN', { day:'numeric', month:'short' }),
        days: Math.min(7, Math.ceil((maxDate - cur) / 864e5) + 1),
      });
      cur.setDate(cur.getDate() + 7);
    }
    return out;
  }, [minDate, maxDate]);

  /* Scroll sync */
  useEffect(() => {
    const th = timelineHeaderRef.current;
    const bars = ganttBarsRef.current;
    const names = ganttNamesRef.current;
    if (!th || !bars || !names) return;
    const syncH  = () => { bars.scrollLeft = th.scrollLeft; };
    const syncB  = () => { th.scrollLeft = bars.scrollLeft; names.scrollTop = bars.scrollTop; };
    const syncN  = () => { bars.scrollTop = names.scrollTop; };
    th.addEventListener('scroll', syncH);
    bars.addEventListener('scroll', syncB);
    names.addEventListener('scroll', syncN);
    return () => { th.removeEventListener('scroll', syncH); bars.removeEventListener('scroll', syncB); names.removeEventListener('scroll', syncN); };
  }, []);

  /* Group separators */
  const groups = ['Turf','Auction','Other','Food'];
  const groupColors = { Turf:'#10B981', Auction:'#F59E0B', Other:'#EF4444', Food:'#8B5CF6' };
  const groupLabels = { Turf:'TURF (8 tasks)', Auction:'AUCTION & PLAYERS (11 tasks)', Other:'OTHER ARRANGEMENTS (16 tasks)', Food:'FOOD (6 tasks)' };

  return (
    <div data-theme={theme} style={{ background:'var(--g-bg)', minHeight:'100vh', transition:'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;600;900&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { font-family:'Inter',sans-serif; box-sizing:border-box; }

        /* ── Theme Tokens ── */
        [data-theme="dark"] {
          --g-bg:             #0a0a14;
          --g-navbar-bg:      rgba(10,10,20,0.94);
          --g-navbar-bd:      rgba(255,255,255,0.08);
          --g-navbar-tx:      #e8edf8;
          --g-navbar-sub:     #8a9bb8;
          --g-toggle-bg:      #14142a;
          --g-toggle-bd:      #28285a;
          --g-toggle-tx:      #8a9aba;
          --g-toggle-h:       #1c1c38;
          --g-title:          #f0f4fc;
          --g-subtitle:       #8a9aba;
          --g-container:      #0f0f1e;
          --g-container-bd:   #1e1e38;
          --g-header-bg:      #0c0c1e;
          --g-names-bg:       #0f0f1e;
          --g-row-odd:        #0c0c1a;
          --g-row-even:       #0f0f1e;
          --g-row-hover:      #141428;
          --g-group-bg:       #12122a;
          --g-group-tx:       #6868a8;
          --g-week-tx:        #6a7fa8;
          --g-week-bd:        #1a1a34;
          --g-task-tx:        #d8e0f4;
          --g-heavy-bd:       #1e1e38;
          --g-subtle-bd:      #141428;
          --g-grid:           rgba(100,120,180,0.07);
          --g-legend-bg:      #0c0c1a;
          --g-legend-tx:      #b0b8d8;
          --g-summary-bg:     #0f0f1e;
          --g-summary-bd:     #1e1e38;
          --g-summary-tx:     #d8e0f4;
          --g-summary-lbl:    #6a7fa8;
          --g-scrollbar-tk:   #12122a;
          --g-scrollbar-th:   #2a2a50;
          --g-scrollbar-thh:  #3a3a70;
          --g-today:          rgba(248,113,113,0.7);
          --g-btn-bg:         #141430;
          --g-btn-bd:         #28285a;
          --g-btn-tx:         #8888c8;
          --g-btn-h-bg:       #1e1e44;
          --g-btn-h-bd:       #44447a;
          --g-btn-h-tx:       #dcdcfa;
        }
        [data-theme="light"] {
          --g-bg:             #f0f0fa;
          --g-navbar-bg:      rgba(240,240,250,0.94);
          --g-navbar-bd:      rgba(0,0,0,0.07);
          --g-navbar-tx:      #10102a;
          --g-navbar-sub:     #5060a8;
          --g-toggle-bg:      #e4e4f4;
          --g-toggle-bd:      #c0c0e0;
          --g-toggle-tx:      #4040a0;
          --g-toggle-h:       #d8d8f0;
          --g-title:          #08081a;
          --g-subtitle:       #5060a8;
          --g-container:      #ffffff;
          --g-container-bd:   #d0d0e8;
          --g-header-bg:      #f8f8fe;
          --g-names-bg:       #f4f4fc;
          --g-row-odd:        #f8f8fe;
          --g-row-even:       #ffffff;
          --g-row-hover:      #eeeeff;
          --g-group-bg:       #ebebf8;
          --g-group-tx:       #6060a0;
          --g-week-tx:        #5060a8;
          --g-week-bd:        #dcdcf0;
          --g-task-tx:        #18182a;
          --g-heavy-bd:       #c0c0e0;
          --g-subtle-bd:      #e4e4f4;
          --g-grid:           rgba(80,80,160,0.06);
          --g-legend-bg:      #f4f4fc;
          --g-legend-tx:      #30308a;
          --g-summary-bg:     #f4f4fc;
          --g-summary-bd:     #d0d0e8;
          --g-summary-tx:     #18182a;
          --g-summary-lbl:    #5060a8;
          --g-scrollbar-tk:   #e4e4f4;
          --g-scrollbar-th:   #b0b0d0;
          --g-scrollbar-thh:  #8080b8;
          --g-today:          rgba(239,68,68,0.6);
          --g-btn-bg:         #e8e8f8;
          --g-btn-bd:         #c0c0e0;
          --g-btn-tx:         #3030a0;
          --g-btn-h-bg:       #dcdcff;
          --g-btn-h-bd:       #8080c0;
          --g-btn-h-tx:       #0808a0;
        }

        /* ── Navbar ── */
        .g-nav {
          position:sticky; top:0; z-index:100;
          background:var(--g-navbar-bg); backdrop-filter:blur(20px);
          border-bottom:1px solid var(--g-navbar-bd);
          padding:0 32px; transition:background 0.3s,border-color 0.3s;
        }
        .g-nav-inner {
          max-width:1320px; margin:0 auto; height:60px;
          display:flex; align-items:center; justify-content:space-between;
        }
        .g-nav-logo { display:flex; align-items:center; gap:10px; }
        .g-nav-logo img { height:30px; width:30px; border-radius:6px; object-fit:contain; }
        .g-nav-text { display:flex; flex-direction:column; gap:1px; }
        .g-nav-brand {
          font-family:'Poppins',sans-serif; font-size:14px; font-weight:700;
          color:var(--g-navbar-tx); line-height:1.1; transition:color 0.3s;
        }
        .g-nav-sub {
          font-size:9px; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; color:var(--g-navbar-sub); transition:color 0.3s;
        }
        .g-nav-right { display:flex; align-items:center; gap:10px; }
        .g-toggle {
          display:flex; align-items:center; justify-content:center;
          width:34px; height:34px; border-radius:8px;
          background:var(--g-toggle-bg); border:1px solid var(--g-toggle-bd);
          color:var(--g-toggle-tx); cursor:pointer; transition:all 0.2s;
        }
        .g-toggle:hover { background:var(--g-toggle-h); color:var(--g-navbar-tx); }
        .g-back-btn {
          display:flex; align-items:center; gap:6px;
          padding:7px 14px; border-radius:8px;
          background:var(--g-btn-bg); border:1px solid var(--g-btn-bd);
          color:var(--g-btn-tx); cursor:pointer; font-size:12px; font-weight:600;
          font-family:'Inter',sans-serif; letter-spacing:0.3px; text-transform:uppercase;
          transition:all 0.2s;
        }
        .g-back-btn:hover { background:var(--g-btn-h-bg); border-color:var(--g-btn-h-bd); color:var(--g-btn-h-tx); }

        /* ── Page header ── */
        .g-page-header {
          max-width:1320px; margin:0 auto; padding:36px 32px 24px;
          display:flex; align-items:flex-end; justify-content:space-between; gap:24px;
        }
        .g-page-title {
          font-family:'Poppins',sans-serif; font-size:28px; font-weight:900;
          letter-spacing:-0.5px; color:var(--g-title); transition:color 0.3s;
        }
        .g-page-title span {
          background:linear-gradient(135deg,#10B981,#34d399);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .g-page-meta {
          display:flex; gap:20px; align-items:center; flex-wrap:wrap;
        }
        .g-meta-chip {
          display:flex; align-items:center; gap:6px;
          font-size:11px; font-weight:600; color:var(--g-subtitle);
          transition:color 0.3s;
        }
        .g-meta-chip::before { content:''; display:inline-block; width:4px; height:4px; border-radius:50%; background:var(--g-subtitle); }

        /* ── Sync notice ── */
        .g-sync-notice {
          max-width:1320px; margin:0 auto; padding:0 32px 18px;
          display:flex; align-items:center; gap:8px;
          font-size:11px; color:var(--g-subtitle); transition:color 0.3s;
        }
        .g-sync-icon { font-size:13px; }
        .g-sync-count {
          font-weight:700;
          color:#10B981;
        }

        /* ── Gantt container ── */
        .g-container {
          max-width:1320px; margin:0 auto; padding:0 32px 60px;
        }
        .g-chart {
          background:var(--g-container); border-radius:14px; overflow:hidden;
          border:1px solid var(--g-container-bd);
          box-shadow:0 8px 40px rgba(0,0,0,0.18); transition:background 0.3s,border-color 0.3s;
        }

        /* ── Header row ── */
        .g-header { display:flex; background:var(--g-header-bg); border-bottom:2px solid var(--g-heavy-bd); transition:background 0.3s; }
        .g-names-hdr {
          width:290px; flex-shrink:0; padding:14px 16px;
          border-right:2px solid var(--g-heavy-bd);
          background:var(--g-names-bg); transition:background 0.3s,border-color 0.3s;
        }
        .g-names-hdr-label {
          font-size:10px; font-weight:700; text-transform:uppercase;
          letter-spacing:1px; color:var(--g-week-tx); transition:color 0.3s;
        }
        .g-timeline-scroll { flex:1; overflow-x:auto; overflow-y:hidden; scrollbar-width:none; }
        .g-timeline-scroll::-webkit-scrollbar { display:none; }
        .g-timeline-inner { display:flex; }
        .g-week-cell {
          flex:none; padding:8px 4px; text-align:center;
          border-right:1px solid var(--g-week-bd); font-size:10px; font-weight:600;
          color:var(--g-week-tx); letter-spacing:0.3px; transition:color 0.3s,border-color 0.3s;
        }
        .g-week-sub { font-size:9px; font-weight:400; opacity:0.7; margin-top:2px; }

        /* ── Body ── */
        .g-body { display:flex; max-height:620px; overflow:hidden; }
        .g-names-panel {
          width:290px; flex-shrink:0; overflow:hidden;
          border-right:2px solid var(--g-heavy-bd); transition:border-color 0.3s;
          background:var(--g-names-bg);
        }
        .g-bars-panel { flex:1; overflow:auto; position:relative; }

        /* ── Group separator ── */
        .g-group-row {
          height:28px; display:flex; align-items:center; padding:0 14px;
          background:var(--g-group-bg); border-bottom:1px solid var(--g-heavy-bd);
          gap:8px; transition:background 0.3s;
        }
        .g-group-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .g-group-label {
          font-size:9px; font-weight:800; text-transform:uppercase;
          letter-spacing:1.5px; color:var(--g-group-tx); transition:color 0.3s;
        }
        .g-group-bar-row {
          height:28px; background:var(--g-group-bg);
          border-bottom:1px solid var(--g-heavy-bd); transition:background 0.3s;
          position:relative;
        }

        /* ── Task rows ── */
        .g-task-name {
          height:${rowHeight}px; padding:0 14px; font-size:12px; font-weight:500;
          color:var(--g-task-tx); white-space:nowrap; overflow:hidden;
          text-overflow:ellipsis; display:flex; align-items:center; gap:8px;
          border-bottom:1px solid var(--g-subtle-bd); transition:color 0.3s,background 0.2s,border-color 0.3s;
        }
        .g-task-name:nth-child(odd)  { background:var(--g-row-odd); }
        .g-task-name:nth-child(even) { background:var(--g-row-even); }
        .g-task-name:hover { background:var(--g-row-hover); }
        .g-cat-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }

        .g-bar-row {
          position:relative; height:${rowHeight}px;
          border-bottom:1px solid var(--g-subtle-bd);
          transition:background 0.2s,border-color 0.3s;
        }
        .g-bar-row:nth-child(odd)  { background:var(--g-row-odd); }
        .g-bar-row:nth-child(even) { background:var(--g-row-even); }
        .g-bar-row:hover { background:var(--g-row-hover); }

        /* ── Grid lines ── */
        .g-grid-overlay { position:absolute; top:0; left:0; width:100%; height:100%; display:flex; pointer-events:none; }
        .g-grid-line    { flex:none; border-right:1px solid var(--g-grid); transition:border-color 0.3s; }

        /* ── Task bar ── */
        .g-task-bar {
          position:absolute; top:8px; height:24px; border-radius:6px;
          cursor:pointer; transition:transform 0.15s,box-shadow 0.15s,filter 0.15s;
          display:flex; align-items:center; justify-content:center;
          font-size:9px; font-weight:800; color:rgba(255,255,255,0.95);
          letter-spacing:0.3px; overflow:hidden;
        }
        .g-task-bar::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 60%);
          pointer-events:none;
        }
        .g-task-bar:hover { transform:translateY(-2px) scaleY(1.05); box-shadow:0 6px 20px rgba(0,0,0,0.35); filter:brightness(1.08); }
        .g-milestone-bar {
          position:absolute; top:11px; width:18px; height:18px;
          transform:rotate(45deg) translateX(-50%);
          border-radius:3px; cursor:pointer;
          transition:transform 0.15s,box-shadow 0.15s;
        }
        .g-milestone-bar:hover { transform:rotate(45deg) translateX(-50%) scale(1.2); box-shadow:0 4px 12px rgba(0,0,0,0.3); }

        /* ── Today line ── */
        .g-today-line {
          position:absolute; top:0; bottom:0; width:2px;
          background:var(--g-today); pointer-events:none; z-index:10;
          box-shadow:0 0 8px var(--g-today);
        }
        .g-today-label {
          position:absolute; top:2px; left:4px;
          font-size:8px; font-weight:800; text-transform:uppercase;
          color:#f87171; letter-spacing:0.5px; white-space:nowrap;
          pointer-events:none;
        }

        /* ── Legend ── */
        .g-legend {
          display:flex; gap:0; background:var(--g-legend-bg);
          border-top:2px solid var(--g-heavy-bd); transition:background 0.3s,border-color 0.3s;
        }
        .g-legend-item {
          flex:1; display:flex; align-items:center; gap:8px;
          padding:14px 16px; font-size:10px; font-weight:700;
          color:var(--g-legend-tx); text-transform:uppercase; letter-spacing:0.5px;
          border-right:1px solid var(--g-subtle-bd); transition:color 0.3s;
        }
        .g-legend-item:last-child { border-right:none; }
        .g-legend-swatch { width:10px; height:10px; border-radius:3px; flex-shrink:0; }

        /* ── Summary stats ── */
        .g-stats {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:1px; background:var(--g-subtle-bd);
          border:1px solid var(--g-summary-bd); border-radius:12px; overflow:hidden;
          margin-top:28px; transition:background 0.3s,border-color 0.3s;
        }
        .g-stat-card {
          padding:20px 22px; background:var(--g-summary-bg);
          transition:background 0.3s;
        }
        .g-stat-num {
          font-family:'Poppins',sans-serif; font-size:26px; font-weight:900;
          color:var(--g-summary-tx); letter-spacing:-0.5px; line-height:1; transition:color 0.3s;
        }
        .g-stat-lbl {
          font-size:9px; font-weight:700; text-transform:uppercase;
          letter-spacing:1.5px; color:var(--g-summary-lbl); margin-top:5px; transition:color 0.3s;
        }
        .g-stat-sub { font-size:10px; color:var(--g-summary-lbl); margin-top:2px; transition:color 0.3s; }

        /* ── Scrollbars ── */
        .g-bars-panel::-webkit-scrollbar { height:7px; width:7px; }
        .g-bars-panel::-webkit-scrollbar-track  { background:var(--g-scrollbar-tk); }
        .g-bars-panel::-webkit-scrollbar-thumb  { background:var(--g-scrollbar-th); border-radius:4px; }
        .g-bars-panel::-webkit-scrollbar-thumb:hover { background:var(--g-scrollbar-thh); }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="g-nav">
        <div className="g-nav-inner">
          <div className="g-nav-logo">
            <img src="/onclusive-logo.png" alt="Onclusive" />
            <div className="g-nav-text">
              <span className="g-nav-brand">Onclusive</span>
              <span className="g-nav-sub">FCC Team</span>
            </div>
          </div>
          <div className="g-nav-right">
            <button type="button" className="g-back-btn" onClick={onNavigateToRoadmap}>← Roadmap</button>
            <button className="g-toggle" onClick={toggleTheme} title={theme==='dark'?'Light mode':'Dark mode'}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Page header ── */}
      <div className="g-page-header">
        <div>
          <div className="g-page-title">OCPL 2026 &mdash; <span>Gantt Chart</span></div>
        </div>
        <div className="g-page-meta">
          <span className="g-meta-chip">{allTasks.length} Tasks</span>
          <span className="g-meta-chip">{totalDays} Days</span>
          <span className="g-meta-chip">{minDate.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})} → {maxDate.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
        </div>
      </div>

      {/* ── Sync notice ── */}
      {Object.keys(ganttDates).length > 0 && (
        <div className="g-sync-notice">
          <span className="g-sync-icon">🔄</span>
          <span className="g-sync-count">{Object.keys(ganttDates).length} task{Object.keys(ganttDates).length>1?'s':''}</span>
          &nbsp;updated from roadmap date edits — chart reflects live changes.
        </div>
      )}

      {/* ── Chart ── */}
      <div className="g-container">
        <div className="g-chart">

          {/* Header */}
          <div className="g-header">
            <div className="g-names-hdr">
              <div className="g-names-hdr-label">Task Name</div>
            </div>
            <div className="g-timeline-scroll" ref={timelineHeaderRef}>
              <div className="g-timeline-inner" style={{ width:`${chartWidth}px` }}>
                {weeks.map((w,i) => (
                  <div key={i} className="g-week-cell" style={{ width:`${w.days*dayWidth}px`, minWidth:`${w.days*dayWidth}px` }}>
                    {w.start} – {w.end}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="g-body">
            {/* Task names panel */}
            <div className="g-names-panel" ref={ganttNamesRef}>
              {groups.map(grp => {
                const tasks = allTasks.filter(t => t.group === grp);
                return (
                  <React.Fragment key={grp}>
                    <div className="g-group-row">
                      <span className="g-group-dot" style={{ background:groupColors[grp] }} />
                      <span className="g-group-label" style={{ color:groupColors[grp] }}>{groupLabels[grp]}</span>
                    </div>
                    {tasks.map(t => (
                      <div key={t.id} className="g-task-name">
                        <span className="g-cat-dot" style={{ background:t.color }} />
                        {t.name}
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Bars panel */}
            <div className="g-bars-panel" ref={ganttBarsRef}>
              {/* Today line across all rows */}
              {todayOffset !== null && (
                <div className="g-today-line" style={{ left:`${todayOffset}px` }}>
                  <div className="g-today-label">Today</div>
                </div>
              )}

              {groups.map(grp => {
                const tasks = allTasks.filter(t => t.group === grp);
                return (
                  <React.Fragment key={grp}>
                    {/* Group header spacer in bars panel */}
                    <div className="g-group-bar-row" style={{ width:`${chartWidth}px` }}>
                      <div className="g-grid-overlay">
                        {weeks.map((_,i) => <div key={i} className="g-grid-line" style={{ width:`${weeks[i].days*dayWidth}px` }} />)}
                      </div>
                    </div>

                    {tasks.map(t => {
                      const off = getDayOffset(t.start);
                      const w   = getBarWidth(t.start, t.end);
                      const isMilestone = w === 1 && t.start === t.end;

                      return (
                        <div key={t.id} className="g-bar-row" style={{ width:`${chartWidth}px` }}>
                          <div className="g-grid-overlay">
                            {weeks.map((_,i) => <div key={i} className="g-grid-line" style={{ width:`${weeks[i].days*dayWidth}px` }} />)}
                          </div>
                          {isMilestone ? (
                            <div
                              className="g-milestone-bar"
                              style={{ left:`${off*dayWidth}px`, background:`linear-gradient(135deg,${t.color},${t.grad})` }}
                              title={`${t.name}: ${t.start}`}
                            />
                          ) : (
                            <div
                              className="g-task-bar"
                              style={{
                                left:`${off*dayWidth}px`,
                                width:`${w*dayWidth - 4}px`,
                                background:`linear-gradient(135deg,${t.color} 0%,${t.grad} 100%)`,
                                boxShadow:`0 3px 10px ${t.color}40`,
                              }}
                              title={`${t.name}: ${t.start} → ${t.end} (${w}d)`}
                            >
                              {w > 4 && <span>{w}d</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="g-legend">
            {groups.map(grp => (
              <div key={grp} className="g-legend-item">
                <div className="g-legend-swatch" style={{ background:groupColors[grp] }} />
                {groupLabels[grp]}
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="g-stats">
          {[
            { num: allTasks.length, lbl:'Total Tasks', sub:'Across 4 categories', color:'var(--g-summary-tx)' },
            { num: totalDays,       lbl:'Timeline', sub:'Feb 12 – Apr 17', color:'#10B981' },
            { num: Object.keys(ganttDates).length || '—',
              lbl:'Synced from Roadmap', sub: Object.keys(ganttDates).length ? 'Dates updated' : 'Edit dates in roadmap', color:'#F59E0B' },
            { num: groups.length,   lbl:'Categories', sub:'Turf · Auction · Other · Food', color:'#8B5CF6' },
          ].map((s,i) => (
            <div key={i} className="g-stat-card">
              <div className="g-stat-num" style={{ color:s.color }}>{s.num}</div>
              <div className="g-stat-lbl">{s.lbl}</div>
              <div className="g-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
