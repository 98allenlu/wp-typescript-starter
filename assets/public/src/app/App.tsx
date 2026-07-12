import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext";
import Home from "@/app/pages/Home";
import Shop from "@/app/pages/Shop";
import Research from "@/app/pages/Research";
import About from "@/app/pages/About";
import Article from "@/app/pages/Article";
import Cart from "@/app/pages/Cart";
import Checkout from "@/app/pages/Checkout";
import Search from "@/app/pages/Search";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen font-sans text-foreground bg-background">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:slug" element={<Article />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/:category/:subslug" element={<Article />} />
              <Route path="/research/:slug" element={<Article />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
              <Route path="/shop/*" element={<Shop />} />
              <Route path="/research/*" element={<Research />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
