import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Role {
  id: string;
  name: string;
  icon: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface District {
  id: string;
  name: string;
  region: string;
  buildings: number;
  description: string;
  coordinates: [number, number];
}

export interface AppState {
  selectedRole: Role | null;
  selectedDistrict: District | null;
  currentScenario: any;
  interventionPlan: any[];
}

interface AppContextType {
  state: AppState;
  setSelectedRole: (role: Role) => void;
  setSelectedDistrict: (district: District) => void;
  setCurrentScenario: (scenario: any) => void;
  addIntervention: (intervention: any) => void;
  removeIntervention: (index: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const roles: Role[] = [
  {
    id: 'grid-operator',
    name: 'Grid Operator',
    icon: 'Zap',
    theme: 'blue',
    colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' }
  },
  {
    id: 'urban-planner',
    name: 'Urban Planner',
    icon: 'Building2',
    theme: 'green',
    colors: { primary: '#10B981', secondary: '#047857', accent: '#34D399' }
  },
  {
    id: 'policy-maker',
    name: 'Policy Maker',
    icon: 'TrendingUp',
    theme: 'purple',
    colors: { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#A78BFA' }
  },
  {
    id: 'building-expert',
    name: 'Building Physics Expert',
    icon: 'Settings',
    theme: 'orange',
    colors: { primary: '#F97316', secondary: '#C2410C', accent: '#FB923C' }
  },
  {
    id: 'building-owner',
    name: 'Building Owner',
    icon: 'Home',
    theme: 'teal',
    colors: { primary: '#14B8A6', secondary: '#0F766E', accent: '#5EEAD4' }
  },
  {
    id: 'general-user',
    name: 'General User',
    icon: 'User',
    theme: 'neutral',
    colors: { primary: '#6B7280', secondary: '#374151', accent: '#9CA3AF' }
  }
];

export const districts: District[] = [
  {
    id: 'northwood',
    name: 'Northwood District',
    region: 'North',
    buildings: 1234,
    description: 'A mixed-use urban area with residential and commercial zones.',
    coordinates: [52.3676, 4.9041]
  },
  {
    id: 'downtown',
    name: 'Downtown Core',
    region: 'Central',
    buildings: 850,
    description: 'Dense commercial district with high-rise buildings.',
    coordinates: [52.3702, 4.8952]
  },
  {
    id: 'riverside',
    name: 'Riverside Community',
    region: 'West',
    buildings: 600,
    description: 'Residential area with single-family homes and parks.',
    coordinates: [52.3649, 4.8896]
  },
  {
    id: 'industrial',
    name: 'East Industrial Zone',
    region: 'East',
    buildings: 150,
    description: 'Industrial facilities and warehouses.',
    coordinates: [52.3731, 4.9167]
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    selectedRole: null,
    selectedDistrict: null,
    currentScenario: null,
    interventionPlan: []
  });

  const setSelectedRole = (role: Role) => {
    setState(prev => ({ ...prev, selectedRole: role }));
  };

  const setSelectedDistrict = (district: District) => {
    setState(prev => ({ ...prev, selectedDistrict: district }));
  };

  const setCurrentScenario = (scenario: any) => {
    setState(prev => ({ ...prev, currentScenario: scenario }));
  };

  const addIntervention = (intervention: any) => {
    setState(prev => ({ 
      ...prev, 
      interventionPlan: [...prev.interventionPlan, intervention] 
    }));
  };

  const removeIntervention = (index: number) => {
    setState(prev => ({ 
      ...prev, 
      interventionPlan: prev.interventionPlan.filter((_, i) => i !== index) 
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      setSelectedRole,
      setSelectedDistrict,
      setCurrentScenario,
      addIntervention,
      removeIntervention
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}