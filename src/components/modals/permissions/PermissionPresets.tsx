import React from 'react';
import { User, UserCheck, Shield, Crown } from 'lucide-react';

interface PermissionPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  permissions: string[];
}

interface PermissionPresetsProps {
  onApplyPreset: (permissions: string[]) => void;
}

const PermissionPresets: React.FC<PermissionPresetsProps> = ({ onApplyPreset }) => {
  const presets: PermissionPreset[] = [
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to all sections',
      icon: User,
      permissions: [
        'transmissions.view',
        'tasks.scheduled.view',
        'tasks.event.view',
        'config.nodes.view',
        'config.providers.view',
        'config.keys.view',
        'config.users.view',
        'config.organization.view',
        'monitoring.view'
      ]
    },
    {
      id: 'operator',
      name: 'Operator',
      description: 'Can execute transmissions and manage tasks',
      icon: UserCheck,
      permissions: [
        'transmissions.view',
        'transmissions.create',
        'transmissions.execute',
        'tasks.scheduled.view',
        'tasks.scheduled.create',
        'tasks.scheduled.edit',
        'tasks.event.view',
        'tasks.event.create',
        'tasks.event.edit',
        'config.nodes.view',
        'config.providers.view',
        'monitoring.view'
      ]
    },
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full access except dangerous operations',
      icon: Shield,
      permissions: [
        'transmissions.view',
        'transmissions.create',
        'transmissions.execute',
        'tasks.scheduled.view',
        'tasks.scheduled.create',
        'tasks.scheduled.edit',
        'tasks.event.view',
        'tasks.event.create',
        'tasks.event.edit',
        'config.nodes.view',
        'config.nodes.manage',
        'config.providers.view',
        'config.providers.manage',
        'config.keys.view',
        'config.keys.manage',
        'config.users.view',
        'config.users.manage',
        'config.organization.view',
        'config.organization.manage',
        'monitoring.view',
        'tools.access'
      ]
    },
    {
      id: 'superadmin',
      name: 'Super Administrator',
      description: 'Complete system access including dangerous operations',
      icon: Crown,
      permissions: [
        'transmissions.view',
        'transmissions.create',
        'transmissions.execute',
        'transmissions.delete',
        'tasks.scheduled.view',
        'tasks.scheduled.create',
        'tasks.scheduled.edit',
        'tasks.scheduled.delete',
        'tasks.event.view',
        'tasks.event.create',
        'tasks.event.edit',
        'tasks.event.delete',
        'config.nodes.view',
        'config.nodes.manage',
        'config.providers.view',
        'config.providers.manage',
        'config.keys.view',
        'config.keys.manage',
        'config.users.view',
        'config.users.manage',
        'config.organization.view',
        'config.organization.manage',
        'monitoring.view',
        'tools.access',
        'tools.dangerous'
      ]
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Setup</h3>
      <p className="text-sm text-gray-600 mb-4">
        Apply a predefined permission set or customize individual permissions below.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.permissions)}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-left"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{preset.name}</h4>
                <p className="text-xs text-gray-600">{preset.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionPresets;