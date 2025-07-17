export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'transmissions' | 'tasks' | 'configurations' | 'monitoring';
}

export interface UserPermissions {
  userId: string;
  permissions: {
    [key: string]: boolean;
  };
}

export interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  permissions: Permission[];
}