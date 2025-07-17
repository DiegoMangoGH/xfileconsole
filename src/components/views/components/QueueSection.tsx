import React from 'react';

interface QueueItem {
  id: string;
  filename: string;
  destination: string;
  status: 'pending' | 'processing' | 'failed' | 'completed';
  priority: 'high' | 'normal' | 'low';
  size: string;
}

const QueueSection: React.FC = () => {
  const queueItems: QueueItem[] = [
    { id: '1', filename: '00195755.csv', destination: 'SFTP Server', status: 'pending', priority: 'high', size: '164 KB' },
    { id: '2', filename: '00195756.csv', destination: 'AWS S3', status: 'processing', priority: 'normal', size: '172 KB' },
    { id: '3', filename: '00195757.csv', destination: 'SMB Share', status: 'failed', priority: 'normal', size: '158 KB' },
    { id: '4', filename: '00195758.csv', destination: 'FTP Server', status: 'pending', priority: 'low', size: '169 KB' },
  ];

  const getQueueStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">File Transmission Queue</h2>
        <p className="text-sm text-gray-600 mt-1">Current files pending transmission</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queueItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.filename}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.size}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getQueueStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueueSection;