import React, { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../input.css";
import "../css/Home.css";
import { IconArrowUpRight } from "@tabler/icons-react";
import About from "./About";
import FAQ from "./FAQ";
import { CartContext } from "../context/CartContext";
import { DisplayCarousal } from "../components/ui/DisplayCarousal";
import Footer from "../components/ui/Footer";

const Home = () => {
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
	useEffect(() => {
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
		console.log(productInfo);
		console.log(HairProducts);
		console.log(SkinProducts);
		console.log(CosmeticsProducts);
		console.log(EssentialsProducts);
		console.log(HolidayProducts);
		console.log(FeaturedProducts);
	});
	return (
		<div className="">
			<img
				className="w-screen h-screen object-cover"
				src="https://source.unsplash.com/random"
			/>
			{/* <div className="ribbon color"></div> */}
			<div className="flex flex-col">
				<div className="text-4xl italic underline text-center my-4 mt-16 garbata">
					Revitalize your skin with Super-Concentrated Potions
				</div>
				<div className="text-4xl px-16 py-4 text-center garbata italic">
					Indulge in the power of high-octane, active ingredient
					formulas that will leave your skin glowing like a radiant
					goddess. Our best-selling and versatile products are
					designed to work their magic on all skin types, giving you a
					youthful, rejuvenated appearance. Give your cells the joy
					they deserve and start your journey to healthy, glowing skin
					today!
				</div>
			</div>
			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-center flex-row">
					<div
						className="p-4 m-8 justify-center items-start text-4xl forum
				md:text-7xl underline"
					>
						LUXURIANT LUXE{" "}
						<span className="bodoni underline italic">
							Essentials
						</span>
					</div>
				</div>

				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{EssentialsProducts && (
							<DisplayCarousal products={EssentialsProducts} />
						)}
					</div>
				</div>
				<div className="flex justify-center w-full">
					<button
						className="underline btn btn-ghost btn-lg m-8 forum text-5xl"
						onClick={() => {
							setCurrentCategoryProducts(EssentialsProducts);
							navigate("/category/essentials", {
								state: {
									currentCategoryProducts: EssentialsProducts,
								},
							});
						}}
					>
						Shop All
					</button>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 dmsans py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-center flex-row">
					<div
						className="p-4 m-8 justify-center items-start text-4xl forum
				md:text-7xl underline"
					>
						FEATURED ORGANIC CLEANSERS
					</div>
				</div>
				<div className="flex flex-col"></div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{FeaturedProducts && (
							<DisplayCarousal products={FeaturedProducts} />
						)}
					</div>
				</div>
				<div className="flex justify-center w-full">
					<button
						className="underline btn btn-ghost btn-lg m-8 forum text-5xl"
						onClick={() => {
							setCurrentCategoryProducts(FeaturedProducts);
							navigate("/category/featured", {
								state: {
									currentCategoryProducts: FeaturedProducts,
								},
							});
						}}
					>
						Shop All
					</button>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 dmsans py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-center flex-row">
					<div
						className="p-4 m-8 justify-center text-center items-center text-4xl forum
				md:text-7xl"
					>
						<span className="text-primary dmsans mx-4 text-center">
							HOLIDAY GIFT SETS
						</span>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="text-2xl text-center px-16 cardo italic w-full">
						From us to your loved ones - XOXO
					</div>
					<div className="self-center">
						<button
							className="text-catalogue_bg underline btn btn-ghost btn-lg forum text-4xl my-2"
							onClick={() => {
								setCurrentCategoryProducts(HolidayProducts);
								navigate("/category/holiday", {
									state: {
										currentCategoryProducts:
											HolidayProducts,
									},
								});
							}}
						>
							Shop All
						</button>
					</div>
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{HolidayProducts && (
							<DisplayCarousal products={HolidayProducts} />
						)}
					</div>
				</div>
				{/* <div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 dmsans py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div> */}
			</section>

			{/* <section className="mt-16" id="productssection">
				<Catalogue />
			</section> */}

			<div className="my-12">
				<div className="ribbon color"></div>
			</div>

			{/* // Authentic beauty */}
			<div
				id="authenticbeauty"
				className="h-screen w-screen flex items-center flex-col justify-center"
				// style={{
				// 	backgroundImage: "url(https://source.unsplash.com/random)",
				// 	backgroundSize: "cover",
				// 	backgroundPosition: "center",
				// }}
			>
				{/* Title */}
				<div className="flex justify-center">
					<div className="flex text-center text-7xl underline ptsans uppercase">
						Authentic Beauty
					</div>
				</div>

				{/* Text */}
				<div className="flex justify-center m-8">
					<div className="w-5/6 text-3xl italic cardo">
						Unveil the sublime secrets of skincare that honor the
						essence of your unique beauty. For true radiance stems
						not from a generic mold, but from the sacred symphony of
						your individuality. Behold the LUXURIANT LUXE, an
						exclusive range of expertly crafted potions that embrace
						your skin's intrinsic character and empower its natural
						faculties. With each elixir, your skin awakens to its
						full potential, embarking on a transformative journey
						towards unparalleled luminosity.
					</div>
				</div>

				{/* More Text */}

				<div className="flex justify-center">
					<div className="flex text-center text-3xl italic">
						Revitalize Your Skin with Super-Concentrated Potions
					</div>
				</div>
				<div className="flex justify-center m-8">
					<div className="w-5/6 text-3xl italic cardo">
						Indulge in the power of high-octane, active ingredient
						formulas that will leave your skin glowing like a
						radiant goddess. Our best-selling and versatile products
						are designed to work their magic on all skin types,
						giving you a youthful, rejuvenated appearance. Give your
						cells the joy they deserve and start your journey to
						healthy, glowing skin today!
					</div>
				</div>
			</div>

			<img
				className="h-screen w-screen object-cover object-top"
				src="https://source.unsplash.com/random"
			/>

			{/* <section>
				<About />
			</section> */}

			{/* <section>
				<FAQ />
			</section> */}

			<Footer />
			{/* <div className="my-12"> */}
			{/* <div className="ribbon color"></div> */}
			{/* </div> */}
		</div>
	);
};

export default Home;
