import React from 'react';
import * as Icons from 'lucide-react';
import { Role } from '../context/AppContext';

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  onClick: (role: Role) => void;
}

export default function RoleCard({ role, isSelected, onClick }: RoleCardProps) {
  const IconComponent = Icons[role.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <div
      onClick={() => onClick(role)}
      className={`
        relative cursor-pointer p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group
        ${isSelected 
          ? 'border-2 shadow-lg transform scale-[1.02]' 
          : 'border border-gray-200 hover:border-gray-300 bg-white'
        }
      `}
      style={{
        borderColor: isSelected ? role.colors.primary : undefined,
        backgroundColor: isSelected ? `${role.colors.primary}08` : 'white'
      }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div 
          className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: role.colors.primary }}
        >
          <Icons.Check className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="text-center">
        {/* Icon */}
        <div 
          className={`mx-auto mb-4 p-4 rounded-2xl transition-all duration-300 ${
            isSelected ? 'scale-110' : 'group-hover:scale-105'
          }`}
          style={{ 
            backgroundColor: isSelected ? role.colors.primary : `${role.colors.primary}15`,
            color: isSelected ? 'white' : role.colors.primary
          }}
        >
          <IconComponent className="h-8 w-8" />
        </div>

        {/* Role Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.name}</h3>
        
        {/* Theme Badge */}
        <div 
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${role.colors.primary}15`,
            color: role.colors.primary
          }}
        >
          {role.theme.charAt(0).toUpperCase() + role.theme.slice(1)} Focus
        </div>

        {/* Hover Effect */}
        <div className={`mt-4 text-xs text-gray-500 transition-opacity duration-300 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          Click to select this role
        </div>
      </div>
    </div>
  );
}