import React from 'react';
import { Clock, FileText, Zap, HardDrive } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'error';
  icon: React.ElementType;
  description: string;
}

const SystemMetrics: React.FC = () => {
  const systemMetrics: SystemMetric[] = [
    {
      name: 'Active Tasks',
      value: '12',
      status: 'good',
      icon: Clock,
      description: 'Scheduled tasks currently active'
    },
    {
      name: 'Pending Transmissions',
      value: '3',
      status: 'warning',
      icon: FileText,
      description: 'Files waiting to be transmitted'
    },
    {
      name: 'Queue Processing',
      value: 'Normal',
      status: 'good',
      icon: Zap,
      description: 'File processing queue status'
    },
    {
      name: 'Storage Usage',
      value: '68%',
      status: 'good',
      icon: HardDrive,
      description: 'Local storage utilization'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {systemMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.name} className={`p-6 rounded-lg border ${getStatusColor(metric.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <Icon className="h-6 w-6" />
              <span className="text-2xl font-bold">{metric.value}</span>
            </div>
            <h3 className="font-semibold text-gray-800">{metric.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SystemMetrics;