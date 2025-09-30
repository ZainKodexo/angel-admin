'use client';
import { useShallow } from 'zustand/react/shallow';
import { Modal } from '@/shared/components';
import { ModalStateVariables, useModalStore } from '@/shared/store';
import { ExampleOneModal } from './screens';
import { ReactNode } from 'react';

const modals: {
  type: ModalStateVariables['type'];
  component: () => ReactNode;
  className?: string;
}[] = [
  {
    type: 'ExampleOne',
    component: ExampleOneModal,
    /*
      *** INFO ***
      Add a className attribute with tailwind class tokens if need to add any styles
      for the modal container.
    */
  },
];

const GlobalModal = () => {
  const { currentModal, closeModal } = useModalStore(
    useShallow((state) => ({
      currentModal: state.currentModal,
      closeModal: state.closeModal,
    })),
  );

  return (
    <>
      {modals.map((modal) => {
        const Component = modal.component;
        return (
          <Modal
            isModalOpen={currentModal === modal.type}
            onClose={closeModal}
            className={modal.className}
            key={modal.type}
          >
            <Component />
          </Modal>
        );
      })}
    </>
  );
};

export { GlobalModal };
