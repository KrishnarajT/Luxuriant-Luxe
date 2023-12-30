import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { UserContext } from "../context/UserContext";
import { DBInfoContext } from "../context/DBInfoContext.jsx";

import "../style.css";
import "../input.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { format, isValid, parse } from "date-fns";

function formatDate(originalDate) {
	// Parse the original date string
	const parsedDate = parse(originalDate, "dd/MM/yy", new Date());

	// Check if the parsed date is valid
	if (!isValid(parsedDate)) {
		console.error("Invalid date string:", originalDate);
		return "Invalid Date";
	}

	// Format the date as "do MMMM yyyy"
	return format(parsedDate, "do MMMM yyyy", { addSuffix: true });
}

const Login = (props) => {
	const reformatOrders = (orderDetails) => {
		if (orderDetails.length === 0) {
			return [];
		}
		// sort orders by order id, which is a hex field.
		// 654f70d385422b6126969c8f for eg
		orderDetails.sort((a, b) => {
			if (a._id < b._id) {
				return 1;
			}
			if (a._id > b._id) {
				return -1;
			}
			return 0;
		});

		// make orders list into this.
		// <th>Order Date</th>
		// <th>Order Time</th>
		// <th>Customer ID</th>
		// <th>Order Cost</th>
		// <th>Payment Status</th>
		// <th>Products</th>
		// <th>Products</th>
		// <th>Order ID</th>

		// First change the date format to a more readable one from "dd/mm/yyyy" to "November 9, 2023"
		for (let i = 0; i < orderDetails.length; i++) {
			orderDetails[i].order_date = formatDate(orderDetails[i].order_date);
		}

		// Then change the payment status to a more readable one from "paid" to "Paid"
		for (let i = 0; i < orderDetails.length; i++) {
			orderDetails[i].payment_status =
				orderDetails[i].payment_status.charAt(0).toUpperCase() +
				orderDetails[i].payment_status.slice(1);
		}

		// Then change the order cost to a more readable one from "400" to "400 INR"
		for (let i = 0; i < orderDetails.length; i++) {
			orderDetails[i].order_cost = orderDetails[i].order_cost + " INR";
		}

		// Then change the order details to a more readable one from
		// [
		//     {
		//         "product_id": "654cd992ae6a271afeed6b4c",
		//         "quantity": 3,
		//         "price": 100
		//     },
		//     {
		//         "product_id": "654cd992ae6a271afeed6b4e",
		//         "quantity": 3,
		//         "price": 100
		//     },
		//     {
		//         "product_id": "654cd992ae6a271afeed6b4d",
		//         "quantity": 3,
		//         "price": 100
		//     }
		// ]

		// to split it into products that reference the id from productInfo to make it look like
		// 5 x Blue Jar, 2 x Pink Jar
		for (let i = 0; i < orderDetails.length; i++) {
			let order_details = orderDetails[i].order_details;
			let order_details_string = "";
			for (let j = 0; j < order_details.length; j++) {
				let product_id = order_details[j].product_id;
				let quantity = order_details[j].quantity;
				let current_product = productDetails.filter((product) => {
					return product._id === product_id;
				});
				console.log("product", current_product);
				order_details_string +=
					quantity + " x " + current_product[0].product_name + ", ";
			}
			orderDetails[i].order_details = order_details_string;
		}

		// Then make a field called customer name that references customer id and gets the customer name from the customerInfo list so that it looks like "John Doe"
		for (let i = 0; i < orderDetails.length; i++) {
			let customer_id = orderDetails[i].customer_id;
			let customer_name = "";
			let customer_address = "";
			for (let j = 0; j < customerDetails.length; j++) {
				if (customerDetails[j]._id === customer_id) {
					customer_name = customerDetails[j].customer_name;
					customer_address = customerDetails[j].customer_address;
					break;
				}
			}
			orderDetails[i].customer_name = customer_name;
			orderDetails[i].customer_address = customer_address;
		}
		console.log("Order details after formatting:");
		console.log(orderDetails);
		return orderDetails;
	};

	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const { setUserPassword } = React.useContext(UserContext);
	const comment = document.getElementById("comment");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	let productDetails = [];
	let customerDetails = [];
	const { setOrderInfo, setCustomerInfo, setProductInfo } =
		React.useContext(DBInfoContext);

	let navigate = useNavigate();

	async function redirect() {
		props.setisNavbarPresent(true);

		const data = {
			password: password,
		};

		// get all products
		let response = await axios
			.post(`${base_url}/api/v1/Luxuriant/get_Products`, data, {
				headers: {
					"Content-Type": "application/json",
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
		console.log(response);
		if (response.data.message === "simulation") {
			const data = [
				{
					_id: "654cd992ae6a271afeed6b4c",
					product_name: "Blue Jar",
					product_cost: 100,
				},
				{
					_id: "654cd992ae6a271afeed6b4d",
					product_name: "Purple Jar",
					product_cost: 200,
				},
				{
					_id: "654cd992ae6a271afeed6b4e",
					product_name: "Pink Jar",
					product_cost: 300,
				},
			];
			setProductInfo(data);
		} else if (response.data.message === "Success") {
			const data = response.data.products;
			console.log(data);
			setProductInfo(data);
			productDetails = data;
		} else if (response.data.message === "No Products found") {
			setProductInfo([]);
		}

		// get all customers
		response = await axios
			.post(`${base_url}/api/v1/Luxuriant/get_customers`, data, {
				headers: {
					"Content-Type": "application/json",
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
			let data = [];
			setCustomerInfo(data);
		} else if (response.data.message === "Success") {
			const data = response.data.customers;
			console.log(data);
			setCustomerInfo(data);
			customerDetails = data;
		} else if (response.data.message === "No customers found") {
			setCustomerInfo([]);
		}

		// get all orders
		response = await axios
			.post(`${base_url}/api/v1/Luxuriant/get_orders`, data, {
				headers: {
					"Content-Type": "application/json",
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
			setOrderInfo([]);
		} else if (response.data.message === "Success") {
			const data = response.data.orders;
			console.log(data);
			setOrderInfo(reformatOrders(data));
			// setOrderInfo(data);
		} else if (response.data.message === "No Orders found") {
			setOrderInfo([]);
		}

		console.log("redirecting, after downloading all data");
		props.setisNavbarPresent(true);
		navigate("/orders");

		// stop showing the svg spinner in login button
		const login_button = document.getElementById("login_button");
		login_button.innerHTML = `Log In`;
	}

	async function handleClick() {
		const response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/check_password`,
				{ password },
				{
					params: {},
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

		if (response.data.message === "Success") {
			setUserPassword(password);
			await redirect();
		} else if (response.data.message === "simulation") {
			console.log("This is a simulation");
			// redirect();
		} else if (response.data.message === "Failure") {
			comment.innerHTML = "Incorrect Password";
			// stop showing the svg spinner in login button
			const login_button = document.getElementById("login_button");
			login_button.innerHTML = `Log In`;
		}
	}

	const validatePassword = (password) => {
		// make sure password isnt some xss attack using regex
		const regex = /(<([^>]+)>)/gi;
		if (regex.test(password)) {
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// show the svg spinner in login button while the password is being validated
		const login_button = document.getElementById("login_button");
		login_button.innerHTML = `<div class="flex justify-center text-lg gap-2"> <div> Fetching Data...</div>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg></div>`;

		if (!validatePassword(password)) {
			setPasswordError("Enter Correct Password");
		} else {
			setPasswordError("");
			handleClick();
		}
	};

	const { setTheme } = React.useContext(ThemeContext);

	useEffect(() => {
		setTheme("light");
		const light_button = document.getElementById("light_button");
		light_button.click();
	});

	return (
		<div className="p-0 m-0 bg-base-100">
			<div className="overflow-hidden">
				<div className="lg:flex rubik overflow-hidden">
					<div className="lg:w-1/2 xl:max-w-screen-sm">
						<div className="py-12 bg-base-100 lg:bg-transparent flex justify-center lg:justify-center lg:px-12">
							<div className="cursor-pointer flex flex-col items-center justify-center text-center">
								<div
									id="luxelogo"
									className="w-12 h-12 m-4"
								></div>
								<div className="text-center flex justify-center items-center w-full">
									<div className="text-4xl text-secondary-content prata">
										Luxuriant Luxe Admin Page
									</div>
								</div>
							</div>
						</div>
						<div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
							<h2
								className="text-center text-4xl text-secondary-content font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
							>
								Log in
							</h2>
							<div
								className="text-center text-xl text-primary font-display font-semibold lg:text-left xl:text-xl
              xl:text-bold rubik pt-3"
							>
								<span className="italic">
									Please Enter your Master Password to Access
									Accounts
								</span>
								<br></br>
								<span className="text-accent">
									{" "}
									Welcome, Balraj Tavanandi and Janestha Singh
								</span>
							</div>
							<div className="mt-12">
								<form onSubmit={handleSubmit}>
									<div className="mt-8">
										<div className="flex justify-between items-center">
											<div className="text-2xl font-bold text-base-content bg-transparent tracking-wide">
												Master Password
											</div>
											<div>
												<NavLink
													className="text-xl font-display font-semibold text-accent hover:text-accent-focus
                                  cursor-pointer"
													to="https://app.cyclic.sh/#/app/balraj2003-luxuriantluxe/vars"
												>
													Forgot Password?
												</NavLink>
											</div>
										</div>
										<input
											className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
											type="password"
											placeholder="Enter your password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
										{passwordError && (
											<div className="text-red-500 text-sm mt-1">
												{passwordError}
											</div>
										)}
									</div>
									<div
										id="comment"
										className="text-xl text-center mt-10 text-accent"
									>
										Enter Credentials to Log In!
									</div>
									<div className="mt-10">
										<button
											className="bg-primary p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus text-primary-content
                          shadow-lg text-xl cursor-pointer"
											id="login_button"
											type="submit"
										>
											Log In
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="hidden lg:flex items-center justify-center bg-indigo-200 flex-1 h-screen">
						<div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
							<div id="purple" className="w-96 h-96 m-4"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
