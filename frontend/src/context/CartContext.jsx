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
	const [SampleProducts, setSampleProducts] = useState([]);
	const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
	const [beforeCheckoutProduct, setBeforeCheckoutProduct] = useState([]);
	const [categories, setCategories] = useState([]);

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
	//     "product_category":
	// [
	// 	"hair",
	// 	"asdfaasd",
	// 	"asdf",
	// 	"asdfasd",
	// 	{
	// 		_id: "659426913d6d0c66098a62fe",
	// 		category_image: "some image",
	// 		category_description: "category_description",
	// 		sub_categories: [
	// 			{
	// 				sub_category_id: "68ecb1f5-16e4-4f9c-ac7d-08d0b7753761",
	// 				sub_category_name: "asdf",
	// 				sub_category_image: "asdf",
	// 			},
	// 		],
	// 		category_name: "hair",
	// 	},
	// 	{
	// 		_id: "6596d0118507d2288ac82287",
	// 		category_name: "skin",
	// 		category_description: "skin products",
	// 		category_image: "some image",
	// 		sub_categories: [
	// 			{
	// 				sub_category_id: "db500377-64c0-4106-ac6b-3439586334ca",
	// 				sub_category_name: "qwer",
	// 				sub_category_image: "qwer",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		_id: "6596d01b8507d2288ac82288",
	// 		category_name: "cosmetics",
	// 		category_description: "cosmetics products",
	// 		sub_categories: [
	// 			{
	// 				sub_category_id: "6cea4d8e-980b-489e-803a-c87f66c9ca80",
	// 				sub_category_name: "fghjfghj",
	// 				sub_category_image: "fghj",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		_id: "6596d0398507d2288ac82289",
	// 		category_name: "essentials",
	// 		category_description: "essentials products",
	// 		sub_categories: [],
	// 	},
	// 	{
	// 		_id: "6596d04f8507d2288ac8228b",
	// 		category_name: "holiday",
	// 		category_description: "holiday products",
	// 		sub_categories: [],
	// 	},
	// ];
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
			CosmeticsProducts.length !== 0 ||
			SampleProducts.length !== 0 ||
			currentCategoryProducts.length !== 0
		) {
			return;
		}
		// make local arrays for these categories
		let holidayProducts = [];
		let featuredProducts = [];
		let essentialsProducts = [];
		let hairProducts = [];
		let skinProducts = [];
		let cosmeticsProducts = [];
		let sampleProducts = [];
		let beforeCheckoutProducts = [];
		// loop through the products, and add them to the local array if they arent already present there.
		for (let i = 0; i < data.length; i++) {
			// only get category_name from all elements from the product_category_array
			let product_category = [];
			for (let j = 0; j < data[i].product_category.length; j++) {
				if (data[i].product_category.length !== 0) {
					product_category.push(
						data[i].product_category[j].category_name
					);
				}
			}
			// clean up product category to remove undefined things
			product_category = product_category.filter(
				(category) => category !== undefined
			);
			console.log(product_category);
			// if the product is a holiday product, add it to the holiday products array only if the holiday product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "holiday"
				)
			) {
				if (
					!holidayProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					holidayProducts.push(data[i]);
				}
			}
			// if the product is a featured product, add it to the featured products array only if the featured product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "featured"
				)
			) {
				if (
					!featuredProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					featuredProducts.push(data[i]);
				}
			}
			// if the product is a essentials product, add it to the essentials products array only if the essentials product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "essentials"
				)
			) {
				if (
					!essentialsProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					essentialsProducts.push(data[i]);
				}
			}
			// if the product is a hair product, add it to the hair products array only if the hair product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "hair"
				)
			) {
				if (
					!hairProducts.some((product) => product._id === data[i]._id)
				) {
					hairProducts.push(data[i]);
				}
			}
			// if the product is a skin product, add it to the skin products array only if the skin product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "skin"
				)
			) {
				if (
					!skinProducts.some((product) => product._id === data[i]._id)
				) {
					skinProducts.push(data[i]);
				}
			}
			// if the product is a cosmetics product, add it to the cosmetics products array only if the cosmetics product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "cosmetics"
				)
			) {
				if (
					!cosmeticsProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					cosmeticsProducts.push(data[i]);
				}
			}
			// if the product is a sample product, add it to the sample products array only if the sample product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "sample"
				)
			) {
				if (
					!sampleProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					sampleProducts.push(data[i]);
				}
			}
			// if the product is a before checkout product, add it to the before checkout products array only if the before checkout product array doesnt already have it. And make sure to ignore case
			if (
				product_category.some(
					(category) => category.toLowerCase() === "beforecheckout"
				)
			) {
				if (
					!beforeCheckoutProducts.some(
						(product) => product._id === data[i]._id
					)
				) {
					beforeCheckoutProducts.push(data[i]);
				}
			}
		}
		// set the arrays
		setHolidayProducts(holidayProducts);
		setFeaturedProducts(featuredProducts);
		setEssentialsProducts(essentialsProducts);
		setHairProducts(hairProducts);
		setSkinProducts(skinProducts);
		setCosmeticsProducts(cosmeticsProducts);
		setSampleProducts(sampleProducts);
		setBeforeCheckoutProduct(beforeCheckoutProducts);
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

	const fetchCategoriesInfo = async () => {
		await axios
			.post(`${base_url}/api/v1/Luxuriant/get_categories`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				// console.log(response);
				if (response.data.message === "Success") {
					const data = response.data.categories;
					// console.log(data);
					setCategories(data);
				} else if (response.data.message === "No Products found") {
					setCategories([]);
				}
				return response;
			})
			.catch((error) => {
				console.error(error);
			});
	};
	useEffect(() => {
		const fetchproducts = async () => {
			await fetchProductInfo();
			await fetchCategoriesInfo();
			// console.log("productInfo", productInfo);
			await segregateProducts();
			// await removeDuplicates();
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
		// removeDuplicates();
	}, []);

	const addToCart = (item) => {
		// item has the following structure:
		// {
		//     _id: 1,
		//     cost: 100,
		//     quantity: 1,
		// }
		// check if the item is already in the cart
		// card is a list
		// item is a dictionary
		// if (cart.length === 0) {
		// 	// if the cart is empty, add the item to the cart
		// 	cart.push(item);
		// } else {
		// 	// if the cart is not empty, check if the item is in the cart
		// 	let found = false;
		// 	for (let i = 0; i < cart.length; i++) {
		// 		if (cart[i]._id === item._id) {
		// 			// if the item is in the cart, increase the quantity
		// 			cart[i].quantity += 1;
		// 			found = true;
		// 			break;
		// 		}
		// 	}
		// 	if (!found) {
		// 		// if the item is not in the cart, add the item to the cart
		// 		cart.push(item);
		// 	}
		// }
		// setCart(cart);
		// // set the cart in the local storage
		// localStorage.setItem("cart", JSON.stringify(cart));
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
				if (cart[i]._id === item._id) {
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

	const IncreaseProductQuantity = (_id) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i]._id === _id) {
				cart[i].quantity += 1;
				break;
			}
		}
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
		setCart(cart);
	};

	const DecreaseProductQuantity = (_id) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i]._id === _id) {
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
				SampleProducts,
				setSampleProducts,
				setCurrentCategoryProducts,
				currentCategoryProducts,
				beforeCheckoutProduct,
				categories,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
