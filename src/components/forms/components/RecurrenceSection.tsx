import React from 'react';
import { Calendar } from 'lucide-react';
import Toggle from '../../ui/Toggle';

interface RecurrenceSectionProps {
  recurrentTask: boolean;
  setRecurrentTask: (value: boolean) => void;
  recurrenceType: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | null;
  setRecurrenceType: (type: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | null) => void;
  daysOfWeek: string[];
  setDaysOfWeek: React.Dispatch<React.SetStateAction<string[]>>;
  daysOfMonth: number[];
  setDaysOfMonth: React.Dispatch<React.SetStateAction<number[]>>;
  dayOfYear: string;
  setDayOfYear: (day: string) => void;
}

const RecurrenceSection: React.FC<RecurrenceSectionProps> = ({
  recurrentTask,
  setRecurrentTask,
  recurrenceType,
  setRecurrenceType,
  daysOfWeek,
  setDaysOfWeek,
  daysOfMonth,
  setDaysOfMonth,
  dayOfYear,
  setDayOfYear
}) => {
  const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

  const handleRecurrenceTypeChange = (type: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly') => {
    setRecurrenceType(type);
    setDaysOfWeek([]);
    setDaysOfMonth([]);
    setDayOfYear('');
  };

  const handleDayOfWeekChange = (day: string) => {
    setDaysOfWeek((prev: string[]) =>
      prev.includes(day) ? prev.filter((d: string) => d !== day) : [...prev, day].sort((a, b) => a.localeCompare(b))
    );
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
      <Toggle
        id="recurrentTask"
        checked={recurrentTask}
        onChange={(checked) => {
          setRecurrentTask(checked);
          if (!checked) {
            setRecurrenceType(null);
          }
        }}
        label="Recurrent Task"
      />

      {recurrentTask && (
        <div className="mt-4 space-y-4">
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(type => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="radio"
                name="recurrenceType"
                value={type}
                checked={recurrenceType === type}
                onChange={() => handleRecurrenceTypeChange(type as 'Daily' | 'Weekly' | 'Monthly' | 'Yearly')}
                className="form-radio h-4 w-4 accent-blue-600"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}

          {recurrenceType === 'Weekly' && (
            <div className="mt-4 p-3 border border-gray-300 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Select the days of the week:</p>
              <div className="flex space-x-2">
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayOfWeekChange(day)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                                ${daysOfWeek.includes(day) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                                transition-colors`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recurrenceType === 'Monthly' && (
            <div className="mt-4 p-3 border border-gray-300 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select the days of the month:</label>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setDaysOfMonth((prev: number[]) => prev.includes(day) ? prev.filter((d: number) => d !== day) : [...prev, day].sort((a, b) => a - b))}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                                ${daysOfMonth.includes(day) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                                transition-colors`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recurrenceType === 'Yearly' && (
            <div className="mt-4 p-3 border border-gray-300 rounded-lg">
              <label htmlFor="dayOfYear" className="block text-sm font-medium text-gray-700 mb-2">Select the days of the year:</label>
              <div className="relative">
                <input
                  type="date"
                  id="dayOfYear"
                  value={dayOfYear}
                  onChange={(e) => setDayOfYear(e.target.value)}
                  placeholder="Select a Day"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecurrenceSection;