import React, { createContext } from "react";
import useAuth from "../services/useAuth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
	const { register, authenticated } = useAuth();
	return (
		<AuthContext.Provider value={{ register, authenticated }}>
			{children}
		</AuthContext.Provider>
	);
}
export default AuthProvider;
