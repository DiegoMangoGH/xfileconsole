import React from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'connected' | 'disconnected' | 'error';
  size?: 'sm' | 'md';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: Wifi,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'Connected'
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Disconnected'
        };
      case 'error':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'Error'
        };
      default:
        return {
          icon: WifiOff,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full ${config.bgColor}`}>
      <Icon className={`${iconSize} ${config.color}`} />
      <span className={`text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
};

export default StatusIndicator;