import React from 'react';
import { Network, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface ConnectionStatus {
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  lastCheck: string;
  responseTime: string;
  details: string;
}

const ConnectionStatus: React.FC = () => {
  const connectionStatuses: ConnectionStatus[] = [
    {
      provider: 'SFTP Server (172.16.5.90)',
      status: 'connected',
      lastCheck: '2 min ago',
      responseTime: '45ms',
      details: 'Port 22 - Authentication OK'
    },
    {
      provider: 'AWS S3 (us-east-1)',
      status: 'connected',
      lastCheck: '1 min ago',
      responseTime: '120ms',
      details: 'Bucket accessible - Credentials valid'
    },
    {
      provider: 'SMB Share (192.168.1.100)',
      status: 'error',
      lastCheck: '5 min ago',
      responseTime: 'timeout',
      details: 'Connection timeout - Check network'
    },
    {
      provider: 'FTP Server (ftp.example.com)',
      status: 'connected',
      lastCheck: '3 min ago',
      responseTime: '89ms',
      details: 'Port 21 - Login successful'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'disconnected':
      case 'error':
        return <WifiOff className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Network className="h-5 w-5 mr-2" />
        Provider Connections
      </h2>
      <div className="space-y-4">
        {connectionStatuses.map((connection, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(connection.status)}
              <div>
                <h3 className="font-medium text-gray-800">{connection.provider}</h3>
                <p className="text-sm text-gray-600">{connection.details}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{connection.responseTime}</p>
              <p className="text-xs text-gray-500">{connection.lastCheck}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionStatus;