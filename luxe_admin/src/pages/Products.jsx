import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext.jsx";
import { IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { Toaster, toast } from "react-hot-toast";
import { IconRefresh } from "@tabler/icons-react";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Products = () => {
	const { theme } = React.useContext(ThemeContext);
	const { userPassword } = React.useContext(UserContext);
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const [productDetails, setProductDetails] = React.useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [productToDelete, setProductToDelete] = useState(null);
	const [recentChanges, setRecentChanges] = useState(false);
	const [addProductDetails, setAddProductDetails] = useState({
		product_name: "",
		product_description: {
			product_description: "",
			real_results_description: "",
			how_to_use_description: "",
		},
		product_cost: 0,
		product_image_links: {
			description_images: [],
			real_results_images: [],
			how_to_use_images: [],
		},
		product_category: [],
		product_quantity: 0,
		points_awarded: 0,
		shades_present: false,
		product_shades: [
			{
				shade_index: 0,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
			{
				shade_index: 1,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
			{
				shade_index: 2,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
			{
				shade_index: 3,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
			{
				shade_index: 4,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
			{
				shade_index: 5,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
			{
				shade_index: 6,
				shade_name: "",
				shade_image: "",
				shade_number: 0,
				shade_color: "",
			},
		],
		product_volumes: [
			{
				volume_index: 0,
				volume: 0,
				volume_cost: 0,
			},
			{
				volume_index: 1,
				volume: 0,
				volume_cost: 0,
			},
			{
				volume_index: 2,
				volume: 0,
				volume_cost: 0,
			},
			{
				volume_index: 3,
				volume: 0,
				volume_cost: 0,
			},
		],
	});

	const { productInfo, setProductInfo } = React.useContext(DBInfoContext);

	// this is how product details looks like
	// [
	// 	{// product details looks like this:
	// {
	// 	"product_name": "Product Name 3",
	// 	"product_description": {
	// 	    "product_description": "product_description",
	// 	    "real_results_description": "real results are so and so",
	// 	    "how_to_use_description": "how to use the product. "
	// 	},
	// 	"product_cost": 100,
	// 	"product_image_links": {
	// 	    "description_images": ["image1", "image2"],
	// 	    "real_results_images": ["image1", "image2"],
	// 	    "how_to_use_images": ["image1", "image2"]
	// 	},
	// 	"product_category": ["Product Category", "Product Category 2"],
	// 	"product_quantity": 100
	// },
	// {
	// 	"product_name": "Product Name 3",
	// 	"product_description": {
	// 	    "product_description": "product_description",
	// 	    "real_results_description": "real results are so and so",
	// 	    "how_to_use_description": "how to use the product. "
	// 	},
	// 	"product_cost": 100,
	// 	"product_image_links": {
	// 	    "description_images": ["image1", "image2"],
	// 	    "real_results_images": ["image1", "image2"],
	// 	    "how_to_use_images": ["image1", "image2"]
	// 	},
	// 	"product_category": ["Product Category", "Product Category 2"],
	// 	"product_quantity": 100
	// },
	// {
	// 	"product_name": "Product Name 3",
	// 	"product_description": {
	// 	    "product_description": "product_description",
	// 	    "real_results_description": "real results are so and so",
	// 	    "how_to_use_description": "how to use the product. "
	// 	},
	// 	"product_cost": 100,
	// 	"product_image_links": {
	// 	    "description_images": ["image1", "image2"],
	// 	    "real_results_images": ["image1", "image2"],
	// 	    "how_to_use_images": ["image1", "image2"]
	// 	},
	// 	"product_category": ["Product Category", "Product Category 2"],
	// 	"product_quantity": 100
	// },
	// ]

	const [apiCallMade, setApiCallMade] = useState(false);
	let iSentOnce = false;

	const get_product_details = () => {
		// get product details from the context.
		setProductDetails(productInfo);

		if (productInfo.length === 0) {
			console.log("productInfo is empty");
		}
	};

	const fetch_products_from_server = async () => {
		// get all orders
		let response = await axios
			.post(
				`${base_url}/api/v1/Luxuriant/get_products`,
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
			setProductInfo([]);
		} else if (response.data.message === "Success") {
			const data = response.data.products;
			console.log(data);
			setProductInfo(data);
			setProductDetails(data);
		} else if (response.data.message === "No Orders found") {
			setProductInfo([]);
			setProductDetails([]);
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
			if (productDetails === null) {
				if (iSentOnce === false) {
					get_product_details();
					setApiCallMade(true);
					iSentOnce = true;
				}
			}
		}
	}, []);

	function filterProductDetails() {
		if (productDetails === null) {
			return [];
		}
		return productDetails.filter((product) => {
			if (searchTerm === "") {
				return product;
			} else if (
				product.product_name
					? product.product_name
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_description
					? product.product_description.product_description
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_description
					? product.product_description.real_results_description
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_description
					? product.product_description.how_to_use_description
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_cost
					? product.product_cost
							.toString()
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_image_links
					? product.product_image_links.description_images
							.join(" ")
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_image_links
					? product.product_image_links.real_results_images
							.join(" ")
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_image_links
					? product.product_image_links.how_to_use_images
							.join(" ")
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_category
					? product.product_category
							.join(" ")
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.product_quantity
					? product.product_quantity
							.toString()
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product._id
					? product._id
							.toString()
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else if (
				product.points_awarded
					? product.points_awarded
							.toString()
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					: false
			) {
				return product;
			} else {
				return null;
			}
		});
	}

	// function to update all the product details
	const updateProductDetails = () => {
		// make sure none of the fields of productDetails is empty
		if (
			productDetails === null ||
			productDetails.length === 0 ||
			productDetails[0].product_name === "" ||
			productDetails[0].product_description.product_description === "" ||
			productDetails[0].product_description.real_results_description ===
				"" ||
			productDetails[0].product_description.how_to_use_description ===
				"" ||
			productDetails[0].product_cost === 0 ||
			productDetails[0].product_image_links.description_images.length ===
				0 ||
			productDetails[0].product_image_links.real_results_images.length ===
				0 ||
			productDetails[0].product_image_links.how_to_use_images.length ===
				0 ||
			productDetails[0].product_category.length === 0
		) {
			toast.error("Please fill all the fields");
			return;
		}

		// check if recent changes have been made
		if (recentChanges === false) {
			toast.error("No recent changes have been made");
			return;
		}

		// clean the product details by changing all product categories with the clean array function.
		let cleaned_product_details = [...productDetails];
		console.log(cleaned_product_details);
		for (let i = 0; i < cleaned_product_details.length; i++) {
			cleaned_product_details[i].product_category = clean_array(
				cleaned_product_details[i].product_category
			);
			cleaned_product_details[i].product_image_links.description_images =
				clean_array(
					cleaned_product_details[i].product_image_links
						.description_images
				);
			cleaned_product_details[i].product_image_links.real_results_images =
				clean_array(
					cleaned_product_details[i].product_image_links
						.real_results_images
				);
			cleaned_product_details[i].product_image_links.how_to_use_images =
				clean_array(
					cleaned_product_details[i].product_image_links
						.how_to_use_images
				);
		}
		// update productDetails
		setProductDetails(cleaned_product_details);

		// send the product details to the server
		console.log("updating product details", productDetails);
		axios
			.post(base_url + "/api/v1/Luxuriant/update_multiple_products", {
				password: userPassword,
				product_details: productDetails,
			})
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("Product details updated successfully");
					setProductInfo(productDetails);
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

	// function to update a single product
	const updateProduct = (index, updatedProduct) => {
		// update productDetails
		let updatedProductDetails = [...productDetails];
		updatedProductDetails[index] = updatedProduct;
		setProductDetails(updatedProductDetails);
		setRecentChanges(true);
	};

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
					fetch_products_from_server();
				} else {
					toast.error("Product deletion failed");
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error("Product deletion failed due to errors. ");
			});
	};

	// function to add a new product
	const addNewProduct = () => {
		// make sure none of the fields of addProductDetails is empty
		if (
			addProductDetails.product_name === "" ||
			addProductDetails.product_description === "" ||
			addProductDetails.product_cost === 0 ||
			addProductDetails.product_image_links.length === 0 ||
			addProductDetails.product_category.length === 0 ||
			addProductDetails.product_quantity === 0
		) {
			toast.error("Please fill all the fields");
			return;
		}
		axios
			.post(base_url + "/api/v1/Luxuriant/add_product", {
				password: userPassword,
				product_details: addProductDetails,
			})
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("Product added successfully");
					fetch_products_from_server();
				} else {
					toast.error("Product addition failed");
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error("Product addition failed due to errors. ");
			});
	};

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

	return (
		<div className="h-screen">
			<Toaster />

			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">Our Products</div>{" "}
			</div>

			{/* Add Search bar */}
			<div className="flex justify-center">
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
					<div>
						<button
							className="btn btn-md bg-primary text-primary-content mx-4 p-2"
							onClick={() => {
								fetch_products_from_server();
							}}
						>
							<IconRefresh className="w-8 h-8" />
						</button>
					</div>
				</div>
			</div>

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
				{/* Add a button to add a new product */}
				<button
					className="btn btn-accent btn-md"
					onClick={() => {
						// show a modal to add a new product
						const modal =
							document.getElementById("add_product_modal");
						modal.showModal();
					}}
				>
					<IconPlus className="w-8 h-8" />
				</button>
			</div>

			<div className="overflow-x-auto p-10">
				{productDetails === null || productDetails.length === 0 ? (
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
						<thead className="text-xl ">
							<tr className="border-neutral border-b-1 bg-base-300 text-base-content">
								<th></th>
								<th>Name</th>
								<th>Description</th>
								<th>Real Results Description</th>
								<th>How to Use Instructions</th>
								<th>Cost</th>
								<th>Desc. Images</th>
								<th>Real Results Images</th>
								<th>How to use Images</th>
								<th>Category</th>
								<th>Quantity</th>
								<th>Points</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{filterProductDetails().map((product, index) => {
								return (
									<tr
										key={index}
										id={product.product_id}
										className="hover border-accent border-t-1"
									>
										<td>{index + 1}</td>
										<td>
											<input
												type="text"
												value={product.product_name}
												onChange={(e) => {
													const updatedProduct = {
														...product,
														product_name:
															e.target.value,
													};
													// update productDetails based on matching id
													updateProduct(
														index,
														updatedProduct
													);
													console.log(productDetails);
												}}
												className="input input-bordered w-full min-w-48 input-accent text-lg"
											/>
										</td>
										<td>
											<textarea
												className="textarea textarea-accent text-lg"
												value={
													product.product_description
														.product_description
												}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.product_description.product_description =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
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
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
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
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
											<input
												type="number"
												value={product.product_cost}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.product_cost =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
												className="input input-bordered w-full min-w-28	input-secondary text-lg"
											/>
										</td>
										<td>
											<textarea
												className="textarea textarea-accent text-lg"
												placeholder="Enter image links separated by commas"
												value={
													product.product_image_links
														.description_images
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
													console.log(
														links[0].split(",")
													);
													updatedProduct.product_image_links.description_images =
														links[0].split(",");
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
											<textarea
												className="textarea textarea-accent text-lg"
												placeholder="Enter image links separated by commas"
												value={
													product.product_image_links
														.real_results_images
												}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.product_image_links.real_results_images =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
											<textarea
												className="textarea textarea-accent text-lg"
												placeholder="Enter image links separated by commas"
												value={
													product.product_image_links
														.how_to_use_images
												}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.product_image_links.how_to_use_images =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
											<textarea
												className="textarea textarea-accent text-lg"
												placeholder="Enter categories separated by commas"
												value={product.product_category}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.product_category =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
											></textarea>
										</td>
										<td>
											<input
												type="number"
												value={product.product_quantity}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.product_quantity =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
												className="input input-bordered w-full min-w-28 input-secondary text-lg"
											/>
										</td>
										<td>
											<input
												type="number"
												value={product.points_awarded}
												onChange={(e) => {
													const updatedProduct = {
														...product,
													};
													updatedProduct.points_awarded =
														e.target.value;
													updateProduct(
														index,
														updatedProduct
													);
												}}
												className="input input-bordered w-full min-w-28 input-secondary text-lg"
											/>
										</td>
										<td>
											<button
												className="btn btn-error btn-md p-2"
												onClick={() => {
													// set the product id to delete
													setProductToDelete(
														product._id
													);
													// show a modal to delete the product
													const modal =
														document.getElementById(
															"delete_product_modal"
														);
													modal.showModal();
												}}
											>
												<IconTrash className="w-8 h-8" />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
			<ScrollToTopButton />
			<dialog id="add_product_modal" className="modal">
				<div className="modal-box bg-base-100 text-base-content">
					<h3 className="font-bold text-lg">Add a New Product</h3>
					<p className="py-4">
						Fill All of the following Fields to Add a New Product.
						Hit Escape to Cancel.
					</p>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Name</span>
						</label>
						<input
							type="text"
							placeholder="Product Name"
							className="input input-accent input-bordered"
							onChange={(e) => {
								setAddProductDetails({
									...addProductDetails,
									product_name: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Product Description
							</span>
						</label>
						<textarea
							placeholder="Product Description"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								let new_product_description = {
									...addProductDetails.product_description,
									product_description: e.target.value,
								};
								setAddProductDetails({
									...addProductDetails,
									product_description:
										new_product_description,
								});
								console.log(addProductDetails);
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Real Results Description
							</span>
						</label>
						<textarea
							placeholder="Product Description"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								let new_product_description = {
									...addProductDetails.product_description,
									real_results_description: e.target.value,
								};
								setAddProductDetails({
									...addProductDetails,
									product_description:
										new_product_description,
								});
								console.log(addProductDetails);
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								How to Use Description
							</span>
						</label>
						<textarea
							placeholder="Product Description"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								let new_product_description = {
									...addProductDetails.product_description,
									how_to_use_description: e.target.value,
								};
								setAddProductDetails({
									...addProductDetails,
									product_description:
										new_product_description,
								});
								console.log(addProductDetails);
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Cost</span>
						</label>
						<input
							type="number"
							placeholder="Product Cost"
							className="input input-accent input-bordered"
							onChange={(e) => {
								setAddProductDetails({
									...addProductDetails,
									product_cost: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Product Images (Comma Separated)
							</span>
						</label>
						<textarea
							placeholder="Product Images"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								let new_product_image_links = {
									...addProductDetails.product_image_links,
									description_images:
										e.target.value.split(", "),
								};
								setAddProductDetails({
									...addProductDetails,
									product_image_links:
										new_product_image_links,
								});
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Real Results Images (Comma Separated)
							</span>
						</label>
						<textarea
							placeholder="Product Images"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								let new_product_image_links = {
									...addProductDetails.product_image_links,
									real_results_images:
										e.target.value.split(", "),
								};
								setAddProductDetails({
									...addProductDetails,
									product_image_links:
										new_product_image_links,
								});
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								How to use Images (Comma Separated)
							</span>
						</label>
						<textarea
							placeholder="Product Images"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								let new_product_image_links = {
									...addProductDetails.product_image_links,
									how_to_use_images:
										e.target.value.split(", "),
								};
								setAddProductDetails({
									...addProductDetails,
									product_image_links:
										new_product_image_links,
								});
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Product Category (Comma Separated)
							</span>
						</label>
						<textarea
							placeholder="Product Category"
							className="textarea textarea-accent textarea-bordered"
							onChange={(e) => {
								setAddProductDetails({
									...addProductDetails,
									product_category:
										e.target.value.split(", "),
								});
							}}
						></textarea>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Quantity</span>
						</label>
						<input
							type="number"
							placeholder="Product Quantity"
							className="input input-accent input-bordered"
							onChange={(e) => {
								setAddProductDetails({
									...addProductDetails,
									product_quantity: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Points Awarded</span>
						</label>
						<input
							type="number"
							placeholder="Points Awarded"
							className="input input-accent input-bordered"
							onChange={(e) => {
								setAddProductDetails({
									...addProductDetails,
									points_awarded: e.target.value,
								});
							}}
						/>
					</div>

					{/* checkbox for if shades are present */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Does the product have shades?
							</span>
						</label>
						<div className="flex items-center">
							<input
								type="checkbox"
								className="checkbox checkbox-accent"
								onChange={(e) => {
									setAddProductDetails({
										...addProductDetails,
										shades_present: e.target.checked,
									});
								}}
							/>
							<span className="label-text ml-2">
								Yes, it has shades
							</span>
						</div>
					</div>

					{/* Add Volumes */}
					{/* volume 1 */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Volume 1</span>
						</label>
						<input
							type="number"
							placeholder="Product Volume"
							className="input input-accent input-bordered"
							onChange={(e) => {
								let product_volume = {
									volume_index: 0,
									volume: e.target.value,
								};
								let new_product_volumes = [
									...addProductDetails.product_volumes.filter(
										(item) => {
											return item.volume_index !== 0;
										}
									),
									product_volume,
								];
								setAddProductDetails({
									...addProductDetails,
									product_volumes: new_product_volumes,
								});
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Product Volume 1 Cost
							</span>
						</label>
						<input
							type="number"
							placeholder="Product Volume"
							className="input input-accent input-bordered"
							onChange={(e) => {
								let product_volume = {
									volume_index: 0,
									volume_cost: e.target.value,
								};
								let new_product_volumes = [
									...addProductDetails.product_volumes.filter(
										(item) => {
											return item.volume_index !== 0;
										}
									),
									product_volume,
								];
								setAddProductDetails({
									...addProductDetails,
									product_volumes: new_product_volumes,
								});
							}}
						/>
					</div>

					{/* volume 2 */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Volume 2</span>
						</label>
						<input
							type="number"
							placeholder="Product Volume"
							className="input input-accent input-bordered"
							onChange={(e) => {
								let product_volume = {
									volume_index: 1,
									volume: e.target.value,
								};
								let new_product_volumes = [
									...addProductDetails.product_volumes.filter(
										(item) => {
											return item.volume_index !== 1;
										}
									),
									product_volume,
								];
								setAddProductDetails({
									...addProductDetails,
									product_volumes: new_product_volumes,
								});
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Product Volume 2 Cost
							</span>
						</label>
						<input
							type="number"
							placeholder="Product Volume"
							className="input input-accent input-bordered"
							onChange={(e) => {
								let product_volume = {
									volume_index: 1,
									volume_cost: e.target.value,
								};
								let new_product_volumes = [
									...addProductDetails.product_volumes.filter(
										(item) => {
											return item.volume_index !== 1;
										}
									),
									product_volume,
								];
								setAddProductDetails({
									...addProductDetails,
									product_volumes: new_product_volumes,
								});
							}}
						/>
					</div>

					{/* volume 3 */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Volume 3</span>
						</label>
						<input
							type="number"
							placeholder="Product Volume"
							className="input input-accent input-bordered"
							onChange={(e) => {
								let product_volume = {
									volume_index: 2,
									volume: e.target.value,
								};
								let new_product_volumes = [
									...addProductDetails.product_volumes.filter(
										(item) => {
											return item.volume_index !== 2;
										}
									),
									product_volume,
								];
								setAddProductDetails({
									...addProductDetails,
									product_volumes: new_product_volumes,
								});
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Product Volume 3 Cost
							</span>
						</label>
						<input
							type="number"
							placeholder="Product Volume"
							className="input input-accent input-bordered"
							onChange={(e) => {
								let product_volume = {
									volume_index: 2,
									volume_cost: e.target.value,
								};
								let new_product_volumes = [
									...addProductDetails.product_volumes.filter(
										(item) => {
											return item.volume_index !== 2;
										}
									),
									product_volume,
								];
								setAddProductDetails({
									...addProductDetails,
									product_volumes: new_product_volumes,
								});
							}}
						/>
					</div>

					{/* Add 7 textboxes for shades.  */}

					{addProductDetails.shades_present && (
						<div>
							{/* shade 0 */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 1 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 1, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[0],
											shade_index: 0,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 0
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 1 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 1"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[0],
											shade_index: 0,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 0
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 1 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 1"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[0],
											shade_index: 0,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 0
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>

							{/* shade 1 */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 2 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 1, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[1],
											shade_index: 1,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 1
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 2 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 1"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[1],
											shade_index: 1,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 1
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 2 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 1"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[1],
											shade_index: 1,
											shade_number: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 1
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>

							{/* shade 2 */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 3 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 2, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[2],
											shade_index: 2,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 2
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 3 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 2"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[2],
											shade_index: 2,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 2
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 3 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 2"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[2],
											shade_index: 2,
											shade_number: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 2
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>

							{/* shade 3 */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 4 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 3, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[3],
											shade_index: 3,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 3
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 4 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 3"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[3],
											shade_index: 3,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 3
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 4 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 3"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[3],
											shade_index: 3,
											shade_number: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 3
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>

							{/* shade 4 */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 5 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 4, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[4],
											shade_index: 4,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 4
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 5 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 4"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[4],
											shade_index: 4,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 4
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 5 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 4"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[4],
											shade_index: 4,
											shade_number: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 4
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>

							{/* shade 5 (6) */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 6 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 5, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[5],
											shade_index: 5,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 5
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 6 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 5"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[5],
											shade_index: 5,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 5
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 6 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 5"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[5],
											shade_index: 5,
											shade_number: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 5
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>

							{/* shade 6 (7) */}

							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 7 Name (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="Shade color 6, leave if product doesnt have shades"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[6],
											shade_index: 6,
											shade_name: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 6
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 7 Image (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 6"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[6],
											shade_index: 6,
											shade_image: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 6
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Shade 7 Number (leave if absent)
									</span>
								</label>
								<input
									type="text"
									placeholder="imgur or any image link, just 6"
									className="input input-accent input-bordered"
									onChange={(e) => {
										let product_shade = {
											...addProductDetails
												.product_shades[6],
											shade_index: 6,
											shade_number: e.target.value,
										};
										let new_product_shades = [
											...addProductDetails.product_shades.filter(
												(item) => {
													return (
														item.shade_index !== 6
													);
												}
											),
											product_shade,
										];
										setAddProductDetails({
											...addProductDetails,
											product_shades: new_product_shades,
										});
									}}
								/>
							</div>
						</div>
					)}

					<div className="modal-action">
						<form method="dialog">
							<button
								className="btn m-2 btn-primary"
								onClick={() => {
									// send api call to server to add a new product.
									addNewProduct();
									// fetch product details from server.
									// fetch_products_from_server();
								}}
							>
								Add Product
							</button>
						</form>
					</div>
				</div>
			</dialog>
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

export default Products;
