import React, { useEffect } from "react";

// faqs look like this
// {
// 	"id": 1,
// 	"question": "How do I return an item?",
// 	"answer": "You can return an item by clicking on the return button on the order page.",
// },
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { DBInfoContext } from "../context/DBInfoContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { IconRefresh } from "@tabler/icons-react";

const Faqs = () => {
	const { faqInfo, setFaqInfo } = React.useContext(DBInfoContext);
	const [showDialog, setShowDialog] = useState(false);
	const [newQuestion, setNewQuestion] = useState("");
	const base_url = React.useContext(BaseUrlContext).baseUrl;

	const [newAnswer, setNewAnswer] = useState("");
	const { userPassword } = React.useContext(UserContext);
	useEffect(() => {
		// log everything
		console.log("faq", faqInfo);
	}, [faqInfo]);
	useEffect(() => {
		// getFAQFromServer();
	}, []);

	const handleAddFaq = async () => {
		const newFaq = {
			question: newQuestion,
			answer: newAnswer,
		};
		// send request to add new faq
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/add_faq`,
				{
					password: userPassword,
					faq: newFaq,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				toast.success("FAQ added successfully");
				getFAQFromServer();
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				return {
					data: {
						message: "simulation",
					},
				};
			});
		setShowDialog(false);
		setNewQuestion("");
		setNewAnswer("");
	};

	const getFAQFromServer = async () => {
		await axios
			.post(
				`${base_url}/api/v1/Luxuriant/get_faqs`,
				{
					password: userPassword,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				setFaqInfo(response.data.faqs);
				// toast
				toast.success("FAQs loaded successfully");
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				// toast
				toast.error("FAQs failed to load");
				return {
					data: {
						message: "simulation",
					},
				};
			});
	};

	const handleDeleteFaq = (id) => {
		// send request to delete faq
		axios
			.post(
				`${base_url}/api/v1/Luxuriant/delete_faq`,
				{
					password: userPassword,
					faq_id: id,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("FAQ deleted successfully");
				} else {
					toast.error("FAQ failed to delete");
				}
				getFAQFromServer();
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				return {
					data: {
						message: "simulation",
					},
				};
			});
	};

	const handleUpdatingFaq = (id, question, answer) => {
		// send request to update faq
		axios
			.post(
				`${base_url}/api/v1/Luxuriant/update_faq`,
				{
					password: userPassword,
					faq_id: id,
					faq: {
						question: question,
						answer: answer,
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				if (response.data.message === "success") {
					toast.success("FAQ updated successfully");
				} else {
					console.log(response.data);
					toast.error("FAQ failed to update");
				}
				getFAQFromServer();
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a simulated response is being sent");
				return {
					data: {
						message: "simulation",
					},
				};
			});
	};
	return (
		<div>
			<Toaster />
			<div className="flex justify-center m-4">
				<div className="text-4xl bulgatti my-6">FAQs</div>
			</div>
			{/* add button */}
			<div className="flex justify-center m-4">
				<button
					className="btn btn-primary"
					onClick={() =>
						document.getElementById("my_modal_1").showModal()
					}
				>
					Add FAQ
				</button>
				<button
					className="btn btn-md bg-primary text-primary-content mx-4 p-2"
					onClick={() => {
						getFAQFromServer();
					}}
				>
					<IconRefresh className="w-8 h-8" />
				</button>
			</div>
			<div>
				{faqInfo !== null ? (
					<div className="overflow-x-auto mx-4 outline rounded-2xl">
						<table className="table text-xl outline outline-1 ">
							<thead className="text-xl">
								<tr className="border-neutral border-b-1 bg-base-300 text-base-content">
									<th className="text-left">Question</th>
									<th className="text-left">Answer</th>
									<th className="text-left">Actions</th>
								</tr>
							</thead>
							<tbody>
								{faqInfo.map((faq) => (
									<tr key={faq._id}>
										<td>
											<input
												className="input input-bordered input-info w-full"
												type="text"
												value={faq.question}
												onChange={(e) => {
													const updatedFaq = {
														...faq,
														question:
															e.target.value,
													};
													setFaqInfo(
														faqInfo.map((faq) => {
															if (
																faq._id ===
																updatedFaq._id
															) {
																return updatedFaq;
															}
															return faq;
														})
													);
												}}
											/>
										</td>
										<td>
											<input
												type="text"
												className="input input-bordered input-info w-full"
												value={faq.answer}
												onChange={(e) => {
													const updatedFaq = {
														...faq,
														answer: e.target.value,
													};
													setFaqInfo(
														faqInfo.map((faq) => {
															if (
																faq._id ===
																updatedFaq._id
															) {
																return updatedFaq;
															}
															return faq;
														})
													);
												}}
											/>
										</td>
										<td>
											<div className="flex justify-center gap-4">
												<button
													className="btn btn-outline btn-md"
													onClick={() => {
														handleUpdatingFaq(
															faq._id,
															faq.question,
															faq.answer
														);
													}}
												>
													Update
												</button>
												<button
													className="btn btn-outline btn-md"
													onClick={() => {
														handleDeleteFaq(
															faq._id
														);
													}}
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : null}
			</div>
			{/* add dialogue */}
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add FAQ</h3>
					<p className="py-4">Add your new faq here.</p>
					<div className="modal-action justify-center">
						<form method="dialog">
							<label className="label">
								<span className="label-text">Question</span>
							</label>
							<input
								type="text"
								placeholder="Enter question"
								className="input input-bordered"
								value={newQuestion}
								onChange={(e) => {
									setNewQuestion(e.target.value);
								}}
							/>
							<label className="label">
								<span className="label-text">Answer</span>
							</label>
							<input
								type="text"
								placeholder="Enter answer"
								className="input input-bordered"
								value={newAnswer}
								onChange={(e) => {
									setNewAnswer(e.target.value);
								}}
							/>
							<div className="w-full flex flex-row gap-4">
								<button
									className="btn btn-primary mt-4"
									onClick={(e) => {
										// if either of question or answer is empty, don't submit, toast
										if (
											newQuestion === "" ||
											newAnswer === ""
										) {
											toast.error(
												"Please fill in all fields"
											);
											return;
										}
										e.preventDefault();
										handleAddFaq();
									}}
								>
									Add FAQ
								</button>
								{/* if there is a button in form, it will close the modal */}
								<button className="btn btn-primary mt-4">
									Close
								</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Faqs;
