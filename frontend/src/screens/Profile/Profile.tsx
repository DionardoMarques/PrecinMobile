import { useState, useContext } from "react";
import {
	HStack,
	VStack,
	Text,
	useTheme,
	Heading,
	Image,
	Center,
} from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
import { AuthContext } from "../../contexts/UserContext";
import { TouchableOpacity } from "react-native";
import { InfoUser } from "./InfoUser";
import { Edit } from "./Edit";
export function Profile() {
	const { colors, fontSizes } = useTheme();
	// const [isLoading, setIsLoading] = useState(false);
	const { logout, userInfo }: any = ({} = useContext(AuthContext));
	const [layout, setLayout] = useState(true);

	function handleLogout() {
		logout();
	}
	function handleLayout() {
		if (layout) {
			setLayout(false);
		} else {
			setLayout(true);
		}
	}
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			{layout ? (
				<InfoUser handleLayout={handleLayout}></InfoUser>
			) : (
				<Edit handleLayout={handleLayout}></Edit>
			)}
		</VStack>
	);
}
