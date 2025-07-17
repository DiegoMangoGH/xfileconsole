import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import ConfirmationModal from '../modals/ConfirmationModal';
import ToolsSection from './components/ToolsSection';
import LogsSection from './components/LogsSection';
import QueueSection from './components/QueueSection';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'file' | 'task' | 'system' | 'maintenance';
  action: () => void;
  dangerous?: boolean;
}

const ToolsView: React.FC = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeTab, setActiveTab] = useState<'tools' | 'logs' | 'queue'>('tools');

  const handleToolAction = (tool: Tool) => {
    if (tool.dangerous) {
      setSelectedTool(tool);
      setShowConfirmationModal(true);
    } else {
      tool.action();
    }
  };

  const handleConfirmAction = () => {
    if (selectedTool) {
      selectedTool.action();
    }
    setShowConfirmationModal(false);
    setSelectedTool(null);
  };

  const handleCancelAction = () => {
    setShowConfirmationModal(false);
    setSelectedTool(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">System Tools</h1>
      <p className="text-gray-600 mb-8">Administrative tools for file transport operations and system maintenance.</p>

      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'tools' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Tools
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'logs' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          System Logs
        </button>
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'queue' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          File Queue
        </button>
      </div>

      {activeTab === 'tools' && <ToolsSection onToolAction={handleToolAction} />}
      {activeTab === 'logs' && <LogsSection />}
      {activeTab === 'queue' && <QueueSection />}

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCancelAction}
        onConfirm={handleConfirmAction}
        message={`Are you sure you want to execute "${selectedTool?.name}"? This action may have significant system impact.`}
      />
    </div>
  );
};

export default ToolsView;