import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Thermometer, Car, Zap, Droplets, Leaf, Settings, Play, Download, Eye } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function AdvancedModeling() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [activeModel, setActiveModel] = useState('thermal');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const models = [
    { id: 'thermal', name: 'District Heating/Cooling', icon: Thermometer, color: '#ef4444' },
    { id: 'microgrid', name: 'Microgrid & Islanding', icon: Zap, color: '#3b82f6' },
    { id: 'ev-integration', name: 'EV Integration & V2G', icon: Car, color: '#10b981' },
    { id: 'hydrogen', name: 'Hydrogen Systems', icon: Droplets, color: '#8b5cf6' },
    { id: 'carbon-markets', name: 'Carbon Markets', icon: Leaf, color: '#059669' }
  ];

  // Thermal Network Data
  const thermalNetworkData = [
    { node: 'Central Plant', supply_temp: 80, return_temp: 60, flow_rate: 150, heat_load: 2.5 },
    { node: 'Substation A', supply_temp: 78, return_temp: 62, flow_rate: 45, heat_load: 0.8 },
    { node: 'Substation B', supply_temp: 76, return_temp: 64, flow_rate: 35, heat_load: 0.6 },
    { node: 'Substation C', supply_temp: 75, return_temp: 65, flow_rate: 70, heat_load: 1.1 }
  ];

  const thermalDemandProfile = [
    { hour: 0, heating: 1.8, cooling: 0.2, dhw: 0.3 },
    { hour: 6, heating: 2.5, cooling: 0.1, dhw: 0.8 },
    { hour: 12, heating: 1.2, cooling: 1.5, dhw: 0.4 },
    { hour: 18, heating: 2.8, cooling: 0.8, dhw: 0.6 },
    { hour: 24, heating: 2.0, cooling: 0.3, dhw: 0.4 }
  ];

  // Microgrid Data
  const microgridTopology = [
    { component: 'Solar PV', capacity: 2.5, status: 'online', contribution: 35 },
    { component: 'Battery Storage', capacity: 1.8, status: 'online', contribution: 15 },
    { component: 'CHP Unit', capacity: 1.2, status: 'online', contribution: 20 },
    { component: 'Grid Connection', capacity: 5.0, status: 'online', contribution: 30 }
  ];

  const islandingScenario = [
    { time: '00:00', grid_connected: 100, islanded: 0 },
    { time: '02:00', grid_connected: 100, islanded: 0 },
    { time: '04:00', grid_connected: 0, islanded: 85 }, // Grid outage starts
    { time: '06:00', grid_connected: 0, islanded: 90 },
    { time: '08:00', grid_connected: 0, islanded: 75 }, // Battery depleting
    { time: '10:00', grid_connected: 100, islanded: 0 }, // Grid restored
    { time: '12:00', grid_connected: 100, islanded: 0 }
  ];

  // EV Integration Data
  const evChargingProfile = [
    { hour: 0, charging_load: 0.2, v2g_discharge: 0, grid_support: 0 },
    { hour: 6, charging_load: 0.8, v2g_discharge: 0, grid_support: 0 },
    { hour: 12, charging_load: 1.2, v2g_discharge: 0, grid_support: 0 },
    { hour: 18, charging_load: 2.5, v2g_discharge: 0, grid_support: 0 },
    { hour: 20, charging_load: 1.8, v2g_discharge: 0.5, grid_support: 0.3 },
    { hour: 24, charging_load: 0.5, v2g_discharge: 0.2, grid_support: 0.1 }
  ];

  const evFleetStatus = [
    { location: 'Residential Zone A', total_evs: 45, connected: 32, available_capacity: 280, v2g_enabled: 18 },
    { location: 'Commercial District', total_evs: 28, connected: 22, available_capacity: 190, v2g_enabled: 12 },
    { location: 'Public Charging Hub', total_evs: 15, connected: 15, available_capacity: 120, v2g_enabled: 8 }
  ];

  // Hydrogen Systems Data
  const hydrogenProduction = [
    { month: 'Jan', electrolysis: 45, demand: 40, storage: 85 },
    { month: 'Feb', electrolysis: 52, demand: 38, storage: 92 },
    { month: 'Mar', electrolysis: 48, demand: 42, storage: 88 },
    { month: 'Apr', electrolysis: 55, demand: 35, storage: 95 },
    { month: 'May', electrolysis: 62, demand: 30, storage: 98 },
    { month: 'Jun', electrolysis: 58, demand: 32, storage: 96 }
  ];

  const hydrogenApplications = [
    { name: 'Industrial Heating', consumption: 35, color: '#ef4444' },
    { name: 'Transportation', consumption: 25, color: '#3b82f6' },
    { name: 'Power Generation', consumption: 20, color: '#10b981' },
    { name: 'Residential Heating', consumption: 15, color: '#f59e0b' },
    { name: 'Export', consumption: 5, color: '#8b5cf6' }
  ];

  // Carbon Markets Data
  const carbonCredits = [
    { year: 2025, generated: 1200, sold: 1000, price: 45, revenue: 45000 },
    { year: 2026, generated: 1450, sold: 1300, price: 52, revenue: 67600 },
    { year: 2027, generated: 1680, sold: 1500, price: 58, revenue: 87000 },
    { year: 2028, generated: 1920, sold: 1750, price: 65, revenue: 113750 },
    { year: 2029, generated: 2150, sold: 2000, price: 72, revenue: 144000 },
    { year: 2030, generated: 2400, sold: 2200, price: 80, revenue: 176000 }
  ];

  const carbonSources = [
    { source: 'Building Retrofits', reduction: 850, credits: 850, value: 68000 },
    { source: 'Renewable Energy', reduction: 1200, credits: 1200, value: 96000 },
    { source: 'EV Adoption', reduction: 320, credits: 320, value: 25600 },
    { source: 'District Heating', reduction: 180, credits: 180, value: 14400 }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        const newProgress = Math.min(prev + 10, 100);
        if (newProgress >= 100) {
          setIsSimulating(false);
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 500);
  };

  const renderModelContent = () => {
    switch (activeModel) {
      case 'thermal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Thermal Network Status</h4>
                <div className="space-y-3">
                  {thermalNetworkData.map((node, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{node.node}</p>
                        <p className="text-xs text-gray-600">
                          {node.supply_temp}°C → {node.return_temp}°C
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{node.heat_load} MW</p>
                        <p className="text-xs text-gray-600">{node.flow_rate} m³/h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Daily Thermal Demand Profile</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={thermalDemandProfile}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="heating" stackId="1" stroke="#ef4444" fill="#ef444420" name="Heating" />
                    <Area type="monotone" dataKey="cooling" stackId="1" stroke="#3b82f6" fill="#3b82f620" name="Cooling" />
                    <Area type="monotone" dataKey="dhw" stackId="1" stroke="#10b981" fill="#10b98120" name="Hot Water" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Thermal Network Insights</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Network efficiency: 87% (target: 90%)</li>
                <li>• Peak heating demand: 2.8 MW at 18:00</li>
                <li>• Recommended: Increase insulation in return pipes</li>
                <li>• Potential for waste heat recovery from industrial processes</li>
              </ul>
            </div>
          </div>
        );

      case 'microgrid':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Microgrid Components</h4>
                <div className="space-y-3">
                  {microgridTopology.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          component.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium text-sm text-gray-900">{component.component}</p>
                          <p className="text-xs text-gray-600">{component.capacity} MW capacity</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{component.contribution}%</p>
                        <p className="text-xs text-gray-600">contribution</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Islanding Scenario Analysis</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={islandingScenario}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="grid_connected" stackId="1" stroke="#10b981" fill="#10b98120" name="Grid Connected %" />
                    <Area type="monotone" dataKey="islanded" stackId="2" stroke="#ef4444" fill="#ef444420" name="Islanded Supply %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Resilience Analysis</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Islanding capability: 6 hours at 85% load</li>
                <li>• Critical loads protected: Hospital, emergency services</li>
                <li>• Battery backup duration: 4 hours at full load</li>
                <li>• Recommendation: Add 0.5 MW backup generator</li>
              </ul>
            </div>
          </div>
        );

      case 'ev-integration':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">EV Charging & V2G Profile</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={evChargingProfile}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="charging_load" stackId="1" stroke="#ef4444" fill="#ef444420" name="Charging Load (MW)" />
                    <Area type="monotone" dataKey="v2g_discharge" stackId="2" stroke="#10b981" fill="#10b98120" name="V2G Discharge (MW)" />
                    <Area type="monotone" dataKey="grid_support" stackId="3" stroke="#3b82f6" fill="#3b82f620" name="Grid Support (MW)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">EV Fleet Status</h4>
                <div className="space-y-3">
                  {evFleetStatus.map((location, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm text-gray-900">{location.location}</p>
                        <p className="text-sm text-gray-600">{location.connected}/{location.total_evs} connected</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                        <div>Available: {location.available_capacity} kWh</div>
                        <div>V2G Ready: {location.v2g_enabled} EVs</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-2">Smart Charging Optimization</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Peak shaving potential: 1.2 MW through smart charging</li>
                <li>• V2G revenue opportunity: €15,000/year</li>
                <li>• Grid stability services: Frequency regulation, voltage support</li>
                <li>• Recommendation: Expand V2G program to 50% of fleet</li>
              </ul>
            </div>
          </div>
        );

      case 'hydrogen':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Hydrogen Production & Storage</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={hydrogenProduction}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Line type="monotone" dataKey="electrolysis" stroke="#3b82f6" strokeWidth={2} name="Production (kg/day)" />
                    <Line type="monotone" dataKey="demand" stroke="#ef4444" strokeWidth={2} name="Demand (kg/day)" />
                    <Line type="monotone" dataKey="storage" stroke="#10b981" strokeWidth={2} name="Storage Level (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Hydrogen Applications</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={hydrogenApplications}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="consumption"
                      label={({ name, consumption }) => `${name}: ${consumption}%`}
                    >
                      {hydrogenApplications.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h4 className="font-semibold text-purple-900 mb-2">Green Hydrogen Economics</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Production cost: €4.50/kg (target: €3.00/kg by 2030)</li>
                <li>• Electrolyzer efficiency: 65% (improving to 75%)</li>
                <li>• Storage capacity: 2,000 kg (7 days autonomy)</li>
                <li>• Revenue streams: Industrial sales, transport fuel, grid services</li>
              </ul>
            </div>
          </div>
        );

      case 'carbon-markets':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Carbon Credit Generation & Revenue</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={carbonCredits}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Carbon Reduction Sources</h4>
                <div className="space-y-3">
                  {carbonSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{source.source}</p>
                        <p className="text-xs text-gray-600">{source.reduction} tonnes CO₂/year</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">€{source.value.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">{source.credits} credits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-2">Carbon Market Strategy</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Total credits by 2030: 2,400 tonnes CO₂</li>
                <li>• Projected revenue: €176,000 annually</li>
                <li>• Price trend: €45 → €80 per tonne (2025-2030)</li>
                <li>• Strategy: Hold 20% for price appreciation, sell 80% annually</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Advanced Modeling Capabilities: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/predictive-analytics" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Model Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Modeling Modules</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {models.map((model) => {
              const IconComponent = model.icon;
              const isActive = activeModel === model.id;
              
              return (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-opacity-100 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    borderColor: isActive ? model.color : undefined,
                    backgroundColor: isActive ? `${model.color}10` : 'white'
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="mx-auto mb-3 p-3 rounded-lg"
                      style={{ backgroundColor: model.color }}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-medium text-sm text-gray-900">{model.name}</h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {models.find(m => m.id === activeModel)?.name} Simulation
              </h3>
              <p className="text-sm text-gray-600">
                Configure and run advanced modeling simulations for detailed analysis
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {isSimulating && (
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${simulationProgress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{simulationProgress}%</span>
                </div>
              )}
              
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isSimulating
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Play className="h-4 w-4" />
                <span>{isSimulating ? 'Running...' : 'Run Simulation'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Model Content */}
        {renderModelContent()}

        {/* Export Options */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Analysis</h3>
          
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Results (CSV)</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Generate Report (PDF)</span>
            </button>
            
            <button 
              onClick={() => navigate('/comparative-analytics')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>Compare Models</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}