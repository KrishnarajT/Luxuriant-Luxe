import React from 'react';
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconMail, IconPhoneCall } from '@tabler/icons-react';
import ScrollToTopButton from './ScrollToTopButton';

const Footer = () => {
  return (
		<footer className="footer footer-center p-10 bg-secondary bottom-0 text-secondary-content">
			<aside>
				<div
					id="luxelogo"
					className="w-20 h-20 bg-center snap-center self-center text-secondary-content"
				></div>
				<p className="dancing text-3xl text-secondary-content">
					<span className="text-2xl cardo text-secondary-content">
						Luxuriant Luxe
					</span>
					<br />
					Your Skin Our Priority
				</p>
				<p>Copyright © 2023 - All right reserved</p>
				<div className="flex gap-4">
					<a className="link">Privacy Policy</a>
					<a className="link">Terms and Conditions</a>
					<a className="link">Refund and Return Policy</a>
					<a className="link">Shipping Policy</a>
				</div>
			</aside>
			<nav className="text-secondary-content">
				<div className="flex flex-wrap justify-center items-center gap-4 w-2/3 lg:w-fit">
					<a href="https://wa.me/917666018928?text=Welcome%20to%20Luxuriant%20Luxe!%20How%20can%20we%20assist%20you%20today%3F%20">
						<IconBrandWhatsapp className="w-8 h-8" />
					</a>
					<a href="https://www.instagram.com/luxuriant_luxe">
						<IconBrandInstagram className="w-8 h-8" />
					</a>
					<a href="https://www.facebook.com/profile.php?id=61551508050876">
						<IconBrandFacebook className="w-8 h-8" />
					</a>
					{/*<a*/}
					{/*	href=""*/}
					{/*>*/}
					{/*	<IconBrandTelegram className="w-8 h-8"/>*/}
					{/*</a>*/}
					<a href="https://www.linkedin.com/in/luxuriant-luxe-1b852a292">
						<IconBrandLinkedin className="w-8 h-8" />
					</a>
					<a
						onClick={
							// open mail client
							() => {
								window.location.href =
									"mailto:luxeluxuriant@gmail.com";
							}
						}
					>
						<IconMail className="w-8 h-8" />
					</a>
					<a
						onClick={
							// open phone client
							() => {
								window.location.href = "tel:+917666018928";
							}
						}
					>
						<IconPhoneCall className="w-8 h-8" />
					</a>
					<ScrollToTopButton />
				</div>
			</nav>
		</footer>
  );
};

export default Footer;
