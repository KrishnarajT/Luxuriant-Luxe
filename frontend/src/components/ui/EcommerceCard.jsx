import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";

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

export function EcommerceCard(props) {
	return (
		<Card
			className={`w-80 m-4 hover:scale-105 transition-all duration-300 ${props.color} ${props.text}`}
		>
			<CardHeader
				shadow={true}
				floated={false}
				className="h-60 rounded-none"
			>
				<img
					src={props.image}
					alt="card-image"
					className="h-full w-full object-cover rounded-none"
				/>
			</CardHeader>
			<CardBody>
				<div className="mb-2 flex items-center justify-between">
					<Typography
						color="blue-gray"
						className={`font-medium text-xl ${props.text}`}
					>
						{props.name}
					</Typography>
					{/* <Typography color="blue-gray" className="font-medium">
						₹{props.price}
					</Typography> */}
				</div>
				<Typography
					variant="small"
					color="gray"
					className={`font-normal opacity-75 break-words max-h-10 min-h-10 ${props.text}`}
				>
					{props.description.substring(0, 100)}...
				</Typography>
			</CardBody>
			<CardFooter className="pt-0">
				<Button
					ripple={true}
					fullWidth={true}
					className="bg-white text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-xl"
				>
					Add to Cart ₹{props.price}
				</Button>
			</CardFooter>
		</Card>
	);
}
