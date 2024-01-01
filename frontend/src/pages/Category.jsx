import React from "react";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { EcommerceCard } from "../components/ui/EcommerceCard";
import Footer from "../components/ui/Footer";

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
		// scroll to top on load
		window.scrollTo(0, 0);
	}, [currentCategoryProducts]);

	// Use the 'type' parameter and 'location.state' in your component logic

	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-4xl"
				id="intro"
			>
				{type.toUpperCase()} PRODUCTS
			</section>

			{/* section of cards that have all products */}

			<section className="flex flex-wrap justify-center items-center">
				{currentCategoryProducts.map((product) => {
					return (
						<EcommerceCard
							color="bg-black"
							text="text-white"
							image={
								product.product_image_links.description_images
							}
							name={product.product_name}
							price={product.product_cost}
							description={
								product.product_description.product_description
							}
							points={product.points_awarded}
						/>
					);
				})}
			</section>
			<Footer />
		</div>
	);
};

export default Category;
