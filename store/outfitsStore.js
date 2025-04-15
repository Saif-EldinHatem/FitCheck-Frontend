import { create } from "zustand";

export const useOutfitsSore = create((set) => ({
  isHidden: true,
  setIsHidden: () => {
    set((state) => ({
      isHidden: false,
    }));
  },
}));
