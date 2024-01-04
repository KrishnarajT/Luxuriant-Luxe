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

const Footer = () => {
	const [customerEmail, setCustomerEmail] = React.useState("");
	const [customerPhone, setCustomerPhone] = React.useState("");
	const [customerAddress, setCustomerAddress] = React.useState("");
	const [customerName, setCustomerName] = React.useState("");
	const [wantsSubscription, setWantsSubscription] = React.useState(false);
	const [change, setChange] = React.useState(0);

	const addCustomer = async () => {
		const response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/add_customer_email`,
				{},
				{
					params: {
						customer_email: customerEmail,
						wantsSubscription: wantsSubscription,
						customer_phone: customerPhone,
						customer_address: customerAddress,
						customer_name: customerName,
					},
				}
			)
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
		console.log(response.data);

		if (response.data.message === "simulation") {
			alert("Simulation Response, Added order");
		} else if (response.data.message === "Success") {
			toast.success("You are Successfully Subscribed!");
			clearCart();
			setChange(1);
		} else if (response.data.message === "Failure") {
			toast.error("Could not Subscribe!");
		}
	};

	return (
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
				<div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Subscribe to our newsletter
							</span>
						</label>
						<div className="relative">
							<input
								type="text"
								placeholder="email"
								className="w-full pr-16 input input-primary input-bordered"
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
	);
};

export default Footer;
