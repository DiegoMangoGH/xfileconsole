import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';
import Toggle from '../ui/Toggle';
import ConfirmationModal from '../modals/ConfirmationModal';
import EditKeyModal from '../modals/EditKeyModal';
import { useConfirmation } from '../../hooks/useConfirmation';
import { MOCK_KEYS } from '../../constants/mockData';
import { filterBySearchTerm } from '../../utils/filterUtils';

interface Key {
  id: string;
  publicKey: string;
  privateKey: string;
  creationUser: string;
  expirationDate: string;
  status: boolean;
}

interface KeyAssignmentData {
  peer: string;
  passPhrase: string;
  privateKey: string;
  publicKey: string;
}

const KeysView: React.FC = () => {
  const [keys, setKeys] = useState<Key[]>(MOCK_KEYS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const navigate = useNavigate();
  
  const {
    showConfirmation, 
    confirmationMessage, 
    openConfirmation, 
    closeConfirmation, 
    confirmAction 
  } = useConfirmation();

  const filteredKeys = filterBySearchTerm(keys, searchTerm);

  const handleDelete = (keyId: string) => {
    openConfirmation(
      `Are you sure you want to delete key ${keyId}? This action cannot be undone.`,
      () => {
        setKeys(prevKeys => prevKeys.filter(key => key.id !== keyId));
      }
    );
  };

  const handleEdit = (keyId: string) => {
    const key = keys.find(k => k.id === keyId);
    if (key) {
      setSelectedKey(key);
      setShowEditModal(true);
    }
  };

  const handleStatusChange = (keyId: string, newStatus: boolean) => {
    setKeys(prevKeys =>
      prevKeys.map(key =>
        key.id === keyId ? { ...key, status: newStatus } : key
      )
    );
  };

  const handleAddPeer = () => {
    navigate('/configurations/keys/add');
  };

  const handleSaveEdit = (updatedKey: Key) => {
    setKeys(prevKeys =>
      prevKeys.map(key =>
        key.id === updatedKey.id ? updatedKey : key
      )
    );
    setShowEditModal(false);
    setSelectedKey(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedKey(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Keys</h1>
      <p className="text-gray-600 mb-8">Manage your API keys for secure access.</p>

      <div className="flex items-center justify-between mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter keys..."
        />
        <Button onClick={handleAddPeer} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Peer</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Public Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Private Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creation User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiration Date
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
            {filteredKeys.length > 0 ? (
              filteredKeys.map((key) => (
                <motion.tr
                  key={key.id}
                  className="hover:bg-gray-50"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {key.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {key.publicKey}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {key.privateKey}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {key.creationUser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {key.expirationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Toggle
                      id={`toggle-${key.id}`}
                      checked={key.status}
                      onChange={(newStatus) => handleStatusChange(key.id, newStatus)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(key.id)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                        title="Edit key"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(key.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete key"
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
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No keys found matching your criteria.
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

      <EditKeyModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        keyData={selectedKey}
      />
    </div>
  );
};

export default KeysView;