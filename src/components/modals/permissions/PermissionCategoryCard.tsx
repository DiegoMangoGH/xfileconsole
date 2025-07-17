import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PermissionCategory } from '../../../types/permissions';
import PermissionItem from './PermissionItem';

interface PermissionCategoryCardProps {
  category: PermissionCategory;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  userPermissions: { [key: string]: boolean };
  onPermissionChange: (permissionId: string, enabled: boolean) => void;
}

const PermissionCategoryCard: React.FC<PermissionCategoryCardProps> = ({
  category,
  isExpanded,
  onToggleExpanded,
  userPermissions,
  onPermissionChange
}) => {
  const Icon = category.icon;
  const enabledCount = category.permissions.filter(p => userPermissions[p.id]).length;
  const totalCount = category.permissions.length;

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'transmissions': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'tasks': return 'text-green-600 bg-green-50 border-green-200';
      case 'configurations': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'monitoring': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggleExpanded}
        className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
          isExpanded ? 'bg-gray-50' : ''
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getCategoryColor(category.id)}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {enabledCount}/{totalCount} enabled
          </span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4 space-y-3">
            {category.permissions.map((permission) => (
              <PermissionItem
                key={permission.id}
                permission={permission}
                enabled={userPermissions[permission.id] || false}
                onToggle={(enabled) => onPermissionChange(permission.id, enabled)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionCategoryCard;