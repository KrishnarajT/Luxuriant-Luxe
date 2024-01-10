import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/ui/Footer";
import { useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IconStarFilled, IconMinus, IconPlus } from "@tabler/icons-react";
import { ProductCarousel } from "../components/ui/ProductCarousel";
import { Toaster, toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { DisplayCarousal } from "../components/ui/DisplayCarousal";
// Product looks like this
// {
//     "_id": "6595006375792d7d0086f66e",
//     "product_name": "reviewtest",
//     "product_description": {
//         "product_description": "",
//         "real_results_description": "",
//         "how_to_use_description": ""
//     },
//     "product_cost": 0,
//     "product_image_links": {
//         "description_images": [],
//         "real_results_images": [],
//         "how_to_use_images": []
//     },
//     "product_category": [
//         "hair",
//         "asdfaasd",
//         "asdf",
//         "asdfasd"
//     ],
//     "product_quantity": 0,
//     "points_awarded": 0,
//     "shades_present": false,
//     "volumes_present": false,
//     "product_shades": [
//         {
//             "shade_index": 0,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         },
//         {
//             "shade_index": 1,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         },
//         {
//             "shade_index": 2,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         },
//         {
//             "shade_index": 3,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         },
//         {
//             "shade_index": 4,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         },
//         {
//             "shade_index": 5,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         },
//         {
//             "shade_index": 6,
//             "shade_name": "",
//             "shade_image": "",
//             "shade_number": 0,
//             "shade_color": ""
//         }
//     ],
//     "product_volumess": [
//         {
//             "volume_index": 0,
//             "volume": 0,
//             "volume_cost": 0
//         },
//         {
//             "volume_index": 1,
//             "volume": 0,
//             "volume_cost": 0
//         },
//         {
//             "volume_index": 2,
//             "volume": 0,
//             "volume_cost": 0
//         },
//         {
//             "volume_index": 3,
//             "volume": 0,
//             "volume_cost": 0
//         }
//     ],
//     "product_reviews": [
//         {
//             "review": "this is a good product",
//             "rating": "3",
//             "username": "aweradf",
//             "review_date": "2024-01-24",
//             "_id": "92082344-c831-4bb8-b02a-8037f094350d",
//             "visible": true
//         },
//         {
//             "review": "",
//             "rating": 0,
//             "username": "",
//             "review_date": "1/3/2024",
//             "_id": "5413770c-1d16-4ab4-b450-87c90e1e7070"
//         }
//     ],
//     "product_ingredients": "somthing, something else, something again. "
// }

const Product = () => {
	const { id } = useParams();
	const {
		productInfo,
		IncreaseProductQuantity,
		DecreaseProductQuantity,
		addToCart,
	} = React.useContext(CartContext);
	const base_url = React.useContext(BaseUrlContext).baseUrl;

	const [product, setProduct] = React.useState(undefined);
	const [selectedImage, setSelectedImage] = React.useState(undefined);
	const [selectedVolume, setSelectedVolume] = React.useState(undefined);
	const [selectedProductCost, setSelectedProductCost] = React.useState(0);
	const [selectedProductQuantity, setSelectedProductQuantity] =
		React.useState(1);
	const [selectedProductShade, setSelectedProductShade] =
		React.useState(undefined);
	const [ProductStars, setProductStars] = React.useState(0);
	const [detailsVisible, setDetailsVisible] = React.useState(false);
	const [ingredientsVisible, setIngredientsVisible] = React.useState(false);
	const [productReviews, setProductReviews] = React.useState(undefined);
	const [reviewToAdd, setReviewToAdd] = React.useState({
		review: "",
		rating: 0,
		username: "",
		visible: false,
		review_date: "",
		_id: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
		// console.log(productInfo);
		// console.log(id);
		setProduct(productInfo.find((product) => product._id === id));
		// console.log("product", product);
	}, [id]);

	useEffect(() => {
		if (product !== undefined) {
			setProductReviews(product.product_reviews);
			if (product.volumes_present) {
				setSelectedVolume(product.product_volumes[0]);
				setSelectedProductCost(product.product_volumes[0].volume_cost);
			} else {
				setSelectedProductCost(product.product_cost);
			}
			if (product.product_image_links.description_images) {
				setSelectedImage(
					product.product_image_links.description_images[0]
				);
			}
			if (product.shades_present) {
				setSelectedProductShade(product.product_shades[0]);
			}
			// console.log("product", product);
			// console.log("selectedVolume", selectedVolume);
			// console.log("selectedImage", selectedImage);
			// calculate stars from reviews
			let sum = 0;
			let visible_review_count = 0;
			product.product_reviews.forEach((review) => {
				if (review.visible) {
					sum += review.rating;
					visible_review_count += 1;
				}
			});
			setProductStars(sum / visible_review_count);
		}
	}, [product]);

	const handleAddReview = () => {
		// set id
		let new_review = {
			...reviewToAdd,
			review_date: new Date().toISOString().split("T")[0],
			visible: false,
			_id: uuidv4(),
		};
		// all reviews
		let updatedReviews = [...productReviews, new_review];

		// console.log("reviewToAdd", reviewToAdd);
		axios
			.post(`${base_url}/api/v1/Luxuriant/add_review`, {
				reviews: updatedReviews,
				product_id: product._id,
			})
			.then((response) => {
				// console.log(response);
				if (response.data.message === "Success") {
					toast.success("Review Added!");
				} else {
					toast.error("Error Adding Review!");
				}
				// set reviewToAdd to Empty
				setReviewToAdd({
					review: "",
					rating: 0,
					username: "",
					visible: false,
					review_date: "",
					_id: "",
				});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error Adding Review!");
			});
	};

	return (
		product && (
			<div>
				<Toaster />
				<div className="w-screen p-4 flex justify-center mt-8 h-[52rem]">
					{/* images */}
					<div className="w-1/2 flex flex-row">
						<div className="w-1/5 flex flex-col gap-4 items-center justify-start">
							{/* four squares with image previews. Upon clicking the main image is changed to the one clicked.  */}
							{product.product_image_links.description_images
								.filter((image) => image)
								.map((image) => (
									<img
										className="w-28 h-28 max-h-28 aspect-square rounded-xl outline outline-1 hover:scale-105 transition-all duration-200"
										src={image}
										alt="product preview"
										onClick={() => {
											setSelectedImage(image);
										}}
									/>
								))}
						</div>
						<div
							className="w-4/5 px-4"
							style={{
								maxHeight: "70vh",
							}}
						>
							{/* main image */}
							<img
								src={selectedImage}
								alt="product image"
								className="w-full max-h-[45rem] object-cover rounded-xl object-top p-0"
							/>
						</div>
					</div>

					{/* details */}
					<div className="w-1/2 p-4">
						<div className="flex flex-col gap-2">
							{/* category breadcrumbs */}
							<div>
								<div className="text-sm breadcrumbs">
									<ul>
										<li className="text-2xl droidserif">
											{" "}
											{product.product_category && (
												<a
													className="droidserif"
													onClick={(e) => {
														e.preventDefault();
														navigate(
															`/category/${product.product_category[0].category_name}`
														);
													}}
												>
													{product.product_category[0].category_name?.toUpperCase()}
												</a>
											)}{" "}
										</li>
										<li className="text-2xl droidserif">
											{product.product_name !== "" && (
												<div>
													<div className="droidserif">
														{product.product_name.toUpperCase()}
													</div>
												</div>
											)}
										</li>
									</ul>
								</div>
							</div>
							{/* Product name */}
							<div>
								<div className="text-5xl droidserif">
									{product.product_name.toUpperCase()}
								</div>
							</div>
							{/* Product Volume */}
							{product.volumes_present ? (
								<div>
									<div className="text-2xl droidserif">
										{product.product_volumes !== "" && (
											<div>
												<div className="droidserif">
													{selectedVolume?.volume} ml,{" "}
													{(
														selectedVolume?.volume *
														0.033814
													).toFixed(2)}{" "}
													fl oz
												</div>
											</div>
										)}
									</div>
								</div>
							) : (
								<div></div>
							)}
							{/* Product Shade Names*/}
							{product.shades_present ? (
								<div>
									<div className="text-2xl droidserif">
										{product.product_shades !== "" && (
											<div>
												<div className="droidserif flex flex-row gap-2">
													{/* show selected shade name and color */}
													{selectedProductShade && (
														<div className="flex gap-2 items-center">
															<div
																className="w-10 h-10 rounded-full outline outline-1"
																style={{
																	backgroundColor: `#${selectedProductShade.shade_color}`,
																}}
															></div>
															<div className="text-2xl droidserif">
																{
																	selectedProductShade.shade_name
																}
															</div>
														</div>
													)}
												</div>
											</div>
										)}
									</div>
								</div>
							) : (
								<div></div>
							)}
							{/* Product Shade Colors in circle buttons */}
							{product.shades_present ? (
								<div>
									<div className="flex flex-row gap-3">
										{product.product_shades
											.filter(
												(shade) =>
													shade.shade_color &&
													shade.shade_name &&
													shade.shade_number
											)
											.map((shade) => (
												// draw a circle with the shade color, upon clicking changes shade
												<div
													className="w-10 h-10 rounded-full outline outline-1 flex justify-center items-center"
													style={{
														backgroundColor: `#${shade.shade_color}`,
													}}
													onClick={() => {
														setSelectedProductShade(
															shade
														);
														setSelectedImage(
															shade.shade_image
														);
													}}
												>
													{shade.shade_number}
												</div>
											))}
									</div>
								</div>
							) : (
								<div></div>
							)}
							{/* Product stars */}
							<div className="flex flex-row gap-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<IconStarFilled
										className={`w-10 h-10 ${
											star <= ProductStars
												? "text-yellow-500"
												: "text-gray-300"
										}`}
									/>
								))}

								<div className="text-2xl droidserif self-center">
									{product.product_reviews.length} reviews
								</div>
							</div>
							{/* Produve volume Choices */}
							{product.volumes_present ? (
								<div>
									<div className="flex flex-row gap-3">
										{product.product_volumes.map(
											(volume) => (
												// draw a rectangle with the volume, upon clicking changes volume
												<div
													className={`w-20 h-10 rounded-none outline outline-1 flex items-center justify-center hover:bg-black hover:text-white ${
														selectedVolume ===
														volume
															? "bg-black text-white"
															: "bg-white text-black"
													}`}
													onClick={() => {
														setSelectedVolume(
															volume
														);
														setSelectedProductCost(
															volume.volume_cost
														);
													}}
												>
													{volume.volume} ml
												</div>
											)
										)}
									</div>
								</div>
							) : (
								<div></div>
							)}
							{/* Product Selected Quantity */}
							{/* Rectangle with - and + on either side of value that change the selected quantity upon clicking */}
							<div className="flex flex-row gap-3 items-center my-2">
								<div
									className="w-10 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white"
									onClick={() => {
										if (selectedProductQuantity > 1) {
											setSelectedProductQuantity(
												selectedProductQuantity - 1
											);
										}
										DecreaseProductQuantity(product._id);
									}}
								>
									<IconMinus />
								</div>
								<div className="w-20 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black ">
									{selectedProductQuantity}
								</div>
								<div
									className="w-10 h-10 rounded-none outline outline-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white"
									onClick={() => {
										if (product.product_quantity === 0) {
											toast.error(
												"Product out of stock!"
											);
											return;
										}
										setSelectedProductQuantity(
											selectedProductQuantity + 1
										);
										IncreaseProductQuantity(
											product._id,
											selectedProductCost,
											selectedVolume,
											selectedProductShade
										);
										// IncreaseProductQuantity(
										// 	product._id,
										// 	selectedProductCost,
										// 	selectedVolume,
										// 	selectedProductShade
										// );
									}}
								>
									<IconPlus />
								</div>

								{/* Add to cart button with cost */}
								<button
									className="btn btn-md btn-primary text-xl"
									disabled={product.product_quantity === 0}
									onClick={() => {
										addToCart(
											product._id,
											selectedProductCost,
											selectedVolume,
											selectedProductShade
										);
										// open drawer
										document.getElementById(
											"my-drawer"
										).checked = true;
										// Toast
										toast.success("Added to Cart!");
									}}
								>
									Add to Cart ₹{selectedProductCost}
								</button>
							</div>
							<div>
								<div className="text-2xl droidserif uppercase">
									Earn {product.points_awarded} Reward Points!
								</div>
							</div>
							{/* Show product in stock or not */}
							<div className="">
								<div className="text-2xl droidserif">
									{product.product_quantity > 0 ? (
										<div className="text-green-500">
											In Stock
										</div>
									) : (
										<div className="text-red-500">
											Out of Stock
										</div>
									)}
								</div>
							</div>
							{/* Product Details, which will show description, visible upon clicking +, collapses after clicking - */}
							<div className="flex flex-col gap-2">
								<div className="flex flex-row gap-2 items-center">
									<div className="text-2xl droidserif">
										Details
									</div>
									<div
										className="text-2xl droidserif"
										onClick={() => {
											setDetailsVisible(!detailsVisible);
										}}
									>
										{detailsVisible ? (
											<IconMinus />
										) : (
											<IconPlus />
										)}
									</div>
								</div>
								{detailsVisible && (
									<div className="text-2xl droidserif">
										{product.product_description
											.product_description !== "" && (
											<div>
												<div className="droidserif">
													{product.product_details}
												</div>
											</div>
										)}
									</div>
								)}
							</div>
							{/* Ingredients, visible upon clicking +, collapses after clicking - */}
							<div className="flex flex-col gap-2">
								<div className="flex flex-row gap-2 items-center">
									<div className="text-2xl droidserif">
										Ingredients
									</div>
									<div
										className="text-2xl droidserif"
										onClick={() => {
											setIngredientsVisible(
												!ingredientsVisible
											);
										}}
									>
										{ingredientsVisible ? (
											<IconMinus />
										) : (
											<IconPlus />
										)}
									</div>
								</div>
								{ingredientsVisible && (
									<div className="text-2xl droidserif">
										{product.product_ingredients !== "" && (
											<div>
												<div className="droidserif">
													{
														product.product_ingredients
													}
												</div>
											</div>
										)}
									</div>
								)}
							</div>

							{/* 3 SVGs in a line */}
							<div className="flex flex-row gap-4 items-center w-80 my-3">
								{/* 1st SVG */}
								<div className="flex flex-col gap-2">
									<img
										src="https://i.imgur.com/bra0upp.png"
										alt="external-cruelty-free-vegan-and-vegetarian-flaticons-flat-flat-icons-2"
										className="w-28 h-28 max-h-28"
									/>
								</div>
								{/* 2nd SVG */}
								<div className="flex flex-col gap-2">
									<img
										src="https://i.imgur.com/yuQEOcA.png"
										alt="Image 2"
										className="w-24 h-24"
									/>
								</div>
								{/* 3rd SVG */}
								<div className="flex flex-col gap-2">
									<img
										src="https://i.imgur.com/PssWLjE.png"
										alt="Image 3"
										className="w-[5.5rem] h-[6rem]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-8 mt-8" id="texturebg">
					{/* Product Description */}
					<div className="flex flex-row justify-between ">
						{product.product_image_links && (
							<div className="w-1/2 flex justify-center p-8 m-4">
								<div className="aspect-square">
									<ProductCarousel
										images={
											product.product_image_links
												.description_images
										}
									/>
								</div>
							</div>
						)}
						<div className="flex-1 flex justify-center ">
							<div className=" w-full flex flex-col items-end p-8 m-4 mr-10 rounded-3xl">
								<div className="bg-white/60 flex flex-col w-full h-full rounded-3xl p-8 items-center">
									<div className="text-5xl droidserif font-bold uppercase text-center">
										Mystique behind our admiration.
									</div>
									<div className="text-4xl italic droidserif my-8">
										{
											product.product_description
												.product_description
										}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Real Results */}
					<div className="flex flex-row-reverse justify-between ">
						{product.product_image_links && (
							<div className="w-1/2 flex justify-center p-8 m-4">
								<div className="aspect-square">
									<ProductCarousel
										images={
											product.product_image_links
												.real_results_images
										}
									/>
								</div>
							</div>
						)}
						<div className="flex-1 flex justify-center ">
							<div className=" w-full flex flex-col items-end p-8 m-4 mr-10 rounded-3xl">
								<div className="bg-white/60 flex flex-col w-full h-full rounded-3xl p-8 items-center">
									<div className="text-5xl droidserif font-bold uppercase text-center">
										Real Results
									</div>
									<div className="text-4xl italic droidserif my-8 text-center">
										{
											product.product_description
												.real_results_description
										}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* How to Use */}
					<div className="flex flex-row justify-between ">
						{product.product_image_links && (
							<div className="w-1/2 flex justify-center p-8 m-4">
								<div className="aspect-square">
									<ProductCarousel
										images={
											product.product_image_links
												.description_images
										}
									/>
								</div>
							</div>
						)}
						<div className="flex-1 flex justify-center ">
							<div className=" w-full flex flex-col items-end p-8 m-4 mr-10 rounded-3xl">
								<div className="bg-white/60 flex flex-col w-full h-full rounded-3xl p-8 items-center">
									<div className="text-5xl droidserif font-bold uppercase">
										How to Use
									</div>
									<div className="text-4xl italic droidserif my-8">
										{
											product.product_description
												.how_to_use_description
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Reviews */}
				<section
					className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				 uppercase"
					id="intro"
				>
					Reviews
				</section>
				<div className="flex justify-center flex-col items-center gap-4">
					<div className="flex flex-row gap-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<IconStarFilled
								className={`w-16 h-16 ${
									star <= ProductStars
										? "text-brown-500"
										: "text-gray-300"
								}`}
							/>
						))}
					</div>
					<button
						className="btn btn-primary"
						onClick={() => {
							document.querySelector("#my_modal_1").showModal();
						}}
					>
						Write a Review
					</button>
				</div>

				{/* Review Cards */}
				<div className="flex flex-col gap-4 p-4 m-4">
					{productReviews &&
						productReviews.map((review) => (
							<div className="flex flex-col gap-4 p-4 mx-16 bg-transparent rounded-3xl my-2">
								<div className="flex flex-col items-start justify-start">
									<div className="text-2xl droidserif flex">
										{[1, 2, 3, 4, 5].map((star) => (
											<IconStarFilled
												className={`w-8 h-8 ${
													star <= review.rating
														? "text-brown-500"
														: "text-white"
												}`}
											/>
										))}
									</div>
									<div className="text-4xl droidserif italic text-brown-300 font-bold mt-2">
										{review.username}
									</div>
									<div className="text-3xl my-2 droidserif">
										{review.review}
									</div>
								</div>
								<div className="flex flex-row justify-between">
									<div className="text-3xl droidserif">
										{review.review_date}
									</div>
								</div>
							</div>
						))}
				</div>

				{/* You may also like */}
				<section
					className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				 uppercase"
					id="intro"
				>
					You may also like
				</section>
				<DisplayCarousal products={productInfo} />
				{/* Add Review Dialog box */}
				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Write a Review!</h3>
						<p className="py-4">
							What did you think about our product?
						</p>
						<div className="modal-action w-full justify-center flex">
							<form method="dialog" className="w-full">
								<div className="flex flex-col justify-between w-full">
									<div>
										<label className="text-2xl droidserif my-2">
											Review title
										</label>
									</div>
									<div className="text-2xl droidserif w-full">
										<input
											type="text"
											className="input input-bordered w-full"
											placeholder="Review Title"
											value={reviewToAdd.username}
											onChange={(e) => {
												setReviewToAdd({
													...reviewToAdd,
													username: e.target.value,
												});
											}}
										/>
									</div>
									<div>
										<label className="text-2xl droidserif my-2">
											Review
										</label>
									</div>
									<div className="text-2xl droidserif w-full">
										<input
											type="text"
											className="input input-bordered w-full"
											placeholder="Review"
											value={reviewToAdd.review}
											onChange={(e) => {
												setReviewToAdd({
													...reviewToAdd,
													review: e.target.value,
												});
											}}
										/>
									</div>
									<div>
										<label className="text-2xl droidserif my-2">
											Rate on 5!
										</label>
									</div>
									<div className="text-2xl droidserif">
										<input
											type="number"
											className="input input-bordered"
											placeholder="Rating"
											max={5}
											min={0}
											value={reviewToAdd.rating}
											onChange={(e) => {
												setReviewToAdd({
													...reviewToAdd,
													rating: e.target.value,
												});
											}}
										/>
									</div>
								</div>
								<div className="flex flex-row justify-between">
									<div className="text-2xl droidserif">
										<button
											className="btn btn-primary my-4"
											onClick={() => {
												// make sure no fields are empty
												if (
													reviewToAdd.username ===
														"" ||
													reviewToAdd.review === "" ||
													reviewToAdd.rating === ""
												) {
													toast.error(
														"Please fill all fields!"
													);
													return;
												}
												// make id using uuid4
												setReviewToAdd({
													...reviewToAdd,
													_id: uuidv4(),
												});
												// send api call
												handleAddReview();
											}}
										>
											Add Review
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</dialog>
				<Footer />
			</div>
		)
	);
};

export default Product;
