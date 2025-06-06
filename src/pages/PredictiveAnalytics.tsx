import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Calendar, Cloud, Thermometer, Zap, AlertTriangle, Target, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function PredictiveAnalytics() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1-year');
  const [selectedScenario, setSelectedScenario] = useState('current-trends');
  const [selectedMetric, setSelectedMetric] = useState('demand');

  const timeframes = [
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' },
    { value: '1-year', label: '1 Year' },
    { value: '5-years', label: '5 Years' },
    { value: '10-years', label: '10 Years' }
  ];

  const scenarios = [
    { value: 'current-trends', label: 'Current Trends' },
    { value: 'accelerated-adoption', label: 'Accelerated EV/HP Adoption' },
    { value: 'climate-change', label: 'Climate Change Impact' },
    { value: 'policy-changes', label: 'New Policy Implementation' }
  ];

  const metrics = [
    { value: 'demand', label: 'Energy Demand', icon: Zap },
    { value: 'peak-load', label: 'Peak Load', icon: TrendingUp },
    { value: 'renewable', label: 'Renewable Generation', icon: 'Sun' },
    { value: 'emissions', label: 'CO₂ Emissions', icon: Cloud }
  ];

  // Forecast data
  const demandForecast = [
    { month: 'Jan 2025', historical: 800, predicted: 820, confidence_low: 780, confidence_high: 860, actual: null },
    { month: 'Feb 2025', historical: 850, predicted: 870, confidence_low: 830, confidence_high: 910, actual: null },
    { month: 'Mar 2025', historical: 750, predicted: 780, confidence_low: 740, confidence_high: 820, actual: null },
    { month: 'Apr 2025', historical: 650, predicted: 680, confidence_low: 640, confidence_high: 720, actual: null },
    { month: 'May 2025', historical: 550, predicted: 590, confidence_low: 550, confidence_high: 630, actual: null },
    { month: 'Jun 2025', historical: 500, predicted: 540, confidence_low: 500, confidence_high: 580, actual: null },
    { month: 'Jul 2025', historical: 520, predicted: 560, confidence_low: 520, confidence_high: 600, actual: null },
    { month: 'Aug 2025', historical: 540, predicted: 580, confidence_low: 540, confidence_high: 620, actual: null },
    { month: 'Sep 2025', historical: 600, predicted: 640, confidence_low: 600, confidence_high: 680, actual: null },
    { month: 'Oct 2025', historical: 700, predicted: 740, confidence_low: 700, confidence_high: 780, actual: null },
    { month: 'Nov 2025', historical: 800, predicted: 840, confidence_low: 800, confidence_high: 880, actual: null },
    { month: 'Dec 2025', historical: 900, predicted: 940, confidence_low: 900, confidence_high: 980, actual: null }
  ];

  const whatIfScenarios = [
    {
      name: 'Baseline',
      demand_2030: 850,
      peak_reduction: 0,
      renewable_share: 20,
      emissions: 450,
      color: '#94a3b8'
    },
    {
      name: '+50% EV Adoption',
      demand_2030: 920,
      peak_reduction: -8,
      renewable_share: 25,
      emissions: 420,
      color: '#3b82f6'
    },
    {
      name: '+30% Heat Pumps',
      demand_2030: 780,
      peak_reduction: 15,
      renewable_share: 35,
      emissions: 320,
      color: '#10b981'
    },
    {
      name: 'Combined Scenario',
      demand_2030: 890,
      peak_reduction: 12,
      renewable_share: 45,
      emissions: 280,
      color: '#8b5cf6'
    }
  ];

  const weatherImpact = [
    { temperature: -5, demand_increase: 25, heating_load: 180 },
    { temperature: 0, demand_increase: 15, heating_load: 120 },
    { temperature: 5, demand_increase: 8, heating_load: 80 },
    { temperature: 10, demand_increase: 0, heating_load: 40 },
    { temperature: 15, demand_increase: -5, heating_load: 20 },
    { temperature: 20, demand_increase: -8, heating_load: 10 },
    { temperature: 25, demand_increase: 5, heating_load: 5 },
    { temperature: 30, demand_increase: 15, heating_load: 0 },
    { temperature: 35, demand_increase: 30, heating_load: 0 }
  ];

  const riskFactors = [
    {
      factor: 'Extreme Weather Events',
      probability: 75,
      impact: 'High',
      description: 'Increased frequency of heat waves and cold snaps affecting demand',
      mitigation: 'Implement adaptive grid controls and emergency response protocols'
    },
    {
      factor: 'Technology Adoption Rate',
      probability: 60,
      impact: 'Medium',
      description: 'Faster than expected EV and heat pump adoption',
      mitigation: 'Accelerate grid infrastructure upgrades and demand response programs'
    },
    {
      factor: 'Policy Changes',
      probability: 45,
      impact: 'High',
      description: 'New regulations affecting energy consumption patterns',
      mitigation: 'Maintain flexible planning scenarios and stakeholder engagement'
    },
    {
      factor: 'Economic Factors',
      probability: 55,
      impact: 'Medium',
      description: 'Energy price volatility affecting consumption behavior',
      mitigation: 'Develop price-responsive demand management strategies'
    }
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600 bg-red-100';
    if (probability >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Predictive Analytics & Forecasting: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/ai-insights" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Configuration Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecast Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeframes.map((timeframe) => (
                  <option key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scenario</label>
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {scenarios.map((scenario) => (
                  <option key={scenario.value} value={scenario.value}>
                    {scenario.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {metrics.map((metric) => (
                  <option key={metric.value} value={metric.value}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Demand Forecast */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Energy Demand Forecast</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="h-4 w-4" />
              <span>Confidence Interval: 85%</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="confidence_high" 
                stackId="1" 
                stroke="none" 
                fill="#3b82f620" 
                name="Confidence Range"
              />
              <Area 
                type="monotone" 
                dataKey="confidence_low" 
                stackId="1" 
                stroke="none" 
                fill="#ffffff" 
                name=""
              />
              <Line type="monotone" dataKey="historical" stroke="#94a3b8" strokeWidth={2} name="Historical" />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">Next Month Forecast</div>
              <div className="text-blue-700">820 MWh (±40 MWh)</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Trend Direction</div>
              <div className="text-green-700">+2.5% YoY Growth</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900">Forecast Accuracy</div>
              <div className="text-yellow-700">94% (Last 12 months)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* What-If Scenarios */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What-If Scenario Analysis</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={whatIfScenarios}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="demand_2030" fill="#3b82f6" name="2030 Demand (MWh)" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              {whatIfScenarios.map((scenario, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: scenario.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{scenario.name}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {scenario.renewable_share}% renewable | {scenario.emissions} tonnes CO₂
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Impact Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Impact Correlation</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={weatherImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="temperature" stroke="#64748b" name="Temperature (°C)" />
                <YAxis dataKey="demand_increase" stroke="#64748b" name="Demand Change (%)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="demand_increase" fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Key Insights</span>
              </div>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• 1°C temperature drop increases demand by 3-5%</li>
                <li>• Heat waves ({'>'}30°C) increase cooling demand by 30%</li>
                <li>• Optimal temperature range: 15-20°C</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictive Risk Assessment</h3>
          
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{risk.factor}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProbabilityColor(risk.probability)}`}>
                        {risk.probability}% probability
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                        {risk.impact} impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                    <p className="text-xs text-gray-500">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </p>
                  </div>
                  <AlertTriangle className={`h-5 w-5 ml-3 ${
                    risk.probability >= 70 ? 'text-red-500' :
                    risk.probability >= 50 ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      risk.probability >= 70 ? 'bg-red-500' :
                      risk.probability >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${risk.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Predictive Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Short-term Actions (Next 6 months)</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Prepare for 15% winter demand increase</li>
                <li>• Optimize battery dispatch for peak shaving</li>
                <li>• Implement demand response for cold weather events</li>
                <li>• Monitor transformer loading in Zone A</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Long-term Planning (1-5 years)</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Plan grid reinforcement for EV adoption surge</li>
                <li>• Develop climate adaptation strategies</li>
                <li>• Invest in predictive maintenance systems</li>
                <li>• Expand renewable generation capacity</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}