import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Download, Users, Wrench, Zap, Sun, BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function GNNAnalysis() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [analysisConfig, setAnalysisConfig] = useState({
    dataSource: 'scenario-2035',
    analysisType: 'energy-communities',
    gnnModel: 'graphsage'
  });
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const dataSourceOptions = [
    { value: 'baseline-2025', label: 'Baseline: Northwood District (2025)' },
    { value: 'scenario-2035', label: 'Scenario: High Ambition 2050 (Year: 2035)' },
    { value: 'scenario-2050', label: 'Scenario: High Ambition 2050 (Year: 2050)' }
  ];

  const analysisTypes = [
    {
      value: 'energy-communities',
      label: 'Identify Potential Energy Communities',
      description: 'Load Complementarity Analysis',
      icon: Users,
      color: '#10b981'
    },
    {
      value: 'retrofit-groups',
      label: 'Group Buildings for Targeted Retrofit Campaigns',
      description: 'Physical & Energy Similarity',
      icon: Wrench,
      color: '#f97316'
    },
    {
      value: 'grid-congestion',
      label: 'Pinpoint Grid Congestion Contributors',
      description: 'Network Stress Propagation',
      icon: Zap,
      color: '#ef4444'
    },
    {
      value: 'der-suitability',
      label: 'Assess DER Suitability Zones',
      description: 'Community Solar & Grid Capacity',
      icon: Sun,
      color: '#eab308'
    }
  ];

  const gnnModels = [
    { value: 'graphsage', label: 'GraphSAGE (Default)' },
    { value: 'gcn', label: 'GCN' },
    { value: 'gat', label: 'GAT' }
  ];

  const mockResults = {
    'energy-communities': {
      clusters: [
        {
          id: 'alpha',
          name: 'Community Alpha',
          buildings: 15,
          characteristics: 'High Residential Load, Medium PV Potential',
          recommendation: 'Consider 100kWh battery storage due to complementary morning/evening peaks'
        },
        {
          id: 'beta',
          name: 'Community Beta',
          buildings: 22,
          characteristics: 'Mixed Commercial/Residential, High PV Potential',
          recommendation: 'Ideal for community solar installation with shared benefits'
        },
        {
          id: 'gamma',
          name: 'Community Gamma',
          buildings: 18,
          characteristics: 'Industrial Load Profile, Low PV Potential',
          recommendation: 'Focus on demand response and energy efficiency measures'
        }
      ],
      insights: 'GNN identified 3 potential energy communities. Community Alpha shows strong potential for shared battery storage due to complementary morning/evening peaks.',
      performance: { accuracy: 0.75, keyFeatures: ['Building Type', 'Demand Profile Shape', 'Proximity to Substation'] }
    },
    'retrofit-groups': {
      clusters: [
        {
          id: 'high-priority',
          name: 'High Priority Group',
          buildings: 45,
          characteristics: 'Pre-1980, High Demand, Poor Insulation',
          recommendation: 'Deep energy retrofits with heat pump installation'
        },
        {
          id: 'medium-priority',
          name: 'Medium Priority Group',
          buildings: 67,
          characteristics: '1980-2000, Medium Demand, Partial Insulation',
          recommendation: 'Targeted insulation and window upgrades'
        },
        {
          id: 'low-priority',
          name: 'Low Priority Group',
          buildings: 89,
          characteristics: 'Post-2000, Low Demand, Good Insulation',
          recommendation: 'Smart controls and minor efficiency improvements'
        }
      ],
      insights: 'Buildings clustered into 3 retrofit priority groups based on age, demand, and thermal characteristics. High priority group offers greatest energy savings potential.',
      performance: { accuracy: 0.82, keyFeatures: ['Construction Year', 'Thermal Properties', 'Current Demand'] }
    }
  };

  const handleConfigChange = (field: string, value: string) => {
    setAnalysisConfig(prev => ({ ...prev, [field]: value }));
  };

  const runAnalysis = () => {
    setIsRunning(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResults(mockResults[analysisConfig.analysisType] || mockResults['energy-communities']);
      setIsRunning(false);
    }, 3000);
  };

  const selectedAnalysisType = analysisTypes.find(type => type.value === analysisConfig.analysisType);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Advanced Analysis: GNN-Powered Insights for ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/knowledge-graph" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analysis Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Analysis Configuration</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Data Source for Analysis
              </label>
              <select
                value={analysisConfig.dataSource}
                onChange={(e) => handleConfigChange('dataSource', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dataSourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Analysis Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select GNN Analysis Type / Goal
              </label>
              <select
                value={analysisConfig.analysisType}
                onChange={(e) => handleConfigChange('analysisType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {analysisTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* GNN Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GNN Model Architecture
              </label>
              <select
                value={analysisConfig.gnnModel}
                onChange={(e) => handleConfigChange('gnnModel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {gnnModels.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Analysis Description */}
          {selectedAnalysisType && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: selectedAnalysisType.color }}
                >
                  <selectedAnalysisType.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">{selectedAnalysisType.label}</h4>
                  <p className="text-sm text-blue-700">{selectedAnalysisType.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Run Analysis Button */}
          <div className="mt-6">
            <button
              onClick={runAnalysis}
              disabled={isRunning}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isRunning
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Play className="h-5 w-5" />
              <span>{isRunning ? 'Running GNN Analysis...' : 'Run GNN Analysis'}</span>
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {results && (
          <div className="space-y-8">
            {/* Map Visualization */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">GNN Analysis Results - Map Visualization</h3>
              
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="gnn-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#gnn-grid)" />
                  </svg>
                </div>

                {/* Clustered Buildings */}
                {results.clusters.map((cluster, clusterIndex) => {
                  const colors = ['#10b981', '#3b82f6', '#f97316', '#8b5cf6'];
                  const color = colors[clusterIndex % colors.length];
                  
                  return Array.from({ length: cluster.buildings }, (_, i) => (
                    <div
                      key={`${cluster.id}-${i}`}
                      className="absolute cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: `${20 + (clusterIndex * 25) + (i % 5) * 3}%`,
                        top: `${25 + Math.floor(i / 5) * 8 + (clusterIndex * 5)}%`
                      }}
                      title={`${cluster.name} - Building ${i + 1}`}
                    >
                      <div 
                        className="w-3 h-3 rounded border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ));
                })}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
                  <div className="text-xs font-medium text-gray-900 mb-2">Clusters</div>
                  <div className="space-y-1 text-xs">
                    {results.clusters.map((cluster, index) => {
                      const colors = ['#10b981', '#3b82f6', '#f97316', '#8b5cf6'];
                      const color = colors[index % colors.length];
                      
                      return (
                        <div key={cluster.id} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span>{cluster.name} ({cluster.buildings} bldgs)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Cluster Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cluster/Group Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.clusters.map((cluster, index) => {
                  const colors = ['#10b981', '#3b82f6', '#f97316', '#8b5cf6'];
                  const color = colors[index % colors.length];
                  
                  return (
                    <div key={cluster.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                        />
                        <h4 className="font-semibold text-gray-900">{cluster.name}</h4>
                        <span className="text-sm text-gray-600">({cluster.buildings} Buildings)</span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Characteristics:</span>
                          <p className="text-gray-600">{cluster.characteristics}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Recommendation:</span>
                          <p className="text-gray-600">{cluster.recommendation}</p>
                        </div>
                      </div>
                      
                      <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Member List →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Insights & Recommendations</h3>
              <p className="text-blue-800 mb-4">{results.insights}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-900">Model Performance:</span>
                  <p className="text-blue-700">Accuracy/Silhouette Score: {results.performance.accuracy}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-900">Key Features:</span>
                  <p className="text-blue-700">{results.performance.keyFeatures.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  <Download className="h-4 w-4" />
                  <span>Export Cluster Assignments (CSV)</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  <BarChart3 className="h-4 w-4" />
                  <span>Export GNN Insights (PDF)</span>
                </button>
              </div>
              
              <button
                onClick={() => navigate('/rl-planning')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Proceed to RL Planning
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}