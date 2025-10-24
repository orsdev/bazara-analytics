'use client';

import { LoadingButton } from '../buttons';
import { Modal } from './modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Continue',
  cancelText = 'Cancel'
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      contentClassName="pb-6 overflow-hidden z-50"
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-8 pt-6 px-6">
        <LoadingButton disabled={isLoading} variant="default" onClick={onClose}>
          {cancelText}
        </LoadingButton>
        <LoadingButton
          isLoading={isLoading}
          disabled={isLoading}
          variant="outline"
          onClick={onConfirm}
        >
          {confirmText}
        </LoadingButton>
      </div>
    </Modal>
  );
};
