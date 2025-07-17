import React from 'react';

interface StatusBadgeProps {
  status: 'Success' | 'Error' | 'Pending' | 'Processing';
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex font-semibold rounded-full ${getStatusClasses()} ${sizeClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;