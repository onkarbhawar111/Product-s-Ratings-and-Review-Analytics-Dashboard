import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "../features/upload/uploadSlice";
import productsReducer from "../features/products/productsSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    products: productsReducer,
    analytics: analyticsReducer,
  },
});