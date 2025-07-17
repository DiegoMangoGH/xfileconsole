import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Transmission } from '../../types';
import TransmissionTable from '../tables/TransmissionTable';
import { isDateInRange } from '../../utils/dateUtils';

interface TransmissionHistoryViewProps {
  allTransmissions: Transmission[];
  onRowClick: (transmission: Transmission) => void;
}

const TransmissionHistoryView: React.FC<TransmissionHistoryViewProps> = ({ 
  allTransmissions, 
  onRowClick 
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransmissions = allTransmissions.filter(transmission => 
    isDateInRange(transmission.transmissionDate, startDate, endDate)
  );

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Transmission History</h1>
        <p className="text-gray-600 mb-8">View historical transmission data with date range filtering.</p>

        <div className="flex items-end space-x-4 mb-8">
          <div className="relative flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={() => { setStartDate(''); setEndDate(''); }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <TransmissionTable
        transmissions={filteredTransmissions}
        title="Filtered Transmissions"
        subtitle="Results based on selected date range"
        showAddButton={false}
        onRowClick={onRowClick}
      />
    </>
  );
};

export default TransmissionHistoryView;