import { createContext, useState } from "react";

export const DBInfoContext = createContext();

export const DBInfoContextProvider = ({ children }) => {
	const [orderInfo, setOrderInfo] = useState(null);
	const [customerInfo, setCustomerInfo] = useState(null);
	const [productInfo, setProductInfo] = useState(null);

	const getProductFromId = async (id) => {
		return productInfo.find((product) => product.id === id);
	};

	return (
		<DBInfoContext.Provider
			value={{
				orderInfo,
				setOrderInfo,
				customerInfo,
				setCustomerInfo,
				productInfo,
				setProductInfo,
				getProductFromId,
			}}
		>
			{children}
		</DBInfoContext.Provider>
	);
};
