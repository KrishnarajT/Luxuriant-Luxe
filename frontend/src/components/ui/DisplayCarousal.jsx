import { Carousel, IconButton } from "@material-tailwind/react";
import {
	IconArrowRight,
	IconBounceRightFilled,
	IconCaretLeftFilled,
	IconCaretRightFilled,
	IconMoodSadFilled,
} from "@tabler/icons-react";
import { EcommerceCard } from "./EcommerceCard";

// Products is a list of such objects.
// {
//     "_id": "654cd992ae6a271afeed6b4d",
//     "product_name": "Product Name 3",
//     "product_cost": 100,
//     "product_image_links": {
//         "description_images": [
//             "https://i.imgur.com/p73AT9Gh.jpg",
//             "https://i.imgur.com/mc7C7XUh.jpg",
//             "https://i.imgur.com/eMlg0UHh.jpg",
//             "https://i.imgur.com/ZPiMKFbh.jpg",
//             "https://i.imgur.com/YdT2wHuh.jpg",
//             "https://i.imgur.com/l37Q3LVh.jpg",
//             "https://i.imgur.com/znpMKO4h.jpg",
//             "https://i.imgur.com/iqcG17th.jpg",
//             ""
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
//         "featured"
//     ],
//     "product_quantity": 100,
//     "product_description": {
//         "product_description": "this is purple jar",
//         "real_results_description": "real results are so and so",
//         "how_to_use_description": "how to use the product. "
//     },
//     "points_awarded": 500
// }

export function DisplayCarousal(props) {
	let products = props.products;
	console.log("products b4 editing", products);
	// split products array into a new array that is an array of [3 products]
	products = products.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / 4);

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = []; // start a new chunk
		}

		resultArray[chunkIndex].push(item);

		return resultArray;
	}, []);
	console.log("products after editing", products);
	return (
		<Carousel
			className="rounded-xl py-2 glass"
			autoplay={true}
			autoplayDelay={5000}
			loop={true}
			prevArrow={({ handlePrev }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handlePrev}
					className="!absolute top-2/4 left-4 -translate-y-2/4 bg-white opacity-40"
				>
					<IconCaretLeftFilled className="text-black" />
				</IconButton>
			)}
			nextArrow={({ handleNext }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handleNext}
					className="!absolute top-2/4 !right-4 -translate-y-2/4 p-4 bg-white opacity-40 glass"
				>
					<IconCaretRightFilled className="text-black" />
				</IconButton>
			)}
		>
			{/* displaying product cards */}
			{products.map((product) => {
				return (
					<div
						className={`flex flex-row px-16 ${
							product.length < 3
								? "justify-start"
								: "justify-center"
						} gap-4`}
					>
						{product[0] && (
							<EcommerceCard
								image={
									product[0].product_image_links
										.description_images[0]
								}
								name={product[0].product_name}
								price={product[0].product_cost}
								description={
									product[0].product_description
										.product_description
								}
								points={product[0].points_awarded}
							/>
						)}
						{product[1] && (
							<EcommerceCard
								image={
									product[1].product_image_links
										.description_images[0]
								}
								name={product[1].product_name}
								price={product[1].product_cost}
								description={
									product[1].product_description
										.product_description
								}
								points={product[1].points_awarded}
							/>
						)}
						{product[2] && (
							<EcommerceCard
								image={
									product[2].product_image_links
										.description_images[0]
								}
								name={product[2].product_name}
								price={product[2].product_cost}
								description={
									product[2].product_description
										.product_description
								}
								points={product[2].points_awarded}
							/>
						)}
						{product[3] && (
							<EcommerceCard
								image={
									product[2].product_image_links
										.description_images[0]
								}
								name={product[2].product_name}
								price={product[2].product_cost}
								description={
									product[2].product_description
										.product_description
								}
								points={product[2].points_awarded}
							/>
						)}
					</div>
				);
			})}
		</Carousel>
	);
}
