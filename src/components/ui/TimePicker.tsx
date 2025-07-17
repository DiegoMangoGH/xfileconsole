import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import TimeWheel from './TimeWheel';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(value ? parseInt(value.split(':')[0]) : 0);
  const [minute, setMinute] = useState(value ? parseInt(value.split(':')[1]) : 0);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      setHour(h);
      setMinute(m);
    }
  }, [value]);

  const formatTime = (h: number, m: number) => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const handleHourChange = (newHour: number) => {
    setHour(newHour);
    onChange(formatTime(newHour, minute));
  };

  const handleMinuteChange = (newMinute: number) => {
    setMinute(newMinute);
    onChange(formatTime(hour, newMinute));
  };

  return (
    <div className="relative" ref={pickerRef}>
      <label htmlFor="time-picker" className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center cursor-pointer bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Clock className="h-5 w-5 text-gray-400 mr-2" />
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || 'Select Time'}
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex space-x-6 justify-center">
          <div className="text-center">
            <h4 className="font-semibold mb-3 text-gray-700">Hour</h4>
            <TimeWheel
              values={Array.from({ length: 24 }, (_, i) => i)}
              selectedValue={hour}
              onValueChange={handleHourChange}
              itemHeight={40}
              visibleItems={5}
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-3 text-gray-700">Minute</h4>
            <TimeWheel
              values={Array.from({ length: 60 }, (_, i) => i)}
              selectedValue={minute}
              onValueChange={handleMinuteChange}
              itemHeight={40}
              visibleItems={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;