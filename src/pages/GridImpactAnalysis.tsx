import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Play, Pause } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import KPICard from '../components/KPICard';

export default function GridImpactAnalysis() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [selectedYear, setSelectedYear] = useState(2030);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationYear, setAnimationYear] = useState(2025);

  const years = [2025, 2030, 2035, 2040, 2045, 2050];
  
  const trajectoryData = [
    { year: 2025, demand: 800, generation: 160, emissions: 450, cost: 2.1 },
    { year: 2030, demand: 720, generation: 280, emissions: 320, cost: 2.8 },
    { year: 2035, demand: 650, generation: 420, emissions: 210, cost: 3.2 },
    { year: 2040, demand: 580, generation: 520, emissions: 140, cost: 3.6 },
    { year: 2045, demand: 520, generation: 580, emissions: 95, cost: 3.9 },
    { year: 2050, demand: 480, generation: 620, emissions: 65, cost: 4.1 }
  ];

  const transformerData = [
    { id: 'T-001', name: 'Transformer Alpha', baseline: 85, scenario: 72, status: 'improved' },
    { id: 'T-002', name: 'Transformer Beta', baseline: 50, scenario: 58, status: 'increased' },
    { id: 'T-003', name: 'Transformer Gamma', baseline: 78, scenario: 65, status: 'improved' },
    { id: 'T-004', name: 'Transformer Delta', baseline: 92, scenario: 88, status: 'improved' }
  ];

  const monthlyProfile = [
    { month: 'Jan', baseline: 950, scenario: 820 },
    { month: 'Feb', baseline: 1050, scenario: 890 },
    { month: 'Mar', baseline: 800, scenario: 720 },
    { month: 'Apr', baseline: 700, scenario: 630 },
    { month: 'May', baseline: 600, scenario: 540 },
    { month: 'Jun', baseline: 500, scenario: 450 },
    { month: 'Jul', baseline: 550, scenario: 495 },
    { month: 'Aug', baseline: 580, scenario: 522 },
    { month: 'Sep', baseline: 650, scenario: 585 },
    { month: 'Oct', baseline: 750, scenario: 675 },
    { month: 'Nov', baseline: 900, scenario: 810 },
    { month: 'Dec', baseline: 1100, scenario: 990 }
  ];

  const currentYearData = trajectoryData.find(d => d.year === selectedYear) || trajectoryData[1];

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationYear(2025);
    
    const interval = setInterval(() => {
      setAnimationYear(prev => {
        if (prev >= 2050) {
          setIsAnimating(false);
          clearInterval(interval);
          return 2050;
        }
        return prev + 5;
      });
    }, 1000);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Grid Impact Analysis: ${state.currentScenario?.name || 'Scenario Results'}`} 
        showBack 
        backTo="/simulation-progress" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Peak Demand Reduction"
            value="27%"
            icon="TrendingDown"
            color="#10b981"
            trend="down"
            subtitle={`vs baseline (${selectedYear})`}
          />
          <KPICard
            title="Local Generation"
            value={`${currentYearData.generation} MWh`}
            icon="Sun"
            color="#eab308"
            trend="up"
            subtitle="Annual renewable output"
          />
          <KPICard
            title="CO₂ Emissions"
            value={`${currentYearData.emissions} tonnes`}
            icon="Leaf"
            color="#10b981"
            trend="down"
            subtitle="Annual district emissions"
          />
          <KPICard
            title="Grid Violations"
            value="0"
            icon="Shield"
            color="#10b981"
            subtitle="Transformer overloads"
          />
        </div>

        {/* Time Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Temporal Analysis</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={isAnimating ? stopAnimation : startAnimation}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isAnimating 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isAnimating ? 'Stop' : 'Play'} Animation</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Select Year:</span>
            <div className="flex space-x-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedYear === year || (isAnimating && animationYear === year)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            {isAnimating && (
              <span className="text-sm text-blue-600 font-medium">
                Animating: {animationYear}
              </span>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trajectory Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Long-term Trajectory</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  name="Demand (MWh)"
                />
                <Line 
                  type="monotone" 
                  dataKey="generation" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  name="Local Generation (MWh)"
                />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  name="CO₂ Emissions (tonnes)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Profile */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Demand Profile ({selectedYear})
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyProfile}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="baseline" fill="#94a3b8" name="Baseline" />
                <Bar dataKey="scenario" fill="#3b82f6" name="Scenario" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transformer Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transformer Loading Analysis ({selectedYear})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {transformerData.map((transformer) => (
              <div key={transformer.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{transformer.name}</h4>
                  {transformer.status === 'improved' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Baseline:</span>
                    <span className={`font-medium ${
                      transformer.baseline > 80 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {transformer.baseline}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Scenario:</span>
                    <span className={`font-medium ${
                      transformer.scenario > 80 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transformer.scenario}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    {transformer.status === 'improved' ? (
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                    )}
                    <span className={`font-medium ${
                      transformer.status === 'improved' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {Math.abs(transformer.scenario - transformer.baseline)}% 
                      {transformer.status === 'improved' ? ' reduction' : ' increase'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Insights & Recommendations</h3>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Grid Stability Improved:</strong> Peak demand reduction of 27% significantly reduces 
                transformer stress, eliminating all overload conditions by {selectedYear}.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Renewable Integration Success:</strong> Local generation reaches {currentYearData.generation} MWh 
                annually, covering {Math.round((currentYearData.generation / currentYearData.demand) * 100)}% of district demand.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Environmental Impact:</strong> CO₂ emissions reduced by {Math.round(((450 - currentYearData.emissions) / 450) * 100)}% 
                compared to baseline, exceeding policy targets.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/knowledge-graph')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View Knowledge Graph
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/gnn-analysis')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Advanced GNN Analysis
            </button>
            <button
              onClick={() => navigate('/scenario-comparison')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Compare Scenarios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}