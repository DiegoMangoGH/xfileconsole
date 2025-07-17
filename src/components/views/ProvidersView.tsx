import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, TestTube } from 'lucide-react';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';
import Toggle from '../ui/Toggle';
import StatusIndicator from '../ui/StatusIndicator';
import ConfirmationModal from '../modals/ConfirmationModal';
import ProviderDetailsModal from '../modals/ProviderDetailsModal';
import AddProviderModal from '../modals/AddProviderModal';
import { useConfirmation } from '../../hooks/useConfirmation';
import { MOCK_PROVIDERS } from '../../constants/mockData';
import { Provider } from '../../types';
import { filterBySearchTerm } from '../../utils/filterUtils';

const ProvidersView: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  
  const { 
    showConfirmation, 
    confirmationMessage, 
    openConfirmation, 
    closeConfirmation, 
    confirmAction 
  } = useConfirmation();

  const filteredProviders = filterBySearchTerm(providers, searchTerm);

  const handleDelete = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    openConfirmation(
      `Are you sure you want to delete provider "${provider?.name}"? This action cannot be undone.`,
      () => {
        setProviders(prevProviders => prevProviders.filter(p => p.id !== providerId));
      }
    );
  };

  const handleEdit = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      setSelectedProvider(provider);
      setShowDetailsModal(true);
    }
  };

  const handleStatusChange = (providerId: string, newStatus: boolean) => {
    setProviders(prevProviders =>
      prevProviders.map(provider =>
        provider.id === providerId ? { ...provider, status: newStatus } : provider
      )
    );
  };

  const handleTestConnection = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      // Simulate connection test
      const isSuccess = Math.random() > 0.3; // 70% success rate
      const newConnectionStatus = isSuccess ? 'connected' : 'error';
      
      setProviders(prevProviders =>
        prevProviders.map(p =>
          p.id === providerId 
            ? { 
                ...p, 
                connectionStatus: newConnectionStatus,
                lastConnection: new Date().toISOString().slice(0, 19).replace('T', ' ')
              } 
            : p
        )
      );
      
      openConfirmation(
        `Connection test ${isSuccess ? 'successful' : 'failed'} for provider "${provider.name}".`,
        () => {}
      );
    }
  };

  const handleAddProvider = () => {
    setShowAddModal(true);
  };

  const handleSaveNewProvider = (providerData: Omit<Provider, 'id'>) => {
    const newProvider: Provider = {
      ...providerData,
      id: String(Date.now()),
      lastConnection: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    setProviders(prevProviders => [...prevProviders, newProvider]);
    setShowAddModal(false);
  };

  const handleSaveProviderDetails = (updatedProvider: Provider) => {
    setProviders(prevProviders =>
      prevProviders.map(provider =>
        provider.id === updatedProvider.id ? updatedProvider : provider
      )
    );
    setShowDetailsModal(false);
    setSelectedProvider(null);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedProvider(null);
  };

  const getProviderTypeColor = (type: string) => {
    switch (type) {
      case 'SFTP': return 'bg-blue-100 text-blue-800';
      case 'AWS': return 'bg-orange-100 text-orange-800';
      case 'SMB': return 'bg-green-100 text-green-800';
      case 'FTP': return 'bg-purple-100 text-purple-800';
      case 'AZURE': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Provider Configurations</h1>
      </div>
      <p className="text-gray-600 mb-8">Manage your file transfer provider configurations and connection settings.</p>

      <div className="flex items-center justify-between mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter configurations..."
        />
        <Button onClick={handleAddProvider} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Configuration</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Server
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Port
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Connection
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeout
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <motion.tbody
            className="bg-white divide-y divide-gray-200"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
          >
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <motion.tr
                  key={provider.id}
                  className="hover:bg-gray-50"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {provider.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProviderTypeColor(provider.type)}`}>
                      {provider.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.server}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIndicator status={provider.connectionStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.timeout}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Toggle
                      id={`toggle-${provider.id}`}
                      checked={provider.status}
                      onChange={(newStatus) => handleStatusChange(provider.id, newStatus)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleTestConnection(provider.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                        title="Test connection"
                      >
                        <TestTube className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(provider.id)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                        title="Edit provider"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(provider.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete provider"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No providers found matching your criteria.
                </td>
              </motion.tr>
            )}
          </motion.tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        onConfirm={confirmAction}
        message={confirmationMessage}
      />

      <AddProviderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNewProvider}
      />

      <ProviderDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        onSave={handleSaveProviderDetails}
        provider={selectedProvider}
      />
    </div>
  );
};

export default ProvidersView;