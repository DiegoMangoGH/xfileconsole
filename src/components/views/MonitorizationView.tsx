import React, { useState } from 'react';
import { Activity, CheckCircle, RefreshCw, Network } from 'lucide-react';
import SystemMetrics from './components/SystemMetrics';
import ConnectionStatus from './components/ConnectionStatus';
import RecentActivity from './components/RecentActivity';
import Button from '../ui/Button';

const MonitorizationView: React.FC = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setLastRefresh(new Date().toLocaleTimeString());
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">System Monitoring</h1>
          <p className="text-gray-600 mt-2">Real-time status of file transport operations and connections</p>
        </div>
        <Button onClick={handleRefresh} className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      <SystemMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConnectionStatus />
        <RecentActivity />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
            <p className="text-sm text-gray-600">Last updated: {lastRefresh}</p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorizationView;