import { create } from "zustand";

export const useFilterStore = create((set) => ({
  wardrobeFilter: [],
  subFilters: {
    Occasion: [],
    Category: [],
    Color: [],
    Season: [],
  },
  setSubFilter: (key, newList) =>
    set((state) => ({
      subFilters: {
        ...state.subFilters,
        [key]: newList,
      },
    })),
  pushList: (subList) =>
    set((state) => ({ wardrobeFilter: [...state.wardrobeFilter, ...subList] })),
}));
