import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home/Home";
import { SignIn } from "../screens/Signin/SignIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="home" component={Home} />
			<Screen name="signIn" component={SignIn} />
		</Navigator>
	);
}
