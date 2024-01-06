// this is the content of the side cart, and the cart shown on the checkout page. it is independent and takes its data from contexts.

import React from "react";
import { useState } from "react";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";
import { IconCurrencyRupee, IconMinus, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DisplayCarousal } from "../components/ui/DisplayCarousal";
import { Toaster, toast } from "react-hot-toast";

const random_image_link =
	"https://images.unsplash.com/photo-1643185450492-6ba77dea00f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29zbWV0aWNzfGVufDB8fDB8fHww";
const Cart = () => {
	const [currentCustomerPoints, setCurrentCustomerPoints] = useState(0);
	const [currentCustomerOrderCost, setCurrentCustomerOrderCost] = useState(0);
	const [randomImageToDisplayTop, setRandomImageToDisplayTop] = useState(0);
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
	} = React.useContext(CartContext);

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
			} else if (drawer_check_button_checked.checked) {
				setCart(cart);
				console.log("checked", cart);
				setCounter((counter) => counter + 1);
			} else {
				console.log("not checked", cart);
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
		if (Cart) {
			console.log(Cart);
			// calculate random image to display
			// set random image to the first image of the first product in the cart
			// if the cart is empty, or the image is empty, then set the image to a random image
			if (
				Cart.length > 0 &&
				Cart[0].product_image_links.description_images.length > 0
			) {
				setRandomImageToDisplayTop(
					Cart[0].product_image_links.description_images[0]
				);
			} else {
				setRandomImageToDisplayTop(random_image_link);
			}
		} else {
			setRandomImageToDisplayTop(random_image_link);
		}
	}, [getCart()]);
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
												product.product_image_links
													.description_images[0]
											}
											className="w-24 h-24 object-center object-cover my-2"
										/>
									</div>
									<div className="flex flex-col w-full">
										<div className="flex justify-center w-full">
											<div className="text-3xl ptsans font-bold m-2 mt-0 w-full flex p-2">
												{product.product_name}
												<IconMinus className="w-8 h-8" />
												<IconCurrencyRupee className="w-8 h-8" />
												{product.product_cost}
											</div>
										</div>
										<div className="flex flex-row justify-end gap-3 items-center my-2">
											<div
												className="w-10 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white"
												onClick={() => {
													// if (selectedProductQuantity > 1) {
													// 	setSelectedProductQuantity(
													// 		selectedProductQuantity - 1
													// 	);
													// }
												}}
											>
												<IconMinus />
											</div>
											<div className="w-20 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black ">
												{product.product_quantity}
											</div>
											<div
												className="w-10 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white"
												onClick={() => {
													// setSelectedProductQuantity(
													// 	selectedProductQuantity + 1
													// );
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
						2 Free Samples On Purchase of ₹2999/-
					</div>
				</div>
				<div className="flex justify-center uppercase ml-4">
					<div className="text-2xl bodoni font-semibold"></div>
				</div>
			</div>
			{/* samples images that are clickable, upon clicking are added to cart */}
			{SampleProducts.length > 0 ? (
				<div className="flex justify-center">
					{SampleProducts.map((product) => {
						return (
							<div className="flex justify-center">
								<img
									src={
										product.product_image_links
											.description_images[0]
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
					<DisplayCarousal products={EssentialsProducts} />
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
								}
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
										addToCart(beforeCheckoutProduct[0], 1);
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
			<div className="flex justify-center uppercase ml-4">
				<div className="text-2xl bodoni font-semibold">
					Estimated Total
				</div>
			</div>
			<div className="flex justify-center uppercase ml-4">
				<div className="text-2xl bodoni font-semibold">
					{getCartTotal()}
				</div>
			</div>
		</div>
	);
};

export default Cart;
