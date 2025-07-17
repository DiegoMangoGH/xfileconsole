import React, { useState } from 'react';
import { ScheduledTask } from '../../types';
import ProviderSelect from '../ui/ProviderSelect';
import FileInput from '../ui/FileInput';
import Button from '../ui/Button';
import ProviderSummary from '../ui/ProviderSummary';
import RecurrenceSection from './components/RecurrenceSection';
import TimePicker from '../ui/TimePicker';

interface AddScheduledTaskFormProps {
  onSave: (task: ScheduledTask) => void;
  onCancel: () => void;
}

const AddScheduledTaskForm: React.FC<AddScheduledTaskFormProps> = ({ onSave, onCancel }) => {
  const [providerName, setProviderName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [processPath, setProcessPath] = useState('');
  const [taskType, setTaskType] = useState('');
  const [runProcess, setRunProcess] = useState('');
  const [localFile, setLocalFile] = useState('');
  const [remoteFile, setRemoteFile] = useState('');
  const [historyPath, setHistoryPath] = useState('');
  const [fileFilter, setFileFilter] = useState('');
  const [recurrentTask, setRecurrentTask] = useState(false);
  const [selectHour, setSelectHour] = useState('');
  const [runTimeout, setRunTimeout] = useState('');
  const [cipher, setCipher] = useState(false);

  // Recurrence states
  const [recurrenceType, setRecurrenceType] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | null>(null);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [daysOfMonth, setDaysOfMonth] = useState<number[]>([]);
  const [dayOfYear, setDayOfYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ScheduledTask = {
      id: String(Date.now()),
      provider: providerName,
      description,
      taskType,
      localFile,
      textFilter: fileFilter,
      executionTime: selectHour,
      status: true,
      recurrent: recurrentTask,
      recurrenceType: recurrentTask ? recurrenceType : undefined,
      recurrenceDetails: recurrentTask ? {
        daysOfWeek: recurrenceType === 'Weekly' ? daysOfWeek : undefined,
        dayOfMonth: recurrenceType === 'Monthly' ? daysOfMonth : undefined,
        dayOfYear: recurrenceType === 'Yearly' ? dayOfYear : undefined,
      } : undefined,
    };
    onSave(newTask);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">New Scheduled Task</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ProviderSelect
            value={providerName}
            onChange={setProviderName}
            required
          />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="New Event From Stand Alone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {providerName && <ProviderSummary providerValue={providerName} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FileInput
            value={path}
            onChange={setPath}
            label="Path"
            placeholder="Select Path"
          />
          <FileInput
            value={processPath}
            onChange={setProcessPath}
            label="Process Path"
            placeholder="/mnt/chocolate/cli"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
            <select
              id="taskType"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select Task Type</option>
              <option value="get">GET</option>
              <option value="put">PUT</option>
            </select>
          </div>
          <div>
            <label htmlFor="runProcess" className="block text-sm font-medium text-gray-700 mb-2">Run Process</label>
            <input
              type="text"
              id="runProcess"
              value={runProcess}
              onChange={(e) => setRunProcess(e.target.value)}
              placeholder="1600"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FileInput
            value={localFile}
            onChange={setLocalFile}
            label="Local File"
            placeholder="Select File"
          />
          <FileInput
            value={remoteFile}
            onChange={setRemoteFile}
            label="Remote File"
            placeholder="Select File"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FileInput
            value={historyPath}
            onChange={setHistoryPath}
            label="History Path"
            placeholder="Select File"
          />
          <FileInput
            value={fileFilter}
            onChange={setFileFilter}
            label="File Filter"
            placeholder="Select File"
          />
        </div>

        <RecurrenceSection
          recurrentTask={recurrentTask}
          setRecurrentTask={setRecurrentTask}
          recurrenceType={recurrenceType}
          setRecurrenceType={setRecurrenceType}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          daysOfMonth={daysOfMonth}
          setDaysOfMonth={setDaysOfMonth}
          dayOfYear={dayOfYear}
          setDayOfYear={setDayOfYear}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TimePicker
            label="Select Hour"
            value={selectHour}
            onChange={setSelectHour}
          />
          <div>
            <label htmlFor="runTimeout" className="block text-sm font-medium text-gray-700 mb-2">Run Timeout</label>
            <input
              type="number"
              id="runTimeout"
              value={runTimeout}
              onChange={(e) => setRunTimeout(e.target.value)}
              placeholder="1600"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="cipher" className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="cipher"
              className="w-4 h-4 border-gray-300 rounded accent-blue-600 focus:ring-blue-500"
              checked={cipher}
              onChange={(e) => setCipher(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Cipher</span>
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddScheduledTaskForm;