import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByFilter,
  fetchCategoriesApi,
  fetchBrandsApi,
  fetchProductById,
} from "./ProductListApi";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  error: null,
  loading: "idle",
  totalPages: 0,
  selectedProduct: null,
};

// async functoin to fetch products by filtering
export const fetchFilterdProductsAsync = createAsyncThunk(
  "/product/fetchFilterd",
  async ({ filterData, sortObject, pagination }) => {
    const response = await fetchProductsByFilter(
      filterData,
      sortObject,
      pagination
    );
    const { resJson, totalPages } = response;
    return { resJson, totalPages };
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "/categories",
  async () => {
    try {
      const response = await fetchCategoriesApi();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// fetching and setting up brand state
export const fetchBrandsAsync = createAsyncThunk("/brands", async () => {
  try {
    const response = await fetchBrandsApi();
    return response;
  } catch (error) {
    throw error;
  }
});

// fetching single product by id
export const fetchProductByIdAsync = createAsyncThunk(
  "/productById",
  async (productid) => {
    try {
      const response = await fetchProductById(productid);
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
      .addCase(fetchFilterdProductsAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFilterdProductsAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload.resJson;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchFilterdProductsAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      // categores builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = "Categories are pending";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state) => {
        state.error = "Some thing is wrong while fetching brands";
      })

      // brands builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.loading = "brands are pending";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state) => {
        state.error = "Some thing is wrong while fetching brands";
      })

      // fetching single product Id
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.loading = "brands are pending";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state) => {
        state.error = "Some thing is wrong while fetching brands";
      });
  },
});

export default ProductListSlice.reducer;
