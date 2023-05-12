import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";

import { SignIn } from "./src/screens/Signin/SignIn";
import { Home } from "./src/screens/Home/Home";
import { Register } from "./src/screens/Register/Register";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Loading } from "./src/components/Loadings/Loading";

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			{fontsLoaded ? <SignIn /> : <Loading />}
		</NativeBaseProvider>
	);
}
