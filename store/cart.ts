import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  id: string;
  productId: number;
  productItemId: number;
  name: string;
  imageUrl: string;
  price: number;
  size?: number | null;
  burgerType?: number | null;
  ingredientIds: number[];
  ingredientNames: string[];
  quantity: number;
}

interface CartState {
  items: CartLine[];
  addItem: (line: Omit<CartLine, "id" | "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalAmount: () => number;
  totalCount: () => number;
}

const makeKey = (l: { productItemId: number; ingredientIds: number[] }) =>
  `${l.productItemId}:${[...l.ingredientIds].sort((a, b) => a - b).join(",")}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (line) => {
        const id = makeKey(line);
        const qty = line.quantity ?? 1;
        const existing = get().items.find((i) => i.id === id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...line, id, quantity: qty }] });
        }
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
      totalAmount: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "simplefood-cart" }
  )
);
