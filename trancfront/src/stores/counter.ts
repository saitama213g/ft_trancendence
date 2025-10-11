import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (count: number) => void;
};

export const useBearCreator = create<BearState>()(
    persist((set) => ({
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
        updateBears: (newBears) => set({ bears: newBears }),
    }), {
        name: 'bear-storage', // unique name
    })
);
