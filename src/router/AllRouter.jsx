import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/HomePage/Home";
import Products from "../components/ProductsPage/Products";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

function AllRouter() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default AllRouter;
