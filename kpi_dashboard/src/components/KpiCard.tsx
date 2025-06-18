'use client';

import React from 'react';

// Define color options for the KPI values
export type KpiColor = 'green' | 'blue' | 'purple' | 'red' | 'amber' | 'teal' | 'indigo' | 'orange';

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  color?: KpiColor;
  isLoading?: boolean;
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

export default function KpiCard({ 
  title, 
  value, 
  description = '', 
  color = 'blue',
  isLoading = false
}: KpiCardProps) {
  const colorClass = colorMap[color];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {isLoading ? (
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
      )}
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
} 