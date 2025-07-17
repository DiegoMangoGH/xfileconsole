import React, { useState } from 'react';
import { Send, ArrowDownToLine, FileDown, FileUp } from 'lucide-react';
import { Transmission } from '../../types';
import TransmissionTable from '../tables/TransmissionTable';
import TransmissionDetailsModal from '../modals/TransmissionDetailsModal';
import { filterTransmissionsByType } from '../../utils/filterUtils';

interface TransmissionMethodCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
  description: string;
  onClick: (method: string) => void;
  isSelected: boolean;
}

const TransmissionMethodCard: React.FC<TransmissionMethodCardProps> = ({
  title,
  count,
  icon: Icon,
  description,
  onClick,
  isSelected
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 flex flex-col items-start justify-between transition-all duration-200 cursor-pointer
                  ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg hover:scale-[1.02]'}`}
      onClick={() => onClick(title)}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className="text-blue-600 bg-blue-50 p-3 rounded-full">
          <Icon size={24} />
        </div>
        <p className="text-3xl font-extrabold text-gray-900">{count}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

interface TransmissionMethodsViewProps {
  allTransmissions: Transmission[];
  onReexecuteTransmission: (transmission: Transmission) => void;
}

const TransmissionMethodsView: React.FC<TransmissionMethodsViewProps> = ({
  allTransmissions,
  onReexecuteTransmission
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | null>(null);

  const handleCardClick = (method: string) => {
    setSelectedMethod(prevMethod => (prevMethod === method ? null : method));
  };

  const handleRowClick = (transmission: Transmission) => {
    setSelectedTransmission(transmission);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTransmission(null);
  };

  const getFilteredTransmissions = () => {
    if (!selectedMethod) return [];
    return filterTransmissionsByType(allTransmissions, selectedMethod);
  };

  const filteredTransmissions = getFilteredTransmissions();

  const transmissionMethods = [
    {
      title: "Method Get",
      count: filterTransmissionsByType(allTransmissions, "Method Get").length,
      icon: ArrowDownToLine,
      description: "Files received from internal systems."
    },
    {
      title: "Method Put",
      count: filterTransmissionsByType(allTransmissions, "Method Put").length,
      icon: Send,
      description: "Files placed into external destinations."
    },
    {
      title: "Method Get Extern",
      count: filterTransmissionsByType(allTransmissions, "Method Get Extern").length,
      icon: FileDown,
      description: "Files retrieved from external sources."
    },
    {
      title: "Method Put Extern",
      count: filterTransmissionsByType(allTransmissions, "Method Put Extern").length,
      icon: FileUp,
      description: "Files uploaded to external systems."
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Transmission Methods Overview</h1>
      <p className="text-gray-600 mb-8">A summary of file transmission activities by method. Click a card to view details.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {transmissionMethods.map((method) => (
          <TransmissionMethodCard
            key={method.title}
            title={method.title}
            count={method.count}
            icon={method.icon}
            description={method.description}
            onClick={handleCardClick}
            isSelected={selectedMethod === method.title}
          />
        ))}
      </div>

      {selectedMethod && (
        <div className="mt-12">
          <TransmissionTable
            transmissions={filteredTransmissions}
            title={`Transmissions ${selectedMethod}`}
            subtitle="Filtered list based on selected method"
            showAddButton={false}
            onRowClick={handleRowClick}
          />
        </div>
      )}

      <TransmissionDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        transmission={selectedTransmission}
        onReexecute={onReexecuteTransmission}
      />
    </div>
  );
};

export default TransmissionMethodsView;