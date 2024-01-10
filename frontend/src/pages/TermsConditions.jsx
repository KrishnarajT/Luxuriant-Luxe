import React from "react";
import Footer from "../components/ui/Footer";
import TermsAndConditionsText from "./TermsAndConditionsText";

const TermsConditions = () => {
	return (
		<div>
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				  my-12"
				id="intro"
			>
				Terms and Conditions
			</section>
			<div className="m-16">
				<TermsAndConditionsText />
			</div>
			{/* Your contact page content goes here */}
			<Footer />
		</div>
	);
};

export default TermsConditions;
