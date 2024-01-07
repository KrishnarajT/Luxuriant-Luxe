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

const SubCategory = () => {
	const navigate = useNavigate();
	const { removeDuplicates } = React.useContext(CartContext);
	const location = useLocation();
	const [currentSubCategoryProducts, setCurrentSubCategoryProducts] =
		React.useState(undefined);
	const sub_category_id = useParams();
	useEffect(() => {
		// console.log("Product Details", currentSubCategoryProducts);
		// scroll to top on load
		window.scrollTo(0, 0);
		// removeDuplicates();
		let category_products = location.state.currentSubCategoryProducts;
		let sub_category_products = [];
		let current_category_id = location.state.current_category_id;
		let current_sub_category_id = location.state.current_sub_category_id;
		console.log(
			category_products,
			current_category_id,
			current_sub_category_id
		);
		for (let i = 0; i < category_products.length; i++) {
			// filter category matching id
			for (
				let j = 0;
				j < category_products[i].product_category.length;
				j++
			) {
				if (
					category_products[i].product_category[j]._id ===
					current_category_id
				) {
					// filter sub category matching id
					for (
						let k = 0;
						k <
						category_products[i].product_category[j].sub_categories
							.length;
						k++
					) {
						// console.log(category_products[i].product_category[j].sub_categories[k].sub_category_id, current_sub_category_id)
						if (
							category_products[i].product_category[j]
								.sub_categories[k].sub_category_id ===
							current_sub_category_id
						) {
							sub_category_products.push(category_products[i]);
						}
					}
				}
			}
		}
		console.log("subcat", sub_category_products);
		setCurrentSubCategoryProducts(sub_category_products);
	}, []);

	// Use the 'type' parameter and 'location.state' in your component logic

	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-4xl"
				id="intro"
			>
				PRODUCTS
			</section>

			{/* section of cards that have all products */}
			<section className="flex justify-center p-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-4 justify-items-start">
					{currentSubCategoryProducts &&
						currentSubCategoryProducts.map((product) => {
							return (
								<EcommerceCard
									color="bg-base-200"
									text="text-black"
									cart_color="bg-black"
									cart_text="text-white"
									image={
										product.product_image_links
											.description_images
									}
									name={product.product_name}
									price={product.product_cost}
									description={
										product.product_description
											.product_description
									}
									points={product.points_awarded}
									id={product._id}
									product_reviews={product.product_reviews}
								/>
							);
						})}
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default SubCategory;
