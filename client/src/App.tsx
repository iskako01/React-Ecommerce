import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/checkout/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Confirmation from "./pages/checkout/Confirmation";
import Header from "./components/Header";
import CartMenu from "./components/checkout/CartMenu";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <div className="app">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:itemId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<Confirmation />} />
      </Routes>
      <CartMenu />
    </div>
  );
};

export default App;
