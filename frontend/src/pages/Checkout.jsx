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
import axios from "axios";
import Footer from "../components/ui/Footer";
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
			const alert = document.getElementById("added_order");
			alert.classList.remove("hidden");
			setTimeout(() => {
				alert.classList.add("hidden");
			}, 3000);
			clearCart();
			setChange(1);
		} else if (response.data.message === "Failure") {
			const alert = document.getElementById("added_order_failed");
			alert.classList.remove("hidden");
			setTimeout(() => {
				alert.classList.add("hidden");
			}, 3000);
		}
	};

	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-5xl bulgatti"
				id="intro"
			>
				Cart
			</section>

			{cart.length !== 0 ? (
				<section
					className="flex flex-col justify-center items-center m-4 rounded-2xl gap-6 p-2"
					id="intro"
					key={change}
				>
					{cart.map((item) => {
						return (
							<div className="flex justify-between items-center gap-4 w-full px-4 pt-4 bg-base-200 rounded-2xl">
								<div className="">
									<div className="text-2xl cardo my-1">
										{
											productInfo.filter((product) => {
												return (
													product._id ===
													item._id
												);
											})[0].product_name
										}
									</div>
									<div className="text-sm cardo my-1">
										Cost: &#8377;{" "}
										{
											productInfo.filter((product) => {
												return (
													product._id ===
													item._id
												);
											})[0].product_cost
										}
									</div>
									<div className="text-sm cardo my-1">
										Quantity: {item.quantity}
									</div>

									<div className="flex flex-row items-center gap-4 my-4 mx-0">
										<button
											className="btn btn-sm btn-accent text-accent-content"
											onClick={() => {
												IncreaseProductQuantity(
													item._id
												);
												setCart(getCart());
												setChange(
													(change) => change + 1
												);
											}}
										>
											<IconPlus className="w-4 h-4" />
										</button>
										<button
											className="btn btn-sm btn-accent text-accent-content"
											onClick={() => {
												DecreaseProductQuantity(
													item._id
												);
												setCart(getCart());
												setChange(
													(change) => change - 1
												);
											}}
										>
											<IconMinus className="w-4 h-4" />
										</button>
									</div>
								</div>
								<div className="flex justify-center items-center align-middle">
									<img
										src={
											images.filter((product) => {
												return (
													product._id ===
													item._id
												);
											})[0].product_image
										}
										alt={item.name}
										className="w-32 rounded-2xl"
									/>
								</div>
							</div>
						);
					})}
				</section>
			) : (
				<div className="text-center flex flex-col justify-center items-center m-8 text-accent">
					<IconShoppingCartHeart className="w-24 h-24" />
					<div className="text-2xl cardo my-2">
						Your cart is empty.
					</div>
				</div>
			)}
			{cart.length !== 0 ? (
				<section
					className="flex flex-col p-4 justify-center items-center"
					id="intro"
				>
					<div
						className="flex flex-col p-4 m-8 justify-center items-center text-3xl bulgatti"
						id="intro"
					>
						Invoice
					</div>
					<div className="overflow-x-auto">
						<table className="table">
							{/* head */}
							<thead>
								<tr>
									<th>No.</th>
									<th>Name</th>
									<th>Quantity</th>
									<th>Cost</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => {
									return (
										<tr className="text-md">
											<td>
												{/*	serial number*/}
												{cart.indexOf(item) + 1}
											</td>
											<td>
												{
													productInfo.filter(
														(product) => {
															return (
																product._id ===
																item._id
															);
														}
													)[0].product_name
												}
											</td>
											<td>{item.quantity}</td>
											<td>
												&#8377;
												{
													productInfo.filter(
														(product) => {
															return (
																product._id ===
																item._id
															);
														}
													)[0].product_cost
												}
											</td>
										</tr>
									);
								})}
								{/* display total. */}
								<tr>
									<td></td>
									<td></td>
									<td>Total</td>
									<td>
										&#8377;
										{cart.reduce((total, item) => {
											return (
												total +
												productInfo.filter(
													(product) => {
														return (
															product._id ===
															item._id
														);
													}
												)[0].product_cost *
													item.quantity
											);
										}, 0)}
									</td>
								</tr>
							</tbody>
						</table>
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
								<span className="label-text">Your Name</span>
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
								<span className="label-text">Your Email</span>
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
								<span className="label-text">
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
								<span className="label-text">Your Address</span>
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
								"buy not clicked. send some api calls. "
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
			<div className="flex justify-center toast-center toast">
				<div
					className="alert alert-success hidden transform-gpu transition-all duration-300 flex gap-4"
					id="placing_order"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
						/>
						<rect
							width="2"
							height="7"
							x="11"
							y="6"
							fill="currentColor"
							rx="1"
						>
							<animateTransform
								attributeName="transform"
								dur="9s"
								repeatCount="indefinite"
								type="rotate"
								values="0 12 12;360 12 12"
							/>
						</rect>
						<rect
							width="2"
							height="9"
							x="11"
							y="11"
							fill="currentColor"
							rx="1"
						>
							<animateTransform
								attributeName="transform"
								dur="0.75s"
								repeatCount="indefinite"
								type="rotate"
								values="0 12 12;360 12 12"
							/>
						</rect>
					</svg>
					<span>Placing Your Order!</span>
				</div>
			</div>

			<div className="flex justify-center toast-center toast">
				<div
					className="alert alert-success hidden transform-gpu transition-all duration-300 flex gap-4"
					id="added_order"
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
					<span>Order Placed Successfully!</span>
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
					<span>Could not Place Order! Please Contact Us!</span>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
