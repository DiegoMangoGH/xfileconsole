import React, { useState, useEffect } from 'react';
import { X, Search, RotateCcw } from 'lucide-react';
import { User } from '../../types';
import { PERMISSION_CATEGORIES } from '../../constants/permissions';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';
import PermissionCategoryCard from './permissions/PermissionCategoryCard';
import PermissionPresets from './permissions/PermissionPresets';

interface UserPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (userId: string, permissions: { [key: string]: boolean }) => void;
}

const UserPermissionsModal: React.FC<UserPermissionsModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const [userPermissions, setUserPermissions] = useState<{ [key: string]: boolean }>({});
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize permissions (in a real app, this would come from the backend)
  useEffect(() => {
    if (user) {
      // Default permissions based on user position
      const defaultPermissions: { [key: string]: boolean } = {};
      
      if (user.position === 'System Administrator') {
        // Admin gets most permissions
        PERMISSION_CATEGORIES.forEach(category => {
          category.permissions.forEach(permission => {
            defaultPermissions[permission.id] = !permission.id.includes('dangerous');
          });
        });
      } else if (user.position === 'Developer') {
        // Developers get operational permissions
        defaultPermissions['transmissions.view'] = true;
        defaultPermissions['transmissions.create'] = true;
        defaultPermissions['tasks.scheduled.view'] = true;
        defaultPermissions['tasks.scheduled.create'] = true;
        defaultPermissions['tasks.event.view'] = true;
        defaultPermissions['monitoring.view'] = true;
      } else {
        // Others get basic view permissions
        defaultPermissions['transmissions.view'] = true;
        defaultPermissions['tasks.scheduled.view'] = true;
        defaultPermissions['tasks.event.view'] = true;
        defaultPermissions['monitoring.view'] = true;
      }
      
      setUserPermissions(defaultPermissions);
    }
  }, [user]);

  const handlePermissionChange = (permissionId: string, enabled: boolean) => {
    setUserPermissions(prev => ({
      ...prev,
      [permissionId]: enabled
    }));
  };

  const handleApplyPreset = (permissions: string[]) => {
    const newPermissions: { [key: string]: boolean } = {};
    permissions.forEach(permissionId => {
      newPermissions[permissionId] = true;
    });
    setUserPermissions(newPermissions);
  };

  const handleResetPermissions = () => {
    setUserPermissions({});
  };

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSave = () => {
    onSave(user.id, userPermissions);
    onClose();
  };

  const filteredCategories = PERMISSION_CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.permissions.some(permission =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalEnabledPermissions = Object.values(userPermissions).filter(Boolean).length;
  const totalPermissions = PERMISSION_CATEGORIES.reduce((sum, cat) => sum + cat.permissions.length, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Advanced Configurations</h2>
            <p className="text-sm text-gray-600">
              Configure permissions for <span className="font-medium">{user.name}</span> ({user.position})
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Permission Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800">Permission Summary</h3>
                <p className="text-sm text-blue-600">
                  {totalEnabledPermissions} of {totalPermissions} permissions enabled
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetPermissions}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Permission Presets */}
          <PermissionPresets onApplyPreset={handleApplyPreset} />

          {/* Search */}
          <div className="mb-6">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search permissions..."
              className="w-full max-w-md"
            />
          </div>

          {/* Permission Categories */}
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <PermissionCategoryCard
                key={category.id}
                category={category}
                isExpanded={expandedCategories[category.id] || false}
                onToggleExpanded={() => handleToggleCategory(category.id)}
                userPermissions={userPermissions}
                onPermissionChange={handlePermissionChange}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPermissionsModal;