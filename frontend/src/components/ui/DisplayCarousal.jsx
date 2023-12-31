import { Carousel, IconButton } from "@material-tailwind/react";
import {
  IconArrowRight,
  IconBounceRightFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconMoodSadFilled,
} from "@tabler/icons-react";
import { EcommerceCard } from "./EcommerceCard";
import MaterialSymbolsArrowBackIos from "./MaterialSymbolsArrowBackIos";
import MaterialSymbolsArrowForwardIos from "./MaterialSymbolsArrowForwardIos";

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
  // console.log("products b4 editing", products);
  // split products array into a new array that is an array of [3 products]
  products = products.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  // console.log("products after editing", products);
  return (
    <Carousel
      className="rounded-xl py-2 bg-transparent"
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
      prevArrow={({ handlePrev }) => (
        <MaterialSymbolsArrowBackIos
          className="text-black w-44 h-44 !absolute top-2/4 left-6 -translate-y-2/4 "
          onClick={handlePrev}
        />
      )}
      nextArrow={({ handleNext }) => (
        <MaterialSymbolsArrowForwardIos
          className="text-black w-44 h-44 !absolute top-2/4 !right-4 -translate-y-2/4"
          onClick={handleNext}
        />
      )}
      navigation={false}
    >
      {/* displaying product cards */}
      {products.map((product) => {
        return (
          <div
            className={`mx-24 flex flex-row gap-0 bg-transparent p-10 ${
              product.length < 3 ? "justify-start" : "justify-center"
            }`}
          >
            {product[0] && (
              <EcommerceCard
                color="bg-black"
                text="text-white"
                cart_color="bg-white"
                cart_text="text-black"
                id={product[0]._id}
                image={product[0].product_image_links.description_images[0]}
                name={product[0].product_name}
                price={product[0].product_cost}
                description={product[0].product_description.product_description}
                points={product[0].points_awarded}
                product_reviews={product[0].product_reviews}
              />
            )}
            {product[1] && (
              <EcommerceCard
                color="bg-black"
                text="text-white"
                cart_color="bg-white"
                cart_text="text-black"
                id={product[1]._id}
                image={product[1].product_image_links.description_images[0]}
                name={product[1].product_name}
                price={product[1].product_cost}
                description={product[1].product_description.product_description}
                points={product[1].points_awarded}
                product_reviews={product[1].product_reviews}
              />
            )}

            {product[2] && (
              <EcommerceCard
                color="bg-black"
                text="text-white"
                cart_color="bg-white"
                cart_text="text-black"
                id={product[2]._id}
                image={product[2].product_image_links.description_images[0]}
                name={product[2].product_name}
                price={product[2].product_cost}
                description={product[2].product_description.product_description}
                points={product[2].points_awarded}
                product_reviews={product[2].product_reviews}
              />
            )}
            {product[3] && (
              <EcommerceCard
                color="bg-black"
                text="text-white"
                cart_color="bg-white"
                cart_text="text-black"
                id={product[3]._id}
                image={product[2].product_image_links.description_images[0]}
                name={product[2].product_name}
                price={product[2].product_cost}
                description={product[2].product_description.product_description}
                points={product[2].points_awarded}
                product_reviews={product[2].product_reviews}
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
}
