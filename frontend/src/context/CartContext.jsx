import axios from "axios";
import { createContext, useState, useEffect } from "react";
import React from "react";
import { BaseUrlContext } from "./BaseUrlContext";

export const CartContext = createContext(undefined);

const CartContextProvider = ({ children }) => {
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [cart, setCart] = useState([]);
	const [productInfo, setProductInfo] = useState([]);

	useEffect(() => {
		const fetchProductInfo = async () => {
			let response = await axios
				.post(`${base_url}/api/v1/Luxuriant/get_products`, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					return response;
				})
				.catch((error) => {
					console.error(error);
					alert(
						"server not running! a simulated response is being sent"
					);
					return {
						data: {
							message: "simulation",
						},
					};
				});
			console.log(response.data);
			console.log(response);
			if (response.data.message === "Success") {
				const data = response.data.products;
				console.log(data);
				setProductInfo(data);
			} else if (response.data.message === "No Products found") {
				setProductInfo([]);
			}
		};

		fetchProductInfo();
	}, []);

	const addToCart = (item) => {
		// item has the following structure:
		// {
		//     product_id: 1,
		//     cost: 100,
		//     quantity: 1,
		// }

		// check if the item is already in the cart
		// card is a list
		// item is a dictionary

		if (cart.length === 0) {
			// if the cart is empty, add the item to the cart
			cart.push(item);
		} else {
			// if the cart is not empty, check if the item is in the cart
			let found = false;
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].product_id === item.product_id) {
					// if the item is in the cart, increase the quantity
					cart[i].quantity += 1;
					found = true;
					break;
				}
			}
			if (!found) {
				// if the item is not in the cart, add the item to the cart
				cart.push(item);
			}
		}
		setCart(cart);
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
	};

	const removeFromCart = (item) => {
		// item has the following structure:
		// {
		//     id: 1,
		//     name: "Product 1",
		//     price: 100,
		//     quantity: 1,
		// }

		// check if the item is already in the cart
		// card is a list
		// item is a dictionary

		if (cart.length === 0) {
			return;
			// if the cart is empty, do nothing
		} else {
			// if the cart is not empty, check if the item is in the cart
			let found = false;
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].product_id === item.product_id) {
					// if the item is in the cart, decrease the quantity
					cart[i].quantity -= 1;
					if (cart[i].quantity === 0) {
						// if the quantity is 0, remove the item from the cart
						cart.splice(i, 1);
					}
					found = true;
					break;
				}
			}
			if (!found) {
				// if the item is not in the cart, do nothing
			}
		}
		setCart(cart);
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
	};

	const clearCart = () => {
		// clear the cart
		cart.splice(0, cart.length);
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
		setCart(cart);
	};

	const getCartTotal = () => {
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[i].cost * cart[i].quantity;
		}
		return total;
	};

	const IncreaseProductQuantity = (product_id) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].product_id === product_id) {
				cart[i].quantity += 1;
				break;
			}
		}
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
		setCart(cart);
	};

	const DecreaseProductQuantity = (product_id) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].product_id === product_id) {
				cart[i].quantity -= 1;
				if (cart[i].quantity === 0) {
					// if the quantity is 0, remove the item from the cart
					cart.splice(i, 1);
				}
				break;
			}
		}
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
		setCart(cart);
	};

	const getCart = () => {
		return cart;
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart: addToCart,
				removeFromCart: removeFromCart,
				productInfo,
				clearCart: clearCart,
				getCartTotal: getCartTotal,
				IncreaseProductQuantity: IncreaseProductQuantity,
				DecreaseProductQuantity: DecreaseProductQuantity,
				getCart: getCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
