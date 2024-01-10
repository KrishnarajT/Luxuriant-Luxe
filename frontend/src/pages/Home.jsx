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
		staticStuff,
	} = React.useContext(CartContext);
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
		<div className="">
			<img
				className="w-screen h-screen object-cover"
				src={
					staticStuff
						? staticStuff["home_page_background_image"]
						: "https://source.unsplash.com/random"
				}
			/>
			{/* <div className="ribbon color"></div> */}
			<div className="flex flex-col">
				<div className="text-[2.5vw] underline text-center my-4 mt-16 bodoni">
					{staticStuff["home_page_first_header"] ? (
						staticStuff["home_page_first_header"]
					) : (
						<>
							Revitalize your skin with Super-Concentrated Potions
						</>
					)}
				</div>
				<div className="text-[1.5vw] leading-tight px-16 py-4 text-center droidserif italic">
					{staticStuff["home_page_first_description"] ? (
						staticStuff["home_page_first_description"]
					) : (
						<>
							Indulge in the power of high-octane, active
							ingredient formulas that will leave your skin
							glowing like a radiant goddess. Our best-selling and
							versatile products are designed to work their magic
							on all skin types, giving you a youthful,
							rejuvenated appearance. Give your cells the joy they
							deserve and start your journey to healthy, glowing
							skin today!
						</>
					)}
				</div>
			</div>
			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-center flex-row">
					<div
						className="p-4 m-8 mb-0 justify-center items-start bodoni text-[2.8vw]
				"
					>
						LUXURIANT LUXE{" "}
						<span className="montserrat italic text-[2.8vw]">
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
						className="text-4xl underline btn btn-ghost btn-lg m-8 bodoni font-thin"
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
					<div className="text-4xl px-16 droidserif py-4 text-center ">
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
						className="p-4 m-8 mb-0 justify-center items-start text-[2.8vw] montserrat
				 font-thin"
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
						className="text-4xl underline btn btn-ghost btn-lg m-8 bodoni font-thin text-4xl"
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
					<div className="text-4xl px-16 droidserif py-4 text-center ">
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
						className="p-4 m-8 mb-0 justify-center text-center items-center text-[2.8vw] bodoni
				"
					>
						<span className="text-primary montserrat mx-4 text-center">
							HOLIDAY GIFT SETS
						</span>
					</div>
				</div>
				<div className="flex justify-center">
					<div className="text-[4vw] bodoni tangerine text-center px-16 droidserif italic w-full translate-x-20">
						From us to your loved ones
						<div className="bodoni text-right w-3/4 font-normal text-[3.5vw]">
							~LL
						</div>
					</div>
					<div className="flex justify-end translate-y-20 -translate-x-20">
						<button
							className="underline btn btn-ghost btn-lg m-8 bodoni font-thin text-4xl"
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
					<div className="text-4xl px-16 droidserif py-4 text-center ">
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

			{/* <div className="my-12">
				<div className="ribbon color"></div>
			</div> */}

			{/* // Authentic beauty */}
			<div
				id="authenticbeauty"
				className="h-screen w-screen flex items-center flex-col justify-evenly"
				// style={{
				// 	backgroundImage: "url(https://source.unsplash.com/random)",
				// 	backgroundSize: "cover",
				// 	backgroundPosition: "center",
				// }}
			>
				{/* Title */}
				<div className="flex justify-center">
					<div className="flex text-center text-[3.5vw] montserrat uppercase">
						{staticStuff[
							"home_page_authentic_beauty_1st_header"
						] ? (
							staticStuff["home_page_authentic_beauty_1st_header"]
						) : (
							<>Authentic Beauty</>
						)}
					</div>
				</div>

				{/* Text */}
				<div className="flex justify-center m-8">
					<div className="w-5/6 text-[1.5vw] italic droidserif">
						{staticStuff[
							"home_page_authentic_beauty_1st_header_desc"
						] ? (
							staticStuff[
								"home_page_authentic_beauty_1st_header_desc"
							]
						) : (
							<>
								Unveil the sublime secrets of skincare that
								honor the essence of your unique beauty. For
								true radiance stems not from a generic mold, but
								from the sacred symphony of your individuality.
								Behold the LUXURIANT LUXE, an exclusive range of
								expertly crafted potions that embrace your
								skin's intrinsic character and empower its
								natural faculties. With each elixir, your skin
								awakens to its full potential, embarking on a
								transformative journey towards unparalleled
								luminosity.
							</>
						)}
					</div>
				</div>

				{/* More Text */}

				<div className="flex justify-center">
					<div className="flex text-center text-[2.5vw] italic bodoni">
						{staticStuff[
							"home_page_authentic_beauty_2nd_header"
						] ? (
							staticStuff["home_page_authentic_beauty_2nd_header"]
						) : (
							<>
								Revitalize Your Skin with Super-Concentrated
								Potions
							</>
						)}
					</div>
				</div>
				<div className="flex justify-center m-8">
					<div className="w-5/6 text-[1.5vw] italic droidserif">
						{staticStuff[
							"home_page_authentic_beauty_2nd_header_desc"
						] ? (
							staticStuff[
								"home_page_authentic_beauty_2nd_header_desc"
							]
						) : (
							<>
								Indulge in the power of high-octane, active
								ingredient formulas that will leave your skin
								glowing like a radiant goddess. Our best-selling
								and versatile products are designed to work
								their magic on all skin types, giving you a
								youthful, rejuvenated appearance. Give your
								cells the joy they deserve and start your
								journey to healthy, glowing skin today!
							</>
						)}
					</div>
				</div>
			</div>

			<img
				className="h-screen w-screen object-cover object-top"
				src={
					staticStuff["home_page_last_image"]
						? staticStuff["home_page_last_image"]
						: "https://source.unsplash.com/random"
				}
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
