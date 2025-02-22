import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface SearchStore {
  searchQuery: "" 
  setSearchQuery: (data: "") => void;
}

export const useSearch = create(
  persist<SearchStore>(
    (set, get) => ({
      searchQuery:"",
      setSearchQuery: (data: "") => {
       
        set({ searchQuery: data });
      },
      
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
