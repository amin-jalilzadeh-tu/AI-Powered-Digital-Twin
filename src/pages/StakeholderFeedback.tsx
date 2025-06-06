import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Star, Send, CheckCircle, AlertCircle, Lightbulb, Bug, HelpCircle, FileText, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function StakeholderFeedback() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    usabilityRating: 0,
    mostLiked: '',
    improvements: '',
    confusingParts: '',
    selectedScenario: '',
    clarityRating: 0,
    trustworthinessRating: 0,
    scenarioComments: '',
    featureRequests: '',
    bugDescription: '',
    bugLocation: '',
    bugSteps: '',
    contactInfo: '',
    role: state.selectedRole?.name || ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const availableScenarios = [
    'High Ambition 2050 (Manual)',
    'RL Roadmap A (Balanced)',
    'RL Roadmap B (Aggressive CO₂)',
    'RL Roadmap C (Cost Optimized)',
    'GNN Analysis: Energy Communities',
    'Current Scenario Comparison'
  ];

  const pageLocations = [
    'Home Screen',
    'District Selection',
    'Data Overview',
    'Detailed Data Exploration',
    'Scenario Configuration',
    'Intervention Selection',
    'Simulation Progress',
    'Grid Impact Analysis',
    'Knowledge Graph',
    'GNN Analysis',
    'RL Planning',
    'Scenario Comparison',
    'Export Reports'
  ];

  const handleRatingChange = (field: string, rating: number) => {
    setFeedback(prev => ({ ...prev, [field]: rating }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    
    // In real implementation, this would send to backend
    console.log('Feedback submitted:', feedback);
  };

  const StarRating = ({ rating, onRatingChange, label }: { rating: number; onRatingChange: (rating: number) => void; label: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 rounded transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {rating === 0 && 'Click to rate'}
        {rating === 1 && 'Poor'}
        {rating === 2 && 'Fair'}
        {rating === 3 && 'Good'}
        {rating === 4 && 'Very Good'}
        {rating === 5 && 'Excellent'}
      </p>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Feedback Submitted" />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Feedback!</h2>
            <p className="text-gray-600 mb-8">
              Your input is invaluable in helping us improve the Energy District Planner AI. 
              We'll review your feedback and consider it for future platform enhancements.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Return to Home
              </button>
              
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFeedback({
                    overallRating: 0,
                    usabilityRating: 0,
                    mostLiked: '',
                    improvements: '',
                    confusingParts: '',
                    selectedScenario: '',
                    clarityRating: 0,
                    trustworthinessRating: 0,
                    scenarioComments: '',
                    featureRequests: '',
                    bugDescription: '',
                    bugLocation: '',
                    bugSteps: '',
                    contactInfo: '',
                    role: state.selectedRole?.name || ''
                  });
                }}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Submit Additional Feedback
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Feedback & Platform Improvement" 
        showBack 
        backTo="/export-reports" 
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900">Help Us Improve the Energy District Planner AI!</h2>
              <p className="text-blue-700">Your feedback helps us make the platform more useful and user-friendly for energy planning professionals.</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'general', name: 'General Platform', icon: MessageSquare },
                { id: 'scenario', name: 'Scenario Feedback', icon: Star },
                { id: 'features', name: 'Feature Requests', icon: Lightbulb },
                { id: 'bugs', name: 'Bug Reports', icon: Bug }
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

          <form onSubmit={handleSubmit} className="p-6">
            {/* General Platform Feedback */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">General Platform Feedback</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StarRating
                    rating={feedback.overallRating}
                    onRatingChange={(rating) => handleRatingChange('overallRating', rating)}
                    label="Overall Platform Experience"
                  />
                  
                  <StarRating
                    rating={feedback.usabilityRating}
                    onRatingChange={(rating) => handleRatingChange('usabilityRating', rating)}
                    label="Platform Usability"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you like most about the platform?
                  </label>
                  <textarea
                    value={feedback.mostLiked}
                    onChange={(e) => handleInputChange('mostLiked', e.target.value)}
                    placeholder="e.g., The interactive map views, the scenario comparison dashboard, the AI-generated roadmaps..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What could be improved or is missing?
                  </label>
                  <textarea
                    value={feedback.improvements}
                    onChange={(e) => handleInputChange('improvements', e.target.value)}
                    placeholder="e.g., More detailed grid component models, faster simulation times, additional visualization types..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Were there any parts of the platform that were confusing or difficult to use?
                  </label>
                  <textarea
                    value={feedback.confusingParts}
                    onChange={(e) => handleInputChange('confusingParts', e.target.value)}
                    placeholder="Describe any confusing workflows, unclear labels, or difficult-to-find features..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Scenario-Specific Feedback */}
            {activeTab === 'scenario' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Feedback on Specific Scenario/Roadmap</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select a Scenario/Roadmap to provide feedback on (Optional)
                  </label>
                  <select
                    value={feedback.selectedScenario}
                    onChange={(e) => handleInputChange('selectedScenario', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a scenario...</option>
                    {availableScenarios.map((scenario) => (
                      <option key={scenario} value={scenario}>{scenario}</option>
                    ))}
                  </select>
                </div>

                {feedback.selectedScenario && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <StarRating
                        rating={feedback.clarityRating}
                        onRatingChange={(rating) => handleRatingChange('clarityRating', rating)}
                        label="Clarity of Results Presentation"
                      />
                      
                      <StarRating
                        rating={feedback.trustworthinessRating}
                        onRatingChange={(rating) => handleRatingChange('trustworthinessRating', rating)}
                        label="Trustworthiness/Plausibility"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specific comments or concerns about this plan/roadmap
                      </label>
                      <textarea
                        value={feedback.scenarioComments}
                        onChange={(e) => handleInputChange('scenarioComments', e.target.value)}
                        placeholder="e.g., The retrofit timeline seems too aggressive, the cost estimates appear low, the AI recommendations align well with our policy goals..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Feature Requests */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Feature Requests & Suggestions</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have any requests for new features or analyses?
                  </label>
                  <textarea
                    value={feedback.featureRequests}
                    onChange={(e) => handleInputChange('featureRequests', e.target.value)}
                    placeholder="e.g., Integration with more detailed building energy models, support for district heating networks, social equity analysis, real-time sensor data integration..."
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Popular Feature Requests</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Integration with building certification systems (BREEAM, LEED)</li>
                    <li>• Social equity and affordability analysis</li>
                    <li>• District heating/cooling network modeling</li>
                    <li>• Real-time IoT sensor data integration</li>
                    <li>• Climate change adaptation scenarios</li>
                    <li>• Detailed financial modeling with incentives</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bug Reports */}
            {activeTab === 'bugs' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Bug Reports</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief description of the issue
                  </label>
                  <input
                    type="text"
                    value={feedback.bugDescription}
                    onChange={(e) => handleInputChange('bugDescription', e.target.value)}
                    placeholder="e.g., Map doesn't load on Safari, Export button not working, Scenario comparison shows wrong data"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which page/module did this occur in?
                  </label>
                  <select
                    value={feedback.bugLocation}
                    onChange={(e) => handleInputChange('bugLocation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a page...</option>
                    {pageLocations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Steps to reproduce the issue (if possible)
                  </label>
                  <textarea
                    value={feedback.bugSteps}
                    onChange={(e) => handleInputChange('bugSteps', e.target.value)}
                    placeholder="1. Go to District Selection page&#10;2. Click on Northwood District&#10;3. Click Load District Data&#10;4. Nothing happens..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900">For urgent technical issues</h4>
                  </div>
                  <p className="text-sm text-yellow-800 mt-1">
                    If you're experiencing critical issues that prevent you from using the platform, 
                    please contact our support team directly at support@energyplanner.ai
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Contact Information (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={feedback.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="e.g., Urban Planner, Grid Operator, Policy Maker"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (for follow-up)
                  </label>
                  <input
                    type="email"
                    value={feedback.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your contact information will only be used to follow up on your feedback if needed.
              </p>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/export-reports')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to Export Reports
              </button>
              
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Send className="h-4 w-4" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Need More Help?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Live Chat Support</h4>
              <p className="text-gray-600">Get instant help with platform questions</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Documentation</h4>
              <p className="text-gray-600">Comprehensive user guides and tutorials</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Community Forum</h4>
              <p className="text-gray-600">Connect with other energy planning professionals</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}