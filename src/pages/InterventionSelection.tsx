import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Wrench, Sun, Battery, Car, Zap, Users, Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function InterventionSelection() {
  const navigate = useNavigate();
  const { state, addIntervention, removeIntervention } = useAppContext();
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [interventionConfig, setInterventionConfig] = useState({
    type: '',
    targetBuildings: 'most-energy-intensive',
    percentage: 100,
    retrofitPackage: 'deep-retrofit',
    targetYear: 2028,
    pvSize: 'optimize',
    batterySize: 100,
    chargingPoints: 10,
    drEnabled: false
  });

  const interventionTypes = [
    { id: 'building-retrofits', name: 'Building Retrofits', icon: Wrench, color: '#f97316' },
    { id: 'solar-pv', name: 'Solar PV Deployment', icon: Sun, color: '#eab308' },
    { id: 'battery-storage', name: 'Battery Storage', icon: Battery, color: '#8b5cf6' },
    { id: 'ev-chargers', name: 'EV Chargers', icon: Car, color: '#10b981' },
    { id: 'demand-response', name: 'Demand Response', icon: Users, color: '#6366f1' },
    { id: 'grid-upgrades', name: 'Grid Upgrades', icon: Zap, color: '#ef4444' }
  ];

  const interventionPlan = state.interventionPlan || [];

  const handleInterventionSelect = (type: any) => {
    setSelectedIntervention(type);
    setInterventionConfig(prev => ({ ...prev, type: type.id }));
  };

  const handleConfigChange = (field: string, value: any) => {
    setInterventionConfig(prev => ({ ...prev, [field]: value }));
  };

  const addInterventionToList = () => {
    if (!selectedIntervention) return;

    const newIntervention = {
      id: Date.now(),
      type: selectedIntervention.name,
      targetYear: interventionConfig.targetYear,
      details: getInterventionDetails(),
      cost: getEstimatedCost(),
      ...interventionConfig
    };

    addIntervention(newIntervention);
    setSelectedIntervention(null);
    setInterventionConfig({
      type: '',
      targetBuildings: 'most-energy-intensive',
      percentage: 100,
      retrofitPackage: 'deep-retrofit',
      targetYear: 2028,
      pvSize: 'optimize',
      batterySize: 100,
      chargingPoints: 10,
      drEnabled: false
    });
  };

  const getInterventionDetails = () => {
    switch (selectedIntervention?.id) {
      case 'building-retrofits':
        return `${interventionConfig.retrofitPackage} for ${interventionConfig.targetBuildings} (${interventionConfig.percentage}%)`;
      case 'solar-pv':
        return `${interventionConfig.pvSize} PV on ${interventionConfig.targetBuildings}`;
      case 'battery-storage':
        return `${interventionConfig.batterySize}kWh battery system`;
      case 'ev-chargers':
        return `${interventionConfig.chargingPoints} charging points`;
      default:
        return 'Standard configuration';
    }
  };

  const getEstimatedCost = () => {
    switch (selectedIntervention?.id) {
      case 'building-retrofits':
        return '€2.1M';
      case 'solar-pv':
        return '€200k';
      case 'battery-storage':
        return '€150k';
      case 'ev-chargers':
        return '€50k';
      default:
        return '€100k';
    }
  };

  const calculateFeasibility = () => {
    const totalCost = interventionPlan.reduce((sum, intervention) => {
      const cost = parseInt(intervention.cost.replace(/[€Mk,]/g, '')) * (intervention.cost.includes('M') ? 1000000 : 1000);
      return sum + cost;
    }, 0);

    const annualBudget = state.currentScenario?.config?.annualBudget || 500000;
    const retrofitRate = interventionPlan.filter(i => i.type.includes('Retrofit')).length * 2.5;
    const maxRetrofitRate = state.currentScenario?.config?.retrofitRate || 3;

    return {
      totalCost,
      annualBudget,
      retrofitRate,
      maxRetrofitRate,
      budgetExceeded: totalCost > annualBudget,
      retrofitExceeded: retrofitRate > maxRetrofitRate
    };
  };

  const feasibility = calculateFeasibility();

  const renderInterventionConfig = () => {
    if (!selectedIntervention) {
      return (
        <div className="text-center text-gray-500 py-12">
          <p>Select an intervention type from the library to configure it</p>
        </div>
      );
    }

    const IconComponent = selectedIntervention.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: selectedIntervention.color }}
          >
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">
            Configure {selectedIntervention.name}
          </h4>
        </div>

        {selectedIntervention.id === 'building-retrofits' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Buildings
              </label>
              <select
                value={interventionConfig.targetBuildings}
                onChange={(e) => handleConfigChange('targetBuildings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Buildings</option>
                <option value="residential">Residential Only</option>
                <option value="commercial">Commercial Only</option>
                <option value="pre-1980">Pre-1980 Buildings</option>
                <option value="most-energy-intensive">Most Energy Intensive (Top 20%)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % of Selected Buildings to Retrofit
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={interventionConfig.percentage}
                  onChange={(e) => handleConfigChange('percentage', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-blue-600 w-12">
                  {interventionConfig.percentage}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retrofit Package
              </label>
              <select
                value={interventionConfig.retrofitPackage}
                onChange={(e) => handleConfigChange('retrofitPackage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="basic-insulation">Basic Insulation</option>
                <option value="medium-retrofit">Medium Retrofit</option>
                <option value="deep-retrofit">Deep Energy Retrofit</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Estimated demand reduction: 15-30%</p>
            </div>
          </div>
        )}

        {selectedIntervention.id === 'solar-pv' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Buildings/Areas for PV
              </label>
              <select
                value={interventionConfig.targetBuildings}
                onChange={(e) => handleConfigChange('targetBuildings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all-suitable">All Suitable Rooftops</option>
                <option value="commercial-rooftops">Commercial Rooftops</option>
                <option value="south-facing">South-Facing Residential</option>
                <option value="community-solar">Community Solar Area</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size per Building/Area
              </label>
              <select
                value={interventionConfig.pvSize}
                onChange={(e) => handleConfigChange('pvSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="optimize">Optimize for Roof</option>
                <option value="5kw">5kW</option>
                <option value="10kw">10kW</option>
                <option value="20kw">20kW</option>
              </select>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Total New PV Capacity Added This Phase: <strong>250 kW</strong>
              </p>
            </div>
          </div>
        )}

        {selectedIntervention.id === 'battery-storage' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Location Type
              </label>
              <select
                value={interventionConfig.targetBuildings}
                onChange={(e) => handleConfigChange('targetBuildings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="substation">At Substation</option>
                <option value="community-hub">Community Hub</option>
                <option value="large-buildings">Individual Large Buildings</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Size (kWh)
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={interventionConfig.batterySize}
                onChange={(e) => handleConfigChange('batterySize', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>50 kWh</span>
                <span className="font-semibold">{interventionConfig.batterySize} kWh</span>
                <span>500 kWh</span>
              </div>
            </div>
          </div>
        )}

        {selectedIntervention.id === 'ev-chargers' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Charging Points
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={interventionConfig.chargingPoints}
                onChange={(e) => handleConfigChange('chargingPoints', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span className="font-semibold">{interventionConfig.chargingPoints} points</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Locations for Chargers
              </label>
              <select
                value={interventionConfig.targetBuildings}
                onChange={(e) => handleConfigChange('targetBuildings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="public-parking">Public Parking Lots</option>
                <option value="commercial-buildings">Commercial Buildings</option>
                <option value="residential-complexes">Residential Complexes</option>
              </select>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Completion Year
          </label>
          <input
            type="number"
            min="2025"
            max="2050"
            value={interventionConfig.targetYear}
            onChange={(e) => handleConfigChange('targetYear', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={addInterventionToList}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add This {selectedIntervention.name} Phase to Plan
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Step 3: Define Interventions for Scenario: ${state.currentScenario?.name || 'New Scenario'}`} 
        showBack 
        backTo="/scenario-configuration" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Context Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-800">
            <span>Target CO₂: <strong>{state.currentScenario?.config?.co2Reduction || 60}%</strong></span>
            <span>Max Retrofit Rate: <strong>{state.currentScenario?.config?.retrofitRate || 3}%/yr</strong></span>
            <span>Annual Budget: <strong>€{(state.currentScenario?.config?.annualBudget || 500000).toLocaleString()}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Intervention Library */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Intervention Library</h3>
            
            {interventionTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedIntervention?.id === type.id;
              
              return (
                <div
                  key={type.id}
                  onClick={() => handleInterventionSelect(type)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: type.color }}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                      <Plus className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Configuration Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {renderInterventionConfig()}
            </div>
          </div>

          {/* Intervention Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Intervention Plan
              </h3>
              
              {interventionPlan.length === 0 ? (
                <p className="text-gray-500 italic">No interventions added yet</p>
              ) : (
                <div className="space-y-3">
                  {interventionPlan.map((intervention, index) => (
                    <div key={intervention.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {intervention.targetYear}
                            </span>
                            <span className="font-medium text-gray-900 text-sm">
                              {intervention.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{intervention.details}</p>
                          <p className="text-xs font-semibold text-green-600">{intervention.cost}</p>
                        </div>
                        <div className="flex space-x-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="h-3 w-3" />
                          </button>
                          <button 
                            onClick={() => removeIntervention(index)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Feasibility Check */}
              {interventionPlan.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Feasibility Check</h4>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center space-x-2 ${
                      feasibility.retrofitExceeded ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {feasibility.retrofitExceeded ? 
                        <AlertTriangle className="h-3 w-3" /> : 
                        <CheckCircle className="h-3 w-3" />
                      }
                      <span>
                        Retrofit Rate: {feasibility.retrofitRate.toFixed(1)}%/yr 
                        (Max: {feasibility.maxRetrofitRate}%)
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      feasibility.budgetExceeded ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {feasibility.budgetExceeded ? 
                        <AlertTriangle className="h-3 w-3" /> : 
                        <CheckCircle className="h-3 w-3" />
                      }
                      <span>
                        Max Annual Spend: €{Math.round(feasibility.totalCost / 1000)}k 
                        (Cap: €{Math.round(feasibility.annualBudget / 1000)}k)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {interventionPlan.length > 0 && (
                <button
                  onClick={() => navigate('/simulation-progress')}
                  className="w-full mt-4 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Save Full Plan & Proceed to Simulation
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}