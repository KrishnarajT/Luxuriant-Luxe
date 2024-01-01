import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/ui/Footer";

const Product = () => {
	const { id } = useParams();

	return (
		<div>
			<Footer />
		</div>
	);
};

export default Product;
