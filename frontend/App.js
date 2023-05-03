import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
	useFonts,
	Inter_400Regular,
	Inter_900Black,
} from "@expo-google-fonts/inter";

export default function App() {
	const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_900Black });

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
