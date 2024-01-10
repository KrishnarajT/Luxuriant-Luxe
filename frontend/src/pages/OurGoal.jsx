import React from "react";
import Footer from "../components/ui/Footer";
import { CartContext } from "../context/CartContext";

const OurGoal = () => {
	const { staticStuff } = React.useContext(CartContext);

	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-[3vw] bodoni
				  my-12"
				id="intro"
			>
				Our Goal
			</section>

			<div>
				<section
					className="md:flex flex-col justify-center items-center hidden"
					id="intro"
				>
					<div className="md:flex md:justify-center md:flex-row md:mx-20 md:my-4">
						<div
							className="mt-4 droidserif text-center
				md:p-10 md:rounded-2xl text-[2vw] leading-tight  md:text-left md:flex-1"
						>
							{staticStuff["goal_page_description_1"] ? (
								staticStuff["goal_page_description_1"]
							) : (
								<>
									luxuriant luxe wont give you the false
									expectations from the product your natural
									skin will be enhanced and become more like
									what you want.
								</>
							)}
						</div>
						<div className="md:flex-1 md:flex md:p-4 md:justify-end p-4">
							<div className="rounded-3xl flex items-center 2xl:w-1/2">
								<img
									src={
										staticStuff["goal_page_image_1"]
											? staticStuff["goal_page_image_1"]
											: "https://source.unsplash.com/random"
									}
									alt=""
									className="rounded-3xl w-full"
								/>
							</div>
						</div>
					</div>
					{/* <p
					className="dancing text-2xl text-center mb-6 mt-8
				"
				>
					We only offer the
					<span className="text-accent dancing text-xl ">
						{" "}
						most Premium products{" "}
					</span>
				</p> */}

					<div
						className="md:flex md:justify-center md:flex-row-reverse md:my-4 w-full"
						id="brownbg"
					>
						<div
							className="mt-4 droidserif text-center
				md:p-10 md:rounded-2xl text-[2vw] leading-tight  md:text-left md:flex-1 text-white"
						>
							{staticStuff["goal_page_description_2"] ? (
								staticStuff["goal_page_description_2"]
							) : (
								<>
									luxuriant luxe wont give you the false
									expectations from the product your natural
									skin will be enhanced and become more like
									what you want.
								</>
							)}{" "}
						</div>
						<div className="md:flex-1 md:flex md:p-4 md:justify-start p-4">
							<div className="rounded-3xl flex items-center 2xl:w-1/2">
								<img
									src={
										staticStuff["goal_page_image_2"]
											? staticStuff["goal_page_image_2"]
											: "https://source.unsplash.com/random"
									}
									alt=""
									className="rounded-3xl"
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
			{/* Your component code goes here */}
			<Footer />
		</div>
	);
};

export default OurGoal;
