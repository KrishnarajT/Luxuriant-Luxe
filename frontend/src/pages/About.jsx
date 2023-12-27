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
import product_3_image_3 from "../../assets/images/product_carousel/3/03.webp";
import product_1_image_1 from "../../assets/images/product_carousel/1/00.jpg";
import product_3_image_1 from "../../assets/images/product_carousel/3/01.webp";
import { ProductCarousel } from "../components/ui/ProductCarousel";

// imporing box images.
import box_image_1 from "../../assets/images/box/01.webp";
import box_image_2 from "../../assets/images/box/02.webp";
import box_image_3 from "../../assets/images/box/03.webp";
import box_image_4 from "../../assets/images/box/04.webp";
import box_image_5 from "../../assets/images/box/05.webp";
import box_image_6 from "../../assets/images/box/06.webp";
import box_image_7 from "../../assets/images/box/07.webp";
import box_image_8 from "../../assets/images/box/08.webp";

const box_images = [
	box_image_1,
	box_image_2,
	box_image_3,
	box_image_4,
	box_image_5,
	box_image_6,
	box_image_7,
	box_image_8,
];

const About = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	const location = useLocation();
	const isAboutPage = location.pathname === "/about";

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
				className="flex flex-col p-4 m-8 justify-center items-center"
				id="intro"
			>
				<div className="text-4xl xl:text-6xl lg:text-5xl bulgatti my-6 mb-3">
					About Us
				</div>

				<p
					className="dancing text-2xl text-center mb-6 mt-8
				md:text-5xl"
				>
					Makeup is a Choice, Skincare is Essential.
				</p>
				<div className="flex justify-center md:mx-20 md:my-4 md:hidden">
					<div
						className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-2xl md:text-left md:flex-1"
					>
						luxuriant luxe wont give you the false expectations from
						the product your natural skin will be enhanced and
						become more like what you want.
					</div>
				</div>
			</section>

			{/* big screen intro */}
			<section
				className="md:flex flex-col p-4 m-8 justify-center items-center hidden"
				id="intro"
			>
				<div className="md:flex md:justify-center md:flex-row md:mx-20 md:my-4">
					<div
						className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-2xl md:text-left md:flex-1"
					>
						luxuriant luxe wont give you the false expectations from
						the product your natural skin will be enhanced and
						become more like what you want.
					</div>
					<div className="md:flex-1 md:flex md:p-4 md:justify-end p-4">
						<div className="rounded-3xl flex items-center 2xl:w-1/2">
							<img
								src={product_3_image_3}
								alt=""
								className="rounded-3xl w-full"
							/>
						</div>
					</div>
				</div>
				<p
					className="dancing text-2xl text-center mb-6 mt-8
				md:text-5xl"
				>
					We only offer the
					<span className="text-accent dancing text-xl md:text-5xl">
						{" "}
						most Premium products{" "}
					</span>
				</p>

				<div className="md:flex md:justify-center md:flex-row-reverse md:mx-20 md:my-4">
					<div
						className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-2xl md:text-left md:flex-1"
					>
						Made with{" "}
						<span className="text-accent cardo xl:text-4xl lg:text-3xl md:text-2xl italic">
							{" "}
							pure safe-to-use organic{" "}
						</span>
						ingredients. This formula won't harm your natural skin,
						it will only help you get rid of those dark spots, tan,
						open pores, and small bumps and will make your skin
						outrageously flawless like{" "}
						<span className="text-accent cardo xl:text-4xl lg:text-3xl md:text-2xl italic">
							{" "}
							you've always dreamt of.{" "}
						</span>
					</div>
					<div className="md:flex-1 md:flex md:p-4 md:justify-start p-4">
						<div className="rounded-3xl flex items-center 2xl:w-1/2">
							<img
								src={product_1_image_1}
								alt=""
								className="rounded-3xl"
							/>
						</div>
					</div>
				</div>

				<p
					className="dancing text-2xl text-center mb-6 mt-8
				md:text-5xl"
				>
					Authenticity in Beauty
				</p>

				<div className="md:flex md:justify-center md:flex-row-reverse md:mx-20 md:my-4">
					<div
						className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-2xl md:text-left md:flex-1"
					>
						Unveil the{" "}
						<span className="text-accent cardo xl:text-4xl lg:text-3xl md:text-2xl italic">
							{" "}
							sublime secrets of skincare{" "}
						</span>{" "}
						that honor the essence of your unique beauty. For true
						radiance stems not from a generic mold, but from the
						sacred sympohony of your individuality. Behold the power
						of
						<span className="text-accent cardo xl:text-4xl lg:text-3xl md:text-2xl italic">
							{" "}
							Luxuriant Luxe{" "}
						</span>
						An exclusive range of expertly crafted potions that
						embrace your skin's intrinsic character and empower its
						natural faculties. With each elixir, your skin awakens
						to its ful potential, embarking on a transofrmative
						journey towards unparalleled luminosity.
					</div>
					<div className="md:flex-1 md:flex md:p-4 md:justify-start p-4">
						<div className="rounded-3xl flex items-center 2xl:w-1/2">
							<img
								src={product_1_image_1}
								alt=""
								className="rounded-3xl"
							/>
						</div>
					</div>
				</div>

				<p
					className="dancing text-2xl text-center mb-6 mt-8
				md:text-5xl"
				>
					Why we are
					<span className="text-accent dancing text-xl md:text-5xl">
						{" "}
						Special{" "}
					</span>
				</p>

				<div className="md:flex md:justify-center md:flex-row md:mx-20 md:my-4">
					<div
						className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-2xl md:text-left md:flex-1"
					>
						luxuriant luxe wont give you the false expectations from
						the product your natural skin will be enhanced and
						become more like what you want.
					</div>
					<div className="md:flex-1 md:flex md:p-4 md:justify-end p-4">
						<div className="rounded-3xl flex items-center 2xl:w-1/2">
							<img
								src={product_3_image_1}
								alt=""
								className="rounded-3xl"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* big screen about */}
			<section
				className="flex flex-col p-2 m-8 justify-center items-center md:hidden"
				id="intro"
			>
				<div className="text-4xl md:text-5xl bulgatti my-6">
					Only Premium
				</div>

				<div className="text-xl mt-4 cardo text-center">
					Made with{" "}
					<span className="text-accent cardo text-xl">
						{" "}
						pure safe-to-use organic{" "}
					</span>
					ingredients. This formula won't harm your natural skin, it
					will only help you get rid of those dark spots, tan, open
					pores, and small bumps and will make your skin outrageously
					flawless like{" "}
					<span className="text-accent cardo text-xl">
						{" "}
						you've always dreamt of.{" "}
					</span>
				</div>
			</section>

			<section
				className="flex flex-col p-2 m-8 justify-center items-center md:hidden"
				id="intro"
			>
				<div className="text-4xl md:text-5xl bulgatti my-6">
					Authenticity in Beauty
				</div>

				<div className="text-xl mt-4 cardo text-center">
					Unveil the{" "}
					<span className="text-accent cardo text-xl">
						{" "}
						sublime secrets of skincare{" "}
					</span>{" "}
					that honor the essence of your unique beauty. For true
					radiance stems not from a generic mold, but from the sacred
					sympohony of your individuality. Behold the power of
					<span className="text-accent cardo text-xl">
						{" "}
						Luxuriant Luxe{" "}
					</span>
					An exclusive range of expertly crafted potions that embrace
					your skin's intrinsic character and empower its natural
					faculties. With each elixir, your skin awakens to its ful
					potential, embarking on a transofrmative journey towards
					unparalleled luminosity.
				</div>
			</section>

			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl md:text-5xl bulgatti"
				id="intro"
			>
				Your Box!
				<div className="my-6 mt-10 max-w-7xl flex justify-center max-h-[40rem] md:gap-16">
					<div className="w-3/4 mt-4">
						{<ProductCarousel images={box_images} />}
					</div>
					<div className="w-3/4 mt-4 hidden md:flex">
						{<ProductCarousel images={box_images} />}
					</div>
				</div>
			</section>
			<section
				className="flex flex-col p-2 m-8 justify-center items-center md:hidden"
				id="intro"
			>
				<div className="text-4xl md:text-5xl bulgatti my-6 text-center">
					Why are we special?
				</div>

				<div className="text-xl mt-4 cardo text-center">
					Made with{" "}
					<span className="text-accent cardo text-xl">
						{" "}
						pure safe-to-use organic{" "}
					</span>
					ingredients. This formula won't harm your natural skin, it
					will only help you get rid of those dark spots, tan, open
					pores, and small bumps and will make your skin outrageously
					flawless like{" "}
					<span className="text-accent cardo text-xl">
						{" "}
						you've always dreamt of.{" "}
					</span>
				</div>
				<button
					className="btn btn-lg btn-primary my-6"
					onClick={() => {
						navigate("/products");
					}}
				>
					Learn More <IconArrowUpRight className="w-8 h-8" />
				</button>
			</section>

			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl md:text-5xl bulgatti md:hidden"
				id="intro"
			>
				Origins
				<div className="flex justify-center mt-4">
					<div
						id={
							theme === "light" ? "insta_code" : "insta_code_dark"
						}
						className="w-screen h-64 bg-center snap-center self-center"
					></div>
				</div>
				<div className="text-xl mt-4 cardo p-4 text-center">
					We are from Pune. We are a group of students who are
					passionate about skincare and beauty. We strive to bring you
					the best products at the best prices!
				</div>
			</section>

			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl md:text-5xl bulgatti"
				id="intro"
			>
				Founders
				<div className="flex flex-col gap-4 md:flex-row md:justify-center">
					<div className="flex justify-center mt-4">
						<div
							id={
								theme === "light"
									? "insta_code"
									: "insta_code_dark"
							}
							className="w-screen h-64 bg-center snap-center self-center
							md:w-80 md:h-80"
						></div>
					</div>
					<div className="flex justify-center mt-4">
						<div
							id={
								theme === "light"
									? "insta_code"
									: "insta_code_dark"
							}
							className="w-screen h-64 bg-center snap-center self-center
							md:w-80 md:h-80"
						></div>
					</div>
				</div>
				<div className="text-xl mt-4 cardo p-4 m-5 text-center md:w-4/5">
					<span className="text-accent cardo text-xl lg:text-3xl">
						Two people who got influenced by the ancient skincare
						heritage from the 1st century and made it time travel to
						2023 for you.
					</span>
					<span className="text-accent cardo text-xl lg:text-3xl">
						We are from Pune. We are a group of students who are
						passionate about skincare and beauty. We strive to bring
						you the best products at the best prices!
					</span>
				</div>
			</section>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl md:text-5xl bulgatti"
				id="intro"
			>
				Get in Touch!
				<div className="text-xl mt-10 cardo text-center md:w-3/4 md:text-3xl">
					For any queries, Feel Free to Call, or Whatsapp us anytime!
					We assure you that we will get back to you in 24 hours!
				</div>
				<div className="text-xl mt-10 cardo text-center md:w-3/4 md:text-3xl">
					You can Also DM us on our Instagram!
				</div>
				<div className="flex justify-center mt-4">
					<div
						id={
							theme === "light" ? "insta_code" : "insta_code_dark"
						}
						className="w-screen h-96 bg-center snap-center self-center"
					></div>
				</div>
			</section>
			{isAboutPage ? (
				<footer className="footer footer-center p-10 bg-secondary bottom-0 text-secondary-content">
					<aside>
						<div
							id="luxelogo"
							className="w-20 h-20 bg-center snap-center self-center text-secondary-content"
						></div>
						<p className="dancing text-3xl text-secondary-content">
							<span className="text-2xl cardo text-secondary-content">
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
		</div>
	);
};

export default About;
