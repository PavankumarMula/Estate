import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "../features/productList/ProductListSlice";
import createUserReducer from "../auth/AuthSlice";

const store = configureStore({
  reducer: { productList: ProductListSlice, auth: createUserReducer },
});

export default store;
