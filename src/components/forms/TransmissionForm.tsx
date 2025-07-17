import React, { useState } from 'react';
import Button from '../ui/Button';
import ProviderSelect from '../ui/ProviderSelect';
import FileInput from '../ui/FileInput';
import ProviderSummary from '../ui/ProviderSummary';

interface TransmissionFormProps {
  onClose: () => void;
  onSendFile: () => void;
}

const TransmissionForm: React.FC<TransmissionFormProps> = ({ onClose, onSendFile }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [runTaskFile, setRunTaskFile] = useState('');
  const [localFile, setLocalFile] = useState('00001010.csv');
  const [remoteFile, setRemoteFile] = useState('00001010.csv');
  const [zipEnabled, setZipEnabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending file with:', { selectedProvider, runTaskFile, localFile, remoteFile, zipEnabled });
    onSendFile();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Transmission</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Execute On-demand Transmission</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProviderSelect
              value={selectedProvider}
              onChange={setSelectedProvider}
              required
            />
            <FileInput
              value={runTaskFile}
              onChange={setRunTaskFile}
              label="Run Task"
              placeholder="e.g., task_script.sh"
            />
          </div>

          {selectedProvider && (
            <ProviderSummary providerValue={selectedProvider} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileInput
              value={localFile}
              onChange={setLocalFile}
              label="Local File"
              placeholder="00001010.csv"
              required
            />
            <div className="space-y-4">
              <FileInput
                value={remoteFile}
                onChange={setRemoteFile}
                label="Remote File"
                placeholder="00001010.csv"
                required
              />
              <div className="flex items-center">
                <label htmlFor="zipEnabled" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="zipEnabled"
                    checked={zipEnabled}
                    onChange={(e) => setZipEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Zip</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Send File
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransmissionForm;