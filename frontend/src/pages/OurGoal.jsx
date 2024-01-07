import React from "react";
import Footer from "../components/ui/Footer";

const creator_images = [
	"https://i.imgur.com/t6211Pkh.png",
	"https://i.imgur.com/ggqaFhch.png",
];
const social_and_payment_images = [
	"https://i.imgur.com/bJgaHuhh.png",
	"https://i.imgur.com/F3JCT3eh.jpg",
	"https://i.imgur.com/LSILcLLh.jpg",
	"https://i.imgur.com/ObMvMPQh.jpg",
];
const box_images = [
	"https://i.imgur.com/p73AT9Gh.jpg",
	"https://i.imgur.com/mc7C7XUh.jpg",
	"https://i.imgur.com/eMlg0UHh.jpg",
	"https://i.imgur.com/ZPiMKFbh.jpg",
	"https://i.imgur.com/YdT2wHuh.jpg",
	"https://i.imgur.com/l37Q3LVh.jpg",
	"https://i.imgur.com/znpMKO4h.jpg",
	"https://i.imgur.com/iqcG17th.jpg",
];

const OurGoal = () => {
	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-6xl  my-12"
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
							className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-2xl md:text-left md:flex-1"
						>
							luxuriant luxe wont give you the false expectations
							from the product your natural skin will be enhanced
							and become more like what you want.
						</div>
						<div className="md:flex-1 md:flex md:p-4 md:justify-end p-4">
							<div className="rounded-3xl flex items-center 2xl:w-1/2">
								<img
									src={box_images[0]}
									alt=""
									className="rounded-3xl w-full"
								/>
							</div>
						</div>
					</div>
					{/* <p
					className="dancing text-2xl text-center mb-6 mt-8
				md:text-5xl"
				>
					We only offer the
					<span className="text-accent dancing text-xl md:text-5xl">
						{" "}
						most Premium products{" "}
					</span>
				</p> */}

					<div className="md:flex md:justify-center md:flex-row-reverse md:my-4 w-full"
						id="brownbg"
					>
						<div
							className="text-xl mt-4 cardo text-center
				md:p-10 md:rounded-2xl xl:text-4xl lg:text-3xl md:text-4xl md:text-left md:flex-1 text-white"
						>
							Mission Description
						</div>
						<div className="md:flex-1 md:flex md:p-4 md:justify-start p-4">
							<div className="rounded-3xl flex items-center 2xl:w-1/2">
								<img
									src={box_images[1]}
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
