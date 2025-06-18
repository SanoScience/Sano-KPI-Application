'use client';

import React from 'react';

export type KpiColor = 'green' | 'blue' | 'purple' | 'red' | 'amber' | 'teal' | 'indigo' | 'orange';

interface ShortKpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  color?: KpiColor;
  isLoading?: boolean;
  detailedDescription?: string;
}

const colorMap = {
  green: 'text-green-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  red: 'text-red-600',
  amber: 'text-amber-600',
  teal: 'text-teal-600',
  indigo: 'text-indigo-600',
  orange: 'text-orange-600',
};

export default function ShortKpiCard({ 
  title, 
  value, 
  description = '', 
  color = 'blue',
  isLoading = false,
  detailedDescription = description
}: ShortKpiCardProps) {
  const colorClass = colorMap[color];
  
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm" title={detailedDescription}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
        {isLoading ? (
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
        )}
      </div>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
} 