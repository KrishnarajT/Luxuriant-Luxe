import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { BaseUrlContext } from "../context/BaseUrlContext.jsx";
import ScrollToTopButton from "../components/ui/ScrollToTopButton.jsx";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext.jsx";
// import react toastify
import { Toaster, toast } from "react-hot-toast";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Emails = () => {
	const { theme } = React.useContext(ThemeContext);
	const { userPassword } = React.useContext(UserContext);
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const { customerInfo } = React.useContext(DBInfoContext);
	const [batches, setBatches] = useState([]);
	const [batchLimit, setBatchLimit] = useState(175);
	const [EmailBatch, setEmailBatch] = useState([]);

	const SendEmails = async () => {
		// send emails to all customers in the batch via backend api call.
		// the backend api call will send emails to all customers in the batch

		const data = {
			password: userPassword,
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
		if (response.data.message === "Success") {
			const data = response.data.products;
			console.log(data);
			// send a toast that emails were sent
			toast.success("Emails were sent");
		} else {
			console.log("Couldnt send emails");
			// send a toast message saying couldnt send emails
			toast.error("Couldnt send emails");
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
		makeCustomerBatches();
	}, []);

	const makeCustomerBatches = () => {
		// divide into batches of batchlimit, add each customer to a batch, and add batches to the batches array defined in usestate
		let batches = [];
		let batch = [];
		let batchCount = 0;
		customerInfo.forEach((customer) => {
			if (batchCount === batchLimit) {
				batches.push(batch);
				batch = [];
				batchCount = 0;
			}
			if (customer.customer_email) {
				batch.push(customer.customer_email);
				batchCount++;
			}
		});
		batches.push(batch);
		setBatches(batches);
		console.log(batches);
	};

	return (
		<div className="h-screen">
			<Toaster />
			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">
					Custom Subscription Email
				</div>{" "}
			</div>
			{/* display text input to set batch limit */}
			<div className="flex justify-center m-4 items-center">
				<div className="text-2xl prata my-6">
					Enter Batch Limit <br />
					(less than 200, as per Mailjet Account free tier)
				</div>{" "}
				<div className="flex justify-center m-4 items-center">
					<input
						type="number"
						className="input input-bordered w-fit input-primary"
						placeholder="Enter Batch Limit"
						onChange={(e) => {
							setBatchLimit(e.target.value);
						}}
						value={batchLimit}
					/>
				</div>
			</div>
			{/* display text to enter subject of mail */}
			<div className="flex flex-col justify-center m-4 items-center">
				<div className="text-2xl prata my-2">
					Enter Subject of Email
				</div>{" "}
				<div className="flex justify-center m-4 items-center">
					<input
						type="text"
						className="input input-bordered w-fit text-2xl input-primary"
						placeholder="Enter Subject of Email"
					/>
				</div>
			</div>
			{/* Enter Content of the Email */}
			<div className="flex flex-col justify-center m-4 items-center w-full">
				<div className="text-2xl prata my-2">
					Enter Content of Email
				</div>{" "}
				<div className="flex justify-center m-4 items-center w-1/2">
					<textarea
						className="textarea textarea-primary p-2 m-2 w-full rounded-xl text-2xl"
						placeholder="Enter Content of Email"
					></textarea>
				</div>
			</div>
			{/* Display Batches as radio buttons only selectable one at a time */}
			<div className="my-6 flex justify-center items-center">
				<div className="text-2xl prata text-center">
					Select Batch to Send Emails <br /> (Only 1, try not to
					repeat. Select the next batch only after the previous batch
					is done, the next day. )
				</div>
			</div>{" "}
			<div className="flex justify-center m-4 items-center">
				<div className="flex justify-center m-4 items-center">
					{batches.map((batch, index) => {
						return (
							<div
								className="form-control form-control-radio"
								key={index}
							>
								<label className="cursor-pointer label">
									<input
										type="radio"
										name="batch radio"
										className="radio radio-accent"
										onChange={
											// if it is checked, set emailbatch to current batch
											(e) => {
												// show a toast
												toast.success(
													"Batch " +
														(index + 1) +
														" selected"
												);
												if (e.target.checked) {
													setEmailBatch(batch);
												}
											}
										}
									/>

									<span className="label-text text-xl prata m-2">
										Batch {index + 1} ({batch.length}{" "}
										customers)
									</span>
								</label>
							</div>
						);
					})}
				</div>
			</div>
			{/* Display Send Email Button */}
			<div className="flex justify-center m-4 items-center">
				<button
					className="btn btn-primary btn-lg"
					onClick={() => {
						SendEmails();
					}}
				>
					Send Emails to Batch
				</button>
			</div>
			<ScrollToTopButton />
		</div>
	);
};

export default Emails;
