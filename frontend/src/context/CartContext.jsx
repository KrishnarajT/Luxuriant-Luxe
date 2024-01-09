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
	const [currentCustomerPoints, setCurrentCustomerPoints] = useState(0);
	const [discountedTotal, setDiscountedTotal] = useState(0);
	const [staticStuff, setStaticStuff] = useState([]);

	// Product looks like this
	// {
	//     "_id": "6595006375792d7d0086f66e",
	//     "product_name": "reviewtest",
	//     "product_description": {
	//         "product_description": "",
	//         "real_results_description": "",
	//         "how_to_use_description": ""
	//     },
	//     "product_cost": 0,
	//     "product_image_links": {
	//         "description_images": [],
	//         "real_results_images": [],
	//         "how_to_use_images": []
	//     },
	//     "product_category": [
	//         "hair",
	//         "asdfaasd",
	//         "asdf",
	//         "asdfasd"
	//     ],
	//     "selected_quantity": 0,
	//     "points_awarded": 0,
	//     "shades_present": false,
	//     "volumes_present": false,
	//     "product_shades": [
	//         {
	//             "shade_index": 0,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         },
	//         {
	//             "shade_index": 1,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         },
	//         {
	//             "shade_index": 2,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         },
	//         {
	//             "shade_index": 3,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         },
	//         {
	//             "shade_index": 4,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         },
	//         {
	//             "shade_index": 5,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         },
	//         {
	//             "shade_index": 6,
	//             "shade_name": "",
	//             "shade_image": "",
	//             "shade_number": 0,
	//             "shade_color": ""
	//         }
	//     ],
	//     "product_volumess": [
	//         {
	//             "volume_index": 0,
	//             "volume": 0,
	//             "volume_cost": 0
	//         },
	//         {
	//             "volume_index": 1,
	//             "volume": 0,
	//             "volume_cost": 0
	//         },
	//         {
	//             "volume_index": 2,
	//             "volume": 0,
	//             "volume_cost": 0
	//         },
	//         {
	//             "volume_index": 3,
	//             "volume": 0,
	//             "volume_cost": 0
	//         }
	//     ],
	//     "product_reviews": [
	//         {
	//             "review": "this is a good product",
	//             "rating": "3",
	//             "username": "aweradf",
	//             "review_date": "2024-01-24",
	//             "_id": "92082344-c831-4bb8-b02a-8037f094350d",
	//             "visible": true
	//         },
	//         {
	//             "review": "",
	//             "rating": 0,
	//             "username": "",
	//             "review_date": "1/3/2024",
	//             "_id": "5413770c-1d16-4ab4-b450-87c90e1e7070"
	//         }
	//     ],
	//     "product_ingredients": "somthing, something else, something again. "
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
			// console.log(product_category);
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
					console.log(response.data);
					setProductInfo(data);
					// static stuff is an array of these objects
					//           {
					//     "_id": "659d7b4031579496795b8138",
					//     "key": "home_page_startup_image",
					//     "value": "https://i.imgur.com/pdweNpuh.png"
					// }
					// convert static stuff into an object with key as key and vlaue as value
					let static_stuff_object = {};
					for (
						let i = 0;
						i < response.data.static_stuff.length;
						i++
					) {
						static_stuff_object[response.data.static_stuff[i].key] =
							response.data.static_stuff[i].value;
					}
					console.log(static_stuff_object);
					setStaticStuff(static_stuff_object);
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

	const addToCart = (
		item_id,
		selectedProductCost = null,
		selectedVolume = null,
		selectedProductShade = null
	) => {
		// get the item from the productInfo
		let item = {};
		for (let i = 0; i < productInfo.length; i++) {
			if (productInfo[i]._id === item_id) {
				item = productInfo[i];
				break;
			}
		}
		if (selectedProductCost !== null) {
			item.product_cost = selectedProductCost;
		}
		if (selectedVolume !== null) {
			item.selected_volume = selectedVolume;
		} else {
			if (item.volume_present) {
				item.selected_volume = item.product_volumes[0].volume;
			} else {
				item.selected_volume = null;
			}
		}
		if (selectedProductShade !== null) {
			if (item.shades_present) {
				item.selected_shade = selectedProductShade;
			} else {
				item.selected_shade = null;
			}
		} else {
			item.selected_shade = null;
		}
		// check if item is already in cart
		if (cart.length === 0) {
			// if the cart is empty, add the item to the cart
			item.selected_quantity = 1;
			cart.push(item);
		} else {
			// if the cart is not empty, check if the item is in the cart
			let found = false;
			for (let i = 0; i < cart.length; i++) {
				if (cart[i]._id === item._id) {
					// if the item is in the cart, increase the quantity
					cart[i].selected_quantity += 1;
					found = true;
					break;
				}
			}
			if (!found) {
				// if the item is not in the cart, add it to the cart
				item.selected_quantity = 1;
				cart.push(item);
			}
		}

		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
		setCart(cart);
	};

	const removeFromCart = (item_id) => {
		let item = {};
		for (let i = 0; i < productInfo.length; i++) {
			if (productInfo[i]._id === item_id) {
				item = productInfo[i];
				break;
			}
		}
		// check if the item is in the cart
		for (let i = 0; i < cart.length; i++) {
			if (cart[i]._id === item._id) {
				// if the item is in the cart, remove it from the cart
				cart.splice(i, 1);
				break;
			}
		}
		// set the cart in the local storage
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
			total += cart[i].selected_quantity * cart[i].product_cost;
		}
		return total;
	};

	const getDiscountedTotal = () => {
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[i].selected_quantity * cart[i].product_cost;
		}
		return total - currentCustomerPoints / 10;
	};
	const IncreaseProductQuantity = (_id) => {
		let product_exists = false;
		for (let i = 0; i < cart.length; i++) {
			if (cart[i]._id === _id) {
				cart[i].selected_quantity += 1;
				product_exists = true;
				break;
			}
		}
		// if product is not there, add it
		if (!product_exists) {
			addToCart(_id);
		}
		// set the cart in the local storage
		localStorage.setItem("cart", JSON.stringify(cart));
		setCart(cart);
	};

	const DecreaseProductQuantity = (_id) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i]._id === _id) {
				cart[i].selected_quantity -= 1;
				if (cart[i].selected_quantity === 0) {
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

	const getCartPoints = () => {
		let points = 0;
		for (let i = 0; i < cart.length; i++) {
			points += cart[i].selected_quantity * cart[i].points_awarded;
		}
		return points;
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
				currentCustomerPoints,
				setCurrentCustomerPoints,
				getDiscountedTotal,
				getCartPoints,
				staticStuff,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
