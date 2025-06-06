import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backTo?: string;
}

export default function Header({ title, showBack = false, backTo = '/' }: HeaderProps) {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const role = state.selectedRole;

  const handleBack = () => {
    navigate(backTo);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBack && (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg transition-colors duration-300"
                style={{ backgroundColor: role?.colors.primary || '#6B7280' }}
              >
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Energy District Planner AI</h1>
                {role && (
                  <p className="text-sm text-gray-600">
                    Role: {role.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {state.selectedDistrict && (
              <div className="text-sm text-gray-600">
                District: {state.selectedDistrict.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}