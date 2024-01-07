import React from "react";
import Footer from "../components/ui/Footer";

const ShippingPolicy = () => {
  return (
    <div>
      <section
        className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-6xl  my-12"
        id="intro"
      >
        Shipping Policy
      </section>
      {/* Your contact page content goes here */}
      <div className="flex justify-center">
        <div className="text-center text-2xl">
          <h2 className="font-bold">Order Processing Times:</h2>
          <p>
            Orders are typically shipped within 1 business day. Orders placed on
            weekends or holidays are shipped the following business day.
          </p>

          <h2 className="font-bold">Order Status and Tracking</h2>
          <p>
            An email with your tracking number will be provided when your order
            is shipped. It may take up to 24 hours for this to populate on the
            carrier’s website.
          </p>

          <p>
            Luxuriant Luxe is not responsible for these or any other associated
            fees and will not issue a refund if a package is abandoned or
            refused due to these fees. Luxuriant Luxe will provide additional
            assistance only if valid video proof of damaged product is received
            and accepted.
          </p>

          <p>
            Please note that we are unable to fulfill any request to declare
            your package for any value other than the total value paid at check
            out.
          </p>

          <p>
            If we are unable to deliver the products ordered to your particular
            country, we will notify you via email, and the original form of
            payment will be refunded.
          </p>

          <p>
            Luxuriant Luxe is not responsible for any delivery delays that may
            occur as a result of customs clearance.
          </p>

          <p>
            Please note that while Luxuriant Luxe makes best efforts on
            preparing all customs documents for your shipments to clear customs,
            we are not responsible for the customs clearance process.
          </p>

          <p>
            Occasionally, the courier may require additional information from
            the receiver, such as a Tax ID number or an address verification, to
            complete a delivery, as required by a local government. Our customer
            service team may contact you to notify you of the required
            information, which you may need to provide directly to the courier
            to complete the delivery of your package.
          </p>

          <h2 className="font-bold">Signature Release</h2>
          <p>
            Luxuriant Luxe provides the option of requiring a signature upon
            delivery at checkout. We are not responsible for lost or stolen
            packages that do not have this option selected for delivery.
          </p>

          <p>
            If your delivery has been signed for upon receipt, it is agreed upon
            by both parties that the delivery of your package is complete, and
            that Luxuriant Luxe is no longer responsible for your purchase.
          </p>

          <h2 className="font-bold">Multiple Orders</h2>
          <p>
            As part of our commitment to providing the best possible service to
            our customers and reducing our carbon footprint, we reserve the
            right to combine multiple orders placed within one day into one
            shipment, whenever feasible. This means that you may receive your
            items in a single package instead of multiple packages. You will
            continue to receive shipping confirmations for each order; however,
            the tracking number will be the same.
          </p>

          <h2 className="font-bold">Returns</h2>
          <p>All purchases made on our website are FINAL SALE.</p>

          <p>
            In the unlikely event that you receive an item that is damaged or
            incorrect, please contact us within 48 hours of receiving your
            shipment. To assure prompt resolution, please be prepared to provide
            the following: Order number, shipping label, pictures of the top,
            bottom, and any damaged areas of the box, pictures of all packing
            materials and any damaged items. These images are required to assist
            in the replacement of items, and we may be unable to complete a
            replacement if the original packaging is not available.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
