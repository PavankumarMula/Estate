import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./auth/components/Protected";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Checkout />
              </Protected>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <Protected>
                <ProductDetailPage />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
