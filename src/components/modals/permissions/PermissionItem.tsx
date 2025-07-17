import React from 'react';
import { Shield, ShieldCheck } from 'lucide-react';
import { Permission } from '../../../types/permissions';
import Toggle from '../../ui/Toggle';

interface PermissionItemProps {
  permission: Permission;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({
  permission,
  enabled,
  onToggle
}) => {
  const isDangerous = permission.id.includes('delete') || permission.id.includes('dangerous');

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`p-1.5 rounded-full ${
          enabled 
            ? isDangerous 
              ? 'bg-red-100 text-red-600' 
              : 'bg-green-100 text-green-600'
            : 'bg-gray-100 text-gray-400'
        }`}>
          {enabled ? (
            <ShieldCheck className="h-4 w-4" />
          ) : (
            <Shield className="h-4 w-4" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{permission.name}</h4>
          <p className="text-sm text-gray-600">{permission.description}</p>
          {isDangerous && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
              High Risk
            </span>
          )}
        </div>
      </div>
      <Toggle
        id={`permission-${permission.id}`}
        checked={enabled}
        onChange={onToggle}
      />
    </div>
  );
};

export default PermissionItem;