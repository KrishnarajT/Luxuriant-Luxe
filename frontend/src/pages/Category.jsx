import React from "react";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { EcommerceCard } from "../components/ui/EcommerceCard";
import Footer from "../components/ui/Footer";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";

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
  const location = useLocation();
  const { categories, currentCategoryProducts } = React.useContext(CartContext);
  const [currentCategory, setCurrentCategory] = React.useState(undefined);
  useEffect(() => {
    // console.log("Product Details", currentCategoryProducts);
    // scroll to top on load
    window.scrollTo(0, 0);
    // removeDuplicates();
  }, [currentCategoryProducts]);

  useEffect(() => {
    setCurrentCategory(
      categories.filter((category) => category.category_name === type)[0],
    );
  }, [type, categories]);

  // Use the 'type' parameter and 'location.state' in your component logic
  let isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };
  return (
    <div>
      {currentCategory !== undefined ? (
        <div>
          <div>
            <img
              src={
                isValidHttpUrl(currentCategory.category_image)
                  ? currentCategory.category_image
                  : "path/to/default/image.jpg"
              }
              alt="banner"
              className="w-full h-96 object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://source.unsplash.com/random";
              }}
            />
          </div>
          <section
            className="flex flex-col p-4 m-8 justify-center items-center text-6xl bodoni"
            id="intro"
          >
            LL {currentCategory.category_name.toUpperCase()}
          </section>

          {/* section of cards that map to subcategories */}
          <section className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCategory.sub_categories?.map((sub_category) => {
                return (
                  <div
                    className="card w-96 shadow-xl image-full max-h-96"
                    onClick={() => {
                      navigate(
                        `/sub_category/${sub_category.sub_category_id}`,
                        {
                          state: {
                            currentSubCategoryProducts: currentCategoryProducts,
                            current_category_id: currentCategory._id,
                            current_sub_category_id:
                              sub_category.sub_category_id,
                          },
                        },
                      );
                    }}
                  >
                    <figure>
                      <img
                        className="object-cover w-full h-96"
                        src={
                          sub_category.sub_category_image.includes("http")
                            ? sub_category.sub_category_image
                            : "https://source.unsplash.com/random"
                        }
                      />
                    </figure>
                    <div className="card-body">
                      <div className="card-title text-3xl uppercase text-center flex w-full h-full items-center justify-center">
                        {sub_category.sub_category_name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section
            className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-4xl"
            id="intro"
          >
            {type.toUpperCase()} PRODUCTS
          </section>
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://source.unsplash.com/random"
              alt="banner"
              className="w-full h-96 object-cover object-center"
            />
            <h1 className="text-3xl font-bold text-center">
              No products found in this category
            </h1>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Category;
