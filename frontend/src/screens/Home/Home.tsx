import { Text, VStack, useTheme } from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";

export function Home() {
	const { colors } = useTheme();
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop></MenuTop>
			<Text color={colors.white} alignItems={"center"}>
				Lista de Precinhos!
			</Text>
		</VStack>
	);
}
