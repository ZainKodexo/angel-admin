import { create } from 'zustand';

type LayoutStore = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const useLayoutStore = create<LayoutStore>((set, get) => ({
  isSidebarCollapsed: false,

  toggleSidebar: () => {
    const { isSidebarCollapsed } = get();

    set({
      isSidebarCollapsed: !isSidebarCollapsed,
    });
  },
}));

export { useLayoutStore };
