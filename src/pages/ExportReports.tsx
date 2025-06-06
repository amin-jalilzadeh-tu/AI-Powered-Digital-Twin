import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Mail, Calendar, User, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function ExportReports() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [reportConfig, setReportConfig] = useState({
    selectedScenario: 'current-comparison',
    title: 'Energy District Planning Report',
    preparedBy: '',
    organization: '',
    sections: {
      executiveSummary: true,
      districtOverview: true,
      scenarioDetails: true,
      interventionPlan: true,
      gridImpactAnalysis: true,
      costBenefitAnalysis: true,
      environmentalImpact: true,
      implementationTimeline: true,
      riskAssessment: true,
      recommendations: true,
      appendices: false
    },
    customNotes: '',
    format: 'pdf',
    includeVisualizations: true,
    includeDataTables: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const availableScenarios = [
    { id: 'current-comparison', name: 'Current Scenario Comparison View', type: 'comparison' },
    { id: 'manual-high-ambition', name: 'High Ambition 2050 (Manual)', type: 'manual' },
    { id: 'rl-balanced', name: 'RL Roadmap A (Balanced)', type: 'ai' },
    { id: 'rl-aggressive', name: 'RL Roadmap B (Aggressive CO₂)', type: 'ai' },
    { id: 'rl-cost', name: 'RL Roadmap C (Cost Optimized)', type: 'ai' },
    { id: 'gnn-energy-communities', name: 'GNN Analysis: Energy Communities', type: 'analysis' }
  ];

  const sectionDescriptions = {
    executiveSummary: 'High-level overview and key findings',
    districtOverview: 'Current state and baseline characteristics',
    scenarioDetails: 'Detailed scenario configuration and assumptions',
    interventionPlan: 'Phased intervention timeline and specifications',
    gridImpactAnalysis: 'Grid reliability and capacity analysis',
    costBenefitAnalysis: 'Financial analysis and ROI calculations',
    environmentalImpact: 'CO₂ emissions and sustainability metrics',
    implementationTimeline: 'Detailed project implementation schedule',
    riskAssessment: 'Technical, financial, and regulatory risks',
    recommendations: 'Strategic recommendations and next steps',
    appendices: 'Technical specifications and detailed data tables'
  };

  const handleConfigChange = (field: string, value: any) => {
    setReportConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionToggle = (section: string) => {
    setReportConfig(prev => ({
      ...prev,
      sections: { ...prev.sections, [section]: !prev.sections[section] }
    }));
  };

  const generateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = Math.min(prev + 10, 100);
        if (newProgress >= 100) {
          setIsGenerating(false);
          clearInterval(interval);
          // Simulate download
          const link = document.createElement('a');
          link.href = '#'; // In real implementation, this would be the generated file URL
          link.download = `${reportConfig.title.replace(/\s+/g, '_')}.${reportConfig.format}`;
          document.body.appendChild(link);
          document.body.removeChild(link);
        }
        return newProgress;
      });
    }, 500);
  };

  const selectedScenario = availableScenarios.find(s => s.id === reportConfig.selectedScenario);
  const selectedSectionsCount = Object.values(reportConfig.sections).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Export Reports & Documentation" 
        showBack 
        backTo="/scenario-comparison" 
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Report Configuration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Report Configuration</h3>
              </div>

              <div className="space-y-6">
                {/* Scenario Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Scenario/Roadmap for Report
                  </label>
                  <select
                    value={reportConfig.selectedScenario}
                    onChange={(e) => handleConfigChange('selectedScenario', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availableScenarios.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </option>
                    ))}
                  </select>
                  {selectedScenario && (
                    <p className="mt-1 text-xs text-gray-500">
                      Type: {selectedScenario.type === 'ai' ? 'AI Generated' : 
                             selectedScenario.type === 'manual' ? 'Manual Scenario' :
                             selectedScenario.type === 'analysis' ? 'Analysis Result' : 'Comparison'}
                    </p>
                  )}
                </div>

                {/* Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Title
                    </label>
                    <input
                      type="text"
                      value={reportConfig.title}
                      onChange={(e) => handleConfigChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prepared by
                    </label>
                    <input
                      type="text"
                      value={reportConfig.preparedBy}
                      onChange={(e) => handleConfigChange('preparedBy', e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={reportConfig.organization}
                    onChange={(e) => handleConfigChange('organization', e.target.value)}
                    placeholder="Your organization"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Sections to Include */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sections to Include ({selectedSectionsCount} selected)
              </h3>
              
              <div className="space-y-3">
                {Object.entries(sectionDescriptions).map(([key, description]) => (
                  <div key={key} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={key}
                      checked={reportConfig.sections[key as keyof typeof reportConfig.sections]}
                      onChange={() => handleSectionToggle(key)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label htmlFor={key} className="text-sm font-medium text-gray-900 cursor-pointer">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <p className="text-xs text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </label>
                  <div className="flex space-x-4">
                    {[
                      { value: 'pdf', label: 'PDF Document', icon: FileText },
                      { value: 'docx', label: 'Word Document', icon: FileText },
                      { value: 'html', label: 'Web Report', icon: FileText }
                    ].map((format) => (
                      <label key={format.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="format"
                          value={format.value}
                          checked={reportConfig.format === format.value}
                          onChange={(e) => handleConfigChange('format', e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <format.icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{format.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeVisualizations}
                      onChange={(e) => handleConfigChange('includeVisualizations', e.target.checked)}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Charts & Visualizations</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeDataTables}
                      onChange={(e) => handleConfigChange('includeDataTables', e.target.checked)}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Detailed Data Tables</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Notes & Comments</h3>
              <textarea
                value={reportConfig.customNotes}
                onChange={(e) => handleConfigChange('customNotes', e.target.value)}
                placeholder="Add any custom notes, context, or comments to include in the report..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Preview & Generation Panel */}
          <div className="space-y-6">
            {/* Report Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{reportConfig.title}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>District: {state.selectedDistrict?.name || 'Selected District'}</p>
                    <p>Scenario: {selectedScenario?.name}</p>
                    <p>Prepared by: {reportConfig.preparedBy || 'Not specified'}</p>
                    <p>Organization: {reportConfig.organization || 'Not specified'}</p>
                    <p>Generated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Content Overview</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• {selectedSectionsCount} sections selected</p>
                    <p>• {reportConfig.includeVisualizations ? 'Including' : 'Excluding'} visualizations</p>
                    <p>• {reportConfig.includeDataTables ? 'Including' : 'Excluding'} data tables</p>
                    <p>• Format: {reportConfig.format.toUpperCase()}</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h4 className="font-medium text-gray-900 mb-2">Estimated Report Length</h4>
                  <p className="text-sm text-gray-600">
                    {Math.round(selectedSectionsCount * 2.5 + (reportConfig.includeVisualizations ? 8 : 0) + (reportConfig.includeDataTables ? 5 : 0))} pages
                  </p>
                </div>
              </div>
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generating Report</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{generationProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    {generationProgress < 30 && 'Compiling scenario data...'}
                    {generationProgress >= 30 && generationProgress < 60 && 'Generating visualizations...'}
                    {generationProgress >= 60 && generationProgress < 90 && 'Formatting document...'}
                    {generationProgress >= 90 && 'Finalizing report...'}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={generateReport}
                  disabled={isGenerating || !reportConfig.title.trim()}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    isGenerating || !reportConfig.title.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>{isGenerating ? 'Generating...' : 'Generate & Download Report'}</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>Email Report</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Automated Reports</span>
                </button>
              </div>
            </div>

            {/* Status & Validation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Validation</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {reportConfig.title.trim() ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">Report title</span>
                </div>

                <div className="flex items-center space-x-2">
                  {selectedSectionsCount > 0 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">Content sections selected</span>
                </div>

                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Scenario data available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/scenario-comparison')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Back to Scenario Comparison
          </button>
          
          <button
            onClick={() => navigate('/stakeholder-feedback')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Provide Platform Feedback
          </button>
        </div>
      </main>
    </div>
  );
}