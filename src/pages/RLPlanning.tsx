import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Brain, TrendingUp, Download, Eye, Calendar, Building2, Zap, Euro, Target, ChevronDown, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function RLPlanning() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [expandedPhases, setExpandedPhases] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('detailed');

  const [rlConfig, setRlConfig] = useState({
    baselineDistrict: 'northwood-2025',
    scenarioContext: 'high-ambition-2050',
    rewards: {
      minimizeCosts: 80,
      minimizeEmissions: 90,
      maximizeReliability: 70,
      maximizeRenewables: 60,
      adherenceToPolicy: 50
    },
    maxInvestment: 200000,
    trainingEpisodes: 10000,
    algorithm: 'ppo'
  });

  const learningData = [
    { episode: 0, reward: -150 },
    { episode: 1000, reward: -120 },
    { episode: 2000, reward: -90 },
    { episode: 3000, reward: -60 },
    { episode: 4000, reward: -30 },
    { episode: 5000, reward: 10 },
    { episode: 6000, reward: 35 },
    { episode: 7000, reward: 55 },
    { episode: 8000, reward: 70 },
    { episode: 9000, reward: 82 },
    { episode: 10000, reward: 88 }
  ];

  const aiRoadmaps = [
    {
      id: 'balanced',
      name: 'Balanced Approach',
      cost: '€15.2M',
      co2: '2.1k tonnes',
      reliability: 'High',
      description: 'Optimal balance between cost, emissions, and reliability with comprehensive building coverage',
      buildingsCovered: 1156,
      phases: 8
    },
    {
      id: 'aggressive',
      name: 'Aggressive CO₂ Reduction',
      cost: '€18.5M',
      co2: '1.4k tonnes',
      reliability: 'Medium-High',
      description: 'Maximum emissions reduction targeting 94% of district buildings',
      buildingsCovered: 1162,
      phases: 10
    },
    {
      id: 'cost-optimized',
      name: 'Cost Optimized',
      cost: '€12.8M',
      co2: '3.2k tonnes',
      reliability: 'Medium',
      description: 'Minimum cost approach while achieving significant improvements',
      buildingsCovered: 987,
      phases: 6
    }
  ];

  const detailedRoadmap = {
    overview: {
      totalPhases: 8,
      timespan: '2025-2040',
      buildingsCovered: 1156,
      totalBuildings: 1234,
      coveragePercentage: 93.7,
      totalInvestment: '€15.2M',
      annualSavings: '€2.8M',
      paybackPeriod: '5.4 years',
      co2ReductionTotal: '68%',
      peakDemandReduction: '32%'
    },
    timeline: [
      {
        phase: 1,
        period: '2025-2026',
        title: 'Foundation Phase: High-Impact Retrofits',
        duration: '18 months',
        totalCost: '€2.1M',
        buildings: [
          {
            cluster: 'Residential Cluster Alpha',
            buildingIds: ['NB-0112', 'NB-0134', 'NB-0156', 'NB-0178', 'NB-0201'],
            buildingCount: 45,
            type: 'Pre-1980 Residential',
            intervention: 'Deep Energy Retrofit',
            details: {
              insulation: 'External wall insulation (12cm), roof insulation (20cm)',
              windows: 'Triple-glazed windows (U-value 0.8 W/m²K)',
              heating: 'Air-source heat pumps (COP 4.2)',
              ventilation: 'Mechanical ventilation with heat recovery (85% efficiency)',
              controls: 'Smart thermostats and zone controls'
            },
            timeline: {
              design: 'Q1 2025 (3 months)',
              permits: 'Q2 2025 (2 months)',
              construction: 'Q3-Q4 2025 (6 months)',
              commissioning: 'Q1 2026 (1 month)'
            },
            costs: {
              design: '€85,000',
              materials: '€720,000',
              labor: '€480,000',
              permits: '€25,000',
              contingency: '€90,000',
              total: '€1,400,000'
            },
            impact: {
              energyReduction: '45%',
              co2Reduction: '52%',
              peakDemandReduction: '38%',
              annualSavings: '€180,000',
              affectedHouseholds: 45
            }
          },
          {
            cluster: 'Commercial Zone B',
            buildingIds: ['CB-007', 'CB-012', 'CB-018'],
            buildingCount: 8,
            type: 'Commercial Office Buildings',
            intervention: 'Comprehensive Energy Upgrade',
            details: {
              envelope: 'Facade renovation with high-performance glazing',
              hvac: 'VRF heat pump systems with smart controls',
              lighting: 'LED lighting with daylight sensors',
              bms: 'Advanced building management system',
              renewable: '50kW rooftop solar PV per building'
            },
            timeline: {
              design: 'Q1 2025 (2 months)',
              permits: 'Q2 2025 (1 month)',
              construction: 'Q3 2025-Q1 2026 (6 months)',
              commissioning: 'Q1 2026 (1 month)'
            },
            costs: {
              design: '€45,000',
              materials: '€380,000',
              labor: '€220,000',
              permits: '€15,000',
              contingency: '€40,000',
              total: '€700,000'
            },
            impact: {
              energyReduction: '38%',
              co2Reduction: '42%',
              peakDemandReduction: '35%',
              annualSavings: '€95,000',
              affectedBusinesses: 24
            }
          }
        ],
        milestones: [
          { date: 'March 2025', description: 'Complete design phase for all Phase 1 buildings' },
          { date: 'June 2025', description: 'Obtain all necessary permits and approvals' },
          { date: 'December 2025', description: 'Complete 70% of retrofit construction work' },
          { date: 'March 2026', description: 'Commission all systems and verify performance' }
        ],
        risks: [
          { risk: 'Permit delays', probability: 'Medium', mitigation: 'Early engagement with authorities, pre-approved designs' },
          { risk: 'Material cost inflation', probability: 'High', mitigation: 'Fixed-price contracts, bulk purchasing agreements' },
          { risk: 'Occupant disruption', probability: 'Medium', mitigation: 'Phased construction, temporary accommodation support' }
        ],
        kpis: {
          energyReduction: '42%',
          co2Reduction: '48%',
          costPerTonneCO2: '€4,375',
          jobsCreated: 85,
          buildingsCompleted: 53
        }
      },
      {
        phase: 2,
        period: '2026-2027',
        title: 'Solar Expansion Phase',
        duration: '15 months',
        totalCost: '€1.8M',
        buildings: [
          {
            cluster: 'Residential Rooftop Program',
            buildingIds: ['NB-0245', 'NB-0267', 'NB-0289', 'NB-0312'],
            buildingCount: 180,
            type: 'Suitable Residential Rooftops',
            intervention: 'Solar PV Installation',
            details: {
              capacity: '5-8kW per household (average 6.2kW)',
              technology: 'Monocrystalline silicon panels (21% efficiency)',
              inverters: 'String inverters with power optimizers',
              monitoring: 'Real-time production monitoring system',
              grid: 'Net metering with smart meter integration'
            },
            timeline: {
              assessment: 'Q1 2026 (2 months)',
              design: 'Q2 2026 (2 months)',
              installation: 'Q3 2026-Q1 2027 (6 months)',
              commissioning: 'Q1 2027 (1 month)'
            },
            costs: {
              equipment: '€950,000',
              installation: '€420,000',
              permits: '€35,000',
              monitoring: '€85,000',
              contingency: '€90,000',
              total: '€1,580,000'
            },
            impact: {
              totalCapacity: '1.12 MW',
              annualGeneration: '1,180 MWh',
              co2Avoided: '472 tonnes/year',
              selfConsumption: '68%',
              gridFeedIn: '32%'
            }
          },
          {
            cluster: 'Community Solar Garden',
            buildingIds: ['CS-001'],
            buildingCount: 1,
            type: 'Community Solar Installation',
            intervention: 'Large-Scale Solar PV',
            details: {
              capacity: '500kW ground-mounted system',
              technology: 'Bifacial solar panels with tracking system',
              storage: 'Integrated 200kWh battery storage',
              grid: 'Direct grid connection with virtual net metering',
              beneficiaries: 'Serves 85 households without suitable rooftops'
            },
            timeline: {
              landPrep: 'Q1 2026 (1 month)',
              construction: 'Q2-Q3 2026 (4 months)',
              gridConnection: 'Q4 2026 (1 month)',
              commissioning: 'Q4 2026 (1 month)'
            },
            costs: {
              equipment: '€180,000',
              installation: '€35,000',
              landPrep: '€8,000',
              gridConnection: '€12,000',
              total: '€235,000'
            },
            impact: {
              annualGeneration: '650 MWh',
              co2Avoided: '260 tonnes/year',
              householdsServed: 85,
              communityOwnership: '40%'
            }
          }
        ],
        milestones: [
          { date: 'March 2026', description: 'Complete rooftop assessments and feasibility studies' },
          { date: 'June 2026', description: 'Begin residential PV installations' },
          { date: 'September 2026', description: 'Complete community solar garden construction' },
          { date: 'March 2027', description: 'Achieve 1.77 MW total solar capacity online' }
        ],
        risks: [
          { risk: 'Weather delays', probability: 'Medium', mitigation: 'Flexible scheduling, weather contingency plans' },
          { risk: 'Grid connection delays', probability: 'Low', mitigation: 'Early grid impact studies, DSO coordination' },
          { risk: 'Technology defects', probability: 'Low', mitigation: 'Tier-1 suppliers, comprehensive warranties' }
        ],
        kpis: {
          totalCapacity: '1.77 MW',
          annualGeneration: '1,830 MWh',
          co2Avoided: '732 tonnes/year',
          householdsWithSolar: 265,
          gridStabilityImprovement: '12%'
        }
      },
      {
        phase: 3,
        period: '2027-2028',
        title: 'Smart Grid Integration Phase',
        duration: '20 months',
        totalCost: '€2.4M',
        buildings: [
          {
            cluster: 'Battery Storage Network',
            buildingIds: ['BS-001', 'BS-002', 'BS-003'],
            buildingCount: 3,
            type: 'Strategic Battery Locations',
            intervention: 'Community Battery Storage',
            details: {
              capacity: '250kWh per location (750kWh total)',
              technology: 'Lithium iron phosphate (LiFePO4) batteries',
              inverters: 'Grid-forming inverters for islanding capability',
              controls: 'AI-optimized dispatch system',
              services: 'Peak shaving, frequency regulation, backup power'
            },
            timeline: {
              sitePrep: 'Q1 2027 (2 months)',
              installation: 'Q2-Q3 2027 (4 months)',
              testing: 'Q4 2027 (2 months)',
              optimization: 'Q1 2028 (2 months)'
            },
            costs: {
              batteries: '€450,000',
              inverters: '€180,000',
              installation: '€120,000',
              controls: '€85,000',
              siteWork: '€65,000',
              total: '€900,000'
            },
            impact: {
              peakShaving: '1.2 MW',
              backupCapacity: '4 hours',
              gridStabilization: 'High',
              co2Reduction: '180 tonnes/year',
              householdsServed: 320
            }
          },
          {
            cluster: 'EV Charging Infrastructure',
            buildingIds: ['EV-HUB-01', 'EV-HUB-02', 'EV-HUB-03', 'EV-HUB-04'],
            buildingCount: 4,
            type: 'EV Charging Hubs',
            intervention: 'Smart EV Charging Network',
            details: {
              chargers: '8 fast chargers (50kW) + 24 standard chargers (11kW)',
              technology: 'Smart charging with load balancing',
              v2g: 'Vehicle-to-grid capability for 50% of chargers',
              payment: 'Integrated payment and reservation system',
              renewable: 'Solar canopies over charging areas'
            },
            timeline: {
              design: 'Q1 2027 (2 months)',
              permits: 'Q2 2027 (1 month)',
              construction: 'Q3 2027-Q1 2028 (6 months)',
              commissioning: 'Q1 2028 (1 month)'
            },
            costs: {
              chargers: '€480,000',
              installation: '€280,000',
              solarCanopies: '€320,000',
              software: '€45,000',
              permits: '€25,000',
              total: '€1,150,000'
            },
            impact: {
              evSupport: '180 vehicles',
              v2gCapacity: '0.8 MW',
              solarGeneration: '180 MWh/year',
              co2Avoided: '420 tonnes/year',
              revenueGeneration: '€85,000/year'
            }
          },
          {
            cluster: 'Smart Meter Deployment',
            buildingIds: 'All Phase 1 & 2 buildings',
            buildingCount: 233,
            type: 'Smart Metering Infrastructure',
            intervention: 'Advanced Metering Infrastructure (AMI)',
            details: {
              meters: 'Smart electricity, gas, and heat meters',
              communication: '4G/5G cellular and LoRaWAN backup',
              analytics: 'Real-time consumption analytics platform',
              automation: 'Automated demand response capabilities',
              privacy: 'GDPR-compliant data handling and encryption'
            },
            timeline: {
              procurement: 'Q1 2027 (1 month)',
              installation: 'Q2-Q4 2027 (6 months)',
              commissioning: 'Q1 2028 (2 months)',
              optimization: 'Q1-Q2 2028 (3 months)'
            },
            costs: {
              meters: '€186,400',
              installation: '€93,200',
              software: '€65,000',
              commissioning: '€35,000',
              training: '€15,000',
              total: '€394,600'
            },
            impact: {
              dataGranularity: '15-minute intervals',
              demandResponse: '15% peak reduction potential',
              energySavings: '8% through behavioral change',
              gridVisibility: '100% real-time monitoring',
              faultDetection: '90% faster outage identification'
            }
          }
        ],
        milestones: [
          { date: 'June 2027', description: 'Complete first battery storage installation' },
          { date: 'September 2027', description: 'Launch EV charging network' },
          { date: 'December 2027', description: 'Complete smart meter rollout' },
          { date: 'June 2028', description: 'Achieve full smart grid integration' }
        ],
        risks: [
          { risk: 'Technology integration complexity', probability: 'Medium', mitigation: 'Phased rollout, extensive testing protocols' },
          { risk: 'Cybersecurity vulnerabilities', probability: 'Medium', mitigation: 'Security-by-design, regular audits' },
          { risk: 'Public acceptance of smart meters', probability: 'Low', mitigation: 'Community engagement, privacy guarantees' }
        ],
        kpis: {
          batteryCapacity: '750 kWh',
          evChargingPoints: 32,
          smartMeters: 233,
          gridFlexibility: '25% increase',
          systemReliability: '99.5%'
        }
      }
      // Additional phases would continue with similar detail...
    ],
    cumulativeImpact: [
      { year: 2025, energyReduction: 0, co2Reduction: 0, cost: 0, buildings: 0 },
      { year: 2026, energyReduction: 12, co2Reduction: 15, cost: 2.1, buildings: 53 },
      { year: 2027, energyReduction: 18, co2Reduction: 22, cost: 3.9, buildings: 236 },
      { year: 2028, energyReduction: 25, co2Reduction: 32, cost: 6.3, buildings: 469 },
      { year: 2030, energyReduction: 35, co2Reduction: 45, cost: 9.8, buildings: 687 },
      { year: 2032, energyReduction: 48, co2Reduction: 58, cost: 12.4, buildings: 892 },
      { year: 2035, energyReduction: 58, co2Reduction: 65, cost: 14.1, buildings: 1024 },
      { year: 2040, energyReduction: 68, co2Reduction: 72, cost: 15.2, buildings: 1156 }
    ],
    financialAnalysis: {
      totalInvestment: 15200000,
      annualSavings: 2800000,
      paybackPeriod: 5.4,
      npv: 8900000,
      irr: 18.5,
      costPerTonneCO2: 4200,
      jobsCreated: 340,
      localEconomicImpact: 22500000
    },
    riskAssessment: [
      {
        category: 'Technical',
        risks: [
          { risk: 'Technology performance below expectations', probability: 'Low', impact: 'Medium', mitigation: 'Performance guarantees, proven technologies' },
          { risk: 'Integration challenges between systems', probability: 'Medium', impact: 'Medium', mitigation: 'Standardized protocols, extensive testing' }
        ]
      },
      {
        category: 'Financial',
        risks: [
          { risk: 'Cost overruns', probability: 'Medium', impact: 'High', mitigation: 'Fixed-price contracts, contingency reserves' },
          { risk: 'Energy price volatility', probability: 'High', impact: 'Medium', mitigation: 'Diversified revenue streams, hedging strategies' }
        ]
      },
      {
        category: 'Regulatory',
        risks: [
          { risk: 'Policy changes affecting incentives', probability: 'Medium', impact: 'High', mitigation: 'Scenario planning, flexible design' },
          { risk: 'Grid code changes', probability: 'Low', impact: 'Medium', mitigation: 'Future-proof designs, modular systems' }
        ]
      }
    ]
  };

  const handleRewardChange = (reward: string, value: number) => {
    setRlConfig(prev => ({
      ...prev,
      rewards: { ...prev.rewards, [reward]: value }
    }));
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentEpisode(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        setCurrentEpisode(Math.floor((newProgress / 100) * rlConfig.trainingEpisodes));
        
        if (newProgress >= 100) {
          setIsTraining(false);
          setShowResults(true);
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 100);
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  const viewDetailedRoadmap = (roadmap: any) => {
    setSelectedRoadmap(roadmap);
  };

  const togglePhaseExpansion = (phaseIndex: number) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseIndex]: !prev[phaseIndex]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Automated Strategic Planning via Deep Reinforcement Learning" 
        showBack 
        backTo="/gnn-analysis" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRoadmap ? (
          <>
            {/* RL Configuration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">RL Configuration & Goal Definition</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Configuration */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Baseline District State
                    </label>
                    <select
                      value={rlConfig.baselineDistrict}
                      onChange={(e) => setRlConfig(prev => ({ ...prev, baselineDistrict: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="northwood-2025">Northwood District - Current State 2025</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Scenario Context (Optional)
                    </label>
                    <select
                      value={rlConfig.scenarioContext}
                      onChange={(e) => setRlConfig(prev => ({ ...prev, scenarioContext: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="high-ambition-2050">High Ambition 2050 Feasibility Constraints & Targets</option>
                      <option value="none">No Scenario Context</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Investment per Action/Year (€)
                    </label>
                    <input
                      type="number"
                      value={rlConfig.maxInvestment}
                      onChange={(e) => setRlConfig(prev => ({ ...prev, maxInvestment: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Reward Function */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Define What 'Optimal' Means for the AI Agent:</h4>
                  <div className="space-y-4">
                    {Object.entries(rlConfig.rewards).map(([key, value]) => {
                      const labels = {
                        minimizeCosts: 'Minimize Total System Costs (CAPEX & OPEX)',
                        minimizeEmissions: 'Minimize Cumulative CO₂ Emissions',
                        maximizeReliability: 'Maximize Grid Reliability',
                        maximizeRenewables: 'Maximize Renewable Energy Utilization',
                        adherenceToPolicy: 'Adherence to Policy Targets'
                      };
                      
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              {labels[key as keyof typeof labels]}
                            </label>
                            <span className="text-sm font-semibold text-blue-600">{value}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => handleRewardChange(key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Training Section */}
            {!showResults && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">RL Training & Monitoring</h3>
                  <button
                    onClick={isTraining ? stopTraining : startTraining}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isTraining 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isTraining ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span>{isTraining ? 'Stop Training' : 'Start RL Strategic Planning Agent'}</span>
                  </button>
                </div>

                {isTraining && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          RL Agent Training: Episode {currentEpisode.toLocaleString()} / {rlConfig.trainingEpisodes.toLocaleString()}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{trainingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${trainingProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Learning Progress Chart */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Agent Learning Progress</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={learningData.slice(0, Math.floor((trainingProgress / 100) * learningData.length))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="episode" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip />
                            <Line type="monotone" dataKey="reward" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Current Best Strategy Preview */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Current Best Strategy (Episode {currentEpisode.toLocaleString()})
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-2 bg-gray-50 rounded">
                              <div className="font-semibold text-gray-900">€15.2M</div>
                              <div className="text-gray-600">Est. Total Cost</div>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <div className="font-semibold text-gray-900">2.1k</div>
                              <div className="text-gray-600">CO₂ Tonnes</div>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <div className="font-semibold text-gray-900">1,156</div>
                              <div className="text-gray-600">Buildings</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p>• 2025-2026: Deep retrofit 53 high-impact buildings</p>
                            <p>• 2026-2027: Deploy 1.77MW solar across 265 buildings</p>
                            <p>• 2027-2028: Install smart grid infrastructure</p>
                            <p>• 2028-2030: Scale to 687 buildings with integrated systems</p>
                            <p>• 2030-2040: Complete district transformation (1,156 buildings)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Results Section */}
            {showResults && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Optimized Strategic Roadmaps</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aiRoadmaps.map((roadmap) => (
                      <div key={roadmap.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-4">
                          <Brain className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">{roadmap.name}</h4>
                        </div>
                        
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Cost:</span>
                            <span className="font-medium text-gray-900">{roadmap.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CO₂ Reduction:</span>
                            <span className="font-medium text-gray-900">{roadmap.co2}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Buildings Covered:</span>
                            <span className="font-medium text-gray-900">{roadmap.buildingsCovered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Implementation Phases:</span>
                            <span className="font-medium text-gray-900">{roadmap.phases}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reliability:</span>
                            <span className="font-medium text-gray-900">{roadmap.reliability}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{roadmap.description}</p>
                        
                        <button
                          onClick={() => viewDetailedRoadmap(roadmap)}
                          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          View Detailed Roadmap
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Detailed Roadmap View */
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Comprehensive Roadmap: {selectedRoadmap.name}
                </h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="overview">Overview</option>
                    <option value="detailed">Detailed Timeline</option>
                    <option value="financial">Financial Analysis</option>
                    <option value="risks">Risk Assessment</option>
                  </select>
                  <button
                    onClick={() => setSelectedRoadmap(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back to Roadmaps
                  </button>
                </div>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{detailedRoadmap.overview.buildingsCovered}</div>
                  <div className="text-xs text-gray-600">Buildings Covered</div>
                  <div className="text-xs text-blue-600">{detailedRoadmap.overview.coveragePercentage}% of district</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Euro className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{detailedRoadmap.overview.totalInvestment}</div>
                  <div className="text-xs text-gray-600">Total Investment</div>
                  <div className="text-xs text-green-600">{detailedRoadmap.overview.paybackPeriod} payback</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{detailedRoadmap.overview.co2ReductionTotal}</div>
                  <div className="text-xs text-gray-600">CO₂ Reduction</div>
                  <div className="text-xs text-purple-600">vs baseline</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{detailedRoadmap.overview.peakDemandReduction}</div>
                  <div className="text-xs text-gray-600">Peak Reduction</div>
                  <div className="text-xs text-yellow-600">grid relief</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{detailedRoadmap.overview.totalPhases}</div>
                  <div className="text-xs text-gray-600">Implementation Phases</div>
                  <div className="text-xs text-indigo-600">{detailedRoadmap.overview.timespan}</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{detailedRoadmap.overview.annualSavings}</div>
                  <div className="text-xs text-gray-600">Annual Savings</div>
                  <div className="text-xs text-red-600">after completion</div>
                </div>
              </div>
            </div>

            {/* Cumulative Impact Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Cumulative Impact Over Time</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={detailedRoadmap.cumulativeImpact}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area type="monotone" dataKey="energyReduction" stackId="1" stroke="#3b82f6" fill="#3b82f620" name="Energy Reduction %" />
                  <Area type="monotone" dataKey="co2Reduction" stackId="2" stroke="#10b981" fill="#10b98120" name="CO₂ Reduction %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Timeline */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-6">Detailed Implementation Timeline</h4>
              
              <div className="space-y-6">
                {detailedRoadmap.timeline.map((phase, phaseIndex) => (
                  <div key={phase.phase} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => togglePhaseExpansion(phaseIndex)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-blue-600">{phase.phase}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{phase.title}</h5>
                          <p className="text-sm text-gray-600">{phase.period} • {phase.duration} • {phase.totalCost}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div className="font-medium text-gray-900">{phase.buildings.reduce((sum, b) => sum + b.buildingCount, 0)} Buildings</div>
                          <div className="text-gray-600">{phase.kpis.energyReduction} Energy Reduction</div>
                        </div>
                        {expandedPhases[phaseIndex] ? 
                          <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        }
                      </div>
                    </button>
                    
                    {expandedPhases[phaseIndex] && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                          {/* Building Clusters */}
                          <div>
                            <h6 className="font-medium text-gray-900 mb-4">Building Clusters & Interventions</h6>
                            <div className="space-y-4">
                              {phase.buildings.map((cluster, clusterIndex) => (
                                <div key={clusterIndex} className="p-4 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-between mb-3">
                                    <h7 className="font-medium text-gray-900">{cluster.cluster}</h7>
                                    <span className="text-sm text-gray-600">{cluster.buildingCount} buildings</span>
                                  </div>
                                  
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Type:</strong> {cluster.type}</div>
                                    <div><strong>Intervention:</strong> {cluster.intervention}</div>
                                    <div><strong>Total Cost:</strong> {cluster.costs.total}</div>
                                    <div><strong>Energy Reduction:</strong> {cluster.impact.energyReduction}</div>
                                    <div><strong>CO₂ Reduction:</strong> {cluster.impact.co2Reduction}</div>
                                    <div><strong>Annual Savings:</strong> {cluster.impact.annualSavings}</div>
                                  </div>
                                  
                                  {cluster.buildingIds && Array.isArray(cluster.buildingIds) && (
                                    <div className="mt-3">
                                      <div className="text-xs text-gray-600 mb-1">Sample Building IDs:</div>
                                      <div className="text-xs text-gray-500">
                                        {cluster.buildingIds.slice(0, 5).join(', ')}
                                        {cluster.buildingIds.length > 5 && ` +${cluster.buildingIds.length - 5} more`}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="text-xs text-gray-600 mb-1">Technical Details:</div>
                                    <div className="text-xs text-gray-700">
                                      {Object.entries(cluster.details).slice(0, 3).map(([key, value]) => (
                                        <div key={key}>• <strong>{key}:</strong> {value}</div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Timeline & Milestones */}
                          <div>
                            <h6 className="font-medium text-gray-900 mb-4">Timeline & Milestones</h6>
                            <div className="space-y-4">
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <h7 className="font-medium text-blue-900 mb-2">Key Milestones</h7>
                                <div className="space-y-2">
                                  {phase.milestones.map((milestone, milestoneIndex) => (
                                    <div key={milestoneIndex} className="flex items-start space-x-2 text-sm">
                                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                      <div>
                                        <div className="font-medium text-blue-900">{milestone.date}</div>
                                        <div className="text-blue-800">{milestone.description}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="p-4 bg-yellow-50 rounded-lg">
                                <h7 className="font-medium text-yellow-900 mb-2">Risk Management</h7>
                                <div className="space-y-2">
                                  {phase.risks.map((risk, riskIndex) => (
                                    <div key={riskIndex} className="text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-yellow-900">{risk.risk}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          risk.probability === 'High' ? 'bg-red-100 text-red-700' :
                                          risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-green-100 text-green-700'
                                        }`}>
                                          {risk.probability}
                                        </span>
                                      </div>
                                      <div className="text-yellow-800 mt-1">{risk.mitigation}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="p-4 bg-green-50 rounded-lg">
                                <h7 className="font-medium text-green-900 mb-2">Phase KPIs</h7>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>Energy Reduction: <strong>{phase.kpis.energyReduction}</strong></div>
                                  <div>CO₂ Reduction: <strong>{phase.kpis.co2Reduction}</strong></div>
                                  <div>Buildings: <strong>{phase.kpis.buildingsCompleted}</strong></div>
                                  <div>Jobs Created: <strong>{phase.kpis.jobsCreated}</strong></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Financial Analysis & Economic Impact</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">€{(detailedRoadmap.financialAnalysis.totalInvestment / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-600">Total Investment</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{detailedRoadmap.financialAnalysis.paybackPeriod} years</div>
                  <div className="text-sm text-gray-600">Payback Period</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{detailedRoadmap.financialAnalysis.irr}%</div>
                  <div className="text-sm text-gray-600">Internal Rate of Return</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{detailedRoadmap.financialAnalysis.jobsCreated}</div>
                  <div className="text-sm text-gray-600">Jobs Created</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export Detailed Roadmap (PDF)</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>Compare with Manual Scenarios</span>
                </button>
              </div>
              
              <button
                onClick={() => navigate('/scenario-comparison')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Proceed to Scenario Comparison
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}