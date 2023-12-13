import { createContext, useState } from "react";

export const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {
	const [baseUrl, setBaseUrl] = useState(
		"https://gleaming-flannel-shirt-fox.cyclic.app"
	);

	return (
		<BaseUrlContext.Provider value={{ baseUrl, setBaseUrl }}>
			{children}
		</BaseUrlContext.Provider>
	);
};
