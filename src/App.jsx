import { useState } from 'react';
import OCPL2026DetailedRoadmap from '../ocpl2026.jsx';
import OCPL2026GanttChart from '../gantchart.jsx';

const GANTT_DATES_KEY = 'ocpl2026-gantt-dates';

function App() {
  const [currentView, setCurrentView] = useState('roadmap');
  const [theme, setTheme] = useState('dark');

  // Shared Gantt task-date overrides — lifted here so roadmap edits
  // instantly propagate into the Gantt chart when the user switches views.
  const [ganttDates, setGanttDates] = useState(() => {
    try { return JSON.parse(localStorage.getItem(GANTT_DATES_KEY) || '{}'); }
    catch { return {}; }
  });

  const updateGanttDates = (taskIds, parsedDate) => {
    if (!parsedDate || !taskIds?.length) return;
    setGanttDates(prev => {
      const next = { ...prev };
      taskIds.forEach(id => { next[id] = { ...(prev[id] || {}), ...parsedDate }; });
      localStorage.setItem(GANTT_DATES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return currentView === 'roadmap' ? (
    <OCPL2026DetailedRoadmap
      onNavigateToGantt={() => setCurrentView('gantt')}
      theme={theme}
      toggleTheme={toggleTheme}
      updateGanttDates={updateGanttDates}
    />
  ) : (
    <OCPL2026GanttChart
      onNavigateToRoadmap={() => setCurrentView('roadmap')}
      theme={theme}
      toggleTheme={toggleTheme}
      ganttDates={ganttDates}
    />
  );
}

export default App;
