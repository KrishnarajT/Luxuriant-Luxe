import React, { useEffect } from "react";

// statics look like this
// {
// 	"id": 1,
// 	"key": "How do I return an item?",
// 	"value": "You can return an item by clicking on the return button on the order page.",
// },
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { IconRefresh } from "@tabler/icons-react";

const Static = () => {
	const { staticInfo, setStaticInfo } = React.useContext(DBInfoContext);
	const [showDialog, setShowDialog] = useState(false);
	const [newKey, setNewKey] = useState("");
	const base_url = React.useContext(BaseUrlContext).baseUrl;

	const [newValue, setNewValue] = useState("");
	const { userPassword } = React.useContext(UserContext);
	useEffect(() => {
		// log everything
	}, [staticInfo]);
	useEffect(() => {
		// getStaticFromServer();
	}, []);

	const handleAddStatic = async () => {
		const newStatic = {
			key: newKey,
			value: newValue,
		};
		// send request to add new staticInfo
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/add_static_stuff`,
				{
					password: userPassword,
					static_stuff: newStatic,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				toast.success("Static added successfully");
				getStaticFromServer();
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
		setShowDialog(false);
		setNewKey("");
		setNewValue("");
	};

	const getStaticFromServer = async () => {
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/get_static_stuff`,
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
				setStaticInfo(response.data.static_stuff);
				// toast
				toast.success("Static loaded successfully");
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				// toast
				toast.error("Static failed to load");
				return {
					data: {
						message: "simulation",
					},
				};
			});
	};

	const handleDeleteStatic = (id) => {
		// send request to delete staticInfo
		axios
			.post(
				`${base_url}/api/v1/Luxuriant/delete_static_stuff`,
				{
					password: userPassword,
					static_id: id,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("Static deleted successfully");
				} else {
					toast.error("Static failed to delete");
				}
				getStaticFromServer();
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
	};

	const handleUpdatingStatic = (id, key, value) => {
		// send request to update staticInfo
		axios
			.post(
				`${base_url}/api/v1/Luxuriant/update_static_stuff`,
				{
					password: userPassword,
					static_id: id,
					static_stuff: {
						key: key,
						value: value,
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("Static updated successfully");
				} else {
					toast.error("Static failed to update");
				}
				getStaticFromServer();
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
	};
	return (
		<div>
			<Toaster />
			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">Static</div>
			</div>
			{/* add button */}
			<div className="flex justify-center m-4">
				<button
					className="btn btn-primary"
					onClick={() =>
						document.getElementById("my_modal_1").showModal()
					}
				>
					Add Static
				</button>
				<button
					className="btn btn-md bg-primary text-primary-content mx-4 p-2"
					onClick={() => {
						getStaticFromServer();
					}}
				>
					<IconRefresh className="w-8 h-8" />
				</button>
			</div>
			<div>
				{staticInfo?.length > 0 ? (
					<div className="overflow-x-auto mx-4 outline rounded-2xl">
						<table className="table text-xl outline outline-1 ">
							<thead className="text-xl">
								<tr className="border-neutral border-b-1 bg-base-300 text-base-content">
									<th className="text-left">Key</th>
									<th className="text-left">Value</th>
									<th className="text-left">Actions</th>
								</tr>
							</thead>
							<tbody>
								{staticInfo.map((statici) => (
									<tr key={statici._id}>
										<td>
											<input
												className="input input-bordered input-info w-full"
												type="text"
												value={statici.key}
												onChange={(e) => {
													const updatedStatic = {
														...statici,
														key: e.target.value,
													};
													console.log(statici);
													setStaticInfo(
														staticInfo.map(
															(statici) => {
																if (
																	statici._id ===
																	updatedStatic._id
																) {
																	return updatedStatic;
																}
																return staticInfo;
															}
														)
													);
												}}
											/>
										</td>
										<td>
											<input
												type="text"
												className="input input-bordered input-info w-full"
												value={statici.value}
												onChange={(e) => {
													const updatedStatic = {
														...statici,
														value: e.target.value,
													};
													setStaticInfo(
														staticInfo.map(
															(statici) => {
																if (
																	statici._id ===
																	updatedStatic._id
																) {
																	return updatedStatic;
																}
																return staticInfo;
															}
														)
													);
												}}
											/>
										</td>
										<td>
											<div className="flex justify-center gap-4">
												<button
													className="btn btn-outline btn-md"
													onClick={() => {
														handleUpdatingStatic(
															statici._id,
															statici.key,
															statici.value
														);
													}}
												>
													Update
												</button>
												<button
													className="btn btn-outline btn-md"
													onClick={() => {
														handleDeleteStatic(
															staticInfo._id
														);
													}}
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : null}
			</div>
			{/* add dialogue */}
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add Static</h3>
					<p className="py-4">Add your new staticInfo here.</p>
					<div className="modal-action justify-center">
						<form method="dialog">
							<label className="label">
								<span className="label-text">key</span>
							</label>
							<input
								type="text"
								placeholder="Enter key"
								className="input input-bordered"
								value={newKey}
								onChange={(e) => {
									setNewKey(e.target.value);
								}}
							/>
							<label className="label">
								<span className="label-text">value</span>
							</label>
							<input
								type="text"
								placeholder="Enter value"
								className="input input-bordered"
								value={newValue}
								onChange={(e) => {
									setNewValue(e.target.value);
								}}
							/>
							<div className="w-full flex flex-row gap-4">
								<button
									className="btn btn-primary mt-4"
									onClick={(e) => {
										// if either of key or value is empty, don't submit, toast
										if (newKey === "" || newValue === "") {
											toast.error(
												"Please fill in all fields"
											);
											return;
										}
										e.preventDefault();
										handleAddStatic();
									}}
								>
									Add Static
								</button>
								{/* if there is a button in form, it will close the modal */}
								<button className="btn btn-primary mt-4">
									Close
								</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Static;
