export interface Transmission {
  id: string;
  fileSent: string;
  fileSize: string;
  transmissionHour: string;
  transmissionDate: string; // Added for history view
  zipped: boolean;
  status: 'Success' | 'Error';
  originNode: string; // New field
  destinyNode: string; // New field
}

export interface ScheduledTask {
  id: string;
  provider: string;
  description: string;
  taskType: string;
  localFile: string;
  textFilter: string;
  executionTime: string;
  status: boolean; // true for active, false for inactive
  recurrent?: boolean;
  recurrenceType?: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | null;
  recurrenceDetails?: {
    daysOfWeek?: string[]; // e.g., ['Mon', 'Wed']
    dayOfMonth?: number[]; // e.g., [15, 20] - changed to array
    dayOfYear?: string; // e.g., '01-15' for Jan 15th
  };
}

export interface EventShippingTask {
  id: string;
  provider: string;
  description: string;
  eventType: string; // Changed from taskType
  localFile: string;
  processFilter: string; // Changed from textFilter
  status: boolean;
}

export interface Node {
  id: string;
  server: string;
  address: string;
  serverOS: string;
  modificationDate: string;
  status: boolean;
}

export interface Node {
  id: string;
  server: string;
  address: string;
  serverOS: string;
  modificationDate: string;
  status: boolean;
  ipAddress?: string;
  clientId?: string;
  clientSecret?: string;
  grantType?: string;
}

export interface Key {
  id: string;
  publicKey: string;
  privateKey: string;
  creationUser: string;
  expirationDate: string;
  status: boolean;
}

export interface Provider {
  id: string;
  name: string;
  type: 'SFTP' | 'AWS' | 'SMB' | 'FTP' | 'AZURE';
  server: string;
  port: string;
  command: string;
  timeout: number;
  status: boolean;
  lastConnection?: string;
  connectionStatus: 'connected' | 'disconnected' | 'error';
  config: {
    logFile?: string;
    publicKey?: string;
    privateKey?: string;
    username?: string;
    password?: string;
    region?: string;
    bucket?: string;
    accessKey?: string;
    secretKey?: string;
  };
}

export interface Organization {
  id: string;
  name: string;
  direction: string;
  adminUser: string;
  creationDate: string;
  licenseType: 'Basic' | 'Professional' | 'Enterprise' | 'Yearly';
  licenseExpiration: string;
  totalCost: number;
  activeUsers: number;
  activeProviders: number;
  usageData: {
    month: string;
    value: number;
  }[];
}

export interface User {
  id: string;
  username: string;
  name: string;
  position: string;
  phone: string;
  email?: string;
  status: boolean;
  createdAt?: string;
  lastLogin?: string;
}