// this is app.js
// Author: krishnaraj Thadesar
// made for luxuriant luxe.

// react imports
import { Route, Routes } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

// import components
import { Navbar } from "./components/Navbar";

// import contexts
import ThemeContextProvider from "./context/ThemeContext";
import CartContextProvider from "./context/CartContext";

// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Catalogue from "./pages/Catalogue";
import Category from "./pages/Category";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";
import SideCart from "./pages/SideCart";
import SubCategory from "./pages/SubCategory";
function App() {
	const [isNavbarPresent, setisNavbarPresent] = useState(true);

	useEffect(() => {
		console.log(isNavbarPresent);
	}, [isNavbarPresent]);

	return (
		<ThemeContextProvider>
			<CartContextProvider>
				<div className="">
					<Toaster />
					{isNavbarPresent ? (
						<Navbar setisNavbarPresent={setisNavbarPresent} />
					) : null}
					<SideCart />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/category/:type" element={<Category />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/sub_category" element={<SubCategory />} />
					</Routes>
				</div>
			</CartContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
