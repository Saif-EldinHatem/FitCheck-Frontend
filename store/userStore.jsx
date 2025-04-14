import { create } from "zustand";

export const useUserStore = create((set) => ({
  Email: null,
  FirstName: null,
  LastName: null,
  Result: null,
  UserID: null,
  verified: null,
  setUser: ({ Email, FirstName, LastName, Result, UserID, verified }) => {
    set({
      Email,
      FirstName,
      LastName,
      Result,
      UserID,
      verified,
    });
  },
  verify: () => {
    set((state) => ({
      ...state,
      verified: true,
    }));
  },
  removeUser: () => {
    set({
      Email: null,
      FirstName: null,
      LastName: null,
      Result: null,
      UserID: null,
      verified: null,
    });
  },
}));
