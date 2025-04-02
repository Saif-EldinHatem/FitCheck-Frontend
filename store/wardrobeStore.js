import { create } from "zustand";

export const useWardrobeStore = create((set) => ({
  wardrobeItems: [],
  setWardrobeItems: (newItems) => set((state) => ({ wardrobeItems: newItems })),
}));
