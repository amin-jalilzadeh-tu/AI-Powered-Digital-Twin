import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Info, Calendar, Target, Sliders, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function ScenarioConfiguration() {
  const navigate = useNavigate();
  const { state, setCurrentScenario } = useAppContext();
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');
  const [endYear, setEndYear] = useState(2040);
  const [expandedSections, setExpandedSections] = useState({
    technology: true,
    economic: false,
    targets: false,
    constraints: false
  });

  const [config, setConfig] = useState({
    heatPumpAdoption: 50,
    evPenetration: 40,
    electricityPrice: 0.25,
    carbonTax: 50,
    discountRate: 5,
    co2Reduction: 60,
    netZeroNewConstructions: false,
    retrofitRate: 2,
    derPenetration: 80,
    annualBudget: 500000
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleConfigChange = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const scenario = {
      name: scenarioName,
      description: scenarioDescription,
      endYear,
      config,
      district: state.selectedDistrict?.name,
      createdAt: new Date().toISOString()
    };
    
    setCurrentScenario(scenario);
    navigate('/intervention-selection');
  };

  const isFormValid = scenarioName.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Step 2: Configure Scenario for ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/detailed-exploration" 
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form className="space-y-8">
          {/* Scenario Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Scenario Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="scenario-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Scenario Name *
                </label>
                <input
                  type="text"
                  id="scenario-name"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="e.g., Northwood Electrification 2040"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="scenario-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Scenario Description
                </label>
                <textarea
                  id="scenario-description"
                  value={scenarioDescription}
                  onChange={(e) => setScenarioDescription(e.target.value)}
                  placeholder="Optional: Describe goals and assumptions..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Baseline & Horizon */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Baseline & Horizon</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Using "{state.selectedDistrict?.name || 'Selected District'} - Current State 2025" as baseline
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                  <input
                    type="number"
                    value={2025}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2030}>2030</option>
                    <option value={2035}>2035</option>
                    <option value={2040}>2040</option>
                    <option value={2045}>2045</option>
                    <option value={2050}>2050</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* District Policy Targets */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Current District Policy Targets</h3>
            </div>
            
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Overall CO₂ Reduction by 2040 (vs 2020): <strong>-70%</strong></p>
              <p>• Renewable Energy Share in Buildings by 2035: <strong>50%</strong></p>
              <p>• Mandatory Energy Label B for all rentals by 2030</p>
            </div>
          </div>

          {/* Technology Adoption */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <button
              type="button"
              onClick={() => toggleSection('technology')}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center space-x-2">
                <Sliders className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Technology Adoption Rates</h3>
              </div>
              {expandedSections.technology ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
            
            {expandedSections.technology && (
              <div className="px-6 pb-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Heat Pump Adoption Target by End Year (% of suitable buildings)
                    </label>
                    <span className="text-sm font-semibold text-blue-600">{config.heatPumpAdoption}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.heatPumpAdoption}
                    onChange={(e) => handleConfigChange('heatPumpAdoption', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Electric Vehicle (EV) Penetration Target by End Year (% of households)
                    </label>
                    <span className="text-sm font-semibold text-blue-600">{config.evPenetration}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.evPenetration}
                    onChange={(e) => handleConfigChange('evPenetration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Economic Factors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <button
              type="button"
              onClick={() => toggleSection('economic')}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Economic Factors</h3>
              </div>
              {expandedSections.economic ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
            
            {expandedSections.economic && (
              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Electricity Price (€/kWh)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={config.electricityPrice}
                      onChange={(e) => handleConfigChange('electricityPrice', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carbon Tax (€/tonne CO₂)
                    </label>
                    <input
                      type="number"
                      value={config.carbonTax}
                      onChange={(e) => handleConfigChange('carbonTax', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Rate (%)
                    </label>
                    <input
                      type="number"
                      value={config.discountRate}
                      onChange={(e) => handleConfigChange('discountRate', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feasibility Constraints */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <button
              type="button"
              onClick={() => toggleSection('constraints')}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Feasibility Constraints</h3>
              </div>
              {expandedSections.constraints ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
            
            {expandedSections.constraints && (
              <div className="px-6 pb-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Annual Building Retrofit Rate (% of total building stock per year)
                    </label>
                    <span className="text-sm font-semibold text-blue-600">{config.retrofitRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={config.retrofitRate}
                    onChange={(e) => handleConfigChange('retrofitRate', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max % of buildings that can realistically be retrofitted each year
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Max DER Penetration (% of technical potential for district)
                    </label>
                    <span className="text-sm font-semibold text-blue-600">{config.derPenetration}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.derPenetration}
                    onChange={(e) => handleConfigChange('derPenetration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max % of suitable rooftops for PV, or max % of demand manageable by batteries
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Grid Upgrade & NWA Investment Cap (€)
                  </label>
                  <input
                    type="number"
                    value={config.annualBudget}
                    onChange={(e) => handleConfigChange('annualBudget', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum budget available per year for all grid-related investments including NWAs
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset to Defaults
            </button>
            
            <button
              type="button"
              onClick={handleSave}
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isFormValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save Scenario Setup & Proceed
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}