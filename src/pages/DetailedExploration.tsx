import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Building2, Zap, Layers, Eye, EyeOff, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function DetailedExploration() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('building-details');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [mapLayers, setMapLayers] = useState({
    feeders: false,
    transformers: true,
    substations: true
  });
  const [searchTerm, setSearchTerm] = useState('');

  const hourlyLoadProfile = [
    { hour: 0, load: 2.1 }, { hour: 1, load: 1.8 }, { hour: 2, load: 1.6 },
    { hour: 3, load: 1.5 }, { hour: 4, load: 1.7 }, { hour: 5, load: 2.3 },
    { hour: 6, load: 3.2 }, { hour: 7, load: 4.1 }, { hour: 8, load: 4.8 },
    { hour: 9, load: 4.5 }, { hour: 10, load: 4.2 }, { hour: 11, load: 4.0 },
    { hour: 12, load: 3.8 }, { hour: 13, load: 3.9 }, { hour: 14, load: 4.1 },
    { hour: 15, load: 4.3 }, { hour: 16, load: 4.7 }, { hour: 17, load: 5.2 },
    { hour: 18, load: 5.8 }, { hour: 19, load: 6.1 }, { hour: 20, load: 5.5 },
    { hour: 21, load: 4.8 }, { hour: 22, load: 3.9 }, { hour: 23, load: 2.8 }
  ];

  const constructionYearData = [
    { range: '<1945', count: 45 },
    { range: '1946-1970', count: 187 },
    { range: '1971-1990', count: 312 },
    { range: '1991-2010', count: 428 },
    { range: '>2010', count: 262 }
  ];

  const buildingsData = [
    { id: 'NB-0753', type: 'Residential - Apartment', year: 1975, area: 2500, demand: 150, sensor: 'Sensor-A4B7' },
    { id: 'NB-0112', type: 'Residential - Single Family', year: 1960, area: 120, demand: 85, sensor: 'N/A' },
    { id: 'CB-007', type: 'Commercial - Office', year: 2010, area: 1500, demand: 250, sensor: 'Sensor-C3D9' },
    { id: 'NB-0345', type: 'Residential - Townhouse', year: 1995, area: 250, demand: 95, sensor: 'Sensor-B2E1' },
    { id: 'IB-001', type: 'Industrial - Warehouse', year: 1988, area: 3200, demand: 450, sensor: 'Sensor-D4F7' }
  ];

  const gridAssets = [
    { id: 'T-001', type: 'Transformer', capacity: '500 kVA', load: '85%', x: 30, y: 40 },
    { id: 'T-002', type: 'Transformer', capacity: '315 kVA', load: '62%', x: 70, y: 30 },
    { id: 'T-003', type: 'Transformer', capacity: '800 kVA', load: '78%', x: 50, y: 70 },
    { id: 'S-001', type: 'Substation', capacity: '10 MVA', load: '45%', x: 80, y: 80 }
  ];

  const mockBuildings = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    type: ['residential', 'commercial', 'industrial'][Math.floor(Math.random() * 3)],
    selected: false
  }));

  const filteredBuildings = buildingsData.filter(building =>
    building.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLayer = (layer: string) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleBuildingSelect = (building: any) => {
    setSelectedBuilding(building);
    setActiveTab('building-details');
  };

  const selectedBuildingDetails = selectedBuilding || buildingsData[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Detailed Data Exploration: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/data-overview" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Interactive District Map</h3>
                
                {/* Layer Controls */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Layers:</span>
                  {Object.entries(mapLayers).map(([layer, enabled]) => (
                    <button
                      key={layer}
                      onClick={() => toggleLayer(layer)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                        enabled 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {enabled ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      <span className="capitalize">{layer}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Canvas */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="exploration-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#exploration-grid)" />
                  </svg>
                </div>

                {/* Building footprints */}
                {mockBuildings.map((building) => (
                  <div
                    key={building.id}
                    className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 ${
                      selectedBuilding?.id === building.id ? 'z-20' : 'z-10'
                    }`}
                    style={{ left: `${building.x}%`, top: `${building.y}%` }}
                    onClick={() => handleBuildingSelect({ 
                      id: `B-${building.id.toString().padStart(3, '0')}`, 
                      type: building.type,
                      x: building.x,
                      y: building.y 
                    })}
                  >
                    <div 
                      className={`w-4 h-4 rounded border-2 transition-colors ${
                        selectedBuilding?.id === `B-${building.id.toString().padStart(3, '0')}` 
                          ? 'bg-blue-600 border-blue-800' 
                          : building.type === 'residential' 
                            ? 'bg-green-400 border-green-600 hover:bg-green-500' 
                            : building.type === 'commercial'
                              ? 'bg-yellow-400 border-yellow-600 hover:bg-yellow-500'
                              : 'bg-purple-400 border-purple-600 hover:bg-purple-500'
                      }`}
                    />
                  </div>
                ))}

                {/* Grid Infrastructure */}
                {mapLayers.transformers && gridAssets.filter(asset => asset.type === 'Transformer').map((asset) => (
                  <div
                    key={asset.id}
                    className="absolute cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
                    title={`${asset.id}: ${asset.load} load`}
                  >
                    <div className={`w-3 h-3 ${
                      parseInt(asset.load) > 80 ? 'bg-red-500' : 'bg-green-500'
                    } rotate-45 border-2 border-white shadow-md`} />
                  </div>
                ))}

                {mapLayers.substations && gridAssets.filter(asset => asset.type === 'Substation').map((asset) => (
                  <div
                    key={asset.id}
                    className="absolute cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
                    title={`${asset.id}: ${asset.capacity}`}
                  >
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md" />
                  </div>
                ))}

                {mapLayers.feeders && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="30%" y1="40%" x2="70%" y2="30%" stroke="#64748b" strokeWidth="2" />
                    <line x1="70%" y1="30%" x2="50%" y2="70%" stroke="#64748b" strokeWidth="2" />
                    <line x1="50%" y1="70%" x2="80%" y2="80%" stroke="#64748b" strokeWidth="2" />
                  </svg>
                )}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
                  <div className="text-xs font-medium text-gray-900 mb-2">Legend</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded"></div>
                      <span>Residential</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <span>Commercial</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded"></div>
                      <span>Industrial</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rotate-45"></div>
                      <span>Transformer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {[
                    { id: 'building-details', name: 'Building Details', icon: Building2 },
                    { id: 'buildings-table', name: 'Buildings Table', icon: Layers },
                    { id: 'grid-infrastructure', name: 'Grid Assets', icon: Zap },
                    { id: 'energy-data', name: 'Energy Data', icon: 'BarChart3' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Building Details Tab */}
                {activeTab === 'building-details' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Building Details</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Building ID:</span>
                          <div className="font-medium text-gray-900">{selectedBuildingDetails.id}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <div className="font-medium text-gray-900">{selectedBuildingDetails.type}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Construction Year:</span>
                          <div className="font-medium text-gray-900">{selectedBuildingDetails.year}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Area:</span>
                          <div className="font-medium text-gray-900">{selectedBuildingDetails.area} m²</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Annual Demand:</span>
                          <div className="font-medium text-gray-900">{selectedBuildingDetails.demand} MWh</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Sensor ID:</span>
                          <div className="font-medium text-gray-900">{selectedBuildingDetails.sensor}</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-600">
                        Building Photo Placeholder
                      </div>
                    </div>
                  </div>
                )}

                {/* Buildings Table Tab */}
                {activeTab === 'buildings-table' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Buildings Table</h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search buildings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-gray-50">
                          <tr className="text-left text-gray-500 border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Type</th>
                            <th className="py-2">Year</th>
                            <th className="py-2">Demand</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredBuildings.map((building) => (
                            <tr 
                              key={building.id}
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleBuildingSelect(building)}
                            >
                              <td className="py-2 font-medium text-gray-900">{building.id}</td>
                              <td className="py-2 text-gray-600">{building.type.split(' - ')[0]}</td>
                              <td className="py-2 text-gray-600">{building.year}</td>
                              <td className="py-2 text-gray-600">{building.demand} MWh</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Grid Infrastructure Tab */}
                {activeTab === 'grid-infrastructure' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Grid Assets</h4>
                    <div className="space-y-3">
                      {gridAssets.map((asset) => (
                        <div key={asset.id} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{asset.id}</div>
                              <div className="text-sm text-gray-600">{asset.type}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{asset.capacity}</div>
                              <div className={`text-sm ${
                                parseInt(asset.load) > 80 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                Load: {asset.load}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Energy Data Tab */}
                {activeTab === 'energy-data' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">District Hourly Load Profile</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={hourlyLoadProfile}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="hour" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip />
                          <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Construction Year Distribution</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={constructionYearData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="range" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip />
                          <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/scenario-configuration')}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Proceed to Scenario Configuration
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}