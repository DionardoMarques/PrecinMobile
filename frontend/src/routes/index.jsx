import { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { SignIn } from "../screens/Signin/SignIn";
import { Loading } from "../components/Loadings/Loading";

import { AppRoutes } from "./app.routes";
import { Routes as Menu } from "./menu.routes.tsx";

import { AuthContext } from "../contexts/UserContext";

export function Routes() {
	const [loading, setIsLoading] = useState(false);
	const { authenticated } = useContext(AuthContext);

	if (loading) {
		return <Loading />;
	}

	return (
		<NavigationContainer>
			{/* {user ? <AppRoutes /> : <SignIn />} */}
			{authenticated ? <Menu /> : <SignIn />}
		</NavigationContainer>
	);
}
