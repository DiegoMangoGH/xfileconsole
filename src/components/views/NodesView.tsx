import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../modals/ConfirmationModal';
import SearchInput from '../ui/SearchInput';
import Button from '../ui/Button';
import { MOCK_NODES } from '../../constants/mockData';
import { Node } from '../../types';
// import { filterBySearchTerm } from '../../utils/filterUtils'; // Uncomment and implement if needed

const NodesView: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(MOCK_NODES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState<'toggle' | 'delete' | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredNodes = nodes.filter((node: Node) =>
    node.server.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.serverOS.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleClick = (id: string) => {
    setSelectedNodeId(id);
    setActionType('toggle');
    setShowConfirmationModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedNodeId(id);
    setActionType('delete');
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = () => {
    if (selectedNodeId && actionType === 'toggle') {
      // Logic to toggle node status (mock for now)
      console.log(`Toggling status for node: ${selectedNodeId}`);
    } else if (selectedNodeId && actionType === 'delete') {
      // Logic to delete node (mock for now)
      console.log(`Deleting node: ${selectedNodeId}`);
    }
    setShowConfirmationModal(false);
    setSelectedNodeId(null);
    setActionType(null);
  };

  const handleCancelAction = () => {
    setShowConfirmationModal(false);
    setSelectedNodeId(null);
    setActionType(null);
  };

  const handleAddNewNodeClick = () => {
    navigate('/configurations/nodes/add');
  };

  const handleEditClick = (id: string) => {
    console.log(`Edit node: ${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Nodes</h1>
      <p className="text-gray-600 mb-8">Manage your system nodes.</p>

      <div className="flex items-center justify-between mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter nodes..."
        />
        <Button onClick={handleAddNewNodeClick} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Node</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server OS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modification Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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
            {filteredNodes.length > 0 ? (
              filteredNodes.map((node: Node) => (
                <motion.tr
                  key={node.id}
                  className="hover:bg-gray-50"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{node.server}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{node.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{node.serverOS}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{node.modificationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label htmlFor={`toggle-${node.id}`} className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`toggle-${node.id}`}
                          className="sr-only"
                          checked={node.status}
                          onChange={() => handleToggleClick(node.id)}
                        />
                        <div className={`block w-10 h-6 rounded-full ${node.status ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${node.status ? 'translate-x-full' : ''}`}></div>
                      </div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/configurations/nodes/${node.id}`)}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50 transition-colors"
                      title="View details"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No nodes found matching your criteria.
                </td>
              </motion.tr>
            )}
          </motion.tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCancelAction}
        onConfirm={handleConfirmAction}
        message={`Are you sure you want to ${actionType === 'toggle' ? 'change the status of' : 'delete'} this node?`}
      />

    </div>
  );
};

export default NodesView;