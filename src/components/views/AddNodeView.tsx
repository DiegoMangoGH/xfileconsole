import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const AddNodeView: React.FC = () => {
  const navigate = useNavigate();
  const [nodeData, setNodeData] = useState({
    id: '',
    address: '',
    server: '',
    serverOS: 'Linux',
    clientId: '',
    clientSecret: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNodeData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Logic to save the new node will be added here
    console.log('Saving new node:', nodeData);
    navigate('/configurations/nodes');
  };

  const handleCancel = () => {
    navigate('/configurations/nodes');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Node</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">ID</label>
            <input type="text" name="id" value={nodeData.id} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Dirección IP</label>
            <input type="text" name="address" value={nodeData.address} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Servidor</label>
            <input type="text" name="server" value={nodeData.server} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Sistema Operativo</label>
            <select name="serverOS" value={nodeData.serverOS} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2">
              <option>Linux</option>
              <option>Windows</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Client ID</label>
            <input type="text" name="clientId" value={nodeData.clientId} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Client Secret</label>
            <input type="text" name="clientSecret" value={nodeData.clientSecret} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <Button onClick={handleCancel} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
          Save Node
        </Button>
      </div>
    </div>
  );
};

export default AddNodeView;