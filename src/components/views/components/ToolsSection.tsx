import React from 'react';
import { FileText, Upload, Archive, Download, Clock, RefreshCw, Trash2, Settings, FolderOpen, AlertTriangle } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'file' | 'task' | 'system' | 'maintenance';
  action: () => void;
  dangerous?: boolean;
}

interface ToolsSectionProps {
  onToolAction: (tool: Tool) => void;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ onToolAction }) => {
  const fileTools: Tool[] = [
    {
      id: '1',
      name: 'File Queue Status',
      description: 'View current file transmission queue and pending operations.',
      icon: FileText,
      category: 'file',
      action: () => console.log('Viewing file queue...'),
    },
    {
      id: '2',
      name: 'Manual File Transfer',
      description: 'Initiate a one-time file transfer outside scheduled tasks.',
      icon: Upload,
      category: 'file',
      action: () => console.log('Starting manual transfer...'),
    },
    {
      id: '3',
      name: 'Archive Manager',
      description: 'Manage file archives and compression settings.',
      icon: Archive,
      category: 'file',
      action: () => console.log('Opening archive manager...'),
    },
    {
      id: '4',
      name: 'Download Files',
      description: 'Download files from remote providers to local storage.',
      icon: Download,
      category: 'file',
      action: () => console.log('Starting download...'),
    },
  ];

  const taskTools: Tool[] = [
    {
      id: '5',
      name: 'Task Scheduler Status',
      description: 'View the status of the task scheduling engine.',
      icon: Clock,
      category: 'task',
      action: () => console.log('Checking scheduler status...'),
    },
    {
      id: '6',
      name: 'Force Task Execution',
      description: 'Manually trigger execution of scheduled tasks.',
      icon: RefreshCw,
      category: 'task',
      action: () => console.log('Forcing task execution...'),
    },
    {
      id: '7',
      name: 'Task History Cleanup',
      description: 'Clean up old task execution logs and history.',
      icon: Trash2,
      category: 'task',
      action: () => console.log('Cleaning task history...'),
      dangerous: true,
    },
  ];

  const systemTools: Tool[] = [
    {
      id: '8',
      name: 'Connection Test',
      description: 'Test connectivity to all configured providers.',
      icon: Settings,
      category: 'system',
      action: () => console.log('Testing connections...'),
    },
    {
      id: '9',
      name: 'Path Validator',
      description: 'Validate all configured file paths and directories.',
      icon: FolderOpen,
      category: 'system',
      action: () => console.log('Validating paths...'),
    },
    {
      id: '10',
      name: 'System Restart',
      description: 'Restart the file transport service (use with caution).',
      icon: RefreshCw,
      category: 'system',
      action: () => console.log('Restarting system...'),
      dangerous: true,
    },
  ];

  const renderToolSection = (title: string, tools: Tool[], colorClass: string) => (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onToolAction(tool)}
            >
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
                {tool.dangerous && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Caution Required
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {renderToolSection('File Management', fileTools, 'bg-blue-100 text-blue-600')}
      {renderToolSection('Task Management', taskTools, 'bg-green-100 text-green-600')}
      {renderToolSection('System Administration', systemTools, 'bg-purple-100 text-purple-600')}
    </div>
  );
};

export default ToolsSection;