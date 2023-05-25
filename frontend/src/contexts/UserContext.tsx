import React, { createContext } from "react";
import useAuth from "../services/useAuth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
	const { register, authenticated, logout, login, userInfo } = useAuth();
	return (
		<AuthContext.Provider
			value={{ register, authenticated, logout, login, userInfo }}
		>
			{children}
		</AuthContext.Provider>
	);
}
export default AuthProvider;
