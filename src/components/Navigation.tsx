import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  BarChart3, 
  Search, 
  Settings, 
  Play, 
  Zap, 
  Database, 
  Brain, 
  GitBranch, 
  BarChart, 
  FileText, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const navigationItems = [
  { id: 'home', path: '/', icon: Home, label: 'Home' },
  { id: 'district-selection', path: '/district-selection', icon: MapPin, label: 'District Selection' },
  { id: 'data-overview', path: '/data-overview', icon: BarChart3, label: 'Data Overview' },
  { id: 'detailed-exploration', path: '/detailed-exploration', icon: Search, label: 'Detailed Exploration' },
  { id: 'scenario-configuration', path: '/scenario-configuration', icon: Settings, label: 'Scenario Config' },
  { id: 'intervention-selection', path: '/intervention-selection', icon: GitBranch, label: 'Interventions' },
  { id: 'simulation-progress', path: '/simulation-progress', icon: Play, label: 'Simulation' },
  { id: 'grid-impact-analysis', path: '/grid-impact-analysis', icon: Zap, label: 'Grid Impact' },
  { id: 'knowledge-graph', path: '/knowledge-graph', icon: Database, label: 'Knowledge Graph' },
  { id: 'gnn-analysis', path: '/gnn-analysis', icon: Brain, label: 'GNN Analysis' },
  { id: 'rl-planning', path: '/rl-planning', icon: Brain, label: 'RL Planning' },
  { id: 'scenario-comparison', path: '/scenario-comparison', icon: BarChart, label: 'Comparison' },
  { id: 'export-reports', path: '/export-reports', icon: FileText, label: 'Export Reports' },
  { id: 'stakeholder-feedback', path: '/stakeholder-feedback', icon: MessageSquare, label: 'Feedback' }
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAppContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const currentPath = location.pathname;
  const themeColor = state.selectedRole?.colors.primary || '#6B7280';

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        style={{ backgroundColor: isMobileOpen ? themeColor : 'white' }}
      >
        {isMobileOpen ? (
          <X className={`h-6 w-6 ${isMobileOpen ? 'text-white' : 'text-gray-600'}`} />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav 
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: themeColor }}
                >
                  <span className="text-white font-bold text-sm">EDP</span>
                </div>
                <span className="font-semibold text-gray-900 text-sm">Energy Planner</span>
              </div>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Role Indicator */}
        {state.selectedRole && !isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: themeColor }}
              />
              <span className="text-xs text-gray-600">{state.selectedRole.name}</span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                    ${active 
                      ? 'text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  style={{
                    backgroundColor: active ? themeColor : 'transparent'
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current District Info */}
        {state.selectedDistrict && !isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Current District</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {state.selectedDistrict.name}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Spacer */}
      <div className={`${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`} />
    </>
  );
}