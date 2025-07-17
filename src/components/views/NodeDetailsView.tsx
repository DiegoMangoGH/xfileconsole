import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../modals/ConfirmationModal';
import { useConfirmation } from '../../hooks/useConfirmation';
import Button from '../ui/Button';

const NodeDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showConfirmation, confirmationMessage, openConfirmation, closeConfirmation, confirmAction } = useConfirmation();

  // In a real application, you would fetch node details using the 'id'
  // For now, we'll use a placeholder or find from mock data if available
  const mockNodeDetails = {
    id: id,
    server: `Server ${id}`,
    ipAddress: `192.168.1.${id}`,
    serverOS: 'Linux',
    status: 'Active',
    clientId: `client-${id}`,
    clientSecret: `secret-${id}`,
    grantType: 'Client Credentials',
  };

  const handleDelete = useCallback(() => {
    openConfirmation(
      `Are you sure you want to delete node ${mockNodeDetails.server}? This action cannot be undone.`,
      () => {
        // Simulate delete action
        console.log(`Deleting node ${mockNodeDetails.server}`);
        // In a real app, you'd make an API call here
        navigate('/configurations/nodes'); // Redirect to nodes list after deletion
      }
    );
  }, [mockNodeDetails.server, navigate, openConfirmation]);

  const handleCancel = useCallback(() => {
    navigate('/configurations/nodes'); // Redirect to nodes list on cancel
  }, [navigate]);

  const handleSaveChanges = useCallback(() => {
    console.log('Saving changes for node:', mockNodeDetails);
    // In a real app, you'd make an API call to save changes
    navigate('/configurations/nodes');
  }, [mockNodeDetails, navigate]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Node Details: {mockNodeDetails.server}</h1>
      <p className="text-gray-600 mb-8">Detailed information and activity for this node.</p>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input type="text" value={mockNodeDetails.id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección IP</label>
            <input type="text" value={mockNodeDetails.ipAddress} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Servidor</label>
            <input type="text" value={mockNodeDetails.server} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sistema Operativo</label>
            <input type="text" value={mockNodeDetails.serverOS} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <input type="text" value={mockNodeDetails.status} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client ID</label>
            <input type="text" value={mockNodeDetails.clientId} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Secret</label>
            <input type="text" value={mockNodeDetails.clientSecret} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
           </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Grant Type</label>
            <input type="text" value={mockNodeDetails.grantType} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            onClick={handleCancel}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
          >
            Delete Node
          </Button>
          <Button
            onClick={handleSaveChanges}
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        onConfirm={confirmAction}
        message={confirmationMessage}
      />

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de actividad</h2>
        {/* Placeholder for the chart */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-md">
          [Chart Placeholder]
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsView;