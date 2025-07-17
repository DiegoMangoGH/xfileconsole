import React from 'react';

interface FileInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  accept?: string;
  required?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ 
  value, 
  onChange, 
  label, 
  placeholder = "Select file...",
  accept,
  required = false 
}) => {
  const inputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0].name);
    }
  };

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
        />
        <input
          type="file"
          id={inputId}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => document.getElementById(inputId)?.click()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default FileInput;