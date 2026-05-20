import { useState } from 'react';
import OCPL2026DetailedRoadmap from '../ocpl2026.jsx';
import OCPL2026GanttChart from '../gantchart.jsx';

function App() {
  const [currentView, setCurrentView] = useState('roadmap');

  return currentView === 'roadmap' ? (
    <OCPL2026DetailedRoadmap onNavigateToGantt={() => setCurrentView('gantt')} />
  ) : (
    <OCPL2026GanttChart onNavigateToRoadmap={() => setCurrentView('roadmap')} />
  );
}

export default App;
