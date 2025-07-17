import { RefreshCw, Folder, Settings, BarChart3 } from 'lucide-react';
import { PermissionCategory } from '../types/permissions';

export const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    id: 'transmissions',
    name: 'Transmissions',
    description: 'File transmission operations',
    icon: RefreshCw,
    permissions: [
      {
        id: 'transmissions.view',
        name: 'View Transmissions',
        description: 'View transmission history and status',
        category: 'transmissions'
      },
      {
        id: 'transmissions.create',
        name: 'Create Transmissions',
        description: 'Create new file transmissions',
        category: 'transmissions'
      },
      {
        id: 'transmissions.execute',
        name: 'Execute Transmissions',
        description: 'Execute and re-execute transmissions',
        category: 'transmissions'
      },
      {
        id: 'transmissions.delete',
        name: 'Delete Transmissions',
        description: 'Delete transmission records',
        category: 'transmissions'
      }
    ]
  },
  {
    id: 'tasks',
    name: 'Tasks',
    description: 'Scheduled and event-driven tasks',
    icon: Folder,
    permissions: [
      {
        id: 'tasks.scheduled.view',
        name: 'View Scheduled Tasks',
        description: 'View scheduled task configurations',
        category: 'tasks'
      },
      {
        id: 'tasks.scheduled.create',
        name: 'Create Scheduled Tasks',
        description: 'Create new scheduled tasks',
        category: 'tasks'
      },
      {
        id: 'tasks.scheduled.edit',
        name: 'Edit Scheduled Tasks',
        description: 'Modify existing scheduled tasks',
        category: 'tasks'
      },
      {
        id: 'tasks.scheduled.delete',
        name: 'Delete Scheduled Tasks',
        description: 'Remove scheduled tasks',
        category: 'tasks'
      },
      {
        id: 'tasks.event.view',
        name: 'View Event Tasks',
        description: 'View event shipping configurations',
        category: 'tasks'
      },
      {
        id: 'tasks.event.create',
        name: 'Create Event Tasks',
        description: 'Create new event shipping tasks',
        category: 'tasks'
      },
      {
        id: 'tasks.event.edit',
        name: 'Edit Event Tasks',
        description: 'Modify existing event tasks',
        category: 'tasks'
      },
      {
        id: 'tasks.event.delete',
        name: 'Delete Event Tasks',
        description: 'Remove event tasks',
        category: 'tasks'
      }
    ]
  },
  {
    id: 'configurations',
    name: 'Configurations',
    description: 'System and provider configurations',
    icon: Settings,
    permissions: [
      {
        id: 'config.nodes.view',
        name: 'View Nodes',
        description: 'View node configurations',
        category: 'configurations'
      },
      {
        id: 'config.nodes.manage',
        name: 'Manage Nodes',
        description: 'Create, edit, and delete nodes',
        category: 'configurations'
      },
      {
        id: 'config.providers.view',
        name: 'View Providers',
        description: 'View provider configurations',
        category: 'configurations'
      },
      {
        id: 'config.providers.manage',
        name: 'Manage Providers',
        description: 'Create, edit, and delete providers',
        category: 'configurations'
      },
      {
        id: 'config.keys.view',
        name: 'View Keys',
        description: 'View security keys',
        category: 'configurations'
      },
      {
        id: 'config.keys.manage',
        name: 'Manage Keys',
        description: 'Create, edit, and delete keys',
        category: 'configurations'
      },
      {
        id: 'config.users.view',
        name: 'View Users',
        description: 'View user accounts',
        category: 'configurations'
      },
      {
        id: 'config.users.manage',
        name: 'Manage Users',
        description: 'Create, edit, and delete users',
        category: 'configurations'
      },
      {
        id: 'config.organization.view',
        name: 'View Organization',
        description: 'View organization settings',
        category: 'configurations'
      },
      {
        id: 'config.organization.manage',
        name: 'Manage Organization',
        description: 'Modify organization settings',
        category: 'configurations'
      }
    ]
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Tools',
    description: 'System monitoring and administrative tools',
    icon: BarChart3,
    permissions: [
      {
        id: 'monitoring.view',
        name: 'View Monitoring',
        description: 'Access system monitoring dashboard',
        category: 'monitoring'
      },
      {
        id: 'tools.access',
        name: 'Access Tools',
        description: 'Use administrative tools',
        category: 'monitoring'
      },
      {
        id: 'tools.dangerous',
        name: 'Dangerous Operations',
        description: 'Execute system-critical operations',
        category: 'monitoring'
      }
    ]
  }
];