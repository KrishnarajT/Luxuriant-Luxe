import React, {useEffect, useState} from 'react';
import {IconArrowUp} from "@tabler/icons-react";

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);
	
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	
	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > 0) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	
	return (
		<button
			className={`${
				isVisible ? 'block' : 'hidden'
			} fixed bottom-4 right-4 z-10 bg-text text-white rounded-full p-3 cursor-pointer transition transform ease-in-out duration-300 hover:scale-110`}
			onClick={scrollToTop}
		>
			<IconArrowUp/>
		</button>
	);
};

export default ScrollToTopButton;