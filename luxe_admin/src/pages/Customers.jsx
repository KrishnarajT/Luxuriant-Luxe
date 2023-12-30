import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext.jsx";
import { IconRefresh, IconSearch, IconTrash } from "@tabler/icons-react";
import { Toaster, toast } from "react-hot-toast";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Customers = () => {
	const { theme } = React.useContext(ThemeContext);
	const { userPassword } = React.useContext(UserContext);
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [customerDetails, setCustomerDetails] = React.useState(null);
	const [apiCallMade, setApiCallMade] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [customertoDelete, setCustomerToDelete] = useState(null);

	let iSentOnce = false;

	const { customerInfo, setCustomerInfo } = React.useContext(DBInfoContext);

	// customer details is a list of such objects
	// 	customer_id: 1,
	//    customer_name: "some name",
	//    customer_address: "some address",
	//    customer_email: "some email",
	//    customer_phone: "some phone"
	// 		customer_points: 0

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

	const get_customer_details = async () => {
		setCustomerDetails(customerInfo);
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
			if (customerDetails === null) {
				if (iSentOnce === false) {
					get_customer_details();
					setApiCallMade(true);
					iSentOnce = true;
				}
			}
		}
	}, []);

	function filtered_customer_details(customerDetails) {
		return customerDetails.filter((customer) => {
			if (searchTerm === "") {
				return customer;
			} else if (
				customer.customer_name
					? customer.customer_name
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return customer;
			} else if (
				customer.customer_email
					? customer.customer_email
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return customer;
			} else if (
				customer.customer_address
					? customer.customer_address
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return customer;
			} else if (
				customer.customer_phone
					? customer.customer_phone
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return customer;
			} else if (
				customer._id.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return customer;
			} else if (
				customer.customer_points
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			) {
				return customer;
			}
		});
	}

	return (
		<div className="min-h-screen">
			<Toaster />
			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">Our Customers</div>
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
						}}
					>
						<IconRefresh className="w-8 h-8" />
					</button>
				</div>
			</div>

			<div className="overflow-x-auto p-8">
				{customerDetails === null || customerDetails.length === 0 ? (
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
								<th>Customer Name</th>
								<th>Customer Email</th>
								<th>Customer Address</th>
								<th>Customer Phone</th>
								<th>Customer Points</th>
								<th>Customer Id</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{filtered_customer_details(customerDetails).map(
								(customer, index) => {
									return (
										<tr
											key={index}
											className="hover border-accent border-t-1"
										>
											<td>{index + 1}</td>
											<td>{customer.customer_name}</td>
											<td>{customer.customer_email}</td>
											<td className="w-64">
												{customer.customer_address}
											</td>
											<td>{customer.customer_phone}</td>
											<td>{customer.customer_points}</td>
											<td>{customer._id}</td>
											<td>
												<button
													className="btn btn-error btn-md p-2"
													onClick={() => {
														setCustomerToDelete(
															customer._id
														);
														const modal =
															document.getElementById(
																"delete_customer_modal"
															);
														modal.showModal();
													}}
												>
													<IconTrash className="w-8 h-8" />
												</button>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				)}
			</div>
			<ScrollToTopButton />

			{/* Modal to delete customer */}

			<dialog id="delete_customer_modal" className="modal">
				<div className="modal-box bg-secondary text-secondary-content">
					<h3 className="font-bold text-lg">Are you Sure?</h3>
					<p className="py-4">
						Are you sure you want to delete this customer?
					</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn m-2">No</button>
							<button
								className="btn m-2"
								onClick={() => {
									// delete the customer
									// send mail to customer
									axios
										.post(
											`${base_url}/api/v1/Luxuriant/delete_customer`,
											{
												password: userPassword,
												customer_id: customertoDelete,
											},
											{
												headers: {
													"Content-Type":
														"application/json",
												},
											}
										)
										.then((response) => {
											console.log(response.data);
											if (
												response.data.message ===
												"success"
											) {
												fetch_customer_from_server();
												toast.success(
													"Customer Deleted"
												);
											} else {
												toast.error(
													"Couldnt delete customer"
												);
											}
										})
										.catch((error) => {
											console.error(error);
											toast.error(
												"Couldnt delete customer, Check Server. "
											);
										});
								}}
							>
								Yes! Delete Customer!
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Customers;
