import React from 'react';
import { X } from 'lucide-react';
import { Transmission } from '../../types';
import Button from '../ui/Button';

interface TransmissionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transmission: Transmission | null;
  onReexecute?: (transmission: Transmission) => void;
}

const TransmissionDetailsModal: React.FC<TransmissionDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  transmission, 
  onReexecute 
}) => {
  if (!isOpen || !transmission) {
    return null;
  }

  const handleReexecute = () => {
    if (transmission && onReexecute) {
      console.log('Re-executing transmission:', transmission.id);
      onReexecute(transmission);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Transmission Details</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>ID:</strong> {transmission.id}</p>
          <p><strong>File Sent:</strong> {transmission.fileSent}</p>
          <p><strong>File Size:</strong> {transmission.fileSize}</p>
          <p><strong>Transmission Date:</strong> {transmission.transmissionDate}</p>
          <p><strong>Transmission Hour:</strong> {transmission.transmissionHour}</p>
          <p><strong>Zipped:</strong> {transmission.zipped ? 'Yes' : 'No'}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              transmission.status === 'Success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {transmission.status}
            </span>
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {onReexecute && (
            <Button variant="primary" onClick={handleReexecute}>
              Re-execute Transmission
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransmissionDetailsModal;