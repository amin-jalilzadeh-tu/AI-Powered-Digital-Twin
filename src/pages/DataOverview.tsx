import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Zap, Shield, Battery, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import KPICard from '../components/KPICard';

export default function DataOverview() {
  const navigate = useNavigate();
  const { state } = useAppContext();

  const monthlyDemand = [
    { month: 'Jan', demand: 950 },
    { month: 'Feb', demand: 1050 },
    { month: 'Mar', demand: 800 },
    { month: 'Apr', demand: 700 },
    { month: 'May', demand: 600 },
    { month: 'Jun', demand: 500 },
    { month: 'Jul', demand: 550 },
    { month: 'Aug', demand: 580 },
    { month: 'Sep', demand: 650 },
    { month: 'Oct', demand: 750 },
    { month: 'Nov', demand: 900 },
    { month: 'Dec', demand: 1100 }
  ];

  const energySources = [
    { name: 'Grid Import', value: 80, color: '#64748b' },
    { name: 'Local Solar PV', value: 18, color: '#eab308' },
    { name: 'Local Battery', value: 2, color: '#8b5cf6' }
  ];

  const gridAssets = [
    { name: 'Transformer Alpha', type: 'Transformer', loading: 85, status: 'At Risk', statusColor: 'text-yellow-600' },
    { name: 'Transformer Beta', type: 'Transformer', loading: 50, status: 'Healthy', statusColor: 'text-green-600' },
    { name: 'Feeder F-01A', type: 'Feeder', loading: 65, status: 'Healthy', statusColor: 'text-green-600' },
    { name: 'Substation North', type: 'Substation', loading: null, status: 'Healthy', statusColor: 'text-green-600' }
  ];

  const sampleBuildings = [
    { id: 'NB-0112', year: 1960, area: 120, demand: 850, retrofit: 'No', ev: 'Yes', pv: 0 },
    { id: 'NB-0345', year: 1995, area: 250, demand: 600, retrofit: 'Yes (Deep)', ev: 'No', pv: 5 },
    { id: 'CB-007', year: 2010, area: 1500, demand: 2500, retrofit: 'Partial', ev: 'Yes (Shared)', pv: 20 }
  ];

  const districtAssets = [
    { type: 'building', x: 25, y: 35, status: 'retrofitted', label: 'Retrofitted Building' },
    { type: 'building', x: 45, y: 45, status: 'high-demand', label: 'High Demand Building' },
    { type: 'building', x: 65, y: 30, status: 'normal', label: 'Standard Building' },
    { type: 'transformer', x: 35, y: 60, status: 'high-load', label: 'T-01: 85% Load' },
    { type: 'transformer', x: 75, y: 65, status: 'normal', label: 'T-02: 50% Load' },
    { type: 'pv', x: 55, y: 25, status: 'active', label: 'Solar PV Installation' },
    { type: 'battery', x: 30, y: 70, status: 'active', label: 'Battery Storage' }
  ];

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'building': return Building2;
      case 'transformer': return Zap;
      case 'pv': return '☀️';
      case 'battery': return Battery;
      default: return MapPin;
    }
  };

  const getAssetColor = (type: string, status: string) => {
    if (type === 'transformer') {
      return status === 'high-load' ? '#ef4444' : '#10b981';
    }
    if (type === 'building') {
      if (status === 'retrofitted') return '#3b82f6';
      if (status === 'high-demand') return '#ef4444';
      return '#6b7280';
    }
    return '#8b5cf6';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Data Overview: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/district-selection" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Buildings Count"
            value={state.selectedDistrict?.buildings.toLocaleString() || '1,234'}
            icon="Building2"
            color="#3b82f6"
          />
          <KPICard
            title="Total Est. Monthly Demand"
            value="800 MWh"
            icon="Zap"
            color="#eab308"
            trend="up"
          />
          <KPICard
            title="Grid Health Summary"
            value="1 Transformer At Risk"
            icon="Shield"
            color="#ef4444"
            subtitle=">80% Load"
          />
          <KPICard
            title="Local Generation Share"
            value="20%"
            icon="Battery"
            color="#10b981"
            subtitle="PV + Battery"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Demand Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Energy Demand (MWh)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyDemand}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="demand" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Energy Sources Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Energy Sources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energySources}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {energySources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Asset Map */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">District Asset Overview</h3>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-80 overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern id="asset-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#asset-grid)" />
              </svg>
            </div>

            {/* Assets */}
            {districtAssets.map((asset, index) => {
              const IconComponent = getAssetIcon(asset.type);
              const color = getAssetColor(asset.type, asset.status);
              
              return (
                <div
                  key={index}
                  className="absolute group cursor-pointer"
                  style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
                  title={asset.label}
                >
                  <div 
                    className="p-2 rounded-full shadow-md hover:scale-110 transition-transform bg-white"
                    style={{ borderColor: color, borderWidth: '2px' }}
                  >
                    {typeof IconComponent === 'string' ? (
                      <span className="text-lg">{IconComponent}</span>
                    ) : (
                      <IconComponent className="h-4 w-4" style={{ color }} />
                    )}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {asset.label}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
              <div className="text-xs font-medium text-gray-900 mb-2">Legend</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Retrofitted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>High Load/Demand</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Healthy/Normal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Grid Assets Table */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Grid Assets</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Loading</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {gridAssets.map((asset, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-3 font-medium text-gray-900">{asset.name}</td>
                      <td className="py-3 text-gray-600">{asset.type}</td>
                      <td className="py-3 text-gray-600">
                        {asset.loading ? `${asset.loading}%` : 'N/A'}
                      </td>
                      <td className="py-3">
                        <span className={`flex items-center space-x-1 ${asset.statusColor}`}>
                          {asset.status === 'Healthy' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                          <span>{asset.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sample Buildings Table */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Buildings Snapshot</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b">
                    <th className="pb-3">Building ID</th>
                    <th className="pb-3">Year</th>
                    <th className="pb-3">Area (m²)</th>
                    <th className="pb-3">Demand</th>
                    <th className="pb-3">Retrofit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleBuildings.map((building, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-3 font-medium text-gray-900">{building.id}</td>
                      <td className="py-3 text-gray-600">{building.year}</td>
                      <td className="py-3 text-gray-600">{building.area}</td>
                      <td className="py-3 text-gray-600">{building.demand} kWh/mo</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          building.retrofit === 'No' ? 'bg-red-100 text-red-700' :
                          building.retrofit.includes('Deep') ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {building.retrofit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/detailed-exploration')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explore Detailed Data
          </button>
          <button
            onClick={() => navigate('/scenario-configuration')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Configure New Scenario
          </button>
        </div>
      </main>
    </div>
  );
}