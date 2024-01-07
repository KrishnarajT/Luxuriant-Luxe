import React, { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../input.css";
import {
	IconArrowUpRight,
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandWhatsapp,
	IconChecks,
	IconDiscountCheckFilled,
	IconMail,
	IconPhoneCall,
	IconShoppingCartPlus,
} from "@tabler/icons-react";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { CartContext } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import { ProductCarousel } from "../components/ui/ProductCarousel";
import Footer from "../components/ui/Footer";

const Products = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	let { addToCart, productInfo, fetchProductInfo } =
		React.useContext(CartContext);
	const location = useLocation();
	const isProductsPage = location.pathname === "/products";

	useEffect(() => {
		fetchProductInfo();
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
		// console.log(productInfo);
	}, []);
	return (
		<div id="products_div">
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-5xl"
				id="intro"
			>
				BROWSE OUR CATALOGUE
			</section>

			<section
				className="flex flex-col p-4 justify-center items-center md:hidden"
				id="intro"
			>
				<div className="text-xl mt-4 garbata text-center md:text-3xl w-3/4">
					Tired of trying to find a product for your skin which is
					organic beneficial and chemical free? Dont worry! We have
					got you covered!
				</div>
			</section>

			{/* --> product 1 <-- */}

			{/* bigger displays */}
			<section
				className="lg:flex flex-col p-4 justify-center items-center bg-base-200 m-6 pb-10 rounded-2xl md:bg-inherit md:flex-row md:mx-20 hidden"
				id="intro"
			>
				{/* left side div */}
				<div className="flex flex-col w-3/4 gap-8 flex-1">
					{/* title */}
					<div className="text-4xl dancing my-6 mb-3 md:text-5xl lg:text-6xl xl:text-7xl">
						Oily Skin
					</div>
					{/* text desc */}
					<div className="text-xl mt-4 garbata text-center md:text-2xl xl:text-3xl md:text-left">
						Tired of trying to find a product for your skin which is
						organic beneficial and chemical free? Don't worry! We
						have got you covered! Reduces Oiliness, makes skin
						bouncy, reduces dullness and dead skin cells, bringing
						out fairer and healthier skin. Stimulates glands and
						helping drainage reduce of sebaceous bumps and sebum
						accumulation.
					</div>
					{/* button */}
					<button
						className="btn btn-lg btn-secondary my-6 w-fit"
						onClick={() => {
							// navigate("/cart");
							addToCart({
								_id: productInfo[0]._id,
								cost: productInfo[0].product_cost,
								quantity: 1,
							});
							// display the alert for 1 second
							const alert =
								document.getElementById("added_order");
							alert.classList.remove("hidden");
							setTimeout(() => {
								alert.classList.add("hidden");
							}, 3000);
						}}
					>
						Add to Cart <IconShoppingCartPlus className="w-8 h-8" />
					</button>
				</div>

				{/* right side div */}
				{/* images */}
				<div className="my-6 mt-10 max-w-7xl flex justify-center max-h-[40rem] md:gap-16 md:flex-1">
					<div className="w-3/4 mt-4">
						{productInfo[0] && (
							<ProductCarousel
								images={
									productInfo[0].product_image_links
										.description_images
								}
							/>
						)}
					</div>
				</div>
			</section>

			{/* small displays */}
			<section
				className="flex flex-col p-4 justify-center items-center bg-base-200 m-6 pb-10 rounded-2xl lg:hidden"
				id="intro"
			>
				<div className="text-4xl dancing my-6 mb-3">Oily Skin</div>
				<div className="my-6 mt-10 max-w-7xl flex justify-center max-h-[40rem] md:gap-16">
					<div className="w-3/4 mt-4">
						{productInfo[0] && (
							<ProductCarousel
								images={
									productInfo[0].product_image_links
										.description_images
								}
							/>
						)}
					</div>
				</div>
				<div className="text-xl mt-4 garbata text-center">
					Tired of trying to find a product for your skin which is
					organic beneficial and chemical free? Don't worry! We have
					got you covered! Reduces Oiliness, makes skin bouncy,
					reduces dullness and dead skin cells, bringing out fairer
					and healthier skin. Stimulates glands and helping drainage
					reduce of sebaceous bumps and sebum accumulation.
				</div>
				<button
					className="btn btn-lg btn-secondary my-6"
					onClick={() => {
						// navigate("/cart");
						addToCart({
							_id: productInfo[0]._id,
							cost: productInfo[0].product_cost,
							quantity: 1,
						});
						// display the alert for 1 second
						const alert = document.getElementById("added_order");
						alert.classList.remove("hidden");
						setTimeout(() => {
							alert.classList.add("hidden");
						}, 3000);
					}}
				>
					Add to Cart <IconShoppingCartPlus className="w-8 h-8" />
				</button>
			</section>

			{/* --> product 2 <-- */}

			{/* bigger displays */}
			<section
				className="lg:flex flex-col p-4 justify-center items-center bg-base-200 m-6 pb-10 rounded-2xl md:bg-inherit md:flex-row md:mx-20 hidden"
				id="intro"
			>
				{/* left side div */}
				<div className="flex flex-col w-3/4 gap-8 flex-1">
					{/* title */}
					<div className="text-4xl dancing my-6 mb-3 md:text-5xl lg:text-6xl xl:text-7xl">
						Dry Skin
					</div>
					{/* text desc */}
					<div className="text-xl mt-4 garbata text-center md:text-2xl xl:text-3xl md:text-left">
						Our body cleanser is dedicated to rejuvenate and make
						your dry skin soft, bouncy and supple again. Our
						cleanser contains essential nature sources oils which
						are easy to absorb by your skin which softens by
						penetration into the dermis and making it softer and
						smoother.
					</div>
					{/* button */}
					<button
						className="btn btn-lg btn-secondary my-6 w-fit"
						onClick={() => {
							// navigate("/cart");
							addToCart({
								_id: productInfo[1]._id,
								cost: productInfo[1].product_cost,
								quantity: 1,
							});
							// display the alert for 1 second
							const alert =
								document.getElementById("added_order");
							alert.classList.remove("hidden");
							setTimeout(() => {
								alert.classList.add("hidden");
							}, 3000);
						}}
					>
						Add to Cart <IconShoppingCartPlus className="w-8 h-8" />
					</button>
				</div>

				{/* right side div */}
				{/* images */}
				<div className="my-6 mt-10 max-w-7xl flex justify-center max-h-[40rem] md:gap-16 md:flex-1">
					<div className="w-3/4 mt-4">
						{productInfo[0] && (
							<ProductCarousel
								images={
									productInfo[0].product_image_links
										.description_images
								}
							/>
						)}
					</div>
				</div>
			</section>

			{/* small displays */}
			<section
				className="flex flex-col p-4 justify-center items-center bg-base-200 m-6 pb-10 rounded-2xl lg:hidden"
				id="intro"
			>
				<div className="text-4xl dancing my-6 mb-3">Dry Skin</div>
				{/* <div className="flex justify-center mt-4">
					<div
						id={theme === "light" ? "pink_1" : "pink_1"}
						className="w-screen h-64 bg-center snap-center self-center my-4"
					></div>
				</div> */}
				{productInfo[0] && (
					<ProductCarousel
						images={
							productInfo[0].product_image_links
								.description_images
						}
					/>
				)}

				<div className="text-xl mt-4 garbata text-center">
					Our body cleanser is dedicated to rejuvenate and make your
					dry skin soft, bouncy and supple again. Our cleanser
					contains essential nature sources oils which are easy to
					absorb by your skin which softens by penetration into the
					dermis and making it softer and smoother.
				</div>
				<button
					className="btn btn-lg btn-secondary my-6"
					onClick={() => {
						// navigate("/cart");
						addToCart({
							_id: productInfo[1]._id,
							cost: productInfo[1].product_cost,
							quantity: 1,
						});
						const alert = document.getElementById("added_order");
						alert.classList.remove("hidden");
						setTimeout(() => {
							alert.classList.add("hidden");
						}, 3000);
					}}
				>
					Add to Cart <IconShoppingCartPlus className="w-8 h-8" />
				</button>
			</section>

			{/* --> product 3 <-- */}

			{/* bigger displays */}
			<section
				className="lg:flex flex-col p-4 justify-center items-center bg-base-200 m-6 pb-10 rounded-2xl md:bg-inherit md:flex-row md:mx-20 hidden"
				id="intro"
			>
				{/* left side div */}
				<div className="flex flex-col w-3/4 gap-8 flex-1">
					{/* title */}
					<div className="text-4xl dancing my-6 mb-3 md:text-5xl lg:text-6xl xl:text-7xl">
						Normal Skin
					</div>
					{/* text desc */}
					<div className="text-xl mt-4 garbata text-center md:text-2xl xl:text-3xl md:text-left">
						A perfect balance of essential oils and natural
						smoothness helping you in simplifying and making your
						bathing and skincare experience organic and fun.
					</div>
					{/* button */}
					<button
						className="btn btn-lg btn-secondary my-6 w-fit"
						onClick={() => {
							// navigate("/cart");
							addToCart({
								_id: productInfo[2]._id,
								cost: productInfo[2].product_cost,
								quantity: 1,
							});
							// display the alert for 1 second
							const alert =
								document.getElementById("added_order");
							alert.classList.remove("hidden");
							setTimeout(() => {
								alert.classList.add("hidden");
							}, 3000);
						}}
					>
						Add to Cart <IconShoppingCartPlus className="w-8 h-8" />
					</button>
				</div>

				{/* right side div */}
				{/* images */}
				<div className="my-6 mt-10 max-w-7xl flex justify-center max-h-[40rem] md:gap-16 md:flex-1">
					<div className="w-3/4 mt-4">
						{productInfo[0] && (
							<ProductCarousel
								images={
									productInfo[0].product_image_links
										.description_images
								}
							/>
						)}
					</div>
				</div>
			</section>

			{/* small displays */}
			<section
				className="flex flex-col p-4 justify-center items-center bg-base-200 m-6 pb-10 rounded-2xl lg:hidden"
				id="intro"
			>
				<div className="text-4xl dancing my-6 mb-3">Normal Skin</div>
				{/* <div className="flex justify-center mt-4">
					<div
						id={theme === "light" ? "purple_1" : "purple_1"}
						className="w-screen h-64 bg-center snap-center self-center my-4"
					></div>
				</div> */}
				{productInfo[0] && (
					<ProductCarousel
						images={
							productInfo[0].product_image_links
								.description_images
						}
					/>
				)}

				<div className="text-xl mt-4 garbata text-center ">
					A perfect balance of essential oils and natural smoothness
					helping you in simplifying and making your bathing and
					skincare experience organic and fun.
				</div>
				<button
					className="btn btn-lg btn-secondary my-6"
					onClick={() => {
						// navigate("/cart");
						addToCart({
							_id: productInfo[2]._id,
							cost: productInfo[2].product_cost,
							quantity: 1,
						});
						const alert = document.getElementById("added_order");
						alert.classList.remove("hidden");
						setTimeout(() => {
							alert.classList.add("hidden");
						}, 3000);
					}}
				>
					Add to Cart <IconShoppingCartPlus className="w-8 h-8" />
				</button>
			</section>

			{/* Cart Button */}

			<div className="flex justify-center">
				<button
					className="btn btn-lg btn-accent my-6"
					onClick={() => {
						navigate("/cart");
					}}
				>
					Cart <IconArrowUpRight className="w-8 h-8" />
				</button>
			</div>

			{/* footer */}

			{isProductsPage ? <Footer /> : <div></div>}

			<div className="flex justify-center toast-center toast">
				<div
					className="alert alert-success hidden transform-gpu transition-all duration-300 flex gap-4 md:text-3xl garbata"
					id="added_order"
				>
					<IconDiscountCheckFilled className="w-6 h-6 md:w-10 md:h-10" />
					<span className="garbata">Added to Cart!</span>
				</div>
			</div>

			<div className="flex justify-center toast-center toast">
				<div
					className="alert alert-success hidden transform-gpu transition-all duration-300 flex gap-4"
					id="added_order_failed"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Could not Add Order! Please Contact Us!</span>
				</div>
			</div>
		</div>
	);
};

export default Products;
