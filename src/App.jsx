import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./Data/Products/Products.jsx";
import { UserProvider } from "./Data/Users/Users.jsx";
import Product from "./pages/Product/Product.jsx";
import Account from "./pages/Account/Account.jsx";
import { BasketProvider } from "./Data/Basket/Basket.jsx";
import Cart from "./pages/Cart/Cart.jsx";

function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <BasketProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productTitle" element={<Product />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
			<Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BasketProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;
