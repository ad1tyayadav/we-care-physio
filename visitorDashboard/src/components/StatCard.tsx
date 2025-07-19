import React from 'react';

// Define the types for the component's props
interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
      <div className="text-4xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400 uppercase mt-2">{label}</div>
    </div>
  );
};

export default StatCard;