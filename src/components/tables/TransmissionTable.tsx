import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check, ArrowRight } from 'lucide-react';
import { Transmission } from '../../types';
import SearchInput from '../ui/SearchInput';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import { filterBySearchTerm } from '../../utils/filterUtils';

interface TransmissionTableProps {
  transmissions: Transmission[];
  onAddTransmission?: () => void;
  title?: string;
  subtitle?: string;
  showAddButton?: boolean;
  onRowClick?: (transmission: Transmission) => void;
}

const TransmissionTable: React.FC<TransmissionTableProps> = ({
  transmissions,
  onAddTransmission,
  title = "Transmissions",
  subtitle = "List of Transmissions",
  showAddButton = true,
  onRowClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransmissions = filterBySearchTerm(transmissions, searchTerm);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      <div className="flex items-center justify-between mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter transmissions..."
        />
        {showAddButton && onAddTransmission && (
          <Button onClick={onAddTransmission} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Transmission</span>
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Sent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transmission Hour</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin Node</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destiny Node</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zipped</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            className="bg-white divide-y divide-gray-200"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
          >
            {filteredTransmissions.length > 0 ? (
              filteredTransmissions.map((transmission) => (
                <motion.tr
                  key={transmission.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onRowClick && onRowClick(transmission)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transmission.fileSent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transmission.fileSize}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transmission.transmissionHour}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transmission.originNode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transmission.destinyNode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transmission.zipped ? (
                      <X className="h-4 w-4 text-red-500" />
                    ) : (
                      <Check className="h-4 w-4 text-gray-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transmission.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No transmissions found matching your criteria.
                </td>
              </motion.tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default TransmissionTable;