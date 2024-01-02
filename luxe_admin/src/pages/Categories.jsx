import React, { useEffect } from "react";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { IconRefresh } from "@tabler/icons-react";

// categories looks like this
// {
// 	"_id": "60f9b3b3e6c3a3b4b8f7b3b4",
// 	"name": "Clothing",
// 	"description": "Clothing",
// 	"sub_categories": [
// 		{
// 			sub_category_name: "T-Shirts",
// 			sub_category_image: "https://i.imgur.com/1OcCQZS.png",
// 		},
// 		],
// },
const Categories = () => {
	const { categoryInfo, setCategoryInfo } = React.useContext(DBInfoContext);
	const [showDialog, setShowDialog] = useState(false);
	const [newCategory, setNewCategory] = useState({});
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const { userPassword } = React.useContext(UserContext);
	useEffect(() => {
		// log everything
		// getCategoriesFromServer();
		console.log("categories", categoryInfo);
	}, []);

	const getCategoriesFromServer = async () => {
		// send request to get all categories
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/get_categories`,
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
				if (response.data.message === "Success") {
					toast.success("Categories fetched successfully");
					setCategoryInfo(response.data.categories);
				} else {
					toast.error("Error fetching categories");
				}
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

	const handleAddCategory = async () => {
		// send request to add new category
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/add_category`,
				{
					password: userPassword,
					category: newCategory,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				toast.success("Category added successfully");
				getCategoriesFromServer();
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
		setNewCategory({});
	};

	const handleDeleteCategory = async (categoryId) => {
		// send request to delete category
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/delete_category`,
				{
					password: userPassword,
					category_id: categoryId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				toast.success("Category deleted successfully");
				getCategoriesFromServer();
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

	const handleUpdateCategory = async (categoryId, updatedCategory) => {
		// send request to update category
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/update_category`,
				{
					password: userPassword,
					category_id: categoryId,
					category: updatedCategory,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				toast.success("Category updated successfully");
				getCategoriesFromServer();
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
		setNewCategory({});
	};

	return (
		<div>
			<Toaster />
			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">FAQs</div>
			</div>
			{/* add button */}
			<div className="flex justify-center m-4">
				<button
					className="btn btn-primary"
					onClick={() =>
						document.getElementById("my_modal_1").showModal()
					}
				>
					Add Category
				</button>
				<button
					className="btn btn-md bg-primary text-primary-content mx-4 p-2"
					onClick={() => {
						getCategoriesFromServer();
					}}
				>
					<IconRefresh className="w-8 h-8" />
				</button>
			</div>

			{/* show category section */}
			<div>
				{categoryInfo
					? categoryInfo.map((category) => {
							return (
								<div
									className="flex justify-center m-4"
									key={category._id}
								>
									<div className="card shadow-lg compact bg-base-300 text-base-content">
										<div className="card-body">
											<h2 className="card-title">
												{category.category_name}
											</h2>
											<input
												className="input input-bordered w-full min-w-48 input-accent text-lg"
												type="text"
												value={category.category_name}
												onChange={(e) => {
													// Update the category_name value
													category.category_name =
														e.target.value;
												}}
											/>
											<div className="text-xl">
												Write Category Description
											</div>
											<input
												className="input input-bordered w-full min-w-48 input-accent text-lg"
												type="text"
												value={
													category.category_description
												}
												onChange={(e) => {
													// Update the category_description value
													category.category_description =
														e.target.value;
												}}
											/>
											<div className="card-actions">
												<button
													className="btn btn-secondary"
													onClick={() => {
														document
															.getElementById(
																"my_modal_2"
															)
															.showModal();
														setNewCategory(
															category
														);
													}}
												>
													Edit
												</button>
												<button
													className="btn btn-secondary"
													onClick={() => {
														handleDeleteCategory(
															category.id
														);
													}}
												>
													Delete
												</button>
											</div>
											{/* button for adding a subcategory */}
											<div className="flex justify-center m-4">
												<button
													className="btn btn-primary"
													onClick={() => {
														console.log(
															"category",
															category
														);
													}}
												>
													Add Subcategory
												</button>
											</div>
											{/* table for subcategories */}
											<div className="flex justify-center m-4">
												<table className="table text-xl outline outline-1 ">
													<thead className="text-xl">
														<tr className="border-neutral border-b-1 bg-base-300 text-base-content">
															<th>Subcategory</th>
															<th>Image</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														{category.sub_categories
															? category.sub_categories.map(
																	(
																		sub_category
																	) => {
																		return (
																			<tr
																				key={
																					sub_category.sub_category_name
																				}
																			>
																				<td>
																					<input
																						className="input input-bordered w-full min-w-48 input-accent text-lg"
																						type="text"
																						value={
																							sub_category.sub_category_name
																						}
																						onChange={(
																							e
																						) => {
																							// Update the sub_category_name value
																							sub_category.sub_category_name =
																								e.target.value;
																						}}
																					/>
																				</td>
																				<td>
																					<input
																						className="input input-bordered w-full min-w-48 input-accent text-lg"
																						type="text"
																						value={
																							sub_category.sub_category_image
																						}
																						onChange={(
																							e
																						) => {
																							// Update the sub_category_image value
																							sub_category.sub_category_image =
																								e.target.value;
																						}}
																					/>
																				</td>
																				<td>
																					<button className="btn btn-secondary">
																						Delete
																					</button>
																				</td>
																			</tr>
																		);
																	}
															  )
															: null}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
};

export default Categories;
