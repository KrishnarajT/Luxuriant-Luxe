import React, { useEffect } from "react";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { IconRefresh } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
// categories looks like this
// {
// 	"_id": "60f9b3b3e6c3a3b4b8f7b3b4",
// 	"name": "Clothing",
// 	"description": "Clothing",
// 	"category_image": "https://i.imgur.com/1OcCQZS.png",
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
	const [newCategory, setNewCategory] = useState({
		category_name: "",
		category_description: "",
		category_image: "",
		sub_categories: [],
	});
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [categoryDetails, setcategoryDetails] = useState(categoryInfo);
	const { userPassword } = React.useContext(UserContext);
	useEffect(() => {
		// log everything
		// getCategoriesFromServer();
		setcategoryDetails(categoryInfo);
		console.log("categories", categoryDetails);
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
					setcategoryDetails(response.data.categories);
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
		// make sure all fields are filled
		if (
			newCategory.category_name === "" ||
			newCategory.category_description === "" ||
			newCategory.category_image === ""
		) {
			toast.error("Please fill all fields");
			return;
		}
		console.log(newCategory);
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
		console.log(categoryId, updatedCategory);
		// filter id from updatedCategory
		delete updatedCategory._id;
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
				{categoryDetails
					? categoryDetails.map((category) => {
							return (
								<div
									className="flex justify-center m-4"
									key={category._id}
								>
									<div className="card shadow-lg compact bg-base-300 text-base-content">
										<div className="card-body">
											<h2 className="card-title">
												Category Name
											</h2>
											<input
												className="input input-bordered w-full min-w-48 input-accent text-lg"
												type="text"
												value={category.category_name}
												onChange={(e) => {
													// Update the category_name value
													category.category_name =
														e.target.value;
													// change category details
													let newCategories = [
														...categoryDetails,
													];
													newCategories[
														newCategories.findIndex(
															(c) =>
																c._id ===
																category._id
														)
													] = category;
													setcategoryDetails(
														newCategories
													);
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
													// change category details
													let newCategories = [
														...categoryDetails,
													];
													newCategories[
														newCategories.findIndex(
															(c) =>
																c._id ===
																category._id
														)
													] = category;
													setcategoryDetails(
														newCategories
													);
												}}
											/>
											<h2 className="text-xl">
												Category Image
											</h2>
											<input
												className="input input-bordered w-full min-w-48 input-accent text-lg"
												type="text"
												value={category.category_image}
												onChange={(e) => {
													// Update the category_name value
													category.category_image =
														e.target.value;
													// change category details
													let newCategories = [
														...categoryDetails,
													];
													newCategories[
														newCategories.findIndex(
															(c) =>
																c._id ===
																category._id
														)
													] = category;
													setcategoryDetails(
														newCategories
													);
												}}
											/>
											<div className="card-actions">
												<button
													className="btn btn-secondary"
													onClick={() => {
														handleUpdateCategory(
															category._id,
															categoryDetails[
																categoryDetails.findIndex(
																	(c) =>
																		c._id ===
																		category._id
																)
															]
														);
													}}
												>
													Save Updated Category
												</button>
												<button
													className="btn btn-secondary"
													onClick={() => {
														handleDeleteCategory(
															category._id
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
														let newc = {
															...category,
														};
														newc.sub_categories =
															newc.sub_categories ||
															[];
														newc.sub_categories.push(
															{
																sub_category_id:
																	uuidv4(),
																sub_category_name:
																	"",
																sub_category_image:
																	"",
															}
														);
														// set categories to newc where newc._id === category._id
														let newCategories = [
															...categoryDetails,
														];
														newCategories[
															newCategories.findIndex(
																(c) =>
																	c._id ===
																	category._id
															)
														] = newc;
														setcategoryDetails(
															newCategories
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
															<th>ID</th>
															<th>Name</th>
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
																					sub_category.sub_category_id
																				}
																			>
																				<td>
																					{
																						sub_category.sub_category_id
																					}
																				</td>
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
																							// Update the sub_category_image value
																							let newc =
																								{
																									...category,
																								};
																							newc.sub_categories[
																								newc.sub_categories.findIndex(
																									(
																										s
																									) =>
																										s.sub_category_id ===
																										sub_category.sub_category_id
																								)
																							].sub_category_name =
																								e.target.value;
																							let new_categories =
																								[
																									...categoryDetails,
																								];
																							new_categories[
																								new_categories.findIndex(
																									(
																										c
																									) =>
																										c._id ===
																										category._id
																								)
																							] =
																								newc;
																							setcategoryDetails(
																								new_categories
																							);
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
																							let newc =
																								{
																									...category,
																								};
																							newc.sub_categories[
																								newc.sub_categories.findIndex(
																									(
																										s
																									) =>
																										s.sub_category_id ===
																										sub_category.sub_category_id
																								)
																							].sub_category_image =
																								e.target.value;
																							let new_categories =
																								[
																									...categoryDetails,
																								];
																							new_categories[
																								new_categories.findIndex(
																									(
																										c
																									) =>
																										c._id ===
																										category._id
																								)
																							] =
																								newc;
																							setcategoryDetails(
																								new_categories
																							);
																						}}
																					/>
																				</td>
																				<td>
																					<button
																						className="btn btn-secondary"
																						onClick={() => {
																							let newc =
																								{
																									...category,
																								};
																							newc.sub_categories =
																								newc.sub_categories.filter(
																									(
																										s
																									) =>
																										s.sub_category_id !==
																										sub_category.sub_category_id
																								);
																							// set categories to newc where newc._id === category._id
																							let newCategories =
																								[
																									...categoryDetails,
																								];
																							newCategories[
																								newCategories.findIndex(
																									(
																										c
																									) =>
																										c._id ===
																										category._id
																								)
																							] =
																								newc;
																							setcategoryDetails(
																								newCategories
																							);
																						}}
																					>
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
			{/* Modal for adding a category */}
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add Category</h3>
					<p className="py-4">
						Add just the name, image and description of the
						category, Subcategories can be added later. You can add
						multiple subcategories to a category.
					</p>
					<div className="modal-action justify-center">
						<form method="dialog">
							<label className="label">
								Category Name
								<input
									className="input input-bordered w-full min-w-48 input-accent text-lg"
									type="text"
									value={newCategory.category_name}
									onChange={(e) => {
										console.log(newCategory);
										// Update the category_name value
										let newc = {
											...newCategory,
										};
										newc.category_name = e.target.value;
										setNewCategory(newc);
									}}
								/>
							</label>
							<label className="label">
								Category Description
								<input
									className="input input-bordered w-full min-w-48 input-accent text-lg"
									type="text"
									value={newCategory.category_description}
									onChange={(e) => {
										// Update the category_description value
										let newc = {
											...newCategory,
										};
										newc.category_description =
											e.target.value;
										setNewCategory(newc);
									}}
								/>
							</label>
							<label className="label">
								Category Image
								<input
									className="input input-bordered w-full min-w-48 input-accent text-lg"
									type="text"
									value={newCategory.category_image}
									onChange={(e) => {
										// Update the category_image value
										let newc = {
											...newCategory,
										};
										newc.category_image = e.target.value;
										setNewCategory(newc);
									}}
								/>
							</label>
							<button
								className="btn btn-primary m-4 self-center"
								onClick={() => {
									handleAddCategory();
								}}
							>
								Add Category
							</button>

							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Categories;
