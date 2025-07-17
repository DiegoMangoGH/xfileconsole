import React from 'react';
import { Activity } from 'lucide-react';

interface ActivityItem {
  time: string;
  event: string;
  status: 'success' | 'error' | 'info';
}

const RecentActivity: React.FC = () => {
  const recentActivity: ActivityItem[] = [
    { time: '14:32', event: 'File 00195754.csv transmitted successfully to SFTP', status: 'success' },
    { time: '14:28', event: 'Scheduled task "Daily Backup" executed', status: 'success' },
    { time: '14:25', event: 'Connection to SMB share failed - retrying', status: 'error' },
    { time: '14:20', event: 'Event shipping task triggered by file arrival', status: 'success' },
    { time: '14:15', event: 'File 00195753.csv queued for transmission', status: 'info' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Activity className="h-5 w-5 mr-2" />
        Recent Activity
      </h2>
      <div className="space-y-3">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">{activity.event}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;