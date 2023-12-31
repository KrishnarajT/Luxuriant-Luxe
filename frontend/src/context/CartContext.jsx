import axios from "axios";
import { createContext, useState, useEffect } from "react";
import React from "react";
import { BaseUrlContext } from "./BaseUrlContext";

export const CartContext = createContext(undefined);

const CartContextProvider = ({ children }) => {
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [cart, setCart] = useState([]);
	const [productInfo, setProductInfo] = useState([]);
	const [HairProducts, setHairProducts] = useState([]);
	const [SkinProducts, setSkinProducts] = useState([]);
	const [CosmeticsProducts, setCosmeticsProducts] = useState([]);
	const [HolidayProducts, setHolidayProducts] = useState([]);
	const [FeaturedProducts, setFeaturedProducts] = useState([]);
	const [EssentialsProducts, setEssentialsProducts] = useState([]);

	// product info is a list of objects like these.
	// 	{
	//     "_id": "654cd992ae6a271afeed6b4e",
	//     "product_name": "Product Name 2",
	//     "product_cost": 100,
	//     "product_image_links": {
	//         "description_images": [
	//             "https://i.imgur.com/CXToepvh.pnghttps://i.imgur.com/9fCsEDah.png",
	//             "https://i.imgur.com/Y0axnEdh.png",
	//             "https://i.imgur.com/h9ro4hNh.png",
	//             "https://i.imgur.com/ZrHcLSBh.png",
	//             "https://i.imgur.com/HGtISq0h.png",
	//             "https://i.imgur.com/jxbpxRgh.png",
	//             "https://i.imgur.com/UcwrTi6h.png",
	//             "https://i.imgur.com/kpXJbXhh.png",
	//             "https://i.imgur.com/E5NqNVRh.png"
	//         ],
	//         "real_results_images": [
	//             "image1",
	//             "image2"
	//         ],
	//         "how_to_use_images": [
	//             "image1",
	//             "image2"
	//         ]
	//     },
	//     "product_category": [
	//         "Product Category",
	//         "Product Category 2"
	//     ],
	//     "product_quantity": 100,
	//     "product_description": {
	//         "product_description": "this is pink jar",
	//         "real_results_description": "real results are so and so",
	//         "how_to_use_description": "how to use the product. "
	//     },
	//     "points_awarded": 500
	// }
	const segregateProducts = async (data) => {
		// if no data return
		if (data === undefined) {
			return;
		}
		// if any of the other products list exists, then return
		if (
			HolidayProducts.length !== 0 ||
			FeaturedProducts.length !== 0 ||
			EssentialsProducts.length !== 0 ||
			HairProducts.length !== 0 ||
			SkinProducts.length !== 0 ||
			CosmeticsProducts.length !== 0
		) {
			return;
		}
		for (let i = 0; i < data.length; i++) {
			const categories = data[i].product_category;
			// convert all categories to lowercase
			for (let j = 0; j < categories.length; j++) {
				categories[j] = categories[j].toLowerCase();
			}
			console.log(categories);
			if (categories.includes("holiday")) {
				// make sure that the product is not already in the list
				if (
					!HolidayProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					setHolidayProducts((oldArray) => [...oldArray, data[i]]);
				}
			}
			if (categories.includes("featured")) {
				// make sure that the product is not already in the list
				if (
					!FeaturedProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					setFeaturedProducts((oldArray) => [...oldArray, data[i]]);
				}
			}
			if (categories.includes("essentials")) {
				// make sure the product is not already in the list
				if (
					!EssentialsProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					setEssentialsProducts((oldArray) => [...oldArray, data[i]]);
				}
			}
			if (categories.includes("hair")) {
				console.log("found a product with hair");
				if (
					!HairProducts.some((product) => product._id === data[i]._id)
				) {
					setHairProducts((oldArray) => [...oldArray, data[i]]);
				}
			}
			if (categories.includes("skin")) {
				if (
					!SkinProducts.some((product) => product._id === data[i]._id)
				) {
					setSkinProducts((oldArray) => [...oldArray, data[i]]);
				}
			}
			if (categories.includes("cosmetics")) {
				console.log("found a product with cosmetics", i);
				if (
					!CosmeticsProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					setCosmeticsProducts((oldArray) => [...oldArray, data[i]]);
				}
			}
		}
	};

	const fetchProductInfo = async () => {
		await axios
			.post(`${base_url}/api/v1/Luxuriant/get_products`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				// console.log(response);
				if (response.data.message === "Success") {
					const data = response.data.products;
					// console.log(data);
					setProductInfo(data);
					segregateProducts(data);
				} else if (response.data.message === "No Products found") {
					setProductInfo([]);
				}
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				return {
					data: {
						message: "simulation",
					},
				};
			});
	};
	useEffect(() => {
		const fetchproducts = async () => {
			await fetchProductInfo();
			// console.log("productInfo", productInfo);
			await segregateProducts();
			// log the segregated products
			// console.log("HolidayProducts", HolidayProducts);
			// console.log("FeaturedProducts", FeaturedProducts);
			// console.log("EssentialsProducts", EssentialsProducts);
			// console.log("HairProducts", HairProducts);
			// console.log("SkinProducts", SkinProducts);
			// console.log("CosmeticsProducts", CosmeticsProducts);
			// // all products
			// console.log("productInfo", productInfo);
		};
		fetchproducts();
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
				HolidayProducts,
				FeaturedProducts,
				EssentialsProducts,
				HairProducts,
				SkinProducts,
				CosmeticsProducts,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
