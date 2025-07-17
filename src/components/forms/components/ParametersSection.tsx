import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Toggle from '../../ui/Toggle';

interface ParamRow {
  key: string;
  value: string;
}

interface ParametersSectionProps {
  useParams: boolean;
  setUseParams: (value: boolean) => void;
  params: ParamRow[];
  setParams: (params: ParamRow[]) => void;
}

const ParametersSection: React.FC<ParametersSectionProps> = ({
  useParams,
  setUseParams,
  params,
  setParams
}) => {
  const handleAddParam = () => {
    setParams([...params, { key: '', value: '' }]);
  };

  const handleRemoveParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleParamChange = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  return (
    <div className="mb-6">
      <Toggle
        id="useParams"
        checked={useParams}
        onChange={setUseParams}
        label="Use params"
      />

      {useParams && (
        <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-50 grid grid-cols-[1fr_2fr_auto] gap-0">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-300">Key</div>
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-300">Value</div>
            <div className="px-4 py-2 text-sm font-medium text-gray-700 w-16 text-center"></div>
          </div>
          {params.map((param, index) => (
            <div key={index} className="grid grid-cols-[1fr_2fr_auto] gap-0 border-t border-gray-200">
              <div className="border-r border-gray-300">
                <input
                  type="text"
                  value={param.key}
                  onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Key"
                />
              </div>
              <div className="border-r border-gray-300">
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Value"
                />
              </div>
              <div className="flex items-center justify-center w-16">
                <button
                  type="button"
                  onClick={() => handleRemoveParam(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200 p-2">
            <button
              type="button"
              onClick={handleAddParam}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add parameter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametersSection;