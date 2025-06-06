import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageSquare, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Send, Mic, MicOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function AIInsights() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your AI assistant for energy district planning. I can help you analyze data, identify patterns, and provide recommendations. What would you like to explore?",
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'pattern',
      title: 'Peak Demand Pattern Detected',
      description: 'AI has identified a 15% increase in evening peak demand in residential zones. This correlates with increased EV charging.',
      confidence: 92,
      impact: 'high',
      recommendation: 'Consider implementing time-of-use pricing or smart charging schedules.',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Solar Generation Anomaly',
      description: 'Unusual drop in solar generation detected in Zone C despite clear weather conditions.',
      confidence: 87,
      impact: 'medium',
      recommendation: 'Investigate potential equipment issues or shading problems in Zone C solar installations.',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      type: 'optimization',
      title: 'Battery Storage Optimization Opportunity',
      description: 'Current battery dispatch strategy could be improved by 12% through predictive charging based on weather forecasts.',
      confidence: 95,
      impact: 'medium',
      recommendation: 'Implement weather-based predictive charging algorithm for battery systems.',
      timestamp: new Date(Date.now() - 10800000)
    }
  ]);

  const [suggestions, setSuggestions] = useState([
    "What are the main energy efficiency opportunities in my district?",
    "How can I reduce peak demand during winter months?",
    "What's the optimal battery storage capacity for this district?",
    "Show me the correlation between weather and energy consumption",
    "Identify buildings with the highest retrofit potential"
  ]);

  const patternData = [
    { hour: 0, baseline: 1.2, predicted: 1.1, actual: 1.15 },
    { hour: 6, baseline: 1.8, predicted: 1.9, actual: 1.85 },
    { hour: 12, baseline: 2.1, predicted: 2.3, actual: 2.25 },
    { hour: 18, baseline: 2.8, predicted: 3.2, actual: 3.1 },
    { hour: 24, baseline: 1.5, predicted: 1.4, actual: 1.45 }
  ];

  const anomalyData = [
    { day: 'Mon', expected: 85, actual: 82, threshold: 80 },
    { day: 'Tue', expected: 88, actual: 85, threshold: 80 },
    { day: 'Wed', expected: 90, actual: 65, threshold: 80 },
    { day: 'Thu', expected: 87, actual: 84, threshold: 80 },
    { day: 'Fri', expected: 89, actual: 86, threshold: 80 }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'ai',
        message: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (message: string) => {
    const responses = {
      efficiency: "Based on your district data, I've identified three key efficiency opportunities: 1) Retrofit 45 pre-1980 buildings (potential 30% energy savings), 2) Optimize HVAC schedules in commercial buildings (15% savings), 3) Implement smart lighting systems (8% savings). Total potential: 2.1 GWh annual savings.",
      peak: "To reduce winter peak demand, I recommend: 1) Implement demand response programs for electric heating (20% reduction potential), 2) Install thermal storage systems in large buildings, 3) Promote heat pump adoption with smart controls. These measures could reduce peak demand by 0.8 MW.",
      battery: "Optimal battery capacity for your district is 2.5 MWh based on: load profile analysis, solar generation patterns, and grid constraints. This would provide 4 hours of backup power and enable 85% renewable energy utilization.",
      weather: "Strong correlation detected: 1°C temperature drop increases heating demand by 12%. Solar generation varies by 40% between seasons. Wind patterns affect 15% of buildings. I recommend weather-predictive control systems.",
      retrofit: "Top retrofit candidates identified: Buildings constructed before 1980 with >200 MWh annual consumption. Priority list: Building NB-0112 (ROI: 8.2 years), Building CB-007 (ROI: 6.8 years), Building NB-0345 (ROI: 7.1 years)."
    };

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('efficiency')) return responses.efficiency;
    if (lowerMessage.includes('peak') || lowerMessage.includes('winter')) return responses.peak;
    if (lowerMessage.includes('battery') || lowerMessage.includes('storage')) return responses.battery;
    if (lowerMessage.includes('weather') || lowerMessage.includes('correlation')) return responses.weather;
    if (lowerMessage.includes('retrofit') || lowerMessage.includes('building')) return responses.retrofit;

    return "I can help you analyze energy patterns, identify optimization opportunities, and provide data-driven recommendations. Try asking about energy efficiency, peak demand reduction, or building retrofits.";
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return TrendingUp;
      case 'anomaly': return AlertTriangle;
      case 'optimization': return Lightbulb;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'pattern': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'anomaly': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'optimization': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-purple-600 bg-purple-50 border-purple-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`AI Insights & Natural Language Interface: ${state.selectedDistrict?.name || 'District'}`} 
        showBack 
        backTo="/real-time-dashboard" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Chat with Your Data</h3>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your energy district..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Suggestions */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pattern Recognition Visualization */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Pattern Recognition</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patternData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeWidth={2} name="Historical Baseline" />
                  <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} name="AI Prediction" />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Anomaly Detection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Anomaly Detection</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="expected" fill="#94a3b8" name="Expected" />
                  <Bar dataKey="actual" fill="#ef4444" name="Actual" />
                  <Line type="monotone" dataKey="threshold" stroke="#f59e0b" strokeWidth={2} name="Alert Threshold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="space-y-6">
            {/* Automated Insights */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Insights</h3>
              
              <div className="space-y-4">
                {insights.map((insight) => {
                  const IconComponent = getInsightIcon(insight.type);
                  return (
                    <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">{insight.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                              {insight.impact}
                            </span>
                          </div>
                          <p className="text-sm opacity-90 mb-2">{insight.description}</p>
                          <p className="text-xs font-medium mb-2">Recommendation: {insight.recommendation}</p>
                          <div className="flex items-center justify-between text-xs opacity-75">
                            <span>Confidence: {insight.confidence}%</span>
                            <span>{insight.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Suggestions</h3>
              
              <div className="space-y-3">
                {[
                  { action: 'Optimize Battery Schedule', impact: '+12% efficiency', priority: 'high' },
                  { action: 'Implement DR Program', impact: '-0.8 MW peak', priority: 'medium' },
                  { action: 'Upgrade Building Controls', impact: '-15% consumption', priority: 'medium' },
                  { action: 'Add EV Smart Charging', impact: '+5% grid stability', priority: 'low' }
                ].map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{suggestion.action}</p>
                      <p className="text-xs text-gray-600">{suggestion.impact}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {suggestion.priority}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Model Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Status</h3>
              
              <div className="space-y-3">
                {[
                  { model: 'Pattern Recognition', status: 'active', accuracy: 94 },
                  { model: 'Anomaly Detection', status: 'active', accuracy: 87 },
                  { model: 'Demand Forecasting', status: 'training', accuracy: 91 },
                  { model: 'Optimization Engine', status: 'active', accuracy: 96 }
                ].map((model, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{model.model}</p>
                      <p className="text-xs text-gray-600">Accuracy: {model.accuracy}%</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        model.status === 'active' ? 'bg-green-500' : 
                        model.status === 'training' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-xs text-gray-600 capitalize">{model.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}