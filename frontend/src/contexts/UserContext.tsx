import React, { createContext } from "react";
import useAuth from "../services/useAuth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
	const {
		register,
		authenticated,
		logout,
		login,
		checkUser,
		userInfo,
		updateUser,
		deleteUser,
		precin,
		precao,
		increaseList,
		decreaseList,
	} = useAuth();
	return (
		<AuthContext.Provider
			value={{
				register,
				authenticated,
				logout,
				login,
				checkUser,
				userInfo,
				updateUser,
				deleteUser,
				precin,
				precao,
				increaseList,
				decreaseList,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
export default AuthProvider;
