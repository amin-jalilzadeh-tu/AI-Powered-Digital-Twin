import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Activity, Zap, Sun, Battery, Car, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, RefreshCw, Wifi, WifiOff, Brain } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import KPICard from '../components/KPICard';

export default function RealTimeDashboard() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  // Real-time data states
  const [realTimeData, setRealTimeData] = useState({
    currentDemand: 2.4,
    solarGeneration: 0.8,
    batteryLevel: 65,
    gridImport: 1.6,
    evCharging: 0.3,
    gridHealth: 'healthy',
    alerts: 2,
    efficiency: 87
  });

  const [historicalData, setHistoricalData] = useState([
    { time: '00:00', demand: 1.8, solar: 0, battery: 70, grid: 1.8 },
    { time: '06:00', demand: 2.1, solar: 0.2, battery: 68, grid: 1.9 },
    { time: '12:00', demand: 2.8, solar: 1.2, battery: 75, grid: 1.6 },
    { time: '18:00', demand: 3.2, solar: 0.4, battery: 60, grid: 2.8 },
    { time: '24:00', demand: 2.0, solar: 0, battery: 65, grid: 2.0 }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Transformer T-01 approaching 80% capacity', time: '2 min ago', severity: 'medium' },
    { id: 2, type: 'info', message: 'Solar generation peak detected in Zone C', time: '5 min ago', severity: 'low' },
    { id: 3, type: 'success', message: 'Battery storage optimization completed', time: '10 min ago', severity: 'low' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        currentDemand: prev.currentDemand + (Math.random() - 0.5) * 0.2,
        solarGeneration: Math.max(0, prev.solarGeneration + (Math.random() - 0.5) * 0.1),
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 2)),
        gridImport: prev.gridImport + (Math.random() - 0.5) * 0.1,
        evCharging: Math.max(0, prev.evCharging + (Math.random() - 0.5) * 0.05),
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 1))
      }));
      setLastUpdate(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Activity;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const energyMixData = [
    { name: 'Grid Import', value: realTimeData.gridImport, color: '#64748b' },
    { name: 'Solar PV', value: realTimeData.solarGeneration, color: '#eab308' },
    { name: 'Battery', value: 0.2, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Real-Time Dashboard: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-green-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-600" />
                )}
                <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Auto-refresh:</label>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </select>

              <button
                onClick={() => setLastUpdate(new Date())}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Current Demand"
            value={`${realTimeData.currentDemand.toFixed(1)} MW`}
            icon="Zap"
            color="#ef4444"
            trend={realTimeData.currentDemand > 2.5 ? 'up' : 'down'}
            subtitle="District total"
          />
          <KPICard
            title="Solar Generation"
            value={`${realTimeData.solarGeneration.toFixed(1)} MW`}
            icon="Sun"
            color="#eab308"
            trend="up"
            subtitle="Live PV output"
          />
          <KPICard
            title="Battery Level"
            value={`${Math.round(realTimeData.batteryLevel)}%`}
            icon="Battery"
            color="#8b5cf6"
            trend={realTimeData.batteryLevel > 70 ? 'up' : 'down'}
            subtitle="Storage capacity"
          />
          <KPICard
            title="Grid Efficiency"
            value={`${Math.round(realTimeData.efficiency)}%`}
            icon="Activity"
            color="#10b981"
            trend="up"
            subtitle="System performance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Real-Time Energy Flow */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-Time Energy Flow (MW)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="demand" stackId="1" stroke="#ef4444" fill="#ef444420" name="Demand" />
                <Area type="monotone" dataKey="solar" stackId="2" stroke="#eab308" fill="#eab30820" name="Solar" />
                <Area type="monotone" dataKey="grid" stackId="3" stroke="#64748b" fill="#64748b20" name="Grid Import" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Current Energy Mix */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Energy Mix</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={energyMixData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}MW`}
                >
                  {energyMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Self-sufficiency:</span>
                <span className="font-medium text-gray-900">
                  {Math.round((realTimeData.solarGeneration / realTimeData.currentDemand) * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Grid dependency:</span>
                <span className="font-medium text-gray-900">
                  {Math.round((realTimeData.gridImport / realTimeData.currentDemand) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Live Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Alerts & Notifications</h3>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                {alerts.filter(a => a.type === 'warning').length} Active
              </span>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {alerts.map((alert) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start space-x-3">
                      <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Monitor</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Grid Infrastructure', status: 'healthy', value: 98 },
                { name: 'Solar PV Systems', status: 'healthy', value: 95 },
                { name: 'Battery Storage', status: 'warning', value: 78 },
                { name: 'EV Charging Network', status: 'healthy', value: 92 },
                { name: 'Communication Systems', status: 'healthy', value: 99 }
              ].map((system, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      system.status === 'healthy' ? 'bg-green-500' : 
                      system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-900">{system.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          system.status === 'healthy' ? 'bg-green-500' : 
                          system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${system.value}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{system.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/grid-impact-analysis')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Zap className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Grid Analysis</span>
            </button>
            
            <button
              onClick={() => navigate('/scenario-comparison')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <BarChart className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Compare Scenarios</span>
            </button>
            
            <button
              onClick={() => navigate('/ai-insights')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <Brain className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">AI Insights</span>
            </button>
            
            <button
              onClick={() => navigate('/predictive-analytics')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Predictions</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}