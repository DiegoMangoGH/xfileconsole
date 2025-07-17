import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { Key } from '../../types';

const AddPeerView: React.FC = () => {
  const navigate = useNavigate();
  const [peerData, setPeerData] = useState({
    id: '',
    publicKey: '',
    privateKey: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPeerData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Logic to save the new peer will be added here
    console.log('Saving new peer:', peerData);
    navigate('/configurations/keys');
  };

  const handleCancel = () => {
    navigate('/configurations/keys');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Peer</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Peer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Peer ID</label>
            <input type="text" name="id" value={peerData.id} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Public Key</label>
            <input type="text" name="publicKey" value={peerData.publicKey} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Private Key</label>
            <input type="text" name="privateKey" value={peerData.privateKey} onChange={handleChange} className="mt-1 w-full bg-gray-100 border-transparent rounded-md p-2" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <Button onClick={handleCancel} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
          Save Peer
        </Button>
      </div>
    </div>
  );
};

export default AddPeerView;