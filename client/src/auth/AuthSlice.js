import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserApi, checkUserApi } from "./AuthApi";

// intial state
const initialState = {
  status: "idle",
  isUserLoggedIn: false,
  error: null,
  newUser: null,
};

// async thunk middleware to create User
export const createUserAsync = createAsyncThunk(
  "/createUser",
  async (userData) => {
    try {
      const response = await createUserApi(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const checkUserAsync = createAsyncThunk("/checkUser", async (data) => {
  try {
    const response = await checkUserApi(data);
    return response;
  } catch (error) {
    throw error;
  }
});

const createUser = createSlice({
  name: "userRegistration",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.newUser = action.payload;
        state.status = "fulfilled";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = action.error.message;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.isUserLoggedIn = action.payload;
        state.status = "fulfilled";
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default createUser.reducer;
