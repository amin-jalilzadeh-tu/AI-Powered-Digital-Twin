import React from 'react';
import { MapPin } from 'lucide-react';
import { District } from '../context/AppContext';

interface DistrictMapProps {
  districts: District[];
  selectedDistrict: District | null;
  onDistrictSelect: (district: District) => void;
}

export default function DistrictMap({ districts, selectedDistrict, onDistrictSelect }: DistrictMapProps) {
  return (
    <div className="relative bg-gray-100 rounded-xl overflow-hidden h-96">
      {/* Simplified map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="absolute inset-0 opacity-20">
          {/* Grid pattern to simulate map */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* District markers */}
      {districts.map((district, index) => (
        <div
          key={district.id}
          className={`
            absolute cursor-pointer transition-all duration-300 hover:scale-110
            ${selectedDistrict?.id === district.id ? 'z-20' : 'z-10'}
          `}
          style={{
            left: `${20 + (index % 2) * 30 + (index * 15)}%`,
            top: `${25 + (index % 3) * 25}%`
          }}
          onClick={() => onDistrictSelect(district)}
        >
          <div 
            className={`
              relative p-3 rounded-full shadow-lg transition-all duration-300
              ${selectedDistrict?.id === district.id 
                ? 'bg-blue-600 text-white scale-125' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
              }
            `}
          >
            <MapPin className="h-6 w-6" />
            
            {/* District polygon simulation */}
            <div 
              className={`
                absolute inset-0 -m-8 rounded-lg border-2 opacity-30
                ${selectedDistrict?.id === district.id 
                  ? 'border-blue-600 bg-blue-100' 
                  : 'border-gray-300 hover:border-blue-400'
                }
              `}
              style={{
                width: `${60 + (district.buildings / 50)}px`,
                height: `${40 + (district.buildings / 100)}px`,
                transform: 'translate(-25%, -25%)'
              }}
            />
          </div>
          
          {/* District label */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className={`
              px-2 py-1 rounded text-sm font-medium
              ${selectedDistrict?.id === district.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 shadow-sm border'
              }
            `}>
              {district.name}
            </div>
          </div>
        </div>
      ))}

      {/* Map controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
        <div className="text-xs text-gray-500 mb-1">Interactive Map</div>
        <div className="flex space-x-1">
          <button className="w-6 h-6 bg-gray-100 rounded text-xs hover:bg-gray-200">+</button>
          <button className="w-6 h-6 bg-gray-100 rounded text-xs hover:bg-gray-200">-</button>
        </div>
      </div>
    </div>
  );
}