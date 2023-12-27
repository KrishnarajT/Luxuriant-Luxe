import React, { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../input.css";
import "../css/Home.css";
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
import slideshowhtml from "../components/slideshow.html";
import About from "./About";
import Products from "./Products";
import Cart from './Cart';

const Home = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
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

			<section className="mt-16" id="productssection">
				<Products />
			</section>

			<div className="my-12">
				<div className="ribbon color"></div>
			</div>

			<section>
				<About />
			</section>

			{/* <section>
				<Cart />
			</section> */}

			{/* <div className="my-12"> */}
			{/* <div className="ribbon color"></div> */}
			{/* </div> */}

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
									window.location.href = "tel:+917666018928";
								}
							}
						>
							<IconPhoneCall className="w-8 h-8" />
						</a>
						<ScrollToTopButton />
					</div>
				</nav>
			</footer>
		</div>
	);
};

export default Home;
