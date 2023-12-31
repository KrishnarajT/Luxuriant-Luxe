import React from "react";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { EcommerceCard } from "../components/ui/EcommerceCard";
import Footer from "../components/ui/Footer";
import { IconSearch } from "@tabler/icons-react";

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

const Search = () => {
  const navigate = useNavigate();
  const { productInfo } = React.useContext(CartContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  useEffect(() => {
    // console.log(productInfo);
  }, []);

  function filterProducts() {
    const filteredProducts = productInfo.filter((product) => {
      return product.product_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    return filteredProducts;
  }

  return (
    <div>
      {/* search box */}
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative text-gray-600 w-96">
            <input
              type="search"
              name="serch"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="bg-white h-14 px-5 pr-10 rounded-full text-xl droidserif w-full outline outline-2"
            />
            <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
              <IconSearch className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <section
        className="flex flex-col p-4 m-8 justify-center items-center text-5xl bodoni"
        id="intro"
      >
        Search All Our Products
      </section>

      {/* section of cards that have all products */}
      <section className="flex justify-center p-16">
        <div className="flex flex-wrap justify-center">
          {productInfo &&
            filterProducts().map((product) => {
              return (
                <EcommerceCard
                  color="bg-white"
                  text="text-black"
                  cart_color="bg-black"
                  cart_text="text-white"
                  image={product.product_image_links.description_images}
                  name={product.product_name}
                  price={product.product_cost}
                  description={product.product_description.product_description}
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

export default Search;
