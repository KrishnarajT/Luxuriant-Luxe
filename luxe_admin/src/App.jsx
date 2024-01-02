// this is app.js
// Author: krishnaraj Thadesar
// made for luxuriant luxe.

// react imports
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

// import components
import {Navbar} from "./components/Navbar";

// import contexts
import ThemeContextProvider from "./context/ThemeContext";
import {DBInfoContextProvider} from "./context/DBInfoContext";
import {UserContextProvider} from "./context/UserContext.jsx";
// import pages
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Emails from "./pages/Emails.jsx";
import Faqs from "./pages/Faqs.jsx";
import Categories from "./pages/Categories.jsx";
import Product from "./pages/Product.jsx";

function App() {
	const [isNavbarPresent, setisNavbarPresent] = useState(true);
	
	useEffect(() => {
		if (window.location.pathname === "/") {
			setisNavbarPresent(false);
		} else {
			setisNavbarPresent(true);
		}
	}, [isNavbarPresent]);
	
	return (
		<ThemeContextProvider>
			<DBInfoContextProvider>
				<UserContextProvider>
					<div className="">
						{isNavbarPresent ? (
							<Navbar setisNavbarPresent={setisNavbarPresent}/>
						) : null}
						<Routes>
							<Route
								path="/"
								element={
									<Login
										setisNavbarPresent={setisNavbarPresent}
									/>
								}
							/>{" "}
							<Route path="/customers" element={<Customers/>}/>
							<Route path="/orders" element={<Orders/>}/>
							<Route path="/products" element={<Products/>}/>
							<Route path="/product/:id" element={<Product/>}/>
							<Route path="/emails" element={<Emails/>}/>
							<Route path="/faqs" element={<Faqs />} />
							<Route path="/categories" element={<Categories />} />
								
						</Routes>
					</div>
				</UserContextProvider>
			</DBInfoContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
