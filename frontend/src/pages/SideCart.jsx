// this is the drawer. it contains cart. This is present always, and is activated by javascript.

import React from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
const SideCart = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle hidden"
        />
        {/* <label
          id="cartlabel"
					htmlFor="my-drawer"
					className="btn btn-primary drawer-button"
				>
					Open drawer
				</label> */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="w-2/5 min-h-full bg-base-200 text-base-content drawer-content">
            <div className="w-full flex justify-start">
              <IconX
                className="w-12 h-12 m-4 opacity-75"
                onClick={() => {
                  document.getElementById("my-drawer").checked = false;
                }}
              />
            </div>
            <Cart />
            <div className="flex justify-center">
              <div className="text-2xl garbata">
                Discounts are calculated at checkout
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-secondary uppercase w-4/5 rounded-none m-8"
                onClick={() => {
                  document.getElementById("my-drawer").checked = false;
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCart;
