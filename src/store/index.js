import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "./baseApiSlice";
import authReducer from "./authSlice";
import cartCountsReducer from "./cartCountsSlice";

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    user: authReducer,
    cartCount : cartCountsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: true,
});

export default store;
