import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EventShippingTask } from '../../types';
import ProviderSelect from '../ui/ProviderSelect';
import ProviderSummary from '../ui/ProviderSummary';
import Button from '../ui/Button';

interface EditEventShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: EventShippingTask) => void;
  task: EventShippingTask | null;
}

const EditEventShippingModal: React.FC<EditEventShippingModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task 
}) => {
  const [providerName, setProviderName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [localFile, setLocalFile] = useState('');
  const [processFilter, setProcessFilter] = useState('');

  useEffect(() => {
    if (task) {
      setProviderName(task.provider.toLowerCase());
      setDescription(task.description);
      setEventType(task.eventType);
      setLocalFile(task.localFile);
      setProcessFilter(task.processFilter);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const updatedTask: EventShippingTask = {
      ...task,
      provider: providerName,
      description,
      eventType,
      localFile,
      processFilter,
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
          <h2 className="text-xl font-bold text-gray-800">Edit Event Shipping Task</h2>
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
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <input
                type="text"
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
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

          <div className="mb-6">
            <label htmlFor="processFilter" className="block text-sm font-medium text-gray-700 mb-2">Process Filter</label>
            <input
              type="text"
              id="processFilter"
              value={processFilter}
              onChange={(e) => setProcessFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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

export default EditEventShippingModal;