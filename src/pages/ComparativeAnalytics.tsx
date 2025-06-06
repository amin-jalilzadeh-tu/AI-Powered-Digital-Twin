import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import { BarChart3, TrendingUp, MapPin, Calendar, Filter, Download, Eye, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function ComparativeAnalytics() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [selectedDistricts, setSelectedDistricts] = useState(['northwood', 'downtown']);
  const [selectedMetrics, setSelectedMetrics] = useState(['demand', 'emissions', 'cost', 'renewable']);
  const [timeframe, setTimeframe] = useState('annual');
  const [viewMode, setViewMode] = useState('side-by-side');

  const availableDistricts = [
    { id: 'northwood', name: 'Northwood District', region: 'North', buildings: 1234 },
    { id: 'downtown', name: 'Downtown Core', region: 'Central', buildings: 850 },
    { id: 'riverside', name: 'Riverside Community', region: 'West', buildings: 600 },
    { id: 'industrial', name: 'East Industrial Zone', region: 'East', buildings: 150 }
  ];

  const metrics = [
    { id: 'demand', name: 'Energy Demand', unit: 'MWh', color: '#ef4444' },
    { id: 'emissions', name: 'CO₂ Emissions', unit: 'tonnes', color: '#8b5cf6' },
    { id: 'cost', name: 'Energy Cost', unit: '€', color: '#f59e0b' },
    { id: 'renewable', name: 'Renewable Share', unit: '%', color: '#10b981' },
    { id: 'efficiency', name: 'Energy Efficiency', unit: '%', color: '#3b82f6' },
    { id: 'reliability', name: 'Grid Reliability', unit: '%', color: '#06b6d4' }
  ];

  // Comparative data
  const districtComparison = [
    {
      district: 'Northwood',
      demand: 800,
      emissions: 450,
      cost: 120000,
      renewable: 25,
      efficiency: 87,
      reliability: 98.5,
      buildings: 1234,
      area: 5.2
    },
    {
      district: 'Downtown',
      demand: 650,
      emissions: 380,
      cost: 98000,
      renewable: 18,
      efficiency: 82,
      reliability: 99.2,
      buildings: 850,
      area: 3.1
    },
    {
      district: 'Riverside',
      demand: 420,
      emissions: 220,
      cost: 65000,
      renewable: 35,
      efficiency: 91,
      reliability: 97.8,
      buildings: 600,
      area: 4.8
    },
    {
      district: 'Industrial',
      demand: 1200,
      emissions: 680,
      cost: 180000,
      renewable: 12,
      efficiency: 78,
      reliability: 96.5,
      buildings: 150,
      area: 2.3
    }
  ];

  const timeSeriesComparison = [
    { month: 'Jan', northwood: 850, downtown: 680, riverside: 450, industrial: 1250 },
    { month: 'Feb', northwood: 820, downtown: 650, riverside: 430, industrial: 1200 },
    { month: 'Mar', northwood: 780, downtown: 620, riverside: 400, industrial: 1150 },
    { month: 'Apr', northwood: 720, downtown: 580, riverside: 380, industrial: 1100 },
    { month: 'May', northwood: 680, downtown: 550, riverside: 360, industrial: 1050 },
    { month: 'Jun', northwood: 650, downtown: 520, riverside: 340, industrial: 1000 },
    { month: 'Jul', northwood: 670, downtown: 540, riverside: 350, industrial: 1020 },
    { month: 'Aug', northwood: 690, downtown: 560, riverside: 370, industrial: 1040 },
    { month: 'Sep', northwood: 720, downtown: 590, riverside: 390, industrial: 1080 },
    { month: 'Oct', northwood: 760, downtown: 620, riverside: 410, industrial: 1120 },
    { month: 'Nov', northwood: 800, downtown: 650, riverside: 430, industrial: 1180 },
    { month: 'Dec', northwood: 840, downtown: 680, riverside: 450, industrial: 1220 }
  ];

  const performanceRadar = selectedDistricts.map(districtId => {
    const district = districtComparison.find(d => d.district.toLowerCase().includes(districtId));
    return {
      district: district?.district || districtId,
      'Energy Efficiency': district?.efficiency || 0,
      'Renewable Share': district?.renewable || 0,
      'Grid Reliability': district?.reliability || 0,
      'Cost Efficiency': Math.max(0, 100 - (district?.cost || 0) / 2000),
      'Emission Reduction': Math.max(0, 100 - (district?.emissions || 0) / 10),
      'Building Density': Math.min(100, (district?.buildings || 0) / 15)
    };
  });

  const efficiencyScatter = districtComparison.map(district => ({
    name: district.district,
    efficiency: district.efficiency,
    renewable: district.renewable,
    emissions: district.emissions
  }));

  const toggleDistrict = (districtId: string) => {
    setSelectedDistricts(prev => {
      if (prev.includes(districtId)) {
        return prev.filter(id => id !== districtId);
      } else if (prev.length < 4) {
        return [...prev, districtId];
      }
      return prev;
    });
  };

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metricId)) {
        return prev.filter(id => id !== metricId);
      } else {
        return [...prev, metricId];
      }
    });
  };

  const getDistrictColor = (districtId: string) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];
    const index = selectedDistricts.indexOf(districtId);
    return colors[index] || '#6b7280';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Comparative Analytics: Multi-District Analysis" 
        showBack 
        backTo="/advanced-modeling" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Configuration Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Comparison Configuration</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* District Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Districts to Compare (up to 4)
              </label>
              <div className="space-y-2">
                {availableDistricts.map((district) => (
                  <label key={district.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDistricts.includes(district.id)}
                      onChange={() => toggleDistrict(district.id)}
                      disabled={!selectedDistricts.includes(district.id) && selectedDistricts.length >= 4}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: selectedDistricts.includes(district.id) ? getDistrictColor(district.id) : '#d1d5db' }}
                        />
                        <span className="text-sm font-medium text-gray-900">{district.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{district.buildings} buildings, {district.region}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Metrics Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Metrics to Compare
              </label>
              <div className="space-y-2">
                {metrics.map((metric) => (
                  <label key={metric.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={() => toggleMetric(metric.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: metric.color }}
                      />
                      <span className="text-sm text-gray-900">{metric.name}</span>
                      <span className="text-xs text-gray-500">({metric.unit})</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* View Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Analysis Options
              </label>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Timeframe</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                    <option value="5-year">5-Year Trend</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">View Mode</label>
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="side-by-side">Side by Side</option>
                    <option value="overlay">Overlay</option>
                    <option value="normalized">Normalized</option>
                    <option value="per-capita">Per Building</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Comparison */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics Comparison</h3>
          
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={districtComparison.filter(d => selectedDistricts.some(id => d.district.toLowerCase().includes(id)))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="district" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              {selectedMetrics.map((metricId) => {
                const metric = metrics.find(m => m.id === metricId);
                return (
                  <Bar 
                    key={metricId}
                    dataKey={metricId} 
                    fill={metric?.color} 
                    name={metric?.name}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Time Series Comparison */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Demand Trends</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                {selectedDistricts.map((districtId, index) => (
                  <Line
                    key={districtId}
                    type="monotone"
                    dataKey={districtId}
                    stroke={getDistrictColor(districtId)}
                    strokeWidth={2}
                    name={availableDistricts.find(d => d.id === districtId)?.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Radar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Criteria Performance</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceRadar[0] ? Object.keys(performanceRadar[0]).filter(key => key !== 'district').map(key => ({
                metric: key,
                ...performanceRadar.reduce((acc, district, index) => ({
                  ...acc,
                  [`district${index}`]: district[key as keyof typeof district]
                }), {})
              })) : []}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                {performanceRadar.map((_, index) => (
                  <Radar
                    key={index}
                    name={performanceRadar[index].district}
                    dataKey={`district${index}`}
                    stroke={getDistrictColor(selectedDistricts[index])}
                    fill={getDistrictColor(selectedDistricts[index])}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency vs Renewable Scatter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency vs Renewable Share Analysis</h3>
          
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={efficiencyScatter.filter(d => selectedDistricts.some(id => d.name.toLowerCase().includes(id)))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="efficiency" stroke="#64748b" name="Energy Efficiency (%)" />
              <YAxis dataKey="renewable" stroke="#64748b" name="Renewable Share (%)" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter dataKey="renewable" fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {efficiencyScatter.filter(d => selectedDistricts.some(id => d.name.toLowerCase().includes(id))).map((district, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="font-medium text-sm text-gray-900">{district.name}</div>
                <div className="text-xs text-gray-600">
                  {district.efficiency}% efficiency, {district.renewable}% renewable
                </div>
                <div className="text-xs text-gray-500">
                  {district.emissions} tonnes CO₂
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Comparison Table</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">District</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Buildings</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Area (km²)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Demand (MWh)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Emissions (t)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Cost (€)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Renewable (%)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Efficiency (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {districtComparison.filter(d => selectedDistricts.some(id => d.district.toLowerCase().includes(id))).map((district, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getDistrictColor(selectedDistricts.find(id => district.district.toLowerCase().includes(id)) || '') }}
                        />
                        <span className="font-medium text-gray-900">{district.district}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-900">{district.buildings}</td>
                    <td className="py-3 px-4 text-center text-gray-900">{district.area}</td>
                    <td className="py-3 px-4 text-center text-gray-900">{district.demand}</td>
                    <td className="py-3 px-4 text-center text-gray-900">{district.emissions}</td>
                    <td className="py-3 px-4 text-center text-gray-900">€{district.cost.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center text-gray-900">{district.renewable}%</td>
                    <td className="py-3 px-4 text-center text-gray-900">{district.efficiency}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Comparative Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Best Performers</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Efficiency:</strong> Riverside (91%) - Best building stock</li>
                <li>• <strong>Renewables:</strong> Riverside (35%) - Optimal solar conditions</li>
                <li>• <strong>Reliability:</strong> Downtown (99.2%) - Modern infrastructure</li>
                <li>• <strong>Cost Efficiency:</strong> Riverside - Lowest per-building cost</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Improvement Opportunities</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Industrial Zone:</strong> Needs efficiency upgrades (78%)</li>
                <li>• <strong>Downtown:</strong> Low renewable share (18%) - rooftop potential</li>
                <li>• <strong>Northwood:</strong> High emissions - retrofit priority</li>
                <li>• <strong>All districts:</strong> EV charging infrastructure expansion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Comparison (CSV)</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Generate Report (PDF)</span>
            </button>
          </div>
          
          <button
            onClick={() => navigate('/real-time-dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}