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

import product_1_image_1 from "../../assets/images/product_carousel/1/00.jpg";
import product_1_image_2 from "../../assets/images/product_carousel/1/01.webp";
import product_1_image_3 from "../../assets/images/product_carousel/1/02.webp";
import product_1_image_4 from "../../assets/images/product_carousel/1/03.webp";
import product_1_image_5 from "../../assets/images/product_carousel/1/04.webp";
import product_1_image_6 from "../../assets/images/product_carousel/1/05.webp";
import product_1_image_7 from "../../assets/images/product_carousel/1/06.webp";
import product_1_image_8 from "../../assets/images/product_carousel/1/07.webp";
import product_1_image_9 from "../../assets/images/product_carousel/1/08.webp";

import product_2_image_1 from "../../assets/images/product_carousel/1/01.webp";
import product_2_image_2 from "../../assets/images/product_carousel/2/02.webp";
import product_2_image_3 from "../../assets/images/product_carousel/2/03.webp";
import product_2_image_4 from "../../assets/images/product_carousel/2/04.webp";
import product_2_image_5 from "../../assets/images/product_carousel/2/05.webp";
import product_2_image_6 from "../../assets/images/product_carousel/2/07.webp";

import product_3_image_1 from "../../assets/images/product_carousel/3/01.webp";
import product_3_image_2 from "../../assets/images/product_carousel/3/02.webp";
import product_3_image_3 from "../../assets/images/product_carousel/3/03.webp";
import product_3_image_4 from "../../assets/images/product_carousel/3/04.webp";
import product_3_image_5 from "../../assets/images/product_carousel/3/05.webp";
import product_3_image_6 from "../../assets/images/product_carousel/3/06.webp";
import product_3_image_7 from "../../assets/images/product_carousel/3/07.webp";

const product_1_images = [
	product_1_image_1,
	product_1_image_2,
	product_1_image_3,
	product_1_image_4,
	product_1_image_5,
	product_1_image_6,
	product_1_image_7,
	product_1_image_8,
	product_1_image_9,
];

const product_2_images = [
	product_2_image_1,
	product_2_image_2,
	product_2_image_3,
	product_2_image_4,
	product_2_image_5,
	product_2_image_6,
];

const product_3_images = [
	product_3_image_1,
	product_3_image_2,
	product_3_image_3,
	product_3_image_4,
	product_3_image_5,
	product_3_image_6,
	product_3_image_7,
];

const Products = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	let { addToCart, productInfo } = React.useContext(CartContext);
	const location = useLocation();
	const isProductsPage = location.pathname === "/products";

	useEffect(() => {
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
	});
	return (
		<div id="products_div">
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bulgatti
				md:text-6xl "
				id="intro"
			>
				Our Products
			</section>

			<section
				className="flex flex-col p-4 justify-center items-center md:hidden"
				id="intro"
			>
				<div className="text-xl mt-4 prata text-center md:text-3xl w-3/4">
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
					<div className="text-xl mt-4 prata text-center md:text-2xl xl:text-3xl md:text-left">
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
						className="btn btn-lg btn-primary my-6 w-fit"
						onClick={() => {
							// navigate("/cart");
							addToCart({
								product_id: productInfo[0].product_id,
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
						{<ProductCarousel images={product_1_images} />}
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
						{<ProductCarousel images={product_1_images} />}
					</div>
				</div>
				<div className="text-xl mt-4 prata text-center">
					Tired of trying to find a product for your skin which is
					organic beneficial and chemical free? Don't worry! We have
					got you covered! Reduces Oiliness, makes skin bouncy,
					reduces dullness and dead skin cells, bringing out fairer
					and healthier skin. Stimulates glands and helping drainage
					reduce of sebaceous bumps and sebum accumulation.
				</div>
				<button
					className="btn btn-lg btn-primary my-6"
					onClick={() => {
						// navigate("/cart");
						addToCart({
							product_id: productInfo[0].product_id,
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
					<div className="text-xl mt-4 prata text-center md:text-2xl xl:text-3xl md:text-left">
						Our body cleanser is dedicated to rejuvenate and make
						your dry skin soft, bouncy and supple again. Our
						cleanser contains essential nature sources oils which
						are easy to absorb by your skin which softens by
						penetration into the dermis and making it softer and
						smoother.
					</div>
					{/* button */}
					<button
						className="btn btn-lg btn-primary my-6 w-fit"
						onClick={() => {
							// navigate("/cart");
							addToCart({
								product_id: productInfo[1].product_id,
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
						{<ProductCarousel images={product_2_images} />}
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
				{<ProductCarousel images={product_2_images} />}

				<div className="text-xl mt-4 prata text-center">
					Our body cleanser is dedicated to rejuvenate and make your
					dry skin soft, bouncy and supple again. Our cleanser
					contains essential nature sources oils which are easy to
					absorb by your skin which softens by penetration into the
					dermis and making it softer and smoother.
				</div>
				<button
					className="btn btn-lg btn-primary my-6"
					onClick={() => {
						// navigate("/cart");
						addToCart({
							product_id: productInfo[1].product_id,
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
					<div className="text-xl mt-4 prata text-center md:text-2xl xl:text-3xl md:text-left">
						A perfect balance of essential oils and natural
						smoothness helping you in simplifying and making your
						bathing and skincare experience organic and fun.
					</div>
					{/* button */}
					<button
						className="btn btn-lg btn-primary my-6 w-fit"
						onClick={() => {
							// navigate("/cart");
							addToCart({
								product_id: productInfo[2].product_id,
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
						{<ProductCarousel images={product_3_images} />}
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
				{<ProductCarousel images={product_3_images} />}

				<div className="text-xl mt-4 prata text-center ">
					A perfect balance of essential oils and natural smoothness
					helping you in simplifying and making your bathing and
					skincare experience organic and fun.
				</div>
				<button
					className="btn btn-lg btn-primary my-6"
					onClick={() => {
						// navigate("/cart");
						addToCart({
							product_id: productInfo[2].product_id,
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

			{isProductsPage ? (
				<footer className="footer footer-center p-10 bg-secondary bottom-0 text-secondary-content">
					<aside>
						<div
							id="luxelogo"
							className="w-20 h-20 bg-center snap-center self-center text-secondary-content"
						></div>
						<p className="dancing text-3xl text-secondary-content">
							<span className="text-2xl prata text-secondary-content">
								Luxuriant Luxe
							</span>
							<br />
							Your Skin Our Priority
						</p>
						<p>Copyright © 2023 - All right reserved</p>
						<div className="flex gap-4">
							<a className="link">Privacy Policy</a>
							<a className="link">Terms and Conditions</a>
							<a className="link">Refund and Return Policy</a>
							<a className="link">Shipping Policy</a>
						</div>
					</aside>
					<nav className="text-secondary-content">
						<div className="flex flex-wrap justify-center items-center gap-4 w-2/3 lg:w-fit">
							<a href="https://wa.me/917666018928?text=Welcome%20to%20Luxuriant%20Luxe!%20How%20can%20we%20assist%20you%20today%3F%20">
								<IconBrandWhatsapp className="w-8 h-8" />
							</a>
							<a href="https://www.instagram.com/luxuriant_luxe">
								<IconBrandInstagram className="w-8 h-8" />
							</a>
							<a href="https://www.facebook.com/profile.php?id=61551508050876">
								<IconBrandFacebook className="w-8 h-8" />
							</a>
							{/*<a*/}
							{/*	href=""*/}
							{/*>*/}
							{/*	<IconBrandTelegram className="w-8 h-8"/>*/}
							{/*</a>*/}
							<a href="https://www.linkedin.com/in/luxuriant-luxe-1b852a292">
								<IconBrandLinkedin className="w-8 h-8" />
							</a>
							<a
								onClick={
									// open mail client
									() => {
										window.location.href =
											"mailto:luxeluxuriant@gmail.com";
									}
								}
							>
								<IconMail className="w-8 h-8" />
							</a>
							<a
								onClick={
									// open phone client
									() => {
										window.location.href =
											"tel:+917666018928";
									}
								}
							>
								<IconPhoneCall className="w-8 h-8" />
							</a>
							<ScrollToTopButton />
						</div>
					</nav>
				</footer>
			) : (
				<div></div>
			)}

			<div className="flex justify-center toast-center toast">
				<div
					className="alert alert-success hidden transform-gpu transition-all duration-300 flex gap-4 md:text-3xl prata"
					id="added_order"
				>
					<IconDiscountCheckFilled className="w-6 h-6 md:w-10 md:h-10" />
					<span className="prata">Added to Cart!</span>
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
