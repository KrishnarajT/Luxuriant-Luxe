import React from "react";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

// product info is a list of objects like these.
// 	{
//     "_id": "654cd992ae6a271afeed6b4e",
//     "product_name": "Product Name 2",
//     "product_cost": 100,
//     "product_image_links": {
//         "description_images": [
//             "https://i.imgur.com/CXToepvh.pnghttps://i.imgur.com/9fCsEDah.png",
//             "https://i.imgur.com/Y0axnEdh.png",
//             "https://i.imgur.com/h9ro4hNh.png",
//             "https://i.imgur.com/ZrHcLSBh.png",
//             "https://i.imgur.com/HGtISq0h.png",
//             "https://i.imgur.com/jxbpxRgh.png",
//             "https://i.imgur.com/UcwrTi6h.png",
//             "https://i.imgur.com/kpXJbXhh.png",
//             "https://i.imgur.com/E5NqNVRh.png"
//         ],
//         "real_results_images": [
//             "image1",
//             "image2"
//         ],
//         "how_to_use_images": [
//             "image1",
//             "image2"
//         ]
//     },
//     "product_category": [
//         "Product Category",
//         "Product Category 2"
//     ],
//     "product_quantity": 100,
//     "product_description": {
//         "product_description": "this is pink jar",
//         "real_results_description": "real results are so and so",
//         "how_to_use_description": "how to use the product. "
//     },
//     "points_awarded": 500
// }

const Category = () => {
	const { type } = useParams();
	const navigate = useNavigate();
	const { currentCategoryProducts } = React.useContext(CartContext);
	useEffect(() => {
		console.log("Product Details", currentCategoryProducts);
	}, [currentCategoryProducts]);

	// Use the 'type' parameter and 'location.state' in your component logic

	return (
		<div>
			<h1>Category: {type}</h1>
			{/* Rest of your component */}
			<button
				onClick={() =>
					navigate("/product/1", { state: { productId: 1 } })
				}
			>
				Product 1
			</button>
			{currentCategoryProducts &&
				currentCategoryProducts.map((product) => (
					<div key={product._id}>
						<h1>{product.product_name}</h1>
						<h3>{product.product_cost}</h3>
						<h3>{product.product_quantity}</h3>
						<h3>
							{product.product_description.product_description}
						</h3>
						<h3>
							{
								product.product_description
									.real_results_description
							}
						</h3>
						<h3>
							{product.product_description.how_to_use_description}
						</h3>
						<h3>{product.points_awarded}</h3>
					</div>
				))}
		</div>
	);
};

export default Category;
