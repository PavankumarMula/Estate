import React from "react";
import NavBar from "../features/NavBar/NavBar";
import ProductList from "../features/productList/ProductList";

const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList />
      </NavBar>
    </div>
  );
};

export default Home;
