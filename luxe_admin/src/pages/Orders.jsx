import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { DBInfoContext } from "../context/DBInfoContext.jsx";

import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import { IconRefresh, IconSearch } from "@tabler/icons-react";

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

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Orders = () => {
	const { theme } = React.useContext(ThemeContext);
	const { userPassword } = React.useContext(UserContext);
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [orderDetails, setOrderDetails] = React.useState(null);
	const [setCustomerDetails] = React.useState(null);
	const [apiCallMade, setApiCallMade] = useState(false);
	const {
		orderInfo,
		setOrderInfo,
		customerInfo,
		setCustomerInfo,
		productInfo,
	} = React.useContext(DBInfoContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentOrderIdToSendMainTo, setCurrentOrderIdToSendMainTo] =
		useState("");

	let iSentOnce = false;

	// how orders are returned from the server, in a list of objects
	// {
	// 	"_id": "654ce193fa0a952c5deaca44",
	// 	"order_date": "2023-11-09T13:41:39.649Z",
	// 	"order_cost": "400",
	// 	"payment_status": "paid",
	// 	"customer_id": "654ce0a73c1e87c8a25ef2ea",
	//  "customer_name" : "John Doe",
	// 	"order_details": [
	// 	{
	// 		"product_id": "654cd992ae6a271afeed6b4c",
	// 		"quantity": "654cd992ae6a271afeed6b4d",
	// 		"price": 100
	// 	},
	// 	{
	// 		"product_id": "00000002fa0a952c5deaca43",
	// 		"quantity": 1,
	// 		"price": 200
	// 	}
	// ]
	// }

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
				let current_product = productInfo.filter((product) => {
					return product._id === product_id;
				});
				// console.log("product", current_product);
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
			for (let j = 0; j < customerInfo.length; j++) {
				if (customerInfo[j]._id === customer_id) {
					customer_name = customerInfo[j].customer_name;
					customer_address = customerInfo[j].customer_address;
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

	const fetch_customer_from_server = async () => {
		// get all orders
		let response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/get_customers`,
				{
					password: userPassword,
				},
				{
					headers: {
						"Content-Type": "application/json",
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
			setCustomerInfo([]);
		} else if (response.data.message === "Success") {
			const data = response.data.customers;
			console.log(data);
			setCustomerInfo(data);
			setCustomerDetails(data);
		} else if (response.data.message === "No Orders found") {
			setCustomerInfo([]);
			setCustomerDetails([]);
		}
	};

	const fetch_order_from_server = async () => {
		// get all orders
		let response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/get_orders`,
				{
					password: userPassword,
				},
				{
					headers: {
						"Content-Type": "application/json",
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
		console.log("response from server");
		console.log(response.data);
		if (response.data.message === "simulation") {
			setOrderInfo([]);
		} else if (response.data.message === "Success") {
			const data = response.data.orders;
			console.log(data);
			let reformatData = reformatOrders(data);
			setOrderInfo(reformatData);
			setOrderDetails(reformatData);
		} else if (response.data.message === "No Orders found") {
			setOrderInfo([]);
			setOrderDetails([]);
		}
	};

	const get_order_details = () => {
		setOrderDetails(orderInfo);
		console.log("order details");
		console.log(orderInfo);
	};

	const change_payment_and_send_mail = async () => {
		if (currentOrderIdToSendMainTo === "") {
			console.log("there is no order id to send mail to. ");
			return;
		}

		// show loader for sending mail
		toast.loading("Sending Mail");

		let response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/change_payment_status`,
				{
					password: userPassword,
					order_id: currentOrderIdToSendMainTo,
					payment_status: "paid",
				},
				{
					headers: {
						"Content-Type": "application/json",
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
		if (response.data.message === "Success") {
			console.log("payment status changed to paid");

			// get customer name from customer id in response.data.order
			const order = response.data.order;
			const customer_id = order.customer_id;
			const customer_name = customerInfo.filter((customer) => {
				return customer._id === customer_id;
			})[0].customer_name;

			// send toast that mail was sent
			// dismiss loading toast
			toast.dismiss();
			// send a toast that emails were sent
			toast.success("Email sent to " + customer_name);
			// await fetch_order_from_server();
		} else {
			console.log("payment status not changed");
			// dismiss loading toast
			toast.dismiss();
			// send a toast message saying couldnt send emails
			toast.error("Couldnt send email");
		}
	};

	useEffect(() => {
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
		if (apiCallMade === false) {
			if (orderDetails === null) {
				if (iSentOnce === false) {
					get_order_details();
					setApiCallMade(true);
					iSentOnce = true;
				}
			}
		}
	}, [orderDetails]);

	function filterOrderDetails() {
		// this is the format of orderDetails
		// <th>Order Date</th>
		// <th>Order Time</th>
		// <th>Customer ID</th>
		// <th>Order Cost</th>
		// <th>Payment Status</th>
		// <th>Products</th>
		// <th>Products</th>
		// <th>Order ID</th>

		return orderDetails.filter((order) => {
			if (searchTerm === "") {
				return order;
			} else if (
				order.customer_id
					? order.customer_id
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			} else if (
				order.order_cost
					? order.order_cost
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			} else if (
				order.payment_status
					? order.payment_status
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			} else if (
				order.order_date
					? order.order_date
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			} else if (
				order.order_details
					? order.order_details
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			} else if (
				order._id
					? order._id.toLowerCase().includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			} else if (
				order.customer_name
					? order.customer_name
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return order;
			}
			return false;
		});
	}

	return (
		<div className="min-h-screen">
			<Toaster />
			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">Our Orders</div>{" "}
			</div>
			{/* Add Search bar */}
			<div className="flex justify-center gap-4">
				<div className="flex justify-center items-center">
					<div className="flex items-center border-2 border-gray-300 rounded-md shadow-sm">
						<input
							type="text"
							name="search"
							id="search"
							className="w-full rounded-md p-2 bg-transparent focus:outline-none"
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
						/>
						<IconSearch className="w-8 h-8" />
					</div>
				</div>
				<div>
					<button
						className="btn btn-md bg-primary text-primary-content mx-4 p-2"
						onClick={() => {
							fetch_customer_from_server();
							fetch_order_from_server();
						}}
					>
						<IconRefresh className="w-8 h-8" />
					</button>
				</div>
			</div>
			<div className="overflow-x-auto p-10">
				{orderDetails === null || orderDetails.length === 0 ? (
					<div className="flex justify-center">
						{/*<div> Loading Products</div>*/}
						<div className="flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
									opacity=".25"
								/>
								<path
									fill="currentColor"
									d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
								>
									<animateTransform
										attributeName="transform"
										dur="0.75s"
										repeatCount="indefinite"
										type="rotate"
										values="0 12 12;360 12 12"
									/>
								</path>
							</svg>
						</div>
					</div>
				) : (
					<table className="table text-xl outline outline-1 ">
						<thead className="text-xl">
							<tr className="border-neutral border-b-1 bg-base-300 text-base-content">
								<th></th>
								<th>Order Date</th>
								<th>Order Time</th>
								<th>Customer Name</th>
								<th>Customer Address</th>
								<th>Order Cost</th>
								<th>Payment Status</th>
								<th>Order Details</th>
								<th>Order ID</th>
								<th>Customer ID</th>
							</tr>
						</thead>
						<tbody>
							{filterOrderDetails().map((order, index) => {
								return (
									<tr
										key={index}
										className="hover border-accent border-t-1"
									>
										<td>{index + 1}</td>
										<td>{order.order_date}</td>
										<td>{order.order_time}</td>
										<td>{order.customer_name}</td>
										<td>{order.customer_address}</td>
										<td>{order.order_cost}</td>
										<td>
											<div className="flex justify-center gap-4">
												<div>
													{order.payment_status}
												</div>
												{order.payment_status ===
												"Pending" ? (
													<input
														type="checkbox"
														checked={
															order.payment_status ===
															"paid"
														}
														className="checkbox shadow-sm shadow-accent"
														onChange={() => {
															// call the modal
															setCurrentOrderIdToSendMainTo(
																order._id
															);
															const my_modal_1 =
																document.getElementById(
																	"my_modal_1"
																);
															my_modal_1.showModal();
														}}
													/>
												) : null}
											</div>
										</td>
										<td>{order.order_details}</td>
										<td>{order._id}</td>
										<td>{order.customer_id}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
			<ScrollToTopButton />
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box bg-secondary text-secondary-content">
					<h3 className="font-bold text-lg">Are you Sure?</h3>
					<p className="py-4">
						Are you sure you want to change payment status to paid,
						and send a confirmation email to the customer?
					</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn m-2">No</button>
							<button
								className="btn m-2"
								onClick={() => {
									// change payment status to paid
									// send mail to customer
									change_payment_and_send_mail().then(() => {
										fetch_order_from_server();
									});
								}}
							>
								Yes! Send Mail!
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Orders;
