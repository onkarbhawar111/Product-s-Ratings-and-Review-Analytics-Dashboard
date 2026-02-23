import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAll",
  async () => {
    const [cat, top, discount, avg] = await Promise.all([
      api.get("/analytics/products-per-category"),
      api.get("/analytics/top-reviewed-products"),
      api.get("/analytics/discount-distribution"),
      api.get("/analytics/category-average-rating"),
    ]);

    return {
      categoryData: cat.data,
      topProducts: top.data,
      discountData: discount.data,
      avgRating: avg.data,
    };
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    loading: false,
    data: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch analytics";
      });
  },
});

export default analyticsSlice.reducer;