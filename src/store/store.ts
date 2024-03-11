import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productsSlice from "./products/productsSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    productsSlice: productsSlice,
    cartSlice: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// In your store file (e.g., store.ts)
export type AppDispatch = typeof store.dispatch;

export default store;
