import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { get, set, del } from "idb-keyval";

import type { Position, Order } from "@/types/trade";

const PositionsStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface PositionsStore {
  positions: Position[];
  addPosition: (order: Order) => void;
  removePosition: (id: number) => void;
}

export const usePositionsStore = create<PositionsStore>()(
  persist(
    immer((set) => ({
      positions: [],
      addPosition: (order: Order) => {
        const position: Position = {
          id: order.id,
          entryPrice: order.price || (order.totalValue / parseFloat(order.amount)).toString(),
          size: order.amount,
          pnl: "0",
          type: order.type,
          mode: order.mode,
          timestamp: order.timestamp,
        };

        set((state) => {
          state.positions.push(position);
        });
      },
      removePosition: (id: number) => {
        set((state) => {
          const index = state.positions.findIndex((p) => p.id === id);

          if (index !== -1) {
            state.positions.splice(index, 1);
          }
        });
      }
    })),
    {
      name: "positions-storage",
      storage: createJSONStorage(() => PositionsStorage),
    }
  )
);
