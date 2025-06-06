import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Building2 } from 'lucide-react';
import { useAppContext, districts } from '../context/AppContext';
import Header from '../components/Header';
import DistrictMap from '../components/DistrictMap';

export default function DistrictSelection() {
  const navigate = useNavigate();
  const { state, setSelectedDistrict } = useAppContext();
  const [selectedDistrict, setLocalSelectedDistrict] = useState(state.selectedDistrict);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    district.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDistrictSelect = (district: any) => {
    setLocalSelectedDistrict(district);
  };

  const handleLoadDistrict = () => {
    if (selectedDistrict) {
      setSelectedDistrict(selectedDistrict);
      navigate('/data-overview');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Step 1: Select Your District" showBack backTo="/" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interactive District Map</h2>
              <DistrictMap
                districts={districts}
                selectedDistrict={selectedDistrict}
                onDistrictSelect={handleDistrictSelect}
              />
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by district name or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* District List and Details */}
          <div className="space-y-6">
            {/* District List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Districts</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredDistricts.map((district) => (
                  <div
                    key={district.id}
                    onClick={() => handleDistrictSelect(district)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                      ${selectedDistrict?.id === district.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{district.name}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{district.region}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4" />
                            <span>~{district.buildings.toLocaleString()} buildings</span>
                          </span>
                        </div>
                      </div>
                      {selectedDistrict?.id === district.id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* District Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">District Information</h3>
              
              {selectedDistrict ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">{selectedDistrict.name}</h4>
                    <p className="text-gray-600">{selectedDistrict.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Region</div>
                      <div className="font-semibold text-gray-900">{selectedDistrict.region}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Buildings</div>
                      <div className="font-semibold text-gray-900">~{selectedDistrict.buildings.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLoadDistrict}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Load District Data & View Overview
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 italic">Select a district to see details</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}