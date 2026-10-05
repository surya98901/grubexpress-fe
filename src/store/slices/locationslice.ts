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
    removeCity: (state) => {
      state.city = "";
    }
  },
});

export const { setCity, removeCity } = locationSlice.actions;

export default locationSlice.reducer;