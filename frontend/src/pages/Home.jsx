import React, { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../input.css";
import "../css/Home.css";
import { IconArrowUpRight } from "@tabler/icons-react";
import slideshowhtml from "../components/slideshow.html";
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
			<section>
				<iframe
					src={slideshowhtml}
					style={{
						width: "100%",
						height: "100vh",
						border: "none",
						overflow: "hidden",
						// position: "fixed",
						// top: "0",
						// left: "0",
						// zIndex: "-1",
					}}
				></iframe>
			</section>

			<div className="ribbon color"></div>

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-between flex-row">
					<div
						className="p-4 m-8 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						LUXURIANT LUXE{" "}
						<span className="text-accent forum mx-4 italic">
							Essentials
						</span>
					</div>
					<div>
						<button
							className="text-catalogue_bg underline btn btn-ghost btn-lg p-4 m-8 forum text-4xl"
							onClick={() => {
								setCurrentCategoryProducts(EssentialsProducts);
								navigate("/category/essentials");
							}}
						>
							Shop All
						</button>
					</div>
				</div>

				<div className="text-4xl px-16 cardo py-4">
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
				<div className="flex justify-center w-10/12 self-center">
					<div className="text-4xl px-16 dmsans py-4 text-center ">
						As the originators and proprietors of the brand, we
						serve as the primary users and assessors of our product.
						We assure you that we utilize only the finest quality
						ingredients. <br /> - Luxe official
					</div>
				</div>
			</section>

			<section className="flex flex-col w-screen my-6 ">
				<div className="flex justify-center flex-row">
					<div
						className="p-4 m-8 justify-center items-start text-4xl forum
				md:text-7xl"
					>
						<span className="text-primary dmsans mx-4 text-center">
							FEATURED ORGANIC CLEANSERS
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
								setCurrentCategoryProducts(FeaturedProducts);
								navigate("/category/featured");
							}}
						>
							Shop All
						</button>
					</div>
				</div>
				<div className="flex justify-center w-full">
					<div className="w-full mx-4">
						{FeaturedProducts && (
							<DisplayCarousal products={FeaturedProducts} />
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
								navigate("/category/holiday");
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
