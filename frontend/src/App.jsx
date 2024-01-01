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
import Cart from "./pages/Cart";
import Catalogue from "./pages/Catalogue";
import Category from "./pages/Category";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";
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
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/catalogue" element={<Catalogue />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/category/:type" element={<Category />} />
						<Route path="/product/:id" element={<Product />} />
					</Routes>
				</div>
			</CartContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
