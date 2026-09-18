import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import locationReducer from "./slices/locationslice";

const storage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedLocationReducer = persistReducer(
  persistConfig,
  locationReducer
);

export const Store = configureStore({
  reducer: {
    location: persistedLocationReducer,
  },
});

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;