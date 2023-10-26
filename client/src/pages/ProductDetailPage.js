import React from "react";
import ProductDetail from "../features/productList/ProductDetails";
import NavBar from "../features/NavBar/NavBar";

const ProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <ProductDetail />
      </NavBar>
    </div>
  );
};

export default ProductDetailPage;
