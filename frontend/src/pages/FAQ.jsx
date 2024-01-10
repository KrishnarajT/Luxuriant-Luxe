import React from "react";
import { useEffect } from "react";
import { BaseUrlContext } from "../context/BaseUrlContext";
import axios from "axios";
import Footer from "../components/ui/Footer";

const FAQ = () => {
	const [faqs, setFaqs] = React.useState([]);
	const base_url = React.useContext(BaseUrlContext).baseUrl;
	const fetchFAQsFromServer = async () => {
		await axios
			.post(`${base_url}/api/v1/Luxuriant/get_faqs`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				// console.log(response);
				if (response.data.message === "Success") {
					const data = response.data.faqs;
					// console.log(data);
					setFaqs(data);
				} else if (response.data.message === "No faqs found") {
					setFaqs([]);
				}
				return response;
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		async function fetchstuff() {
			await fetchFAQsFromServer();
		}
		fetchstuff();
	}, []);

	return (
		<div className="flex flex-col gap-4 w-full items-center justify-center min-h-screen">
			<section
				className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				  my-12"
				id="intro"
			>
				FAQs
			</section>
			<div className="w-3/4 flex flex-col gap-4">
				{faqs.length !== 0 ? (
					faqs.map((faq) => {
						return (
							<div className="collapse bg-secondary">
								<input type="radio" name="my-accordion-1" />
								<div className="collapse-title text-2xl font-medium">
									{faq.question}
								</div>
								<div className="collapse-content text-xl">
									<p>{faq.answer}</p>
								</div>
							</div>
						);
					})
				) : (
					<div className="text-2xl">No FAQs Found</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default FAQ;
