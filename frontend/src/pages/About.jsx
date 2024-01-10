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
	IconMail,
	IconPhoneCall,
} from "@tabler/icons-react";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { useLocation } from "react-router-dom";
import Footer from "../components/ui/Footer";
import { CartContext } from "../context/CartContext";

const About = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	const location = useLocation();
	const isAboutPage = location.pathname === "/about";
	const { staticStuff } = React.useContext(CartContext);

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
		<div id="about_div">
			{/* intro */}
			<section
				className="flex flex-col m-8 justify-center items-center"
				id="intro"
			>
				<div className="text-4xl xl:text-6xl  bodoni my-6 mb-3">
					ABOUT US
				</div>

				{/* <p
					className="dancing text-2xl text-center mb-6 mt-8
				"
				>
					Makeup is a Choice, Skincare is Essential.
				</p> */}
				<div className="flex justify-center md:mx-20 md:my-4 md:hidden">
					<div
						className="mt-4 droidserif text-center
				md:p-10 md:rounded-2xl xl:text-[1.8vw] leading-tight md:text-left md:flex-1"
					>
						{staticStuff["about_page_description_1"] ? (
							staticStuff["about_page_description_1"]
						) : (
							<>
								luxuriant luxe wont give you the false
								expectations from the product your natural skin
								will be enhanced and become more like what you
								want.
							</>
						)}
					</div>
				</div>
			</section>

			{/* big screen intro */}
			<section
				className="md:flex flex-col justify-center items-center hidden"
				id="intro"
			>
				<div className="md:flex md:justify-center md:flex-row md:mx-20 md:my-4">
					<div
						className="mt-4 droidserif text-center
				md:p-10 md:rounded-2xl xl:text-[1.8vw] leading-tight md:text-left md:flex-1"
					>
						{staticStuff["about_page_description_2"] ? (
							staticStuff["about_page_description_2"]
						) : (
							<>
								luxuriant luxe wont give you the false
								expectations from the product your natural skin
								will be enhanced and become more like what you
								want.
							</>
						)}
					</div>
					<div className="md:flex-1 md:flex md:p-4 md:justify-end p-4">
						<div className="rounded-3xl flex items-center 2xl:w-1/2">
							<img
								src={
									staticStuff["about_us_image_1"]
										? staticStuff["about_us_image_1"]
										: "https://source.unsplash.com/random"
								}
								alt=""
								className="rounded-3xl w-full"
							/>
						</div>
					</div>
				</div>
				{/* <p
					className="dancing text-2xl text-center mb-6 mt-8
				"
				>
					We only offer the
					<span className="text-accent dancing text-xl ">
						{" "}
						most Premium products{" "}
					</span>
				</p> */}

				<div
					className="md:flex md:justify-center md:flex-row-reverse md:my-4 w-full"
					id="brownbg"
				>
					<div
						className="mt-4 droidserif text-center
				md:p-10 md:rounded-2xl xl:text-[1.8vw] leading-tight md:text-left md:flex-1 text-white"
					>
						{staticStuff["about_page_description_2"] ? (
							staticStuff["about_page_description_2"]
						) : (
							<>
								luxuriant luxe wont give you the false
								expectations from the product your natural skin
								will be enhanced and become more like what you
								want.
							</>
						)}
					</div>
					<div className="md:flex-1 md:flex md:p-4 md:justify-start p-4">
						<div className="rounded-3xl flex items-center 2xl:w-1/2">
							<img
								src={
									staticStuff["about_us_image_2"]
										? staticStuff["about_us_image_2"]
										: "https://source.unsplash.com/random"
								}
								alt=""
								className="rounded-3xl"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* big screen about */}
			<section
				className="flex flex-col p-2 m-8 justify-center items-center md:hidden bg-brown-500"
				id="intro"
			>
				<div className="text-4xl  bodoni my-6">Only Premium</div>

				<div className="text-xl mt-4 droidserif text-center">
					{staticStuff["about_page_description_1"] ? (
						staticStuff["about_page_description_1"]
					) : (
						<>
							luxuriant luxe wont give you the false expectations
							from the product your natural skin will be enhanced
							and become more like what you want.
						</>
					)}
				</div>
			</section>

			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl  bodoni"
				id="intro"
			>
				FOUNDERS
				<div className="flex flex-col gap-16 md:flex-row md:justify-center">
					<div className="flex flex-col items-center justify-center mt-4">
						<img
							src={
								staticStuff["creator_image_1"]
									? staticStuff["creator_image_1"]
									: "https://source.unsplash.com/random"
							}
							className="w-screen h-64 snap-center self-center md:m-4 rounded-2xl
							md:w-80 md:h-80 bg-no-repeat bg-contain bg-center"
						></img>
						<div className="text-4xl text-center ">
							Balraj Tavanandi
						</div>
						<div className="text-2xl text-center ">
							Owner and Founder
						</div>
					</div>
					<div className="flex justify-center mt-4 flex-col items-center">
						<img
							src={
								staticStuff["creator_image_2"]
									? staticStuff["creator_image_2"]
									: "https://source.unsplash.com/random"
							}
							className="w-screen snap-center self-center md:m-4 rounded-2xl
							md:w-80 md:h-80 bg-no-repeat bg-contain bg-center"
						></img>
						<div className="text-4xl text-center ">
							Janestha Singh
						</div>
						<div className="text-2xl text-center ">
							Owner and Founder
						</div>
					</div>
				</div>
				{/* <div className="text-xl mt-4 droidserif p-4 m-5 text-center md:w-4/5">
					<span className="text-accent droidserif text-xl ">
						Two people who got influenced by the ancient skincare
						heritage from the 1st century and made it time travel to
						2023 for you.
					</span>
					<span className="text-accent droidserif text-xl ">
						We are from Pune. We are a group of students who are
						passionate about skincare and beauty. We strive to bring
						you the best products at the best prices!
					</span>
				</div> */}
			</section>
			{isAboutPage ? <Footer /> : <div></div>}
		</div>
	);
};

export default About;
