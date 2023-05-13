import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	User,
	ShoppingCart,
	BookmarkSimple,
	PuzzlePiece,
	House,
} from "phosphor-react-native";

import { Home } from "../screens/Home/Home";
import { Profile } from "../screens/Profile/Profile";
import { Publication } from "../screens/Publication/Publication";
import { Favorites } from "../screens/Favorites/Favorites";
import { YourPosts } from "../screens/YourPosts/YourPosts";
import ButtonPublication from "../components/Buttons/ButtonPublication";

// https://reactnavigation.org/docs/bottom-tab-navigator/
const Tab = createBottomTabNavigator();

export function Routes() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#121214",
					borderTopColor: "#000000",
					paddingBottom: 5,
					paddingTop: 5,
				},
				tabBarActiveTintColor: "#fff",
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ size, color }) => <House size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={Favorites}
				options={{
					tabBarIcon: ({ size, color }) => (
						<ShoppingCart size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Publication"
				component={Publication}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<ButtonPublication size={size} color={color} focused={focused} />
					),
				}}
			/>
			<Tab.Screen
				name="YourPosts"
				component={YourPosts}
				options={{
					tabBarIcon: ({ size, color }) => (
						<PuzzlePiece size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
				}}
			/>
		</Tab.Navigator>
	);
}
