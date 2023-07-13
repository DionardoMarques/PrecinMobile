import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";

import { Loading } from "./src/components/Loadings/Loading";
import { Routes } from "./src/routes";

import { NativeBaseProvider, StatusBar } from "native-base";

import AuthProvider from "./src/contexts/UserContext";
import ResultProvider from "./src/contexts/SearchResult";

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<AuthProvider>
				{fontsLoaded ? (
					<ResultProvider>
						<Routes />
					</ResultProvider>
				) : (
					<Loading />
				)}
			</AuthProvider>
		</NativeBaseProvider>
	);
}
