import { Route, Routes } from "react-router";
import Cart from "./data/cart";
import Header from "./pages/Header";
import About from "./pages/About";
import Products from "./pages/Products";
import MyCart from "./pages/MyCart";
import { useState } from "react";


function MainApp() {
  const [cart, setCart] = useState<Cart | null>(null);
  
  return (
    <>
      <Header cart={cart!} />
      <Routes>
        <Route path="/" element={<Products cart={cart!} setCart={setCart} />} />
        <Route path="about" element={<About />} />
        <Route path="mycart" element={<MyCart />} />
      </Routes>
    </>
  )
}

export default MainApp;
