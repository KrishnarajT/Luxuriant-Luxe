import React from "react";

const FAQ = () => {
	return (
		<div className="flex flex-col gap-4 w-full items-center justify-center">
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bulgatti
				md:text-6xl  my-12"
				id="intro"
			>
				Faq
			</section>
			<div className="md: w-3/4">
				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						Are Luxuriant Luxe Products Safe For Breastfeeding and
						Pregnant Moms?
					</div>
					<div className="collapse-content text-xl">
						<p>Yes</p>
					</div>
				</div>
				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						Are Luxuriant Luxe Products suitable for Sensitive Skin?
					</div>
					<div className="collapse-content text-xl">
						<p>Yes</p>
					</div>
				</div>
				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						Do Gloss Colors go well with Indian Skin Tones?
					</div>
					<div className="collapse-content text-xl">
						<p>Yes</p>
					</div>
				</div>

				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						In how many days will I receive my order?
					</div>
					<div className="collapse-content text-xl">
						<p>
							You should receieve the order within 2 to 3 days of
							placing it. You will get a confirmation mail within
							a day of making your payment.{" "}
						</p>
					</div>
				</div>

				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						What will happen if the product arrives damaged?
					</div>
					<div className="collapse-content text-xl">
						<p>
							You can send us verification of the damaged product
							by connecting with us in our social media, and you
							will receive a new product by us within the next few
							days.{" "}
						</p>
					</div>
				</div>

				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						What is the process of getting a Refund?
					</div>
					<div className="collapse-content text-xl">
						<p>
							Connect to us via any of our social Media, and we
							will provide you with a refund provided valid
							considerations.{" "}
						</p>
					</div>
				</div>

				<div className="collapse bg-base-200 my-5">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-2xl font-medium">
						What support can we get as a Luxuriant Luxe Member?
					</div>
					<div className="collapse-content text-xl">
						<p></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FAQ;
