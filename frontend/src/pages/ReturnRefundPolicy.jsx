import React from "react";
import Footer from "../components/ui/Footer";

const ReturnRefundPolicy = () => {
	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-6xl  my-12"
				id="intro"
			>
				Return and Refund Policy
			</section>
			{/* Your contact page content goes here */}
			<div className="flex justify-center m-16">
				<div className="text-2xl">
					<p className="m-4 text-2xl">
						All purchases made on LUXURIANTLUXE are considered final
						sales. Unless there is damage from our side, the brand
						is not liable for any damage.
					</p>

					<p className="m-4 text-2xl">
						In the rare event that you receive an incorrect or
						damaged item, please contact us within 48 hours of
						receiving your shipment. To ensure a prompt resolution,
						kindly provide the order number, shipping label, photos
						of the top, bottom, and any damaged areas of the box,
						images of all packing materials, and any damaged items.
					</p>

					<p className="m-4 text-2xl">
						These images are necessary to expedite the replacement
						of items, and we may be unable to complete a replacement
						if the original packaging is unavailable. For purchases
						made from a third-party vendor, please contact the
						vendor directly. Skin compatibility is not guaranteed.
					</p>

					<p className="m-4 text-2xl">
						While Luxuriant Luxe makes every effort to assist with
						local customs requirements, we cannot be held
						responsible for customs clearance or additional
						information required by your government or courier to
						complete a delivery. We do not issue refunds for delayed
						items due to customs clearance.
					</p>

					<p className="m-4 text-2xl">
						The images and illustrations of product are for
						photography purposes real product might be different.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ReturnRefundPolicy;
