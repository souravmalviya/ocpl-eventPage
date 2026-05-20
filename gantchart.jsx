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

export default function OCPL2026GanttChart({ onNavigateToRoadmap, theme = 'dark', toggleTheme }) {
  const timelineHeaderRef = useRef(null);
  const ganttBarsRef = useRef(null);
  const ganttNamesRef = useRef(null);
  const headerContentRef = useRef(null);

  useEffect(() => {
    const timelineHeader = timelineHeaderRef.current;
    const ganttBars = ganttBarsRef.current;
    const ganttNames = ganttNamesRef.current;
    if (!timelineHeader || !ganttBars || !ganttNames) return;

    const handleHeaderScroll = () => { ganttBars.scrollLeft = timelineHeader.scrollLeft; };
    const handleBarsScroll = () => {
      timelineHeader.scrollLeft = ganttBars.scrollLeft;
      ganttNames.scrollTop = ganttBars.scrollTop;
    };
    const handleNamesScroll = () => { ganttBars.scrollTop = ganttNames.scrollTop; };

    timelineHeader.addEventListener('scroll', handleHeaderScroll);
    ganttBars.addEventListener('scroll', handleBarsScroll);
    ganttNames.addEventListener('scroll', handleNamesScroll);
    return () => {
      timelineHeader.removeEventListener('scroll', handleHeaderScroll);
      ganttBars.removeEventListener('scroll', handleBarsScroll);
      ganttNames.removeEventListener('scroll', handleNamesScroll);
    };
  }, []);

  const allTasks = [
    { id: 1,  name: 'Turf Scouting',                                    start: '12/2/26', end: '18/2/26', color: '#10B981' },
    { id: 2,  name: 'Turf Booking (Advance)',                            start: '18/2/26', end: '18/2/26', color: '#10B981' },
    { id: 3,  name: 'Tables, Fans, Cooler, Mic, Speaker (Vendor)',       start: '2/4/26',  end: '8/4/26',  color: '#10B981' },
    { id: 4,  name: 'Tables, Fans, Cooler, Mic, Speaker (Payment)',      start: '9/4/26',  end: '9/4/26',  color: '#10B981' },
    { id: 5,  name: 'Parking Arrangements',                              start: '10/4/26', end: '15/4/26', color: '#10B981' },
    { id: 6,  name: 'WiFi Management',                                   start: '10/4/26', end: '15/4/26', color: '#10B981' },
    { id: 7,  name: 'Glasses, Tissues, Dustbins, Banners',               start: '15/4/26', end: '16/4/26', color: '#10B981' },
    { id: 8,  name: 'Turf - Final Payment & Deposit',                    start: '17/4/26', end: '17/4/26', color: '#10B981' },
    { id: 9,  name: 'Owners & Captain Finalization',                     start: '23/2/26', end: '25/2/26', color: '#F59E0B' },
    { id: 10, name: 'Final Logos & Banner for Auction',                  start: '2/3/26',  end: '4/3/26',  color: '#F59E0B' },
    { id: 11, name: 'Auction Rules',                                     start: '3/3/26',  end: '6/3/26',  color: '#F59E0B' },
    { id: 12, name: 'Auction PPT',                                       start: '9/3/26',  end: '9/3/26',  color: '#F59E0B' },
    { id: 13, name: 'Final List of Players',                             start: '8/3/26',  end: '8/3/26',  color: '#F59E0B' },
    { id: 14, name: 'Rule Book Finalization',                            start: '9/3/26',  end: '12/3/26', color: '#F59E0B' },
    { id: 15, name: '🎯 AUCTION DAY',                                    start: '10/3/26', end: '10/3/26', color: '#F59E0B' },
    { id: 16, name: 'Audience Form Rollout',                             start: '17/3/26', end: '20/3/26', color: '#F59E0B' },
    { id: 17, name: 'Remote Players Arrangement',                        start: '10/4/26', end: '13/4/26', color: '#F59E0B' },
    { id: 18, name: 'Total List & Food Coupons Finalization',            start: '10/4/26', end: '10/4/26', color: '#F59E0B' },
    { id: 19, name: 'Women Travel Arrangements (after 8 PM)',            start: '14/4/26', end: '14/4/26', color: '#F59E0B' },
    { id: 20, name: 'Email & Marketing for Event',                       start: '12/3/26', end: '16/4/26', color: '#EF4444' },
    { id: 21, name: 'Jersey Vendors Finalization',                       start: '13/3/26', end: '17/3/26', color: '#EF4444' },
    { id: 22, name: 'Photographer & Videographer (Vendor & Advance)',    start: '16/3/26', end: '18/3/26', color: '#EF4444' },
    { id: 23, name: 'Jerseys Info for Players & Audience',               start: '20/3/26', end: '24/3/26', color: '#EF4444' },
    { id: 24, name: 'Umpires Arrangement',                               start: '24/3/26', end: '24/3/26', color: '#EF4444' },
    { id: 25, name: 'Scorer Arrangement',                                start: '24/3/26', end: '24/3/26', color: '#EF4444' },
    { id: 26, name: 'Photographer & Videographer (Finalize & Payment)',  start: '26/3/26', end: '26/3/26', color: '#EF4444' },
    { id: 27, name: 'Crickheroes Setup',                                 start: '27/3/26', end: '27/3/26', color: '#EF4444' },
    { id: 28, name: 'Trophies Order (Advance)',                          start: '28/3/26', end: '31/3/26', color: '#EF4444' },
    { id: 29, name: 'Medical Supplies (Advance)',                        start: '4/4/26',  end: '6/4/26',  color: '#EF4444' },
    { id: 30, name: 'Trophies Collect (Final Payment)',                  start: '8/4/26',  end: '8/4/26',  color: '#EF4444' },
    { id: 31, name: 'Medical Supplies (Final Payment)',                  start: '7/4/26',  end: '7/4/26',  color: '#EF4444' },
    { id: 32, name: 'Team Setup on App',                                 start: '7/4/26',  end: '7/4/26',  color: '#EF4444' },
    { id: 33, name: 'Collect Jersey',                                    start: '9/4/26',  end: '9/4/26',  color: '#EF4444' },
    { id: 34, name: 'Balls - 36 units',                                  start: '11/4/26', end: '11/4/26', color: '#EF4444' },
    { id: 35, name: 'Pooja Material Ordering',                           start: '16/4/26', end: '16/4/26', color: '#EF4444' },
    { id: 36, name: 'Contact Vendors',                                   start: '6/4/26',  end: '8/4/26',  color: '#8B5CF6' },
    { id: 37, name: 'Glucose Arrangement',                               start: '7/4/26',  end: '7/4/26',  color: '#8B5CF6' },
    { id: 38, name: 'ORS Arrangement',                                   start: '7/4/26',  end: '7/4/26',  color: '#8B5CF6' },
    { id: 39, name: 'Finalize Menu & Advance Payments',                  start: '7/4/26',  end: '7/4/26',  color: '#8B5CF6' },
    { id: 40, name: 'Order 25 Jugs of Water',                            start: '10/4/26', end: '10/4/26', color: '#8B5CF6' },
    { id: 41, name: 'Tasting & Finalize Vendors',                        start: '10/4/26', end: '10/4/26', color: '#8B5CF6' },
  ];

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(2000 + year, month - 1, day);
  };

  const { minDate, maxDate } = useMemo(() => {
    const allDates = allTasks.flatMap(t => [parseDate(t.start), parseDate(t.end)]);
    return { minDate: new Date(Math.min(...allDates)), maxDate: new Date(Math.max(...allDates)) };
  }, []);

  const getTotalDays  = () => Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
  const getDayOffset  = (date) => Math.floor((parseDate(date) - minDate) / (1000 * 60 * 60 * 24));
  const getTaskWidth  = (start, end) => Math.max(getDayOffset(end || start) - getDayOffset(start) + 1, 1);

  const totalDays  = getTotalDays();
  const dayWidth   = 42;
  const chartWidth = totalDays * dayWidth;
  const rowHeight  = 38;

  const getWeekHeaders = () => {
    const weeks = []; let current = new Date(minDate);
    while (current <= maxDate) {
      const weekStart = new Date(current);
      const weekEnd   = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weeks.push({
        start: weekStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        end:   weekEnd.toLocaleDateString('en-IN',   { day: 'numeric', month: 'short' }),
        daysInWeek: Math.min(7, Math.ceil((maxDate - current) / (1000 * 60 * 60 * 24)) + 1),
      });
      current.setDate(current.getDate() + 7);
    }
    return weeks;
  };
  const weeks = getWeekHeaders();

  return (
    <div data-theme={theme} style={{ background: 'var(--g-bg)', minHeight: '100vh', transition: 'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;600;500&family=Inter:wght@400;500&display=swap');
        *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .gantt-title-text { font-family: 'Poppins', sans-serif; }

        /* ── Theme Variables ── */
        [data-theme="dark"] {
          --g-bg:             #020617;
          --g-navbar-bg:      rgba(2,6,23,0.9);
          --g-navbar-bd:      rgba(255,255,255,0.06);
          --g-navbar-tx:      #e2e8f0;
          --g-navbar-sub:     #475569;
          --g-toggle-bg:      #0f172a;
          --g-toggle-bd:      #1e293b;
          --g-toggle-tx:      #64748b;
          --g-toggle-h:       #1e293b;
          --g-title:          #f8fafc;
          --g-subtitle:       #64748b;
          --g-container:      #1e293b;
          --g-container-bd:   #475569;
          --g-header:         #0f172a;
          --g-names-bg:       #1e293b;
          --g-row-odd:        #0f172a;
          --g-row-even:       #1e293b;
          --g-row-hover-odd:  #1e293b;
          --g-row-hover-even: #334155;
          --g-week-tx:        #94a3b8;
          --g-week-bd:        #334155;
          --g-task-tx:        #e2e8f0;
          --g-heavy-bd:       #475569;
          --g-subtle-bd:      #334155;
          --g-grid:           rgba(148,163,184,0.1);
          --g-legend:         #0f172a;
          --g-legend-tx:      #cbd5e1;
          --g-summary-bg:     #1e293b;
          --g-summary-bd:     #475569;
          --g-summary-tx:     #e2e8f0;
          --g-summary-lbl:    #94a3b8;
          --g-scrollbar-tk:   #1e293b;
          --g-scrollbar-th:   #475569;
          --g-scrollbar-thh:  #64748b;
        }
        [data-theme="light"] {
          --g-bg:             #eef2f7;
          --g-navbar-bg:      rgba(238,242,247,0.92);
          --g-navbar-bd:      rgba(0,0,0,0.08);
          --g-navbar-tx:      #1e293b;
          --g-navbar-sub:     #64748b;
          --g-toggle-bg:      #e2e8f0;
          --g-toggle-bd:      #cbd5e1;
          --g-toggle-tx:      #475569;
          --g-toggle-h:       #d0dcea;
          --g-title:          #0f172a;
          --g-subtitle:       #475569;
          --g-container:      #ffffff;
          --g-container-bd:   #cbd5e1;
          --g-header:         #f8fafc;
          --g-names-bg:       #f1f5f9;
          --g-row-odd:        #f8fafc;
          --g-row-even:       #ffffff;
          --g-row-hover-odd:  #f1f5f9;
          --g-row-hover-even: #e8edf5;
          --g-week-tx:        #475569;
          --g-week-bd:        #e2e8f0;
          --g-task-tx:        #1e293b;
          --g-heavy-bd:       #94a3b8;
          --g-subtle-bd:      #e2e8f0;
          --g-grid:           rgba(71,85,105,0.1);
          --g-legend:         #f8fafc;
          --g-legend-tx:      #334155;
          --g-summary-bg:     #ffffff;
          --g-summary-bd:     #cbd5e1;
          --g-summary-tx:     #0f172a;
          --g-summary-lbl:    #64748b;
          --g-scrollbar-tk:   #e2e8f0;
          --g-scrollbar-th:   #94a3b8;
          --g-scrollbar-thh:  #64748b;
        }

        /* ── Navbar ── */
        .g-navbar {
          position: sticky; top: 0; z-index: 100;
          background: var(--g-navbar-bg); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--g-navbar-bd);
          padding: 0 32px; transition: background 0.3s, border-color 0.3s;
        }
        .g-navbar-inner {
          max-width: 1300px; margin: 0 auto; height: 62px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .g-navbar-logo { display: flex; align-items: center; gap: 10px; }
        .g-navbar-logo img { height: 32px; width: 32px; border-radius: 6px; object-fit: contain; }
        .g-navbar-text { display: flex; flex-direction: column; gap: 1px; }
        .g-navbar-brand {
          font-family: 'Poppins', sans-serif; font-size: 15px;
          font-weight: 600; color: var(--g-navbar-tx); line-height: 1.1; transition: color 0.3s;
        }
        .g-navbar-sub {
          font-size: 10px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: var(--g-navbar-sub); transition: color 0.3s;
        }
        .g-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--g-toggle-bg); border: 1px solid var(--g-toggle-bd);
          color: var(--g-toggle-tx); cursor: pointer; transition: all 0.2s;
        }
        .g-toggle:hover { background: var(--g-toggle-h); color: var(--g-navbar-tx); }

        /* ── Gantt Container ── */
        .gantt-container {
          background: var(--g-container); border-radius: 12px; overflow: hidden;
          border: 1px solid var(--g-container-bd);
          box-shadow: 0 10px 40px rgba(0,0,0,0.15); transition: background 0.3s, border-color 0.3s;
        }
        .gantt-header {
          display: flex; background: var(--g-header);
          border-bottom: 2px solid var(--g-heavy-bd); transition: background 0.3s;
        }
        .gantt-task-names-header {
          width: 280px; flex-shrink: 0; padding: 16px;
          border-right: 2px solid var(--g-heavy-bd);
          background: var(--g-names-bg); transition: background 0.3s, border-color 0.3s;
        }
        .gantt-timeline { flex: 1; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; }
        .gantt-timeline::-webkit-scrollbar { display: none; }
        .gantt-header-content { display: flex; width: ${chartWidth}px; }
        .gantt-week {
          flex: none; padding: 10px 4px; text-align: center;
          border-right: 1px solid var(--g-week-bd); font-size: 11px; font-weight: 600;
          color: var(--g-week-tx); transition: color 0.3s, border-color 0.3s;
        }

        /* ── Body ── */
        .gantt-body-wrapper { display: flex; max-height: 600px; overflow: hidden; }
        .gantt-names-panel {
          width: 280px; flex-shrink: 0; overflow: hidden;
          border-right: 2px solid var(--g-heavy-bd); transition: border-color 0.3s;
        }
        .gantt-bars-panel { flex: 1; overflow-x: auto; overflow-y: auto; }

        .task-name-cell {
          height: ${rowHeight}px; padding: 0 16px; font-size: 13px; font-weight: 500;
          color: var(--g-task-tx); white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; display: flex; align-items: center; gap: 8px;
          border-bottom: 1px solid var(--g-subtle-bd); transition: color 0.3s, background 0.3s, border-color 0.3s;
        }
        .task-name-cell:nth-child(odd)  { background: var(--g-row-odd); }
        .task-name-cell:nth-child(even) { background: var(--g-row-even); }
        .task-category-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        .bars-row {
          position: relative; height: ${rowHeight}px; width: ${chartWidth}px;
          border-bottom: 1px solid var(--g-subtle-bd); transition: background 0.3s, border-color 0.3s;
        }
        .bars-row:nth-child(odd)       { background: var(--g-row-odd); }
        .bars-row:nth-child(even)      { background: var(--g-row-even); }
        .bars-row:nth-child(odd):hover  { background: var(--g-row-hover-odd); }
        .bars-row:nth-child(even):hover { background: var(--g-row-hover-even); }

        .task-bar {
          position: absolute; top: 7px; height: 24px; border-radius: 4px;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: white; opacity: 0.92;
        }
        .task-bar:hover { opacity: 1; transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,0.25); }

        .gantt-grid { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; pointer-events: none; }
        .grid-line  { flex: none; border-right: 1px solid var(--g-grid); transition: border-color 0.3s; }

        /* ── Legend ── */
        .legend {
          display: flex; gap: 24px; padding: 18px 16px;
          background: var(--g-legend); border-top: 2px solid var(--g-heavy-bd);
          justify-content: center; flex-wrap: wrap; transition: background 0.3s, border-color 0.3s;
        }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--g-legend-tx); transition: color 0.3s; }
        .legend-color { width: 12px; height: 12px; border-radius: 3px; }

        /* ── Summary ── */
        .g-summary {
          margin-top: 36px; padding: 20px;
          background: var(--g-summary-bg); border-radius: 10px;
          border: 1px solid var(--g-summary-bd); transition: background 0.3s, border-color 0.3s;
        }
        .g-summary-title {
          font-size: 13px; font-weight: 700; color: var(--g-summary-tx);
          margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; transition: color 0.3s;
        }
        .g-summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .g-summary-card {
          padding: 14px; background: var(--g-header); border-radius: 8px;
          text-align: center; transition: background 0.3s;
        }
        .g-summary-lbl { font-size: 11px; color: var(--g-summary-lbl); font-weight: 600; margin-bottom: 4px; letter-spacing: 0.3px; transition: color 0.3s; }
        .g-summary-val { font-size: 20px; font-weight: 700; color: var(--g-summary-tx); transition: color 0.3s; }

        /* ── Scrollbars ── */
        .gantt-bars-panel::-webkit-scrollbar        { height: 8px; width: 8px; }
        .gantt-bars-panel::-webkit-scrollbar-track  { background: var(--g-scrollbar-tk); }
        .gantt-bars-panel::-webkit-scrollbar-thumb  { background: var(--g-scrollbar-th); border-radius: 4px; }
        .gantt-bars-panel::-webkit-scrollbar-thumb:hover { background: var(--g-scrollbar-thh); }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="g-navbar">
        <div className="g-navbar-inner">
          <div className="g-navbar-logo">
            <img src="/onclusive-logo.png" alt="Onclusive" />
            <div className="g-navbar-text">
              <span className="g-navbar-brand">Onclusive</span>
              <span className="g-navbar-sub">FCC Team</span>
            </div>
          </div>
          <button className="g-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* ── Content ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '36px 32px 60px' }}>

        {/* Title */}
        <h1 className="gantt-title-text" style={{ fontSize: '34px', fontWeight: '700', color: 'var(--g-title)', marginBottom: '6px', textAlign: 'center', transition: 'color 0.3s' }}>
          OCPL 2026 Gantt Chart
        </h1>
        <p style={{ color: 'var(--g-subtitle)', textAlign: 'center', marginBottom: '28px', fontSize: '14px', transition: 'color 0.3s' }}>
          {minDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} —{' '}
          {maxDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &nbsp;|&nbsp; {totalDays} Days &nbsp;|&nbsp; {allTasks.length} Tasks
        </p>

        {/* Gantt */}
        <div className="gantt-container">
          {/* Header */}
          <div className="gantt-header">
            <div className="gantt-task-names-header">
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--g-week-tx)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Task Name</div>
            </div>
            <div className="gantt-timeline" ref={timelineHeaderRef}>
              <div className="gantt-header-content" ref={headerContentRef}>
                {weeks.map((week, idx) => (
                  <div key={idx} className="gantt-week" style={{ width: `${week.daysInWeek * dayWidth}px`, minWidth: `${week.daysInWeek * dayWidth}px` }}>
                    {week.start} – {week.end}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="gantt-body-wrapper">
            <div className="gantt-names-panel" ref={ganttNamesRef}>
              {allTasks.map(task => (
                <div key={task.id} className="task-name-cell">
                  <span className="task-category-dot" style={{ backgroundColor: task.color }} />
                  {task.name}
                </div>
              ))}
            </div>
            <div className="gantt-bars-panel" ref={ganttBarsRef}>
              {allTasks.map(task => (
                <div key={task.id} className="bars-row">
                  <div className="gantt-grid">
                    {weeks.map((week, i) => (
                      <div key={i} className="grid-line" style={{ width: `${week.daysInWeek * dayWidth}px` }} />
                    ))}
                  </div>
                  <div
                    className="task-bar"
                    style={{
                      left:  `${getDayOffset(task.start) * dayWidth}px`,
                      width: `${getTaskWidth(task.start, task.end) * dayWidth}px`,
                      backgroundColor: task.color,
                    }}
                    title={`${task.name}: ${task.start} → ${task.end}`}
                  >
                    {getTaskWidth(task.start, task.end) > 3 && (
                      <span style={{ fontSize: '9px', fontWeight: '700' }}>{getTaskWidth(task.start, task.end)}d</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="legend">
            {[
              { color: '#10B981', label: 'TURF (8 tasks)' },
              { color: '#F59E0B', label: 'AUCTION & PLAYERS (11 tasks)' },
              { color: '#EF4444', label: 'OTHER ARRANGEMENTS (16 tasks)' },
              { color: '#8B5CF6', label: 'FOOD (6 tasks)' },
            ].map(l => (
              <div className="legend-item" key={l.label}>
                <div className="legend-color" style={{ backgroundColor: l.color }} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="g-summary">
          <div className="g-summary-title">📊 Summary Statistics</div>
          <div className="g-summary-grid">
            <div className="g-summary-card"><div className="g-summary-lbl">TOTAL TASKS</div><div className="g-summary-val">{allTasks.length}</div></div>
            <div className="g-summary-card"><div className="g-summary-lbl">TIMELINE</div><div className="g-summary-val">{totalDays} days</div></div>
            <div className="g-summary-card"><div className="g-summary-lbl">START DATE</div><div className="g-summary-val" style={{ color: '#10B981' }}>Feb 12</div></div>
            <div className="g-summary-card"><div className="g-summary-lbl">END DATE</div><div className="g-summary-val" style={{ color: '#8B5CF6' }}>Apr 17</div></div>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNavigateToRoadmap}
            style={{
              padding: '10px 22px', backgroundColor: '#3b82f6', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '14px', fontWeight: '600', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={e => e.target.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
