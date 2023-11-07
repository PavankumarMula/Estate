import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "../features/productList/ProductListSlice";

const store = configureStore({
  reducer: { productList: ProductListSlice },
});

export default store;
