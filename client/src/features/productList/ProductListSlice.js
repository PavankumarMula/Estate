import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByfilter,
  fetchAllProducts,
  fetchProductsBySorting,
} from "./ProductListApi";

const initialState = { products: [], error: null, loading: "idle" };

// async Function to fetch all the products
export const fetchAllProductsAsync = createAsyncThunk(
  "/api/fetchProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

// async functoin to fetch products by filtering
export const fetchFilterdProductsAsync = createAsyncThunk(
  "/product/fetchFilterd",
  async (filteredObj) => {
    const response = await fetchProductsByfilter(filteredObj);

    return response;
  }
);

export const fetchSortedProductsAsync = createAsyncThunk(
  "/product/fetchSorted",
  async (sortedObj) => {
    try {
      const response = await fetchProductsBySorting(sortedObj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const ProductListSlice = createSlice({
  name: "productList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilterdProductsAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFilterdProductsAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchFilterdProductsAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSortedProductsAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSortedProductsAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchSortedProductsAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductListSlice.reducer;
