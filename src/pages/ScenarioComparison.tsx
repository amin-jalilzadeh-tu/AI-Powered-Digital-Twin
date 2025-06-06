import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Leaf, Shield, Sun, Download, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function ScenarioComparison() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [selectedScenarios, setSelectedScenarios] = useState(['manual-scenario', 'ai-balanced']);

  const availableScenarios = [
    { id: 'baseline', name: 'Baseline (No Action)', type: 'baseline' },
    { id: 'manual-scenario', name: 'High Ambition 2050 (Manual)', type: 'manual' },
    { id: 'ai-balanced', name: 'AI Roadmap A (Balanced)', type: 'ai' },
    { id: 'ai-aggressive', name: 'AI Roadmap B (Aggressive CO₂)', type: 'ai' },
    { id: 'ai-cost', name: 'AI Roadmap C (Cost Optimized)', type: 'ai' }
  ];

  const comparisonData = {
    'baseline': {
      totalCost: 0,
      co2Reduction: 0,
      peakDemandReduction: 0,
      renewableShare: 5,
      gridReliability: 65,
      implementationRisk: 0
    },
    'manual-scenario': {
      totalCost: 12.5,
      co2Reduction: 68,
      peakDemandReduction: 25,
      renewableShare: 45,
      gridReliability: 85,
      implementationRisk: 35
    },
    'ai-balanced': {
      totalCost: 9.5,
      co2Reduction: 72,
      peakDemandReduction: 27,
      renewableShare: 48,
      gridReliability: 88,
      implementationRisk: 20
    },
    'ai-aggressive': {
      totalCost: 11.0,
      co2Reduction: 82,
      peakDemandReduction: 32,
      renewableShare: 55,
      gridReliability: 82,
      implementationRisk: 25
    },
    'ai-cost': {
      totalCost: 8.0,
      co2Reduction: 58,
      peakDemandReduction: 22,
      renewableShare: 38,
      gridReliability: 80,
      implementationRisk: 15
    }
  };

  const timelineData = [
    { year: 2025, baseline: 800, manual: 800, aiBalanced: 800, aiAggressive: 800, aiCost: 800 },
    { year: 2030, baseline: 820, manual: 720, aiBalanced: 710, aiAggressive: 680, aiCost: 740 },
    { year: 2035, baseline: 840, manual: 650, aiBalanced: 630, aiAggressive: 580, aiCost: 670 },
    { year: 2040, baseline: 860, manual: 580, aiBalanced: 560, aiAggressive: 480, aiCost: 600 },
    { year: 2045, baseline: 880, manual: 520, aiBalanced: 500, aiAggressive: 420, aiCost: 540 },
    { year: 2050, baseline: 900, manual: 480, aiBalanced: 460, aiAggressive: 380, aiCost: 500 }
  ];

  const radarData = selectedScenarios.map(scenarioId => {
    const scenario = availableScenarios.find(s => s.id === scenarioId);
    const data = comparisonData[scenarioId as keyof typeof comparisonData];
    
    return {
      scenario: scenario?.name || scenarioId,
      'CO₂ Reduction': data.co2Reduction,
      'Peak Demand Reduction': data.peakDemandReduction,
      'Renewable Share': data.renewableShare,
      'Grid Reliability': data.gridReliability,
      'Cost Efficiency': Math.max(0, 100 - (data.totalCost * 8)), // Inverse of cost for radar
      'Low Risk': Math.max(0, 100 - data.implementationRisk)
    };
  });

  const handleScenarioToggle = (scenarioId: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else if (prev.length < 3) {
        return [...prev, scenarioId];
      }
      return prev;
    });
  };

  const getScenarioColor = (scenarioId: string) => {
    const colors = {
      'baseline': '#94a3b8',
      'manual-scenario': '#3b82f6',
      'ai-balanced': '#10b981',
      'ai-aggressive': '#ef4444',
      'ai-cost': '#8b5cf6'
    };
    return colors[scenarioId as keyof typeof colors] || '#6b7280';
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'totalCost': return DollarSign;
      case 'co2Reduction': return Leaf;
      case 'gridReliability': return Shield;
      case 'renewableShare': return Sun;
      default: return TrendingUp;
    }
  };

  const getMetricTrend = (value: number, isGood: boolean) => {
    if (value === 0) return null;
    return isGood ? 'up' : 'down';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Scenario Comparison & Decision Dashboard" 
        showBack 
        backTo="/rl-planning" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scenario Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Scenarios to Compare (up to 3)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {availableScenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => handleScenarioToggle(scenario.id)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${selectedScenarios.includes(scenario.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: getScenarioColor(scenario.id) }}
                  />
                  <h4 className="font-medium text-gray-900 text-sm">{scenario.name}</h4>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                    scenario.type === 'ai' ? 'bg-purple-100 text-purple-700' :
                    scenario.type === 'manual' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {scenario.type === 'ai' ? 'AI Generated' : 
                     scenario.type === 'manual' ? 'Manual' : 'Baseline'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics Comparison */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics Comparison</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {['totalCost', 'co2Reduction', 'peakDemandReduction', 'renewableShare'].map((metric) => {
              const MetricIcon = getMetricIcon(metric);
              const labels = {
                totalCost: 'Total Cost (€M)',
                co2Reduction: 'CO₂ Reduction (%)',
                peakDemandReduction: 'Peak Demand Reduction (%)',
                renewableShare: 'Renewable Share (%)'
              };
              
              return (
                <div key={metric} className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <MetricIcon className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {labels[metric as keyof typeof labels]}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedScenarios.map((scenarioId) => {
                      const scenario = availableScenarios.find(s => s.id === scenarioId);
                      const value = comparisonData[scenarioId as keyof typeof comparisonData][metric as keyof typeof comparisonData.baseline];
                      const isGoodMetric = metric !== 'totalCost';
                      const trend = getMetricTrend(value, isGoodMetric);
                      
                      return (
                        <div key={scenarioId} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getScenarioColor(scenarioId) }}
                            />
                            <span className="text-gray-600 truncate">{scenario?.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold text-gray-900">
                              {metric === 'totalCost' ? `€${value}M` : `${value}%`}
                            </span>
                            {trend && (
                              trend === 'up' ? 
                                <TrendingUp className="h-3 w-3 text-green-600" /> :
                                <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Timeline Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Demand Timeline (MWh)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                {selectedScenarios.map((scenarioId) => {
                  const dataKey = scenarioId === 'manual-scenario' ? 'manual' : 
                                 scenarioId === 'ai-balanced' ? 'aiBalanced' :
                                 scenarioId === 'ai-aggressive' ? 'aiAggressive' :
                                 scenarioId === 'ai-cost' ? 'aiCost' : 'baseline';
                  
                  return (
                    <Line
                      key={scenarioId}
                      type="monotone"
                      dataKey={dataKey}
                      stroke={getScenarioColor(scenarioId)}
                      strokeWidth={2}
                      name={availableScenarios.find(s => s.id === scenarioId)?.name}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Criteria Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData[0] ? Object.keys(radarData[0]).filter(key => key !== 'scenario').map(key => ({
                metric: key,
                ...radarData.reduce((acc, scenario, index) => ({
                  ...acc,
                  [`scenario${index}`]: scenario[key as keyof typeof scenario]
                }), {})
              })) : []}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                {radarData.map((_, index) => (
                  <Radar
                    key={index}
                    name={radarData[index].scenario}
                    dataKey={`scenario${index}`}
                    stroke={getScenarioColor(selectedScenarios[index])}
                    fill={getScenarioColor(selectedScenarios[index])}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Metric</th>
                  {selectedScenarios.map((scenarioId) => {
                    const scenario = availableScenarios.find(s => s.id === scenarioId);
                    return (
                      <th key={scenarioId} className="text-center py-3 px-4 font-medium text-gray-900">
                        {scenario?.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { key: 'totalCost', label: 'Total Investment (€M)', unit: 'M' },
                  { key: 'co2Reduction', label: 'CO₂ Emissions Reduction (%)', unit: '%' },
                  { key: 'peakDemandReduction', label: 'Peak Demand Reduction (%)', unit: '%' },
                  { key: 'renewableShare', label: 'Renewable Energy Share (%)', unit: '%' },
                  { key: 'gridReliability', label: 'Grid Reliability Score', unit: '/100' },
                  { key: 'implementationRisk', label: 'Implementation Risk', unit: '%' }
                ].map((metric) => (
                  <tr key={metric.key}>
                    <td className="py-3 px-4 font-medium text-gray-900">{metric.label}</td>
                    {selectedScenarios.map((scenarioId) => {
                      const value = comparisonData[scenarioId as keyof typeof comparisonData][metric.key as keyof typeof comparisonData.baseline];
                      return (
                        <td key={scenarioId} className="py-3 px-4 text-center">
                          <span className="font-semibold text-gray-900">
                            {metric.unit === 'M' ? `€${value}M` : `${value}${metric.unit}`}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">AI Recommendations</h3>
          <div className="space-y-3 text-blue-800">
            <p>
              <strong>Best Overall Performance:</strong> AI Roadmap A (Balanced) offers the optimal 
              combination of cost-effectiveness (€9.5M), high CO₂ reduction (72%), and excellent 
              grid reliability (88%) with manageable implementation risk.
            </p>
            <p>
              <strong>Maximum Environmental Impact:</strong> AI Roadmap B (Aggressive CO₂) achieves 
              the highest emissions reduction (82%) but at increased cost and complexity.
            </p>
            <p>
              <strong>Budget-Conscious Option:</strong> AI Roadmap C (Cost Optimized) provides 
              significant improvements over baseline at the lowest investment (€8M).
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <Download className="h-4 w-4" />
              <span>Export Comparison (PDF)</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              <FileText className="h-4 w-4" />
              <span>Generate Decision Report</span>
            </button>
          </div>
          
          <button
            onClick={() => navigate('/export-reports')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Proceed to Export Reports
          </button>
        </div>
      </main>
    </div>
  );
}