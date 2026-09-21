import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface serviceState {
  serviceType: string;
}

const initialState: serviceState = {
  serviceType: "dine-out",
};

const serviceSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setServiceType: (state, action: PayloadAction<string>) => {
      state.serviceType = action.payload;
    },
  },
});

export const { setServiceType } = serviceSlice.actions;

export default serviceSlice.reducer;