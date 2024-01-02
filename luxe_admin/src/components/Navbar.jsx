import React, { useEffect } from "react";
import "../input.css";
import "../style.css";
import { themeChange } from "theme-change";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
	IconBoxSeam,
	IconBrush,
	IconCategory,
	IconLogout,
	IconMail,
	IconMenu2,
	IconMoon,
	IconQuestionMark,
	IconShoppingCart,
	IconSun,
	IconUserBolt,
	IconUsers,
} from "@tabler/icons-react";
import "../css/Navbar.css";

export function Navbar(props) {
	useEffect(() => {
		themeChange(false);
	}, []);
	const { theme, setTheme } = React.useContext(ThemeContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
	});

	function handleLogout() {
		props.setisNavbarPresent(false);
		navigate("/");
	}

	return (
		<div className="z-50">
			<div
				className={`navbar bg-base-200 text-base-content flex-row-reverse justify-between
			md:flex-row`}
			>
				{/* name */}
				<div
					className="flex-row-reverse px-2 gap-0
			md:flex-row"
				>
					<div className="flex flex-row">
						<div
							id="luxelogo"
							className="w-9 h-9 bg-center snap-center self-center"
						></div>
						<div className="md:btn md:btn-ghost md:normal-case md:text-xl hidden md:display text-primary-content">
							LL Admin
						</div>
					</div>
				</div>
				{/* maincontents */}
				<div
					className="hidden
			   md:flex"
				>
					<ul className="menu menu-horizontal px-1">
						<li className="text-md md:text-xl mx-1">
							<NavLink
								to={"/orders"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconShoppingCart className="w-6 h-6" />
								Orders
							</NavLink>
						</li>

						<li className="text-md md:text-xl mx-1">
							<NavLink
								to={"/customers"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconUsers className="w-6 h-6" />
								Customers
							</NavLink>
						</li>
						<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36 mx-1">
							<NavLink
								to={"/products"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconBoxSeam className="w-6 h-6" />
								Products
							</NavLink>
						</li>
						<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36 mx-1">
							<NavLink
								to={"/emails"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconMail className="w-6 h-6" />
								Emails
							</NavLink>
						</li>
						<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36 mx-1 ">
							<NavLink
								to={"/categories"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconCategory className="w-6 h-6" />
								Category
							</NavLink>
						</li>
						<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36 mx-1">
							<NavLink
								to={"/faqs"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconQuestionMark className="w-6 h-6" />
								FAQs
							</NavLink>
						</li>
					</ul>
				</div>
				{/* Theme */}
				<div>
					<div className="hidden md:flex">
						<ul className="menu menu-horizontal px-1">
							<li className="text-lg md:text-xl">
								<NavLink
									to={"/cart"}
									id="contact_element"
									className="hover:text-base-content"
								>
									<IconShoppingCart className="w-8 h-8" />
								</NavLink>
							</li>

							{theme === "light" ? (
								<li className="text-lg md:text-xl">
									<button
										className="btn btn-ghost rounded-btn"
										onClick={() => {
											setTheme("dark");
										}}
									>
										<IconMoon
											className="w-8 h-8"
											onClick={() => {
												setTheme("dark");
											}}
										/>
									</button>
								</li>
							) : (
								<li className="text-lg md:text-xl">
									<button className="btn btn-ghost rounded-btn">
										<IconSun
											className="w-8 h-8 text-base-content hover:text-base-content"
											onClick={() => {
												setTheme("light");
											}}
										/>
									</button>
								</li>
							)}
						</ul>
					</div>
					{/* Profile */}
					<div className="hidden md:flex">
						<ul className="menu menu-horizontal  px-1">
							<li>
								<details>
									<summary>
										<IconUserBolt className="w-8 h-8" />
									</summary>
									<ul className="p-2 bg-base-100 text-base-content">
										{/*<li className="text-lg">*/}
										{/*	<NavLink*/}
										{/*		to={"/cart"}*/}
										{/*		id="contact_element"*/}
										{/*		className="hover:text-base-content"*/}
										{/*	>*/}
										{/*		<IconGardenCart className="w-8 h-8"/>*/}
										{/*		Cart*/}
										{/*	</NavLink>*/}
										{/*</li>*/}
										<li
											className="text-lg hover:text-base-content"
											onClick={() => {
												handleLogout();
											}}
										>
											<a>Logout</a>
										</li>
									</ul>
								</details>
							</li>
						</ul>
					</div>
				</div>

				{/* hamburger */}
				<div className="md:hidden w-fit">
					<ul className="menu menu-horizontal px-1 w-fit">
						<li>
							<details className="w-fit">
								<summary className="text-md md:text-xl hover:text-base-content">
									<IconMenu2 className="w-6 h-6" />
								</summary>
								<ul className="p-2 bg-base-100 text-base-content z-50 flex flex-wrap flex-col w-fit gap-2">
									<li className="text-md md:text-xl">
										<NavLink
											to={"/orders"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconShoppingCart className="w-6 h-6" />
											Orders
										</NavLink>
									</li>

									<li className="text-md md:text-xl">
										<NavLink
											to={"/customers"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconUsers className="w-6 h-6" />
											Customers
										</NavLink>
									</li>
									<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36 mx-1">
										<NavLink
											to={"/products"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconBoxSeam className="w-6 h-6" />
											Products
										</NavLink>
									</li>
									<li className="menu menu-horizontal px-1 py-0 ">
										<details>
											<summary className="text-md md:text-xl hover:text-base-content">
												<IconBrush className="w-6 h-6" />
												Theme
											</summary>
											<ul className="p-2 bg-base-100 text-base-content">
												<li
													// data-set-theme="cupcake"
													className="text-md"
													onClick={() =>
														setTheme("light")
													}
												>
													<a>
														<IconSun className="w-6 h-6" />
														Light
													</a>
												</li>
												<li
													className="text-md"
													// data-set-theme="dracula"
													onClick={() =>
														setTheme("dark")
													}
												>
													<a>
														<IconMoon className="w-6 h-6" />
														Dark
													</a>
												</li>
											</ul>
										</details>
									</li>
									<li className="menu menu-horizontal px-1 py-0">
										<details>
											<summary className="text-md md:text-xl hover:text-base-content">
												<IconUserBolt className="w-6 h-6" />
												Account
											</summary>
											<ul className="p-2 bg-base-100 text-base-content">
												{/*<li className="text-md">*/}
												{/*	<NavLink*/}
												{/*		to={"/cart"}*/}
												{/*		id="contact_element"*/}
												{/*		className="hover:text-base-content"*/}
												{/*	>*/}
												{/*		<IconGardenCart className="w-6 h-6"/>*/}
												{/*		Cart*/}
												{/*	</NavLink>*/}
												{/*</li>*/}
												<li className="text-md">
													<NavLink
														to={"/"}
														id="contact_element"
														className="hover:text-base-content"
														onClick={() => {
															props.setisNavbarPresent(
																false
															);
														}}
													>
														<IconLogout className="w-6 h-6" />
														Logout
													</NavLink>
												</li>
											</ul>
										</details>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
