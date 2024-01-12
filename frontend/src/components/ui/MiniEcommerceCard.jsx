import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { CartContext } from "../../context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IconStarFilled } from "@tabler/icons-react";
import { useEffect } from "react";
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

export function MiniEcommerceCard(props) {
  const [productStars, setProductStars] = React.useState(0);

  useEffect(() => {
    let sum = 0;
    let visible_review_count = 0;
    props.product_reviews.forEach((review) => {
      if (review.visible) {
        sum += review.rating;
        visible_review_count += 1;
      }
    });
    setProductStars(Math.round(sum / visible_review_count));
  }, [props.product_reviews]);
  const { addToCart } = React.useContext(CartContext);
  const navigate = useNavigate();
  return (
    <Card
      className={`w-[9vw] mx-[0.5vw] my-5 hover:scale-105 transition-all duration-300 ${props.color} ${props.text} rounded-none`}
      // onClick={() => {
      // 	navigate(`/product/${props.id}`);
      // }}
    >
      <CardHeader
        shadow={true}
        floated={false}
        className="max-h-[8vw] min-h-[8vw] rounded-none m-0"
        onClick={() => {
          navigate(`/product/${props.id}`);
          document.getElementById("my-drawer").checked = false;
        }}
      >
        <img
          src={props.image ? props.image : "https://source.unsplash.com/random"}
          alt="card-image"
          className="h-full w-full object-cover rounded-none"
        />
      </CardHeader>
      <CardBody className="pb-2">
        <div className="mb-2 text-center">
          <Typography
            color="blue-gray"
            className={`font-medium uppercase text-[0.9vw] min-h-[3vw] leading-tight text-center self-center ${props.text}`}
          >
            {props.name}
          </Typography>
          <div className="flex justify-center p-1 pb-0">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStarFilled
                  className={`w-[1vw] h-[1vw] ${
                    star <= productStars ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* <Typography color="blue-gray" className="font-medium">
						₹{props.price}
					</Typography> */}
        </div>
        {/* <Typography
					variant="small"
					color="gray"
					className={`font-normal opacity-75 break-words max-h-10 min-h-10 ${props.text}`}
				>
					{props.description.substring(0, 100)}...
				</Typography> */}
      </CardBody>
      {/* <CardFooter className="pt-0">
				<Button
					ripple={true}
					fullWidth={true}
					className={`${props.cart_color} ${props.cart_text} shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-[1.1vw] min-h-16 leading-tight`}
					onClick={() => {
						addToCart(props.id);
						// show side cart
						document.getElementById("my-drawer").checked = true;

						// toast
						toast.success("Added to cart", {
							duration: 4000,
							style: {
								borderRadius: "10px",
								// background: "#ca8f6d",
								// color: "#000000",
							},
						});
					}}
				>
					Add to Cart ₹{props.price}
				</Button>
			</CardFooter> */}
    </Card>
  );
}
