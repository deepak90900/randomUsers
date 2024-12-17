import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";

// Redux store setup
const store = configureStore({
  reducer: {
    favorites: favoriteReducer, // Add the reducer for favorites
  },
});

// Types for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
