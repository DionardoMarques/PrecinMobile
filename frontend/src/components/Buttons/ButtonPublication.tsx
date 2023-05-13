import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Plus } from "phosphor-react-native";
export default function ButtonPublication({ size, color, focused }) {
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: focused
						? "rgba(8, 37, 84, 1)"
						: "rgba(37, 108, 225, 1)",
				},
			]}
		>
			<Plus color={focused ? "#fff" : "#f8f8f8"} size={size} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "rgba(37, 108, 225, 1)",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
});
