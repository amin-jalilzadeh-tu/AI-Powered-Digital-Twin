import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, HelpCircle, Leaf, X, ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { useAppContext, roles } from '../context/AppContext';
import RoleCard from '../components/RoleCard';
import InfoModal from '../components/InfoModal';

export default function HomePage() {
  const navigate = useNavigate();
  const { state, setSelectedRole } = useAppContext();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role);
  };

  const handleStartNewProject = () => {
    if (!state.selectedRole) {
      alert('Please select your role first to tailor your experience.');
      return;
    }
    navigate('/district-selection');
  };

  const mockProjects = [
    { id: 1, name: 'North District - 2040 Electrification Plan', lastSaved: '2 days ago', status: 'completed' },
    { id: 2, name: 'City Center - Retrofit Initiative', lastSaved: '1 week ago', status: 'in-progress' },
    { id: 3, name: 'Industrial Park - PED Feasibility', lastSaved: '1 month ago', status: 'draft' }
  ];

  const handleLoadProject = (projectId: number) => {
    // Simulate loading different project states
    if (projectId === 1) {
      navigate('/scenario-comparison'); // Completed project
    } else if (projectId === 2) {
      navigate('/intervention-selection'); // In-progress project
    } else {
      navigate('/scenario-configuration'); // Draft project
    }
    setShowLoadModal(false);
  };

  // Theme configuration based on selected role
  const getThemeConfig = () => {
    if (!state.selectedRole) {
      return {
        background: 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
        primaryColor: '#6B7280',
        secondaryColor: '#9CA3AF',
        accentColor: '#3B82F6',
        backgroundImage: null,
        textGradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
        cardBackground: 'bg-white/80',
        featureBackground: 'bg-white/80',
        overlayOpacity: 'bg-black/0'
      };
    }

    const themeConfigs = {
      'grid-operator': {
        background: 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900',
        primaryColor: state.selectedRole.colors.primary,
        secondaryColor: state.selectedRole.colors.secondary,
        accentColor: state.selectedRole.colors.accent,
        backgroundImage: 'url("https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        textGradient: 'bg-gradient-to-r from-blue-300 to-cyan-300',
        cardBackground: 'bg-white/95 backdrop-blur-sm',
        featureBackground: 'bg-blue-100/90 backdrop-blur-sm',
        overlayOpacity: 'bg-blue-900/40'
      },
      'urban-planner': {
        background: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900',
        primaryColor: state.selectedRole.colors.primary,
        secondaryColor: state.selectedRole.colors.secondary,
        accentColor: state.selectedRole.colors.accent,
        backgroundImage: 'url("https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        textGradient: 'bg-gradient-to-r from-green-300 to-emerald-300',
        cardBackground: 'bg-white/95 backdrop-blur-sm',
        featureBackground: 'bg-green-100/90 backdrop-blur-sm',
        overlayOpacity: 'bg-green-900/40'
      },
      'policy-maker': {
        background: 'bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900',
        primaryColor: state.selectedRole.colors.primary,
        secondaryColor: state.selectedRole.colors.secondary,
        accentColor: state.selectedRole.colors.accent,
        backgroundImage: 'url("https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        textGradient: 'bg-gradient-to-r from-purple-300 to-pink-300',
        cardBackground: 'bg-white/95 backdrop-blur-sm',
        featureBackground: 'bg-purple-100/90 backdrop-blur-sm',
        overlayOpacity: 'bg-purple-900/40'
      },
      'building-expert': {
        background: 'bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900',
        primaryColor: state.selectedRole.colors.primary,
        secondaryColor: state.selectedRole.colors.secondary,
        accentColor: state.selectedRole.colors.accent,
        backgroundImage: 'url("https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        textGradient: 'bg-gradient-to-r from-orange-300 to-yellow-300',
        cardBackground: 'bg-white/95 backdrop-blur-sm',
        featureBackground: 'bg-orange-100/90 backdrop-blur-sm',
        overlayOpacity: 'bg-orange-900/40'
      },
      'building-owner': {
        background: 'bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900',
        primaryColor: state.selectedRole.colors.primary,
        secondaryColor: state.selectedRole.colors.secondary,
        accentColor: state.selectedRole.colors.accent,
        backgroundImage: 'url("https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        textGradient: 'bg-gradient-to-r from-teal-300 to-cyan-300',
        cardBackground: 'bg-white/95 backdrop-blur-sm',
        featureBackground: 'bg-teal-100/90 backdrop-blur-sm',
        overlayOpacity: 'bg-teal-900/40'
      },
      'general-user': {
        background: 'bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900',
        primaryColor: state.selectedRole.colors.primary,
        secondaryColor: state.selectedRole.colors.secondary,
        accentColor: state.selectedRole.colors.accent,
        backgroundImage: 'url("https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        textGradient: 'bg-gradient-to-r from-gray-300 to-slate-300',
        cardBackground: 'bg-white/95 backdrop-blur-sm',
        featureBackground: 'bg-gray-100/90 backdrop-blur-sm',
        overlayOpacity: 'bg-gray-900/40'
      }
    };

    return themeConfigs[state.selectedRole.id as keyof typeof themeConfigs] || themeConfigs['general-user'];
  };

  const theme = getThemeConfig();

  return (
    <div className={`min-h-screen ${theme.background} transition-all duration-1000 ease-in-out`}>
      {/* Background Image with Overlay */}
      {theme.backgroundImage && (
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: theme.backgroundImage }}
        >
          <div className={`absolute inset-0 ${theme.overlayOpacity} transition-all duration-1000`} />
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.primaryColor} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${theme.primaryColor} 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div 
                className="p-4 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Leaf className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-700 ${
              state.selectedRole ? 'text-white' : 'text-gray-900'
            }`}>
              Energy District
              <span 
                className={`block ${theme.textGradient} bg-clip-text text-transparent transition-all duration-700`}
              >
                Planner AI
              </span>
            </h1>
            
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
              state.selectedRole ? 'text-white/90' : 'text-gray-600'
            }`}>
              Leverage cutting-edge AI and Digital Twins to design sustainable, 
              resilient energy districts with data-driven insights and automated optimization.
            </p>

            {/* Enhanced Key Features */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: Brain, label: 'AI-Powered Planning', description: 'Advanced machine learning algorithms' },
                { icon: Zap, label: 'Real-time Analysis', description: 'Live data processing and insights' },
                { icon: Sparkles, label: 'Smart Optimization', description: 'Automated scenario generation' }
              ].map((feature, index) => (
                <div key={index} className={`flex items-center space-x-3 px-6 py-3 ${theme.featureBackground} backdrop-blur-sm rounded-full border transition-all duration-500 hover:scale-105 ${
                  state.selectedRole ? 'border-white/20' : 'border-gray-200'
                }`}>
                  <feature.icon className="h-5 w-5" style={{ color: theme.primaryColor }} />
                  <div className="text-left">
                    <div className={`text-sm font-medium ${state.selectedRole ? 'text-gray-800' : 'text-gray-700'}`}>
                      {feature.label}
                    </div>
                    <div className={`text-xs ${state.selectedRole ? 'text-gray-600' : 'text-gray-500'}`}>
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 transition-all duration-700 ${
                state.selectedRole ? 'text-white' : 'text-gray-900'
              }`}>
                Choose Your Perspective
              </h2>
              <p className={`text-lg max-w-2xl mx-auto transition-all duration-700 ${
                state.selectedRole ? 'text-white/80' : 'text-gray-600'
              }`}>
                Select your role to personalize the interface and unlock tailored insights for your specific needs.
              </p>
              
              {state.selectedRole && (
                <div className="mt-6 inline-flex items-center space-x-3 px-8 py-4 rounded-full shadow-lg border transition-all duration-500 transform hover:scale-105"
                     style={{ 
                       backgroundColor: `${theme.primaryColor}20`, 
                       borderColor: `${theme.primaryColor}40`,
                       backdropFilter: 'blur(10px)'
                     }}>
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: theme.primaryColor }} />
                  <span className="font-semibold text-white text-lg">
                    Active Role: {state.selectedRole.name}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primaryColor }}>
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {roles.map((role) => (
                <div key={role.id} className="transform transition-all duration-500 hover:scale-105">
                  <RoleCard
                    role={role}
                    isSelected={state.selectedRole?.id === role.id}
                    onClick={handleRoleSelect}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Start New Project */}
            <div 
              onClick={handleStartNewProject}
              className={`group cursor-pointer ${theme.cardBackground} backdrop-blur-sm rounded-3xl p-8 shadow-xl border hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ${
                !state.selectedRole ? 'opacity-60' : ''
              } ${state.selectedRole ? 'border-white/20' : 'border-gray-100'}`}
            >
              <div className="text-center">
                <div 
                  className="mx-auto mb-6 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Plus className="h-10 w-10 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-800' : 'text-gray-900'
                }`}>
                  Start New Project
                </h3>
                <p className={`mb-4 leading-relaxed transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  Begin a new energy district planning session with AI-powered insights and optimization.
                </p>
                
                {!state.selectedRole ? (
                  <p className="text-sm text-orange-600 font-medium">Please select your role first</p>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300"
                       style={{ color: theme.primaryColor }}>
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Load Existing Project */}
            <div 
              onClick={() => setShowLoadModal(true)}
              className={`group cursor-pointer ${theme.cardBackground} backdrop-blur-sm rounded-3xl p-8 shadow-xl border hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ${
                state.selectedRole ? 'border-white/20' : 'border-gray-100'
              }`}
            >
              <div className="text-center">
                <div className="mx-auto mb-6 p-6 rounded-2xl bg-slate-600 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <FolderOpen className="h-10 w-10 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-800' : 'text-gray-900'
                }`}>
                  Load Project
                </h3>
                <p className={`mb-4 leading-relaxed transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  Continue working on a previously saved planning project and build upon your progress.
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-sm font-medium text-slate-600 group-hover:translate-x-1 transition-transform duration-300">
                  <span>Browse Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Learn About Digital Twins */}
            <div 
              onClick={() => setShowInfoModal(true)}
              className={`group cursor-pointer ${theme.cardBackground} backdrop-blur-sm rounded-3xl p-8 shadow-xl border hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ${
                state.selectedRole ? 'border-white/20' : 'border-gray-100'
              }`}
            >
              <div className="text-center">
                <div className="mx-auto mb-6 p-6 rounded-2xl bg-blue-600 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <HelpCircle className="h-10 w-10 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-800' : 'text-gray-900'
                }`}>
                  Digital Twin Guide
                </h3>
                <p className={`mb-4 leading-relaxed transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  Learn about digital twins and their transformative role in modern energy planning.
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className={`${theme.cardBackground} backdrop-blur-sm border-t mt-20 transition-all duration-700 ${
        state.selectedRole ? 'border-white/20' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="p-2 rounded-lg transition-all duration-500"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className={`font-bold transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-800' : 'text-gray-900'
                }`}>
                  Energy District Planner AI
                </span>
              </div>
              <p className={`text-sm leading-relaxed transition-all duration-500 ${
                state.selectedRole ? 'text-gray-600' : 'text-gray-600'
              }`}>
                Empowering sustainable energy planning through advanced AI and digital twin technology.
              </p>
            </div>
            
            {[
              { title: 'Platform', links: ['About', 'Features', 'Pricing'] },
              { title: 'Resources', links: ['Documentation', 'Tutorials', 'API'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Community'] }
            ].map((section, index) => (
              <div key={index}>
                <h4 className={`font-semibold mb-3 transition-all duration-500 ${
                  state.selectedRole ? 'text-gray-800' : 'text-gray-900'
                }`}>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className={`text-sm transition-colors hover:opacity-80 ${
                        state.selectedRole ? 'text-gray-600 hover:text-gray-800' : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className={`border-t mt-8 pt-8 text-center text-sm transition-all duration-700 ${
            state.selectedRole ? 'border-white/20 text-gray-600' : 'border-gray-200 text-gray-500'
          }`}>
            © 2025 Energy District Planner AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="What is a Digital Twin?"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Digital Twin Definition</h3>
            <p className="text-blue-800">
              A Digital Twin is a virtual replica of a physical asset, process, or system that uses real-world data 
              to simulate, predict, and optimize performance in real-time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Key Benefits for Energy Planning:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Risk-Free Testing', desc: 'Test scenarios without real-world risk or cost' },
                { title: 'Data-Driven Decisions', desc: 'Make informed choices for retrofits and upgrades' },
                { title: 'Real-Time Insights', desc: 'Monitor and predict system behavior using live data' },
                { title: 'Stakeholder Collaboration', desc: 'Enable visualization of complex energy systems' },
                { title: 'AI Integration', desc: 'Combine with ML for automated optimization' },
                { title: 'Future Planning', desc: 'Model long-term scenarios and impacts' }
              ].map((benefit, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">{benefit.title}</h5>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">In This Platform:</h4>
            <p className="text-green-800 text-sm">
              Our Digital Twin integrates building energy models, grid infrastructure data, and real-time sensors 
              to create a comprehensive virtual representation of your energy district. This enables advanced AI 
              analysis and optimization for sustainable energy planning.
            </p>
          </div>
        </div>
      </InfoModal>

      {/* Load Project Modal */}
      <InfoModal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        title="Load Project"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{project.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status === 'completed' ? 'Completed' :
                     project.status === 'in-progress' ? 'In Progress' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Last saved: {project.lastSaved}</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleLoadProject(project.id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Open
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          
          {mockProjects.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No saved projects found</p>
              <button
                onClick={() => {
                  setShowLoadModal(false);
                  handleStartNewProject();
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Your First Project
              </button>
            </div>
          )}
        </div>
      </InfoModal>
    </div>
  );
}