import React, { useMemo, useRef, useEffect } from 'react';

export default function OCPL2026GanttChart({ onNavigateToRoadmap }) {
  const timelineHeaderRef = useRef(null);
  const ganttBarsRef = useRef(null);
  const ganttNamesRef = useRef(null);
  const headerContentRef = useRef(null);

  useEffect(() => {
    const timelineHeader = timelineHeaderRef.current;
    const ganttBars = ganttBarsRef.current;
    const ganttNames = ganttNamesRef.current;

    if (!timelineHeader || !ganttBars || !ganttNames) return;

    const handleHeaderScroll = () => {
      ganttBars.scrollLeft = timelineHeader.scrollLeft;
    };

    const handleBarsScroll = () => {
      timelineHeader.scrollLeft = ganttBars.scrollLeft;
      ganttNames.scrollTop = ganttBars.scrollTop;
    };

    const handleNamesScroll = () => {
      ganttBars.scrollTop = ganttNames.scrollTop;
    };

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
    // TURF
    { id: 1, name: 'Turf Scouting', start: '12/2/26', end: '18/2/26', category: 'TURF', color: '#10B981' },
    { id: 2, name: 'Turf Booking (Advance)', start: '18/2/26', end: '18/2/26', category: 'TURF', color: '#10B981' },
    { id: 3, name: 'Tables, Fans, Cooler, Mic, Speaker (Vendor)', start: '2/4/26', end: '8/4/26', category: 'TURF', color: '#10B981' },
    { id: 4, name: 'Tables, Fans, Cooler, Mic, Speaker (Payment)', start: '9/4/26', end: '9/4/26', category: 'TURF', color: '#10B981' },
    { id: 5, name: 'Parking Arrangements', start: '10/4/26', end: '15/4/26', category: 'TURF', color: '#10B981' },
    { id: 6, name: 'WiFi Management', start: '10/4/26', end: '15/4/26', category: 'TURF', color: '#10B981' },
    { id: 7, name: 'Glasses, Tissues, Dustbins, Banners', start: '15/4/26', end: '16/4/26', category: 'TURF', color: '#10B981' },
    { id: 8, name: 'Turf - Final Payment & Deposit', start: '17/4/26', end: '17/4/26', category: 'TURF', color: '#10B981' },

    // AUCTION & PLAYERS
    { id: 9, name: 'Owners & Captain Finalization', start: '23/2/26', end: '25/2/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 10, name: 'Final Logos & Banner for Auction', start: '2/3/26', end: '4/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 11, name: 'Auction Rules', start: '3/3/26', end: '6/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 12, name: 'Auction PPT', start: '9/3/26', end: '9/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 13, name: 'Final List of Players', start: '8/3/26', end: '8/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 14, name: 'Rule Book Finalization', start: '9/3/26', end: '12/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 15, name: '🎯 AUCTION DAY', start: '10/3/26', end: '10/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 16, name: 'Audience Form Rollout', start: '17/3/26', end: '20/3/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 17, name: 'Remote Players Arrangement', start: '10/4/26', end: '13/4/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 18, name: 'Total List & Food Coupons Finalization', start: '10/4/26', end: '10/4/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },
    { id: 19, name: 'Women Travel Arrangements (after 8 PM)', start: '14/4/26', end: '14/4/26', category: 'AUCTION & PLAYERS', color: '#F59E0B' },

    // OTHER ARRANGEMENTS
    { id: 20, name: 'Email & Marketing for Event', start: '12/3/26', end: '16/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 21, name: 'Jersey Vendors Finalization', start: '13/3/26', end: '17/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 22, name: 'Photographer & Videographer (Vendor & Advance)', start: '16/3/26', end: '18/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 23, name: 'Jerseys Info for Players & Audience', start: '20/3/26', end: '24/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 24, name: 'Umpires Arrangement', start: '24/3/26', end: '24/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 25, name: 'Scorer Arrangement', start: '24/3/26', end: '24/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 26, name: 'Photographer & Videographer (Finalize & Payment)', start: '26/3/26', end: '26/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 27, name: 'Crickheroes Setup', start: '27/3/26', end: '27/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 28, name: 'Trophies Order (Advance)', start: '28/3/26', end: '31/3/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 29, name: 'Medical Supplies (Advance)', start: '4/4/26', end: '6/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 30, name: 'Trophies Collect (Final Payment)', start: '8/4/26', end: '8/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 31, name: 'Medical Supplies (Final Payment)', start: '7/4/26', end: '7/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 32, name: 'Team Setup on App', start: '7/4/26', end: '7/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 33, name: 'Collect Jersey', start: '9/4/26', end: '9/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 34, name: 'Balls - 36 units', start: '11/4/26', end: '11/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },
    { id: 35, name: 'Pooja Material Ordering', start: '16/4/26', end: '16/4/26', category: 'OTHER ARRANGEMENTS', color: '#EF4444' },

    // FOOD
    { id: 36, name: 'Contact Vendors', start: '6/4/26', end: '8/4/26', category: 'FOOD', color: '#8B5CF6' },
    { id: 37, name: 'Glucose Arrangement', start: '7/4/26', end: '7/4/26', category: 'FOOD', color: '#8B5CF6' },
    { id: 38, name: 'ORS Arrangement', start: '7/4/26', end: '7/4/26', category: 'FOOD', color: '#8B5CF6' },
    { id: 39, name: 'Finalize Menu & Advance Payments', start: '7/4/26', end: '7/4/26', category: 'FOOD', color: '#8B5CF6' },
    { id: 40, name: 'Order 25 Jugs of Water', start: '10/4/26', end: '10/4/26', category: 'FOOD', color: '#8B5CF6' },
    { id: 41, name: 'Tasting & Finalize Vendors', start: '10/4/26', end: '10/4/26', category: 'FOOD', color: '#8B5CF6' }
  ];

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(2000 + year, month - 1, day);
  };

  const { minDate, maxDate } = useMemo(() => {
    const allDates = allTasks.flatMap(task => [parseDate(task.start), parseDate(task.end)]);
    return {
      minDate: new Date(Math.min(...allDates)),
      maxDate: new Date(Math.max(...allDates))
    };
  }, []);

  const getTotalDays = () => Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;

  const getDayOffset = (date) => Math.floor((parseDate(date) - minDate) / (1000 * 60 * 60 * 24));

  const getTaskWidth = (start, end) => Math.max(getDayOffset(end || start) - getDayOffset(start) + 1, 1);

  const totalDays = getTotalDays();
  const dayWidth = 42;
  const chartWidth = totalDays * dayWidth;
  const rowHeight = 36;

  const getWeekHeaders = () => {
    const weeks = [];
    let current = new Date(minDate);

    while (current <= maxDate) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);

      weeks.push({
        start: weekStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        end: weekEnd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        daysInWeek: Math.min(7, Math.ceil((maxDate - current) / (1000 * 60 * 60 * 24)) + 1)
      });

      current.setDate(current.getDate() + 7);
    }

    return weeks;
  };

  const weeks = getWeekHeaders();

  return (
    <div style={{ width: '100%', backgroundColor: '#020617', padding: '32px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;600;500&family=Inter:wght@400;500&display=swap');

        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .gantt-title { font-family: 'Poppins', sans-serif; }

        .gantt-container {
          background: #1e293b;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #475569;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }

        .gantt-header {
          display: flex;
          background: #0f172a;
          border-bottom: 2px solid #475569;
        }

        .gantt-task-names-header {
          width: 280px;
          flex-shrink: 0;
          padding: 16px;
          border-right: 2px solid #475569;
          background: #1e293b;
        }

        /* Header timeline — hidden scrollbar, synced via JS */
        .gantt-timeline {
          flex: 1;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
        }
        .gantt-timeline::-webkit-scrollbar { display: none; }

        .gantt-header-content {
          display: flex;
          width: ${chartWidth}px;
        }

        .gantt-week {
          flex: none;
          padding: 8px 4px;
          text-align: center;
          border-right: 1px solid #334155;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
        }

        /* Body: two panels side-by-side */
        .gantt-body-wrapper {
          display: flex;
          max-height: 600px;
          overflow: hidden;
        }

        /* Left panel — task names, scrolls vertically via JS only */
        .gantt-names-panel {
          width: 280px;
          flex-shrink: 0;
          overflow: hidden;
          border-right: 2px solid #475569;
        }

        /* Right panel — bars, scrolls both axes */
        .gantt-bars-panel {
          flex: 1;
          overflow-x: auto;
          overflow-y: auto;
        }

        .task-name-cell {
          height: ${rowHeight}px;
          padding: 0 16px;
          font-size: 13px;
          font-weight: 500;
          color: #e2e8f0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #334155;
        }

        .task-name-cell:nth-child(odd)  { background: #0f172a; }
        .task-name-cell:nth-child(even) { background: #1e293b; }

        .task-category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Each row in the bars panel — fixed pixel width to match header */
        .bars-row {
          position: relative;
          height: ${rowHeight}px;
          width: ${chartWidth}px;
          border-bottom: 1px solid #334155;
        }

        .bars-row:nth-child(odd)  { background: #0f172a; }
        .bars-row:nth-child(even) { background: #1e293b; }
        .bars-row:nth-child(odd):hover  { background: #1e293b; }
        .bars-row:nth-child(even):hover { background: #334155; }

        .task-bar {
          position: absolute;
          top: 6px;
          height: 24px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
          color: white;
          opacity: 0.9;
        }

        .task-bar:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .gantt-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          pointer-events: none;
        }

        .grid-line {
          flex: none;
          border-right: 1px solid rgba(148, 163, 184, 0.1);
        }

        .legend {
          display: flex;
          gap: 24px;
          padding: 20px 16px;
          background: #0f172a;
          border-top: 2px solid #475569;
          justify-content: center;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #cbd5e1;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .gantt-bars-panel::-webkit-scrollbar        { height: 8px; width: 8px; }
        .gantt-bars-panel::-webkit-scrollbar-track  { background: #1e293b; }
        .gantt-bars-panel::-webkit-scrollbar-thumb  { background: #475569; border-radius: 4px; }
        .gantt-bars-panel::-webkit-scrollbar-thumb:hover { background: #64748b; }
      `}</style>

      <div style={{ maxWidth: '100%' }}>
        {/* Title */}
        <h1
          className="gantt-title"
          style={{ fontSize: '36px', fontWeight: '700', color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}
        >
          OCPL 2026 Gantt Chart
        </h1>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
          {minDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} —{' '}
          {maxDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} | {totalDays} Days | {allTasks.length} Tasks
        </p>

        {/* Gantt Chart */}
        <div className="gantt-container">

          {/* Header */}
          <div className="gantt-header">
            <div className="gantt-task-names-header">
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Task Name
              </div>
            </div>
            <div className="gantt-timeline" ref={timelineHeaderRef}>
              <div className="gantt-header-content" ref={headerContentRef}>
                {weeks.map((week, idx) => (
                  <div
                    key={idx}
                    className="gantt-week"
                    style={{ width: `${week.daysInWeek * dayWidth}px`, minWidth: `${week.daysInWeek * dayWidth}px` }}
                  >
                    {week.start} - {week.end}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body — two-panel layout */}
          <div className="gantt-body-wrapper">

            {/* Left panel: task names only, no scroll UI */}
            <div className="gantt-names-panel" ref={ganttNamesRef}>
              {allTasks.map((task) => (
                <div key={task.id} className="task-name-cell">
                  <span className="task-category-dot" style={{ backgroundColor: task.color }}></span>
                  {task.name}
                </div>
              ))}
            </div>

            {/* Right panel: bars, full scroll */}
            <div className="gantt-bars-panel" ref={ganttBarsRef}>
              {allTasks.map((task) => (
                <div key={task.id} className="bars-row">
                  <div className="gantt-grid">
                    {weeks.map((week, i) => (
                      <div
                        key={i}
                        className="grid-line"
                        style={{ width: `${week.daysInWeek * dayWidth}px` }}
                      />
                    ))}
                  </div>
                  <div
                    className="task-bar"
                    style={{
                      left: `${getDayOffset(task.start) * dayWidth}px`,
                      width: `${getTaskWidth(task.start, task.end) * dayWidth}px`,
                      backgroundColor: task.color,
                    }}
                    title={`${task.name}: ${task.start} to ${task.end}`}
                  >
                    {getTaskWidth(task.start, task.end) > 3 && (
                      <span style={{ fontSize: '9px', fontWeight: '700' }}>
                        {getTaskWidth(task.start, task.end)}d
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Legend */}
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#10B981' }}></div>
              <span>TURF (8 tasks)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#F59E0B' }}></div>
              <span>AUCTION & PLAYERS (11 tasks)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#EF4444' }}></div>
              <span>OTHER ARRANGEMENTS (16 tasks)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#8B5CF6' }}></div>
              <span>FOOD (6 tasks)</span>
            </div>
          </div>

        </div>

        {/* Summary */}
        <div style={{ marginTop: '40px', padding: '20px', background: '#1e293b', borderRadius: '8px', border: '1px solid #475569' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#e2e8f0', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            📊 Summary Statistics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ padding: '12px', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px' }}>TOTAL TASKS</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#e2e8f0' }}>{allTasks.length}</div>
            </div>
            <div style={{ padding: '12px', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px' }}>TIMELINE</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#e2e8f0' }}>{totalDays} days</div>
            </div>
            <div style={{ padding: '12px', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px' }}>START DATE</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>Feb 12</div>
            </div>
            <div style={{ padding: '12px', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px' }}>END DATE</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#8B5CF6' }}>Apr 17</div>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNavigateToRoadmap}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
