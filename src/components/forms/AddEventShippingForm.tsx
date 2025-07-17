import React, { useState } from 'react';
import { EventShippingTask } from '../../types';
import ProviderSelect from '../ui/ProviderSelect';
import FileInput from '../ui/FileInput';
import Button from '../ui/Button';
import ProviderSummary from '../ui/ProviderSummary';
import ParametersSection from './components/ParametersSection';

interface AddEventShippingFormProps {
  onSave: (task: EventShippingTask) => void;
  onCancel: () => void;
}

const AddEventShippingForm: React.FC<AddEventShippingFormProps> = ({ onSave, onCancel }) => {
  const [eventName, setEventName] = useState('Stand Alone Event');
  const [description, setDescription] = useState('New Event From Stand Alone');
  const [path, setPath] = useState('/mnt/chocolate/bcp/');
  const [providerName, setProviderName] = useState('');
  const [localFile, setLocalFile] = useState('/mnt/chocolate/bcp/');
  const [runTimeout, setRunTimeout] = useState(1600); // Changed to number
  const [processFilter, setProcessFilter] = useState('TXT, PDF');
  const [runProcess, setRunProcess] = useState('');
  const [processPath, setProcessPath] = useState('');
  const [useParams, setUseParams] = useState(false);
  const [zip, setZip] = useState(false);
  const [params, setParams] = useState([
    { key: '-o', value: '0' },
    { key: 'Pub', value: '/apps/bftoolscript' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: EventShippingTask = {
      id: String(Date.now()),
      provider: providerName,
      description,
      eventType: 'Send',
      localFile,
      processFilter,
      status: true
    };
    onSave(newTask);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Event Shipping</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800">New Event</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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

        <FileInput
          value={path}
          onChange={setPath}
          label="Path"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ProviderSelect
            value={providerName}
            onChange={setProviderName}
            required
          />
          <FileInput
            value={localFile}
            onChange={setLocalFile}
            label="Local File"
          />
        </div>

        {providerName && <ProviderSummary providerValue={providerName} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="runTimeout" className="block text-sm font-medium text-gray-700 mb-2">Run Timeout (seconds)</label>
            <input
              type="number"
              id="runTimeout"
              value={runTimeout}
              onChange={(e) => setRunTimeout(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <FileInput
            value={processFilter}
            onChange={setProcessFilter}
            label="Process Filter"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FileInput
            value={runProcess}
            onChange={setRunProcess}
            label="Run Process"
          />
          <FileInput
            value={processPath}
            onChange={setProcessPath}
            label="Process Path"
          />
        </div>

        <ParametersSection
          useParams={useParams}
          setUseParams={setUseParams}
          params={params}
          setParams={setParams}
        />

        <div className="mb-8">
          <label htmlFor="zip" className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="zip"
              className="w-4 h-4 border-gray-300 rounded accent-blue-600 focus:ring-blue-500"
              checked={zip}
              onChange={(e) => setZip(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Zip</span>
          </label>
        </div>

        <div className="flex justify-center space-x-4">
          <Button type="submit">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEventShippingForm;