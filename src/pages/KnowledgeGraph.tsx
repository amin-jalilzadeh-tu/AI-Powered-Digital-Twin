import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, RefreshCw, Eye, AlertCircle, CheckCircle, Clock, FileText, Network, Layers, BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import KPICard from '../components/KPICard';
import GraphVisualization from '../components/GraphVisualization';

export default function KnowledgeGraph() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [showDetails, setShowDetails] = useState({});
  const [activeTab, setActiveTab] = useState('visualization');

  const kgStatus = {
    status: 'operational',
    totalEntities: 15780,
    relationshipTypes: 25,
    lastUpdate: 'June 7, 2025, 02:15 AM',
    completeness: 85,
    consistencyChecks: 99.8
  };

  const dataSources = [
    {
      id: 'gis',
      name: 'GIS Building Data',
      type: 'file',
      source: 'buildings.geojson',
      status: 'completed',
      lastProcessed: 'June 6',
      description: 'Building footprints and metadata',
      entities: 1234,
      relationships: 2468
    },
    {
      id: 'dso',
      name: 'DSO Grid Topology',
      type: 'api',
      source: 'DSO API Endpoint',
      status: 'completed',
      lastProcessed: 'June 7 (Live)',
      description: 'Real-time grid infrastructure data',
      entities: 156,
      relationships: 312
    },
    {
      id: 'ubem',
      name: 'UBEM Simulation Output',
      type: 'database',
      source: 'scenario_results_db',
      status: 'completed',
      lastProcessed: 'June 7',
      description: 'Energy simulation results',
      entities: 2468,
      relationships: 4936
    },
    {
      id: 'sensors',
      name: 'Real-time Sensor Feeds',
      type: 'stream',
      source: 'IoT Platform',
      status: 'partial',
      lastProcessed: 'Active',
      description: 'Live sensor measurements',
      entities: 89,
      relationships: 178
    }
  ];

  const processingSteps = [
    { name: 'Data Cleaning & Validation', processed: '1,234 building entities', status: 'completed' },
    { name: 'Semantic Mapping', processed: 'Ontology alignment complete', status: 'completed' },
    { name: 'RDF Triple Generation', processed: '50,000 triples generated', status: 'completed' },
    { name: 'KG Population/Update', processed: 'Knowledge graph updated', status: 'completed' }
  ];

  const entityTypes = [
    { type: 'Buildings', count: 1234, color: '#3b82f6', relationships: 2468 },
    { type: 'Transformers', count: 15, color: '#ef4444', relationships: 45 },
    { type: 'Feeders', count: 28, color: '#10b981', relationships: 84 },
    { type: 'PV Systems', count: 156, color: '#eab308', relationships: 312 },
    { type: 'EV Chargers', count: 45, color: '#8b5cf6', relationships: 90 },
    { type: 'Sensors', count: 89, color: '#f97316', relationships: 267 }
  ];

  const activityLog = [
    {
      time: 'June 7, 02:10 AM',
      type: 'INFO',
      message: 'Added 5 new EV Charger entities from \'High Ambition 2050\' scenario.',
      entities: 5,
      relationships: 15
    },
    {
      time: 'June 7, 02:00 AM',
      type: 'INFO',
      message: 'Updated load status for 15 Transformers from DSO API.',
      entities: 15,
      relationships: 30
    },
    {
      time: 'June 6, 11:00 PM',
      type: 'WARN',
      message: '3 Buildings from GIS data missing construction year.',
      entities: 3,
      relationships: 0
    },
    {
      time: 'June 6, 10:30 PM',
      type: 'INFO',
      message: 'Completed semantic mapping for 250 new building entities.',
      entities: 250,
      relationships: 500
    }
  ];

  const graphMetrics = {
    nodes: 1567,
    edges: 3266,
    clusters: 12,
    avgDegree: 4.2,
    density: 0.0013,
    diameter: 8
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'partial':
        return 'text-yellow-600';
      default:
        return 'text-gray-500';
    }
  };

  const toggleDetails = (sourceId: string) => {
    setShowDetails(prev => ({ ...prev, [sourceId]: !prev[sourceId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Knowledge Graph Management: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/grid-impact-analysis" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KG Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="KG Status"
            value="Operational"
            icon="Database"
            color="#10b981"
            subtitle="Up-to-date"
          />
          <KPICard
            title="Total Entities"
            value={kgStatus.totalEntities.toLocaleString()}
            icon="Building2"
            color="#3b82f6"
            subtitle="Buildings, assets, relationships"
          />
          <KPICard
            title="Graph Density"
            value={`${(graphMetrics.density * 100).toFixed(2)}%`}
            icon="Network"
            color="#8b5cf6"
            subtitle={`${graphMetrics.edges} connections`}
          />
          <KPICard
            title="Data Completeness"
            value={`${kgStatus.completeness}%`}
            icon="CheckCircle"
            color="#eab308"
            subtitle="Weighted average"
          />
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'visualization', name: 'Graph Visualization', icon: Network },
                { id: 'pipeline', name: 'Data Pipeline', icon: Database },
                { id: 'analytics', name: 'Graph Analytics', icon: BarChart3 },
                { id: 'management', name: 'Management', icon: RefreshCw }
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
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Graph Visualization Tab */}
            {activeTab === 'visualization' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Interactive Knowledge Graph</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{graphMetrics.nodes} nodes</span>
                    <span>{graphMetrics.edges} edges</span>
                    <span>{graphMetrics.clusters} clusters</span>
                  </div>
                </div>
                
                <GraphVisualization width={800} height={600} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Graph Statistics</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <div>Average Degree: {graphMetrics.avgDegree}</div>
                      <div>Graph Diameter: {graphMetrics.diameter}</div>
                      <div>Clustering Coefficient: 0.34</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Connectivity</h4>
                    <div className="space-y-1 text-sm text-green-800">
                      <div>Connected Components: 1</div>
                      <div>Strongly Connected: Yes</div>
                      <div>Bridge Edges: 12</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Communities</h4>
                    <div className="space-y-1 text-sm text-purple-800">
                      <div>Detected Communities: {graphMetrics.clusters}</div>
                      <div>Modularity Score: 0.67</div>
                      <div>Largest Community: 234 nodes</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Pipeline Tab */}
            {activeTab === 'pipeline' && (
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-gray-900">Data Ingestion Pipeline</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Input Sources */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <span>Input Sources</span>
                    </h4>
                    
                    <div className="space-y-3">
                      {dataSources.map((source) => (
                        <div key={source.id} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(source.status)}
                              <span className="font-medium text-gray-900 text-sm">{source.name}</span>
                            </div>
                            <button
                              onClick={() => toggleDetails(source.id)}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-xs text-gray-600">
                            <p>{source.description}</p>
                            <p className="mt-1">Last: {source.lastProcessed}</p>
                            <div className="flex justify-between mt-1">
                              <span>{source.entities} entities</span>
                              <span>{source.relationships} relationships</span>
                            </div>
                          </div>
                          
                          {showDetails[source.id] && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                              <p><strong>Type:</strong> {source.type}</p>
                              <p><strong>Source:</strong> {source.source}</p>
                              <p><strong>Status:</strong> <span className={getStatusColor(source.status)}>{source.status}</span></p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Processing Steps */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                      <RefreshCw className="h-5 w-5 text-blue-600" />
                      <span>Processing Steps</span>
                    </h4>
                    
                    <div className="space-y-3">
                      {processingSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{step.name}</div>
                            <div className="text-xs text-gray-600">{step.processed}</div>
                          </div>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Output */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                      <Layers className="h-5 w-5 text-blue-600" />
                      <span>Knowledge Graph Output</span>
                    </h4>
                    
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Database className="h-12 w-12 text-blue-600" />
                      </div>
                      <h5 className="font-medium text-gray-900 mb-2">District KG for '{state.selectedDistrict?.name}'</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{kgStatus.totalEntities.toLocaleString()} total entities</div>
                        <div>{kgStatus.relationshipTypes} relationship types</div>
                        <div>Last updated: {kgStatus.lastUpdate}</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm underline mt-2">
                        View KG Schema/Ontology
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Graph Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Graph Analytics & Insights</h3>
                
                {/* Entity Distribution */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Entity Distribution</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {entityTypes.map((entity) => (
                      <div key={entity.type} className="text-center p-4 border border-gray-200 rounded-lg">
                        <div 
                          className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                          style={{ backgroundColor: `${entity.color}20` }}
                        >
                          <div 
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: entity.color }}
                          />
                        </div>
                        <div className="font-semibold text-gray-900">{entity.count}</div>
                        <div className="text-sm text-gray-600">{entity.type}</div>
                        <div className="text-xs text-gray-500">{entity.relationships} connections</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Centrality Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Most Connected Nodes</h4>
                    <div className="space-y-2">
                      {[
                        { id: 'T-001', type: 'Transformer', degree: 45, centrality: 0.89 },
                        { id: 'S-North', type: 'Substation', degree: 38, centrality: 0.76 },
                        { id: 'CB-007', type: 'Commercial Building', degree: 24, centrality: 0.65 },
                        { id: 'PV-Hub-1', type: 'Solar Farm', degree: 18, centrality: 0.54 },
                        { id: 'BS-001', type: 'Battery Storage', degree: 15, centrality: 0.48 }
                      ].map((node, index) => (
                        <div key={node.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm">{node.id}</div>
                            <div className="text-xs text-gray-600">{node.type}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{node.degree} connections</div>
                            <div className="text-xs text-gray-600">Centrality: {node.centrality}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Community Detection</h4>
                    <div className="space-y-2">
                      {[
                        { id: 'Residential North', nodes: 234, density: 0.67, color: '#3b82f6' },
                        { id: 'Commercial Center', nodes: 156, density: 0.54, color: '#10b981' },
                        { id: 'Industrial Zone', nodes: 89, density: 0.43, color: '#f97316' },
                        { id: 'Mixed Development', nodes: 178, density: 0.38, color: '#8b5cf6' }
                      ].map((community, index) => (
                        <div key={community.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: community.color }}
                            />
                            <div>
                              <div className="font-medium text-sm">{community.id}</div>
                              <div className="text-xs text-gray-600">{community.nodes} nodes</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">Density: {community.density}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Management Tab */}
            {activeTab === 'management' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Knowledge Graph Management</h3>
                
                {/* Quality Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">KG Health & Quality Metrics</h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Data Completeness</span>
                        <span className="font-semibold text-green-600">{kgStatus.completeness}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${kgStatus.completeness}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Consistency Checks Passed</span>
                        <span className="font-semibold text-green-600">{kgStatus.consistencyChecks}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${kgStatus.consistencyChecks}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Recent Activity Log</h4>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {activityLog.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 text-sm">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.type === 'INFO' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {activity.type}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{activity.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{activity.time}</span>
                              <span>{activity.entities} entities</span>
                              <span>{activity.relationships} relationships</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
              Force Re-sync All Data Sources
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Export Graph Data (GraphML)
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Run Graph Analytics
            </button>
          </div>
          
          <button
            onClick={() => navigate('/gnn-analysis')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Proceed to GNN Analysis
          </button>
        </div>
      </main>
    </div>
  );
}