import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ScheduledTask } from '../../types';
import ProviderSelect from '../ui/ProviderSelect';
import ProviderSummary from '../ui/ProviderSummary';
import Button from '../ui/Button';

interface EditScheduledTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: ScheduledTask) => void;
  task: ScheduledTask | null;
}

const EditScheduledTaskModal: React.FC<EditScheduledTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task 
}) => {
  const [providerName, setProviderName] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('');
  const [localFile, setLocalFile] = useState('');
  const [textFilter, setTextFilter] = useState('');
  const [executionTime, setExecutionTime] = useState('');

  useEffect(() => {
    if (task) {
      setProviderName(task.provider.toLowerCase());
      setDescription(task.description);
      setTaskType(task.taskType);
      setLocalFile(task.localFile);
      setTextFilter(task.textFilter);
      setExecutionTime(task.executionTime);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const updatedTask: ScheduledTask = {
      ...task,
      provider: providerName,
      description,
      taskType,
      localFile,
      textFilter,
      executionTime,
    };
    onSave(updatedTask);
  };

  if (!isOpen || !task) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Edit Scheduled Task</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ProviderSelect
              value={providerName}
              onChange={setProviderName}
            />
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {providerName && <ProviderSummary providerValue={providerName} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
              <input
                type="text"
                id="taskType"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="localFile" className="block text-sm font-medium text-gray-700 mb-2">Local File</label>
              <input
                type="text"
                id="localFile"
                value={localFile}
                onChange={(e) => setLocalFile(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="textFilter" className="block text-sm font-medium text-gray-700 mb-2">Text Filter</label>
              <input
                type="text"
                id="textFilter"
                value={textFilter}
                onChange={(e) => setTextFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="executionTime" className="block text-sm font-medium text-gray-700 mb-2">Execution Time</label>
              <input
                type="text"
                id="executionTime"
                value={executionTime}
                onChange={(e) => setExecutionTime(e.target.value)}
                placeholder="Mon, Thu; 12:00hrs"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScheduledTaskModal;