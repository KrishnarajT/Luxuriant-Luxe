import React, { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
import "../style.css";
import "../input.css";
import {
  IconDiscountCheckFilled,
  IconExclamationCircle,
  IconHome,
  IconMail,
  IconMinus,
  IconPhoneCall,
  IconPlus,
  IconShoppingCartHeart,
} from "@tabler/icons-react";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import Footer from "../components/ui/Footer";
import Cart from "./Cart";
import TermsAndConditionsText from "./TermsAndConditionsText";
const qr_code_image = "https://i.imgur.com/ObMvMPQh.jpg";

axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:5173";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const Checkout = () => {
  // const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);
  const [change, setChange] = React.useState(0);
  const base_url = React.useContext(BaseUrlContext).baseUrl;

  let {
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    productInfo,
    IncreaseProductQuantity,
    DecreaseProductQuantity,
    getCart,
    cart,
    currentCustomerPoints,
    setCurrentCustomerPoints,
    getDiscountedTotal,
    getCartPoints,
  } = React.useContext(CartContext);

  useEffect(() => {
    // setCart(getCart());
    if (theme === "light") {
      const light_button = document.getElementById("light_button");
      light_button.click();
    } else {
      const dark_button = document.getElementById("dark_button");
      dark_button.click();
    }
  }, []);

  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [currentCustomerId, setCurrentCustomerId] = React.useState("");
  const [currentCustomerOrderCost, setCurrentCustomerOrderCost] =
    React.useState(0);
  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [apartment, setApartment] = React.useState("");
  const [wantsSubscription, setWantsSubscription] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    // setCart(getCart());
  }, [counter]);

  const checkValidity = () => {
    // check that none of the things are null
    if (
      customerEmail === "" ||
      customerPhone === "" ||
      region === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      apartment === ""
    ) {
      toast.error("Please fill all the fields!");
      return false;
    }

    const phone = "1234567890";
    const phoneRegex = /^[0-9]{10}$/;

    if (phoneRegex.test(phone)) {
      // console.log("Phone number is valid");
    } else {
      // console.log("Phone number is invalid");
      return false;
    }

    // do a regex check for email
    const email_regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (!email_regex.test(customerEmail)) {
      alert("Please enter a valid email!");
      return false;
    }

    // merge fields to form customer address
    setCustomerAddress(
      `${country}, ${region}, ${firstName} ${lastName}, ${address}, ${apartment}`,
    );

    // merge fields to form customer name
    setCustomerName(`${firstName} ${lastName}`);
    return true;
  };

  const SendOrderToBackend = async () => {
    // show the placing order button
    // const placing_order = document.getElementById("placing_order");
    // placing_order.classList.remove("hidden");

    // print everything
    // console.log(customerEmail);
    // console.log(customerPhone);
    // console.log(customerAddress);
    // console.log("customr name is: ", customerName);
    // console.log(getCart());
    // console.log(getCartTotal());

    let latest_cart = getCart();
    // console.log("The latest cart is: ", cart);
    const response = await axios
      .post(
        `${base_url}/api/v1/Luxuriant/add_order`,
        {},
        {
          params: {
            customer_email: customerEmail,
            customer_phone: customerPhone,
            customer_address: customerAddress,
            customer_name: customerName,
            customer_order: JSON.stringify(cart),
            order_cost: getDiscountedTotal(),
            updated_customer_points: getCartPoints(),
            points_used: currentCustomerPoints,
            wantsSubscription: wantsSubscription,
          },
        },
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        alert("server not running! a simulated response is being sent");
        return {
          data: {
            message: "simulation",
          },
        };
      });
    // console.log(response.data);

    // // stop showing the placing order button
    // placing_order.classList.add("hidden");

    if (response.data.message === "simulation") {
      alert("Simulation Response, Added order");
    } else if (response.data.message === "Success") {
      // toast.success("Order Placed Successfully!");
      // toast using the modal
      document.getElementById("order_placed_modal").showModal();
      // show for 2 seconds
      setTimeout(() => {
        document.getElementById("order_placed_modal").close();
      }, 2000);
      clearCart();
      setChange(1);
    } else if (response.data.message === "Failure") {
      // toast.error("Order Failed!");
      // toast using the modal
      document.getElementById("order_not_placed_modal").showModal();
      // show for 2 seconds
      setTimeout(() => {
        document.getElementById("order_not_placed_modal").close();
      }, 2000);
    }
  };

  const getCustomerPoints = async () => {
    const data = {
      customer_email: customerEmail,
    };
    const response = await axios
      .post(`${base_url}/api/v1/Luxuriant/get_customer_points`, {
        data,
      })
      .then((response) => {
        if (response.data.message === "success") {
          // console.log(
          // 	"customer points are: ",
          // 	response.data.customer_points
          // );
          setCurrentCustomerPoints(response.data.customer_points);
        }
        return response;
      })
      .catch((error) => {
        console.error(error);
        alert("server not running! a simulated response is being sent");
        return {
          data: {
            message: "simulation",
          },
        };
      });
    // console.log(response.data);

    if (response.data.message === "simulation") {
      alert("Simulation Response, Added order");
    } else if (response.data.message === "Success") {
      toast.success("Order Placed Successfully!");
      clearCart();
      setChange(1);
    } else if (response.data.message === "Failure") {
      toast.error("Order Failed!");
    }
  };

  const addCustomer = async () => {
    const data = {
      customer_email: customerEmail,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      customer_name: customerName,
      customer_points: currentCustomerPoints,
      wantsSubscription: wantsSubscription,
    };
    const response = await axios
      .post(`${base_url}/api/v1/Luxuriant/add_customer_email`, { data })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        alert("server not running! a simulated response is being sent");
        return {
          data: {
            message: "simulation",
          },
        };
      });
    // console.log(response.data);

    if (response.data.message === "simulation") {
      alert("Simulation Response, Added order");
    } else if (response.data.message === "Success") {
      toast.success("You are Successfully Subscribed!");
      clearCart();
      setChange(1);
    } else if (response.data.message === "Failure") {
      toast.error("Could not Subscribe!");
    }
  };

  return (
    <div>
      <Toaster />
      <section
        className="flex flex-col p-4 m-8 justify-center items-center text-5xl bodoni"
        id="intro"
      >
        Checkout and Shipping
      </section>

      <div className="flex gap-4 w-screen">
        <div className="w-1/2 flex flex-col p-4 items-center">
          <div className="w-2/3">
            <div className="flex justify-center uppercase ml-4">
              <div className="text-4xl bodoni font-semibold">Contact</div>
            </div>

            {/* Enter customer email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xl">Your Email</span>
              </label>
              <label className="input-group">
                <span>
                  <IconMail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={customerEmail}
                  onChange={(event) => {
                    setCustomerEmail(event.target.value);
                  }}
                />
              </label>
              {/* Checkbox for sending subscription mail */}
              <div className="form-control mt-4">
                <label className="cursor-pointer label">
                  <span className="label-text text-xl">
                    Subscribe to our newsletter?
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox shadow shadow-black"
                    value={wantsSubscription}
                    onClick={() => {
                      setWantsSubscription(!wantsSubscription);
                      // console.log("checkbox clicked");
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center uppercase ml-4 mt-4">
              <div className="text-4xl bodoni font-semibold">
                Shipping Address
              </div>
            </div>

            <div className="flex flex-col">
              {/* Country, Region */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Country</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="input input-bordered"
                  value={country}
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Region</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your region"
                  className="input input-bordered"
                  value={region}
                  onChange={(event) => {
                    setRegion(event.target.value);
                  }}
                />
              </div>

              {/* First Name, Last Name in different fields */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="input input-bordered"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </div>

              {/* Address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="input input-bordered"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>

              {/* Apartment, Building */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Apartment/Building</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your apartment or building"
                  className="input input-bordered"
                  value={apartment}
                  onChange={(event) => {
                    setApartment(event.target.value);
                  }}
                />
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Phone</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number (only 10 digits)"
                  className="input input-bordered"
                  value={customerPhone}
                  onChange={(event) => {
                    setCustomerPhone(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col flex-1">
          <Cart />
        </div>
      </div>

      {cart.length !== 0 ? (
        <section
          className="flex flex-col p-4 justify-center items-center"
          id="intro"
        >
          <button
            className="btn btn-lg btn-primary"
            id="buy_now_button"
            disabled={getDiscountedTotal === 0 ? true : false}
            onClick={() => {
              if (checkValidity()) {
                if (customerEmail !== "") {
                  getCustomerPoints();
                }
                document.getElementById("my_modal_1").showModal();
              }
            }}
          >
            Buy Now.
          </button>
        </section>
      ) : (
        <div></div>
      )}
      {cart.length !== 0 ? (
        <section
          className="flex flex-col items-center p-4 justify-center hidden"
          id="qr_payment"
        >
          <div className="alert alert-success max-w-5xl text-center flex flex-col justify-center">
            {/* <IconDiscountCheckFilled className="w-8 h-8" /> */}
            <span className="text-center text-2xl">
              Pay this Number below or Scan the UPI QR Code, and you will
              receive an email confirming your order within 24 hours.{" "}
            </span>
          </div>
          <div className="flex justify-center">
            <img src={qr_code_image} alt="QR Code" className="w-1/2 m-4" />
          </div>

          <button
            className="btn btn-lg btn-primary m-4"
            id="buy_now_button"
            onClick={() => {
              // console.log(
              // 	"i have paid clicked. send some api calls. "
              // );
              setCounter((counter) => counter + 1);
              SendOrderToBackend();
              // hide the buy now button
              // const buy_now_button = document.getElementById("buy_now_button");
              // buy_now_button.style.display = "none";
              // hide the qr code section
              // const qr_code =
              // 	document.getElementById("qr_payment");
              // qr_code.style.display = "none";
              // clearCart();
            }}
          >
            I Have Paid!
          </button>
        </section>
      ) : (
        <div></div>
      )}

      <Footer />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg"></h3>
          <p className="py-4 text-2xl text-center">
            Please read and Accept the terms and conditions.
          </p>
          <div className="modal-action px-2">
            <form method="dialog">
              <div className="max-h-72 outline rounded-xl outline-1 overflow-auto scroll-auto">
                <TermsAndConditionsText />
              </div>
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-center m-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    // console.log(
                    // 	"buy now clicked. send some api calls. "
                    // );
                    // 	unhide the qr code
                    const qr_code = document.getElementById("qr_payment");
                    qr_code.style.display = "flex";
                  }}
                >
                  I Accept the Terms and Conditions
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* dialog for showing order placed */}
      <dialog id="order_placed_modal" className="modal">
        <div className="modal-box w-full p-0">
          <div>
            <img
              src="https://i.imgur.com/aDL8JjQ.jpg"
              alt="done"
              className="w-full aspect-auto"
            />
          </div>
        </div>
      </dialog>
      <dialog id="order_not_placed_modal" className="modal">
        <div className="modal-box w-full p-0">
          <div>
            <img
              src="https://i.imgur.com/7m0kgVi.jpg"
              alt="done"
              className="w-full aspect-auto"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Checkout;
