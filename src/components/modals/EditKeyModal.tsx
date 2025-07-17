import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface Key {
  id: string;
  publicKey: string;
  privateKey: string;
  creationUser: string;
  expirationDate: string;
  status: boolean;
}

interface EditKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: Key) => void;
  keyData: Key | null;
}

const EditKeyModal: React.FC<EditKeyModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  keyData 
}) => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [creationUser, setCreationUser] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    if (keyData) {
      setPublicKey(keyData.publicKey);
      setPrivateKey(keyData.privateKey);
      setCreationUser(keyData.creationUser);
      setExpirationDate(keyData.expirationDate.split(' ')[0]); // Extract date part
    }
  }, [keyData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyData) return;

    const updatedKey: Key = {
      ...keyData,
      publicKey,
      privateKey,
      creationUser,
      expirationDate: `${expirationDate} 23:59:59`,
    };
    onSave(updatedKey);
  };

  if (!isOpen || !keyData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">Edit Key</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 mb-6">
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
            <div>
              <label htmlFor="creationUser" className="block text-sm font-medium text-gray-700 mb-2">
                Creation User
              </label>
              <input
                type="email"
                id="creationUser"
                value={creationUser}
                onChange={(e) => setCreationUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="date"
                id="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
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

export default EditKeyModal;