import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  menuItemId: string;
  quantity: number;
  subTotal: number;
}

interface CartState {
  itemsList: CartItem[];
  restaurantId: string | null;
}

const initialState: CartState = {
  itemsList: [],
  restaurantId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (
      state,
      action: PayloadAction<{
        items: CartItem[];
        restaurantId: string | null;
      }>,
    ) => {
      state.itemsList = action.payload.items;
      state.restaurantId = action.payload.restaurantId;
    },

    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.itemsList.find(
        (item) => item.menuItemId === action.payload.menuItemId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.subTotal += action.payload.subTotal;
      } else {
        state.itemsList.push(action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.itemsList = state.itemsList.filter(
        (item) => item.menuItemId !== action.payload,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        menuItemId: string;
        quantity: number;
        subTotal: number;
      }>,
    ) => {
      const item = state.itemsList.find(
        (item) => item.menuItemId === action.payload.menuItemId,
      );

      if (item) {
        item.quantity = action.payload.quantity;
        item.subTotal = action.payload.subTotal;
      }
    },

    clearCart: (state) => {
      state.itemsList = [];
      state.restaurantId = null;
    },
  },
});

export const { setCart, addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
