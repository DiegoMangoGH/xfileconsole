import React from 'react';
import { ChevronDown } from 'lucide-react';
import { MOCK_NODES } from '../../constants/mockData';

interface NodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

const NodeSelect: React.FC<NodeSelectProps> = ({ value, onChange, label = "Select Node", required = false }) => {
  return (
    <div>
      <label htmlFor="node-select" className="block text-sm font-medium text-gray-700 mb-2"> {/* Changed mb-1 to mb-2 for consistency with ProviderSelect */}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id="node-select"
          name="node-select"
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none bg-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        >
          <option value="" disabled>Select a node</option>
          {MOCK_NODES.map((node) => (
            <option key={node.id} value={node.server}>
              {node.server} ({node.address})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default NodeSelect;