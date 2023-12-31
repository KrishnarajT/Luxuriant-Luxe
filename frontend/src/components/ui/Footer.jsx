import React from "react";
import {
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandWhatsapp,
	IconMail,
	IconPhoneCall,
} from "@tabler/icons-react";
import ScrollToTopButton from "./ScrollToTopButton";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrlContext } from "../../context/BaseUrlContext";

const Footer = () => {
	const base_url = React.useContext(BaseUrlContext).baseUrl;

	const [customerEmail, setCustomerEmail] = React.useState("");
	const [customerPhone, setCustomerPhone] = React.useState("");
	const [customerAddress, setCustomerAddress] = React.useState("");
	const [customerName, setCustomerName] = React.useState("");
	const [wantsSubscription, setWantsSubscription] = React.useState(false);
	const [change, setChange] = React.useState(0);
	const [currentCustomerPoints, setCurrentCustomerPoints] = React.useState(0);
	const navigate = useNavigate();
	const addCustomer = async () => {
		// make sure email is not empty:
		if (customerEmail === "") {
			toast.error("Please enter your email!");
			return;
		}
		const data = {
			customer_email: customerEmail,
			customer_phone: customerPhone,
			customer_address: customerAddress,
			customer_name: customerName,
			customer_points: currentCustomerPoints,
			wantsSubscription: true,
		};
		const response = await axios
			.post(`${base_url}/api/v1/Luxuriant/add_customer`, {
				customer_details: data,
			})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				return {
					data: {
						message: "simulation",
					},
				};
			});
		// console.log(response.data);

		if (response.data.message === "simulation") {
			alert("Simulation Response, Added order");
		} else if (response.data.message === "success") {
			toast.success("You are Successfully Subscribed!");
			clearCart();
			setChange(1);
		} else if (response.data.message === "Failure") {
			toast.error("Could not Subscribe!");
		}
	};

	return (
		<footer
			className="footer footer-center p-10 bg-transparent bottom-0 text-secondary-content mt-20"
			id="footer"
		>
			<Toaster />
			<aside className="mt-0 pt-0">
				<p className="dancing text-4xl text-secondary-content">
					<span className="text-8xl bodoni text-secondary-content uppercase font-thin">
						Luxuriant Luxe
					</span>
					<br />
					{/* Your Skin Our Priority */}
				</p>
			</aside>

			<div className="flex gap-20 w-4/5 justify-between h-full">
				<div className="flex gap-4 flex-col items-center justify-start h-full">
					<div className="text-4xl uppercase droidserif underline font-bold">
						Support
					</div>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/faq");
						}}
					>
						FAQ
					</a>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/contact");
						}}
					>
						Contact
					</a>
				</div>
				<div className="flex gap-4 flex-col items-center justify-start h-full">
					<div className="text-4xl uppercase droidserif underline font-bold">
						About Us
					</div>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/about");
						}}
					>
						About LL
					</a>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/our_goal");
						}}
					>
						Our Goal
					</a>
				</div>
				<div className="flex gap-4 flex-col items-center justify-start h-full">
					<div className="text-4xl uppercase droidserif underline font-bold">
						Legal
					</div>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/privacy_policy");
						}}
					>
						Privacy Policy
					</a>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/terms_conditions");
						}}
					>
						Terms and Conditions
					</a>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/refund_return_policy");
						}}
					>
						Refund and Return Policy
					</a>
					<a
						className="link text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl no-underline droidserif hover:underline"
						onClick={() => {
							navigate("/shipping_policy");
						}}
					>
						Shipping Policy
					</a>
				</div>
			</div>
			<div className="w-1/3">
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text underline uppercase droidserif text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl droidserif">
							Sign up for Updates
						</span>
					</label>
					<div className="relative w-full">
						<input
							type="text"
							placeholder="email"
							className="pr-16 w-full input input-primary input-bordered"
							onChange={(e) => {
								setCustomerEmail(e.target.value);
							}}
						/>
						<button
							className="absolute top-0 right-0 rounded-l-none btn btn-primary"
							onClick={() => {
								addCustomer();
							}}
						>
							Subscribe
						</button>
					</div>
				</div>
				<p className="text-lg italic text-left w-full">
					By Signing up, you agree to our
					<a
						className="italic text-lg"
						onClick={
							// open phone client
							() => {
								navigate("/terms_conditions");
							}
						}
					>
						Terms
					</a>
				</p>
			</div>
			<nav className="text-secondary-content">
				<div className="flex flex-wrap justify-center items-center gap-16 w-2/3 lg:w-fit">
					<a href="https://wa.me/917666018928?text=Welcome%20to%20Luxuriant%20Luxe!%20How%20can%20we%20assist%20you%20today%3F%20">
						<IconBrandWhatsapp className="w-14 h-14" />
					</a>
					<a href="https://www.instagram.com/luxuriant_luxe">
						<IconBrandInstagram className="w-14 h-14" />
					</a>
					<a href="https://www.facebook.com/profile.php?id=61551508050876">
						<IconBrandFacebook className="w-14 h-14" />
					</a>
					{/*<a*/}
					{/*	href=""*/}
					{/*>*/}
					{/*	<IconBrandTelegram className="w-8 h-8"/>*/}
					{/*</a>*/}
					<a href="https://www.linkedin.com/in/luxuriant-luxe-1b852a292">
						<IconBrandLinkedin className="w-14 h-14" />
					</a>
					<a
						onClick={() => {
							window.location.href =
								"mailto:luxeluxuriant@gmail.com";
						}}
					>
						<IconMail className="w-14 h-14" />
					</a>
					<a
						onClick={
							// open phone client
							() => {
								window.location.href = "tel:+917666018928";
							}
						}
					>
						<IconPhoneCall className="w-14 h-14" />
					</a>
					<ScrollToTopButton />
				</div>
			</nav>
		</footer>
	);
};

export default Footer;
