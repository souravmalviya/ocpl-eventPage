import { useState } from 'react';
import OCPL2026DetailedRoadmap from '../ocpl2026.jsx';
import OCPL2026GanttChart from '../gantchart.jsx';

function App() {
  const [currentView, setCurrentView] = useState('roadmap');
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return currentView === 'roadmap' ? (
    <OCPL2026DetailedRoadmap
      onNavigateToGantt={() => setCurrentView('gantt')}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  ) : (
    <OCPL2026GanttChart
      onNavigateToRoadmap={() => setCurrentView('roadmap')}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
}

export default App;
