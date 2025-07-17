import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import { Provider } from '../../types';

interface AddProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: Omit<Provider, 'id'>) => void;
}

const AddProviderModal: React.FC<AddProviderModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'SFTP' | 'AWS' | 'SMB' | 'FTP' | 'AZURE'>('SFTP');
  const [server, setServer] = useState('');
  const [port, setPort] = useState('');
  const [command, setCommand] = useState('');
  const [timeout, setTimeout] = useState('180');
  const [logFile, setLogFile] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProvider: Omit<Provider, 'id'> = {
      name,
      type,
      server,
      port,
      command,
      timeout: parseInt(timeout) || 180,
      status: true,
      connectionStatus: 'disconnected',
      config: {
        logFile,
        publicKey,
        privateKey,
      }
    };
    
    onSave(newProvider);
    
    // Reset form
    setName('');
    setType('SFTP');
    setServer('');
    setPort('');
    setCommand('');
    setTimeout('180');
    setLogFile('');
    setPublicKey('');
    setPrivateKey('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">Add New Provider Configuration</h2>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Configuration Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Configuration Type *
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
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
              <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-2">
                Server *
              </label>
              <input
                type="text"
                id="server"
                value={server}
                onChange={(e) => setServer(e.target.value)}
                required
                placeholder="192.168.1.100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">
                Port *
              </label>
              <input
                type="text"
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                required
                placeholder="22"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-2">
                Command
              </label>
              <input
                type="text"
                id="command"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="libsftpprovider.so"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="timeout" className="block text-sm font-medium text-gray-700 mb-2">
                Timeout (seconds)
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
              <label htmlFor="logFile" className="block text-sm font-medium text-gray-700 mb-2">
                Log File
              </label>
              <input
                type="text"
                id="logFile"
                value={logFile}
                onChange={(e) => setLogFile(e.target.value)}
                placeholder="provider_log.xml"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700 mb-2">
                Public Key Path
              </label>
              <input
                type="text"
                id="publicKey"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="/path/to/public.key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700 mb-2">
                Private Key Path
              </label>
              <input
                type="text"
                id="privateKey"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="/path/to/private.key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Provider
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProviderModal;