import React from 'react';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange, label }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${checked ? 'translate-x-full' : ''}`}></div>
      </div>
      {label && <span className="text-sm text-gray-700 font-medium">{label}</span>}
    </label>
  );
};

export default Toggle;