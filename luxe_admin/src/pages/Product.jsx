import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DBInfoContext } from "../context/DBInfoContext";
import { UserContext } from "../context/UserContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { IconTrash } from "@tabler/icons-react";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Product = () => {
	let [product, setProduct] = useState(useLocation().state.product);
	const { setProductInfo, productInfo, categoryInfo, setCategoryInfo } =
		React.useContext(DBInfoContext);
	const [productToDelete, setProductToDelete] = useState(null);
	const { userPassword } = React.useContext(UserContext);
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [productDetails, setProductDetails] = React.useState(productInfo);
	const [recentChanges, setRecentChanges] = React.useState(false);

	useEffect(() => {
		console.log(product);
		console.log(productDetails);
		console.log(productInfo);
		console.log(categoryInfo);
	}, []);

	// function to clean array regardless of how badly the string is formatted
	const clean_array = (unformated_string) => {
		// if the string is empty, return an empty array
		if (unformated_string === "") {
			return [];
		}
		// if its an array, return the array
		if (Array.isArray(unformated_string)) {
			return unformated_string;
		}
		// remove all trailing and leading spaces
		let cleaned_string = unformated_string.trim();
		// remove all \n
		cleaned_string = cleaned_string.replace(/\n/g, "");
		// remove all \t
		cleaned_string = cleaned_string.replace(/\t/g, "");
		// split the string based on commas
		let cleaned_array = cleaned_string.split(",");
		// remove all empty strings
		cleaned_array = cleaned_array.filter((item) => {
			return item !== "";
		});
		// trim each item in the array
		cleaned_array = cleaned_array.map((item) => {
			return item.trim();
		});
		console.log(cleaned_array);
		return cleaned_array;
	};
	const navigate = useNavigate();
	// function to delete a product
	const delete_and_refresh_products = () => {
		console.log("deleting product with id: " + productToDelete);
		// make sure productToDelete is not null
		if (productToDelete === null) {
			toast.error("Product deletion failed");
			return;
		}
		axios
			.post(base_url + "/api/v1/Luxuriant/delete_product", {
				password: userPassword,
				product_id: productToDelete,
			})
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("Product deleted successfully");
					// navigate back to the products page
					navigate("/products");
				} else {
					toast.error("Product deletion failed");
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error("Product deletion failed due to errors. ");
			});
	};
	// function to update all the product details
	const updateProductDetails = () => {
		// check if recent changes have been made
		if (recentChanges === false) {
			toast.error("No recent changes have been made");
			return;
		}

		// clean the product details by changing all product categories with the clean array function.
		let cleaned_product_details = product;
		console.log(cleaned_product_details);
		cleaned_product_details.product_category = clean_array(
			cleaned_product_details.product_category
		);
		cleaned_product_details.product_image_links.description_images =
			clean_array(
				cleaned_product_details.product_image_links.description_images
			);
		cleaned_product_details.product_image_links.real_results_images =
			clean_array(
				cleaned_product_details.product_image_links.real_results_images
			);
		cleaned_product_details.product_image_links.how_to_use_images =
			clean_array(
				cleaned_product_details.product_image_links.how_to_use_images
			);

		// update productDetails
		const updated_product_details = productDetails.map((product) => {
			console.log(product._id, cleaned_product_details._id);
			if (product._id === cleaned_product_details._id) {
				return cleaned_product_details;
			} else {
				return product;
			}
		});
		setProductDetails(updated_product_details);

		// send the product details to the server
		console.log("updating product details", updated_product_details);
		axios
			.post(base_url + "/api/v1/Luxuriant/update_multiple_products", {
				password: userPassword,
				product_details: updated_product_details,
			})
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("Product details updated successfully");
					setProductInfo(updated_product_details);
					setRecentChanges(false);
				} else {
					toast.error("Product details update failed");
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error("Product details update failed due to errors. ");
			});
	};

	return (
		<div>
			<Toaster />

			{/* Add a Save button */}
			<div className="flex justify-center mt-6 gap-4">
				<button
					className="btn btn-primary btn-md"
					onClick={() => {
						updateProductDetails();
					}}
				>
					Save Changes
				</button>
			</div>
			{product.length !== 0 && (
				<div
					id={product.product_id}
					className="hover border-accent border-t-1 flex flex-col items-start justify-center p-4 bg-base-200"
				>
					<div className="text-xl m-4">Product Name</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<input
							type="text"
							value={product.product_name}
							onChange={(e) => {
								const updatedProduct = {
									...product,
									product_name: e.target.value,
								};
								// update productDetails based on matching id
								setProduct(updatedProduct);
								setRecentChanges(true);
								console.log(productDetails);
							}}
							className="input input-bordered w-full min-w-48 input-accent text-lg"
						/>
					</div>
					<div className="text-xl m-4">Product Description</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<textarea
							className="textarea textarea-accent text-lg"
							value={
								product.product_description.product_description
							}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_description.product_description =
									e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						></textarea>
					</div>
					<div className="text-xl m-4">Real Results Description</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<textarea
							className="textarea textarea-accent text-lg"
							value={
								product.product_description
									.real_results_description
							}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_description.real_results_description =
									e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						></textarea>
					</div>
					<div className="text-xl m-4">How to use Description</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<textarea
							className="textarea textarea-accent text-lg"
							value={
								product.product_description
									.how_to_use_description
							}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_description.how_to_use_description =
									e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						></textarea>
					</div>
					<div className="text-xl m-4">Product Cost</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<input
							type="number"
							value={product.product_cost}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_cost = e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
							className="input input-bordered w-full min-w-28	input-secondary text-lg"
						/>
					</div>
					<div className="text-xl m-4">
						Product Images Links gif or image from imgur. Enter
						links separated by commas
					</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<textarea
							className="textarea textarea-accent text-lg"
							placeholder="Enter image links separated by commas"
							value={
								product.product_image_links.description_images
							}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								// console.log e.target.value
								console.log(e.target.value);
								// remove \n and split to get an array of links
								const links = e.target.value
									.replace(/\n/g, "")
									.split(", ");
								console.log(links[0].split(","));
								updatedProduct.product_image_links.description_images =
									links[0].split(",");
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						></textarea>
					</div>
					<div className="text-xl m-4">
						Real Results Links gif or image from imgur. Enter links
						separated by commas{" "}
					</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<textarea
							className="textarea textarea-accent text-lg"
							placeholder="Enter image links separated by commas"
							value={
								product.product_image_links.real_results_images
							}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_image_links.real_results_images =
									e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						></textarea>
					</div>
					<div className="text-xl m-4">
						How to use Images links. gif or image. Enter links
						separated by commas.
					</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<textarea
							className="textarea textarea-accent text-lg"
							placeholder="Enter image links separated by commas"
							value={
								product.product_image_links.how_to_use_images
							}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_image_links.how_to_use_images =
									e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						></textarea>
					</div>
					<div className="text-xl m-4">Product Categories</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						{/* Show a checkbox for all categories taken from categoryInfo */}
						{categoryInfo.map((category) => {
							return (
								<div
									key={category._id}
									className="text-xl justify-between p-2 pb-0 flex"
								>
									<input
										type="checkbox"
										className="toggle toggle-secondary mx-4"
										checked={product.product_category.includes(
											category.category_name
										)}
										onChange={(e) => {
											const updatedProduct = {
												...product,
											};
											// if the checkbox is checked, add the category to the product category
											if (e.target.checked) {
												updatedProduct.product_category.push(
													category.category_name
												);
											} else {
												// if the checkbox is unchecked, remove the category from the product category
												updatedProduct.product_category =
													updatedProduct.product_category.filter(
														(item) => {
															return (
																item !==
																category.category_name
															);
														}
													);
											}
											setProduct(updatedProduct);
											setRecentChanges(true);
										}}
									/>
									{category.category_name}

									<div className="p-2 mt-4">
										{/* similarly show subcategories of categories if the category is checked */}
										{category.sub_categories &&
											category.sub_categories.map(
												(sub_category) => {
													return (
														<div
															key={
																sub_category._id
															}
															className="text-lg justify-between p-2 pb-0 flex"
														>
															<input
																type="checkbox"
																className="toggle toggle-secondary mx-4"
																checked={product.product_category.includes(
																	sub_category.sub_category_name
																)}
																onChange={(
																	e
																) => {
																	const updatedProduct =
																		{
																			...product,
																		};
																	// if the checkbox is checked, add the category to the product category
																	if (
																		e.target
																			.checked
																	) {
																		updatedProduct.product_category.push(
																			sub_category.sub_category_name
																		);
																	} else {
																		// if the checkbox is unchecked, remove the category from the product category
																		updatedProduct.product_category =
																			updatedProduct.product_category.filter(
																				(
																					item
																				) => {
																					return (
																						item !==
																						sub_category.sub_category_name
																					);
																				}
																			);
																	}
																	setProduct(
																		updatedProduct
																	);
																	setRecentChanges(
																		true
																	);
																}}
															/>
															{
																sub_category.sub_category_name
															}
														</div>
													);
												}
											)}
									</div>
								</div>
							);
						})}
					</div>
					<div className="text-xl m-4">Product Quantity (Stock)</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<input
							type="number"
							value={product.product_quantity}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.product_quantity =
									e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
							className="input input-bordered w-full min-w-28 input-secondary text-lg"
						/>
					</div>
					<div className="text-xl m-4">
						Product Points Awarded (10p = 1Rupee)
					</div>
					<div className="bg-base-300 rounded-xl m-2 p-2">
						<input
							type="number"
							value={product.points_awarded}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.points_awarded = e.target.value;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
							className="input input-bordered w-full min-w-28 input-secondary text-lg"
						/>
					</div>
					<div className="text-xl m-4">
						Does the Product have Volumes?
					</div>
					<div>
						<input
							type="checkbox"
							className="toggle toggle-secondary mx-4"
							checked={product.volumes_present}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.volumes_present =
									e.target.checked;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						/>
					</div>
					{product.volumes_present ? (
						<div className="flex flex-wrap gap-4 p-8">
							<div className="bg-base-300 rounded-xl m-2 p-2">
								ML:
								<input
									type="number"
									value={product.product_volumes[0].volume}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[0].volume =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
								Cost:
								<input
									type="number"
									value={
										product.product_volumes[0].volume_cost
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[0].volume_cost =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2">
								ML:
								<input
									type="number"
									value={product.product_volumes[1].volume}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[1].volume =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
								Cost:
								<input
									type="number"
									value={
										product.product_volumes[1].volume_cost
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[1].volume_cost =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2">
								ML:
								<input
									type="number"
									value={product.product_volumes[2].volume}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[2].volume =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
								Cost:
								<input
									type="number"
									value={
										product.product_volumes[2].volume_cost
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[2].volume_cost =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2">
								ML:
								<input
									type="number"
									value={product.product_volumes[3].volume}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[3].volume =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
								Cost:
								<input
									type="number"
									value={
										product.product_volumes[3].volume_cost
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_volumes[3].volume_cost =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full min-w-28 input-secondary text-lg"
								/>
							</div>
						</div>
					) : (
						<div></div>
					)}
					<div className="text-xl m-4">
						Does the Product have Shades?
					</div>
					<div>
						<input
							type="checkbox"
							className="toggle toggle-secondary mx-4"
							checked={product.shades_present}
							onChange={(e) => {
								const updatedProduct = {
									...product,
								};
								updatedProduct.shades_present =
									e.target.checked;
								setProduct(updatedProduct);
								setRecentChanges(true);
							}}
						/>
					</div>
					{product.shades_present ? (
						<div className="flex flex-wrap gap-4 p-8">
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[0].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[0].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[0].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[0].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image link:
								<input
									placeholder="any link, img/gif"
									type="text"
									value={
										product.product_shades[0].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[0].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number:
								<input
									type="number"
									value={
										product.product_shades[0].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[0].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[1].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[1].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[1].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[1].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image Link
								<input
									placeholder="any link, img/gif"
									type="text"
									value={
										product.product_shades[1].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[1].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number
								<input
									type="number"
									value={
										product.product_shades[1].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[1].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[2].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[2].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[2].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[2].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image link:
								<input
									placeholder="any link, img/gif"
									type="text"
									value={
										product.product_shades[2].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[2].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number
								<input
									type="number"
									value={
										product.product_shades[2].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[2].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[3].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[3].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[3].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[3].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image Link
								<input
									type="text"
									placeholder="any link, img/gif"
									value={
										product.product_shades[3].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[3].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number:
								<input
									type="number"
									value={
										product.product_shades[3].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[3].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[4].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[4].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[4].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[4].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image Link:
								<input
									placeholder="any link, img/gif"
									type="text"
									value={
										product.product_shades[4].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[4].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number:
								<input
									type="number"
									value={
										product.product_shades[4].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[4].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[5].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[5].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[5].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[5].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image Link:
								<input
									placeholder="any link, img/gif"
									type="text"
									value={
										product.product_shades[5].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[5].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number:
								<input
									type="number"
									value={
										product.product_shades[5].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[5].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
							<div className="bg-base-300 rounded-xl m-2 p-2 max-w-48">
								Name:
								<input
									type="text"
									value={product.product_shades[6].shade_name}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[6].shade_name =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Color:
								<input
									type="text"
									value={
										product.product_shades[6].shade_color
									}
									placeholder="hex without hash"
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[6].shade_color =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Image Link:
								<input
									placeholder="any link, img/gif"
									type="text"
									value={
										product.product_shades[6].shade_image
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[6].shade_image =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
								Shade Number:
								<input
									type="number"
									value={
										product.product_shades[6].shade_number
									}
									onChange={(e) => {
										const updatedProduct = {
											...product,
										};
										updatedProduct.product_shades[6].shade_number =
											e.target.value;
										setProduct(updatedProduct);
										setRecentChanges(true);
									}}
									className="input input-bordered w-full input-secondary text-lg"
								/>
							</div>
						</div>
					) : (
						<div></div>
					)}

					<div className="bg-base-300 rounded-xl m-2 p-2">
						<button
							className="btn btn-error btn-md p-2"
							onClick={() => {
								// set the product id to delete
								setProductToDelete(product._id);
								// show a modal to delete the product
								const modal = document.getElementById(
									"delete_product_modal"
								);
								modal.showModal();
							}}
						>
							<IconTrash className="w-8 h-8" />
						</button>
					</div>
				</div>
			)}
			{/* create another dialog for asking the user if they are sure to delete the product.  */}
			<dialog id="delete_product_modal" className="modal">
				<div className="modal-box bg-base-100 text-base-content">
					<h3 className="font-bold text-lg">Delete Product</h3>
					<p className="py-4">
						Are you sure you want to delete this product? This
						action cannot be undone. Hit Escape to Cancel.
					</p>
					<div className="modal-action">
						<form method="dialog">
							<button
								className="btn m-2 btn-primary"
								onClick={() => {
									delete_and_refresh_products();
								}}
							>
								Delete Product
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Product;
