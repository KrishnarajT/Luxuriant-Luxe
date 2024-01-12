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
	IconShoppingBag,
	IconShoppingBagSearch,
	IconShoppingCart,
	IconSun,
	IconUserBolt,
	IconCurrencyRupee,
	IconSearch,
} from "@tabler/icons-react";
import "../css/Navbar.css";
import { PhHandbagFill } from "./ui/PhHandbagFill";
import { SolarCosmeticBoldDuotone } from "./ui/SolarCosmeticBoldDuotone";
import { MaterialSymbolsLightFace2 } from "./ui/MaterialSymbolsLightFace2";
import { IconParkOutlineCosmeticBrush } from "./ui/IconParkOutlineCosmeticBrush";
import { CartContext } from "../context/CartContext";

export function Navbar(props) {
	const {
		productInfo,
		HairProducts,
		SkinProducts,
		CosmeticsProducts,
		EssentialsProducts,
		HolidayProducts,
		FeaturedProducts,
		setCurrentCategoryProducts,
		removeDuplicates,
	} = React.useContext(CartContext);
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

	return (
		<div className="z-50">
			<div
				className={`navbar bg-transparent text-base-content flex-row-reverse justify-end h-[6.5vw] md:flex-row`}
			>
				{/* hair skin and cosmetics */}
				<div>
					<div className="hidden md:flex">
						<ul className="menu menu-horizontal px-1">
							<li className="text-lg md:text-xl">
								<NavLink
									to={"/category/hair"}
									state={{
										currentCategoryProducts: HairProducts,
									}}
									id="contact_element"
									className="hover:text-base-content text-2xl w-full"
									onClick={() => {
										setCurrentCategoryProducts(
											HairProducts
										);
									}}
								>
									<label className="w-fit bg-transparent text-[2vw] bodoni border-none">
										LL Hair
									</label>
								</NavLink>
							</li>
							<li className="text-lg md:text-xl">
								<NavLink
									to={"/category/skin"}
									state={{
										currentCategoryProducts: HairProducts,
									}}
									id="contact_element"
									className="hover:text-base-content text-2xl w-full"
									onClick={() => {
										setCurrentCategoryProducts(
											SkinProducts
										);
									}}
								>
									<label className="w-fit bg-transparent text-[2vw] bodoni border-none">
										LL Skin
									</label>
								</NavLink>
							</li>
							<li className="text-lg md:text-xl">
								<NavLink
									to={"/category/cosmetics"}
									state={{
										currentCategoryProducts: HairProducts,
									}}
									id="contact_element"
									className="hover:text-base-content text-2xl w-full"
									onClick={() => {
										setCurrentCategoryProducts(
											CosmeticsProducts
										);
									}}
								>
									<label className="w-fit bg-transparent text-[2vw] bodoni border-none">
										LL Cosmetics
									</label>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				{/* name */}

				<div
					className="flex-1 flex"
					onClick={() => {
						navigate("/");
					}}
				>
					<div className="text-[4vw] text-center self-center bodoni absolute left-1/2 transform -translate-x-1/2">
						LUXURIANT LUXE
					</div>
				</div>
				{/* Theme */}
				<div>
					<div className="hidden md:flex items-center justify-center">
						<ul className="menu menu-horizontal px-1">
							<li className="text-lg md:text-xl flex justify-center items-center">
								<label className="bg-transparent border-none w-fit flex items-center justify-center text-[1.6vw] px-1">
									INR
									<IconCurrencyRupee className="w-[2vw] h-[2vw] px-0 mx-0" />
								</label>
							</li>
							<li className="text-lg md:text-xl flex icons-center justify-center">
								<label
									id="cartlabel"
									className="bg-transparent border-none w-fit flex items-center justify-center px-3"
									onClick={() => navigate("/search")}
								>
									<IconSearch className="w-[2vw] h-[2vw]" />
								</label>
							</li>
							<li className="text-lg md:text-xl flex justify-center items-center">
								<label
									htmlFor="my-drawer"
									id="cartlabel"
									className="bg-transparent border-none w-[4vw] flex items-center justify-center px-0"
								>
									<img
										src="https://i.imgur.com/rceLsGT.png"
										className="h-[2.4vw]"
									/>
								</label>
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
									<IconMenu2 className="w-[1vw] h-[1vw] text-base-content" />
								</summary>
								<ul className="p-2 bg-base-100 text-base-content z-50 flex flex-wrap flex-col w-fit gap-2">
									<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36">
										<NavLink
											to={"/"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconHome className="w-[1vw] h-[1vw]" />
											Home
										</NavLink>
									</li>
									<li className="text-md md:text-xl whitespace-nowrap flex-nowrap w-36">
										<NavLink
											to={"/products"}
											id="contact_element"
											className="hover:text-base-content"
										>
											<IconShoppingBag className="w-[1vw] h-[1vw]" />
											Products
										</NavLink>
									</li>

									<li className="text-md md:text-xl">
										<IconShoppingCart className="w-[1vw] h-[1vw] drawer-toggle" />
										Cart
									</li>
									<li className="menu menu-horizontal px-1 py-0 ">
										<details>
											<summary className="text-md md:text-xl text-base-content">
												<IconBrush className="w-[1vw] h-[1vw]" />
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
														<IconSun className="w-[1vw] h-[1vw]" />
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
														<IconMoon className="w-[1vw] h-[1vw]" />
														Dark
													</a>
												</li>
											</ul>
										</details>
									</li>
									<li className="menu menu-horizontal px-1 py-0">
										<details>
											<summary className="text-md md:text-xl text-base-content">
												<IconUserBolt className="w-[1vw] h-[1vw] text-base-content" />
												Account
											</summary>
											<ul className="p-2 bg-base-100 text-base-content">
												<li className="text-md">
													<NavLink
														to={"/"}
														id="contact_element"
														className="hover:text-base-content"
													>
														<IconLogout className="w-[1vw] h-[1vw]" />
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
