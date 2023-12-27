import React, { useEffect } from "react";
import "../input.css";
import "../style.css";
import { themeChange } from "theme-change";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
	IconBrush,
	IconHome,
	IconInfoCircle,
	IconLogout,
	IconMenu2,
	IconMoon,
	IconPackage,
	IconShoppingBag,
	IconShoppingCart,
	IconSun,
	IconUserBolt,
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
				className={`navbar bg-base-100 text-base-content flex-row-reverse justify-end h-40 md:flex-row md:h-32`}
			>
				{/* maincontents */}
				<div
					className="hidden text-base-content
			   md:flex"
				>
					<ul className="menu menu-horizontal px-1">
						<li className="text-lg md:text-xl">
							<NavLink
								to={"/products"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconShoppingBag className="w-8 h-8" />
							</NavLink>
						</li>
						<li className="text-lg md:text-xl">
							<NavLink
								to={"/about"}
								id="contact_element"
								className="hover:text-base-content"
							>
								<IconInfoCircle className="w-8 h-8" />
							</NavLink>
						</li>
					</ul>
				</div>

				{/* name */}
				<div className="flex w-screen md:w-fit md:pl-0 md:display justify-center mr-8 md:flex-row md:flex-1 md:mr-0">
					<div
						className="flex-row-reverse px-2 gap-0 flex
			md:flex-row text-base-content"
					>
						<NavLink to={"/"} className="flex flex-row">
							{/* <div
								id="luxelogo"
								className="w-28 h-28 bg-center snap-center self-center"
							></div> */}
							<div className="md:normal-case md:text-7xl text-3xl bodoni text-center">
								LUXURIANT LUXE
							</div>
						</NavLink>
					</div>
				</div>
				{/* Theme */}
				<div>
					<div className="hidden md:flex">
						<ul className="menu menu-horizontal px-1">
							<li className="text-lg md:text-xl">
								<NavLink
									to={"/cart"}
									id="contact_element"
									className="hover:text-base-content text-base-content"
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
					<div className="hidden md:flex text-base-content">
						<ul className="menu menu-horizontal text-base-content px-1">
							<li>
								<details>
									<summary>
										<IconUserBolt className="w-8 h-8 text-base-content text-base-content" />
									</summary>
									<ul className="p-2 bg-base-100 text-base-content">
										<li
											className="text-lg hover:text-base-content text-base-content"
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
								<summary className="text-md md:text-xl text-base-content">
									<IconMenu2 className="w-6 h-6 text-base-content" />
								</summary>
								<ul className="p-2 bg-base-100 text-base-content z-50 flex flex-wrap flex-col w-fit gap-2">
									<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36">
										<NavLink
											to={"/"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconHome className="w-6 h-6" />
											Home
										</NavLink>
									</li>
									<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36">
										<NavLink
											to={"/products"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconShoppingBag className="w-6 h-6" />
											Products
										</NavLink>
									</li>
									<li className="text-md md:text-xl">
										<NavLink
											to={"/about"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconInfoCircle className="w-6 h-6" />
											About Us
										</NavLink>
									</li>
									<li className="text-md md:text-xl">
										<NavLink
											to={"/cart"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconShoppingCart className="w-6 h-6" />
											Cart
										</NavLink>
									</li>
									<li className="menu menu-horizontal px-1 py-0 ">
										<details>
											<summary className="text-md md:text-xl text-base-content">
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
											<summary className="text-md md:text-xl text-base-content">
												<IconUserBolt className="w-6 h-6 text-base-content" />
												Account
											</summary>
											<ul className="p-2 bg-base-100 text-base-content">
												<li className="text-md">
													<NavLink
														to={"/"}
														id="contact_element"
														className="hover:text-base-content"
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
