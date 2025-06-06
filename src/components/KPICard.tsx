import React from 'react';
import * as Icons from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: string;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
}

export default function KPICard({ title, value, icon, color = '#6B7280', trend, subtitle }: KPICardProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as React.ComponentType<any>;
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return Icons.TrendingUp;
      case 'down': return Icons.TrendingDown;
      default: return Icons.Minus;
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <IconComponent 
            className="h-6 w-6" 
            style={{ color }} 
          />
        </div>
        
        {trend && (
          <div className={`
            flex items-center space-x-1 text-sm
            ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}
          `}>
            <TrendIcon className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        {subtitle && (
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}