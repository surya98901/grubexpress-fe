import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  menuItemId: string;
  title: string;
  price: number;
  quantity: number;
  subTotal: number;
  imageURL: string;
  type: string;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  total: number;
}
const initialState: CartState = {
  items: [],
  restaurantId: null,
  total:0
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
        total : number
      }>,
    ) => {
      state.items = action.payload.items;
      state.restaurantId = action.payload.restaurantId;
      state.total = action.payload.total
    },

    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.menuItemId === action.payload.menuItemId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.subTotal += action.payload.subTotal;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
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
      const item = state.items.find(
        (item) => item.menuItemId === action.payload.menuItemId,
      );

      if (item) {
        item.quantity = action.payload.quantity;
        item.subTotal = action.payload.subTotal;
        
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.total = 0;
    },
  },
});

export const { setCart, addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
