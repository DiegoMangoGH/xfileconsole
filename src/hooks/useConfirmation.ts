import { useState } from 'react';

interface UseConfirmationReturn {
  showConfirmation: boolean;
  confirmationMessage: string;
  openConfirmation: (message: string, action: () => void) => void;
  closeConfirmation: () => void;
  confirmAction: () => void;
}

export const useConfirmation = (): UseConfirmationReturn => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const openConfirmation = (message: string, action: () => void) => {
    setConfirmationMessage(message);
    setPendingAction(() => action);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationMessage('');
    setPendingAction(null);
  };

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction();
    }
    closeConfirmation();
  };

  return {
    showConfirmation,
    confirmationMessage,
    openConfirmation,
    closeConfirmation,
    confirmAction
  };
};