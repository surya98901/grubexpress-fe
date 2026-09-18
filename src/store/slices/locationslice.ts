import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  city: string;
}

const initialState: LocationState = {
  city: "Hyderabad",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = locationSlice.actions;

export default locationSlice.reducer;