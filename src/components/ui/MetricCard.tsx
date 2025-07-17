import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  color = 'blue',
  onClick
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

  const cardClasses = `p-6 rounded-lg border ${colorClasses[color]} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="h-6 w-6" />
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;