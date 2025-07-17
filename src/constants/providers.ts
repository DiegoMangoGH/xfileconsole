export interface ProviderDetails {
  destiny?: string;
  port?: string;
  command?: string;
  publicKey?: string;
  timeout?: string;
  region?: string;
  bucket?: string;
  accessKey?: string;
  secretKey?: string;
  server?: string;
  share?: string;
  username?: string;
  domain?: string;
  host?: string;
  password?: string;
}

export interface Provider {
  value: string;
  label: string;
  details: ProviderDetails;
}

export const PROVIDERS: Provider[] = [
  { 
    value: 'sftp', 
    label: 'Sftp',
    details: {
      destiny: '172.16.5.90',
      port: '22',
      command: 'libsftpprovider.so',
      publicKey: 'rsa_xfilecert.pub',
      timeout: '180'
    }
  },
  { 
    value: 'aws', 
    label: 'AWS S3',
    details: {
      region: 'us-east-1',
      bucket: 'xfile-transmissions',
      accessKey: 'AKIA...',
      secretKey: '***hidden***',
      timeout: '300'
    }
  },
  { 
    value: 'smb', 
    label: 'SMB',
    details: {
      server: '192.168.1.100',
      share: 'shared-files',
      username: 'xfile-user',
      domain: 'COMPANY',
      timeout: '120'
    }
  },
  { 
    value: 'ftp', 
    label: 'FTP',
    details: {
      host: 'ftp.example.com',
      port: '21',
      username: 'ftpuser',
      password: '***hidden***',
      timeout: '180'
    }
  }
];