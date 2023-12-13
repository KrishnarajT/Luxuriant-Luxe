import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
	const [userPassword, setUserPassword] = useState("");
	
	return (
		<UserContext.Provider value={{userPassword, setUserPassword}}>
			{children}
		</UserContext.Provider>
	);
};
