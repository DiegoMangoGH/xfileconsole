import React from 'react';
import { AlertCircle } from 'lucide-react';
import { PROVIDERS } from '../../constants/providers';

interface ProviderSummaryProps {
  providerValue: string;
}

const ProviderSummary: React.FC<ProviderSummaryProps> = ({ providerValue }) => {
  const selectedProvider = PROVIDERS.find(p => p.value === providerValue);

  if (!selectedProvider) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm font-medium text-blue-800">Provider Summary</span>
        <AlertCircle className="h-4 w-4 text-blue-600" />
      </div>
      <div className="text-sm text-blue-700 space-y-1">
        {Object.entries(selectedProvider.details).map(([key, value]) => (
          <div key={key}>
            <span className="capitalize">{key}:</span> {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderSummary;