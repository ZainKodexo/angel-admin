import { create } from 'zustand';

type ModalStateVariables = {
  type: 'ExampleOne';
};

type State = {
  currentModal?: ModalStateVariables['type'];
};

type Actions = {
  openModal: (data: ModalStateVariables) => void;
  closeModal: () => void;
};

const useModalStore = create<State & Actions>((set) => ({
  closeModal: () => set({ currentModal: undefined }),
  openModal: (nextStep: ModalStateVariables) =>
    set({ currentModal: nextStep.type }),

  currentModal: undefined,
  languageSelectedId: undefined,
}));

export type { ModalStateVariables };
export { useModalStore };
