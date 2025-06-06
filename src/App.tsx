import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DistrictSelection from './pages/DistrictSelection';
import DataOverview from './pages/DataOverview';
import DetailedExploration from './pages/DetailedExploration';
import ScenarioConfiguration from './pages/ScenarioConfiguration';
import InterventionSelection from './pages/InterventionSelection';
import SimulationProgress from './pages/SimulationProgress';
import GridImpactAnalysis from './pages/GridImpactAnalysis';
import KnowledgeGraph from './pages/KnowledgeGraph';
import GNNAnalysis from './pages/GNNAnalysis';
import RLPlanning from './pages/RLPlanning';
import ScenarioComparison from './pages/ScenarioComparison';
import ExportReports from './pages/ExportReports';
import StakeholderFeedback from './pages/StakeholderFeedback';
import RealTimeDashboard from './pages/RealTimeDashboard';
import AIInsights from './pages/AIInsights';
import PredictiveAnalytics from './pages/PredictiveAnalytics';
import AdvancedModeling from './pages/AdvancedModeling';
import ComparativeAnalytics from './pages/ComparativeAnalytics';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/district-selection" element={<DistrictSelection />} />
            <Route path="/data-overview" element={<DataOverview />} />
            <Route path="/detailed-exploration" element={<DetailedExploration />} />
            <Route path="/scenario-configuration" element={<ScenarioConfiguration />} />
            <Route path="/intervention-selection" element={<InterventionSelection />} />
            <Route path="/simulation-progress" element={<SimulationProgress />} />
            <Route path="/grid-impact-analysis" element={<GridImpactAnalysis />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/gnn-analysis" element={<GNNAnalysis />} />
            <Route path="/rl-planning" element={<RLPlanning />} />
            <Route path="/scenario-comparison" element={<ScenarioComparison />} />
            <Route path="/export-reports" element={<ExportReports />} />
            <Route path="/stakeholder-feedback" element={<StakeholderFeedback />} />
            <Route path="/real-time-dashboard" element={<RealTimeDashboard />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
            <Route path="/advanced-modeling" element={<AdvancedModeling />} />
            <Route path="/comparative-analytics" element={<ComparativeAnalytics />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;