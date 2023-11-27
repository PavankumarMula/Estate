import { configureStore } from "@reduxjs/toolkit";

import ProductListSlice from "../features/productList/ProductListSlice";
import createUserReducer from "../auth/AuthSlice";
import cartReducer from "../features/cart/CartSlice";

const store = configureStore({
  reducer: {
    productList: ProductListSlice,
    auth: createUserReducer,
    cart: cartReducer,
  },
});

export default store;
