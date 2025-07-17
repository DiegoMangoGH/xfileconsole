import React, { useState } from 'react';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
}

const LogsSection: React.FC = () => {
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  const mockLogs: LogEntry[] = [
    { timestamp: '2025-01-15 14:32:15', level: 'info', message: 'File 00195754.csv transmitted successfully', source: 'FileTransport' },
    { timestamp: '2025-01-15 14:30:42', level: 'info', message: 'Scheduled task "Daily Backup" started', source: 'TaskScheduler' },
    { timestamp: '2025-01-15 14:28:33', level: 'warning', message: 'Connection timeout to SMB share, retrying...', source: 'SMBProvider' },
    { timestamp: '2025-01-15 14:25:18', level: 'error', message: 'Failed to authenticate with FTP server', source: 'FTPProvider' },
    { timestamp: '2025-01-15 14:22:05', level: 'info', message: 'Event shipping task triggered by file arrival', source: 'EventHandler' },
    { timestamp: '2025-01-15 14:20:33', level: 'info', message: 'File 00195753.csv added to transmission queue', source: 'QueueManager' },
    { timestamp: '2025-01-15 14:18:22', level: 'warning', message: 'Disk space usage above 80%', source: 'SystemMonitor' },
    { timestamp: '2025-01-15 14:15:44', level: 'info', message: 'AWS S3 connection established', source: 'AWSProvider' },
  ];

  const filteredLogs = logFilter === 'all' ? mockLogs : mockLogs.filter(log => log.level === logFilter);

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">System Logs</h2>
          <div className="flex space-x-2">
            {['all', 'info', 'warning', 'error'].map((level) => (
              <button
                key={level}
                onClick={() => setLogFilter(level as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  logFilter === level ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs.map((log, index) => (
          <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                {log.level.toUpperCase()}
              </span>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{log.message}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                  <span className="text-xs text-gray-500">Source: {log.source}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsSection;