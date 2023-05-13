import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { SignIn } from "../screens/Signin/SignIn";
import { Loading } from "../components/Loadings/Loading";

import { AppRoutes } from "./app.routes";
import { Routes as Menu } from "./menu.routes.tsx";

export function Routes() {
	const [loading, setIsLoading] = useState(false);
	const [user, setUser] = useState(true);

	if (loading) {
		return <Loading />;
	}

	return (
		<NavigationContainer>
			{/* {user ? <AppRoutes /> : <SignIn />} */}
			{user ? <Menu /> : <SignIn />}
		</NavigationContainer>
	);
}
