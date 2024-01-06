import React, { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
import "../style.css";
import "../input.css";
import {
	IconDiscountCheckFilled,
	IconExclamationCircle,
	IconHome,
	IconMail,
	IconMinus,
	IconPhoneCall,
	IconPlus,
	IconShoppingCartHeart,
} from "@tabler/icons-react";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import Footer from "../components/ui/Footer";
import Cart from "./Cart";
const qr_code_image = "https://i.imgur.com/ObMvMPQh.jpg";

axios.defaults.headers.common["Access-Control-Allow-Origin"] =
	"http://localhost:5173";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Checkout = () => {
	// const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	const [change, setChange] = React.useState(0);
	const base_url = React.useContext(BaseUrlContext).baseUrl;

	let {
		addToCart,
		removeFromCart,
		clearCart,
		getCartTotal,
		productInfo,
		IncreaseProductQuantity,
		DecreaseProductQuantity,
		getCart,
	} = React.useContext(CartContext);

	const [cart, setCart] = React.useState([]);

	useEffect(() => {
		setCart(getCart());
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
	}, []);

	const [customerEmail, setCustomerEmail] = React.useState("");
	const [customerPhone, setCustomerPhone] = React.useState("");
	const [customerAddress, setCustomerAddress] = React.useState("");
	const [customerName, setCustomerName] = React.useState("");
	const [currentCustomerId, setCurrentCustomerId] = React.useState("");
	const [currentCustomerPoints, setCurrentCustomerPoints] = React.useState(0);
	const [currentCustomerOrderCost, setCurrentCustomerOrderCost] =
		React.useState(0);
	const [country, setCountry] = React.useState("");
	const [region, setRegion] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [apartment, setApartment] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [wantsSubscription, setWantsSubscription] = React.useState(false);

	const checkValidity = () => {
		// check that none of the things are null
		if (
			customerEmail === "" ||
			customerPhone === "" ||
			customerAddress === "" ||
			customerName === ""
		) {
			alert("Please fill all the fields!");
			return false;
		}

		// do a regex check for phone number ( +91 1234567890 )
		const phone_regex = new RegExp("^[0-9]{10}$");
		if (!phone_regex.test(customerPhone)) {
			alert("Please enter a valid phone number!");
			return false;
		}
		// do a regex check for email
		const email_regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
		if (!email_regex.test(customerEmail)) {
			alert("Please enter a valid email!");
			return false;
		}

		// // make sure xss scripts are not present in address using regex
		const xss_regex = new RegExp("<script>");
		if (xss_regex.test(customerAddress)) {
			alert("Please enter a valid address!");
			return false;
		}

		if (xss_regex.test(customerName)) {
			alert("Please enter a valid address!");
			return false;
		}
		return true;
	};

	const SendOrderToBackend = async () => {
		// show the placing order button
		const placing_order = document.getElementById("placing_order");
		placing_order.classList.remove("hidden");

		// print everything
		console.log(customerEmail);
		console.log(customerPhone);
		console.log(customerAddress);
		console.log(customerName);
		console.log(getCart());
		console.log(getCartTotal());

		let latest_cart = getCart();
		const response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/add_order`,
				{},
				{
					params: {
						customer_email: customerEmail,
						customer_phone: customerPhone,
						customer_address: customerAddress,
						customer_name: customerName,
						customer_order: JSON.stringify(latest_cart),
						order_cost: getCartTotal(),
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

		// stop showing the placing order button
		placing_order.classList.add("hidden");

		if (response.data.message === "simulation") {
			alert("Simulation Response, Added order");
		} else if (response.data.message === "Success") {
			toast.success("Order Placed Successfully!");
			clearCart();
			setChange(1);
		} else if (response.data.message === "Failure") {
			toast.error("Order Failed!");
		}
	};

	const getCustomerPoints = async () => {
		const response = await axios
			.get(`${base_url}/api/v1/Luxuriant/get_customer_points`, {
				params: {
					customer_email: customerEmail,
				},
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
		console.log(response.data);

		if (response.data.message === "simulation") {
			alert("Simulation Response, Added order");
		} else if (response.data.message === "Success") {
			toast.success("Order Placed Successfully!");
			clearCart();
			setChange(1);
		} else if (response.data.message === "Failure") {
			toast.error("Order Failed!");
		}
	};

	const addCustomer = async () => {
		const data = {
			customer_email: customerEmail,
			customer_phone: customerPhone,
			customer_address: customerAddress,
			customer_name: customerName,
			customer_points: currentCustomerPoints,
			wantsSubscription: wantsSubscription,
		};
		const response = await axios
			.post(`${base_url}/api/v1/Luxuriant/add_customer_email`, { data })
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
		<div>
			<Toaster />
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-5xl bodoni"
				id="intro"
			>
				Checkout and Shipping
			</section>

			<div className="flex gap-4 w-screen">
				<div className="w-1/2 flex flex-col p-4 items-center">
					<div className="w-2/3">
						<div className="flex justify-center uppercase ml-4">
							<div className="text-4xl bodoni font-semibold">
								Contact
							</div>
						</div>

						{/* Enter customer email */}
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text text-xl">
									Your Email
								</span>
							</label>
							<label className="input-group">
								<span>
									<IconMail className="w-4 h-4" />
								</span>
								<input
									type="text"
									placeholder="Enter your email"
									className="input input-bordered w-full"
									value={customerEmail}
									onChange={(event) => {
										setCustomerEmail(event.target.value);
									}}
								/>
							</label>
							{/* Checkbox for sending subscription mail */}
							<div className="form-control mt-4">
								<label className="cursor-pointer label">
									<span className="label-text text-xl">
										Subscribe to our newsletter?
									</span>
									<input
										type="checkbox"
										className="checkbox shadow shadow-black"
										value={wantsSubscription}
										onClick={() => {
											setWantsSubscription(
												!wantsSubscription
											);
											console.log("checkbox clicked");
										}}
									/>
								</label>
							</div>
						</div>
						<div className="flex justify-center uppercase ml-4 mt-4">
							<div className="text-4xl bodoni font-semibold">
								Shipping Address
							</div>
						</div>

						<div className="flex flex-col">
							{/* Country, Region */}
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										Country
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your country"
									className="input input-bordered"
									value={country}
									onChange={(event) => {
										setCountry(event.target.value);
									}}
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										Region
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your region"
									className="input input-bordered"
									value={region}
									onChange={(event) => {
										setRegion(event.target.value);
									}}
								/>
							</div>

							{/* First Name, Last Name in different fields */}
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										First Name
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your first name"
									className="input input-bordered"
									value={firstName}
									onChange={(event) => {
										setFirstName(event.target.value);
									}}
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										Last Name
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your last name"
									className="input input-bordered"
									value={lastName}
									onChange={(event) => {
										setLastName(event.target.value);
									}}
								/>
							</div>

							{/* Address */}
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										Address
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your address"
									className="input input-bordered"
									value={address}
									onChange={(event) => {
										setAddress(event.target.value);
									}}
								/>
							</div>

							{/* Apartment, Building */}
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										Apartment/Building
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your apartment or building"
									className="input input-bordered"
									value={apartment}
									onChange={(event) => {
										setApartment(event.target.value);
									}}
								/>
							</div>

							{/* Phone */}
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl">
										Phone
									</span>
								</label>
								<input
									type="text"
									placeholder="Enter your phone number"
									className="input input-bordered"
									value={phone}
									onChange={(event) => {
										setPhone(event.target.value);
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="w-1/2 flex flex-col flex-1">
					<Cart />
				</div>
			</div>

			{cart.length !== 0 ? (
				<section
					className="flex flex-col p-4 justify-center items-center"
					id="intro"
				>
					<div
						className="flex flex-col p-4 m-8 justify-center items-center text-3xl bulgatti"
						id="intro"
					>
						Details
					</div>
					<div className="alert alert-warning m-6 mt-0 max-w-5xl text-center flex flex-col justify-center">
						<IconExclamationCircle className="w-8 h-8 " />

						<span className="text-center">
							Please ensure that the details are you enter are
							accurate. We will send you an email confirming your
							order within 24 hours.
						</span>
					</div>
					<div className="">
						<div className="form-control">
							<label className="label">
								<span className="label-text text-xl">
									Your Name
								</span>
							</label>
							<label className="input-group">
								<span>
									<IconMail className="w-4 h-4" />
								</span>
								<input
									type="text"
									placeholder="John Doe"
									className="input input-bordered"
									value={customerName}
									onChange={(event) => {
										setCustomerName(event.target.value);
									}}
								/>
							</label>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-xl">
									Your Email
								</span>
							</label>
							<label className="input-group">
								<span>
									<IconMail className="w-4 h-4" />
								</span>
								<input
									type="text"
									placeholder="info@site.com"
									className="input input-bordered"
									value={customerEmail}
									onChange={(event) => {
										setCustomerEmail(event.target.value);
									}}
								/>
							</label>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-xl">
									Your Phone Number
								</span>
							</label>
							<label className="input-group">
								<span>
									<IconPhoneCall className="w-4 h-4" />{" "}
								</span>
								<input
									type="tel"
									placeholder="XXXXXXXXXX (10 digits)"
									className="input input-bordered"
									value={customerPhone}
									onChange={(event) => {
										setCustomerPhone(event.target.value);
									}}
								/>
							</label>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-xl">
									Your Address
								</span>
							</label>
							<label className="input-group">
								<span>
									<IconHome className="w-4 h-4" />{" "}
								</span>
								{/*<input type="tel" placeholder=""*/}
								{/*       className="input input-bordered"/>*/}
								<textarea
									className="textarea textarea-bordered w-full"
									placeholder="Flat, Building, Street, City, State"
									value={customerAddress}
									onChange={(event) => {
										setCustomerAddress(event.target.value);
									}}
								></textarea>
							</label>
						</div>
					</div>
				</section>
			) : (
				<div></div>
			)}
			{cart.length !== 0 ? (
				<section
					className="flex flex-col p-4 justify-center items-center"
					id="intro"
				>
					<button
						className="btn btn-sm btn-primary"
						id="buy_now_button"
						onClick={() => {
							console.log(
								"buy now clicked. send some api calls. "
							);

							if (checkValidity()) {
								// 	unhide the qr code
								const qr_code =
									document.getElementById("qr_payment");
								qr_code.style.display = "flex";
								// SendOrderToBackend();
								// // hide the buy now button
								// const buy_now_button = document.getElementById("buy_now_button");
								// buy_now_button.style.display = "none";
								// clearCart();

								// show the placing order button
								// const placing_order = document.getElementById("placing_order");
								// placing_order.classList.remove("hidden");
							}
						}}
					>
						Buy Now.
					</button>
				</section>
			) : (
				<div></div>
			)}
			{cart.length !== 0 ? (
				<section
					className="flex flex-col items-center p-4 justify-center items-center hidden"
					id="qr_payment"
				>
					<div className="alert alert-success max-w-5xl text-center flex flex-col justify-center">
						<IconDiscountCheckFilled className="w-8 h-8" />
						<span className="text-center">
							Pay this Number below or Scan the UPI QR Code, and
							you will receive an email confirming your order
							within 24 hours.{" "}
						</span>
					</div>
					<div className="flex justify-center">
						<div
							src={qr_code_image}
							className="w-screen h-96 bg-center snap-center self-center"
						></div>
					</div>

					<button
						className="btn btn-sm btn-primary"
						id="buy_now_button"
						onClick={() => {
							console.log(
								"i have paid clicked. send some api calls. "
							);

							SendOrderToBackend();
							// // hide the buy now button
							// const buy_now_button = document.getElementById("buy_now_button");
							// buy_now_button.style.display = "none";
							// clearCart();
						}}
					>
						I Have Paid!
					</button>
				</section>
			) : (
				<div></div>
			)}

			<Footer />
		</div>
	);
};

export default Checkout;
