import { create } from "zustand";

export const useViewStore = create((set) => ({
  viewComponent: false,
  toggleView: () => set((state) => ({ viewComponent: !state.viewComponent })),
}));
