import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import { Provider } from '../../types';

interface ProviderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: Provider) => void;
  provider: Provider | null;
}

const ProviderDetailsModal: React.FC<ProviderDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  provider 
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<Provider['type']>('SFTP');
  const [port, setPort] = useState('');
  const [command, setCommand] = useState('');
  const [logFile, setLogFile] = useState('');
  const [timeout, setTimeout] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    if (provider) {
      setName(provider.name);
      setType(provider.type);
      setPort(provider.port);
      setCommand(provider.command);
      setLogFile(provider.config.logFile || '');
      setTimeout(provider.timeout.toString());
      setPublicKey(provider.config.publicKey || '');
      setPrivateKey(provider.config.privateKey || '');
    }
  }, [provider]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;

    const updatedProvider: Provider = {
      ...provider,
      name,
      type,
      port,
      command,
      timeout: parseInt(timeout) || 180,
      config: {
        ...provider.config,
        logFile,
        publicKey,
        privateKey,
      }
    };
    onSave(updatedProvider);
  };

  if (!isOpen || !provider) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">Configuration Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="providerName" className="block text-sm font-medium text-gray-700 mb-2">
                Configuration Name
              </label>
              <input
                type="text"
                id="providerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Configuration Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as Provider['type'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="SFTP">SFTP</option>
                <option value="AWS">AWS S3</option>
                <option value="SMB">SMB</option>
                <option value="FTP">FTP</option>
                <option value="AZURE">Azure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">
                Port
              </label>
              <input
                type="text"
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-2">
                Command
              </label>
              <input
                type="text"
                id="command"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="logFile" className="block text-sm font-medium text-gray-700 mb-2">
                Log File
              </label>
              <input
                type="text"
                id="logFile"
                value={logFile}
                onChange={(e) => setLogFile(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="timeout" className="block text-sm font-medium text-gray-700 mb-2">
                Time Out
              </label>
              <input
                type="number"
                id="timeout"
                value={timeout}
                onChange={(e) => setTimeout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700 mb-2">
                Public Key
              </label>
              <input
                type="text"
                id="publicKey"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700 mb-2">
                Private Key
              </label>
              <input
                type="text"
                id="privateKey"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
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

export default ProviderDetailsModal;