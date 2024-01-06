// this is the content of the side cart, and the cart shown on the checkout page. it is independent and takes its data from contexts.

import React from "react";
import { useState } from "react";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";
import {
	IconCurrencyRupee,
	IconMinus,
	IconPlus,
	IconStarFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { MiniDisplayCarousal } from "../components/ui/MiniDisplayCarousal";
let isValidHttpUrl = (string) => {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
};
const random_image_link = "https://source.unsplash.com/random";
const Cart = () => {
	const navigate = useNavigate();
	const [randomImageToDisplayTop, setRandomImageToDisplayTop] = useState(0);
	const [sampleCount, setSampleCount] = useState(0);
	const [counter, setCounter] = useState(0);
	console.log("hi");
	const [Cart, setCart] = useState([]);
	let [drawer_check_button_checked, setDrawerCheckButtonChecked] =
		React.useState(undefined);
	let {
		addToCart,
		removeFromCart,
		clearCart,
		getCartTotal,
		productInfo,
		IncreaseProductQuantity,
		DecreaseProductQuantity,
		SampleProducts,
		EssentialsProducts,
		beforeCheckoutProduct,
		getCart,
		cart,
		currentCustomerPoints,
		getDiscountedTotal,
		getCartPoints,
	} = React.useContext(CartContext);

	function checkIfSample(product) {
		let is_sample = false;
		if (product.product_category) {
			// flatten the array
			for (let i = 0; i < product.product_category.length; i++) {
				if (product.product_category[i].category_name === "sample") {
					is_sample = true;
					break;
				}
			}
		}
		console.log(product, is_sample);
		return is_sample;
	}
	const [cartTotal, setCartTotal] = useState(0);
	useEffect(() => {
		let drawer_check_element = document.getElementById("my-drawer");
		setDrawerCheckButtonChecked(drawer_check_element);
	}, [drawer_check_button_checked]);

	useEffect(() => {
		// set interval to check if the drawer is open or not
		// if the drawer is open, then check if the cart is empty or not
		let interval = setInterval(() => {
			if (drawer_check_button_checked === undefined) {
				let drawer_check_element = document.getElementById("my-drawer");
				setDrawerCheckButtonChecked(drawer_check_element);
				setCounter((counter) => counter + 1);
			} else {
				setCart(cart);
				console.log("cart total", getCartTotal());
				setCartTotal(getCartTotal());
				console.log("checked", cart);
				setCounter((counter) => counter + 1);
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [counter]);

	useEffect(() => {
		console.log(beforeCheckoutProduct);
	}, [beforeCheckoutProduct]);

	useEffect(() => {
		if (cart) {
			console.log(cart);
			// calculate random image to display
			// set random image to the first image of the first product in the cart
			// if the cart is empty, or the image is empty, then set the image to a random image
			if (
				cart.length > 0 &&
				cart[0].product_image_links.description_images.length > 0
			) {
				setRandomImageToDisplayTop(
					cart[0].product_image_links.description_images[0]
				);
			} else {
				setRandomImageToDisplayTop(random_image_link);
			}
		} else {
			setRandomImageToDisplayTop(random_image_link);
		}
	}, [counter]);
	return (
		<div>
			{/* <Toaster /> */}
			<div className="flex justify-center uppercase ml-4">
				<div className="text-4xl bodoni font-semibold">Cart</div>
			</div>
			{/* Random image that fills width, object in center */}
			<div className="flex justify-center">
				<img
					src={randomImageToDisplayTop}
					className="w-full mx-4 h-64 object-center object-cover my-2"
				/>
			</div>
			{/* Products */}
			<div className="flex flex-col gap-4">
				{cart.length !== 0
					? cart.map((product) => {
							return (
								<div className="flex p-4 bg-pink-200 m-4 mb-0">
									<div className="flex justify-center">
										<img
											src={
												isValidHttpUrl(
													product.product_image_links
														.description_images[0]
												)
													? product
															.product_image_links
															.description_images[0]
													: random_image_link
											}
											onClick={() => {
												navigate(
													`/product/${product._id}`
												);
												// uncheck the drawer
												let drawer_check_element =
													document.getElementById(
														"my-drawer"
													);
												drawer_check_element.checked = false;
											}}
											className="w-24 h-24 object-center object-cover my-2"
										/>
									</div>
									<div className="flex flex-col w-full">
										<div className="flex flex-col justify-center w-full">
											<div className="text-3xl ptsans font-bold m-2 mt-0 mb-0 w-full flex p-2">
												{product.product_name}
												<IconMinus className="w-8 h-8" />
												{product.product_cost === 0 ? (
													<div className="text-2xl">
														Free
													</div>
												) : (
													<div className="flex">
														<IconCurrencyRupee className="w-8 h-8" />
														{product.volume_present
															? product
																	.selected_volume
																	?.volume_cost
															: product.product_cost}
													</div>
												)}
											</div>
											<div className="text-3xl ptsans w-full flex gap-4 ml-4">
												{product.volumes_present ? (
													<div className="flex gap-4">
														<div className="text-2xl">
															{product.volumes_present
																? product
																		.selected_volume
																		?.volume
																: product
																		.product_volumes[0]
																		.volume}{" "}
															ml
														</div>
													</div>
												) : null}
												{product.shades_present ? (
													<div className="text-2xl">
														Shade:{" "}
														{product.selected_shade
															?.shade_name
															? product
																	.selected_shade
																	.shade_name
															: product
																	.product_shades[0]
																	.shade_name}
													</div>
												) : null}
											</div>
										</div>
										<div className="flex flex-row justify-end gap-3 items-center my-2">
											<div
												className="w-10 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white"
												onClick={() => {
													if (
														checkIfSample(product)
													) {
														setSampleCount(
															(sampleCount) =>
																sampleCount - 1
														);
													}
													DecreaseProductQuantity(
														product._id
													);
												}}
											>
												<IconMinus />
											</div>
											<div className="w-20 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black ">
												{product.selected_quantity}
											</div>
											<div
												className="w-10 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white"
												onClick={() => {
													if (
														!checkIfSample(product)
													) {
														IncreaseProductQuantity(
															product._id
														);
													} else {
														toast.error(
															"Only 1 sample can be added"
														);
													}
												}}
											>
												<IconPlus />
											</div>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>

			{/* 2 free samples on purchase of more than 3k */}
			<div>
				<div className="flex justify-center uppercase ml-4 mt-4">
					<div className="text-2xl bodoni font-semibold">
						1 Free Sample Over Purchse above ₹3000/-
					</div>
				</div>
				<div className="flex justify-center uppercase ml-4">
					<div className="text-2xl bodoni font-semibold"></div>
				</div>
			</div>
			{/* samples images that are clickable, upon clicking are added to cart */}
			{SampleProducts.length > 0 ? (
				<div className="flex justify-center gap-4">
					{SampleProducts.map((product) => {
						return (
							<div className="flex justify-center">
								<img
									src={
										product.product_image_links
											.description_images[0]
									}
									onClick={
										() => {
											if (sampleCount < 1) {
												if (
													product.product_quantity ===
													0
												) {
													toast.error(
														"Product is out of stock"
													);
													return;
												}
												if (cartTotal < 3000) {
													toast.error(
														"Cart total should be above ₹3000/-"
													);
													return;
												}
												addToCart(product._id);
												setSampleCount(
													(sampleCount) =>
														sampleCount + 1
												);
												toast.success(
													"Added to cart successfully"
												);
											} else {
												toast.error(
													"Only 1 sample can be added"
												);
											}
										}
										// uncheck the drawer
										// let drawer_check_element =
										// 	document.getElementById("my-drawer");
										// drawer_check_element.checked = false;
									}
									className="w-24 h-24 object-center object-cover my-2"
								/>
							</div>
						);
					})}
				</div>
			) : null}
			{/* Recommended Products which are from category ll essentials */}
			{EssentialsProducts.length > 0 ? (
				<div>
					{
						<div className="flex justify-center uppercase ml-4">
							<div className="text-2xl bodoni font-semibold">
								Recommended Products
							</div>
						</div>
					}
					<MiniDisplayCarousal products={EssentialsProducts} />
				</div>
			) : null}
			{/* Before you checkout */}
			<div className="flex justify-center uppercase ml-4">
				<div className="text-2xl bodoni font-semibold">
					Before You Checkout!
				</div>
			</div>
			{/* Bath Truffle Routine which is a product, image, name, details and cost are displayed, there is also add button */}
			{beforeCheckoutProduct.length > 0 ? (
				<div className="flex justify-center w-full">
					<div className="flex p-4 bg-transparent m-4 mb-0 w-full">
						<div className="flex justify-center">
							<img
								src={
									beforeCheckoutProduct[0].product_image_links
										.description_images[0]
										? beforeCheckoutProduct[0]
												.product_image_links
												.description_images[0]
										: random_image_link
								}
								onClick={() => {
									navigate(
										`/product/${beforeCheckoutProduct[0]._id}`
									);
									// uncheck the drawer
									let drawer_check_element =
										document.getElementById("my-drawer");
									drawer_check_element.checked = false;
								}}
								className="w-24 h-24 object-center object-cover my-2"
							/>
						</div>
						<div className="flex flex-col w-full">
							<div className="flex justify-center w-full">
								<div className="text-3xl ptsans font-bold m-2 mt-0 w-full flex p-2">
									{beforeCheckoutProduct[0].product_name}
									<IconMinus className="w-8 h-8" />
									<IconCurrencyRupee className="w-8 h-8" />
									{beforeCheckoutProduct[0].product_cost}
								</div>
							</div>
							<div className="flex justify-end">
								<button
									className="btn btn-primary uppercase w-fit rounded-none m-8"
									onClick={() => {
										console.log(beforeCheckoutProduct);
										if (
											beforeCheckoutProduct[0]
												.product_quantity === 0
										) {
											toast.error(
												"Product is out of stock"
											);
											return;
										}
										addToCart(beforeCheckoutProduct[0]._id);
										toast.success(
											"Added to cart successfully"
										);
									}}
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
			{/* Show Estimated Total */}
			<div className="flex flex-col gap-4 uppercase ml-4 p-16">
				<div className="flex justify-between uppercase">
					<div className="text-2xl bodoni font-semibold">Total</div>
					<div className="flex justify-center uppercase ml-4">
						<div className="text-2xl bodoni font-semibold flex items-center">
							<IconCurrencyRupee className="w-8 h-8" />
							{cartTotal}
						</div>
					</div>
				</div>
				<div className="flex justify-between uppercase">
					<div className="text-2xl bodoni font-semibold">
						Points Earned
					</div>
					<div className="flex justify-center uppercase ml-4">
						<div className="text-2xl bodoni font-semibold flex gap-4 items-center">
							<IconStarFilled className="w-8 h-8" />
							{getCartPoints()}
						</div>
					</div>
				</div>
				<div className="flex justify-between uppercase">
					<div className="text-2xl bodoni font-semibold">
						Your Points
					</div>
					<div className="flex justify-center uppercase ml-4">
						<div className="text-2xl bodoni font-semibold flex gap-4 items-center">
							<IconStarFilled className="w-8 h-8" />
							{currentCustomerPoints}
						</div>
					</div>
				</div>
				<div className="flex justify-between uppercase">
					<div className="text-2xl bodoni font-semibold">
						Discounts
					</div>
					<div className="flex justify-center uppercase ml-4">
						<div className="text-2xl bodoni font-semibold flex gap-4 items-center">
							<IconMinus className="w-8 h-8" />
							{currentCustomerPoints} * 10 ={" "}
							<IconCurrencyRupee className="w-8 h-8" />{" "}
							{currentCustomerPoints * 10}
						</div>
					</div>
				</div>
				<div className="outline h-1 w-full"></div>
				<div className="flex justify-between uppercase">
					<div className="text-2xl bodoni font-semibold">
						Final Total
					</div>
					<div className="flex justify-center uppercase ml-4">
						<div className="text-2xl bodoni font-semibold flex gap-4 items-center">
							<IconCurrencyRupee className="w-8 h-8" />{" "}
							{getDiscountedTotal()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
