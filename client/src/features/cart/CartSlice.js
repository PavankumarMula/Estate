import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTocartApi,
  fetchProductsByUserIdApi,
  updateCartApi,
  deleteItemFromCartApi,
} from "./CartApi";

// Initial state of the cart Slice
const initialState = {
  items: [],
  value: null,
  status: "idle",
  error: null,
};

// Middleware to fetch products from API
export const addToCartAsync = createAsyncThunk("/cart", async (item) => {
  const response = await addTocartApi(item);
  return response;
});

// middleware to fetchProducts By UserId when the page loads
export const fetchProductsByUserIdAsync = createAsyncThunk(
  "/fetchByUserId",
  async (userId) => {
    const response = await fetchProductsByUserIdApi(userId);
    return response;
  }
);

// middle ware to update the cart
export const updateCartAsync = createAsyncThunk(
  "/updateCart",
  async (updatedItem) => {
    const response = await updateCartApi(updatedItem);
    return response;
  }
);

// middleware to delete items in a cart
export const deleteFromCartAsync = createAsyncThunk(
  "/deleteFromCart",
  async (itemId) => {
    const response = deleteItemFromCartApi(itemId);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.status = "fulfilled";
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Failed to add items to cart";
      })

      // fetch products by UserId
      .addCase(fetchProductsByUserIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProductsByUserIdAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchProductsByUserIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Failed to add items to cart";
      })

      // update cart
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        const updatedItems = [...state.items];
        const findIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.id
        );
        updatedItems[findIndex] = action.payload;
        state.items = updatedItems;
        state.status = "fulfilled";
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Failed to add items to cart";
      })

      // delete items from cart
      .addCase(deleteFromCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
        const updateItems = [...state.items];
        const filteredItems = updateItems.filter(
          (item) => item.id !== action.payload
        );
        state.items = filteredItems;
        state.status = "fulfilled";
      })
      .addCase(deleteFromCartAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Failed to add items to cart";
      });
  },
});

export default cartSlice.reducer;
