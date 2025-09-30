import { twMerge } from 'tailwind-merge';

import { Dialog, DialogContent } from './Dialog';

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isModalOpen, onClose, children, className }: ModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} modal>
      <DialogContent className={twMerge('max-w-lg rounded-3xl', className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
