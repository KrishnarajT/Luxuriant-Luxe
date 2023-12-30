import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Category = () => {
	const { type } = useParams();
	const navigate = useNavigate();

	// Use the 'type' parameter in your component logic

	return (
		<div>
			<h1>Category: {type}</h1>
			{/* Rest of your component */}
			<button onClick={() => navigate("/product/1")}>Product 1</button>
		</div>
	);
};

export default Category;
