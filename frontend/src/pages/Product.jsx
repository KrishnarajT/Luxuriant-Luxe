import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/ui/Footer";
import { useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IconStarFilled, IconMinus, IconPlus } from "@tabler/icons-react";

// import { hexToRgb } from "your-utils-library";
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
	const { productInfo } = React.useContext(CartContext);
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
	const navigate = useNavigate();

	useEffect(() => {
		console.log(productInfo);
		console.log(id);
		setProduct(productInfo.find((product) => product._id === id));
		console.log("product", product);
	}, []);

	useEffect(() => {
		if (product !== undefined) {
			if (product.volumes_present) {
				setSelectedVolume(product.product_volumes[0].volume);
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
			console.log("product", product);
			console.log("selectedVolume", selectedVolume);
			console.log("selectedImage", selectedImage);
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
	return (
		product && (
			<div>
				<div className="w-screen p-4 flex flex-row">
					{/* images */}
					<div className="flex-1 flex flex-row p-4">
						<div className="w-1/5 flex flex-col gap-4 items-end px-2 justify-center">
							{/* four squares with image previews. Upon clicking the main image is changed to the one clicked.  */}
							{product.product_image_links.description_images
								.filter((image) => image)
								.map((image) => (
									<img
										className="w-20 h-20 rounded-xl outline outline-1 hover:scale-105 transition-all duration-200"
										src={image}
										alt="product preview"
										onClick={() => {
											setSelectedImage(image);
										}}
									/>
								))}
						</div>
						<div
							className="w-4/5 p-8"
							style={{
								maxHeight: "70vh",
							}}
						>
							{/* main image */}
							<img
								src={selectedImage}
								alt="product image"
								className="w-full h-full object-cover rounded-xl object-top"
							/>
						</div>
					</div>
					{/* details */}
					<div className="flex-1 flex flex-col gap-2">
						{/* category breadcrumbs */}
						<div>
							<div className="text-sm breadcrumbs">
								<ul>
									<li className="text-2xl ptsans">
										{" "}
										{product.product_category && (
											<a
												className="ptsans"
												onClick={(e) => {
													e.preventDefault();
													navigate(
														`/category/${product.product_category[0]}`
													);
												}}
											>
												{product.product_category[0].toUpperCase()}
											</a>
										)}{" "}
									</li>
									<li className="text-2xl ptsans">
										{product.product_name !== "" && (
											<div>
												<div className="ptsans">
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
							<div className="text-5xl ptsans">
								{product.product_name.toUpperCase()}
							</div>
						</div>
						{/* Product Volume */}
						{product.volumes_present ? (
							<div>
								<div className="text-2xl ptsans">
									{product.product_volumes !== "" && (
										<div>
											<div className="ptsans">
												{selectedVolume} ml,{" "}
												{(
													selectedVolume * 0.033814
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
								<div className="text-2xl ptsans">
									{product.product_shades !== "" && (
										<div>
											<div className="ptsans flex flex-row gap-2">
												{/* show selected shade name and color */}
												{selectedProductShade && (
													<div className="flex gap-2 items-center">
														<div
															className="w-10 h-10 rounded-full outline outline-1"
															style={{
																backgroundColor: `#${selectedProductShade.shade_color}`,
															}}
														></div>
														<div className="text-2xl ptsans">
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
												className="w-10 h-10 rounded-full outline outline-1"
												style={{
													backgroundColor: `#${shade.shade_color}`,
												}}
												onClick={() => {
													setSelectedProductShade(
														shade
													);
												}}
											></div>
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

							<div className="text-2xl ptsans self-center">
								{product.product_reviews.length} reviews
							</div>
						</div>
						{/* Produve volume Choices */}
						{product.volumes_present ? (
							<div>
								<div className="flex flex-row gap-3">
									{product.product_volumes.map((volume) => (
										// draw a rectangle with the volume, upon clicking changes volume
										<div
											className={`w-20 h-10 rounded-none outline outline-1 flex items-center justify-center hover:bg-black hover:text-white ${
												selectedVolume === volume.volume
													? "bg-black text-white"
													: "bg-white text-black"
											}`}
											onClick={() => {
												setSelectedVolume(
													volume.volume
												);
												setSelectedProductCost(
													volume.volume_cost
												);
											}}
										>
											{volume.volume} ml
										</div>
									))}
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
									setSelectedProductQuantity(
										selectedProductQuantity + 1
									);
								}}
							>
								<IconPlus />
							</div>

							{/* Add to cart button with cost */}
							<button className="btn btn-md btn-primary text-xl">
								Add to Cart ₹{selectedProductCost}
							</button>
						</div>

						{/* Product Details, which will show description, visible upon clicking +, collapses after clicking - */}
						<div className="flex flex-col gap-2">
							<div className="flex flex-row gap-2 items-center">
								<div className="text-2xl ptsans">Details</div>
								<div
									className="text-2xl ptsans"
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
								<div className="text-2xl ptsans">
									{product.product_description
										.product_description !== "" && (
										<div>
											<div className="ptsans">
												{
													product.product_description
														.product_description
												}
											</div>
										</div>
									)}
								</div>
							)}
						</div>
						{/* Ingredients, visible upon clicking +, collapses after clicking - */}
						<div className="flex flex-col gap-2">
							<div className="flex flex-row gap-2 items-center">
								<div className="text-2xl ptsans">
									Ingredients
								</div>
								<div
									className="text-2xl ptsans"
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
								<div className="text-2xl ptsans">
									{product.product_ingredients !== "" && (
										<div>
											<div className="ptsans">
												{product.product_ingredients}
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{/* 3 SVGs in a line */}
						<div className="flex flex-row gap-2">
							{/* 1st SVG */}
							<div className="flex flex-col gap-2">
								<img
									src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-cruelty-free-vegan-and-vegetarian-flaticons-flat-flat-icons-2.png"
									alt="external-cruelty-free-vegan-and-vegetarian-flaticons-flat-flat-icons-2"
									className="w-24 h-24"
								/>
							</div>
							{/* 2nd SVG */}
							<div className="flex flex-col gap-2">
								<img
									src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-cruelty-free-vegan-and-vegetarian-flaticons-flat-flat-icons-2.png"
									alt="Image 2"
									className="w-24 h-24"
								/>
							</div>
							{/* 3rd SVG */}
							<div className="flex flex-col gap-2">
								<img
									src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-cruelty-free-vegan-and-vegetarian-flaticons-flat-flat-icons-2.png"
									alt="Image 3"
									className="w-24 h-24"
								/>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	);
};

export default Product;
