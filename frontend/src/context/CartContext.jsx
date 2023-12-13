import {createContext, useState} from "react";

export const CartContext = createContext(undefined);

const CartContextProvider = ({children}) => {
	// find the theme value from the local storage if it exists.
	// If it doesn't exist, set it to light.
	// let local_cart = localStorage.getItem("cart");
	// console.log("local cart", local_cart)
	// console.log("local cart type", typeof local_cart)
	// if (local_cart === null) {
	// 	localStorage.setItem("cart", "[{product_id: 1, cost: 100, quantity: 1}]");
	// 	local_cart = "[{product_id: 1, cost: 100, quantity: 1}]";
	// } else {
	// 	if (local_cart === "[]") {
	// 		console.log("local cart is empty")
	// 		local_cart = [
	// 			{product_id: "654cd992ae6a271afeed6b4c", cost: 100, quantity: 1},
	// 			{product_id: "654cd992ae6a271afeed6b4d", cost: 100, quantity: 3},
	// 			{product_id: "654cd992ae6a271afeed6b4e", cost: 100, quantity: 2}
	// 		];
	// 		console.log("local cart is not empty anymore", local_cart)
	// 		localStorage.setItem("cart", local_cart);
	// 	} else {
	// 		// parse the string to a JSON object
	// 		try {
	// 			local_cart = JSON.parse(local_cart);
	// 		} catch (e) {
	// 			console.log(e);
	// 			local_cart = [
	// 				{product_id: "654cd992ae6a271afeed6b4c", cost: 100, quantity: 1},
	// 				{product_id: "654cd992ae6a271afeed6b4d", cost: 100, quantity: 3},
	// 				{product_id: "654cd992ae6a271afeed6b4e", cost: 100, quantity: 2}
	// 			];
	// 		}
	// 	}
	// }
	//
	
	const [cart, setCart] = useState([]);
	const [productInfo, setProductInfo] = useState([
		{
			product_id: "654cd992ae6a271afeed6b4c",
			product_name: "Blue Jar",
			product_image: "../../assets/images/blue.png",
			product_cost: 100
		},
		{
			product_id: "654cd992ae6a271afeed6b4e",
			product_name: "Pink Jar",
			product_image: "../../assets/images/pink.png",
			product_cost: 100
		},
		{
			product_id: "654cd992ae6a271afeed6b4d",
			product_name: "Purple Jar",
			product_image: "../../assets/images/purple.png",
			product_cost: 100
			
		},
	]);
	
	
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
		
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	
	const clearCart = () => {
		// clear the cart
		cart.splice(0, cart.length);
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	
	const getCartTotal = () => {
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[i].cost * cart[i].quantity;
		}
		return total;
	}
	
	const IncreaseProductQuantity = (product_id) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].product_id === product_id) {
				cart[i].quantity += 1;
				break;
			}
		}
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	
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
	}
	
	const getCart = () => {
		return cart;
	}
	
	return (
		<CartContext.Provider value={{
			cart, addToCart: addToCart, removeFromCart: removeFromCart, productInfo,
			clearCart: clearCart, getCartTotal: getCartTotal, IncreaseProductQuantity: IncreaseProductQuantity,
			DecreaseProductQuantity: DecreaseProductQuantity, getCart: getCart
		}}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
