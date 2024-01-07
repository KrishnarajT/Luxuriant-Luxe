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
import { DisplayCarousal } from "../components/ui/DisplayCarousal";

const Catalogue = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	const {
		productInfo,
		HairProducts,
		SkinProducts,
		CosmeticsProducts,
		EssentialsProducts,
		HolidayProducts,
		FeaturedProducts,
		setCurrentCategoryProducts,
	} = React.useContext(CartContext);

	const location = useLocation();
	const isProductsPage = location.pathname === "/products";

	useEffect(() => {
		// fetchProductInfo();
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

			{/* All Products */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-18 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							All Products
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(productInfo);
								navigate({
									pathname: "/category/all",
								});
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					A collection of all our products.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{productInfo && (
							<DisplayCarousal products={productInfo} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Hair */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-18 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							LL Hair
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(HairProducts);
								navigate({
									pathname: "/category/hair",
								});
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					These are the products that are essential for your daily
					skin. They are recommended by our experts and are the best
					in the market. These are the products that are essential for
					your daily skin. They are recommended by our experts and are
					the best in the market.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{HairProducts && (
							<DisplayCarousal products={HairProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Skin */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-8 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							LL Skin
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(SkinProducts);
								navigate({
									pathname: "/category/skin",
								});
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					These are the products that are essential for your daily
					skin. They are recommended by our experts and are the best
					in the market. These are the products that are essential for
					your daily skin. They are recommended by our experts and are
					the best in the market.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{SkinProducts && (
							<DisplayCarousal products={SkinProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Cosmetics */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-8 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							LL Cosmetics
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(CosmeticsProducts);
								navigate({
									pathname: "/category/cosmetics",
								});
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					These are the products that are essential for your daily
					skin. They are recommended by our experts and are the best
					in the market. These are the products that are essential for
					your daily skin. They are recommended by our experts and are
					the best in the market.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{CosmeticsProducts && (
							<DisplayCarousal products={CosmeticsProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Essentials */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-8 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							LL Essentials
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(EssentialsProducts);
								navigate({
									pathname: "/category/essentials",
								});
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					These are the products that are essential for your daily
					skin. They are recommended by our experts and are the best
					in the market. These are the products that are essential for
					your daily skin. They are recommended by our experts and are
					the best in the market.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{EssentialsProducts && (
							<DisplayCarousal products={EssentialsProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Featured Organic Cleansers */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-8 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							Featured Orgnanic Cleansers
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(FeaturedProducts);
								navigate("/category/featured");
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					These are the products that are essential for your daily
					skin. They are recommended by our experts and are the best
					in the market. These are the products that are essential for
					your daily skin. They are recommended by our experts and are
					the best in the market.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{FeaturedProducts && (
							<DisplayCarousal products={FeaturedProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Holiday Special */}

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-8 mx-16 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-accent bodoni mx-4 text-center">
							Holiday Specials
						</span>
					</div>
					<div>
						<button
							className="text-accent underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(HolidayProducts);
								navigate("/category/holiday");
							}}
						>
							Shop All <IconArrowUpRight className="w-8 h-8" />
						</button>
					</div>
				</div>

				<div className="text-4xl px-24 garbata py-4">
					These are the products that are essential for your daily
					skin. They are recommended by our experts and are the best
					in the market. These are the products that are essential for
					your daily skin. They are recommended by our experts and are
					the best in the market.
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{HolidayProducts && (
							<DisplayCarousal products={HolidayProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 garbata py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* Cart Button */}

			<div className="flex justify-center">
				<button
					className="btn btn-lg btn-primary my-6"
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
							<span className="text-2xl garbata text-secondary-content">
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

export default Catalogue;
