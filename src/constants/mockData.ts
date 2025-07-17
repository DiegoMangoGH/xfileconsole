import { Transmission, ScheduledTask, EventShippingTask } from '../types';

export const MOCK_TRANSMISSIONS: Transmission[] = [
  { id: '1', fileSent: '00195741.csv', fileSize: '166 Kb', transmissionHour: '00:45:48', transmissionDate: '2025-07-09', zipped: false, status: 'Success', originNode: 'Node 101', destinyNode: 'Node 102' },
  { id: '2', fileSent: '00195742.csv', fileSize: '164 kb', transmissionHour: '01:23:42', transmissionDate: '2025-07-09', zipped: true, status: 'Success', originNode: 'Node 103', destinyNode: 'Node 104' },
  { id: '3', fileSent: '00195743.csv', fileSize: '164 kb', transmissionHour: '03:12:34', transmissionDate: '2025-07-08', zipped: true, status: 'Success', originNode: 'Node 105', destinyNode: 'Node 106' },
  { id: '4', fileSent: '00195744.csv', fileSize: '164 kb', transmissionHour: '06:54:22', transmissionDate: '2025-07-08', zipped: true, status: 'Success', originNode: 'Node 107', destinyNode: 'Node 108' },
  { id: '5', fileSent: '00195745.csv', fileSize: '164 kb', transmissionHour: '12:32:54', transmissionDate: '2025-07-07', zipped: false, status: 'Success', originNode: 'Node 101', destinyNode: 'Node 103' },
  { id: '6', fileSent: '00195746.csv', fileSize: '164 kb', transmissionHour: '14:42:32', transmissionDate: '2025-07-07', zipped: false, status: 'Success', originNode: 'Node 102', destinyNode: 'Node 104' },
  { id: '7', fileSent: '00195747.csv', fileSize: '164 kb', transmissionHour: '16:08:08', transmissionDate: '2025-07-06', zipped: false, status: 'Success', originNode: 'Node 105', destinyNode: 'Node 107' },
  { id: '8', fileSent: '00195748.csv', fileSize: '164 kb', transmissionHour: '21:58:12', transmissionDate: '2025-07-06', zipped: true, status: 'Error', originNode: 'Node 106', destinyNode: 'Node 108' },
  { id: '9', fileSent: '00195749.csv', fileSize: '170 Kb', transmissionHour: '09:00:00', transmissionDate: '2025-07-05', zipped: false, status: 'Success', originNode: 'Node 101', destinyNode: 'Node 102' },
  { id: '10', fileSent: '00195750.csv', fileSize: '150 kb', transmissionHour: '10:30:00', transmissionDate: '2025-07-05', zipped: true, status: 'Success', originNode: 'Node 103', destinyNode: 'Node 105' },
  { id: '11', fileSent: '00195751.csv', fileSize: '180 Kb', transmissionHour: '11:45:00', transmissionDate: '2025-07-04', zipped: false, status: 'Error', originNode: 'Node 104', destinyNode: 'Node 106' },
  { id: '12', fileSent: '00195752.csv', fileSize: '160 kb', transmissionHour: '13:15:00', transmissionDate: '2025-07-04', zipped: true, status: 'Success', originNode: 'Node 107', destinyNode: 'Node 101' },
  { id: '13', fileSent: '00195753.csv', fileSize: '190 Kb', transmissionHour: '15:00:00', transmissionDate: '2025-07-03', zipped: false, status: 'Success', originNode: 'Node 108', destinyNode: 'Node 103' },
  { id: '14', fileSent: '00195754.csv', fileSize: '175 kb', transmissionHour: '17:20:00', transmissionDate: '2025-07-03', zipped: true, status: 'Error', originNode: 'Node 102', destinyNode: 'Node 105' },
];

export const MOCK_SCHEDULED_TASKS: ScheduledTask[] = [
  { id: 'st1', provider: 'SFTP', description: 'Event Get using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Wed, Thu; 12:00hrs', status: true },
  { id: 'st2', provider: 'AWS', description: 'Event Get External using Aws', taskType: 'Get External', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st3', provider: 'SFTP', description: 'Second Event Shipping using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: false },
  { id: 'st4', provider: 'SFTP', description: 'Third Event Shipping using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st5', provider: 'SFTP', description: 'Event Shipping using Put', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st6', provider: 'SFTP', description: 'Fourth Event Shipping using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: false },
  { id: 'st7', provider: 'MSABS', description: 'Event Shipping Using Msabs', taskType: 'Get External', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st8', provider: 'MSABS', description: 'Second Event Shipping using Msabs', taskType: 'Get External', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
];

export const MOCK_EVENT_SHIPPING_TASKS: EventShippingTask[] = [
  { id: 'es1', provider: 'SFTP', description: 'Event Get using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es2', provider: 'AWS', description: 'Event Get External using Aws', eventType: 'Get External', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es3', provider: 'SFTP', description: 'Second Event Shipping using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: false },
  { id: 'es4', provider: 'SFTP', description: 'Third Event Shipping using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es5', provider: 'SFTP', description: 'Event Shipping using Put', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es6', provider: 'SFTP', description: 'Fourth Event Shipping using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: false },
  { id: 'es7', provider: 'MSABS', description: 'Event Shipping Using Msabs', eventType: 'Get External', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es8', provider: 'MSABS', description: 'Second Event Shipping using Msabs', eventType: 'Get External', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
];

export const MOCK_NODES = [
  { id: '101', server: '101', address: '172.16.4.23', serverOS: 'Linux', modificationDate: '2025-02-25 10:05:42', status: true },
  { id: '102', server: '102', address: '134.23.4.56', serverOS: 'Linux', modificationDate: '2025-03-14 15:30:18', status: true },
  { id: '103', server: '103', address: '179.56.23.67', serverOS: 'Windows', modificationDate: '2025-04-27 08:11:59', status: true },
  { id: '104', server: '104', address: '189.34.34.4', serverOS: 'Linux', modificationDate: '2025-05-08 20:00:00', status: true },
  { id: '105', server: '105', address: '124.48.3.45', serverOS: 'Linux', modificationDate: '2025-06-03 14:45:13', status: true },
  { id: '106', server: '106', address: '174.23.5.3', serverOS: 'Linux', modificationDate: '2025-06-24 18:33:40', status: true },
  { id: '107', server: '107', address: '187.23.6.78', serverOS: 'Windows', modificationDate: '2025-07-19 11:27:00', status: true },
  { id: '108', server: '108', address: '134.56.3.57', serverOS: 'Windows', modificationDate: '2025-08-22 16:16:16', status: true },
];

export const MOCK_KEYS = [
  { id: '101', publicKey: 'public_key.pub', privateKey: 'priv_key.pub', creationUser: 'Admin@organization.com', expirationDate: '2025-12-16 23:59:59', status: true },
  { id: '102', publicKey: 'public_key.pub', privateKey: 'priv_key.pub', creationUser: 'Admin@organization.com', expirationDate: '2025-12-16 23:59:59', status: true },
  { id: '103', publicKey: 'public_key.pub', privateKey: 'priv_key.pub', creationUser: 'Admin@organization.com', expirationDate: '2025-12-16 23:59:59', status: true },
  { id: '104', publicKey: 'public_key.pub', privateKey: 'priv_key.pub', creationUser: 'Admin@organization.com', expirationDate: '2025-12-16 23:59:59', status: true },
  { id: '105', publicKey: 'public_key.pub', privateKey: 'priv_key.pub', creationUser: 'Admin@organization.com', expirationDate: '2025-12-16 23:59:59', status: true },
  { id: '106', publicKey: 'public_key.pub', privateKey: 'priv_key.pub', creationUser: 'Admin@organization.com', expirationDate: '2025-12-16 23:59:59', status: true },
];

export const MOCK_PROVIDERS = [
  {
    id: '1',
    name: 'SFTP CF Test',
    type: 'SFTP' as const,
    server: '142.51.45.1',
    port: '8080',
    command: 'libsftpprovider.so',
    timeout: 180,
    status: true,
    lastConnection: '2025-01-15 14:30:00',
    connectionStatus: 'connected' as const,
    config: {
      logFile: 'sftpprovider_log.xml',
      publicKey: '/mnt/chocolate/bcp/',
      privateKey: '/mnt/chocolate/bcp/'
    }
  },
  {
    id: '2',
    name: 'SFTP CF Dev',
    type: 'SFTP' as const,
    server: '123.45.6.78',
    port: '8031',
    command: 'libsftpprovider.so',
    timeout: 180,
    status: true,
    lastConnection: '2025-01-15 14:25:00',
    connectionStatus: 'connected' as const,
    config: {
      logFile: 'sftpprovider_log.xml',
      publicKey: '/mnt/chocolate/bcp/',
      privateKey: '/mnt/chocolate/bcp/'
    }
  },
  {
    id: '3',
    name: 'SFTP CF Dev 2',
    type: 'SFTP' as const,
    server: '189.54.6.14',
    port: '80',
    command: 'libsftpprovider.so',
    timeout: 180,
    status: false,
    lastConnection: '2025-01-15 13:45:00',
    connectionStatus: 'error' as const,
    config: {
      logFile: 'sftpprovider_log.xml',
      publicKey: '/mnt/chocolate/bcp/',
      privateKey: '/mnt/chocolate/bcp/'
    }
  },
  {
    id: '4',
    name: 'Aws CF Test',
    type: 'AWS' as const,
    server: '127.0.0.1',
    port: '30',
    command: 'awsprovider.so',
    timeout: 180,
    status: true,
    lastConnection: '2025-01-15 14:20:00',
    connectionStatus: 'connected' as const,
    config: {
      region: 'us-east-1',
      bucket: 'xfile-transmissions',
      accessKey: 'AKIA...',
      secretKey: '***hidden***'
    }
  }
];

export const MOCK_ORGANIZATION = {
  id: '1',
  name: 'Compartamos ORG',
  direction: 'Av. Principal #123, Lima',
  adminUser: 'admin@compartamos.com',
  creationDate: '2024/12/05 16:04:48',
  licenseType: 'Yearly' as const,
  licenseExpiration: '2025/12/05 16:04:48',
  totalCost: 199.99,
  activeUsers: 12,
  activeProviders: 4,
  usageData: [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 59 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 40 },
    { month: 'Aug', value: 65 },
    { month: 'Sep', value: 75 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 90 },
    { month: 'Dec', value: 95 }
  ]
};

export const MOCK_USERS = [
  {
    id: '1',
    username: 'jose.perez',
    name: 'Jose Perez',
    position: 'Developer',
    phone: '+1 202-555-0143',
    email: 'jose.perez@compartamos.com',
    status: true,
    createdAt: '2024-01-15',
    lastLogin: '2025-01-15 14:30:00'
  },
  {
    id: '2',
    username: 'ana.lopez',
    name: 'Ana Lopez',
    position: 'Developer',
    phone: '+44 7700 900123',
    email: 'ana.lopez@compartamos.com',
    status: true,
    createdAt: '2024-02-20',
    lastLogin: '2025-01-15 13:45:00'
  },
  {
    id: '3',
    username: 'carlos.garcia',
    name: 'Carlos Garcia',
    position: 'Product Manager',
    phone: '+33 612 345 678',
    email: 'carlos.garcia@compartamos.com',
    status: true,
    createdAt: '2024-03-10',
    lastLogin: '2025-01-15 12:20:00'
  },
  {
    id: '4',
    username: 'maria.rodriguez',
    name: 'Maria Rodriguez',
    position: 'Sales Representative',
    phone: '+49 1512 3456789',
    email: 'maria.rodriguez@compartamos.com',
    status: true,
    createdAt: '2024-04-05',
    lastLogin: '2025-01-15 11:15:00'
  },
  {
    id: '5',
    username: 'luis.fernandez',
    name: 'Luis Fernandez',
    position: 'Developer',
    phone: '+34 612 345 678',
    email: 'luis.fernandez@compartamos.com',
    status: true,
    createdAt: '2024-05-12',
    lastLogin: '2025-01-15 10:30:00'
  },
  {
    id: '6',
    username: 'andrea.morales',
    name: 'Andrea Morales',
    position: 'Developer',
    phone: '+52 55 1234 5678',
    email: 'andrea.morales@compartamos.com',
    status: true,
    createdAt: '2024-06-18',
    lastLogin: '2025-01-15 09:45:00'
  },
  {
    id: '7',
    username: 'juan.ramirez',
    name: 'Juan Ramirez',
    position: 'Developer',
    phone: '+61 412 345 678',
    email: 'juan.ramirez@compartamos.com',
    status: true,
    createdAt: '2024-07-22',
    lastLogin: '2025-01-15 08:20:00'
  },
  {
    id: '8',
    username: 'valeria.sanchez',
    name: 'Valeria Sanchez',
    position: 'IT Support',
    phone: '+81 90-1234-5678',
    email: 'valeria.sanchez@compartamos.com',
    status: true,
    createdAt: '2024-08-30',
    lastLogin: '2025-01-15 07:10:00'
  }
];