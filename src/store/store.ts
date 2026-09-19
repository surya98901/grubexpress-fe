import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import locationReducer from "./slices/locationslice";
import serviceReducer from "./slices/serviceSlice"

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

const locationPersistConfig = {
  key: "location",
  storage,
};
const servicePersistConfig = {
  key: "service",
  storage,
};

const persistedLocationReducer = persistReducer(
  locationPersistConfig,
  locationReducer
);
const persistedServiceReducer = persistReducer(
 servicePersistConfig,
  serviceReducer
);

export const Store = configureStore({
  reducer: {
    location: persistedLocationReducer,
    service : persistedServiceReducer,
  },
});

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;