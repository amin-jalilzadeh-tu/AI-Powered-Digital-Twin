import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CheckCircle, Clock, Loader, Zap, Building2, Sun, Battery, Car, BarChart3, Database } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function SimulationProgress() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentModule, setCurrentModule] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('00:05:30');
  const [moduleStatus, setModuleStatus] = useState({
    ubem: 'waiting',
    grid: 'waiting',
    aggregator: 'waiting'
  });

  // Detailed simulation steps
  const [simulationSteps, setSimulationSteps] = useState([
    { id: 'init', name: 'Initializing Simulation', progress: 0, status: 'waiting', icon: Database, description: 'Setting up simulation environment and loading district data' },
    { id: 'ubem-buildings', name: 'Modeling Building Demands (UBEM)', progress: 0, status: 'waiting', icon: Building2, description: 'Calculating energy demands for all buildings using physics-based models' },
    { id: 'solar-pv', name: 'Simulating Solar PV Generation', progress: 0, status: 'waiting', icon: Sun, description: 'Computing solar photovoltaic generation profiles' },
    { id: 'battery', name: 'Simulating Battery Dispatch', progress: 0, status: 'waiting', icon: Battery, description: 'Optimizing battery storage charge/discharge cycles' },
    { id: 'ev-charging', name: 'Calculating EV Charging Loads', progress: 0, status: 'waiting', icon: Car, description: 'Modeling electric vehicle charging patterns and grid impact' },
    { id: 'node-loads', name: 'Aggregating Node Loads', progress: 0, status: 'waiting', icon: BarChart3, description: 'Combining all loads at electrical network nodes' },
    { id: 'grid-analysis', name: 'Running Grid Impact Analysis', progress: 0, status: 'waiting', icon: Zap, description: 'Analyzing power flows and identifying grid constraints' },
    { id: 'finalize', name: 'Finalizing Results', progress: 0, status: 'waiting', icon: CheckCircle, description: 'Processing results and generating reports' }
  ]);

  const modules = [
    { id: 'ubem', name: 'UBEM Engine', description: 'Simulating building energy demands', time: '2 min' },
    { id: 'grid', name: 'Grid Model API', description: 'Calculating grid impacts and constraints', time: '2 min' },
    { id: 'aggregator', name: 'Data Aggregator', description: 'Processing and combining results', time: '1 min' }
  ];

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 0.8, 100);
          
          // Update simulation steps based on progress
          const stepProgress = newProgress / 100 * simulationSteps.length;
          const currentStepIndex = Math.floor(stepProgress);
          const currentStepProgress = (stepProgress - currentStepIndex) * 100;

          setSimulationSteps(prevSteps => 
            prevSteps.map((step, index) => {
              if (index < currentStepIndex) {
                return { ...step, progress: 100, status: 'completed' };
              } else if (index === currentStepIndex) {
                return { 
                  ...step, 
                  progress: Math.min(currentStepProgress, 100), 
                  status: currentStepProgress > 0 ? 'running' : 'waiting' 
                };
              } else {
                return { ...step, progress: 0, status: 'waiting' };
              }
            })
          );

          // Update current module based on progress
          if (newProgress <= 40) {
            setCurrentModule('UBEM Engine');
            setModuleStatus(prev => ({ ...prev, ubem: 'running' }));
          } else if (newProgress <= 80) {
            setCurrentModule('Grid Model API');
            setModuleStatus(prev => ({ ...prev, ubem: 'completed', grid: 'running' }));
          } else if (newProgress < 100) {
            setCurrentModule('Data Aggregator');
            setModuleStatus(prev => ({ ...prev, grid: 'completed', aggregator: 'running' }));
          } else {
            setCurrentModule('Completed');
            setModuleStatus({ ubem: 'completed', grid: 'completed', aggregator: 'completed' });
          }
          
          // Update estimated time
          const remainingSeconds = Math.max(0, 330 - (newProgress * 3.3));
          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = Math.floor(remainingSeconds % 60);
          setEstimatedTime(`00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          
          return newProgress;
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isRunning, progress, simulationSteps.length]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleViewResults = () => {
    navigate('/grid-impact-analysis');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStepStatusIcon = (status: string, IconComponent: any) => {
    switch (status) {
      case 'running':
        return <Loader className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <IconComponent className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Step 4: Run Simulation for Scenario: ${state.currentScenario?.name || 'New Scenario'}`} 
        showBack 
        backTo="/intervention-selection" 
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Confirmation Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Configuration Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Scenario Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>District: <span className="font-medium text-gray-900">{state.selectedDistrict?.name}</span></p>
                <p>Scenario:  <span className="font-medium text-gray-900">{state.currentScenario?.name}</span></p>
                <p>Planning Horizon: <span className="font-medium text-gray-900">2025 - {state.currentScenario?.endYear}</span></p>
                <p>Interventions: <span className="font-medium text-gray-900">{state.interventionPlan?.length || 0} phases</span></p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Targets</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>CO₂ Reduction: <span className="font-medium text-gray-900">{state.currentScenario?.config?.co2Reduction}%</span></p>
                <p>Heat Pump Adoption: <span className="font-medium text-gray-900">{state.currentScenario?.config?.heatPumpAdoption}%</span></p>
                <p>EV Penetration: <span className="font-medium text-gray-900">{state.currentScenario?.config?.evPenetration}%</span></p>
                <p>Annual Budget: <span className="font-medium text-gray-900">€{(state.currentScenario?.config?.annualBudget || 500000).toLocaleString()}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Control */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Simulation Control</h3>
            <div className="text-sm text-gray-600">
              Estimated Time: <span className="font-medium text-gray-900">{estimatedTime}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            {currentModule && (
              <p className="text-sm text-gray-600 mt-2">
                Current: {currentModule}
              </p>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex space-x-4">
            {!isRunning && progress === 0 && (
              <button
                onClick={handleStart}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Play className="h-5 w-5" />
                <span>Start Simulation</span>
              </button>
            )}
            
            {isRunning && progress < 100 && (
              <button
                onClick={handlePause}
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                <Pause className="h-5 w-5" />
                <span>Pause Simulation</span>
              </button>
            )}
            
            {!isRunning && progress > 0 && progress < 100 && (
              <button
                onClick={handleStart}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Play className="h-5 w-5" />
                <span>Resume Simulation</span>
              </button>
            )}
            
            {progress === 100 && (
              <button
                onClick={handleViewResults}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <CheckCircle className="h-5 w-5" />
                <span>View Results</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Simulation Steps */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Simulation Steps</h3>
            
            <div className="space-y-4">
              {simulationSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Connection line */}
                  {index < simulationSteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'running' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {getStepStatusIcon(step.status, step.icon)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{step.name}</h4>
                        <span className="text-sm font-medium text-gray-600">{Math.round(step.progress)}%</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      
                      {/* Individual step progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'running' ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                      
                      {step.status === 'running' && (
                        <div className="mt-2 text-xs text-blue-600 font-medium">
                          Processing...
                        </div>
                      )}
                      
                      {step.status === 'completed' && (
                        <div className="mt-2 text-xs text-green-600 font-medium">
                          ✓ Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Status & System Info */}
          <div className="space-y-6">
            {/* Module Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Status</h3>
              
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      {getStatusIcon(moduleStatus[module.id as keyof typeof moduleStatus])}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{module.name}</h4>
                        <span className="text-sm text-gray-500">{module.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(moduleStatus[module.id as keyof typeof moduleStatus])
                    }`}>
                      {moduleStatus[module.id as keyof typeof moduleStatus] === 'waiting' && 'Waiting'}
                      {moduleStatus[module.id as keyof typeof moduleStatus] === 'running' && 'Running'}
                      {moduleStatus[module.id as keyof typeof moduleStatus] === 'completed' && 'Completed'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Details</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Processing Scope</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Multi-year simulation ({(state.currentScenario?.endYear || 2040) - 2025} years)</li>
                    <li>• {state.selectedDistrict?.buildings.toLocaleString()} buildings analyzed</li>
                    <li>• {state.interventionPlan?.length || 0} intervention phases</li>
                    <li>• Hourly resolution for critical periods</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Output Generation</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Energy demand trajectories</li>
                    <li>• Grid impact assessments</li>
                    <li>• Cost-benefit analysis</li>
                    <li>• Environmental impact metrics</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Real-time Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-900">
                        {Math.round(progress * 12.34)}
                      </div>
                      <div className="text-xs text-blue-700">Buildings Processed</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-900">
                        {Math.round(progress * 8760 / 100)}h
                      </div>
                      <div className="text-xs text-green-700">Time Steps Simulated</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Preview */}
            {progress === 100 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Ready to Run Grid Impact Analysis</h3>
                </div>
                <p className="text-green-800 mb-4">
                  Demand and generation simulations are complete. Now we can analyze how this scenario 
                  affects the electrical grid.
                </p>
                <button
                  onClick={handleViewResults}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Zap className="h-4 w-4" />
                  <span>Start Grid Analysis</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}