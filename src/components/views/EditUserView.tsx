import React, { useState } from 'react';
import { User } from '../../types';
import Toggle from '../ui/Toggle';
import UserPermissionsModal from '../modals/UserPermissionsModal';

interface EditUserViewProps {
  user: User;
  onSaveChanges: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditUserView: React.FC<EditUserViewProps> = ({ user, onSaveChanges, onCancel }) => {
  const [formData, setFormData] = useState<User>(user);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (status: boolean) => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveChanges(formData);
  };

  const handleOpenPermissions = () => {
    setShowPermissionsModal(true);
  };

  const handleClosePermissions = () => {
    setShowPermissionsModal(false);
  };

  const handleSavePermissions = (userId: string, permissions: { [key: string]: boolean }) => {
    console.log('Saving permissions for user:', userId, permissions);
    // In a real app, this would update the user's permissions in the backend
    setShowPermissionsModal(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Users</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">User Information</h2>
        <div className="flex justify-center mb-6">
          {/* Placeholder for user icon */}
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">User</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor={`status-toggle-${formData.id}`} className="block text-sm font-medium text-gray-700 mr-4">Status</label>
              <Toggle id={`status-toggle-${formData.id}`} checked={formData.status} onChange={handleToggle} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <button 
              type="button" 
              onClick={handleOpenPermissions}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Advanced Configurations
            </button>
            <div className="flex gap-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
              <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>

      <UserPermissionsModal
        isOpen={showPermissionsModal}
        onClose={handleClosePermissions}
        user={formData}
        onSave={handleSavePermissions}
      />
    </div>
  );
};

export default EditUserView;